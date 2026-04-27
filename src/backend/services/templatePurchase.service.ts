import mongoose from "mongoose";

import { connectDB } from "@/backend/config/db";
import { TemplatePurchase, TemplatePurchaseDocument } from "@/backend/models/templatePurchase.model";
import { User } from "@/backend/models/user.model";
import {
    CartTemplatePurchaseItemInput,
    CartTemplatePurchaseResult,
    CreateTemplatePurchaseInput,
    DirectTemplatePurchaseResponse,
    TemplatePurchaseType,
} from "@/backend/types/template-purchase.types";
import { templateCatalogService } from "@/backend/services/templateCatalog.service";
import {
    BASE_CURRENCY,
    convertToBaseCurrency,
    formatMoney,
    isSupportedCurrency,
    roundMoney,
} from "@/utils/money";
import { transactionService } from "@/backend/services/transaction.service";
import { emailService } from "@/backend/services/email.service";

function toPlainPurchase(purchase: TemplatePurchaseDocument): TemplatePurchaseType {
    return purchase.toObject() as TemplatePurchaseType;
}

function buildTemplateSnapshot(template: ReturnType<typeof templateCatalogService.findTemplateByIdOrSlug>) {
    if (!template) return undefined;

    return {
        title: template.title,
        previewImage: template.coverImage,
        sourceUrl: template.sourceUrl,
        livePreviewUrl: template.livePreviewUrl,
        platform: template.platform,
        category: template.category,
        author: template.author,
        templatePrice: template.price,
        templateCurrency: template.currency,
    };
}

function createCheckoutGroupId() {
    return `tpl_${new mongoose.Types.ObjectId().toString()}`;
}

