import mongoose, { Schema, Document, Model } from "mongoose";

export interface SeoRequestDocument extends Document {
    userId: mongoose.Types.ObjectId;
    email: string;
    service: string;
    message?: string;
    extras?: string[];
    amountUsed: number;
    status: "pending" | "completed";
    createdAt: Date;
    updatedAt: Date;
}

const SeoRequestSchema = new Schema<SeoRequestDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        email: { type: String, required: true },
        service: { type: String, required: true },
        message: { type: String },
        extras: [{ type: String }],
        amountUsed: { type: Number, default: 5 },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const SeoRequest: Model<SeoRequestDocument> =
    mongoose.models.SeoRequest ||
    mongoose.model<SeoRequestDocument>("SeoRequest", SeoRequestSchema);
