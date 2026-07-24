import type {Metadata} from "next";
import {COMPANY_NAME} from "@/resources/constants";

import HeroSection from "@/components/constructor/hero/Hero";
import ValuesIcons from "@/components/constructor/values-icons/ValuesIcons";
import Grid from "@/components/constructor/grid/Grid";
import FAQ from "@/components/constructor/faq/FAQ";
import PricingCard from "@/components/constructor/pricing-card/PricingCard";
import PromoFeatureCard from "@/components/features/promo-card/PromoFeatureCard";
import InfoBlock from "@/components/constructor/Info-block/InfoBlock";
import Cta from "@/components/constructor/cta/Cta";
import CenteredCtaSection from "@/components/constructor/centered-cta/CenteredCtaSection";
import StatsStrip from "@/components/constructor/stats-strip/StatsStrip";
import HowItWorksSection from "@/components/sections/how-it-works-section/HowItWorksSection";
import ThemeForestShowcase from "@/components/sections/themeforest-showcase/ThemeForestShowcase";
import {themeforestTemplates} from "@/data/themeforestTemplates";
import {topUpPlans} from "@/data/topUpPlans";

export const metadata: Metadata = {
    title: `${COMPANY_NAME} — Website Templates Marketplace`,
    description:
        "Browse premium website templates for WordPress, Shopify, eCommerce, business, portfolio, and landing pages. Discover top-rated designs, new arrivals, and marketplace-ready digital products.",
    alternates: {canonical: "/"},
};

/** Derived from the generated catalogue so the numbers on the page are always real. */
const catalogStats = {
    templateCount: themeforestTemplates.templates.length,
    categoryCount: new Set(themeforestTemplates.templates.map((template) => template.category)).size,
    platformCount: new Set(themeforestTemplates.templates.map((template) => template.platform)).size,
};

