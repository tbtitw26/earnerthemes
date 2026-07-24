import {PageSchema} from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

const cookiePolicyEn: PageSchema = {
    meta: {
        title: `Cookie Policy – ${COMPANY_NAME}`,
        description:
            "Cookies and similar technologies used by EarnerThemes, their purposes and how to manage your preferences.",
        canonical: "/cookie-policy",
        ogImage: {
            title: `Cookie Policy – ${COMPANY_NAME}`,
            description: "Cookies and similar technologies used by EarnerThemes, their purposes and how to manage your preferences.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Cookie Policy",
            description: "Effective date: 23 July 2026",
        },
        {
            type: "text",
            title: "1. About This Cookie Policy",
            description: `This Cookie Policy explains how SENIOR EARNER LTD uses cookies and other technologies that store information on, or access information from, your device when you visit or use www.earnerthemes.com.\n\nThe Website is operated by:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}\n\nIn this Cookie Policy, “EarnerThemes”, “we”, “us” and “our” refer to SENIOR EARNER LTD. “You” and “your” refer to a Website visitor or user.\n\nThis Cookie Policy should be read together with our Privacy Policy.`,
        },
        {
            type: "text",
            title: "2. What Are Cookies?",
            description:
                "Cookies are small text files placed on your computer, mobile device or other equipment when you visit a website.\n\nCookies allow a website to recognise a browser or device and may store information about:",
            bullets: [
                "login status;",
                "security;",
                "Website preferences;",
                "shopping and checkout activity;",
                "Account sessions;",
                "pages viewed;",
                "Website performance;",
                "consent choices; and",
                "previous interactions with the Website.",
            ],
        },
        {
            type: "text",
            description:
                "Cookies may be placed directly by EarnerThemes or by an authorised third party whose services are used through the Website.",
        },
        {
            type: "text",
            title: "3. Other Storage and Access Technologies",
            description:
                "This Cookie Policy also applies to similar technologies that store or access information on a device, including:",
            bullets: [
                "local storage;",
                "session storage;",
                "tracking pixels;",
                "web beacons;",
                "software development kits;",
                "tags;",
                "embedded scripts;",
                "device identifiers;",
                "link-tracking technologies; and",
                "similar storage or access mechanisms.",
            ],
        },
        {
            type: "text",
            description:
                "We refer to cookies and these other technologies collectively as “Storage Technologies”.",
        },
        {
            type: "text",
            title: "4. First-Party and Third-Party Technologies",
        },
        {
            type: "text",
            title: "4.1 First-Party Technologies",
            description:
                "First-party Storage Technologies are placed by or on behalf of EarnerThemes through the earnerthemes.com domain.\n\nThey may be used for:",
            bullets: [
                "Account login;",
                "security;",
                "checkout;",
                "Account Balance;",
                "preferences;",
                "consent management;",
                "Website performance; and",
                "analytics.",
            ],
        },
        {
            type: "text",
            title: "4.2 Third-Party Technologies",
            description:
                "Third-party Storage Technologies are placed or accessed by another organisation whose services are integrated into the Website.\n\nThese parties may include providers of:",
            bullets: [
                "payment processing;",
                "analytics;",
                "email or Product delivery;",
                "fraud prevention;",
                "security;",
                "customer support;",
                "embedded media;",
                "advertising; and",
                "consent management.",
            ],
        },
        {
            type: "text",
            description:
                "Where third-party technologies require consent, they will not be activated before the required consent is obtained.\n\nThird parties may process information under their own privacy and cookie policies.",
        },
        {
            type: "text",
            title: "5. Session and Persistent Cookies",
        },
        {
            type: "text",
            title: "5.1 Session Cookies",
            description:
                "Session cookies are temporary and normally expire when you close your browser.\n\nThey may be used to:",
            bullets: [
                "maintain a secure session;",
                "keep you signed in during a visit;",
                "preserve checkout activity;",
                "prevent fraud; and",
                "support Website navigation.",
            ],
        },
        {
            type: "text",
            title: "5.2 Persistent Cookies",
            description:
                "Persistent cookies remain on your device for a defined period or until you delete them.\n\nThey may be used to:",
            bullets: [
                "remember preferences;",
                "retain consent choices;",
                "recognise returning visitors;",
                "support Account security;",
                "measure Website performance; and",
                "provide permitted marketing.",
            ],
        },
        {
            type: "text",
            description:
                "The duration of each persistent cookie should be limited to what is reasonably necessary for its purpose.",
        },
        {
            type: "text",
            title: "6. Categories of Storage Technologies",
            description:
                "We may use the following categories.",
        },
        {
            type: "text",
            title: "6.1 Strictly Necessary",
            description:
                "Strictly Necessary Technologies are required to provide a service you request or to enable essential Website operation.\n\nThey may be used for:",
            bullets: [
                "Website security;",
                "Account authentication;",
                "login sessions;",
                "fraud prevention;",
                "checkout;",
                "payment processing;",
                "Account Balance;",
                "Order submission;",
                "load balancing;",
                "saving privacy choices; and",
                "maintaining essential Website functionality.",
            ],
        },
        {
            type: "text",
            description:
                "Because these technologies are essential to provide the requested service, they may operate without consent where permitted by law.\n\nYou may block them through your browser, but doing so may prevent parts of the Website from working.",
        },
        {
            type: "text",
            title: "6.2 Functional and Preference",
            description:
                "Functional Technologies allow the Website to remember choices and adapt its appearance or operation.\n\nThey may be used to remember:",
            bullets: [
                "language;",
                "region;",
                "display preferences;",
                "accessibility settings;",
                "previously selected options; and",
                "other user-interface choices.",
            ],
        },
        {
            type: "text",
            description:
                "Where a statutory exception applies, these technologies may operate without prior consent, provided that the legal requirements of the exception are met and you are given a simple means of objecting.\n\nWhere no exception applies, we will request consent before using them.",
        },
        {
            type: "text",
            title: "6.3 Analytics and Performance",
            description:
                "Analytics Technologies help us understand how visitors use the Website.\n\nThey may collect information about:",
            bullets: [
                "pages viewed;",
                "navigation paths;",
                "referral sources;",
                "session duration;",
                "Website errors;",
                "device and browser type;",
                "Website speed;",
                "aggregate visitor activity; and",
                "feature performance.",
            ],
        },
        {
            type: "text",
            description:
                "As our default practice, Analytics Technologies that are not exempt will operate only after consent.\n\nWhere we rely on a lawful statistical-purpose exception, the technologies will be used solely to collect statistical information for improving the Website. We will apply the requirements of that exception and provide a simple, free means of objecting.\n\nAnalytics information should be collected and retained only to the extent reasonably necessary.",
        },
        {
            type: "text",
            title: "6.4 Advertising and Marketing",
            description:
                "Advertising Technologies may be used to:",
            bullets: [
                "measure marketing campaigns;",
                "limit repeated advertisements;",
                "understand whether an advertisement led to a visit or purchase;",
                "create or use advertising audiences;",
                "personalise advertising; and",
                "track activity across websites or devices.",
            ],
        },
        {
            type: "text",
            description:
                "Advertising and cross-site tracking technologies will not be used before the required consent is obtained.\n\nRefusing advertising technologies will not prevent you from accessing the main Website, creating an Account or purchasing a Product.",
        },
        {
            type: "text",
            title: "6.5 Embedded Content and Social Media",
            description:
                "Pages may contain content supplied by third parties, such as:",
            bullets: [
                "videos;",
                "social media features;",
                "maps;",
                "support widgets; or",
                "external media.",
            ],
        },
        {
            type: "text",
            description:
                "These third parties may use Storage Technologies to collect information about your interaction with the embedded content.\n\nWhere required, embedded content will remain blocked or inactive until you give the relevant consent.",
        },
        {
            type: "text",
            title: "7. Current Cookie and Technology List",
            description:
                "The current list of Storage Technologies used through the Website is available through the Cookie Settings panel.\n\nThe list should identify:",
            bullets: [
                "cookie or technology name;",
                "provider;",
                "purpose;",
                "category;",
                "whether it is first-party or third-party;",
                "applicable consent or exception status; and",
                "duration or expiry.",
            ],
        },
        {
            type: "text",
            description:
                "Because Website functionality and service providers may change, the Cookie Settings panel is the most current source of detailed technical information.\n\nWe periodically review the list to identify outdated, unnecessary or incorrectly classified technologies.",
        },
        {
            type: "text",
            title: "8. Legal Rules for Use",
            description:
                "We use Storage Technologies in accordance with applicable data protection and electronic communications laws.\n\nWe may store or access information without consent where a valid legal exception applies, including where the technology is used:",
            bullets: [
                "solely to transmit a communication;",
                "where strictly necessary to provide a service you request;",
                "solely for qualifying statistical purposes;",
                "solely to adapt appearance or functionality to your preferences; or",
                "for another purpose permitted without consent by applicable law.",
            ],
        },
        {
            type: "text",
            description:
                "Each exception is purpose-specific. A technology used for several purposes may still require consent if any purpose falls outside the exception.\n\nWhere an exception requires a simple means of objecting, we will make that control available free of charge.\n\nWhere no exception applies, we will obtain consent before the Storage Technology is used.",
        },
        {
            type: "text",
            title: "9. Cookie Consent Banner",
            description:
                "When you first visit the Website, you may be shown a consent banner or preference panel.\n\nThe banner should provide clear options to:",
            bullets: [
                "Accept All non-exempt technologies;",
                "Reject All non-exempt technologies; or",
                "Manage Preferences by category.",
            ],
        },
        {
            type: "text",
            description:
                "Accept and reject options should be presented with comparable prominence.\n\nNon-essential categories will not be enabled by default.\n\nContinuing to browse, scrolling, closing the banner or failing to make a choice does not by itself constitute consent.",
        },
        {
            type: "text",
            title: "10. Granular Choices",
            description:
                "Where consent is required, you can make separate choices for categories such as:",
            bullets: [
                "Functional;",
                "Analytics;",
                "Embedded Content; and",
                "Advertising.",
            ],
        },
        {
            type: "text",
            description:
                "Strictly Necessary Technologies cannot ordinarily be disabled through the consent panel because they are required to provide services requested through the Website.\n\nWhere a Functional or Analytics Technology operates under a statutory exception instead of consent, the Cookie Settings panel will provide information and an available objection mechanism.",
        },
        {
            type: "text",
            title: "11. Withdrawing or Changing Consent",
            description:
                "You may change your choices or withdraw consent at any time through the Cookie Settings link available on the Website.\n\nWithdrawing consent should be as easy as giving it.\n\nAfter consent is withdrawn, we will:",
            bullets: [
                "stop using the affected non-exempt technologies;",
                "prevent them from being placed again unless consent is renewed;",
                "communicate the withdrawal to relevant third parties where required; and",
                "delete or restrict associated information where legally required.",
            ],
        },
        {
            type: "text",
            description:
                "Withdrawal does not affect processing that was lawful before consent was withdrawn.\n\nSome previously stored cookies may remain on your device until they expire or are deleted through your browser or Cookie Settings.",
        },
        {
            type: "text",
            title: "12. Objecting to Exempt Technologies",
            description:
                "Where we use a qualifying Statistical or Appearance Technology without consent under an applicable exception, you may object through the Cookie Settings panel or by contacting us.\n\nThe objection mechanism will be:",
            bullets: [
                "easy to access;",
                "free of charge; and",
                "capable of stopping the relevant storage or access.",
            ],
        },
        {
            type: "text",
            description:
                "An objection may affect optional analytics or remembered display preferences but should not prevent access to the Website’s core services.",
        },
        {
            type: "text",
            title: "13. Consent Records",
            description:
                "We may keep records showing:",
            bullets: [
                "the date and time of your choice;",
                "the consent mechanism version;",
                "the categories accepted or rejected;",
                "the information shown when the choice was made;",
                "a consent or preference identifier; and",
                "later changes or withdrawal.",
            ],
        },
        {
            type: "text",
            description:
                "These records help us demonstrate that choices were obtained and respected.\n\nConsent records are retained only for an appropriate period, taking account of legal requirements, changes to the Website and the need to demonstrate compliance.",
        },
        {
            type: "text",
            title: "14. Renewing Consent",
            description:
                "Data protection law does not prescribe one universal expiry period for cookie consent.\n\nWe may ask you to review or renew your choices where:",
            bullets: [
                "a reasonable period has passed;",
                "new purposes or providers are introduced;",
                "the technologies materially change;",
                "applicable law or guidance changes;",
                "we cannot confirm that a previous choice remains valid; or",
                "the consent record has expired or been deleted.",
            ],
        },
        {
            type: "text",
            description:
                "We will obtain fresh consent before using a non-exempt technology for a new purpose not covered by the previous consent.",
        },
        {
            type: "text",
            title: "15. Account and Authentication Cookies",
            description:
                "When you create or sign in to an Account, Strictly Necessary Technologies may be used to:",
            bullets: [
                "authenticate you;",
                "maintain the secure session;",
                "prevent unauthorised access;",
                "remember the state of an Order;",
                "display Account Balance;",
                "provide Account features; and",
                "detect suspicious activity.",
            ],
        },
        {
            type: "text",
            description:
                "Disabling these technologies may prevent you from signing in or using Account functionality.",
        },
        {
            type: "text",
            title: "16. Checkout and Payment Technologies",
            description:
                "Checkout may use Storage Technologies to:",
            bullets: [
                "maintain an Order session;",
                "prevent duplicate submission;",
                "verify payment status;",
                "secure the checkout;",
                "detect fraud;",
                "remember required Transaction information; and",
                "redirect securely between the Website and a Payment Provider.",
            ],
        },
        {
            type: "text",
            description:
                "A Payment Provider may use its own strictly necessary security and payment technologies.\n\nIf you leave the Website to complete payment, the Payment Provider’s privacy and cookie policies will apply to its service.",
        },
        {
            type: "text",
            title: "17. Account Balance Technologies",
            description:
                "Storage Technologies may be used to:",
            bullets: [
                "identify your Account;",
                "display Available Balance;",
                "process a Top-Up;",
                "reserve or deduct balance;",
                "prevent unauthorised transactions; and",
                "maintain Transaction security.",
            ],
        },
        {
            type: "text",
            description:
                "These technologies may be treated as Strictly Necessary where they are essential to provide the Account Balance service you request.",
        },
        {
            type: "text",
            title: "18. Product Delivery and Download Technologies",
            description:
                "Where a secure Download Link or delivery portal is used, Storage Technologies may help:",
            bullets: [
                "authenticate the purchaser;",
                "validate the Download Link;",
                "limit unauthorised access;",
                "record delivery status;",
                "prevent link sharing;",
                "enforce reasonable download restrictions; and",
                "investigate failed downloads.",
            ],
        },
        {
            type: "text",
            description:
                "These technologies may operate without consent where they are strictly necessary to provide secure Delivery requested by the purchaser.\n\nThey will not be repurposed for advertising without the required consent.",
        },
        {
            type: "text",
            title: "19. Security and Fraud Prevention",
            description:
                "We may use technologies that help:",
            bullets: [
                "prevent Account takeover;",
                "identify malicious traffic;",
                "detect unusual payments;",
                "protect forms;",
                "prevent automated abuse;",
                "secure Activation Credentials;",
                "enforce Licence limits; and",
                "protect the Website from cyberattacks.",
            ],
        },
        {
            type: "text",
            description:
                "Security technologies may be exempt from consent where they are strictly necessary to provide a secure service requested by the user.\n\nSecurity information will be processed in accordance with our Privacy Policy.",
        },
        {
            type: "text",
            title: "20. Email Technologies",
            description:
                "Transactional and marketing emails may contain tracking technologies that indicate whether an email was:",
            bullets: [
                "delivered;",
                "rejected;",
                "opened; or",
                "interacted with.",
            ],
        },
        {
            type: "text",
            description:
                "Transactional email information may be processed where reasonably necessary to confirm Product Delivery, investigate non-delivery and provide support.\n\nMarketing email tracking will be used only where permitted by law and, where required, after consent.\n\nYou may opt out of marketing emails at any time. This does not prevent essential Order, Account, Delivery, activation or security communications.",
        },
        {
            type: "text",
            title: "21. Browser Controls",
            description:
                "Most browsers allow you to:",
            bullets: [
                "view stored cookies;",
                "delete individual or all cookies;",
                "block first-party or third-party cookies;",
                "block cookies from selected websites;",
                "clear local storage;",
                "restrict tracking; and",
                "receive a notification before storage occurs.",
            ],
        },
        {
            type: "text",
            description:
                "Browser controls vary. Refer to your browser’s privacy or help settings for instructions.\n\nBlocking all cookies may prevent:",
            bullets: [
                "Account login;",
                "checkout;",
                "payment;",
                "Account Balance use;",
                "security verification;",
                "saving privacy choices; and",
                "other essential features.",
            ],
        },
        {
            type: "text",
            description:
                "Browser deletion does not automatically erase personal data already lawfully processed by us. Privacy rights may be exercised under our Privacy Policy.",
        },
        {
            type: "text",
            title: "22. Browser Privacy Signals",
            description:
                "Some browsers or extensions send privacy preference signals.\n\nWe will respond to legally recognised signals where required and technically supported.\n\nBecause browser signals may not communicate sufficiently specific choices for every category or purpose, you should use the Website’s Cookie Settings panel to confirm and manage your preferences.",
        },
        {
            type: "text",
            title: "23. Third-Party Responsibilities",
            description:
                "Where a third party places or accesses information through the Website, we will take reasonable steps to:",
            bullets: [
                "identify the third party;",
                "explain the relevant purpose;",
                "obtain consent where required;",
                "include it in the Cookie Settings panel;",
                "contractually regulate its role where appropriate; and",
                "communicate withdrawal where legally required.",
            ],
        },
        {
            type: "text",
            description:
                "We do not control technologies placed directly through a third-party website after you leave EarnerThemes.",
        },
        {
            type: "text",
            title: "24. International Processing",
            description:
                "Some third-party technology providers may process information outside the United Kingdom.\n\nWhere personal data is transferred internationally, we will use an appropriate safeguard as described in our Privacy Policy.\n\nThe Cookie Settings panel and relevant provider notices may contain further information about specific third-party providers.",
        },
        {
            type: "text",
            title: "25. Data Protection Rights",
            description:
                "Where Storage Technologies process personal data, you may have rights including:",
            bullets: [
                "access;",
                "rectification;",
                "erasure;",
                "restriction;",
                "objection;",
                "data portability;",
                "withdrawal of consent; and",
                "complaint to a data protection authority.",
            ],
        },
        {
            type: "text",
            description:
                "These rights and the process for exercising them are described in our Privacy Policy.",
        },
        {
            type: "text",
            title: "26. Children",
            description:
                "The Website is not intended for persons under 18 years old.\n\nWe do not knowingly use advertising or profiling technologies to target children.\n\nIf you believe that information about a child has been collected through the Website, contact info@earnerthemes.com.",
        },
        {
            type: "text",
            title: "27. Changes to This Cookie Policy",
            description:
                "We may update this Cookie Policy to reflect changes in:",
            bullets: [
                "Storage Technologies;",
                "Website functionality;",
                "service providers;",
                "applicable law;",
                "regulatory guidance; or",
                "our business operations.",
            ],
        },
        {
            type: "text",
            description:
                "The updated version will be published with a revised effective date.\n\nIf we introduce a new non-exempt technology or materially different purpose, we will request fresh consent where required.",
        },
        {
            type: "text",
            title: "28. Complaints",
            description:
                "If you have a concern about our use of Storage Technologies, contact us at info@earnerthemes.com.\n\nYou also have the right to complain to the UK Information Commissioner’s Office:\n\nInformation Commissioner’s Office\nWebsite: https://ico.org.uk/make-a-complaint/",
        },
        {
            type: "text",
            title: "29. Contact Us",
            description: `Questions and requests concerning cookies or similar technologies may be sent to:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}`,
        },
    ],
};

export default cookiePolicyEn;
