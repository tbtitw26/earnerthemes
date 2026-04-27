import mongoose, { Schema, Document, Model } from "mongoose";

export interface EsimOrderDocument extends Document {
    userId: mongoose.Types.ObjectId;
    email: string;
    country: string;
    countryCode: string;
    plan: string;
    amountUsed: number;
    status: "paid" | "delivered";
    createdAt: Date;
    updatedAt: Date;
}

const EsimOrderSchema = new Schema<EsimOrderDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        email: { type: String, required: true },

        country: { type: String, required: true },
        countryCode: { type: String, required: true },
        plan: { type: String, required: true },

        amountUsed: { type: Number, required: true },

        status: {
            type: String,
            enum: ["paid", "delivered"],
            default: "paid",
        },
    },
    { timestamps: true }
);

export const EsimOrder: Model<EsimOrderDocument> =
    mongoose.models.EsimOrder ||
    mongoose.model<EsimOrderDocument>("EsimOrder", EsimOrderSchema);
