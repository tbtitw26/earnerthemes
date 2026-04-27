import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { templatePurchaseController } from "@/backend/controllers/templatePurchase.controller";

export async function GET(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        const result = await templatePurchaseController.getPurchasedTemplates(payload.sub);
        return NextResponse.json(result);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to fetch purchased templates";
        return NextResponse.json({ message }, { status: 400 });
    }
}
