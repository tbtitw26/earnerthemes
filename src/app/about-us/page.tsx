"use client";

import PromoSection from "@/components/sections/promo-section/PromoSection";
import ValuesIcons from "@/components/constructor/values-icons/ValuesIcons";
import HowItWorksSection from "@/components/sections/how-it-works-section/HowItWorksSection";
import TeamGrid from "@/components/constructor/team-grid/TeamGrid";
import Cta from "@/components/constructor/cta/Cta";
import MissionBanner from "@/components/constructor/mission-banner/MissionBanner";
import FAQ from "@/components/constructor/faq/FAQ";
import {experts} from "@/data/experts";
import HeroSection from "@/components/constructor/hero/Hero";
import InfoBlock from "@/components/constructor/Info-block/InfoBlock";
import Grid from "@/components/constructor/grid/Grid";
import Timeline from "@/components/constructor/timeline/Timeline";
import StoryGridSection from "@/components/sections/story-grid-section/StoryGridSection";
import CenteredCtaSection from "@/components/constructor/centered-cta/CenteredCtaSection";

export default function AboutPage() {
    return (
        <>
            <HeroSection
                title={
                    <>
                        A Marketplace for <span>Premium Templates</span>
                    </>
                }
                description="We build a curated ecosystem of high-quality website templates for WordPress, Shopify, eCommerce, and modern web projects. Our goal is simple — help you launch faster with designs that already work."
                primaryCta={{text: "Browse Templates", link: "/templates"}}
                secondaryCta={{text: "Explore Categories", link: "/templates"}}
                image="image5"
            />

            <Grid columns={2} gap="2rem">
                <InfoBlock
                    badge="category"
                    variant="light"
                    color="blue"
                    title="WordPress Templates"
                    icon="wordpress"
                    description="Flexible, SEO-optimized WordPress themes for blogs, agencies, portfolios, and business websites."
                    buttonText="Browse WordPress"
                    buttonLink="/templates?category=wordpress"
                />
                <InfoBlock
                    badge="category"
                    variant="light"
                    color="green"
                    title="Shopify Templates"
                    icon="shopify"
                    description="High-converting Shopify themes built for modern online stores and seamless shopping experiences."
                    buttonText="Browse Shopify"
                    buttonLink="/templates?category=shopify"
                />
            </Grid>

            <Timeline
                title="How We Build Marketplace-Ready Templates"
                description="Every template in our ecosystem follows a strict quality process to ensure performance, scalability, and usability."
                steps={[
                    {
                        title: "Clean & Scalable Structure",
                        description:
                            "All templates start with a solid semantic structure and modern architecture, ensuring flexibility and long-term usability.",
                    },
                    {
                        title: "Performance Optimization",
                        description:
                            "We prioritize speed, responsiveness, and SEO to make sure every template performs well across all devices.",
                    },
                    {
                        title: "Platform Integration",
                        description:
                            "Templates are built to integrate smoothly with platforms like WordPress and Shopify without breaking customizations.",
                    },
                ]}
            />

            <StoryGridSection
                cards={[
                    {
                        type: "featureLarge",
                        title: "Pre-Built Layout Systems",
                        text: "Choose from multiple ready-to-use layouts designed for different industries, from startups to eCommerce brands.",
                        images: ["image3", "image4"],
                    },
                    {
                        type: "featureDark",
                        title: "Built for Speed",
                        text: "Optimized code and lightweight structure ensure fast loading times and smooth user experience.",
                        ctaLabel: "See performance",
                        ctaHref: "/templates",
                    },
                    {
                        type: "featureLight",
                        title: "Clean & Maintainable Code",
                        text: "We focus on clean architecture without unnecessary bloat, making templates easy to customize and scale.",
                    },
                    {
                        type: "ctaWide",
                        title: "Support & Continuous Updates",
                        text: "Templates are regularly updated and improved to stay compatible with modern web standards and platforms.",
                        ctaLabel: "Learn more",
                        ctaHref: "/contact-us",
                        images: ["team1", "team2", "team3"],
                    },
                ]}
            />

            <CenteredCtaSection
                title="Start building with the right template"
                description="Browse premium website templates and launch your next project faster with designs that are ready to go."
                primaryCta={{text: "Browse Templates", link: "/templates"}}
                secondaryCta={{text: "Explore Categories", link: "/templates"}}
            />
        </>
    );
}