export const templatePurchaseService = {
    async createPurchase(userId: string, email: string, input: CreateTemplatePurchaseInput): Promise<TemplatePurchaseType> {
        await connectDB();

        if (!input.templateId && !input.templateSlug) {
            throw new Error("Template reference is required");
        }

        const user = await User.findById(userId).select("_id email");
        if (!user) throw new Error("User not found");

        const amountUsed = Number(input.amountUsed);
        if (!Number.isFinite(amountUsed) || amountUsed < 0) {
            throw new Error("Invalid purchase amount");
        }

        const currency = input.currency?.trim().toUpperCase();
        if (!currency) {
            throw new Error("Currency is required");
        }

        if (input.transactionId && !mongoose.isValidObjectId(input.transactionId)) {
            throw new Error("Invalid transaction reference");
        }

        const template = templateCatalogService.findTemplateByIdOrSlug({
            templateId: input.templateId,
            templateSlug: input.templateSlug,
        });
        if (!template) {
            throw new Error("Template not found");
        }

        const purchase = await TemplatePurchase.create({
            userId: new mongoose.Types.ObjectId(userId),
            email: email?.toLowerCase() || user.email.toLowerCase(),
            templateId: template.id,
            templateSlug: template.slug,
            templateTitle: input.templateSnapshot?.title?.trim() || template.title,
            previewImage: input.templateSnapshot?.previewImage?.trim() || template.coverImage,
            sourceUrl: input.templateSnapshot?.sourceUrl?.trim() || template.sourceUrl,
            livePreviewUrl: input.templateSnapshot?.livePreviewUrl?.trim() || template.livePreviewUrl,
            platform: input.templateSnapshot?.platform?.trim() || template.platform,
            category: input.templateSnapshot?.category?.trim() || template.category,
            author: input.templateSnapshot?.author?.trim() || template.author,
            templatePrice:
                typeof input.templateSnapshot?.templatePrice === "number"
                    ? input.templateSnapshot.templatePrice
                    : template.price,
            templateCurrency: input.templateSnapshot?.templateCurrency?.trim() || template.currency,
            amountUsed: roundMoney(amountUsed),
            currency,
            paymentStatus: input.paymentStatus || "paid",
            purchaseSource: input.purchaseSource || "direct",
            checkoutGroupId: input.checkoutGroupId?.trim() || undefined,
            transactionId: input.transactionId ? new mongoose.Types.ObjectId(input.transactionId) : undefined,
            purchasedAt: new Date(),
        });

        return toPlainPurchase(purchase);
    },

    async getPurchasesByUser(userId: string): Promise<TemplatePurchaseType[]> {
        await connectDB();

        return await TemplatePurchase.find({ userId })
            .sort({ purchasedAt: -1, createdAt: -1 })
            .lean<TemplatePurchaseType[]>();
    },

    async getPurchasedTemplatesForUser(userId: string): Promise<TemplatePurchaseType[]> {
        await connectDB();

        return await TemplatePurchase.find({
            userId,
            paymentStatus: "paid",
        })
            .sort({ purchasedAt: -1, createdAt: -1 })
            .lean<TemplatePurchaseType[]>();
    },

    async getLatestPurchaseForTemplate(
        userId: string,
        input: { templateId?: string; templateSlug?: string }
    ): Promise<TemplatePurchaseType | null> {
        await connectDB();

        const template = templateCatalogService.findTemplateByIdOrSlug(input);
        if (!template) return null;

        return await TemplatePurchase.findOne({
            userId,
            templateId: template.id,
            paymentStatus: "paid",
        })
            .sort({ purchasedAt: -1, createdAt: -1 })
            .lean<TemplatePurchaseType | null>();
    },

    async hasPurchasedTemplate(userId: string, input: { templateId?: string; templateSlug?: string }): Promise<boolean> {
        const purchase = await this.getLatestPurchaseForTemplate(userId, input);
        return Boolean(purchase);
    },

    async directPurchase(
        userId: string,
        email: string,
        input: { templateId?: string; templateSlug?: string }
    ): Promise<DirectTemplatePurchaseResponse> {
        const result = await this.purchaseTemplates(userId, email, [input], "direct");
        const purchase = result.purchased[0];

        if (!purchase) {
            throw new Error("Unable to complete purchase");
        }

        return {
            purchase,
            balanceAfter: result.balanceAfter,
            amountCharged: result.totalCharged,
        };
    },

    async purchaseTemplates(
        userId: string,
        email: string,
        items: CartTemplatePurchaseItemInput[],
        purchaseSource: "direct" | "cart"
    ): Promise<CartTemplatePurchaseResult> {
        await connectDB();

        if (!Array.isArray(items) || items.length === 0) {
            throw new Error("No templates selected");
        }

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const checkoutGroupId = purchaseSource === "cart" && items.length > 1 ? createCheckoutGroupId() : undefined;
        const skippedOwnedTemplateIds: string[] = [];
        const failedTemplateIds: string[] = [];
        const purchased: TemplatePurchaseType[] = [];

        const templatesToCharge: Array<{
            template: NonNullable<ReturnType<typeof templateCatalogService.findTemplateByIdOrSlug>>;
            amountCharged: number;
        }> = [];

        const seenTemplateIds = new Set<string>();

        for (const item of items) {
            const template = templateCatalogService.findTemplateByIdOrSlug(item);
            if (!template) {
                failedTemplateIds.push(item.templateId || item.templateSlug || "unknown");
                continue;
            }

            if (seenTemplateIds.has(template.id)) {
                continue;
            }
            seenTemplateIds.add(template.id);

            const existingPurchase = await this.getLatestPurchaseForTemplate(userId, {
                templateId: template.id,
            });
            if (existingPurchase) {
                skippedOwnedTemplateIds.push(template.id);
                continue;
            }

            if (!isSupportedCurrency(template.currency)) {
                failedTemplateIds.push(template.id);
                continue;
            }

            const amountCharged = convertToBaseCurrency(template.price, template.currency);
            templatesToCharge.push({ template, amountCharged });
        }

        if (templatesToCharge.length === 0) {
            return {
                purchased,
                skippedOwnedTemplateIds,
                failedTemplateIds,
                balanceAfter: user.balance || 0,
                totalCharged: 0,
                checkoutGroupId,
            };
        }

        const totalCharged = roundMoney(
            templatesToCharge.reduce((sum, entry) => sum + entry.amountCharged, 0)
        );

        if ((user.balance || 0) < totalCharged) {
            throw new Error(
                `Not enough balance. Please top up at least ${formatMoney(totalCharged - (user.balance || 0), BASE_CURRENCY)}.`
            );
        }

        for (const entry of templatesToCharge) {
            user.balance = roundMoney((user.balance || 0) - entry.amountCharged);
            await user.save();

            const transaction = await transactionService.record(
                user._id,
                user.email,
                entry.amountCharged,
                "spend",
                user.balance
            );

            const purchase = await this.createPurchase(userId, email, {
                templateId: entry.template.id,
                templateSlug: entry.template.slug,
                amountUsed: entry.amountCharged,
                currency: BASE_CURRENCY,
                purchaseSource,
                paymentStatus: "paid",
                checkoutGroupId,
                transactionId: transaction._id.toString(),
                templateSnapshot: buildTemplateSnapshot(entry.template),
            });

            purchased.push(purchase);
        }

        if (purchased.length > 0) {
            try {
                await emailService.sendTemplatePurchaseConfirmationEmail({
                    email: user.email,
                    firstName: user.firstName,
                    purchases: purchased.map((purchase) => ({
                        templateTitle: purchase.templateTitle,
                        platform: purchase.platform,
                        category: purchase.category,
                    })),
                    amountPaid: totalCharged,
                    purchaseSource,
                    transactionDate: purchased[purchased.length - 1]?.purchasedAt || new Date(),
                });
            } catch (error) {
                console.error("❌ Template purchase confirmation email failed:", {
                    userId,
                    email: user.email,
                    purchaseSource,
                    templateIds: purchased.map((purchase) => purchase.templateId),
                    checkoutGroupId,
                    error,
                });
            }
        }

        return {
            purchased,
            skippedOwnedTemplateIds,
            failedTemplateIds,
            balanceAfter: user.balance || 0,
            totalCharged,
            checkoutGroupId,
        };
    },
};
