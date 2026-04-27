"use client";

import React from "react";
import styles from "./StoryGridSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import { media } from "@/resources/media";
import type { StaticImageData } from "next/image";
import { FiArrowUpRight, FiShield, FiZap, FiMaximize2 } from "react-icons/fi";

type CardType = "featureLarge" | "featureDark" | "featureLight" | "ctaWide";

interface StoryCard {
    type: CardType;
    title: string;
    text: string;
    images?: string[];
    ctaLabel?: string;
    ctaHref?: string;
}

interface StoryGridSectionProps {
    label?: string;
    title?: string;
    cards: StoryCard[];
}

const iconMap: Record<CardType, React.ReactNode> = {
    featureLarge: <FiMaximize2 />,
    featureDark: <FiZap />,
    featureLight: <FiShield />,
    ctaWide: null,
};

export default function StoryGridSection({
                                             label,
                                             title,
                                             cards,
                                         }: StoryGridSectionProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {(label || title) && (
                    <div className={styles.header}>
                        {label && <span className={styles.label}>{label}</span>}
                        {title && <h2 className={styles.title}>{title}</h2>}
                    </div>
                )}

                <div className={styles.grid}>
                    {cards.map((card, i) => {
                        const images =
                            card.images?.map(
                                (key) =>
                                    (media as Record<string, string | StaticImageData>)[key]
                            ) || [];

                        if (card.type === "featureLarge") {
                            return (
                                <article key={i} className={styles.featureLarge}>
                                    <div className={styles.cardIcon}>{iconMap[card.type]}</div>
                                    <h3 className={styles.cardTitle}>{card.title}</h3>
                                    <p className={styles.cardText}>{card.text}</p>

                                    <div className={styles.previewRow}>
                                        {images.slice(0, 2).map((img, idx) => (
                                            <div key={idx} className={styles.previewPane}>
                                                <Image
                                                    src={img}
                                                    alt={`${card.title} preview ${idx + 1}`}
                                                    fill
                                                    className={styles.previewImage}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            );
                        }

                        if (card.type === "featureDark") {
                            return (
                                <article key={i} className={styles.featureDark}>
                                    <div className={styles.cardIconDark}>{iconMap[card.type]}</div>
                                    <h3 className={styles.cardTitleDark}>{card.title}</h3>
                                    <p className={styles.cardTextDark}>{card.text}</p>

                                    {card.ctaLabel && (
                                        <Link
                                            href={card.ctaHref || "#"}
                                            className={styles.inlineLink}
                                        >
                                            {card.ctaLabel}
                                            <FiArrowUpRight />
                                        </Link>
                                    )}
                                </article>
                            );
                        }

                        if (card.type === "featureLight") {
                            return (
                                <article key={i} className={styles.featureLight}>
                                    <div className={styles.cardIconLight}>
                                        {iconMap[card.type]}
                                    </div>
                                    <h3 className={styles.cardTitle}>{card.title}</h3>
                                    <p className={styles.cardText}>{card.text}</p>
                                </article>
                            );
                        }

                        if (card.type === "ctaWide") {
                            return (
                                <article key={i} className={styles.ctaWide}>
                                    <div className={styles.ctaContent}>
                                        <h3 className={styles.ctaTitle}>{card.title}</h3>
                                        <p className={styles.ctaText}>{card.text}</p>

                                        {card.ctaLabel && (
                                            <Link
                                                href={card.ctaHref || "#"}
                                                className={styles.ctaButton}
                                            >
                                                {card.ctaLabel}
                                            </Link>
                                        )}
                                    </div>

                                    <div className={styles.teamStack}>
                                        {images.slice(0, 3).map((img, idx) => (
                                            <div key={idx} className={styles.teamAvatar}>
                                                <Image
                                                    src={img}
                                                    alt={`${card.title} team ${idx + 1}`}
                                                    fill
                                                    className={styles.teamImage}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            );
                        }

                        return null;
                    })}
                </div>
            </div>
        </section>
    );
}