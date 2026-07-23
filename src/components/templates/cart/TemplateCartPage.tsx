"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, Download, LayoutTemplate, Sparkles } from "lucide-react";

import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import {
    CartTemplatePurchaseResult,
    TemplatePurchaseType,
} from "@/backend/types/template-purchase.types";
import {
    getTemplateCartItemCount,
    getTemplateCartTotal,
    TemplateCartItem,
    useTemplateCartStore,
} from "@/utils/store";
import { getValidTemplateImageUrl } from "@/utils/templateImage";
import { netFromGross, VAT_RATE, vatFromGross } from "@/utils/money";
import TemplatePurchaseConfirmDialog from "@/components/templates/purchase-confirmation/TemplatePurchaseConfirmDialog";
import TemplateCard from "@/components/templates/catalog/TemplateCard";
import { themeforestTemplates } from "@/data/themeforestTemplates";
import { ThemeTemplate } from "@/types/theme-template";

import styles from "./TemplateCartPage.module.scss";
import ThemeForestShowcase from "@/components/sections/themeforest-showcase/ThemeForestShowcase";

interface PurchasedTemplatesResponse {
    purchases: TemplatePurchaseType[];
}

const EMPTY_STATE_FEATURES = [
    {
        icon: <Download size={18} />,
        title: "Instant download",
        description: "Launch faster with assets ready the moment you purchase.",
    },
    {
        icon: <BadgeCheck size={18} />,
        title: "Lifetime updates",
        description: "Keep your storefront current with polished, maintained builds.",
    },
    {
        icon: <LayoutTemplate size={18} />,
        title: "Clean code",
        description: "Use production-ready structures built for real client work.",
    },
    {
        icon: <Sparkles size={18} />,
        title: "Modern UI",
        description: "Choose premium layouts tailored to SaaS, commerce, and creators.",
    },
];

const EMPTY_STATE_CATEGORIES = [
    { label: "SaaS", href: "/templates" },
    { label: "E-commerce", href: "/templates" },
    { label: "Portfolio", href: "/templates" },
    { label: "AI Tools", href: "/templates" },
];

function formatPrice(value: number, currency: string) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

