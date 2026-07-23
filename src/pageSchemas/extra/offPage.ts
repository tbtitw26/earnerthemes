import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Off-Page SEO & Link Building — ${COMPANY_NAME}`,
        description: `Boost your website authority with ${COMPANY_NAME} through safe, high-quality link building, digital PR and brand mentions. Build trust and rank higher.`,
        keywords: [
            "off-page SEO",
            "link building",
            "SEO backlinks",
            "digital PR",
            "brand mentions",
            "SEO authority growth",
        ],
        canonical: "/cases/off-page-seo",
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "Off-Page SEO & Link Building",
            highlight: "Build Authority. Gain Trust.",
            description: `${COMPANY_NAME} helps your website grow beyond its borders — through powerful backlinks, brand mentions, and PR strategies that increase domain authority and visibility.`,
            image: "image10",
            align: "right",
            primaryCta: { text: "Order Link Building", link: "/contact-us?service=Off-Page SEO&tokens=1800" },
        },

        // 💡 INTRO: why Off-Page matters
        {
            type: "custom",
            component: "InfoBlock",
            title: "Why Off-Page SEO Matters",
            description: `Google sees links as votes of trust.  
The more quality websites point to yours — the more credible your content becomes in search engines’ eyes.  
We build safe, relevant, and lasting backlinks that truly make a difference.`,
            bullets: [
                "Improves domain authority & trust",
                "Strengthens keyword rankings",
                "Brings referral traffic from partner sites",
                "Supports long-term SEO stability",
            ],
            align: "center",
        },

        // 🧩 PROCESS — step-by-step
        {
            type: "custom",
            component: "Timeline",
            title: "Our Off-Page SEO Process",
            steps: [
                {
                    title: "1. Backlink Profile Audit",
                    description:
                        "We analyse your existing backlinks, disavow harmful ones, and identify authority gaps.",
                },
                {
                    title: "2. Strategy & Prospecting",
                    description:
                        "We create a customised outreach plan and collect relevant, high-authority domains in your niche.",
                },
                {
                    title: "3. Content & Outreach",
                    description:
                        "Our team writes and publishes contextual guest posts, PR articles, or mentions with natural anchor text.",
                },
                {
                    title: "4. Link Placement & Verification",
                    description:
                        "We manually verify each link to ensure it’s indexed, relevant, and live on trusted websites.",
                },
                {
                    title: "5. Reporting & Results",
                    description:
                        "You get a transparent report with all placements, metrics (DA/DR), and performance tracking.",
                },
            ],
        },

        // 📊 BENEFITS
        {
            type: "custom",
            component: "ValuesIcons",
            title: "What You’ll Gain from Off-Page SEO",
            description:
                "Every backlink we build is a step toward stronger authority and higher rankings.",
            values: [
                { icon: "🌐", title: "Authority Growth", text: "Boost your site’s reputation with links from trusted sources." },
                { icon: "🤝", title: "Brand Mentions", text: "Gain exposure through industry-relevant PR and mentions." },
                { icon: "🔗", title: "Safe Link Building", text: "Manual, white-hat methods only — no spam or automation." },
                { icon: "📊", title: "Transparent Reporting", text: "You always see where, when, and how links were placed." },
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

        // 📩 CTA (text + button)
        {
            type: "custom",
            component: "TextWithButton",
            title: "Ready to Strengthen Your Authority?",
            description: `Let ${COMPANY_NAME} build a link profile that search engines — and customers — trust.`,
            buttonText: "Start Off-Page SEO",
            buttonLink: "/contact-us",
        },

        // 🚀 FINAL CTA Banner
        {
            type: "custom",
            component: "MissionBanner",
            title: "Expand Your Reach with Off-Page SEO",
            description: `High-quality backlinks and PR campaigns are the backbone of long-term success.  
Work with ${COMPANY_NAME} and make your website a recognised authority in your industry.`,
            image: "ctaOffPage",
        },
    ],
};

export default schema;
