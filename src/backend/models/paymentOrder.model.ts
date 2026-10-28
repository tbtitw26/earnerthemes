import mongoose, { Document, Schema } from "mongoose";

export type PaymentOrderStatus = "PENDING" | "COMPLETED" | "DECLINED" | "CANCELLED" | "ERROR";

export interface PaymentOrderDocument extends Document {
    userId: mongoose.Types.ObjectId;
    userEmail: string;
    referenceId: string;
    procxPaymentId?: string;
    paymentType: string;
    status: PaymentOrderStatus;
    amount: number;
    currency: string;
    baseAmount: number;
    credited: boolean;
    redirectUrl?: string;
    errorCode?: string;
    errorMessage?: string;
    meta?: {
        reference?: string;
        chargedCurrency?: string;
        chargedAmount?: number;
        netAmount?: number;
        vatAmount?: number;
        vatRate?: number;
        termsAcceptedAt?: Date;
        withdrawalWaiverAcceptedAt?: Date;
        billingDescriptor?: string;
        simulated?: boolean;
    };
    rawWebhookData?: unknown;
    createdAt: Date;
    updatedAt: Date;
}

const paymentOrderSchema = new Schema<PaymentOrderDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        userEmail: { type: String, required: true },
        referenceId: { type: String, required: true, unique: true, index: true },
        procxPaymentId: { type: String, index: true, sparse: true },
        paymentType: { type: String, default: "DEPOSIT" },
        status: {
            type: String,
            enum: ["PENDING", "COMPLETED", "DECLINED", "CANCELLED", "ERROR"],
            default: "PENDING",
            index: true,
        },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        baseAmount: { type: Number, required: true },
        credited: { type: Boolean, default: false, index: true },
        redirectUrl: { type: String },
        errorCode: { type: String },
        errorMessage: { type: String },
        meta: {
            reference: { type: String },
            chargedCurrency: { type: String },
            chargedAmount: { type: Number },
            netAmount: { type: Number },
            vatAmount: { type: Number },
            vatRate: { type: Number },
            termsAcceptedAt: { type: Date },
            withdrawalWaiverAcceptedAt: { type: Date },
            billingDescriptor: { type: String },
            simulated: { type: Boolean },
        },
        rawWebhookData: { type: Schema.Types.Mixed },
    },
    {
        timestamps: true,
    }
);

export const PaymentOrder =
    mongoose.models.PaymentOrder ||
    mongoose.model<PaymentOrderDocument>("PaymentOrder", paymentOrderSchema);
