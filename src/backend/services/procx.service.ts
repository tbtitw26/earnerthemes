import crypto from "crypto";
import { ENV } from "@/backend/config/env";

export interface ProcxCustomerInput {
    referenceId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    locale?: string;
}

export interface ProcxBillingAddressInput {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    countryCode?: string;
    postalCode?: string;
    state?: string;
}

export interface ProcxCreatePaymentInput {
    referenceId: string;
    amount: number;
    currency: string;
    description: string;
    returnUrl: string;
    webhookUrl?: string;
    customer: ProcxCustomerInput;
    billingAddress?: ProcxBillingAddressInput;
}

export interface ProcxCreatePaymentResponse {
    id: string;
    redirectUrl?: string;
    state?: string;
    raw: unknown;
}

export interface ProcxPaymentDetails {
    id: string;
    referenceId?: string;
    paymentType?: string;
    state: "PENDING" | "COMPLETED" | "DECLINED" | "CANCELLED" | "AUTHORIZED" | "ERROR" | string;
    amount?: number;
    currency?: string;
    errorCode?: string;
    errorMessage?: string;
    raw: unknown;
}

export interface ProcxWebhookPayload {
    id: string;
    referenceId?: string;
    paymentType?: string;
    state: "COMPLETED" | "DECLINED" | "CANCELLED" | "AUTHORIZED" | string;
    paymentMethod?: string;
    amount?: number;
    currency?: string;
    errorCode?: string;
    errorMessage?: string;
    [key: string]: unknown;
}

