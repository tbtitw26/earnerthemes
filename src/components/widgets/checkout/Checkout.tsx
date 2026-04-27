"use client";

import React, {useEffect, useMemo, useState} from "react";
import styles from "./Checkout.module.scss";
import {useCurrency} from "@/context/CurrencyContext";
import {CheckoutPlan, useCheckoutStore} from "@/utils/store";
import { isSupportedCurrency, MIN_TOP_UP_AMOUNT } from "@/utils/money";

type StoredPlan = CheckoutPlan & {
    price?: number;
};

const Checkout = () => {
    const {plan, setPlan, clearPlan} = useCheckoutStore();

    const [activePlan, setActivePlan] = useState<CheckoutPlan | null>(plan ?? null);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);

    const {currency, sign, convertFromBase} = useCurrency();

    // hydrate plan from localStorage / store
    useEffect(() => {
        if (!plan) {
            const stored = localStorage.getItem("selectedPlan");
            if (stored) {
                const parsed = JSON.parse(stored) as Partial<StoredPlan>;
                const normalizedPlan: CheckoutPlan = {
                    ...parsed,
                    basePrice: typeof parsed.basePrice === "number" ? parsed.basePrice : parsed.price ?? 0,
                    currency: isSupportedCurrency(parsed.currency) ? parsed.currency : "GBP",
                    variant: typeof parsed.variant === "string" ? parsed.variant : "starter",
                    title: typeof parsed.title === "string" ? parsed.title : "Wallet Top-Up",
                    amount: typeof parsed.amount === "number" ? parsed.amount : 0,
                };
                setPlan(normalizedPlan);
                setActivePlan(normalizedPlan);
            } else {
                setActivePlan(null);
            }
        } else {
            setActivePlan(plan);
        }
    }, [plan, setPlan]);

    /**
     * UI price:
     * - activePlan.basePrice is GBP (base)
     * - convert to selected currency for display
     */
    const basePriceAmount = useMemo(() => activePlan?.basePrice ?? 0, [activePlan]);

    const subtotal = useMemo(() => {
        return convertFromBase(basePriceAmount);
    }, [basePriceAmount, convertFromBase]);

    const vat = useMemo(() => subtotal * 0.2, [subtotal]);
    const total = useMemo(() => subtotal + vat, [subtotal, vat]);

    const displayAmountForPayment = useMemo(
        () => convertFromBase(basePriceAmount),
        [basePriceAmount, convertFromBase]
    );

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activePlan) return;
        if (!agreed || loading) return;

        // guard
        if (!displayAmountForPayment || displayAmountForPayment <= 0) {
            alert("Invalid amount");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/user/top-up-balance", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    currency,
                    amount: displayAmountForPayment,
                }),
            });

            const data = (await res.json().catch(() => ({}))) as { message?: string };

            if (!res.ok) {
                throw new Error(data?.message ?? "Payment failed");
            }

            localStorage.removeItem("selectedPlan");
            clearPlan();
            window.location.href = "/profile";
        } catch (err: unknown) {
            alert(err instanceof Error ? err.message : "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    // ✅ ранній return тільки ПІСЛЯ всіх хуків
    if (!activePlan) {
        return (
            <div className={styles.checkoutEmpty}>
                <p>
                    No top-up selected. Please go back to <a href="/pricing">Pricing</a>.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.checkout}>
            <div className={styles.header}>
                <h1>Wallet Top-Up</h1>
                <p>Secure checkout</p>
            </div>

            <div className={styles.main}>
                <div className={styles.summary}>
                    <h2>Top-Up Summary</h2>

                    <div className={styles.itemRow}>
                        <div className={styles.itemInfo}>
                            <h3>{activePlan.title}</h3>
                            <p>Add funds to your wallet balance</p>
                        </div>
                        <span>
              {sign}
                            {subtotal.toFixed(2)} {currency}
            </span>
                    </div>

                    <div className={styles.line}/>

                    <div className={styles.itemRow}>
                        <p>Subtotal</p>
                        <span>
              {sign}
                            {subtotal.toFixed(2)} {currency}
            </span>
                    </div>

                    <div className={styles.itemRow}>
                        <p>VAT (20%)</p>
                        <span>
              {sign}
                            {vat.toFixed(2)} {currency}
            </span>
                    </div>

                    <div className={styles.totalRow}>
                        <h3>Total</h3>
                        <h3>
                            {sign}
                            {total.toFixed(2)} {currency}
                        </h3>
                    </div>
                </div>

                <div className={styles.payment}>
                    <h2>Payment Details</h2>

                    <form onSubmit={handlePay}>
                        <input type="text" placeholder="Card number"/>
                        <div className={styles.row}>
                            <input type="text" placeholder="MM/YY"/>
                            <input type="text" placeholder="CVV"/>
                        </div>
                        <input type="text" placeholder="Cardholder name"/>
                        <input type="text" placeholder="Billing address"/>

                        <div className={styles.agreement}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />{" "}
                                I agree to the{" "}
                                <a href="/terms-and-conditions" target="_blank" rel="noreferrer">
                                    terms & conditions
                                </a>
                            </label>
                        </div>

                        <p className={styles.helper}>
                            Minimum top-up amount is {sign}{convertFromBase(MIN_TOP_UP_AMOUNT).toFixed(2)}.
                        </p>

                        <button
                            type="submit"
                            disabled={!agreed || loading}
                            className={styles.payButton}
                        >
                            {loading ? "Processing..." : `Pay ${sign}${total.toFixed(2)} ${currency}`}
                        </button>

                        {/* optional debug */}
                        {/* <pre>{JSON.stringify({ currency, displayAmountForPayment }, null, 2)}</pre> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
