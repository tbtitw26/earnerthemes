import { NextRequest, NextResponse } from "next/server";
import { paymentOrderService } from "@/backend/services/paymentOrder.service";

export async function POST(req: NextRequest) {
    try {
        const signature =
            req.headers.get("signature") ||
            req.headers.get("Signature") ||
            req.headers.get("x-signature") ||
            null;

        const rawBody = await req.text();

        console.log("[Webhook] Incoming payment notification received");

        const result = await paymentOrderService.processWebhook(rawBody, signature);

        if (!result.received && result.reason === "Invalid signature") {
            return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error("[Procx Webhook Route] Error handling webhook:", err);
        return NextResponse.json(
            { message: "Webhook processing error" },
            { status: 500 }
        );
    }
}
