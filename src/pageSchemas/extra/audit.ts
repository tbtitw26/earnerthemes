import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Technical Website Audit — ${COMPANY_NAME}`,
        description: `Comprehensive technical SEO audit by ${COMPANY_NAME}: find and fix issues that block your rankings — Core Web Vitals, indexing, structure, and performance.`,
        keywords: [
            "technical SEO audit",
            "website SEO analysis",
            "Core Web Vitals",
            "crawl errors",
            "SEO site health",
            "Google indexing issues",
        ],
        canonical: "/cases/technical-website-audit",
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "Technical Website Audit",
            highlight: "Find. Fix. Rank.",
            description: `${COMPANY_NAME} provides a full technical SEO audit to identify performance, structure, and indexing issues that limit your organic growth.  
Our experts manually analyse your site and prepare a detailed report with step-by-step recommendations.`,
            image: "image4",
            align: "right",
            primaryCta: { text: "Order Audit", link: "/contact-us?service=Technical%20Website%20Audit&tokens=2000" },
        },

        // 💡 INTRO: why it matters
        {
            type: "custom",
            component: "InfoBlock",
            title: "Why Technical SEO Matters",
            description: `A website can have great content — but without a solid technical foundation, search engines may never see it.  
Our audit uncovers the hidden issues that prevent Google from fully crawling, indexing, and ranking your pages.`,
            bullets: [
                "Improves crawlability and indexation",
                "Fixes speed and Core Web Vitals issues",
                "Eliminates duplicate content and broken links",
                "Lays the foundation for long-term SEO success",
            ],
            align: "center",
        },

        // 🧩 PROCESS — timeline
        {
            type: "custom",
            component: "Timeline",
            title: "Our Audit Process",
            steps: [
                {
                    title: "1. Initial Review",
                    description:
                        "We check the overall structure, sitemap, robots.txt, and identify potential crawl issues.",
                },
                {
                    title: "2. Deep Technical Analysis",
                    description:
                        "Using professional SEO tools and manual review, we analyse Core Web Vitals, page speed, schema, and meta data.",
                },
                {
                    title: "3. Indexing & Duplication Check",
                    description:
                        "We detect duplicate pages, broken redirects, and ensure correct canonicalisation for Google indexing.",
                },
                {
                    title: "4. SEO Health Report",
                    description:
                        "You receive a PDF report with all detected issues, priorities, and implementation guide.",
                },
                {
                    title: "5. Consultation & Fix Plan",
                    description:
                        "Our SEO experts explain findings and help you prioritise fixes for the fastest ranking improvements.",
                },
            ],
        },

        // 📊 BENEFITS / RESULTS
        {
            type: "custom",
            component: "ValuesIcons",
            title: "What You’ll Get After the Audit",
            description:
                "The audit delivers actionable insights and a roadmap for growth — not just a list of problems.",
            values: [
                { icon: "⚙️", title: "Improved Site Speed", text: "Faster loading, better user experience, higher rankings." },
                { icon: "🔍", title: "Optimised Crawl Budget", text: "Google indexes important pages efficiently." },
                { icon: "📈", title: "Higher Visibility", text: "Fixes boost overall rankings and traffic stability." },
                { icon: "🧾", title: "Clear Step-by-Step Report", text: "Understand each issue and how to fix it." },
            ],
        },

        {
            type: "grid",
            columns: 2,
            gap: "2rem",
            cards: [
                {
                    type: "pricing",
                    variant: "starter",
                    title: "Starter SEO Audit",
                    price: "€15",
                    tokens: 1500,
                    badgeTop: "Entry Plan",
                    description:
                        "Get a full site scan, ranking report, and 10-page audit with actionable fixes.",
                    features: [
                        "Technical check",
                        "Mobile performance",
                        "Speed recommendations",
                        "Basic keyword analysis",
                    ],
                    buttonText: "Buy Tokens",
                    buttonLink: "/pricing",
                },
                {
                    type: "pricing",
                    variant: "pro",
                    title: "Full SEO Package",
                    price: "€45",
                    tokens: 4500,
                    badgeTop: "Popular",
                    description:
                        "Everything you need for growth: audit, link strategy, and content plan.",
                    features: [
                        "Complete audit report",
                        "10 backlinks / mo",
                        "Content strategy",
                        "Monthly tracking",
                    ],
                    buttonText: "Start SEO Campaign",
                    buttonLink: "/pricing",
                },
                {
                    type: "pricing",
                    variant: "premium",
                    title: "Enterprise SEO",
                    price: "€90",
                    tokens: 9000,
                    badgeTop: "All-In Plan",
                    description:
                        "For large businesses and e-commerce. Dedicated team, analytics & continuous growth.",
                    features: [
                        "Dedicated SEO manager",
                        "20+ backlinks / mo",
                        "Custom dashboards",
                        "Priority support",
                    ],
                    buttonText: "Contact for Setup",
                    buttonLink: "/contact",
                },
                {
                    type: "pricing",
                    variant: "custom",
                    title: "Custom SEO Solutions",
                    price: "dynamic",
                    tokens: 0,
                    badgeTop: "Tailored Plan",
                    description:
                        "Need something specific? We create bespoke SEO strategies for unique needs.",
                    features: [
                        "Personalised strategy",
                        "Flexible services",
                        "Scalable solutions",
                        "Dedicated support",
                    ],
                    buttonText: "Get a Quote",
                    buttonLink: "/contact",
                }
            ],
        },

        // 📩 TEXT + BUTTON CTA
        {
            type: "custom",
            component: "TextWithButton",
            title: "Need a Technical SEO Audit?",
            description: `Our specialists will analyse your site, find technical barriers, and prepare a full optimisation plan — no AI, just real experts.`,
            buttonText: "Request Your Audit",
            buttonLink: "/contact-us?service=Technical%20Website%20Audit&tokens=5"
        },

        // 🚀 FINAL CTA Banner
        {
            type: "custom",
            component: "MissionBanner",
            title: "Let’s Make Your Website Technically Perfect",
            description: `Get in touch with ${COMPANY_NAME} and discover what’s holding your website back.  
A proper audit is the first step toward stable rankings and faster growth.`,
            image: "ctaAudit",
        },
    ],
};

export default schema;
