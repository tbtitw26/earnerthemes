import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { MdOutlineSpeed } from "react-icons/md";
import { RiSimCardLine } from "react-icons/ri";
import { FiShield } from "react-icons/fi";

const schema: PageSchema = {
    meta: {
        title: `${COMPANY_NAME} — SEO Optimisation & Website Promotion Services`,
        description: `Full-cycle SEO optimisation for your website: technical audits, keyword research, on-page and off-page optimisation, content marketing and local SEO.`,
        keywords: [
            "SEO optimisation",
            "technical audit",
            "Google ranking",
            "on-page SEO",
            "link building",
            "content marketing",
            "local SEO",
            "SEO agency Ukraine",
        ],
        canonical: "/seo",
    },

    blocks: [
        // 🏁 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: "Rank Higher. Grow Faster. Win Organic Traffic.",
            highlight: "AI-Powered SEO by Experts — Pay Once, Grow Forever",
            description:
                `${COMPANY_NAME} is your all-in-one SEO platform. We audit, optimise, and promote your website — using AI tools and human expertise. Get measurable growth and pay with flexible tokens.`,
            primaryCta: {text: "Start SEO Audit", link: "/pricing"},
            image: "image1",
            showTrustBadge: false,
        },

        {
            type: "custom",
            component: "ValuesIcons",
            title: "Why Travelers Choose Our eSIM",
            description:
                "Stay connected worldwide with instant eSIM activation. No physical SIM cards, no roaming surprises.",
            values: [
                {
                    icon: "globe",
                    title: "Global Coverage",
                    text: "Mobile data in 200+ countries and regions worldwide.",
                },
                {
                    icon: "speed",
                    title: "Instant Activation",
                    text: "Install your eSIM in minutes and get online immediately.",
                },
                {
                    icon: "sim",
                    title: "No Physical SIM",
                    text: "Forget SIM cards, stores, and swapping — everything is digital.",
                },
                {
                    icon: "shield",
                    title: "Secure & Reliable",
                    text: "Trusted infrastructure with stable speeds and secure connections.",
                },
            ],
        },

        {
            type: "grid",
            columns: 3,
            gap: "2rem",
            title: "How It Works: 6 Easy Steps to Get Your eSIM",
            cards: [
                {
                    icon: "login",
                    title: "1. Sign Up or Log In",
                    description:
                        "Create an account or log in to access your dashboard, balance, and purchased eSIMs.",
                    buttonText: "Create Account",
                    buttonLink: "/auth",
                },
                {
                    icon: "wallet",
                    title: "2. Buy Tokens",
                    description:
                        "Purchase token packages once. Tokens never expire and can be used for any eSIM worldwide.",
                    buttonText: "View Token Plans",
                    buttonLink: "/plans",
                },
                {
                    icon: "sim",
                    title: "3. Choose eSIM",
                    description:
                        "Browse the global eSIM catalogue and select a country or regional data plan.",
                    buttonText: "Open Catalogue",
                    buttonLink: "/templates",
                },
                {
                    icon: "pay",
                    title: "4. Purchase eSIM",
                    description:
                        "Pay for your selected eSIM using tokens. No hidden fees or subscriptions.",
                    buttonText: "Buy eSIM",
                    buttonLink: "/templates",
                },
                {
                    icon: "mail",
                    title: "5. Get eSIM by Email",
                    description:
                        "Receive your eSIM details instantly by email, including QR code and setup instructions.",
                    buttonText: "Check Inbox",
                    buttonLink: "/help",
                },
                {
                    icon: "call",
                    title: "6. Activate & Use",
                    description:
                        "Scan the QR code, activate your eSIM, and enjoy fast mobile internet worldwide.",
                    buttonText: "Check Compatibility",
                    buttonLink: "/devices",
                },
            ],
        },
        {
            type: "faq",
            items: [
                {
                    question: "How long does it take to see SEO results?",
                    answer:
                        "Most clients notice ranking improvements within 4–8 weeks, depending on competition and domain authority.",
                },
                {
                    question: "Do you use AI in optimisation?",
                    answer:
                        "Yes, we combine human expertise with AI tools for faster keyword research, clustering, and performance tracking.",
                },
                {
                    question: "Can I buy tokens once and use them later?",
                    answer:
                        "Absolutely. Tokens don’t expire — spend them for any SEO service, from audits to backlinks.",
                },
                {
                    question: "Is the work 100% white-hat?",
                    answer:
                        "Yes. We strictly follow Google guidelines to ensure long-term stability and avoid penalties.",
                },
            ],
        },
    ],
};

export default schema;
