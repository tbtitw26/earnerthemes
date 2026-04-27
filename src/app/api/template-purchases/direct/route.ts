import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { templatePurchaseController } from "@/backend/controllers/templatePurchase.controller";

export async function POST(req: NextRequest) {
    try {
        const payload = await requireAuth(req);
        const body = (await req.json()) as {
            templateId?: string;
            templateSlug?: string;
        };

        const result = await templatePurchaseController.directPurchase(payload.sub, payload.email, body);
        return NextResponse.json(result);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to complete template purchase";
        return NextResponse.json({ message }, { status: 400 });
    }
}
