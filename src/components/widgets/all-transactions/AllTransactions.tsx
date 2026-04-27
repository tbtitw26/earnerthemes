"use client";

import React, { useEffect, useState } from "react";
import styles from "./AllTransactions.module.scss";
import { useCurrency } from "@/context/CurrencyContext";

interface Transaction {
    _id: string;
    amount: number;
    type: "add" | "spend";
    balanceAfter: number;
    createdAt: string;
}

export default function TransactionHistory() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const { currency, sign, convertFromBase } = useCurrency();

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
                    <p>Recent billing and purchase activity tied to your account balance.</p>
                </div>
            </header>

            <div className={styles.tableWrap}>
                <div className={styles.head}>
                    <span>Date</span>
                    <span>Activity</span>
                    <span>Amount</span>
                    <span>Balance After</span>
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
                    </div>
                ))}
            </div>
        </section>
    );
}
