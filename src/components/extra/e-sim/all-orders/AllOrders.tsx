"use client";

import React from "react";
import styles from "./AllOrders.module.scss";
import { FaClock, FaCoins, FaSimCard } from "react-icons/fa";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Link from "next/link";
import { useEsimOrders } from "@/context/extra-context/EsimOrdersContext";
import { useCurrency } from "@/context/CurrencyContext";

const AllEsimOrders: React.FC = () => {
    const { orders, loading, refreshOrders } = useEsimOrders();
    const { sign, currency, convertFromBase } = useCurrency();

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    const formatTime = (dateStr: string) =>
        new Date(dateStr).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const shortId = (id: string) => id.slice(-6);

    if (loading) {
        return <p className={styles.loading}>Loading eSIM orders…</p>;
    }

    if (orders.length === 0) {
        return (
            <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📶</span>
                <p>You haven’t purchased any eSIM yet.</p>
                <Link href="/extra/esim-store">
                    <ButtonUI size="md" shape="rounded">
                        Go to eSIM Store
                    </ButtonUI>
                </Link>
            </div>
        );
    }

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h3>Your eSIM Orders</h3>
                <p>Purchased mobile data plans</p>
                <ButtonUI size="sm" onClick={refreshOrders}>
                    Refresh
                </ButtonUI>
            </header>

            <div className={styles.grid}>
                {orders.map(order => (
                    <div key={order._id} className={styles.card}>
                        {/* HEADER */}
                        <div className={styles.cardHeader}>
                            <div className={styles.idBlock}>
                                <span className={styles.orderId}>
                                    #{shortId(order._id)}
                                </span>

                                <span
                                    className={`${styles.status} ${
                                        order.status === "delivered"
                                            ? styles.delivered
                                            : order.status === "paid"
                                                ? styles.paid
                                                : styles.pending
                                    }`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <FaSimCard className={styles.icon} />
                        </div>

                        {/* BODY */}
                        <div className={styles.body}>
                            <div className={styles.country}>
                                <img
                                    src={`https://flagcdn.com/w40/${order.countryCode.toLowerCase()}.png`}
                                    alt={order.country}
                                />
                                <strong>{order.country}</strong>
                            </div>

                            <p className={styles.plan}>{order.plan}</p>

                            <div className={styles.meta}>
                                <span>
                                    <FaClock />
                                    {formatDate(order.createdAt)}{" "}
                                    {formatTime(order.createdAt)}
                                </span>

                                <span className={styles.tokens}>
                                    <FaCoins /> -{sign}{convertFromBase(order.amountUsed).toFixed(2)} {currency}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllEsimOrders;
