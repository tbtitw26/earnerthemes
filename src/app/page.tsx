import type {Metadata} from "next";
import {COMPANY_NAME} from "@/resources/constants";

import HeroSection from "@/components/constructor/hero/Hero";
import ValuesIcons from "@/components/constructor/values-icons/ValuesIcons";
import Grid from "@/components/constructor/grid/Grid";
import FAQ from "@/components/constructor/faq/FAQ";
import PricingCard from "@/components/constructor/pricing-card/PricingCard";
import TestimonialsSlider from "@/components/constructor/testimonials-slider/TestimonialsSlider";
import PromoFeatureCard from "@/components/features/promo-card/PromoFeatureCard";
import InfoBlock from "@/components/constructor/Info-block/InfoBlock";
import Cta from "@/components/constructor/cta/Cta";
import CenteredCtaSection from "@/components/constructor/centered-cta/CenteredCtaSection";
import StatsStrip from "@/components/constructor/stats-strip/StatsStrip";
import HowItWorksSection from "@/components/sections/how-it-works-section/HowItWorksSection";
import ThemeForestShowcase from "@/components/sections/themeforest-showcase/ThemeForestShowcase";
import {themeforestTemplates} from "@/data/themeforestTemplates";

export const metadata: Metadata = {
    title: `${COMPANY_NAME} — Website Templates Marketplace`,
    description:
        "Browse premium website templates for WordPress, Shopify, eCommerce, business, portfolio, and landing pages. Discover top-rated designs, new arrivals, and marketplace-ready digital products.",
    alternates: {canonical: "/"},
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
                secondaryCta={{text: "Explore Categories", link: "/categories"}}
                image="image1"
            />

            {/* STATS */}
            <StatsStrip
                items={[
                    {value: "100+", label: "Premium Templates"},
                    {value: "20+", label: "Popular Categories"},
                    {value: "4.9/5", label: "Average Ratings"},
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
                title="Pricing for Every Budget"
                description="Choose from affordable template options, premium designs, and flexible products that match your project scope."
                columns={4}
                gap="2rem"
            >
                <PricingCard
                    variant="starter"
                    title="Starter"
                    amount={19}
                    badgeTop="Entry"
                    description="A great starting point for personal projects, landing pages, and small websites."
                    buttonText="Browse Starter"
                />

                <PricingCard
                    variant="pro"
                    title="Business"
                    amount={39}
                    badgeTop="Popular"
                    description="Ideal for agencies, service businesses, and brands that need polished, scalable layouts."
                    buttonText="Explore Business"
                />

                <PricingCard
                    variant="premium"
                    title="Premium"
                    amount={59}
                    badgeTop="Best Value"
                    description="High-converting, feature-rich templates for serious launches, stores, and advanced websites."
                    buttonText="View Premium"
                />

                <PricingCard
                    variant="custom"
                    title="Custom Range"
                    amount={0}
                    badgeTop="Flexible"
                    description="Browse the full marketplace and choose the template that best fits your needs and budget."
                    buttonText="See All"
                />
            </Grid>

            {/* TESTIMONIALS */}
            <TestimonialsSlider
                title="Trusted by Designers, Founders, and Agencies"
                description="Real feedback from people using templates to launch faster and build better products."
                testimonials={[
                    {
                        name: "James Carter",
                        image: "review1",
                        rating: 5,
                        text: "Picked a landing page template and launched the same day. The structure was clean and required almost no changes.",
                    },
                    {
                        name: "Sophia Bennett",
                        image: "review5",
                        rating: 4.9,
                        text: "I used a Shopify template from here and it instantly made my store look more professional. Conversion rate improved within a week.",
                    },
                    {
                        name: "Liam Anderson",
                        image: "review2",
                        rating: 5,
                        text: "As a freelancer, this saves me hours on every project. I just customize the template instead of building everything from scratch.",
                    },
                    {
                        name: "Emily Turner",
                        image: "review6",
                        rating: 4.8,
                        text: "The quality is way better than free themes. Everything feels polished and ready for real business use.",
                    },
                    {
                        name: "Noah Williams",
                        image: "review3",
                        rating: 5,
                        text: "Found a perfect WordPress template for a client project. Delivered faster and still made a great profit.",
                    },
                    {
                        name: "Olivia Martinez",
                        image: "review7",
                        rating: 4.7,
                        text: "Super easy to browse and compare templates. I didn’t waste time scrolling through low-quality designs.",
                    },
                    {
                        name: "Ethan Brown",
                        image: "review4",
                        rating: 4.9,
                        text: "The templates are actually built for real use — clean code, good UX, and easy to customize.",
                    },
                    {
                        name: "Ava Johnson",
                        image: "review8",
                        rating: 5,
                        text: "I launched my portfolio site in a couple of hours. Before that, I was stuck for weeks trying to design everything myself.",
                    },
                ]}
            />

            {/* FINAL CTA */}
            <CenteredCtaSection
                title="Ready to find your next template?"
                description="Explore a marketplace of premium website templates for WordPress, Shopify, eCommerce, portfolios, and more."
                primaryCta={{text: "Browse Templates", link: "/templates"}}
                secondaryCta={{text: "View Categories", link: "/categories"}}
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