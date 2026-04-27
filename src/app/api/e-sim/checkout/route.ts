import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { userController } from "@/backend/controllers/user.controller";
import { EsimOrder } from "@/backend/models/esimOrder.model";
import { connectDB } from "@/backend/config/db";
import { emailService } from "@/backend/services/email.service";
import { formatMoney, roundMoney } from "@/utils/money";

export async function POST(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        const body = await req.json();

        const { country, code, plan, amount } = body;

        if (!country || !code || !plan || !amount) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }

        await connectDB();

        const chargeAmount = roundMoney(Number(amount));

        const user = await userController.spendBalance(
            payload.sub,
            chargeAmount,
            `eSIM ${country} – ${plan}`
        );

        // 🧾 запис покупки
        const order = await EsimOrder.create({
            userId: payload.sub,
            email: user.email,
            country,
            countryCode: code,
            plan,
            amountUsed: chargeAmount,
        });

        try {
            await emailService.sendOrderConfirmationEmail({
                email: user.email,
                firstName: user.firstName,
                subject: "eSIM order confirmation",
                summaryTitle: "Order summary",
                summaryLines: [
                    `Service: eSIM`,
                    `Country: ${country}`,
                    `Plan: ${plan}`,
                    `Status: ${order.status}`,
                ],
                amountLabel: "Amount used",
                amountValue: formatMoney(chargeAmount),
                transactionDate: order.createdAt || new Date(),
            });
        } catch (error) {
            console.error("❌ eSIM confirmation email failed:", {
                orderId: order._id,
                email: user.email,
                error,
            });
        }

        return NextResponse.json({ success: true, order });
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || "Checkout failed" },
            { status: 400 }
        );
    }
}
