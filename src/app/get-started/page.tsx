import HeroSection from "@/components/constructor/hero/Hero";
import ValuesIcons from "@/components/constructor/values-icons/ValuesIcons";
import HowItWorksSection from "@/components/sections/how-it-works-section/HowItWorksSection";
import Grid from "@/components/constructor/grid/Grid";
import InfoBlock from "@/components/constructor/Info-block/InfoBlock";
import FeatureStep from "@/components/constructor/feature-step/FeatureStep";
import FeatureStepsWrapper from "@/components/constructor/feature-step/wrapper/FeatureStepsWrapper";
import FAQ from "@/components/constructor/faq/FAQ";
import TextWithButton from "@/components/constructor/text-with-button/TextWithButton";
import CenteredCtaSection from "@/components/constructor/centered-cta/CenteredCtaSection";

export default function GetStartedPage() {
    return (
        <>
            {/* HERO */}
            <HeroSection
                title={
                    <>
                        Start Fast with Premium <span>Website Templates</span>
                    </>
                }
                description="Create your account, top up your balance, choose the right template, complete your purchase, and start using it right away. The process is simple, fast, and built for quick launches."
                primaryCta={{ text: "Get Started", link: "/sign-up" }}
                secondaryCta={{ text: "Browse Templates", link: "/templates" }}
                image="image6"
            />

            <FeatureStepsWrapper
                label="HOW IT WORKS"
                title="Go from signup to launch in a few simple steps"
                description="Everything is designed to help you buy and use the right template without friction."
                columns={3}
            >
                <FeatureStep
                    step={1}
                    title="Create Your Account"
                    description="Register in seconds to access your dashboard, balance, orders, and purchased templates."
                    icon="login"
                />

                <FeatureStep
                    step={2}
                    title="Top Up Your Balance"
                    description="Add funds securely to your account balance so you can purchase templates quickly and smoothly."
                    icon="wallet"
                />

                <FeatureStep
                    step={3}
                    title="Choose & Use Your Template"
                    description="Pick the template you need, purchase it with your balance, and start using it for your project."
                    icon="zap"
                />
            </FeatureStepsWrapper>

            {/* HOW IT WORKS */}
            <HowItWorksSection
                label="PROCESS"
                title="How It Works"
                description="Get access to the right template in five simple steps."
                highlights={[
                    {
                        title: "Fast onboarding",
                        description: "Create an account and start exploring the marketplace right away.",
                    },
                    {
                        title: "Flexible balance system",
                        description: "Top up once and use your balance whenever you want to buy templates.",
                    },
                    {
                        title: "Instant access after purchase",
                        description: "Your purchased templates stay available inside your account.",
                    },
                ]}
                steps={[
                    {
                        icon: "login",
                        title: "Register",
                        description:
                            "Create your account to unlock access to the marketplace, your balance, and purchased products.",
                    },
                    {
                        icon: "wallet",
                        title: "Top Up Balance",
                        description:
                            "Add funds to your account so you can buy templates without repeating checkout every time.",
                    },
                    {
                        icon: "layout",
                        title: "Choose a Template",
                        description:
                            "Browse categories, compare products, and select the template that matches your project best.",
                    },
                    {
                        icon: "priceTag",
                        title: "Purchase Securely",
                        description:
                            "Use your available balance to complete the purchase quickly and securely.",
                    },
                    {
                        icon: "settings",
                        title: "Use Your Template",
                        description:
                            "Access the purchased template in your account and start building or customizing your website.",
                    },
                ]}
                note={
                    <>
                        After purchase, templates remain available in your account,
                        so you can return to them anytime and continue working on your project.
                    </>
                }
            />

            <CenteredCtaSection
                title="Ready to get your next template?"
                description="Create an account, top up your balance, and start buying premium templates for your next website project."
                primaryCta={{text: "Create Account", link: "/sign-up"}}
                secondaryCta={{text: "Browse Templates", link: "/templates"}}
            />

            {/* FAQ */}
            <FAQ
                title="Frequently Asked Questions"
                description="Quick answers before you start using the marketplace."
                items={[
                    {
                        question: "Why do I need an account?",
                        answer:
                            "An account gives you access to your balance, purchased templates, and order history in one place.",
                    },
                    {
                        question: "What is my balance used for?",
                        answer:
                            "Your balance is used to purchase templates on the marketplace quickly, without repeating full checkout for each order.",
                    },
                    {
                        question: "Does my balance expire?",
                        answer: "No. Your balance remains in your account until you decide to use it.",
                    },
                    {
                        question: "When do I get access to the template?",
                        answer:
                            "Right after a successful purchase, the template becomes available in your account for use.",
                    },
                    {
                        question: "Can I buy more than one template?",
                        answer:
                            "Yes. You can use your balance to purchase as many templates as you want, whenever you need them.",
                    },
                    {
                        question: "Where can I find my purchased templates?",
                        answer:
                            "All purchased templates are stored in your account, so you can access and use them anytime.",
                    },
                ]}
            />
        </>
    );
}