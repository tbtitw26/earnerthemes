"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { getTemplateHref } from "@/data/themeforestTemplateHelpers";
import { ThemeTemplate } from "@/types/theme-template";
import { getValidTemplateImageUrl } from "@/utils/templateImage";
import {
    cardReveal,
    cardStagger,
    contentReveal,
    headingReveal,
    inViewProps,
    mediaReveal,
    sectionReveal,
    useSubtleParallaxBlock,
} from "@/components/motion/system";

import styles from "./ThemeForestShowcase.module.scss";

export interface ThemeForestShowcaseFilterOption {
    value: string;
    label: string;
}

export interface ThemeForestShowcaseProps {
    templates: ThemeTemplate[];
    title?: ReactNode | string;
    subtitle?: string;
    category?: string;
    limit?: number;
    showViewAll?: boolean;
    viewAllHref?: string;
    showFilterBar?: boolean;
    filterOptions?: ThemeForestShowcaseFilterOption[];
}

const DEFAULT_TEMPLATE_LIMIT = 4;
const DEFAULT_CATEGORY = "all";
const DEFAULT_TITLE = (
    <>
        Trending <span>Templates</span>
    </>
);
const DEFAULT_SUBTITLE = "The most popular designs this month";

function formatPrice(value: number, currency: string) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(value);
}

