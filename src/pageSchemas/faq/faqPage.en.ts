import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/resources/constants";

const faqSchema: PageSchema = {
    meta: {
        title: `FAQ — ${COMPANY_NAME} Training Platform`,
        description: `Frequently asked questions about ordering training programs with ${COMPANY_NAME} — specialist coaches, AI plans, tokens, PDF delivery, and payments.`,
        keywords: [
            "fitness program FAQ",
            "personal training program online",
            "AI workout plan",
            "coach-made workout program",
            "buy training plan tokens",
            "fitness PDF program",
        ],
        canonical: "/faq",
        ogImage: {
            title: `${COMPANY_NAME} — Training FAQ`,
            description:
                "Answers to common questions about specialist-made training programs, AI workout plans, tokens, and PDF delivery.",
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
                    answer: `${COMPANY_NAME} is an online platform where you can order personalized training programs. You choose between a specialist-made program (primary service) or a faster AI-generated plan, and receive your workout as a structured PDF.`,
                },
                {
                    question: "How does the process work?",
                    answer:
                        "You create an account, buy tokens, fill out a short form about your goals and level, and choose who builds your program — a certified specialist or AI. Once ready, your plan is delivered as a downloadable PDF.",
                },
                {
                    question: "What are tokens?",
                    answer:
                        "Tokens are the internal currency of the platform. You use them to order specialist-made programs or generate AI workout plans. 1 euro equals 100 tokens.",
                },
                {
                    question: "What’s the difference between a specialist and AI program?",
                    answer:
                        "Specialist programs are manually created by certified coaches and include deeper personalization, adjustments for injuries, and detailed progression. AI programs are generated faster and are ideal when you need a quick, structured plan.",
                },
                {
                    question: "Which option should I choose?",
                    answer:
                        "If you want maximum quality and detailed personalization, choose a specialist. If you need a plan quickly and prefer a faster solution, AI is a good alternative.",
                },
                {
                    question: "How long does it take to receive my program?",
                    answer:
                        "AI programs are generated shortly after submission. Specialist programs take longer because they are built manually to ensure higher quality and accuracy.",
                },
                {
                    question: "What do I receive after ordering?",
                    answer:
                        "You receive a structured PDF training program that includes weekly split, exercises, sets, reps, rest times, and progression guidance.",
                },
                {
                    question: "Can the program be adapted for injuries or limitations?",
                    answer:
                        "Yes. You can specify injuries, limitations, or equipment constraints in the form. Specialists adjust the plan manually, and AI also accounts for basic restrictions.",
                },
                {
                    question: "Can I switch between specialist and AI?",
                    answer:
                        "Yes. You can use your tokens for either option at any time, depending on your needs and goals.",
                },
                {
                    question: "Do tokens expire?",
                    answer:
                        "No. Your tokens stay in your account and can be used anytime without expiration.",
                },
                {
                    question: "Is my payment secure?",
                    answer:
                        `${COMPANY_NAME} uses trusted payment providers and industry-standard encryption to ensure all transactions are secure.`,
                },
                {
                    question: "How can I contact support?",
                    answer:
                        `You can reach our support team anytime via the contact page or by email at ${COMPANY_EMAIL}. We typically respond within 24 hours.`,
                },
            ],
        },
    ],
};

export default faqSchema;