export const procxService = {
    isConfigured(): boolean {
        return Boolean(ENV.PROCX_API_KEY && ENV.PROCX_API_KEY.trim().length > 0);
    },

    getBaseUrl(): string {
        return (ENV.PROCX_BASE_URL || "https://engine.procx.tech").replace(/\/+$/, "");
    },

    async createPayment(input: ProcxCreatePaymentInput): Promise<ProcxCreatePaymentResponse> {
        if (!this.isConfigured()) {
            throw new Error("Procx Gateway is not configured. Missing PROCX_API_KEY.");
        }

        const baseUrl = this.getBaseUrl();
        const url = `${baseUrl}/api/v1/payments`;

        const customerObj: Record<string, unknown> = {
            referenceId: input.customer.referenceId,
            email: input.customer.email,
            ...(input.customer.firstName ? { firstName: input.customer.firstName } : {}),
            ...(input.customer.lastName ? { lastName: input.customer.lastName } : {}),
            ...(input.customer.dateOfBirth ? { dateOfBirth: input.customer.dateOfBirth } : {}),
            ...(input.customer.locale ? { locale: input.customer.locale } : {}),
        };

        // Procx strictly requires pattern "\\d+ \\d+" for phone
        if (input.customer.phone && /^\d+ \d+$/.test(input.customer.phone.trim())) {
            customerObj.phone = input.customer.phone.trim();
        }

        const payload: Record<string, unknown> = {
            paymentType: "DEPOSIT",
            amount: Number(input.amount.toFixed(2)),
            currency: input.currency.toUpperCase(),
            referenceId: input.referenceId,
            description: input.description,
            returnUrl: input.returnUrl,
            customer: customerObj,
        };

        if (input.webhookUrl) {
            payload.webhookUrl = input.webhookUrl;
        }

        if (input.billingAddress) {
            const cleanBilling: Record<string, unknown> = {};
            if (input.billingAddress.addressLine1) cleanBilling.addressLine1 = input.billingAddress.addressLine1;
            if (input.billingAddress.addressLine2) cleanBilling.addressLine2 = input.billingAddress.addressLine2;
            if (input.billingAddress.city) cleanBilling.city = input.billingAddress.city;
            if (input.billingAddress.postalCode) cleanBilling.postalCode = input.billingAddress.postalCode;
            if (input.billingAddress.state) cleanBilling.state = input.billingAddress.state;

            // Procx strictly requires ISO 3166 Alpha-2 (2 letters) for countryCode
            if (input.billingAddress.countryCode && /^[A-Za-z]{2}$/.test(input.billingAddress.countryCode.trim())) {
                cleanBilling.countryCode = input.billingAddress.countryCode.trim().toUpperCase();
            }

            if (Object.keys(cleanBilling).length > 0) {
                payload.billingAddress = cleanBilling;
            }
        }

        console.log(`[Payment] Initiating payment POST ${url}`, {
            referenceId: input.referenceId,
            amount: input.amount,
            currency: input.currency,
        });

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ENV.PROCX_API_KEY.trim()}`,
            },
            body: JSON.stringify(payload),
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
            console.error("[Procx] Payment creation failed:", {
                status: res.status,
                json: JSON.stringify(json, null, 2),
            });
            const fieldErrors = Array.isArray(json?.errors)
                ? json.errors.map((e: any) => `${e.field}: ${e.defaultMessage || e.message}`).join(", ")
                : "";
            const errorMsg =
                fieldErrors ||
                json?.errorMessage ||
                json?.message ||
                json?.error ||
                `Procx API failed with HTTP ${res.status}`;
            throw new Error(errorMsg);
        }

        const resultObj = (json?.result || json) as Record<string, unknown>;
        const id = (resultObj?.id || json?.id) as string;
        const redirectUrl = (resultObj?.redirectUrl || json?.redirectUrl) as string | undefined;
        const state = (resultObj?.state || json?.state) as string | undefined;

        if (!id) {
            console.error("[Procx] Invalid response - missing payment ID:", json);
            throw new Error("Procx did not return a valid payment ID.");
        }

        return {
            id,
            redirectUrl,
            state,
            raw: json,
        };
    },

    async getPayment(paymentId: string): Promise<ProcxPaymentDetails> {
        if (!this.isConfigured()) {
            throw new Error("Procx Gateway is not configured. Missing PROCX_API_KEY.");
        }

        const baseUrl = this.getBaseUrl();
        const url = `${baseUrl}/api/v1/payments/${encodeURIComponent(paymentId)}`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${ENV.PROCX_API_KEY.trim()}`,
            },
            cache: "no-store",
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
            const errorMsg =
                json?.errorMessage ||
                json?.message ||
                `Procx GET status failed with HTTP ${res.status}`;
            throw new Error(errorMsg);
        }

        const result = (json?.result || json) as Record<string, unknown>;

        return {
            id: (result?.id || paymentId) as string,
            referenceId: result?.referenceId as string | undefined,
            paymentType: result?.paymentType as string | undefined,
            state: ((result?.state as string) || "PENDING").toUpperCase(),
            amount: typeof result?.amount === "number" ? result.amount : undefined,
            currency: result?.currency as string | undefined,
            errorCode: result?.errorCode as string | undefined,
            errorMessage: result?.errorMessage as string | undefined,
            raw: json,
        };
    },

    verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
        const signingKey = ENV.PROCX_SIGNING_KEY?.trim();
        if (!signingKey) {
            console.warn("[Procx] Webhook verification skipped: PROCX_SIGNING_KEY not set.");
            // If signing key is not yet configured, fail closed or log
            return false;
        }

        if (!signatureHeader) {
            console.warn("[Procx] Webhook missing Signature header.");
            return false;
        }

        try {
            const expectedSignature = crypto
                .createHmac("sha256", signingKey)
                .update(rawBody, "utf8")
                .digest("hex");

            const sigBuffer = Buffer.from(signatureHeader.trim().toLowerCase(), "hex");
            const expectedBuffer = Buffer.from(expectedSignature.toLowerCase(), "hex");

            if (sigBuffer.length !== expectedBuffer.length) {
                return false;
            }

            return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
        } catch (err) {
            console.error("[Procx] Error verifying webhook signature:", err);
            return false;
        }
    },
};
