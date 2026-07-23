"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Layers3, ShoppingBag, Sparkles } from "lucide-react";

import { getTemplateHref } from "@/data/themeforestTemplateHelpers";
import { ThemeTemplate } from "@/types/theme-template";
import { getValidTemplateImageUrl } from "@/utils/templateImage";

import styles from "./TemplateCard.module.scss";

interface TemplateCardProps {
    template: ThemeTemplate;
}

function formatSales(value: number) {
    return new Intl.NumberFormat("en-US", {
        notation: value >= 1000 ? "compact" : "standard",
        maximumFractionDigits: 1,
    }).format(value);
}

function formatPrice(value: number, currency: string) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(value);
}

function resolveBadgeIcon(platform: string) {
    if (platform === "Shopify") {
        return <ShoppingBag size={14} />;
    }

    if (platform === "WordPress") {
        return <Layers3 size={14} />;
    }

    return <Sparkles size={14} />;
}

export default function TemplateCard({ template }: TemplateCardProps) {
    const detailsUrl = getTemplateHref(template);
    const ctaUrl = template.livePreviewUrl || template.sourceUrl;
    const description = template.shortDescription || template.description;
    const imageUrl = getValidTemplateImageUrl(template.coverImage);

    return (
        <article className={styles.card}>
            <div className={styles.media}>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={template.title}
                        fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.image}
                    />
                ) : null}

                <div className={styles.overlayTop}>
                    <span className={styles.platform}>
                        {resolveBadgeIcon(template.platform)}
                        {template.platform}
                    </span>

                    <Link
                        href={detailsUrl}
                        aria-label={`Open ${template.title} details`}
                        className={styles.quickAction}
                    >
                        <ArrowUpRight size={18} />
                    </Link>
                </div>

                <div className={styles.overlayBottom}>
                    <span>{template.category}</span>
                    <span>{template.tech.builder || template.tech.language}</span>
                </div>
            </div>

            <div className={styles.body}>
                <div className={styles.meta}>
                    <span>{template.author}</span>
                    <span>{formatSales(template.sales)} sales</span>
                </div>

                <div className={styles.copy}>
                    <h3>{template.title}</h3>
                </div>

                <div className={styles.tags}>
                    <span>{template.tech.language}</span>
                    {template.tech.builder ? <span>{template.tech.builder}</span> : null}
                    {template.updatedAt ? <span>Updated {template.updatedAt}</span> : null}
                </div>

                <div className={styles.footer}>
                    <div className={styles.priceBlock}>
                        <span className={styles.priceLabel}>Starting at (incl. VAT)</span>
                        <strong>{formatPrice(template.price, template.currency)}</strong>
                    </div>

                    <div className={styles.actions}>
                        <Link href={detailsUrl} className={styles.ghost}>
                            Details
                        </Link>
                        <Link href={ctaUrl} target="_blank" rel="noreferrer" className={styles.primary}>
                            Live Preview
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
