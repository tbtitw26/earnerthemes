import { connectDB } from "@/backend/config/db";
import { templatePurchaseService } from "@/backend/services/templatePurchase.service";
import {
    CartTemplatePurchaseItemInput,
    CartTemplatePurchaseResult,
    CreateTemplatePurchaseInput,
    CreateTemplatePurchaseResponse,
    DirectTemplatePurchaseResponse,
    GetTemplatePurchasesResponse,
    TemplatePurchaseStatusResponse,
} from "@/backend/types/template-purchase.types";

export const templatePurchaseController = {
    async createPurchase(
        userId: string,
        email: string,
        body: CreateTemplatePurchaseInput
    ): Promise<CreateTemplatePurchaseResponse> {
        await connectDB();
        const purchase = await templatePurchaseService.createPurchase(userId, email, body);
        return { purchase };
    },

    async getPurchases(userId: string): Promise<GetTemplatePurchasesResponse> {
        await connectDB();
        const purchases = await templatePurchaseService.getPurchasesByUser(userId);
        return { purchases };
    },

    async getPurchasedTemplates(userId: string): Promise<GetTemplatePurchasesResponse> {
        await connectDB();
        const purchases = await templatePurchaseService.getPurchasedTemplatesForUser(userId);
        return { purchases };
    },

    async getPurchaseStatus(
        userId: string,
        input: { templateId?: string; templateSlug?: string }
    ): Promise<TemplatePurchaseStatusResponse> {
        await connectDB();
        const purchase = await templatePurchaseService.getLatestPurchaseForTemplate(userId, input);
        return {
            purchased: Boolean(purchase),
            purchase,
        };
    },

    async directPurchase(
        userId: string,
        email: string,
        input: { templateId?: string; templateSlug?: string }
    ): Promise<DirectTemplatePurchaseResponse> {
        await connectDB();
        return await templatePurchaseService.directPurchase(userId, email, input);
    },

    async purchaseCartTemplates(
        userId: string,
        email: string,
        items: CartTemplatePurchaseItemInput[]
    ): Promise<CartTemplatePurchaseResult> {
        await connectDB();
        return await templatePurchaseService.purchaseTemplates(userId, email, items, "cart");
    },
};