export default function HomePage() {
    return (
        <>
            {/* HERO */}
            <HeroSection
                title={
                    <>
                        Premium Website <span>Templates</span> for Every Project
                    </>
                }
                description="Discover a curated marketplace of high-quality website templates for WordPress, Shopify, eCommerce, portfolios, landing pages, and business sites. Browse top-rated designs, launch faster, and find the perfect template for your next project."
                primaryCta={{text: "Browse Templates", link: "/templates"}}
                secondaryCta={{text: "Explore Categories", link: "/templates"}}
                image="image1"
            />

            {/* STATS */}
            <StatsStrip
                items={[
                    {value: `${catalogStats.templateCount}`, label: "Templates in Catalogue"},
                    {value: `${catalogStats.categoryCount}`, label: "Categories"},
                    {value: `${catalogStats.platformCount}`, label: "Supported Platforms"},
                    {value: "24/7", label: "Marketplace Access"},
                ]}
            />

            {/* PLATFORM HIGHLIGHTS */}
            <Grid columns={2} gap="2rem">
                <InfoBlock
                    badge="featured"
                    variant="light"
                    color="blue"
                    title="WordPress Templates"
                    icon="wordpress"
                    description="Discover responsive, SEO-friendly WordPress themes for business websites, agencies, blogs, portfolios, and online stores."
                    buttonText="Browse WordPress"
                    buttonLink="/templates?category=wordpress"
                />
                <InfoBlock
                    badge="featured"
                    variant="light"
                    color="green"
                    title="Shopify Templates"
                    icon="shopify"
                    description="Launch modern eCommerce stores faster with conversion-focused Shopify templates built for product sales and clean shopping experiences."
                    buttonText="Browse Shopify"
                    buttonLink="/templates?category=shopify"
                />
            </Grid>

            <ThemeForestShowcase
                templates={themeforestTemplates.templates}
                title={<>Most Popular <span>Templates</span></>}
                subtitle="Best-selling marketplace picks chosen by customers"
                category="most-popular"
                limit={4}
                showFilterBar={false}
            />

            <ThemeForestShowcase
                templates={themeforestTemplates.templates}
                title="Latest Arrivals"
                subtitle="Freshly added templates for modern websites and stores"
                category="newest"
                limit={4}
                showFilterBar={false}
            />

            {/* WHY CHOOSE US */}
            <ValuesIcons
                tagline="WHY OUR MARKETPLACE"
                title="Templates Built to Launch Faster"
                description="Carefully selected designs, trusted quality, flexible categories, and a smoother way to find the right template for any niche."
                values={[
                    {
                        title: "Curated Selection",
                        description: "Handpicked templates designed for real businesses, creators, and online stores.",
                        icon: "bulb",
                    },
                    {
                        title: "Fast Performance",
                        description: "Responsive layouts and optimized structures built for modern browsing speed.",
                        icon: "speed",
                    },
                    {
                        title: "Secure Purchases",
                        description: "A reliable marketplace experience with safe checkout and protected downloads.",
                        icon: "shield",
                    },
                    {
                        title: "Flexible Use Cases",
                        description: "From portfolios to eCommerce, find templates for nearly any industry or goal.",
                        icon: "flex",
                    },
                ]}
            />

            <HowItWorksSection
                label="PROCESS"
                title="How It Works"
                description="Find the right template and get your project online in a few simple steps."
                steps={[
                    {
                        icon: "login",
                        title: "Browse the Marketplace",
                        description: "Explore categories, popular products, and fresh arrivals to find the right fit.",
                    },
                    {
                        icon: "settings",
                        title: "Compare Features",
                        description: "Review layouts, styles, platforms, and functionality before choosing your template.",
                    },
                    {
                        icon: "wallet",
                        title: "Purchase with Confidence",
                        description: "Complete your order securely and unlock instant access to your selected product.",
                    },
                    {
                        icon: "zap",
                        title: "Launch Your Website",
                        description: "Use your template to build a professional site faster and go live sooner.",
                    },
                ]}
            />

            <ThemeForestShowcase
                templates={themeforestTemplates.templates}
                title={<>Shopify <span>Templates</span></>}
                subtitle="Best Shopify storefront designs for online brands"
                category="shopify"
                limit={4}
                showFilterBar={false}
            />

            <ThemeForestShowcase
                templates={themeforestTemplates.templates}
                title={<>WordPress <span>Templates</span></>}
                subtitle="Top WordPress themes for business, blogs, and portfolios"
                category="wordpress"
                limit={4}
                showFilterBar={false}
            />

            {/* PRICING */}
            <Grid
                title="Top Up Your Balance"
                description="Add funds to your Account Balance and use it for any template on the marketplace. All prices include VAT."
                columns={4}
                gap="2rem"
            >
                {topUpPlans.map((plan) => (
                    <PricingCard key={plan.title} {...plan} />
                ))}
            </Grid>

            {/* FINAL CTA */}
            <CenteredCtaSection
                title="Ready to find your next template?"
                description="Explore a marketplace of premium website templates for WordPress, Shopify, eCommerce, portfolios, and more."
                primaryCta={{text: "Browse Templates", link: "/templates"}}
                secondaryCta={{text: "View Categories", link: "/templates"}}
            />

            {/* FAQ */}
            <FAQ
                items={[
                    {
                        question: "What kind of templates can I find here?",
                        answer:
                            "You can browse templates for WordPress, Shopify, eCommerce, business websites, portfolios, landing pages, blogs, and other popular website types.",
                    },
                    {
                        question: "Are the templates suitable for commercial projects?",
                        answer:
                            "Yes. Many templates are designed for agencies, businesses, freelancers, online stores, and client work.",
                    },
                    {
                        question: "Can I explore templates by category?",
                        answer:
                            "Yes. The marketplace is structured around categories so visitors can quickly find WordPress, Shopify, portfolio, business, and other template types.",
                    },
                    {
                        question: "Why use a marketplace instead of building from scratch?",
                        answer:
                            "A template marketplace helps you launch faster, reduce design time, and start with layouts that are already structured for modern websites.",
                    },
                ]}
            />
        </>
    );
}