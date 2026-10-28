import { connectDB } from "@/backend/config/db";
import { ENV } from "@/backend/config/env";
import { PaymentOrder, PaymentOrderDocument } from "@/backend/models/paymentOrder.model";
import { User } from "@/backend/models/user.model";
import { procxService, ProcxWebhookPayload } from "./procx.service";
import { userController } from "@/backend/controllers/user.controller";
import { BILLING_DESCRIPTOR } from "@/resources/constants";
import { getAllowedCountryByValue } from "@/utils/countries";
import countries from "i18n-iso-countries";
import {
    convertToBaseCurrency,
    isSupportedCurrency,
    netFromGross,
    parseMoneyAmount,
    VAT_RATE,
    vatFromGross,
} from "@/utils/money";

function resolveCountryAlpha2(country?: string): string | undefined {
    if (!country) return undefined;
    const trimmed = country.trim();
    if (trimmed.length === 2 && /^[A-Za-z]{2}$/.test(trimmed)) {
        return trimmed.toUpperCase();
    }
    const fromAllowed = getAllowedCountryByValue(trimmed);
    if (fromAllowed?.alpha2) {
        return fromAllowed.alpha2.toUpperCase();
    }
    const fromLib = countries.getAlpha2Code(trimmed, "en");
    return fromLib ? fromLib.toUpperCase() : undefined;
}

function formatProcxPhone(rawPhone?: string, country?: string): string | undefined {
    if (!rawPhone) return undefined;

    // 1. If it already has two digit groups (e.g. "+371 20000000" or "44 7537127672")
    const cleaned = rawPhone.replace(/^\+/, "").trim();
    const parts = cleaned.split(/\s+/);
    if (parts.length === 2 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])) {
        return `${parts[0]} ${parts[1]}`;
    }

    // 2. If it's a solid sequence of digits without space (e.g. "+37120000000")
    const digitsOnly = rawPhone.replace(/\D/g, "");
    if (!digitsOnly || digitsOnly.length < 7) return undefined;

    const dialingCodes: Record<string, string> = {
        LV: "371",
        GB: "44",
        UK: "44",
        US: "1",
        SE: "46",
        EE: "372",
        LT: "370",
        DE: "49",
        FR: "33",
        ES: "34",
        IT: "39",
        PL: "48",
        CY: "357",
        UA: "380",
    };

    const alpha2 = resolveCountryAlpha2(country);
    const expectedDialing = alpha2 ? dialingCodes[alpha2] : undefined;

    if (expectedDialing && digitsOnly.startsWith(expectedDialing)) {
        const rest = digitsOnly.slice(expectedDialing.length);
        if (rest.length >= 4) {
            return `${expectedDialing} ${rest}`;
        }
    }

    // Try common country dialing prefixes
    for (const code of ["371", "372", "370", "357", "380", "44", "46", "49", "33", "34", "39", "48", "1"]) {
        if (digitsOnly.startsWith(code) && digitsOnly.length - code.length >= 5) {
            return `${code} ${digitsOnly.slice(code.length)}`;
        }
    }

    // Procx requires "\\d+ \\d+". If we cannot strictly guarantee it, omit phone so validation doesn't fail!
    return undefined;
}

export interface CreateDepositInput {
    userId: string;
    amount: number | string;
    currency: string;
    acceptedTerms: boolean;
    acceptedWithdrawalWaiver: boolean;
    returnUrl?: string;
}

export interface CreateDepositResult {
    mode: "gateway" | "simulated";
    redirectUrl?: string;
    referenceId: string;
    simulated?: boolean;
    billingDescriptor?: string;
    topUpAmount?: number;
    user?: unknown;
    message?: string;
}

