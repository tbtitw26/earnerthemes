"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import styles from "./BalanceCard.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { useCurrency } from "@/context/CurrencyContext";

export default function BalanceCard() {
    const user = useUser();
    const { currency, sign, convertFromBase } = useCurrency();

    if (!user) return null;

    const displayBalance = convertFromBase(user.balance);

    return (
        <section className={styles.card}>
            <div className={styles.top}>
                <div>
                    <p className={styles.label}>Account Balance</p>
                    <h3 className={styles.amount}>{sign}{displayBalance.toFixed(2)}</h3>
                </div>
            </div>

            <div className={styles.balanceMeta}>
                <span className={styles.currencyTag}>{currency}</span>
                <p className={styles.desc}>Use your wallet balance for template purchases and billing activity.</p>
            </div>

            <div className={styles.metrics}>
                <div className={styles.metric}>
                    <span>Account</span>
                    <strong>{user.role === "admin" ? "Admin" : "Active member"}</strong>
                </div>
                <div className={styles.metric}>
                    <span>Billing email</span>
                    <strong>{user.email}</strong>
                </div>
            </div>

            <div className={styles.actions}>
                <Link href="/pricing">
                    <ButtonUI variant="solid" color="primary" size="lg">
                        Top-Up
                    </ButtonUI>
                </Link>
            </div>
        </section>
    );
}
