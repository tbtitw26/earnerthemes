"use client";

import React from "react";
import AllOrders from "@/components/widgets/all-orders/AllOrders";
import TransactionHistory from "@/components/widgets/all-transactions/AllTransactions";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
    return (
        <section className={styles.dashboard}>
            <div className={styles.header}>
                <div className={styles.copy}>
                    <span className={styles.kicker}>Library & billing</span>
                    <h2 className={styles.title}>Your templates and account history</h2>
                    <p className={styles.subtitle}>
                        Purchased templates and wallet activity are organized below in the same clean billing workspace.
                    </p>
                </div>
            </div>

            <div className={styles.stack}>
                <AllOrders />
                <TransactionHistory />
            </div>
        </section>
    );
}