export const paymentOrderService = {
    async createDeposit(input: CreateDepositInput): Promise<CreateDepositResult> {
        await connectDB();

        const parsedAmount = parseMoneyAmount(input.amount);
        if (parsedAmount === null || parsedAmount <= 0) {
            throw new Error("Enter a valid amount with up to 2 decimals.");
        }

        const currency = input.currency.toUpperCase();
        if (!isSupportedCurrency(currency)) {
            throw new Error("Unsupported currency.");
        }

        if (input.acceptedTerms !== true) {
            throw new Error("You must accept the Terms & Conditions.");
        }
        if (input.acceptedWithdrawalWaiver !== true) {
            throw new Error("You must acknowledge the withdrawal-right waiver before payment.");
        }

        const user = await User.findById(input.userId);
        if (!user) {
            throw new Error("User not found.");
        }

        const amountInBaseCurrency = convertToBaseCurrency(parsedAmount, currency);
        const now = new Date();
        const referenceId = `ET-${now.getTime().toString(36).toUpperCase()}`;

        const meta = {
            reference: referenceId,
            chargedCurrency: currency,
            chargedAmount: parsedAmount,
            netAmount: netFromGross(parsedAmount),
            vatAmount: vatFromGross(parsedAmount),
            vatRate: VAT_RATE,
            termsAcceptedAt: now,
            withdrawalWaiverAcceptedAt: now,
            billingDescriptor: BILLING_DESCRIPTOR,
            simulated: false,
        };

        const paymentOrder = await PaymentOrder.create({
            userId: user._id,
            userEmail: user.email,
            referenceId,
            paymentType: "DEPOSIT",
            status: "PENDING",
            amount: parsedAmount,
            currency,
            baseAmount: amountInBaseCurrency,
            credited: false,
            meta,
        });

        // 1. If Procx Gateway is configured, initiate hosted checkout
        if (procxService.isConfigured()) {
            const appUrl = (ENV.APP_URL || "http://localhost:2000").replace(/\/+$/, "");
            const returnUrl =
                input.returnUrl || `${appUrl}/payment/result?referenceId=${referenceId}`;
            const webhookUrl = `${appUrl}/api/payments/webhook`;

            try {
                const formattedPhone = formatProcxPhone(user.phoneNumber || user.phone, user.address?.country);
                const countryCode = resolveCountryAlpha2(user.address?.country);

                const billingAddress = {
                    ...(user.address?.street ? { addressLine1: user.address.street } : {}),
                    ...(user.address?.city ? { city: user.address.city } : {}),
                    ...(countryCode ? { countryCode } : {}),
                    ...(user.address?.postCode || user.address?.zip
                        ? { postalCode: user.address.postCode || user.address.zip }
                        : {}),
                };

                const gatewayRes = await procxService.createPayment({
                    referenceId,
                    amount: parsedAmount,
                    currency,
                    description: `EarnerThemes Account Top-up (${currency} ${parsedAmount.toFixed(2)})`,
                    returnUrl,
                    webhookUrl,
                    customer: {
                        referenceId: user._id.toString(),
                        email: user.email,
                        firstName: user.firstName || "Customer",
                        lastName: user.lastName || "User",
                        ...(formattedPhone ? { phone: formattedPhone } : {}),
                    },
                    ...(Object.keys(billingAddress).length > 0 ? { billingAddress } : {}),
                });

                paymentOrder.procxPaymentId = gatewayRes.id;
                paymentOrder.redirectUrl = gatewayRes.redirectUrl;
                await paymentOrder.save();

                return {
                    mode: "gateway",
                    redirectUrl: gatewayRes.redirectUrl,
                    referenceId,
                    billingDescriptor: BILLING_DESCRIPTOR,
                };
            } catch (err) {
                paymentOrder.status = "ERROR";
                paymentOrder.errorMessage =
                    err instanceof Error ? err.message : "Failed to initiate payment with Procx";
                await paymentOrder.save();
                throw err;
            }
        }

        // 2. If Procx is not configured and PAYMENT_TEST_MODE is true, fallback to simulated top-up
        if (ENV.PAYMENT_TEST_MODE) {
            meta.simulated = true;
            paymentOrder.meta = meta;

            const updatedUser = await userController.topUpBalance(user._id.toString(), amountInBaseCurrency, {
                simulated: true,
                meta,
            });

            paymentOrder.status = "COMPLETED";
            paymentOrder.credited = true;
            await paymentOrder.save();

            return {
                mode: "simulated",
                simulated: true,
                referenceId,
                topUpAmount: amountInBaseCurrency,
                user: updatedUser,
                billingDescriptor: BILLING_DESCRIPTOR,
                message: "Test mode enabled: balance credited without payment provider.",
            };
        }

        paymentOrder.status = "ERROR";
        paymentOrder.errorMessage = "Payment gateway not configured and test mode disabled.";
        await paymentOrder.save();
        throw new Error("Payment gateway is not currently available. Please contact support.");
    },

    async processWebhook(rawBody: string, signature: string | null): Promise<{ received: boolean; processed: boolean; reason?: string }> {
        await connectDB();

        // If signing key is configured, verify HMAC signature
        if (ENV.PROCX_SIGNING_KEY && ENV.PROCX_SIGNING_KEY.trim().length > 0) {
            const isValid = procxService.verifyWebhookSignature(rawBody, signature);
            if (!isValid) {
                console.warn("[Procx Webhook] Signature verification failed.");
                return { received: false, processed: false, reason: "Invalid signature" };
            }
        } else {
            console.warn("[Procx Webhook] PROCX_SIGNING_KEY not set, processing without signature verification.");
        }

        let payload: ProcxWebhookPayload;
        try {
            payload = JSON.parse(rawBody);
        } catch {
            return { received: false, processed: false, reason: "Malformed JSON" };
        }

        console.log("[Procx Webhook] Received payload:", payload);

        const paymentId = payload.id;
        const referenceId = payload.referenceId;

        const order = await PaymentOrder.findOne({
            $or: [
                ...(paymentId ? [{ procxPaymentId: paymentId }] : []),
                ...(referenceId ? [{ referenceId }] : []),
            ],
        });

        if (!order) {
            console.warn("[Procx Webhook] No matching order found for payment:", { paymentId, referenceId });
            return { received: true, processed: false, reason: "Order not found" };
        }

        const state = (payload.state || "").toUpperCase();

        if (state === "COMPLETED" || state === "AUTHORIZED") {
            await this.creditOrderOnce(order, payload);
            return { received: true, processed: true };
        }

        if (state === "DECLINED" || state === "CANCELLED") {
            order.status = state as "DECLINED" | "CANCELLED";
            order.errorCode = payload.errorCode;
            order.errorMessage = payload.errorMessage;
            order.rawWebhookData = payload;
            await order.save();
            return { received: true, processed: true };
        }

        return { received: true, processed: true };
    },

    async syncPaymentStatus(referenceId: string): Promise<PaymentOrderDocument | null> {
        await connectDB();

        const order = await PaymentOrder.findOne({ referenceId });
        if (!order) return null;

        if (order.status === "COMPLETED" && order.credited) {
            return order;
        }

        // If still pending, query Procx API for the final status
        if (order.procxPaymentId && procxService.isConfigured()) {
            try {
                const details = await procxService.getPayment(order.procxPaymentId);
                const state = (details.state || "").toUpperCase();

                if (state === "COMPLETED" || state === "AUTHORIZED") {
                    await this.creditOrderOnce(order, details.raw);
                } else if (state === "DECLINED" || state === "CANCELLED") {
                    order.status = state as "DECLINED" | "CANCELLED";
                    order.errorCode = details.errorCode;
                    order.errorMessage = details.errorMessage;
                    await order.save();
                }
            } catch (err) {
                console.error("[Procx] Error checking payment state via API:", err);
            }
        }

        return order;
    },

    async creditOrderOnce(order: PaymentOrderDocument, rawData?: unknown): Promise<void> {
        // Atomic lock to guarantee idempotency and prevent double credits
        const lockedOrder = await PaymentOrder.findOneAndUpdate(
            { _id: order._id, credited: false },
            {
                $set: {
                    credited: true,
                    status: "COMPLETED",
                    rawWebhookData: rawData,
                },
            },
            { new: true }
        );

        if (!lockedOrder) {
            // Already credited by a concurrent webhook or polling call
            return;
        }

        console.log(`[Procx] Crediting balance for user ${order.userId}: ${order.baseAmount} EUR (charged ${order.amount} ${order.currency})`);

        try {
            await userController.topUpBalance(order.userId.toString(), order.baseAmount, {
                simulated: false,
                meta: order.meta,
            });
        } catch (err) {
            console.error("[Procx] Critical: failed to credit balance after successful payment:", err);
            // Revert credited flag so retry is possible
            await PaymentOrder.findByIdAndUpdate(order._id, { credited: false });
            throw err;
        }
    },
};
