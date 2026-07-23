"use client";

import React, {useEffect, useMemo, useState} from "react";
import styles from "./Checkout.module.scss";
import {useCurrency} from "@/context/CurrencyContext";
import {CheckoutPlan, useCheckoutStore} from "@/utils/store";
import {
    isSupportedCurrency,
    MIN_TOP_UP_AMOUNT,
    netFromGross,
    parseMoneyAmount,
    VAT_RATE,
    vatFromGross,
} from "@/utils/money";

type StoredPlan = CheckoutPlan & {
    price?: number;
};

const Checkout = () => {
    const {plan, setPlan, clearPlan} = useCheckoutStore();

    const [activePlan, setActivePlan] = useState<CheckoutPlan | null>(plan ?? null);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [customAmount, setCustomAmount] = useState("");
    const [amountError, setAmountError] = useState("");

    const {currency, sign, convertFromBase, convertToBase} = useCurrency();

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
     * Price handling:
     * - activePlan.basePrice is a VAT-inclusive (gross) amount in GBP (base currency)
     * - it is converted to the selected currency purely for display
     */
    const basePriceAmount = useMemo(() => activePlan?.basePrice ?? 0, [activePlan]);

    // Gross (VAT-inclusive) total in the display currency — this is what the customer pays.
    const total = useMemo(() => convertFromBase(basePriceAmount), [basePriceAmount, convertFromBase]);
    const netAmount = useMemo(() => netFromGross(total), [total]);
    const vat = useMemo(() => vatFromGross(total), [total]);

    const startTopUp = (e: React.FormEvent) => {
        e.preventDefault();

        const parsed = parseMoneyAmount(customAmount);
        const minInCurrency = convertFromBase(MIN_TOP_UP_AMOUNT);

        if (parsed === null) {
            setAmountError("Enter a valid amount, for example 25.00.");
            return;
        }

        if (parsed < minInCurrency) {
            setAmountError(`The minimum top-up is ${sign}${minInCurrency.toFixed(2)}.`);
            return;
        }

        setAmountError("");

        // Convert the entered display amount back to the base currency for storage.
        const baseAmount = convertToBase(parsed);
        const newPlan: CheckoutPlan = {
            title: "Wallet Top-Up",
            basePrice: baseAmount,
            amount: baseAmount,
            variant: "custom",
            currency,
        };

        setPlan(newPlan);
        setActivePlan(newPlan);
        localStorage.setItem("selectedPlan", JSON.stringify(newPlan));
    };

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activePlan) return;
        if (!agreed || loading) return;

        // guard
        if (!total || total <= 0) {
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
                    amount: total,
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

    // No plan selected yet — let the customer enter an amount here instead of dead-ending.
    if (!activePlan) {
        return (
            <div className={styles.checkout}>
                <div className={styles.header}>
                    <h1>Wallet Top-Up</h1>
                    <p>Secure checkout</p>
                </div>

                <div className={styles.main}>
                    <div className={styles.summary}>
                        <h2>Choose an amount</h2>
                        <p className={styles.helper}>
                            Enter how much you want to add to your wallet, or pick a package on the{" "}
                            <a href="/pricing">Plans</a> page. All amounts include VAT.
                        </p>

                        <form onSubmit={startTopUp}>
                            <label className={styles.amountLabel} htmlFor="topUpAmount">
                                Amount ({currency})
                            </label>
                            <input
                                id="topUpAmount"
                                type="text"
                                inputMode="decimal"
                                placeholder={convertFromBase(MIN_TOP_UP_AMOUNT).toFixed(2)}
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                            />

                            {amountError ? <p className={styles.errorText}>{amountError}</p> : null}

                            <p className={styles.helper}>
                                Minimum top-up amount is {sign}
                                {convertFromBase(MIN_TOP_UP_AMOUNT).toFixed(2)}.
                            </p>

                            <button type="submit" className={styles.payButton}>
                                Continue to payment
                            </button>
                        </form>
                    </div>
                </div>
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
                            {total.toFixed(2)} {currency}
                        </span>
                    </div>

                    <div className={styles.line}/>

                    <div className={styles.itemRow}>
                        <p>Net amount</p>
                        <span>
                            {sign}
                            {netAmount.toFixed(2)} {currency}
                        </span>
                    </div>

                    <div className={styles.itemRow}>
                        <p>VAT ({Math.round(VAT_RATE * 100)}%), included</p>
                        <span>
                            {sign}
                            {vat.toFixed(2)} {currency}
                        </span>
                    </div>

                    <div className={styles.totalRow}>
                        <h3>Total (incl. VAT)</h3>
                        <h3>
                            {sign}
                            {total.toFixed(2)} {currency}
                        </h3>
                    </div>

                    <p className={styles.note}>
                        The full amount you pay is credited to your wallet balance.{" "}
                        <a href="/checkout" onClick={() => { clearPlan(); localStorage.removeItem("selectedPlan"); }}>
                            Change amount
                        </a>
                    </p>
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
                            Minimum top-up amount is {sign}{convertFromBase(MIN_TOP_UP_AMOUNT).toFixed(2)}. All prices
                            include VAT.
                        </p>

                        <button
                            type="submit"
                            disabled={!agreed || loading}
                            className={styles.payButton}
                        >
                            {loading ? "Processing..." : `Pay ${sign}${total.toFixed(2)} ${currency}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