function CartRow({
    item,
    purchased,
    onRemove,
    onBuy,
    loading,
}: {
    item: TemplateCartItem;
    purchased: boolean;
    onRemove: (templateId: string) => void;
    onBuy: (item: TemplateCartItem) => void;
    loading: boolean;
}) {
    const imageUrl = getValidTemplateImageUrl(item.previewImage);

    return (
        <article className={styles.cartCard}>
            <div className={styles.media}>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 180px"
                        className={styles.mediaImage}
                    />
                ) : (
                    <div className={styles.mediaFallback}>
                        <span>{item.platform}</span>
                    </div>
                )}
            </div>

            <div className={styles.itemBody}>
                <div className={styles.itemTop}>
                    <div>
                        <div className={styles.badges}>
                            <span>{item.platform}</span>
                            <span>{item.category}</span>
                            {purchased ? <span className={styles.purchasedBadge}>Purchased</span> : null}
                        </div>
                        <h2>{item.title}</h2>
                        <p className={styles.author}>By {item.author}</p>
                    </div>

                    <div className={styles.price}>{formatPrice(item.price, item.currency)}</div>
                </div>

                <div className={styles.itemActions}>
                    <Link href={`/templates/${item.templateSlug || item.templateId}`} className={styles.inlineLink}>
                        View details
                    </Link>
                    {item.livePreviewUrl ? (
                        <Link href={item.livePreviewUrl} target="_blank" rel="noreferrer" className={styles.inlineLink}>
                            Live preview
                        </Link>
                    ) : null}
                    <button
                        type="button"
                        className={styles.buyButton}
                        onClick={() => onBuy(item)}
                        disabled={loading || purchased}
                    >
                        {loading ? "Processing..." : purchased ? "Already Purchased" : "Buy Now"}
                    </button>
                    <button type="button" className={styles.removeButton} onClick={() => onRemove(item.templateId)}>
                        Remove
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function TemplateCartPage() {
    const user = useUser();
    const { showAlert } = useAlert();
    const router = useRouter();

    const items = useTemplateCartStore((state) => state.items);
    const removeItem = useTemplateCartStore((state) => state.removeItem);
    const removeItems = useTemplateCartStore((state) => state.removeItems);
    const clearCart = useTemplateCartStore((state) => state.clearCart);

    const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
    const [buyingAll, setBuyingAll] = useState(false);
    const [buyingTemplateId, setBuyingTemplateId] = useState<string | null>(null);
    const [confirmMode, setConfirmMode] = useState<"single" | "all" | null>(null);
    const [confirmItem, setConfirmItem] = useState<TemplateCartItem | null>(null);

    const loadPurchasedTemplates = useCallback(async () => {
        if (!user?._id) {
            setPurchasedIds([]);
            return;
        }

        try {
            const res = await fetch("/api/template-purchases/purchased", {
                credentials: "include",
            });

            if (!res.ok) return;

            const data = (await res.json()) as PurchasedTemplatesResponse;
            setPurchasedIds((data.purchases || []).map((purchase) => purchase.templateId));
        } catch {
            setPurchasedIds([]);
        }
    }, [user?._id]);

    useEffect(() => {
        let isActive = true;

        async function load() {
            if (!isActive) return;
            await loadPurchasedTemplates();
        }

        load();

        return () => {
            isActive = false;
        };
    }, [loadPurchasedTemplates]);

    const itemCount = useMemo(() => getTemplateCartItemCount(items), [items]);
    const total = useMemo(() => getTemplateCartTotal(items), [items]);
    const displayCurrency = items[0]?.currency || "USD";
    const purchasedItemsInCart = useMemo(
        () => items.filter((item) => purchasedIds.includes(item.templateId)).length,
        [items, purchasedIds]
    );
    const confirmItems = useMemo(() => {
        if (confirmMode === "single" && confirmItem) {
            return [confirmItem];
        }

        if (confirmMode === "all") {
            return items.filter((item) => !purchasedIds.includes(item.templateId));
        }

        return [];
    }, [confirmItem, confirmMode, items, purchasedIds]);
    const confirmTotal = useMemo(() => getTemplateCartTotal(confirmItems), [confirmItems]);
    const confirmCurrency = confirmItems[0]?.currency || displayCurrency;
    const popularTemplates = useMemo<ThemeTemplate[]>(() => {
        return [...themeforestTemplates.templates]
            .sort((left, right) => {
                const featuredDelta = Number(Boolean(right.isFeatured)) - Number(Boolean(left.isFeatured));
                if (featuredDelta !== 0) {
                    return featuredDelta;
                }

                const salesDelta = right.sales - left.sales;
                if (salesDelta !== 0) {
                    return salesDelta;
                }

                return (right.updatedAt || right.createdAt).localeCompare(left.updatedAt || left.createdAt);
            })
            .slice(0, 4);
    }, []);

    const handleClearCart = () => {
        clearCart();
        showAlert("Cart cleared", "All template items were removed from your cart.", "success");
    };

    const reconcileCartAfterPurchase = (result: CartTemplatePurchaseResult) => {
        const purchasedTemplateIds = result.purchased.map((purchase) => purchase.templateId);
        const templateIdsToRemove = [...purchasedTemplateIds, ...result.skippedOwnedTemplateIds];

        if (templateIdsToRemove.length > 0) {
            removeItems(Array.from(new Set(templateIdsToRemove)));
        }

        setPurchasedIds((current) => Array.from(new Set([...current, ...templateIdsToRemove])));
    };

    const handleAuthRequired = () => {
        showAlert("Sign in required", "Please sign in to continue.", "info");
        router.push("/sign-in");
    };

    const handleBuyItem = async (item: TemplateCartItem) => {
        if (!user) {
            handleAuthRequired();
            return;
        }

        if (purchasedIds.includes(item.templateId)) {
            removeItem(item.templateId);
            showAlert("Already purchased", "This template is already owned and was removed from your cart.", "info");
            return;
        }

        if (buyingTemplateId || buyingAll) {
            return;
        }

        setConfirmItem(item);
        setConfirmMode("single");
    };

    const confirmBuyItem = async () => {
        const item = confirmItem;
        if (!item || buyingTemplateId || buyingAll) return;

        try {
            setBuyingTemplateId(item.templateId);

            const res = await fetch("/api/template-purchases/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    items: [{ templateId: item.templateId, templateSlug: item.templateSlug }],
                }),
            });

            const data = (await res.json()) as CartTemplatePurchaseResult & { message?: string };

            if (!res.ok) {
                if (data?.message?.includes("Not enough balance")) {
                    showAlert("Insufficient balance", data.message, "warning");
                    router.push("/pricing");
                    return;
                }
                throw new Error(data?.message || "Unable to complete purchase");
            }

            reconcileCartAfterPurchase(data);
            await loadPurchasedTemplates();

            if (data.purchased.length > 0) {
                showAlert("Purchase completed", `"${item.title}" is now yours.`, "success");
            } else if (data.skippedOwnedTemplateIds.includes(item.templateId)) {
                showAlert("Already purchased", `"${item.title}" was already owned and removed from your cart.`, "info");
            } else {
                showAlert("No eligible item", "Nothing was purchased for this cart item.", "warning");
            }

            router.refresh();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to complete purchase";
            showAlert("Purchase failed", message, "error");
        } finally {
            setBuyingTemplateId(null);
            setConfirmMode(null);
            setConfirmItem(null);
        }
    };

    const handleBuyAll = async () => {
        if (!user) {
            handleAuthRequired();
            return;
        }

        if (buyingAll || buyingTemplateId) {
            return;
        }

        const eligibleItems = items.filter((item) => !purchasedIds.includes(item.templateId));
        if (eligibleItems.length === 0) {
            showAlert("Already purchased", "There are no eligible templates left to purchase in your cart.", "info");
            return;
        }

        setConfirmMode("all");
    };

    const confirmBuyAll = async () => {
        if (buyingAll || buyingTemplateId) return;

        try {
            setBuyingAll(true);

            const res = await fetch("/api/template-purchases/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    items: items.map((item) => ({
                        templateId: item.templateId,
                        templateSlug: item.templateSlug,
                    })),
                }),
            });

            const data = (await res.json()) as CartTemplatePurchaseResult & { message?: string };

            if (!res.ok) {
                if (data?.message?.includes("Not enough balance")) {
                    showAlert("Insufficient balance", data.message, "warning");
                    router.push("/pricing");
                    return;
                }
                throw new Error(data?.message || "Unable to complete checkout");
            }

            reconcileCartAfterPurchase(data);
            await loadPurchasedTemplates();

            const purchasedCount = data.purchased.length;
            const skippedCount = data.skippedOwnedTemplateIds.length;

            if (purchasedCount > 0) {
                showAlert(
                    "Checkout completed",
                    `${purchasedCount} template${purchasedCount > 1 ? "s were" : " was"} purchased successfully${skippedCount ? `, ${skippedCount} already owned item${skippedCount > 1 ? "s were" : " was"} removed` : ""}.`,
                    "success"
                );
            } else if (skippedCount > 0) {
                showAlert(
                    "Already purchased",
                    `${skippedCount} already owned item${skippedCount > 1 ? "s were" : " was"} removed from your cart.`,
                    "info"
                );
            } else {
                showAlert("No eligible items", "There were no cart items eligible for checkout.", "warning");
            }

            router.refresh();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to complete checkout";
            showAlert("Checkout failed", message, "error");
        } finally {
            setBuyingAll(false);
            setConfirmMode(null);
            setConfirmItem(null);
        }
    };

    if (items.length === 0) {
        return (
            <main className={styles.page}>
                <section className={styles.emptyHero}>
                    <div className={styles.emptyHeroGlow} aria-hidden />
                    <div className={styles.emptyHeroCopy}>
                        <span className={styles.emptyKicker}>Template Cart</span>
                        <h1>Your cart is empty</h1>
                        <p>
                            Explore premium marketplace templates, save the strongest options, and return here when
                            you are ready to check out.
                        </p>
                        <div className={styles.emptyActions}>
                            <Link href="/templates" className={styles.primaryButton}>
                                Browse Templates
                            </Link>
                            <Link href="/templates" className={styles.secondaryButton}>
                                View Marketplace
                            </Link>
                        </div>
                    </div>

                    <div className={styles.emptyHeroAside}>
                        <div className={styles.emptyStatCard}>
                            <span>Marketplace ready</span>
                            <strong>{themeforestTemplates.templates.length} templates</strong>
                            <p>Shop curated Shopify and WordPress themes with real preview and purchase flows.</p>
                        </div>
                    </div>
                </section>

                <section className={styles.featureStrip} aria-label="Marketplace benefits">
                    {EMPTY_STATE_FEATURES.map((feature) => (
                        <article key={feature.title} className={styles.featureCard}>
                            <div className={styles.featureIcon}>{feature.icon}</div>
                            <div>
                                <h2>{feature.title}</h2>
                                <p>{feature.description}</p>
                            </div>
                        </article>
                    ))}
                </section>

                <ThemeForestShowcase
                    templates={themeforestTemplates.templates}
                    title={<>Most Popular <span>Templates</span></>}
                    subtitle="Top-selling marketplace picks"
                    category="most-popular"
                    limit={4}
                    showFilterBar={false}
                />
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <section className={styles.header}>
                <div>
                    <span className={styles.kicker}>Template Cart</span>
                    <h1>Review your selected templates</h1>
                    <p>
                        Review selected templates, remove anything you do not need, and confirm purchases only when
                        you are ready.
                    </p>
                </div>

                <Link href="/templates" className={styles.backLink}>
                    Continue browsing
                </Link>
            </section>

            <section className={styles.layout}>
                <div className={styles.itemsColumn}>
                    {items.map((item) => (
                        <CartRow
                            key={item.templateId}
                            item={item}
                            purchased={purchasedIds.includes(item.templateId)}
                            onRemove={removeItem}
                            onBuy={handleBuyItem}
                            loading={buyingTemplateId === item.templateId || buyingAll}
                        />
                    ))}
                </div>

                <aside className={styles.summaryCard}>
                    <div className={styles.summaryBlock}>
                        <span className={styles.summaryLabel}>Items</span>
                        <strong>{itemCount}</strong>
                    </div>
                    <div className={styles.summaryBlock}>
                        <span className={styles.summaryLabel}>Net amount</span>
                        <strong>{formatPrice(netFromGross(total), displayCurrency)}</strong>
                    </div>
                    <div className={styles.summaryBlock}>
                        <span className={styles.summaryLabel}>VAT ({Math.round(VAT_RATE * 100)}%), included</span>
                        <strong>{formatPrice(vatFromGross(total), displayCurrency)}</strong>
                    </div>
                    <div className={styles.summaryBlock}>
                        <span className={styles.summaryLabel}>Total (incl. VAT)</span>
                        <strong className={styles.summaryTotal}>{formatPrice(total, displayCurrency)}</strong>
                    </div>

                    {purchasedItemsInCart > 0 ? (
                        <div className={styles.notice}>
                            {purchasedItemsInCart} item{purchasedItemsInCart > 1 ? "s are" : " is"} already purchased on
                            this account. Checkout will skip duplicates and remove them from the cart safely.
                        </div>
                    ) : null}

                    <div className={styles.summaryActions}>
                        <button
                            type="button"
                            className={styles.primaryButton}
                            onClick={handleBuyAll}
                            disabled={buyingAll || buyingTemplateId !== null}
                        >
                            {buyingAll ? "Processing..." : "Buy All"}
                        </button>
                        <button type="button" className={styles.secondaryButton} onClick={handleClearCart}>
                            Clear Cart
                        </button>
                    </div>
                </aside>
            </section>

            <TemplatePurchaseConfirmDialog
                open={confirmMode !== null}
                title={
                    confirmMode === "all"
                        ? `You are about to purchase ${confirmItems.length} template${confirmItems.length === 1 ? "" : "s"}`
                        : "You are about to purchase this template"
                }
                description={
                    confirmMode === "all"
                        ? "Review the templates below. The purchase will only complete after you confirm this checkout."
                        : "Review the item below. The purchase will only complete after you confirm."
                }
                items={confirmItems.map((item) => ({
                    id: item.templateId,
                    title: item.title,
                    meta: [item.platform, item.category].filter(Boolean).join(" · "),
                    priceLabel: formatPrice(item.price, item.currency),
                }))}
                totalLabel={`${formatPrice(confirmTotal, confirmCurrency)} incl. VAT`}
                processing={buyingAll || buyingTemplateId !== null}
                onCancel={() => {
                    if (buyingAll || buyingTemplateId !== null) return;
                    setConfirmMode(null);
                    setConfirmItem(null);
                }}
                onConfirm={confirmMode === "all" ? confirmBuyAll : confirmBuyItem}
            />
        </main>
    );
}
