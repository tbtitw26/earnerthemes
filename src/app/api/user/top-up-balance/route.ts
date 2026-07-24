import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { userController } from "@/backend/controllers/user.controller";
import { ENV } from "@/backend/config/env";
import { BILLING_DESCRIPTOR } from "@/resources/constants";
import {
    convertToBaseCurrency,
    isSupportedCurrency,
    netFromGross,
    parseMoneyAmount,
    VAT_RATE,
    vatFromGross,
} from "@/utils/money";

export async function POST(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        const body = await req.json();

        const parsedAmount = parseMoneyAmount(body.amount);
        if (parsedAmount === null || parsedAmount <= 0) {
            return NextResponse.json({ message: "Enter a valid amount with up to 2 decimals." }, { status: 400 });
        }

        const currency = body.currency;
        if (!isSupportedCurrency(currency)) {
            return NextResponse.json({ message: "Unsupported currency." }, { status: 400 });
        }

        // Both consents are mandatory for EU/UK consumers buying digital content.
        if (body.acceptedTerms !== true) {
            return NextResponse.json({ message: "You must accept the Terms & Conditions." }, { status: 400 });
        }
        if (body.acceptedWithdrawalWaiver !== true) {
            return NextResponse.json(
                { message: "You must acknowledge the withdrawal-right waiver before payment." },
                { status: 400 }
            );
        }

        const amountInBaseCurrency = convertToBaseCurrency(parsedAmount, currency);
        const now = new Date();

        const user = await userController.topUpBalance(payload.sub, amountInBaseCurrency, {
            simulated: ENV.PAYMENT_TEST_MODE,
            meta: {
                reference: `ET-${now.getTime().toString(36).toUpperCase()}`,
                chargedCurrency: currency,
                chargedAmount: parsedAmount,
                netAmount: netFromGross(parsedAmount),
                vatAmount: vatFromGross(parsedAmount),
                vatRate: VAT_RATE,
                termsAcceptedAt: now,
                withdrawalWaiverAcceptedAt: now,
                billingDescriptor: BILLING_DESCRIPTOR,
                simulated: ENV.PAYMENT_TEST_MODE,
            },
        });

        return NextResponse.json({
            user,
            topUpAmount: amountInBaseCurrency,
            simulated: ENV.PAYMENT_TEST_MODE,
            billingDescriptor: BILLING_DESCRIPTOR,
            message: ENV.PAYMENT_TEST_MODE
                ? "Test mode enabled: balance credited without payment provider."
                : "Balance top-up completed successfully.",
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unable to top up balance.";
        return NextResponse.json({ message }, { status: 400 });
    }
}
