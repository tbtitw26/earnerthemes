"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useAlert } from "@/context/AlertContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useUser } from "@/context/UserContext";
import { ThemeTemplate } from "@/types/theme-template";
import {
    createTemplateCartItem,
    useTemplateCartStore,
} from "@/utils/store";
import TemplatePurchaseConfirmDialog from "@/components/templates/purchase-confirmation/TemplatePurchaseConfirmDialog";

import styles from "./TemplateCartActions.module.scss";

interface TemplateCartActionsProps {
    template: ThemeTemplate;
}

interface PurchaseStatusResponse {
    purchased: boolean;
}

interface DirectPurchaseResponse {
    purchase: {
        templateId: string;
    };
    amountCharged: number;
}

export default function TemplateCartActions({ template }: TemplateCartActionsProps) {
    const user = useUser();
    const { showAlert } = useAlert();
    const { formatPrice } = useCurrency();
    const router = useRouter();

    const addItem = useTemplateCartStore((state) => state.addItem);
    const removeItem = useTemplateCartStore((state) => state.removeItem);
    const isInCart = useTemplateCartStore((state) => state.isInCart(template.id));

    const [purchased, setPurchased] = useState(false);
    const [checkingPurchase, setCheckingPurchase] = useState(false);
    const [buyingNow, setBuyingNow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        let isActive = true;

        async function checkPurchaseStatus() {
            if (!user?._id) {
                setPurchased(false);
                return;
            }

            try {
                setCheckingPurchase(true);
                const res = await fetch(
                    `/api/template-purchases/check?templateId=${encodeURIComponent(template.id)}`,
                    { credentials: "include" }
                );

                if (!res.ok) return;

                const data = (await res.json()) as PurchaseStatusResponse;
                if (isActive) {
                    setPurchased(Boolean(data.purchased));
                }
            } catch {
                if (isActive) {
                    setPurchased(false);
                }
            } finally {
                if (isActive) {
                    setCheckingPurchase(false);
                }
            }
        }

        checkPurchaseStatus();

        return () => {
            isActive = false;
        };
    }, [template.id, user?._id]);

    const addLabel = useMemo(() => {
        if (purchased) return "Already Purchased";
        if (isInCart) return "In Cart";
        if (checkingPurchase) return "Checking...";
        return "Add to Cart";
    }, [checkingPurchase, isInCart, purchased]);

    const buyLabel = useMemo(() => {
        if (buyingNow) return "Processing...";
        if (purchased) return "Already Purchased";
        return "Buy Now";
    }, [buyingNow, purchased]);

    const priceLabel = useMemo(
        () => formatPrice(template.price, template.currency),
        [formatPrice, template.currency, template.price]
    );

    const handleAddToCart = () => {
        if (!user) {
            showAlert("Sign in required", "Please sign in to continue.", "info");
            router.push("/sign-in");
            return;
        }

        if (purchased) {
            showAlert("Already purchased", "This template is already in your library.", "info");
            return;
        }

        if (isInCart) {
            showAlert("Already in cart", "This template is already in your cart.", "info");
            return;
        }

        const result = addItem(createTemplateCartItem(template));
        if (result.added) {
            showAlert("Added to cart", `"${template.title}" is now in your cart.`, "success");
            return;
        }

        showAlert("Already in cart", "This template is already in your cart.", "info");
    };

    const handleBuyNow = async () => {
        if (!user) {
            showAlert("Sign in required", "Please sign in to continue.", "info");
            router.push("/sign-in");
            return;
        }

        if (purchased) {
            showAlert("Already purchased", "This template is already in your library.", "info");
            return;
        }

        if (buyingNow) {
            return;
        }

        setShowConfirm(true);
    };

    const confirmBuyNow = async () => {
        if (buyingNow) return;

        try {
            setBuyingNow(true);

            const res = await fetch("/api/template-purchases/direct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    templateId: template.id,
                    templateSlug: template.slug,
                }),
            });

            const data = (await res.json()) as DirectPurchaseResponse & { message?: string };

            if (!res.ok) {
                if (data?.message?.includes("Not enough balance")) {
                    showAlert("Insufficient balance", data.message, "warning");
                    router.push("/pricing");
                    return;
                }

                throw new Error(data?.message || "Unable to complete purchase");
            }

            setPurchased(true);
            removeItem(template.id);
            showAlert("Purchase completed", `"${template.title}" is now yours.`, "success");
            router.refresh();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unable to complete purchase";
            showAlert("Purchase failed", message, "error");
        } finally {
            setBuyingNow(false);
            setShowConfirm(false);
        }
    };

    return (
        <div className={styles.actionsBlock}>
            <button
                type="button"
                className={`${styles.primaryButton} ${purchased ? styles.disabledButton : ""}`}
                onClick={handleAddToCart}
                disabled={purchased || checkingPurchase}
            >
                {addLabel}
            </button>

            <button
                type="button"
                className={styles.ghostButton}
                onClick={handleBuyNow}
                disabled={buyingNow || checkingPurchase || purchased}
            >
                {buyLabel}
            </button>

            <TemplatePurchaseConfirmDialog
                open={showConfirm}
                title="You are about to purchase this template"
                description="Review the item below. The purchase will only complete after you confirm."
                items={[
                    {
                        id: template.id,
                        title: template.title,
                        meta: [template.platform, template.category].filter(Boolean).join(" · "),
                        priceLabel,
                    },
                ]}
                totalLabel={`${priceLabel} incl. VAT`}
                processing={buyingNow}
                onCancel={() => {
                    if (!buyingNow) setShowConfirm(false);
                }}
                onConfirm={confirmBuyNow}
            />
        </div>
    );
}
