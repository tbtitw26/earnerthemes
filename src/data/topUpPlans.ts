import { MIN_TOP_UP_AMOUNT } from "@/utils/money";

export interface TopUpPlan {
    variant: "starter" | "pro" | "premium" | "custom";
    title: string;
    amount: number;
    badgeTop: string;
    description: string;
    buttonText: string;
}

/**
 * Single source of truth for the wallet top-up packages.
 * Rendered identically on the home page and on /pricing so the two never drift apart.
 * Amounts are VAT-inclusive prices in the base currency (GBP).
 */
export const topUpPlans: TopUpPlan[] = [
    {
        variant: "starter",
        title: "Starter",
        amount: MIN_TOP_UP_AMOUNT,
        badgeTop: "Minimum",
        description: "A simple starter top-up for your first order or a quick wallet refill.",
        buttonText: "Top Up Balance",
    },
    {
        variant: "pro",
        title: "Growth",
        amount: 25,
        badgeTop: "Popular",
        description: "A flexible wallet top-up for ongoing service requests and repeat use.",
        buttonText: "Add Funds",
    },
    {
        variant: "premium",
        title: "Pro",
        amount: 50,
        badgeTop: "Best Value",
        description:
            "A larger wallet refill for customers who expect multiple purchases or larger service spend.",
        buttonText: "Top Up Now",
    },
    {
        variant: "custom",
        title: "Custom",
        amount: 0,
        badgeTop: "Flexible",
        description: "Choose the exact amount you want to add to your wallet.",
        buttonText: "Continue",
    },
];
