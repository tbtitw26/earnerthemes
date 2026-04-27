import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { userController } from "@/backend/controllers/user.controller";
import { ENV } from "@/backend/config/env";
import {
    convertToBaseCurrency,
    formatMoney,
    isSupportedCurrency,
    MIN_TOP_UP_AMOUNT,
    parseMoneyAmount,
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

        const amountInBaseCurrency = convertToBaseCurrency(parsedAmount, currency);
        if (amountInBaseCurrency < MIN_TOP_UP_AMOUNT) {
            return NextResponse.json(
                { message: `Minimum top-up amount is ${formatMoney(MIN_TOP_UP_AMOUNT)}.` },
                { status: 400 }
            );
        }

        const user = await userController.topUpBalance(payload.sub, amountInBaseCurrency, {
            simulated: ENV.PAYMENT_TEST_MODE,
        });

        return NextResponse.json({
            user,
            topUpAmount: amountInBaseCurrency,
            simulated: ENV.PAYMENT_TEST_MODE,
            message: ENV.PAYMENT_TEST_MODE
                ? "Test mode enabled: balance credited without payment provider."
                : "Balance top-up completed successfully.",
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unable to top up balance.";
        return NextResponse.json({ message }, { status: 400 });
    }
}
