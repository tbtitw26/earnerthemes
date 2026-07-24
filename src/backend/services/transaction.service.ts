import { connectDB } from "../config/db";
import { Transaction } from "@/backend/models/transaction.model";
import mongoose from "mongoose";

/** Extra receipt/consent details captured at checkout. */
export interface TransactionMeta {
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
}

export const transactionService = {
    async record(
        userId: mongoose.Types.ObjectId,
        email: string,
        amount: number,
        type: "add" | "spend",
        balanceAfter: number,
        meta: TransactionMeta = {}
    ) {
        await connectDB();
        const tx = await Transaction.create({
            userId,
            email,
            amount,
            type,
            balanceAfter,
            ...meta,
        });
        console.log("🧾 Transaction saved:", tx);
        return tx;
    },
};
