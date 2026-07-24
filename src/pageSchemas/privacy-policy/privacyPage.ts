import {PageSchema} from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

const privacyPolicyEn: PageSchema = {
    meta: {
        title: `Privacy Policy – ${COMPANY_NAME}`,
        description:
            "How EarnerThemes collects, uses, shares and protects personal data, and the rights available to you.",
        canonical: "/privacy-policy",
        ogImage: {
            title: `Privacy Policy – ${COMPANY_NAME}`,
            description: "How EarnerThemes collects, uses, shares and protects personal data, and the rights available to you.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Privacy Policy",
            description: "Effective date: 23 July 2026",
        },
        {
            type: "text",
            title: "1. About This Privacy Policy",
            description: `This Privacy Policy explains how SENIOR EARNER LTD collects, uses, stores, shares and protects personal data in connection with www.earnerthemes.com, customer Accounts, Account Balance Top-Ups, Orders, digital Product delivery, activation and support.\n\nThe data controller responsible for your personal data is:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}\n\nIn this Privacy Policy, “EarnerThemes”, “we”, “us” and “our” refer to SENIOR EARNER LTD. “You” and “your” refer to an individual who visits the Website, creates an Account, places an Order, contacts us or otherwise interacts with our services.`,
        },
        {
            type: "text",
            title: "2. Scope",
            description:
                "This Privacy Policy applies when you:",
            bullets: [
                "visit or use the Website;",
                "create or manage an Account;",
                "purchase or use Account Balance;",
                "place or receive an Order;",
                "purchase, download, activate or use a Product;",
                "contact customer support;",
                "submit a refund, payment or intellectual property request;",
                "receive transactional or marketing communications; or",
                "otherwise provide personal data to EarnerThemes.",
            ],
        },
        {
            type: "text",
            description:
                "This Privacy Policy does not apply to websites, platforms or services operated independently by third parties. Those parties are responsible for their own privacy practices.",
        },
        {
            type: "text",
            title: "3. Personal Data We Collect",
            description:
                "The personal data we collect depends on how you interact with EarnerThemes.",
        },
        {
            type: "text",
            title: "3.1 Identity and Contact Information",
            description:
                "We may collect:",
            bullets: [
                "full name;",
                "email address;",
                "billing address;",
                "country or region;",
                "company or business name;",
                "job title, where relevant; and",
                "other contact information you voluntarily provide.",
            ],
        },
        {
            type: "text",
            title: "3.2 Account Information",
            description:
                "When you create or use an Account, we may collect:",
            bullets: [
                "Account identifier;",
                "username;",
                "password in protected or hashed form;",
                "Account creation date;",
                "Account status;",
                "communication preferences;",
                "Account Balance;",
                "login and security records; and",
                "changes made to Account details.",
            ],
        },
        {
            type: "text",
            description:
                "You are responsible for keeping your Account information accurate and current.",
        },
        {
            type: "text",
            title: "3.3 Order and Transaction Information",
            description:
                "We may collect:",
            bullets: [
                "Order numbers;",
                "Products purchased;",
                "Licence type;",
                "purchase date and amount;",
                "Account Balance Top-Ups;",
                "balance deductions and adjustments;",
                "transaction currency;",
                "taxes and billing information;",
                "payment status;",
                "Payment Provider reference;",
                "refund and cancellation records;",
                "chargeback and payment dispute information;",
                "fraud and verification results; and",
                "receipts and invoice information.",
            ],
        },
        {
            type: "text",
            title: "3.4 Payment Information",
            description:
                "Payments may be processed by third-party Payment Providers.\n\nDepending on the payment method, the Payment Provider may collect:",
            bullets: [
                "payment card information;",
                "bank or payment account details;",
                "billing address;",
                "authentication information; and",
                "fraud-prevention data.",
            ],
        },
        {
            type: "text",
            description:
                "EarnerThemes generally receives only the information required to identify and administer the Transaction, such as:",
            bullets: [
                "payment status;",
                "transaction amount;",
                "Payment Provider reference;",
                "payment method type;",
                "billing information;",
                "limited card information, such as card brand or last digits, where supplied; and",
                "chargeback or refund status.",
            ],
        },
        {
            type: "text",
            description:
                "Payment Providers process payment information under their own terms and privacy policies.",
        },
        {
            type: "text",
            title: "3.5 Product, Licence and Activation Information",
            description:
                "We may collect:",
            bullets: [
                "Products purchased;",
                "Product and Licence version;",
                "licensed domain;",
                "staging or replacement domain;",
                "Activation Credentials issued;",
                "activation status;",
                "activation date;",
                "authorised installation information;",
                "Download Link activity;",
                "delivery status;",
                "Product update records; and",
                "information required to verify Licence compliance.",
            ],
        },
        {
            type: "text",
            description:
                "We use this information to deliver Products, administer Licences, prevent unauthorised use and provide activation support.",
        },
        {
            type: "text",
            title: "3.6 Delivery Information",
            description:
                "To deliver a Product, we may process:",
            bullets: [
                "your name;",
                "email address;",
                "Order number;",
                "Product purchased;",
                "payment confirmation;",
                "delivery time;",
                "delivery status;",
                "email rejection or failure information;",
                "Download Link status; and",
                "related correspondence.",
            ],
        },
        {
            type: "text",
            title: "3.7 Support and Communication Information",
            description:
                "When you contact us, we may collect:",
            bullets: [
                "the content of your message;",
                "Order and Account information;",
                "support history;",
                "screenshots;",
                "technical logs;",
                "error messages;",
                "platform and software versions;",
                "licensed domain;",
                "refund or complaint information;",
                "records of our response; and",
                "any other information you voluntarily provide.",
            ],
        },
        {
            type: "text",
            description:
                "Please do not send payment card security codes, online banking passwords or unrelated sensitive information through ordinary email.",
        },
        {
            type: "text",
            title: "3.8 Technical and Usage Information",
            description:
                "When you use the Website, we may automatically collect:",
            bullets: [
                "IP address;",
                "browser type and version;",
                "operating system;",
                "device type;",
                "approximate location derived from an IP address;",
                "language and time zone;",
                "referral source;",
                "pages viewed;",
                "links selected;",
                "date and time of access;",
                "session and login information;",
                "Website performance information;",
                "error and security logs; and",
                "identifiers stored through cookies or similar technologies.",
            ],
        },
        {
            type: "text",
            title: "3.9 Marketing and Preference Information",
            description:
                "We may collect:",
            bullets: [
                "marketing consent;",
                "newsletter subscription status;",
                "email engagement information;",
                "communication preferences;",
                "cookie preferences;",
                "Products or categories viewed; and",
                "records of opt-in, opt-out and consent withdrawal.",
            ],
        },
        {
            type: "text",
            title: "3.10 Fraud and Security Information",
            description:
                "We may process information reasonably necessary to identify and prevent:",
            bullets: [
                "payment fraud;",
                "Account takeover;",
                "unauthorised Transactions;",
                "chargeback abuse;",
                "Licence-key sharing;",
                "unauthorised Product distribution;",
                "malware or cyberattacks;",
                "breach of our Terms; and",
                "other unlawful activity.",
            ],
        },
        {
            type: "text",
            description:
                "This information may include IP addresses, device indicators, transaction patterns, failed login attempts, activation activity and information received from Payment Providers.",
        },
        {
            type: "text",
            title: "4. Information We Do Not Intentionally Collect",
            description:
                "We do not ordinarily require or intentionally collect special category personal data, such as information about:",
            bullets: [
                "health;",
                "racial or ethnic origin;",
                "religious or philosophical beliefs;",
                "political opinions;",
                "trade union membership;",
                "genetic or biometric identity;",
                "sex life; or",
                "sexual orientation.",
            ],
        },
        {
            type: "text",
            description:
                "Please do not provide this information unless it is genuinely necessary for a specific request.\n\nIf you voluntarily provide sensitive personal data, we will process it only where a valid legal basis and any additional legal condition apply.",
        },
        {
            type: "text",
            title: "5. How We Collect Personal Data",
            description:
                "We may collect personal data:",
        },
        {
            type: "text",
            title: "5.1 Directly From You",
            description:
                "For example, when you:",
            bullets: [
                "create an Account;",
                "place an Order;",
                "purchase a Top-Up;",
                "enter billing information;",
                "request Product Delivery;",
                "contact Support;",
                "request a refund;",
                "report a problem;",
                "submit a legal complaint;",
                "subscribe to marketing; or",
                "update your preferences.",
            ],
        },
        {
            type: "text",
            title: "5.2 Automatically",
            description:
                "We may collect technical and usage information through:",
            bullets: [
                "server logs;",
                "cookies;",
                "local storage;",
                "security tools;",
                "analytics technologies;",
                "email delivery records; and",
                "similar technologies.",
            ],
        },
        {
            type: "text",
            description:
                "Non-essential cookies and similar technologies are used only in accordance with applicable consent requirements. Further information is provided in our Cookie Policy.",
        },
        {
            type: "text",
            title: "5.3 From Third Parties",
            description:
                "We may receive personal data from:",
            bullets: [
                "Payment Providers;",
                "banks and card networks;",
                "fraud-prevention providers;",
                "Product Authors or rights holders;",
                "email and delivery providers;",
                "hosting and security providers;",
                "analytics providers, where permitted;",
                "professional advisers;",
                "public authorities; and",
                "publicly available sources where reasonably necessary for fraud prevention, legal claims or rights verification.",
            ],
        },
        {
            type: "text",
            title: "6. Purposes and Legal Bases",
            description:
                "We process personal data only where we have a valid legal basis.",
        },
        {
            type: "text",
            description:
                "Purpose | Personal data used | Principal legal basis",
            bullets: [
                "Creating and managing an Account — Identity, contact, Account and security information — Performance of a contract; legitimate interests",
                "Processing Top-Ups and payments — Identity, billing, Transaction and fraud information — Performance of a contract; legal obligation; legitimate interests",
                "Processing and accepting Orders — Identity, Account, Product, Licence and Transaction information — Performance of a contract",
                "Delivering Products within 24 hours — Contact, Order, Delivery and payment status information — Performance of a contract",
                "Issuing and administering Activation Credentials — Order, Product, Licence, domain and activation information — Performance of a contract; legitimate interests",
                "Providing customer support — Contact, Order, support and technical information — Performance of a contract; legitimate interests",
                "Handling refunds, cancellations and chargebacks — Transaction, Order, support, payment and fraud information — Performance of a contract; legal obligation; legitimate interests",
                "Maintaining accounting and tax records — Identity, billing, Transaction and invoice information — Legal obligation",
                "Protecting Accounts and the Website — Account, device, log, IP, security and fraud information — Legitimate interests; legal obligation",
                "Preventing fraud and Licence abuse — Transaction, Account, activation and security information — Legitimate interests; legal obligation",
                "Enforcing contractual and intellectual property rights — Account, Order, Licence, support and legal complaint information — Legitimate interests; legal obligation",
                "Improving the Website and services — Technical, usage and support information — Legitimate interests; consent where required",
                "Remembering non-essential preferences and analytics — Cookie, device and usage information — Consent where required",
                "Sending requested or permitted marketing — Contact, preference and engagement information — Consent or legitimate interests where legally permitted",
                "Responding to regulators and legal claims — Relevant Account, Order, Transaction and communication information — Legal obligation; legitimate interests",
                "Business restructuring or transfer — Relevant customer, Account and Transaction records — Legitimate interests; legal obligation where applicable",
            ],
        },
        {
            type: "text",
            description:
                "Where we rely on legitimate interests, we consider whether the processing is necessary and whether your rights and interests override ours.\n\nOur legitimate interests may include:",
            bullets: [
                "operating and improving EarnerThemes;",
                "providing customer support;",
                "securing Accounts and Transactions;",
                "preventing fraud;",
                "protecting intellectual property;",
                "keeping appropriate business records;",
                "understanding Website performance; and",
                "establishing, exercising or defending legal claims.",
            ],
        },
        {
            type: "text",
            title: "7. Information Required to Provide Services",
            description:
                "Some personal data is required to enter into or perform a contract with you.\n\nFor example, we need:",
            bullets: [
                "a valid email address to deliver a Product;",
                "payment confirmation to process an Order;",
                "Order information to provide support;",
                "Licence and domain information to provide activation; and",
                "billing information where required for tax or accounting.",
            ],
        },
        {
            type: "text",
            description:
                "If you do not provide required information, we may be unable to:",
            bullets: [
                "create or secure an Account;",
                "process a payment;",
                "accept an Order;",
                "deliver a Product;",
                "issue Activation Credentials;",
                "process a refund; or",
                "respond to a Support Request.",
            ],
        },
        {
            type: "text",
            title: "8. Account Balance and Payment Data",
            description:
                "We process Account Balance and payment-related data to:",
            bullets: [
                "credit completed Top-Ups;",
                "record Available Balance;",
                "deduct Product purchases;",
                "correct errors;",
                "process refunds;",
                "investigate unauthorised Transactions;",
                "respond to chargebacks;",
                "prevent fraud; and",
                "comply with financial, tax and accounting obligations.",
            ],
        },
        {
            type: "text",
            description:
                "We do not use Account Balance information as a general-purpose financial profile.\n\nPayment information is shared only where reasonably necessary with Payment Providers, banks, card networks, fraud-prevention providers, professional advisers and authorities.",
        },
        {
            type: "text",
            title: "9. Product Delivery and Activation",
            description:
                "Products are delivered electronically to the email address associated with the Order.\n\nWe may retain records showing:",
            bullets: [
                "when an Order was accepted;",
                "when a Delivery Email was sent;",
                "whether the email was rejected;",
                "whether a Download Link was issued;",
                "whether Activation Credentials were generated;",
                "the domain associated with activation; and",
                "whether Delivery or activation was repeated.",
            ],
        },
        {
            type: "text",
            description:
                "These records help us demonstrate contract performance, investigate non-delivery, prevent unauthorised distribution and resolve disputes.",
        },
        {
            type: "text",
            title: "10. Product Authors and Rights Holders",
            description:
                "Where a Product is created or maintained by a third-party Author, we may share limited personal data with that Author where reasonably necessary to:",
            bullets: [
                "generate or verify Activation Credentials;",
                "investigate a Product defect;",
                "provide Product-specific support;",
                "confirm an authorised installation;",
                "provide an update;",
                "investigate intellectual property misuse; or",
                "resolve a Licence-related issue.",
            ],
        },
        {
            type: "text",
            description:
                "The information shared may include:",
            bullets: [
                "Order reference;",
                "Product and Licence information;",
                "licensed domain;",
                "activation status;",
                "relevant technical details; and",
                "limited contact information where direct communication is necessary.",
            ],
        },
        {
            type: "text",
            description:
                "We do not permit Authors to use this information for unrelated marketing unless you have separately agreed.",
        },
        {
            type: "text",
            title: "11. Cookies and Similar Technologies",
            description:
                "We use cookies and similar technologies to:",
            bullets: [
                "operate essential Website features;",
                "maintain login sessions;",
                "remember Account and security settings;",
                "process checkout;",
                "prevent fraud;",
                "store preferences;",
                "measure Website performance;",
                "understand Website usage; and",
                "provide marketing or advertising where permitted.",
            ],
        },
        {
            type: "text",
            description:
                "Strictly necessary technologies may operate without consent where legally permitted.\n\nNon-essential analytics, personalisation and advertising technologies will be used only after the required consent has been obtained.\n\nYou can manage non-essential preferences through the Website’s cookie controls.\n\nFurther information is provided in our Cookie Policy.",
        },
        {
            type: "text",
            title: "12. Marketing Communications",
            description:
                "We may send marketing communications where:",
            bullets: [
                "you have consented;",
                "applicable law permits us to contact an existing customer about similar Products; or",
                "another lawful basis applies.",
            ],
        },
        {
            type: "text",
            description:
                "Marketing communications may include information about:",
            bullets: [
                "new Products;",
                "Product categories;",
                "promotions;",
                "discounts;",
                "Website updates; and",
                "relevant EarnerThemes services.",
            ],
        },
        {
            type: "text",
            description:
                "You may opt out at any time by:",
            bullets: [
                "using the unsubscribe link in a marketing email;",
                "changing available Account preferences; or",
                "contacting info@earnerthemes.com.",
            ],
        },
        {
            type: "text",
            description:
                "Opting out of marketing does not stop necessary transactional communications concerning your Account, payments, Orders, Product Delivery, activation, security or support.\n\nWe may retain minimal suppression information to ensure that your opt-out is respected.",
        },
        {
            type: "text",
            title: "13. Sharing Personal Data",
            description:
                "We may share personal data with the following categories of recipients where reasonably necessary.",
        },
        {
            type: "text",
            title: "13.1 Service Providers",
            description:
                "These may include providers of:",
            bullets: [
                "Website hosting;",
                "cloud storage;",
                "email and Product Delivery;",
                "payment processing;",
                "fraud prevention;",
                "Account authentication;",
                "analytics;",
                "cookie consent management;",
                "customer support;",
                "cybersecurity;",
                "data backup; and",
                "professional administration.",
            ],
        },
        {
            type: "text",
            description:
                "Service providers acting as our processors are authorised to process personal data only for the agreed services and subject to appropriate contractual requirements.",
        },
        {
            type: "text",
            title: "13.2 Payment and Financial Parties",
            description:
                "We may share information with:",
            bullets: [
                "Payment Providers;",
                "banks;",
                "card networks;",
                "fraud-prevention services;",
                "accounting providers; and",
                "tax authorities.",
            ],
        },
        {
            type: "text",
            title: "13.3 Authors and Rights Holders",
            description:
                "We may share limited Licence, activation and technical information as described in this Privacy Policy.",
        },
        {
            type: "text",
            title: "13.4 Professional Advisers",
            description:
                "We may share relevant information with:",
            bullets: [
                "lawyers;",
                "accountants;",
                "auditors;",
                "insurers;",
                "consultants; and",
                "debt or dispute-resolution advisers.",
            ],
        },
        {
            type: "text",
            title: "13.5 Public Authorities",
            description:
                "We may disclose personal data where required or permitted by law to:",
            bullets: [
                "courts;",
                "law-enforcement bodies;",
                "regulators;",
                "tax authorities;",
                "government agencies; and",
                "other competent authorities.",
            ],
        },
        {
            type: "text",
            title: "13.6 Business Transfers",
            description:
                "If all or part of our business is sold, transferred, merged or reorganised, relevant personal data may be disclosed to prospective or actual purchasers and their advisers.\n\nWe will take reasonable steps to protect confidentiality and ensure that personal data continues to be used consistently with applicable law.",
        },
        {
            type: "text",
            title: "14. Selling Personal Data",
            description:
                "We do not sell or rent personal data as a standalone commercial activity.\n\nWe may share personal data with service providers and other recipients for the purposes described in this Privacy Policy. Such sharing is not permission for recipients to use the information for their independent unrelated purposes.",
        },
        {
            type: "text",
            title: "15. International Transfers",
            description:
                "Some service providers, Authors or technical systems may be located outside the United Kingdom or may process personal data in other countries.\n\nWhere a restricted international transfer occurs, we will use an appropriate legal safeguard, which may include:",
            bullets: [
                "transfer to a country covered by UK adequacy regulations;",
                "the UK International Data Transfer Agreement;",
                "the UK Addendum to approved contractual clauses;",
                "another legally recognised transfer mechanism; or",
                "a specific legal exception where applicable.",
            ],
        },
        {
            type: "text",
            description:
                "Where required, we will assess whether the destination and transfer arrangements provide an appropriate level of protection.\n\nYou may contact info@earnerthemes.com for further information about safeguards relevant to your personal data.",
        },
        {
            type: "text",
            title: "16. Data Retention",
            description:
                "We retain personal data only for as long as reasonably necessary for the purpose for which it was collected, including legal, accounting, security and dispute-resolution requirements.\n\nRetention is determined by considering:",
            bullets: [
                "the nature and sensitivity of the information;",
                "the purpose of processing;",
                "the duration of the customer relationship;",
                "Licence and support requirements;",
                "fraud and security risks;",
                "applicable limitation periods;",
                "accounting and tax obligations; and",
                "whether a legal dispute is pending.",
            ],
        },
        {
            type: "text",
            description:
                "Our principal retention approach is:",
            bullets: [
                "Account information is retained while the Account remains active and afterwards where reasonably necessary to administer Orders, Licences, disputes or legal obligations;",
                "Order, payment, Account Balance, tax and invoice records are generally retained for up to six years after the relevant Transaction or longer where legally required;",
                "Delivery, Licence and activation records may be retained for the duration of the Licence and a reasonable period afterwards to verify authorised use and resolve disputes;",
                "Support correspondence is retained for as long as reasonably necessary to address the issue and maintain an appropriate record;",
                "security and fraud records are retained according to the risk and any ongoing investigation;",
                "marketing information is retained until you opt out or it is no longer required, after which minimal suppression data may be retained;",
                "cookie information is retained for the periods described in the Cookie Policy; and",
                "legal complaint information may be retained until the matter and applicable claim period have ended.",
            ],
        },
        {
            type: "text",
            description:
                "When personal data is no longer required, we will delete it, anonymise it or securely restrict its use.",
        },
        {
            type: "text",
            title: "17. Data Security",
            description:
                "We use appropriate technical and organisational measures designed to protect personal data against:",
            bullets: [
                "unauthorised access;",
                "unlawful use;",
                "accidental loss;",
                "alteration;",
                "disclosure;",
                "destruction; and",
                "other security threats.",
            ],
        },
        {
            type: "text",
            description:
                "Measures may include:",
            bullets: [
                "access controls;",
                "password protection;",
                "encryption in transit where appropriate;",
                "secure hosting;",
                "logging and monitoring;",
                "backups;",
                "staff or contractor confidentiality obligations;",
                "payment processing through specialised providers; and",
                "procedures for responding to security incidents.",
            ],
        },
        {
            type: "text",
            description:
                "No online system can be guaranteed completely secure. You are responsible for protecting your Account password, email account, device and Activation Credentials.\n\nIf you suspect unauthorised Account access or a personal data incident, contact info@earnerthemes.com promptly.",
        },
        {
            type: "text",
            title: "18. Personal Data Breaches",
            description:
                "If a personal data breach occurs, we will:",
            bullets: [
                "investigate the incident;",
                "take reasonable steps to contain and remedy it;",
                "assess the potential risk to individuals;",
                "document the incident where required; and",
                "notify the Information Commissioner’s Office or affected individuals where legally required.",
            ],
        },
        {
            type: "text",
            title: "19. Your Data Protection Rights",
            description:
                "Depending on the circumstances and applicable law, you may have the following rights.",
        },
        {
            type: "text",
            title: "19.1 Right to Be Informed",
            description:
                "You have the right to receive clear information about how your personal data is used.",
        },
        {
            type: "text",
            title: "19.2 Right of Access",
            description:
                "You may request confirmation of whether we process your personal data and obtain a copy of that data.",
        },
        {
            type: "text",
            title: "19.3 Right to Rectification",
            description:
                "You may ask us to correct inaccurate personal data or complete incomplete information.",
        },
        {
            type: "text",
            title: "19.4 Right to Erasure",
            description:
                "You may ask us to delete personal data where there is no continuing lawful reason to retain it.\n\nThis right is not absolute. We may retain information where necessary for legal obligations, fraud prevention, Licence administration, disputes or legal claims.",
        },
        {
            type: "text",
            title: "19.5 Right to Restrict Processing",
            description:
                "You may ask us to restrict the use of personal data in certain circumstances, including while its accuracy or lawful use is being reviewed.",
        },
        {
            type: "text",
            title: "19.6 Right to Data Portability",
            description:
                "Where processing is based on consent or contract and carried out by automated means, you may have the right to receive relevant personal data in a structured, commonly used and machine-readable format.",
        },
        {
            type: "text",
            title: "19.7 Right to Object",
            description:
                "You may object to processing based on legitimate interests in certain circumstances.\n\nYou have an absolute right to object to the use of your personal data for direct marketing.",
        },
        {
            type: "text",
            title: "19.8 Right to Withdraw Consent",
            description:
                "Where processing is based on consent, you may withdraw consent at any time.\n\nWithdrawal does not affect processing that was lawful before consent was withdrawn.",
        },
        {
            type: "text",
            title: "19.9 Rights Relating to Automated Decisions",
            description:
                "You may have rights concerning decisions made solely through automated processing that produce legal or similarly significant effects.\n\nFurther information is provided in section 22.",
        },
        {
            type: "text",
            title: "19.10 Right to Complain",
            description:
                "You may complain to us or to the Information Commissioner’s Office.",
        },
        {
            type: "text",
            title: "20. Exercising Your Rights",
            description:
                "To exercise a data protection right, email info@earnerthemes.com.\n\nInclude:",
            bullets: [
                "your name;",
                "the email address associated with your Account;",
                "the right you wish to exercise;",
                "a clear description of the information or processing concerned; and",
                "any relevant Order or Account reference.",
            ],
        },
        {
            type: "text",
            description:
                "We may request reasonable proof of identity before disclosing, deleting or changing personal data.\n\nWe will normally respond within one month. Where a request is complex or multiple requests are submitted, we may extend the response period where legally permitted and will explain the extension.\n\nThere is normally no fee. A reasonable fee may apply, or a request may be refused, where permitted by law because it is manifestly unfounded or excessive.",
        },
        {
            type: "text",
            title: "21. Accuracy of Personal Data",
            description:
                "You should keep your Account and contact information accurate.\n\nYou may update available Account information or contact us to request a correction.\n\nWe are not responsible for Delivery failure caused solely by an incorrect email address that you failed to update, although we will make reasonable efforts to verify the Order and correct the issue.",
        },
        {
            type: "text",
            title: "22. Automated Decision-Making and Profiling",
            description:
                "We may use automated tools or risk indicators to:",
            bullets: [
                "detect unusual payments;",
                "identify suspected fraud;",
                "protect Accounts;",
                "prevent Licence abuse;",
                "identify security threats; and",
                "support marketing analysis where permitted.",
            ],
        },
        {
            type: "text",
            description:
                "These tools may flag a Transaction or Account for additional review.\n\nWe do not intend to make decisions based solely on automated processing that produce legal or similarly significant effects without appropriate legal grounds and safeguards.\n\nWhere applicable, you may request:",
            bullets: [
                "information about the decision;",
                "human review;",
                "an opportunity to provide additional information; and",
                "reconsideration of the result.",
            ],
        },
        {
            type: "text",
            description:
                "Contact info@earnerthemes.com if you believe a significant decision was made about you solely through automated processing.",
        },
        {
            type: "text",
            title: "23. Children",
            description:
                "The Website and Products are not intended for persons under 18 years old.\n\nWe do not knowingly allow a person under 18 to create an Account, purchase Account Balance or place an Order.\n\nIf you believe that a child has provided personal data to us, contact info@earnerthemes.com. We will investigate and delete the information where appropriate.",
        },
        {
            type: "text",
            title: "24. Third-Party Websites and Platforms",
            description:
                "The Website may contain links to third-party websites or refer to services such as WordPress, Shopify, WooCommerce, Elementor, hosting providers or payment services.\n\nWe do not control those third parties and are not responsible for their privacy practices.\n\nYou should review the relevant privacy policy before providing personal data to an independent third party.",
        },
        {
            type: "text",
            title: "25. Changes to This Privacy Policy",
            description:
                "We may update this Privacy Policy to reflect changes in:",
            bullets: [
                "applicable law;",
                "Website functionality;",
                "Products and services;",
                "payment or delivery methods;",
                "service providers;",
                "security practices; or",
                "business operations.",
            ],
        },
        {
            type: "text",
            description:
                "The updated version will be published with a revised effective date.\n\nWhere a change materially affects how we use personal data, we will provide additional notice where required.",
        },
        {
            type: "text",
            title: "26. Complaints to the Information Commissioner",
            description:
                "We encourage you to contact us first so that we can attempt to resolve your concern.\n\nYou also have the right to complain to the UK Information Commissioner’s Office:\n\nInformation Commissioner’s Office\nWebsite: https://ico.org.uk/make-a-complaint/\n\nIf you reside outside the United Kingdom, you may also have the right to contact the data protection authority in your country.",
        },
        {
            type: "text",
            title: "27. Contact Us",
            description: `Questions, privacy requests and complaints may be sent to:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}`,
        },
    ],
};

export default privacyPolicyEn;
