import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { templatePurchaseController } from "@/backend/controllers/templatePurchase.controller";
import { CartTemplatePurchaseItemInput } from "@/backend/types/template-purchase.types";

export async function POST(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        const body = (await req.json()) as {
            items?: CartTemplatePurchaseItemInput[];
        };

        const result = await templatePurchaseController.purchaseCartTemplates(
            payload.sub,
            payload.email,
            body.items || []
        );

        return NextResponse.json(result);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to complete cart checkout";
        return NextResponse.json({ message }, { status: 400 });
    }
}
