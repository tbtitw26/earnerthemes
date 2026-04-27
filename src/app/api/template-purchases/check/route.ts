import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { templatePurchaseController } from "@/backend/controllers/templatePurchase.controller";

export async function GET(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        const { searchParams } = new URL(req.url);
        const templateId = searchParams.get("templateId") || undefined;
        const templateSlug = searchParams.get("templateSlug") || undefined;

        if (!templateId && !templateSlug) {
            return NextResponse.json(
                { message: "templateId or templateSlug is required" },
                { status: 400 }
            );
        }

        const result = await templatePurchaseController.getPurchaseStatus(payload.sub, {
            templateId,
            templateSlug,
        });

        return NextResponse.json(result);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to check template purchase status";
        return NextResponse.json({ message }, { status: 400 });
    }
}
