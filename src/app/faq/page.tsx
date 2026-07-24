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
            "You create an account, top up your Account Balance, choose a template and confirm the purchase. The purchase is recorded in your account immediately, and we send the files and any activation details to your email address.",
    },
    {
        category: "Payments",
        question: "What is Account Balance?",
        answer:
            "Account Balance is store credit recorded in your account and used to buy templates on this website. It is non-transferable, is not cryptocurrency, is not tradable and is not redeemable for cash. Full rules are in the Payment and Account Balance Policy.",
    },
    {
        category: "Payments",
        question: "Is there a minimum top-up?",
        answer:
            "No. There is no minimum or maximum top-up amount, and no minimum transaction amount for card payments. The fixed packages are offered for convenience only — you can enter any custom amount instead.",
    },
    {
        category: "Payments",
        question: "Do the prices include VAT?",
        answer:
            "Yes. Every price shown on the website is VAT-inclusive. The Top-Up Summary page shows the net amount and the VAT included before you confirm payment.",
    },
    {
        category: "Payments",
        question: "How are prices in EUR and USD calculated?",
        answer:
            "GBP is the base currency. EUR and USD prices are calculated from the GBP price using a fixed reference rate we maintain, with no conversion fee or surcharge added by us. Your bank or card issuer may apply its own exchange rate and fees. See the Payment and Account Balance Policy for details.",
    },
    {
        category: "Payments",
        question: "How will the charge appear on my bank statement?",
        answer:
            "The card statement descriptor is shown on the Top-Up Summary page before you pay, and is repeated in your confirmation email so you can match the charge to this website.",
    },
    {
        category: "Payments",
        question: "Do I need to pay every time I buy something?",
        answer:
            "No. You add funds to your Account Balance and then use it for purchases without repeating the full checkout.",
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
        question: "When do I get my template?",
        answer:
            "Products are delivered electronically — nothing is shipped. Your purchase is recorded in your account immediately, and we aim to send the files and any activation details to your email address within 24 hours of payment confirmation.",
    },
    {
        category: "Downloads",
        question: "Where can I find my purchased templates?",
        answer:
            "Every purchase is listed in your account, so you always have a record of what you own and when you bought it. The files themselves are sent to the email address on your order.",
    },
    {
        category: "Downloads",
        question: "I have not received my delivery email — what should I do?",
        answer:
            "Please check your spam and junk folders first, and make sure messages and attachments from us can be received. If it has been more than 24 hours since payment, contact us and we will resend the delivery.",
    },
    {
        category: "Templates",
        question: "What licence do I get?",
        answer:
            "You receive a limited licence to use the Product as set out in the Digital Product Licence Agreement. Buying a template does not transfer ownership of its source code, design or trademarks to you.",
    },
    {
        category: "Templates",
        question: "Do I need anything else to use a template?",
        answer:
            "Usually yes. A template may require separately purchased hosting, a domain name, and software such as WordPress, Shopify or specific plugins. These are not included unless the Product description says so, so please check the requirements before buying.",
    },
    {
        category: "Account",
        question: "Can I get a refund?",
        answer:
            "Digital content is covered by specific rules. Because you ask us to begin delivery immediately, your statutory right of withdrawal ends once delivery begins — you confirm this with a checkbox before paying. Refunds for non-delivery, duplicate charges, material defects and other cases are set out in the Refund and Cancellation Policy.",
    },
    {
        category: "Account",
        question: "Do I get a receipt?",
        answer:
            "Yes. A confirmation email is sent after every transaction, and a PDF receipt is available to download from the Transaction History in your account.",
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
            "Purchased Account Balance does not expire simply because time has passed. Any expiry condition on promotional credit is disclosed when that credit is issued.",
    },
    {
        category: "Payments",
        question: "Is my payment secure?",
        answer:
            "Card details are handled by our payment provider on their secure hosted page. They are never entered on or stored by this website.",
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