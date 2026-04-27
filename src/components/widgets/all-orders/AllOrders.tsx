"use client";

import React from "react";
import { useAllOrders } from "@/context/AllOrdersContext";
import styles from "./AllOrders.module.scss";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import Image from "next/image";
import { getValidTemplateImageUrl } from "@/utils/templateImage";

const AllOrders: React.FC = () => {
    const { templatePurchases, loading, refreshOrders } = useAllOrders();
    const { sign, currency, convertFromBase } = useCurrency();

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    if (loading) {
        return <p className={styles.loading}>Loading templates…</p>;
    }

    if (templatePurchases.length === 0) {
        return (
            <section className={styles.section}>
                <header className={styles.header}>
                    <div>
                        <h3>Your Templates</h3>
                        <p>Purchased templates will appear here once they are added to your account.</p>
                    </div>
                </header>

                <div className={styles.emptyState}>
                    <p>No purchased templates yet.</p>
                    <Link href="/templates" className={styles.primaryLink}>
                        Browse templates
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <div>
                    <h3>Your Templates</h3>
                    <p>Manage the purchased templates currently available in your account library.</p>
                </div>

                <button type="button" className={styles.refreshButton} onClick={refreshOrders}>
                    Refresh
                </button>
            </header>

            <div className={styles.templateGrid}>
                {templatePurchases.map((purchase) => {
                    const imageUrl = getValidTemplateImageUrl(purchase.previewImage);

                    return (
                        <article key={purchase._id.toString()} className={styles.templateCard}>
                            <div className={styles.templateMedia}>
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={purchase.templateTitle}
                                        fill
                                        sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className={styles.templateImage}
                                    />
                                ) : (
                                    <div className={styles.templateFallback}>
                                        <span>{purchase.platform || "Template"}</span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.templateBody}>
                                <div className={styles.templateMeta}>
                                    <span>{purchase.platform || "Template"}</span>
                                    <span>{purchase.purchaseSource === "cart" ? "Cart checkout" : "Direct purchase"}</span>
                                </div>

                                <h4>{purchase.templateTitle}</h4>

                                <div className={styles.templateInfo}>
                                    <span>Acquired {formatDate(String(purchase.purchasedAt || purchase.createdAt))}</span>
                                    <span>
                                        Paid {sign}{convertFromBase(purchase.amountUsed).toFixed(2)} {currency}
                                    </span>
                                </div>

                                <div className={styles.templateActions}>
                                    <Link href={`/templates/${purchase.templateSlug || purchase.templateId}`} className={styles.cardAction}>
                                        Manage
                                    </Link>
                                    {purchase.livePreviewUrl ? (
                                        <Link
                                            href={purchase.livePreviewUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={styles.cardSecondaryAction}
                                        >
                                            View
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default AllOrders;
