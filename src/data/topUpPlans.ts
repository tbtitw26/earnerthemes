import { SupportedCurrency } from "@/utils/money";

export interface TopUpPlan {
    variant: "starter" | "pro" | "premium" | "custom";
    title: string;
    /** Fallback amount in the base currency (EUR), used when no per-currency price exists. */
    amount: number;
    /**
     * VAT-inclusive price in EUR.
     */
    amounts?: Partial<Record<SupportedCurrency, number>>;
    badgeTop: string;
    description: string;
    buttonText: string;
}

/**
 * Single source of truth for the Account Balance top-up packages.
 * Rendered identically on the home page and on /pricing so the two never drift apart.
 */
export const topUpPlans: TopUpPlan[] = [
    {
        variant: "starter",
        title: "Starter",
        amount: 10,
        amounts: { EUR: 10 },
        badgeTop: "Starter",
        description: "A simple starter top-up for your first order or a quick balance refill.",
        buttonText: "Top Up Balance",
    },
    {
        variant: "pro",
        title: "Growth",
        amount: 25,
        amounts: { EUR: 25 },
        badgeTop: "Popular",
        description: "A flexible top-up for ongoing purchases and repeat use.",
        buttonText: "Add Funds",
    },
    {
        variant: "premium",
        title: "Pro",
        amount: 50,
        amounts: { EUR: 50 },
        badgeTop: "Best Value",
        description:
            "A larger refill for customers who expect multiple purchases or larger overall spend.",
        buttonText: "Top Up Now",
    },
    {
        variant: "custom",
        title: "Custom",
        amount: 0,
        badgeTop: "Flexible",
        description: "Choose the exact amount you want to add to your Account Balance.",
        buttonText: "Continue",
    },
];
