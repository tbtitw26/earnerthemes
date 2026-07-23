"use client";

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./PricingCard.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Input from "@mui/joy/Input";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/utils/store";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { MIN_TOP_UP_AMOUNT, parseMoneyAmount } from "@/utils/money";
import { cardStagger, contentReveal, softScaleReveal } from "@/components/motion/system";

interface PricingCardProps {
    variant?: "starter" | "pro" | "premium" | "custom";
    title: string;
    amount: number;
    description: string;
    features?: string[];
    buttonText: string;
    badgeTop?: string;
    index?: number;
    buttonLink?: string;
    badgeBottom?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
                                                     variant = "starter",
                                                     title,
                                                     amount,
                                                     description,
                                                     buttonText,
                                                     badgeTop,
                                                     index = 0,
                                                 }) => {
    const reduced = useReducedMotion();
    const { showAlert } = useAlert();
    const user = useUser();
    const { sign, convertFromBase, currency } = useCurrency();
    const router = useRouter();
    const { setPlan } = useCheckoutStore();

    const isCustom = variant === "custom";
    const [customAmount, setCustomAmount] = useState<string>("");

    const effectiveAmount = useMemo(() => {
        const parsed = parseMoneyAmount(customAmount);
        return parsed ?? 0;
    }, [customAmount]);

    const baseTopUpAmount = useMemo(() => (isCustom ? effectiveAmount : amount), [amount, effectiveAmount, isCustom]);

    const displayPrice = useMemo(() => {
        return convertFromBase(baseTopUpAmount);
    }, [baseTopUpAmount, convertFromBase]);

    const handleBuy = () => {
        if (!user) {
            showAlert("Sign in required", "Please sign in to continue", "info");
            setTimeout(() => router.push("/sign-in"), 1200);
            return;
        }

        const finalAmount = isCustom ? effectiveAmount : amount;
        if (isCustom && finalAmount < MIN_TOP_UP_AMOUNT) {
            showAlert("Minimum top-up", `Please enter at least ${sign}${convertFromBase(MIN_TOP_UP_AMOUNT).toFixed(2)}.`, "warning");
            return;
        }

        const plan = {
            title,
            basePrice: baseTopUpAmount,
            amount: finalAmount,
            variant,
            currency,
        };
        setPlan(plan);
        localStorage.setItem("selectedPlan", JSON.stringify(plan));
        router.push("/checkout");
    };

    return (
        <motion.div
            className={`${styles.card} ${styles[variant]}`}
            variants={cardStagger(reduced, {
                staggerChildren: 0.07,
                delayChildren: index * 0.03,
            })}
        >
            {badgeTop && (
                <motion.div className={styles.badgeWrapper} variants={contentReveal(reduced)}>
                    <span className={styles.badgeTop}>{badgeTop}</span>
                </motion.div>
            )}

            <motion.div className={styles.header} variants={cardStagger(reduced, { staggerChildren: 0.05, delayChildren: 0 })}>
                <motion.h3 className={styles.title} variants={contentReveal(reduced)}>
                    {title}
                </motion.h3>
                <motion.div className={styles.priceContainer} variants={softScaleReveal(reduced)}>
                    <span className={styles.priceValue}>
                        {sign}
                        {displayPrice.toFixed(2)}
                    </span>
                    <span className={styles.oneTime}>one-time, incl. VAT</span>
                </motion.div>
                <motion.div className={styles.tokenHighlight} variants={contentReveal(reduced)}>
                    {isCustom
                        ? `${sign}${displayPrice.toFixed(2)} custom top-up`
                        : `${sign}${displayPrice.toFixed(2)} balance top-up`}
                </motion.div>
            </motion.div>

            <motion.div className={styles.content} variants={contentReveal(reduced)}>
                {isCustom ? (
                    <motion.div className={styles.customSection} variants={cardStagger(reduced, { staggerChildren: 0.05, delayChildren: 0 })}>
                        <div className={styles.divider} />
                        <motion.label className={styles.inputLabel} variants={contentReveal(reduced)}>
                            AMOUNT
                        </motion.label>
                        <motion.div variants={contentReveal(reduced)}>
                            <Input
                                type="text"
                                variant="plain"
                                placeholder="10.00"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                endDecorator={<PiPencilSimpleLineBold size={18} />}
                                className={styles.tokenInput}
                                slotProps={{
                                    input: {
                                        inputMode: "decimal",
                                    },
                                }}
                            />
                        </motion.div>
                        <motion.div className={styles.totalRow} variants={contentReveal(reduced)}>
                            <span>Total Price (incl. VAT)</span>
                            <span className={styles.totalValue}>
                                {sign}
                                {displayPrice.toFixed(2)}
                            </span>
                        </motion.div>
                        <motion.p className={styles.description} variants={contentReveal(reduced)}>
                            Enter any amount from {sign}{convertFromBase(MIN_TOP_UP_AMOUNT).toFixed(2)} and continue to checkout.
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.p className={styles.description} variants={contentReveal(reduced)}>
                        {description}
                    </motion.p>
                )}
            </motion.div>

            <motion.div className={styles.cta} variants={softScaleReveal(reduced)}>
                <ButtonUI fullWidth variant="soft" onClick={handleBuy}>
                    {isCustom ? "Calculate Price" : user ? buttonText : "Sign in to buy"}
                </ButtonUI>
            </motion.div>
        </motion.div>
    );
};

export default PricingCard;
