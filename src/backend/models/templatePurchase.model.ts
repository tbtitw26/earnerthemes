import mongoose, { Document, Model, Schema } from "mongoose";
import {
    TemplatePurchaseSource,
    TemplatePurchaseStatus,
} from "@/backend/types/template-purchase.types";

export interface TemplatePurchaseDocument extends Document {
    userId: mongoose.Types.ObjectId;
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
    transactionId?: mongoose.Types.ObjectId;
    purchasedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const templatePurchaseSchema = new Schema<TemplatePurchaseDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        email: { type: String, required: true, trim: true, lowercase: true },

        templateId: { type: String, required: true, trim: true, index: true },
        templateSlug: { type: String, required: false, trim: true, index: true },
        templateTitle: { type: String, required: true, trim: true },
        previewImage: { type: String, required: false, trim: true },
        sourceUrl: { type: String, required: true, trim: true },
        livePreviewUrl: { type: String, required: false, trim: true },
        platform: { type: String, required: false, trim: true },
        category: { type: String, required: false, trim: true },
        author: { type: String, required: false, trim: true },
        templatePrice: { type: Number, required: false, min: 0 },
        templateCurrency: { type: String, required: false, trim: true },

        amountUsed: { type: Number, required: true, min: 0 },
        currency: { type: String, required: true, trim: true, uppercase: true },

        paymentStatus: {
            type: String,
            enum: ["paid", "refunded", "voided"],
            default: "paid",
            index: true,
        },
        purchaseSource: {
            type: String,
            enum: ["direct", "cart"],
            default: "direct",
        },
        checkoutGroupId: { type: String, required: false, trim: true, index: true },
        transactionId: { type: Schema.Types.ObjectId, ref: "Transaction", required: false },
        purchasedAt: { type: Date, default: Date.now, index: true },
    },
    { timestamps: true }
);

templatePurchaseSchema.index({ userId: 1, templateId: 1, paymentStatus: 1 });

export const TemplatePurchase: Model<TemplatePurchaseDocument> =
    mongoose.models.TemplatePurchase ||
    mongoose.model<TemplatePurchaseDocument>("TemplatePurchase", templatePurchaseSchema);
