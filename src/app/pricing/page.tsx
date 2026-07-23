"use client";

import Grid from "@/components/constructor/grid/Grid";
import PricingCard from "@/components/constructor/pricing-card/PricingCard";
import ValuesIcons from "@/components/constructor/values-icons/ValuesIcons";
import StoryGridSection from "@/components/sections/story-grid-section/StoryGridSection";
import HowItWorksSection from "@/components/sections/how-it-works-section/HowItWorksSection";
import TextWithButton from "@/components/constructor/text-with-button/TextWithButton";
import PromoFeatureCard from "@/components/features/promo-card/PromoFeatureCard";
import FAQ from "@/components/constructor/faq/FAQ";
import PromoSection from "@/components/sections/promo-section/PromoSection";
import { topUpPlans } from "@/data/topUpPlans";

export default function PricingPage() {
    return (
        <>
            <PromoSection
                title="Top Up Your"
                highlight="Balance"
                description="Add funds to your wallet, choose any amount from £10.00, and use your balance across specialist services, AI workflows, and future orders."
            />

            <Grid
                title="Balance Top-Up"
                description="Use a suggested amount or enter your own custom top-up. Minimum £10.00. All prices include VAT."
                columns={4}
                gap="2rem"
            >
                {topUpPlans.map((plan) => (
                    <PricingCard key={plan.title} {...plan} />
                ))}
            </Grid>

            <FAQ
                items={[
                    {
                        question: "What is my wallet balance used for?",
                        answer:
                            "Your wallet balance is used for service purchases across the platform. You only pay when you place an order.",
                    },
                    {
                        question: "Is there a minimum top-up?",
                        answer: "Yes. The minimum balance top-up is £10.00.",
                    },
                    {
                        question: "Can I enter a custom amount?",
                        answer:
                            "Yes. You can top up with any custom amount as long as it is at least £10.00.",
                    },
                    {
                        question: "When is my balance available?",
                        answer:
                            "Successful top-ups are credited to your wallet immediately after checkout.",
                    },
                ]}
            />
        </>
    );
}
