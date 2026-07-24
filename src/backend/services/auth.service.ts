import bcrypt from "bcryptjs";
import { Types } from "mongoose";

import { User } from "../models/user.model";
import { RefreshSession } from "../models/refreshSession.model";
import { sha256, randomToken } from "../utils/crypto";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { ENV } from "../config/env";
import { emailService } from "@/backend/services/email.service";
import { getAllowedCountryByValue } from "@/utils/countries";

function parseDurationToSec(input: string): number {
    const m = input.match(/^(\d+)([smhd])?$/i);
    if (!m) return 60 * 60 * 24 * 30;

    const n = parseInt(m[1], 10);
    const unit = (m[2] || "s").toLowerCase();
    const mult = unit === "s" ? 1 : unit === "m" ? 60 : unit === "h" ? 3600 : 86400;

    return n * mult;
}

const REFRESH_TTL_SEC = parseDurationToSec(ENV.REFRESH_TOKEN_EXPIRES);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export type RegisterInput = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
    phone?: string;
    dateOfBirth?: string;
    birthDate?: string;
    street?: string;
    addressStreet?: string;
    city?: string;
    addressCity?: string;
    country?: string;
    addressCountry?: string;
    postCode?: string;
    addressZip?: string;
};

export const authService = {
    // Fields are optional here because normalizeRegisterPayload below performs the
    // validation and throws on anything missing or malformed.
    async register(data: RegisterInput) {
        const normalized = normalizeRegisterPayload(data);
        const {
            firstName,
            lastName,
            normalizedEmail,
            password,
            phoneNumber,
            dateOfBirth,
            street,
            city,
            country,
            postCode,
        } = normalized;

        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) throw new Error("Email already registered");
        const hashed = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email: normalizedEmail,
            password: hashed,
            phoneNumber,
            phone: phoneNumber,
            dateOfBirth: new Date(dateOfBirth),
            birthDate: new Date(dateOfBirth),
            address: {
                street,
                city,
                country,
                postCode,
                zip: postCode,
            },
        });

        const result = await this.issueTokensAndSession(
            user._id,
            user.email,
            user.role
        );

        try {
            await emailService.sendWelcomeEmail({
                email: user.email,
                firstName: user.firstName,
            });
        } catch (error) {
            console.error("❌ Welcome email failed:", error);
        }

        return { user, ...result };
    },

    async login(email: string, password: string, userAgent?: string, ip?: string) {
        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
        if (!user) throw new Error("Invalid credentials");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid credentials");

        await RefreshSession.deleteMany({ userId: user._id });

        const result = await this.issueTokensAndSession(
            user._id,
            user.email,
            user.role,
            userAgent,
            ip
        );

        console.log(`[authService.login] ✅ New login for ${user.email}, old sessions cleared.`);

        return { user, ...result };
    },

    async issueTokensAndSession(
        userId: Types.ObjectId,
        email: string,
        role: string,
        userAgent?: string,
        ip?: string
    ) {
        const rawRefresh = randomToken(64);
        const tokenHash = sha256(rawRefresh);

        const expiresAt = new Date(Date.now() + REFRESH_TTL_SEC * 1000);

        const session = await RefreshSession.create({
            userId,
            tokenHash,
            userAgent,
            ip,
            expiresAt,
        });

        const accessToken = await signAccessToken({
            sub: userId.toString(),
            email,
            role,
        });

        const refreshJWT = await signRefreshToken(
            { sub: userId.toString(), sid: (session as any)._id.toString() },
            ENV.REFRESH_TOKEN_EXPIRES
        );

        return { accessToken, refreshToken: refreshJWT, session };
    },

    async refresh(refreshJWT: string, userAgent?: string, ip?: string) {
        const { verifyRefreshToken } = await import("../utils/jwt");

        let payload: { sub: string; sid: string };

        try {
            payload = await verifyRefreshToken(refreshJWT);
        } catch {
            throw new Error("SessionInvalid");
        }

        const session = await RefreshSession.findById(payload.sid);
        if (!session || session.revokedAt || session.expiresAt.getTime() < Date.now()) {
            throw new Error("SessionInvalid");
        }

        session.revokedAt = new Date();
        await session.save();

        const user = await User.findById(session.userId);
        if (!user) throw new Error("UserNotFound");

        const { accessToken, refreshToken } = await this.issueTokensAndSession(
            user._id,
            user.email,
            user.role,
            userAgent,
            ip
        );

        return { user, accessToken, refreshToken };
    },

    async me(userId: string) {
        const user = await User.findById(userId).select("-password");
        if (!user) throw new Error("UserNotFound");
        return user;
    },

    async logout(refreshJWT: string) {
        const { verifyRefreshToken } = await import("../utils/jwt");

        try {
            const payload = await verifyRefreshToken<{ sub: string; sid: string }>(refreshJWT);
            await RefreshSession.findByIdAndUpdate(payload.sid, {
                $set: { revokedAt: new Date() },
            });
        } catch {
            // idempotent
        }
    },

    async logoutAll(userId: string) {
        await RefreshSession.updateMany(
            { userId },
            { $set: { revokedAt: new Date() } }
        );
    },
};

function normalizeRegisterPayload(data: RegisterInput) {
    const firstName = data.firstName?.trim() || "";
    const lastName = data.lastName?.trim() || "";
    const normalizedEmail = data.email?.trim().toLowerCase() || "";
    const password = data.password || "";
    const confirmPassword = data.confirmPassword || "";
    const phoneNumber = (data.phoneNumber || data.phone || "").trim();
    const dateOfBirth = (data.dateOfBirth || data.birthDate || "").trim();
    const street = (data.street || data.addressStreet || "").trim();
    const city = (data.city || data.addressCity || "").trim();
    const countryValue = (data.country || data.addressCountry || "").trim();
    const postCode = (data.postCode || data.addressZip || "").trim();

    if (!firstName) throw new Error("First name is required");
    if (!lastName) throw new Error("Last name is required");
    if (!normalizedEmail) throw new Error("Email is required");
    if (!EMAIL_REGEX.test(normalizedEmail)) throw new Error("Invalid email address");
    if (!password) throw new Error("Password is required");
    if (!phoneNumber) throw new Error("Phone number is required");
    if (!dateOfBirth) throw new Error("Date of birth is required");
    if (!DATE_REGEX.test(dateOfBirth) || Number.isNaN(Date.parse(dateOfBirth))) {
        throw new Error("Invalid date of birth");
    }
    // Clause 5 of the Terms requires account holders to be at least 18.
    {
        const birth = new Date(dateOfBirth);
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const monthDiff = now.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age -= 1;
        if (age < 18) throw new Error("You must be at least 18 years old to create an account");
    }
    if (!street) throw new Error("Street is required");
    if (!city) throw new Error("City is required");
    if (!countryValue) throw new Error("Country is required");
    if (!postCode) throw new Error("Post code is required");
    if (!confirmPassword) throw new Error("Confirm password is required");
    if (confirmPassword !== password) throw new Error("Passwords do not match");

    const allowedCountry = getAllowedCountryByValue(countryValue);
    if (!allowedCountry) {
        throw new Error("Registration from this country is not allowed");
    }

    return {
        firstName,
        lastName,
        normalizedEmail,
        password,
        phoneNumber,
        dateOfBirth,
        street,
        city,
        country: allowedCountry.name,
        postCode,
    };
}
