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
                description="Use a suggested amount or enter your own custom top-up. Minimum £10.00."
                columns={4}
                gap="2rem"
            >
                <PricingCard
                    variant="starter"
                    title="Starter"
                    amount={10}
                    badgeTop="Minimum"
                    description="A simple starter top-up for your first order or a quick wallet refill."
                    buttonText="Top Up Balance"
                />

                <PricingCard
                    variant="pro"
                    title="Growth"
                    amount={25}
                    badgeTop="Popular"
                    description="A flexible wallet top-up for ongoing service requests and repeat use."
                    buttonText="Add Funds"
                />

                <PricingCard
                    variant="premium"
                    title="Pro"
                    amount={50}
                    badgeTop="Best Value"
                    description="A larger wallet refill for customers who expect multiple purchases or larger service spend."
                    buttonText="Top Up Now"
                />

                <PricingCard
                    variant="custom"
                    title="Custom"
                    badgeTop="Flexible"
                    amount={0}
                    description="Choose the exact amount you want to add to your wallet."
                    buttonText="Continue"
                />
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
