import { Types } from "mongoose";

export type TemplatePurchaseStatus = "paid" | "refunded" | "voided";
export type TemplatePurchaseSource = "direct" | "cart";

export interface TemplateSnapshot {
    templateId: string;
    templateSlug?: string;
    title: string;
    previewImage?: string;
    sourceUrl: string;
    livePreviewUrl?: string;
    platform?: string;
    category?: string;
    author?: string;
    templatePrice?: number;
    templateCurrency?: string;
}

export interface TemplatePurchaseType {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    email: string;
    templateId: string;
    templateSlug?: string;
    templateTitle: string;
    previewImage?: string;
    sourceUrl: string;
    livePreviewUrl?: string;
    platform?: string;
    category?: string;
    author?: string;
    templatePrice?: number;
    templateCurrency?: string;
    amountUsed: number;
    currency: string;
    paymentStatus: TemplatePurchaseStatus;
    purchaseSource: TemplatePurchaseSource;
    checkoutGroupId?: string;
    transactionId?: Types.ObjectId;
    purchasedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTemplatePurchaseInput {
    templateId?: string;
    templateSlug?: string;
    amountUsed: number;
    currency: string;
    purchaseSource?: TemplatePurchaseSource;
    paymentStatus?: TemplatePurchaseStatus;
    checkoutGroupId?: string;
    transactionId?: string;
    templateSnapshot?: Partial<TemplateSnapshot>;
}

export interface CreateTemplatePurchaseResponse {
    purchase: TemplatePurchaseType;
}

export interface DirectTemplatePurchaseResponse {
    purchase: TemplatePurchaseType;
    balanceAfter: number;
    amountCharged: number;
}

export interface CartTemplatePurchaseItemInput {
    templateId?: string;
    templateSlug?: string;
}

export interface CartTemplatePurchaseResult {
    purchased: TemplatePurchaseType[];
    skippedOwnedTemplateIds: string[];
    failedTemplateIds: string[];
    balanceAfter: number;
    totalCharged: number;
    checkoutGroupId?: string;
}

export interface GetTemplatePurchasesResponse {
    purchases: TemplatePurchaseType[];
}

export interface TemplatePurchaseStatusResponse {
    purchased: boolean;
    purchase: TemplatePurchaseType | null;
}
