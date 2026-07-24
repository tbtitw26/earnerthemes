"use client";

import React, { useEffect, useState } from "react";
import styles from "./AllTransactions.module.scss";
import { useCurrency } from "@/context/CurrencyContext";
import { useUser } from "@/context/UserContext";
import { downloadReceiptPDF } from "@/pdf-creator/receipt/downloadReceipt";
import { netFromGross, VAT_RATE, vatFromGross } from "@/utils/money";

interface Transaction {
    _id: string;
    amount: number;
    type: "add" | "spend";
    balanceAfter: number;
    createdAt: string;
    reference?: string;
    chargedCurrency?: string;
    chargedAmount?: number;
    netAmount?: number;
    vatAmount?: number;
    vatRate?: number;
    billingDescriptor?: string;
    simulated?: boolean;
}

export default function TransactionHistory() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState<string | null>(null);
    const { currency, sign, convertFromBase } = useCurrency();
    const user = useUser();

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/transactions/get-all", {
                    credentials: "include",
                });
                const data = await res.json();
                if (res.ok) setTransactions(data.transactions);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

    /**
     * Transactions recorded before the receipt fields existed fall back to the
     * base-currency amount that was stored at the time.
     */
    const handleDownload = async (t: Transaction) => {
        setBusyId(t._id);
        try {
            const receiptCurrency = t.chargedCurrency ?? "GBP";
            const gross = t.chargedAmount ?? t.amount;
            await downloadReceiptPDF({
                reference: t.reference ?? t._id.slice(-8).toUpperCase(),
                issuedAt: formatDate(t.createdAt),
                customerEmail: user?.email ?? "",
                description: t.type === "add" ? "Account Balance top-up" : "Template purchase",
                currency: receiptCurrency,
                grossAmount: gross,
                netAmount: t.netAmount ?? netFromGross(gross),
                vatAmount: t.vatAmount ?? vatFromGross(gross),
                vatRate: t.vatRate ?? VAT_RATE,
                balanceAfter: t.balanceAfter,
                balanceCurrency: "GBP",
                billingDescriptor: t.billingDescriptor,
                simulated: t.simulated,
            });
        } finally {
            setBusyId(null);
        }
    };

    if (loading) {
        return <p className={styles.loading}>Loading transactions…</p>;
    }

    if (transactions.length === 0) {
        return (
            <div className={styles.empty}>
                <p>No transactions yet.</p>
            </div>
        );
    }

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <div>
                    <h3>Transaction History</h3>
                    <p>Recent billing and purchase activity tied to your Account Balance.</p>
                </div>
            </header>

            <div className={styles.tableWrap}>
                <div className={styles.head}>
                    <span>Date</span>
                    <span>Activity</span>
                    <span>Amount</span>
                    <span>Balance After</span>
                    <span>Receipt</span>
                </div>

                {transactions.map((t) => (
                    <div className={styles.row} key={t._id}>
                        <span className={styles.date}>
                            {formatDate(t.createdAt)}
                        </span>

                        <span
                            className={
                                t.type === "add"
                                    ? styles.typeAdd
                                    : styles.typeSpend
                            }
                        >
                            {t.type === "add" ? "Funds Added" : "Purchase"}
                        </span>

                        <span
                            className={
                                t.type === "add"
                                    ? styles.amountAdd
                                    : styles.amountSpend
                            }
                        >
                            {t.type === "add" ? "+" : "-"}
                            {sign}{convertFromBase(t.amount).toFixed(2)}
                        </span>

                        <span className={styles.balance}>
                            {sign}{convertFromBase(t.balanceAfter).toFixed(2)} {currency}
                        </span>

                        <span>
                            <button
                                type="button"
                                className={styles.receiptButton}
                                onClick={() => handleDownload(t)}
                                disabled={busyId === t._id}
                            >
                                {busyId === t._id ? "Preparing…" : "Download PDF"}
                            </button>
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
