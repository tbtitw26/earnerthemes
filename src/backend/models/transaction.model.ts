import mongoose, { Schema, Document } from "mongoose";

export interface TransactionDocument extends Document {
    userId: mongoose.Types.ObjectId;
    email: string;
    amount: number;
    type: "add" | "spend";
    balanceAfter: number;
    /** Human-readable receipt number shown on the PDF receipt. */
    reference?: string;
    /** Currency the customer was actually charged in, and the amount in that currency. */
    chargedCurrency?: string;
    chargedAmount?: number;
    /** VAT split of the charged (gross) amount, stored for the receipt. */
    netAmount?: number;
    vatAmount?: number;
    vatRate?: number;
    /** Consent records captured at checkout. */
    termsAcceptedAt?: Date;
    withdrawalWaiverAcceptedAt?: Date;
    /** Statement descriptor shown to the cardholder for this transaction. */
    billingDescriptor?: string;
    simulated?: boolean;
    createdAt: Date;
}

const transactionSchema = new Schema<TransactionDocument>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["add", "spend"], required: true },
    balanceAfter: { type: Number, required: true },
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
    createdAt: { type: Date, default: Date.now },
});

export const Transaction =
    mongoose.models.Transaction ||
    mongoose.model<TransactionDocument>("Transaction", transactionSchema);
