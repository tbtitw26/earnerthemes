import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { paymentOrderService } from "@/backend/services/paymentOrder.service";

export async function POST(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        const body = await req.json();

        const result = await paymentOrderService.createDeposit({
            userId: payload.sub,
            amount: body.amount,
            currency: body.currency,
            acceptedTerms: body.acceptedTerms,
            acceptedWithdrawalWaiver: body.acceptedWithdrawalWaiver,
            returnUrl: body.returnUrl,
        });

        return NextResponse.json(result);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unable to initiate deposit.";
        return NextResponse.json({ message }, { status: 400 });
    }
}