function toTimestamp(value?: string) {
    if (!value) {
        return 0;
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

export function normalizeTemplateFilter(value?: string) {
    return (value || "")
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function formatFilterLabel(value: string) {
    const normalizedValue = normalizeTemplateFilter(value);

    if (normalizedValue === "all") {
        return "All Templates";
    }

    if (normalizedValue === "most-popular") {
        return "Most Popular";
    }

    if (normalizedValue === "newest") {
        return "Newest";
    }

    return value
        .split(/[\s-]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
}

function getUniqueFilterValues(templates: ThemeTemplate[], key: "category" | "platform") {
    const values = new Map<string, string>();

    for (const template of templates) {
        const rawValue = template[key];
        const normalizedValue = normalizeTemplateFilter(rawValue);

        if (!rawValue || !normalizedValue || values.has(normalizedValue)) {
            continue;
        }

        values.set(normalizedValue, rawValue);
    }

    return [...values.entries()]
        .sort((left, right) => left[1].localeCompare(right[1]))
        .map(([value, label]) => ({ value, label }));
}

export function getSortedTemplates(templates: ThemeTemplate[]) {
    return [...templates]
        .sort((left, right) => {
            const featuredDelta = Number(Boolean(right.isFeatured)) - Number(Boolean(left.isFeatured));
            if (featuredDelta !== 0) {
                return featuredDelta;
            }

            const salesDelta = right.sales - left.sales;
            if (salesDelta !== 0) {
                return salesDelta;
            }

            return toTimestamp(right.updatedAt || right.createdAt) - toTimestamp(left.updatedAt || left.createdAt);
        });
}

export function getNewestTemplates(templates: ThemeTemplate[]) {
    return [...templates].sort(
        (left, right) =>
            toTimestamp(right.updatedAt || right.createdAt) - toTimestamp(left.updatedAt || left.createdAt),
    );
}

export function matchesTemplateFilter(template: ThemeTemplate, filter?: string) {
    const normalizedFilter = normalizeTemplateFilter(filter);

    if (!normalizedFilter || normalizedFilter === "all" || normalizedFilter === "most-popular" || normalizedFilter === "newest") {
        return true;
    }

    return [template.category, template.platform].some((value) => normalizeTemplateFilter(value) === normalizedFilter);
}

function buildFilterOptions(
    templates: ThemeTemplate[],
    filterOptions?: ThemeForestShowcaseFilterOption[],
    category?: string,
) {
    const normalizedCategory = normalizeTemplateFilter(category);

    if (filterOptions?.length) {
        const normalizedOptions = filterOptions
            .map((option) => ({
                value: normalizeTemplateFilter(option.value),
                label: option.label,
            }))
            .filter((option) => option.value);

        if (
            normalizedCategory &&
            !normalizedOptions.some((option) => option.value === normalizedCategory)
        ) {
            normalizedOptions.unshift({
                value: normalizedCategory,
                label: formatFilterLabel(category || normalizedCategory),
            });
        }

        return normalizedOptions;
    }

    const derivedOptions: ThemeForestShowcaseFilterOption[] = [
        { value: "all", label: "All Templates" },
        ...getUniqueFilterValues(templates, "category"),
        ...getUniqueFilterValues(templates, "platform"),
    ];

    if (
        normalizedCategory &&
        normalizedCategory !== "all" &&
        !derivedOptions.some((option) => option.value === normalizedCategory)
    ) {
        derivedOptions.unshift({
            value: normalizedCategory,
            label: formatFilterLabel(category || normalizedCategory),
        });
    }

    return derivedOptions;
}

export function getVisibleTemplates(
    templates: ThemeTemplate[],
    filter?: string,
    limit = DEFAULT_TEMPLATE_LIMIT,
) {
    const normalizedFilter = normalizeTemplateFilter(filter) || DEFAULT_CATEGORY;
    const sortedTemplates = normalizedFilter === "newest" ? getNewestTemplates(templates) : getSortedTemplates(templates);
    const matchedTemplates =
        normalizedFilter === "all" || normalizedFilter === "most-popular" || normalizedFilter === "newest"
            ? sortedTemplates
            : getSortedTemplates(templates.filter((template) => matchesTemplateFilter(template, normalizedFilter)));
    const visibleTemplates = matchedTemplates.length ? matchedTemplates : sortedTemplates;
    const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : DEFAULT_TEMPLATE_LIMIT;

    return visibleTemplates.slice(0, normalizedLimit);
}

export default function ThemeForestShowcase({
    templates,
    title = DEFAULT_TITLE,
    subtitle = DEFAULT_SUBTITLE,
    category = DEFAULT_CATEGORY,
    limit = DEFAULT_TEMPLATE_LIMIT,
    showViewAll = true,
    viewAllHref = "/templates",
    showFilterBar = true,
    filterOptions,
}: ThemeForestShowcaseProps) {
    const reduced = useReducedMotion();
    const parallax = useSubtleParallaxBlock<HTMLDivElement>(18);
    const normalizedCategory = normalizeTemplateFilter(category) || DEFAULT_CATEGORY;
    const [activeFilter, setActiveFilter] = useState(normalizedCategory);

    useEffect(() => {
        setActiveFilter(normalizedCategory);
    }, [normalizedCategory]);

    const resolvedFilter = showFilterBar ? activeFilter : normalizedCategory;
    const resolvedFilterOptions = useMemo(
        () => (showFilterBar ? buildFilterOptions(templates, filterOptions, category) : []),
        [category, filterOptions, showFilterBar, templates],
    );
    const visibleTemplates = useMemo(
        () => getVisibleTemplates(templates, resolvedFilter, limit),
        [limit, resolvedFilter, templates],
    );

    if (!visibleTemplates.length) {
        return null;
    }

    return (
        <motion.section
            className={styles.section}
            {...inViewProps(sectionReveal(reduced), { amount: 0.15 })}
        >
            {showFilterBar && resolvedFilterOptions.length ? (
                <motion.div
                    className={styles.filterBar}
                    aria-label="Browse template categories"
                    variants={cardStagger(reduced, {
                        staggerChildren: 0.04,
                        delayChildren: 0.02,
                    })}
                >
                    {resolvedFilterOptions.map((tab) => (
                        <motion.button
                            key={tab.value}
                            type="button"
                            className={tab.value === activeFilter ? styles.filterTabActive : styles.filterTab}
                            onClick={() => setActiveFilter(tab.value)}
                            variants={contentReveal(reduced)}
                        >
                            {tab.label}
                        </motion.button>
                    ))}
                </motion.div>
            ) : null}

            <div className={styles.header} ref={parallax.ref}>
                <motion.div className={styles.headerCopy} style={parallax.style} variants={cardStagger(reduced, { staggerChildren: 0.08, delayChildren: 0.03 })}>
                    <motion.h2 variants={headingReveal(reduced)}>{title}</motion.h2>
                    {subtitle ? <motion.p variants={contentReveal(reduced)}>{subtitle}</motion.p> : null}
                </motion.div>

                {showViewAll ? (
                    <motion.div variants={contentReveal(reduced, "left")}>
                        <Link href={viewAllHref} className={styles.viewAll}>
                            View All
                        </Link>
                    </motion.div>
                ) : null}
            </div>

            <motion.div className={styles.grid} variants={cardStagger(reduced)}>
                {visibleTemplates.map((template) => {
                    const imageUrl = getValidTemplateImageUrl(template.coverImage);

                    return (
                        <motion.article key={template.id} className={styles.card} variants={cardReveal(reduced)}>
                            <Link
                                href={getTemplateHref(template)}
                                className={styles.cardLink}
                                aria-label={`View ${template.title} details`}
                            >
                                <motion.div className={styles.imageWrap} variants={mediaReveal(reduced)}>
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={template.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                                            className={styles.image}
                                        />
                                    ) : (
                                        <div className={styles.imageFallback}>
                                            <span>{template.platform}</span>
                                        </div>
                                    )}
                                </motion.div>

                                <motion.div className={styles.content} variants={cardStagger(reduced, { staggerChildren: 0.05, delayChildren: 0.02 })}>
                                    <motion.div className={styles.titleRow} variants={contentReveal(reduced)}>
                                        <h3>{template.title}</h3>
                                        <strong className={styles.price}>
                                            {formatPrice(template.price, template.currency)}
                                        </strong>
                                    </motion.div>

                                    <motion.div className={styles.tags} variants={contentReveal(reduced)}>
                                        {template.platform ? <span>{template.platform}</span> : null}
                                        {template.category ? <span>{template.category}</span> : null}
                                        {template.tech.builder ? <span>{template.tech.builder}</span> : null}
                                    </motion.div>
                                </motion.div>
                            </Link>
                        </motion.article>
                    );
                })}
            </motion.div>
        </motion.section>
    );
}
