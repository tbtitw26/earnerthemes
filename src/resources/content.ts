import {media} from "@/resources/media";
import {FaTwitter, FaFacebook, FaLinkedin} from "react-icons/fa";
import {
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
    COMPANY_LEGAL_NAME,
    COMPANY_NAME,
    COMPANY_NUMBER,
    COMPANY_PHONE
} from "@/resources/constants";

export const baseURL =
    typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const headerContent = {
    logo: {
        src: media.logo.src,
        alt: "Site Logo",
        href: "/"
    },
    links: [
        {label: "Marketplace", href: "/templates"},
        {label: `About Us`, href: "/about-us"},
        {label: "Get Started", href: "/get-started"},
        {label: "Plans", href: "/pricing"},
        {label: "Faq", href: "/faq"},
        {label: "Support", href: "/contact-us"},

    ]
};

export const footerContent = {
    logo: {src: media.logo_white.src, alt: "Site Logo", href: "/"},
    columns: [
        {
            title: "Navigate",
            links: [
                {label: "Marketplace", href: "/templates"},
                {label: `About Us`, href: "/about-us"},
                {label: "Get Started", href: "/get-started"},
                {label: "Plans", href: "/pricing"},
                {label: "Faq", href: "/faq"},
                {label: "Support", href: "/contact-us"},
            ]
        },
        {
            title: "Legal",
            links: [
                {label: "Terms & Conditions", href: "/terms-and-conditions"},
                {label: "Licence Agreement", href: "/licence-agreement"},
                {label: "Payment & Account Balance", href: "/payment-policy"},
                {label: "Refund & Cancellation", href: "/refund-policy"},
                {label: "Delivery & Download", href: "/delivery-policy"},
                {label: "Support Policy", href: "/support-policy"},
                {label: "Privacy Policy", href: "/privacy-policy"},
                {label: "Cookie Policy", href: "/cookie-policy"},
                {label: "Intellectual Property", href: "/ip-policy"},
            ],
        },
    ],
    contact: {
        email: COMPANY_EMAIL,
        phone: COMPANY_PHONE,
        address: COMPANY_ADDRESS,
    },

    legal: {
        companyName: COMPANY_LEGAL_NAME,
        companyNumber: COMPANY_NUMBER,
        address: COMPANY_ADDRESS,
        email: COMPANY_EMAIL,
        phone: COMPANY_PHONE,
    },
    socials: [],
};

