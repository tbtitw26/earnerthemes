"use client";

import Link from "next/link";
import React, { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import {
    FiArrowRight,
    FiBookOpen,
    FiCreditCard,
    FiDownload,
    FiHelpCircle,
    FiLayers,
    FiLifeBuoy,
    FiSearch,
    FiShield,
    FiUser,
} from "react-icons/fi";

import styles from "./FAQ.module.scss";

export type FAQCategory = string;

export interface FAQItem {
    question: string;
    answer: string;
    category?: FAQCategory;
}

export type FAQCardIcon =
    | "book"
    | "shield"
    | "support"
    | "payments"
    | "downloads"
    | "templates"
    | "account"
    | "help";

export interface FAQCard {
    title: string;
    description: string;
    href: string;
    linkText: string;
    icon?: FAQCardIcon;
}

export interface FAQContactCTA {
    title?: string;
    description?: string;
    buttonText?: string;
    href?: string;
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
    description?: string;
    categories?: FAQCategory[];
    cards?: FAQCard[];
    contactCta?: FAQContactCTA;
    image?: string;
}

const cardIcons = {
    book: FiBookOpen,
    shield: FiShield,
    support: FiLifeBuoy,
    payments: FiCreditCard,
    downloads: FiDownload,
    templates: FiLayers,
    account: FiUser,
    help: FiHelpCircle,
} satisfies Record<FAQCardIcon, React.ComponentType<{ className?: string }>>;

const normalizeCategory = (value?: string) => (value?.trim() ? value.trim() : "General");

const FAQ: React.FC<FAQProps> = ({
                                     items,
                                     title = "Frequently Asked Questions",
                                     description,
                                     categories,
                                     cards = [],
                                     contactCta,
                                 }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [openItemKey, setOpenItemKey] = useState<string | null>(null);
    const searchId = useId();

    const availableCategories = useMemo(() => {
        const derived = Array.from(
            new Set(items.map((item) => normalizeCategory(item.category))),
        );

        const merged = categories?.length
            ? Array.from(new Set(categories.map((category) => normalizeCategory(category)).concat(derived)))
            : derived;

        return ["All", ...merged];
    }, [categories, items]);

    const filteredItems = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return items.filter((item) => {
            const itemCategory = normalizeCategory(item.category);
            const matchesCategory =
                activeCategory === "All" || itemCategory === activeCategory;

            if (!matchesCategory) {
                return false;
            }

            if (!query) {
                return true;
            }

            return `${item.question} ${item.answer}`.toLowerCase().includes(query);
        });
    }, [activeCategory, items, searchQuery]);

    const getItemKey = (item: FAQItem) =>
        `${normalizeCategory(item.category)}-${item.question}`;

    const cta = {
        title: contactCta?.title ?? "Need help with your template purchase?",
        description:
            contactCta?.description ??
            "Our support team can help with balance top-ups, template purchases, downloads, and account access.",
        buttonText: contactCta?.buttonText ?? "Contact Support",
        href: contactCta?.href ?? "/contact-us",
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    {description && <p className={styles.description}>{description}</p>}

                    <div className={styles.searchWrap}>
                        <label className={styles.searchLabel} htmlFor={searchId}>
                            Search template marketplace questions
                        </label>
                        <div className={styles.searchField}>
                            <FiSearch className={styles.searchIcon} aria-hidden="true" />
                            <input
                                id={searchId}
                                className={styles.searchInput}
                                type="search"
                                placeholder="Search templates, payments, downloads..."
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.tabs} role="tablist" aria-label="FAQ categories">
                        {availableCategories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                role="tab"
                                aria-selected={activeCategory === category}
                                className={`${styles.tab} ${activeCategory === category ? styles.tabActive : ""}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {cards.length > 0 && (
                    <div className={styles.cards}>
                        {cards.map((card) => {
                            const Icon = card.icon ? cardIcons[card.icon] : FiHelpCircle;

                            return (
                                <Link key={`${card.title}-${card.href}`} href={card.href} className={styles.card}>
                                    <span className={styles.cardIconWrap} aria-hidden="true">
                                        <Icon className={styles.cardIcon} />
                                    </span>
                                    <h3 className={styles.cardTitle}>{card.title}</h3>
                                    <p className={styles.cardDescription}>{card.description}</p>
                                    <span className={styles.cardLink}>
                                        {card.linkText}
                                        <FiArrowRight aria-hidden="true" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                )}

                <div className={styles.accordion}>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, idx) => {
                            const itemKey = getItemKey(item);
                            const isOpen = openItemKey === itemKey;
                            const panelId = `${searchId}-panel-${idx}`;
                            const buttonId = `${searchId}-button-${idx}`;

                            return (
                                <div
                                    key={itemKey}
                                    className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                                >
                                    <button
                                        id={buttonId}
                                        type="button"
                                        className={styles.question}
                                        onClick={() => setOpenItemKey(isOpen ? null : itemKey)}
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                    >
                                        <span className={styles.questionText}>{item.question}</span>
                                        <motion.span
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className={styles.arrow}
                                        >
                                            <IoIosArrowDown />
                                        </motion.span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                id={panelId}
                                                role="region"
                                                aria-labelledby={buttonId}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: "easeOut" }}
                                                className={styles.answerWrapper}
                                            >
                                                <div className={styles.answer}>{item.answer}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })
                    ) : (
                        <div className={styles.emptyState}>
                            <h3>No matching questions found</h3>
                            <p>Try another keyword or switch to a different category.</p>
                        </div>
                    )}
                </div>

                <div className={styles.cta}>
                    <div className={styles.ctaContent}>
                        <p className={styles.ctaEyebrow}>Marketplace Support</p>
                        <h3 className={styles.ctaTitle}>{cta.title}</h3>
                        <p className={styles.ctaDescription}>{cta.description}</p>
                    </div>

                    <Link href={cta.href} className={styles.ctaButton}>
                        <FiLifeBuoy aria-hidden="true" />
                        <span>{cta.buttonText}</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FAQ;