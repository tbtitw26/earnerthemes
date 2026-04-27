import { connectDB } from "../config/db";
import { SeoRequest } from "../models/seoRequest.model";
import { User } from "../models/user.model";
import { transactionService } from "../services/transaction.service";
import { sendEmail } from "../utils/sendEmail";
import { COMPANY_EMAIL } from "@/resources/constants";
import { legacyTokensToBalance, roundMoney } from "@/utils/money";

export const seoRequestService = {
    /** Create new SEO request */
    async createSeoRequest(userId: string, email: string, body: any) {
        await connectDB();

        if (!body?.service) throw new Error("Missing 'service'");
        const service = body.service;
        const message = body.message || "";
        const amountUsed = typeof body.amount === "number"
            ? roundMoney(body.amount)
            : legacyTokensToBalance(Number(body.tokens || 5));
        const extras = body.extras || [];

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        if (user.balance < amountUsed)
            throw new Error(`Insufficient balance (have ${user.balance}, need ${amountUsed})`);

        user.balance = roundMoney(user.balance - amountUsed);
        await user.save();

        await transactionService.record(user._id, email, amountUsed, "spend", user.balance);

        const request = await SeoRequest.create({
            userId: user._id,
            email,
            service,
            message,
            extras,
            amountUsed,
        });

        const text = `
New SEO Request Submitted:
----------------------------
User: ${email}
Service: ${service}
Amount Used: ${amountUsed}
Extras: ${extras?.length ? extras.join(", ") : "none"}
Message: ${message || "(none)"}
        `;
        await sendEmail(
            COMPANY_EMAIL ?? "",
            `📈 New SEO Request — ${service}`,
            text
        );

        return request.toObject({ flattenMaps: true });
    },

    /** Get all requests by user */
    async getUserRequests(userId: string) {
        await connectDB();
        return await SeoRequest.find({ userId }).sort({ createdAt: -1 }).lean();
    },

    /** Get all requests (admin only) */
    async getAllRequests() {
        await connectDB();
        return await SeoRequest.find().sort({ createdAt: -1 }).lean();
    },
};
