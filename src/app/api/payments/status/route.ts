import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { paymentOrderService } from "@/backend/services/paymentOrder.service";

export async function GET(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        const searchParams = req.nextUrl.searchParams;
        const referenceId = searchParams.get("referenceId");

        if (!referenceId) {
            return NextResponse.json(
                { message: "Missing referenceId query parameter." },
                { status: 400 }
            );
        }

        const order = await paymentOrderService.syncPaymentStatus(referenceId);

        if (!order) {
            return NextResponse.json(
                { message: "Payment order not found." },
                { status: 404 }
            );
        }

        // Verify the requesting user owns this order
        if (order.userId.toString() !== payload.sub && payload.role !== "admin") {
            return NextResponse.json(
                { message: "Access denied." },
                { status: 403 }
            );
        }

        return NextResponse.json({
            referenceId: order.referenceId,
            status: order.status,
            amount: order.amount,
            currency: order.currency,
            baseAmount: order.baseAmount,
            credited: order.credited,
            errorCode: order.errorCode,
            errorMessage: order.errorMessage,
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unable to get payment status.";
        return NextResponse.json({ message }, { status: 400 });
    }
}
