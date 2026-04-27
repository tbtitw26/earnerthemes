import type { Metadata } from "next";

import FAQ, {
    type FAQCard,
    type FAQCategory,
    type FAQItem,
} from "@/components/constructor/faq/FAQ";
import { COMPANY_EMAIL, COMPANY_NAME } from "@/resources/constants";
import { metadataFromSchema } from "@/utils/fromSchema";

const faqMeta = {
    title: `FAQ — ${COMPANY_NAME} Template Marketplace`,
    description: `Frequently asked questions about buying website templates, account balance, payments, downloads, and usage on ${COMPANY_NAME}.`,
    keywords: [
        "website templates FAQ",
        "buy website templates",
        "template marketplace",
        "shopify templates",
        "wordpress templates",
        "download templates",
    ],
    canonical: "/faq",
    ogImage: {
        title: `${COMPANY_NAME} — Templates FAQ`,
        description:
            "Answers about template purchases, balance system, downloads, and marketplace usage.",
        bg: "#111827",
        color: "#ffffff",
    },
};

const faqCategories: FAQCategory[] = [
    "General",
    "Payments",
    "Templates",
    "Downloads",
    "Account",
];

const faqCards: FAQCard[] = [
    {
        icon: "book",
        title: "Getting Started",
        description:
            "Learn how the marketplace works, how to buy templates, and how to get started quickly.",
        linkText: "Explore basics",
        href: "/contact-us",
    },
    {
        icon: "payments",
        title: "Payments & Balance",
        description:
            "Understand how your balance works, how to top up, and how purchases are processed.",
        linkText: "View payment help",
        href: "/contact-us",
    },
    {
        icon: "downloads",
        title: "Downloads & Access",
        description:
            "Find answers about template access, downloads, and usage after purchase.",
        linkText: "Contact support",
        href: "/contact-us",
    },
];

const faqItems: FAQItem[] = [
    {
        category: "General",
        question: `What is ${COMPANY_NAME}?`,
        answer: `${COMPANY_NAME} is a marketplace where you can browse, purchase, and use premium website templates for WordPress, Shopify, and other platforms.`,
    },
    {
        category: "General",
        question: "How does the process work?",
        answer:
            "You create an account, top up your balance, choose a template, purchase it, and then access it in your account for use.",
    },
    {
        category: "Payments",
        question: "What is the balance system?",
        answer:
            "Your balance is the internal wallet you use to purchase templates. You top it up once and use it anytime without repeating full checkout.",
    },
    {
        category: "Payments",
        question: "Do I need to pay every time I buy something?",
        answer:
            "No. You add funds to your balance and then use it for purchases instantly without additional payment steps.",
    },
    {
        category: "Templates",
        question: "What types of templates are available?",
        answer:
            "You can find WordPress themes, Shopify templates, eCommerce designs, landing pages, portfolios, and business website layouts.",
    },
    {
        category: "Templates",
        question: "How do I choose the right template?",
        answer:
            "Browse categories, check previews, and compare features to find the template that fits your project goals and platform.",
    },
    {
        category: "Downloads",
        question: "When do I get access to my template?",
        answer:
            "Immediately after purchase. The template becomes available in your account right away.",
    },
    {
        category: "Downloads",
        question: "Where can I find my purchased templates?",
        answer:
            "All purchased templates are stored in your account dashboard, where you can access and use them anytime.",
    },
    {
        category: "Downloads",
        question: "Can I download templates multiple times?",
        answer:
            "Yes. Once purchased, you can access and download your templates whenever you need them.",
    },
    {
        category: "Account",
        question: "Do I need an account to buy templates?",
        answer:
            "Yes. An account is required to manage your balance, purchases, and template access.",
    },
    {
        category: "Account",
        question: "Does my balance expire?",
        answer:
            "No. Your balance remains in your account until you decide to use it.",
    },
    {
        category: "Payments",
        question: "Is my payment secure?",
        answer:
            `${COMPANY_NAME} uses trusted payment providers and secure encryption to ensure all transactions are protected.`,
    },
    {
        category: "Account",
        question: "How can I contact support?",
        answer:
            `You can contact us via the support page or email at ${COMPANY_EMAIL}. Our team will respond as soon as possible.`,
    },
];

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(faqMeta);
}

export default function Page() {
    return (
        <FAQ
            title="Frequently Asked Questions"
            description="Find answers about buying templates, account balance, downloads, and how the marketplace works."
            items={faqItems}
            categories={faqCategories}
            cards={faqCards}
            contactCta={{
                title: "Still need help?",
                description:
                    "Our support team can help with purchases, balance, downloads, and any questions before or after buying a template.",
                buttonText: "Contact Support",
                href: "/contact-us",
            }}
        />
    );
}