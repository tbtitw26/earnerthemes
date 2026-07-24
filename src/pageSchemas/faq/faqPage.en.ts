import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/resources/constants";

const faqSchema: PageSchema = {
    meta: {
        title: `FAQ — ${COMPANY_NAME}`,
        description: `Frequently asked questions about buying website themes and templates on ${COMPANY_NAME} — Account Balance, prices and VAT, delivery, licences, refunds and support.`,
        keywords: [
            "website template FAQ",
            "wordpress theme marketplace",
            "buy website template",
            "digital product delivery",
            "template licence",
            "account balance top-up",
        ],
        canonical: "/faq",
        ogImage: {
            title: `${COMPANY_NAME} — FAQ`,
            description:
                "Answers to common questions about buying website themes and templates, Account Balance, delivery, licences and refunds.",
            bg: "#111827",
            color: "#ffffff",
        },
    },

    blocks: [
        {
            type: "faq",
            items: [
                {
                    question: `What is ${COMPANY_NAME}?`,
                    answer: `${COMPANY_NAME} is an online marketplace for website themes, templates and related digital content. You buy a licence to use a template on your own project and receive the files by email.`,
                },
                {
                    question: "How does buying work?",
                    answer:
                        "Create an account, add funds to your Account Balance, then choose the template you want. After payment we send the files and any activation details to the email address on your order.",
                },
                {
                    question: "What is Account Balance?",
                    answer:
                        "Account Balance is store credit recorded in your account that you can use to buy templates on this website. It is non-transferable, is not cryptocurrency, is not tradable and is not redeemable for cash. Full rules are in the Payment and Account Balance Policy.",
                },
                {
                    question: "Is there a minimum top-up?",
                    answer:
                        "No. There is no minimum or maximum top-up amount, and no minimum transaction amount for card payments. Fixed packages are offered for convenience only — you can enter any custom amount instead.",
                },
                {
                    question: "Do the prices include VAT?",
                    answer:
                        "Yes. Every price shown on the website is VAT-inclusive. The Top-Up Summary page shows the net amount and the VAT included before you confirm payment.",
                },
                {
                    question: "How are prices in EUR and USD calculated?",
                    answer:
                        "GBP is the base currency. EUR and USD prices are calculated from the GBP price using a fixed reference rate we maintain, with no conversion fee or surcharge added by us. Your bank or card issuer may apply its own exchange rate and fees. See the Payment and Account Balance Policy for details.",
                },
                {
                    question: "How will the charge appear on my statement?",
                    answer:
                        "The card statement descriptor is shown on the Top-Up Summary page before you pay, and is repeated in your confirmation email so you can match the charge to this website.",
                },
                {
                    question: "How long does delivery take?",
                    answer:
                        "Products are delivered electronically — nothing is shipped. We aim to complete delivery within 24 hours of successful checkout and payment confirmation. Please check your spam and junk folders if you have not received the email.",
                },
                {
                    question: "What licence do I get?",
                    answer:
                        "You receive a limited licence to use the Product as set out in the Digital Product Licence Agreement. Buying a template does not transfer ownership of its source code, design or trademarks to you.",
                },
                {
                    question: "Can I get a refund?",
                    answer:
                        "Digital content is covered by specific rules. Because you ask us to begin delivery immediately, your statutory right of withdrawal ends once delivery begins — you confirm this with a checkbox before paying. Refunds for non-delivery, duplicate charges, material defects and other cases are set out in the Refund and Cancellation Policy.",
                },
                {
                    question: "Do I get a receipt?",
                    answer:
                        "Yes. A confirmation email is sent after every transaction, and a PDF receipt is available to download from the Transaction History in your account.",
                },
                {
                    question: "Do I need anything else to use a template?",
                    answer:
                        "Usually yes. A template may require separately purchased hosting, a domain name, and software such as WordPress, Shopify or specific plugins. These are not included unless the Product description says so, so please check the requirements before buying.",
                },
                {
                    question: "Is my payment secure?",
                    answer:
                        "Card details are handled by our payment provider on their secure hosted page. They are never entered on or stored by this website.",
                },
                {
                    question: "How can I contact support?",
                    answer: `You can reach our support team via the contact page or by email at ${COMPANY_EMAIL}. Our Support Policy sets out what support covers and the expected response times.`,
                },
            ],
        },
    ],
};

export default faqSchema;
