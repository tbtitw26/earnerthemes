"use client";

import React from "react";
import styles from "./AllSeo.module.scss";
import { FaRegClock, FaCoins, FaClipboardList } from "react-icons/fa";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Link from "next/link";
import {useSeoRequests} from "@/context/extra-context/SeoContext";
import { useCurrency } from "@/context/CurrencyContext";

const AllSeoRequests: React.FC = () => {
    const { seoRequests, loading, refreshSeoRequests } = useSeoRequests();
    const { sign, currency, convertFromBase } = useCurrency();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatId = (id: string) => id.slice(-6);

    if (loading) return <p className={styles.loading}>Loading SEO requests...</p>;

    if (seoRequests.length === 0)
        return (
            <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📭</span>
                <p>No SEO requests yet.</p>
                <Link href="/seo">
                    <ButtonUI color="primary" size="md" shape="rounded" hoverEffect="shadow">
                        Explore SEO Services
                    </ButtonUI>
                </Link>
            </div>
        );

    return (
        <section className={styles.ordersSection}>
            <div className={styles.header}>
                <h3>Your SEO Requests</h3>
                <p>View your recent SEO service submissions</p>
                <ButtonUI onClick={refreshSeoRequests} color="primary" size="sm">
                    Refresh
                </ButtonUI>
            </div>

            <h4 className={styles.sectionTitle}>Submitted Requests</h4>

            <div className={styles.ordersGrid}>
                {seoRequests.map((req) => (
                    <div key={req._id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.idWrapper}>
                                <span className={styles.orderId}>#{formatId(req._id)}</span>
                                <span
                                    className={`${styles.badge} ${
                                        req.status === "completed"
                                            ? styles.manager
                                            : req.status === "pending"
                                                ? styles.instant
                                                : styles.default
                                    }`}
                                >
                  {req.status}
                </span>
                            </div>
                            <FaClipboardList className={styles.iconStatic} />
                        </div>

                        <div className={styles.cardBody}>
                            <p className={styles.email}>{req.email}</p>

                            <div className={styles.meta}>
                <span className={styles.date}>
                  <FaRegClock /> {formatDate(req.createdAt)} at{" "}
                    {formatTime(req.createdAt)}
                </span>
                                <span className={styles.tokens}>
                  <FaCoins /> -{sign}{convertFromBase(req.amountUsed).toFixed(2)} {currency}
                </span>
                            </div>

                            <p className={styles.extraInfo}>
                                Service: <strong>{req.service}</strong>
                            </p>

                            {req.message && (
                                <p className={styles.extraInfo}>
                                    Message: <em>{req.message}</em>
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllSeoRequests;
