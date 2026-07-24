import {PageSchema} from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

const supportPolicyEn: PageSchema = {
    meta: {
        title: `Support Policy – ${COMPANY_NAME}`,
        description:
            "Scope, channels and response times of customer and technical support provided by EarnerThemes.",
        canonical: "/support-policy",
        ogImage: {
            title: `Support Policy – ${COMPANY_NAME}`,
            description: "Scope, channels and response times of customer and technical support provided by EarnerThemes.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Support Policy",
            description: "Effective date: 23 July 2026",
        },
        {
            type: "text",
            title: "1. About This Policy",
            description: `This Support Policy (“Policy”) explains the assistance available in connection with Accounts, payments, Account Balance, Orders, delivery, activation and digital Products purchased through www.earnerthemes.com.\n\nThe Website is operated by:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}\n\nIn this Policy, “EarnerThemes”, “we”, “us” and “our” refer to SENIOR EARNER LTD. “You” and “your” refer to the person or organisation requesting support.\n\nThis Policy forms part of our Terms and Conditions.`,
        },
        {
            type: "text",
            title: "2. Related Policies",
            description:
                "This Policy should be read together with:",
            bullets: [
                "our Terms and Conditions;",
                "Digital Product Licence Agreement;",
                "Payment and Account Balance Policy;",
                "Refund and Cancellation Policy;",
                "Digital Delivery and Download Policy;",
                "Privacy Policy; and",
                "the description and Product-Specific Terms applicable to the purchased Product.",
            ],
        },
        {
            type: "text",
            description:
                "Nothing in this Policy excludes or limits rights that cannot lawfully be excluded.",
        },
        {
            type: "text",
            title: "3. Definitions",
            description:
                "For the purposes of this Policy:\n\n“Account” means a registered user account created through the Website.\n\n“Account Balance” means purchased store credit recorded in an Account.\n\n“Activation Credentials” means a Licence key, activation code, token, login information or other credential supplied for the activation or use of a Product.\n\n“Author” means the creator, developer, publisher or relevant rights holder of a Product.\n\n“Licence” means the limited permission to use a Product under our Digital Product Licence Agreement.\n\n“Order” means a request submitted through the Website to purchase a Product.\n\n“Product” means a digital website theme, template, file, archive, activation credential, documentation or related Digital Content offered through the Website.\n\n“Product Support” means technical assistance relating directly to the included features and intended operation of a Product.\n\n“Support Request” means a request for assistance submitted through an authorised support channel.\n\n“Website Support” means assistance concerning the EarnerThemes Website, Accounts, payments, Orders and Delivery.",
        },
        {
            type: "text",
            title: "4. Support Channel",
            description:
                "Support is provided by email at:\n\ninfo@earnerthemes.com\n\nWe do not currently provide telephone support.\n\nTo help us identify and resolve your issue, contact us using the email address associated with your Account or Order wherever possible.\n\nA message sent through social media, a review, a payment dispute or another public channel may not be treated as a formal Support Request.",
        },
        {
            type: "text",
            title: "5. Website Support",
            description:
                "Website Support is available for reasonable questions and issues concerning:",
            bullets: [
                "Account registration;",
                "Account access;",
                "email address changes;",
                "password or security concerns;",
                "Account Balance Top-Ups;",
                "missing or incorrect balance credits;",
                "payment status;",
                "duplicate payments;",
                "Order status;",
                "Product Delivery;",
                "missing Delivery Emails;",
                "expired or inaccessible Download Links;",
                "corrupted or incomplete delivery files;",
                "Activation Credentials;",
                "Licence verification;",
                "refund procedures;",
                "unauthorised Transactions; and",
                "general use of the EarnerThemes Website.",
            ],
        },
        {
            type: "text",
            description:
                "Website Support does not include management of your hosting environment, third-party platform or completed website.",
        },
        {
            type: "text",
            title: "6. Delivery Support",
            description:
                "Products are normally delivered by email within 24 hours after successful checkout and payment confirmation.\n\nIf you do not receive the Product within 24 hours, Support may assist by:",
            bullets: [
                "confirming the Order status;",
                "checking whether Delivery was attempted;",
                "resending the Delivery Email;",
                "correcting an email address after verification;",
                "issuing a replacement Download Link;",
                "sending the Product through an alternative secure method;",
                "replacing invalid Activation Credentials; or",
                "explaining the applicable cancellation or refund process.",
            ],
        },
        {
            type: "text",
            description:
                "Before contacting Support, check your spam, junk, quarantine and filtered email folders.\n\nAdditional rules are contained in our Digital Delivery and Download Policy.",
        },
        {
            type: "text",
            title: "7. Account Support",
            description:
                "For Account-related assistance, we may ask you to verify:",
            bullets: [
                "your name;",
                "Account email address;",
                "Order or Transaction number;",
                "recent Account activity; and",
                "other information reasonably necessary to confirm ownership.",
            ],
        },
        {
            type: "text",
            description:
                "We will not change Account information, redirect Delivery or disclose Order details where we cannot reasonably verify the requester’s authority.\n\nYou are responsible for maintaining access to your registered email address and protecting your Account credentials.",
        },
        {
            type: "text",
            title: "8. Payment and Account Balance Support",
            description:
                "Support may assist with:",
            bullets: [
                "payments that were charged but not credited;",
                "incorrect Account Balance amounts;",
                "duplicate Top-Ups;",
                "duplicate Product charges;",
                "failed or pending payments;",
                "balance deductions for cancelled Orders;",
                "refunds to Account Balance;",
                "unauthorised Transactions; and",
                "chargeback-related Account restrictions.",
            ],
        },
        {
            type: "text",
            description:
                "Payment processing may involve third-party Payment Providers. We may need to wait for confirmation or information from the relevant provider before resolving a payment issue.\n\nWe cannot control:",
            bullets: [
                "a bank’s payment decision;",
                "currency conversion rates;",
                "third-party processing fees;",
                "card authentication requirements; or",
                "the time a bank takes to display a refund.",
            ],
        },
        {
            type: "text",
            title: "9. Activation Support",
            description:
                "Where Activation Credentials are included, Support may assist with:",
            bullets: [
                "credentials that are invalid when first supplied;",
                "missing activation information;",
                "activation errors;",
                "legitimate domain changes;",
                "deactivation of an old licensed domain;",
                "replacement of compromised credentials; and",
                "verification of authorised installations.",
            ],
        },
        {
            type: "text",
            description:
                "You may be asked to provide:",
            bullets: [
                "the Order number;",
                "Product name;",
                "licensed domain;",
                "previous domain, where relevant;",
                "error message;",
                "screenshot of the activation error; and",
                "Product or platform version.",
            ],
        },
        {
            type: "text",
            description:
                "Activation Support does not permit use on more websites, stores or projects than allowed by the applicable Licence.\n\nWe may decline to reset or replace Activation Credentials where there is reasonable evidence of sharing, resale, unauthorised distribution, chargeback or another material Licence breach.",
        },
        {
            type: "text",
            title: "10. Product Support Availability",
            description:
                "Whether Product Support is included depends on:",
            bullets: [
                "the Product description;",
                "Product-Specific Terms;",
                "the applicable Licence;",
                "any stated support period; and",
                "continued availability of the Product and its Author.",
            ],
        },
        {
            type: "text",
            description:
                "If a Product page does not promise a defined technical support period, the purchase includes assistance with Delivery, activation and confirmed material defects, but does not include ongoing custom technical services.\n\nWhere a support period is stated, it begins on the date the Order is accepted unless the Product-Specific Terms state otherwise.\n\nExpiry of Product Support does not automatically terminate a valid Licence to continue using an installed Product.",
        },
        {
            type: "text",
            title: "11. Product Support Included",
            description:
                "Where Product Support is included, it may cover:",
            bullets: [
                "questions about documented Product features;",
                "guidance on locating settings or included files;",
                "clarification of Product documentation;",
                "assistance reproducing a suspected defect;",
                "confirmed errors in the supplied files;",
                "issues with included functionality;",
                "issues with an included component where the Product documentation makes us or the Author responsible;",
                "reasonable guidance concerning Product updates;",
                "activation issues; and",
                "clarification of compatibility information stated on the Product page.",
            ],
        },
        {
            type: "text",
            description:
                "Support may provide instructions, documentation, corrected files, replacement Activation Credentials or another reasonable technical solution.",
        },
        {
            type: "text",
            title: "12. Support Not Included",
            description:
                "Unless expressly purchased or stated on the Product page, Support does not include:",
            bullets: [
                "installation of the Product;",
                "full website setup;",
                "hosting configuration;",
                "server administration;",
                "domain or DNS configuration;",
                "migration of an existing website;",
                "content entry;",
                "design services;",
                "customisation;",
                "custom development;",
                "creation of new features;",
                "modification of Product functionality;",
                "training in WordPress, Shopify, WooCommerce, Elementor or another platform;",
                "general programming or web-development education;",
                "SEO, advertising or conversion optimisation;",
                "performance optimisation unrelated to a Product defect;",
                "website security audits;",
                "malware removal;",
                "recovery of deleted data;",
                "recovery from unsuccessful user modifications;",
                "repair of unrelated third-party software;",
                "support for unsupported Product versions;",
                "support for environments that do not meet disclosed requirements;",
                "management of third-party accounts or subscriptions; or",
                "guarantees of traffic, sales, revenue or other commercial results.",
            ],
        },
        {
            type: "text",
            description:
                "We may provide general guidance outside this scope at our discretion, but doing so does not create an ongoing obligation to provide that service.",
        },
        {
            type: "text",
            title: "13. Third-Party Products and Services",
            description:
                "Products may depend on third-party platforms, plugins, applications, hosting services or software.\n\nSupport does not ordinarily cover issues caused solely by:",
            bullets: [
                "WordPress, Shopify or another platform;",
                "a hosting provider;",
                "a domain registrar;",
                "an unrelated plugin or application;",
                "unsupported custom code;",
                "changes made by another developer;",
                "an external API;",
                "a third-party account restriction; or",
                "changes to third-party services outside our reasonable control.",
            ],
        },
        {
            type: "text",
            description:
                "We may help identify a likely third-party issue, but you may need to contact the relevant provider.\n\nWhere a third-party component is included and expressly covered by the Product documentation, we will provide the level of assistance described for that Product.",
        },
        {
            type: "text",
            title: "14. Compatibility Support",
            description:
                "Before purchase, you are responsible for reviewing the Product’s supported:",
            bullets: [
                "platform;",
                "software version;",
                "browser;",
                "hosting environment;",
                "plugins;",
                "dependencies; and",
                "technical requirements.",
            ],
        },
        {
            type: "text",
            description:
                "Support may assist where the Product does not operate in an environment expressly identified as supported at the time of purchase.\n\nSupport is not required to make a Product compatible with:",
            bullets: [
                "an undisclosed environment;",
                "obsolete or unsupported software;",
                "beta or experimental software;",
                "a conflicting third-party plugin;",
                "later third-party changes outside our reasonable control; or",
                "a materially modified version of the Product.",
            ],
        },
        {
            type: "text",
            description:
                "We may recommend updating the Product or platform before investigating an issue.",
        },
        {
            type: "text",
            title: "15. Product Modifications",
            description:
                "You may customise a Product as permitted by the Digital Product Licence Agreement.\n\nHowever, Support is not responsible for problems caused by:",
            bullets: [
                "changes to source code;",
                "deletion or replacement of required files;",
                "modification of core functionality;",
                "installation of conflicting code;",
                "incorrect configuration;",
                "unauthorised third-party modifications; or",
                "failure to maintain a backup.",
            ],
        },
        {
            type: "text",
            description:
                "We may ask you to reproduce the issue using an unmodified copy of the Product.\n\nIf the issue does not occur in the unmodified Product, further assistance may fall outside the included support scope.",
        },
        {
            type: "text",
            title: "16. Product Updates and Bug Fixes",
            description:
                "Where a reproducible Product defect is confirmed, the available response may include:",
            bullets: [
                "instructions or a workaround;",
                "corrected files;",
                "a patch;",
                "replacement files;",
                "an update; or",
                "another appropriate remedy.",
            ],
        },
        {
            type: "text",
            description:
                "We do not guarantee that every reported issue will result in an immediate update or a new Product version.\n\nThe timing of a fix may depend on:",
            bullets: [
                "the severity of the issue;",
                "the complexity of the Product;",
                "the availability of the Author;",
                "third-party dependencies;",
                "security considerations; and",
                "whether a safe workaround is available.",
            ],
        },
        {
            type: "text",
            description:
                "Mandatory consumer remedies remain unaffected.",
        },
        {
            type: "text",
            title: "17. Information Required for Support",
            description:
                "A Support Request should include:",
            bullets: [
                "your name;",
                "Account email address;",
                "Order number;",
                "Product name;",
                "Product version;",
                "platform and software version;",
                "licensed domain, where relevant;",
                "a clear description of the issue;",
                "steps required to reproduce it;",
                "the expected and actual result;",
                "relevant error messages; and",
                "screenshots or logs where reasonably necessary.",
            ],
        },
        {
            type: "text",
            description:
                "Providing complete information helps us investigate the issue efficiently.\n\nYou must not knowingly provide false, misleading or altered evidence.",
        },
        {
            type: "text",
            title: "18. Sensitive Information",
            description:
                "Do not send the following through ordinary email:",
            bullets: [
                "payment card numbers;",
                "card security codes;",
                "online banking credentials;",
                "unrelated passwords;",
                "private encryption keys;",
                "government identification documents unless specifically and lawfully required; or",
                "sensitive personal data unrelated to the Support Request.",
            ],
        },
        {
            type: "text",
            description:
                "EarnerThemes will not ask you to disclose your complete payment card password, online banking password or card security code.\n\nIf temporary access to a website or platform is genuinely required, we will explain why and identify an appropriate secure method. You remain responsible for:",
            bullets: [
                "creating limited temporary credentials;",
                "restricting permissions;",
                "maintaining a current backup;",
                "removing access when assistance is complete; and",
                "avoiding disclosure of unnecessary personal data.",
            ],
        },
        {
            type: "text",
            title: "19. Backups",
            description:
                "Before installing, updating, modifying or troubleshooting a Product, you should create a complete backup of:",
            bullets: [
                "website files;",
                "databases;",
                "configuration;",
                "Product files; and",
                "other important content.",
            ],
        },
        {
            type: "text",
            description:
                "Unless caused by our failure to use reasonable care and skill, Support is not responsible for restoring data lost because you did not maintain an appropriate backup.\n\nDo not conduct troubleshooting directly on a live Production Website where a staging environment can reasonably be used.",
        },
        {
            type: "text",
            title: "20. Support Response and Resolution",
            description:
                "We aim to review and respond to Support Requests as soon as reasonably possible.\n\nResponse and resolution times may vary depending on:",
            bullets: [
                "the type and complexity of the issue;",
                "whether additional information is required;",
                "the involvement of a Payment Provider or Author;",
                "the severity of the issue;",
                "the number of active Support Requests; and",
                "circumstances outside our reasonable control.",
            ],
        },
        {
            type: "text",
            description:
                "Any response estimate is a target and not a guaranteed resolution time unless we expressly agree otherwise in writing.\n\nA request is considered received when it reaches our support inbox. Automated delivery acknowledgements do not constitute a substantive response.",
        },
        {
            type: "text",
            title: "21. Priority of Requests",
            description:
                "We may prioritise Support Requests involving:",
            bullets: [
                "suspected unauthorised Account access;",
                "payment security;",
                "non-delivery after the 24-hour period;",
                "invalid Activation Credentials;",
                "widespread Product defects;",
                "material security vulnerabilities;",
                "complete loss of access to a purchased Product; or",
                "legal or consumer protection obligations.",
            ],
        },
        {
            type: "text",
            description:
                "Lower-priority requests may include general usage questions, cosmetic issues, feature suggestions and requests outside the included support scope.\n\nPrioritisation does not remove any mandatory legal rights.",
        },
        {
            type: "text",
            title: "22. Working With Authors",
            description:
                "Where a Product is owned or maintained by a third-party Author, we may consult that Author to investigate:",
            bullets: [
                "a Product defect;",
                "an activation issue;",
                "an update;",
                "compatibility;",
                "licensing; or",
                "another Product-specific matter.",
            ],
        },
        {
            type: "text",
            description:
                "We will share only information reasonably necessary to address the issue and will handle personal data in accordance with our Privacy Policy.\n\nThe involvement of an Author may affect the time required to investigate, but EarnerThemes remains responsible for obligations that apply to us as the seller under the purchase contract.",
        },
        {
            type: "text",
            title: "23. Communication Standards",
            description:
                "Support communications must remain professional and lawful.\n\nYou must not:",
            bullets: [
                "threaten or harass support personnel;",
                "use discriminatory or abusive language;",
                "send malware or harmful files;",
                "submit repeated duplicate requests intended to disrupt support;",
                "impersonate another person;",
                "disclose another person’s private information without authority; or",
                "attempt to obtain access to another customer’s Product or Account.",
            ],
        },
        {
            type: "text",
            description:
                "We may restrict communications that are abusive, threatening, fraudulent or unrelated to a legitimate support issue.\n\nWhere possible, we will continue handling the underlying issue through an appropriate controlled channel.",
        },
        {
            type: "text",
            title: "24. Duplicate Support Requests",
            description:
                "Submitting multiple emails about the same issue may delay investigation.\n\nWhere possible, reply to the existing email thread and retain the same subject line.\n\nWe may combine duplicate requests or close later duplicates while continuing to address the original request.",
        },
        {
            type: "text",
            title: "25. Closing a Support Request",
            description:
                "A Support Request may be treated as resolved or closed where:",
            bullets: [
                "the requested information or remedy has been provided;",
                "the issue has been corrected;",
                "replacement files or Activation Credentials have been supplied;",
                "the request falls outside the included support scope;",
                "the issue is caused solely by an unsupported third party;",
                "we have requested necessary information but received no response within a reasonable time;",
                "a refund has been completed; or",
                "the request is fraudulent or abusive.",
            ],
        },
        {
            type: "text",
            description:
                "A closed request may be reopened where new relevant information becomes available.",
        },
        {
            type: "text",
            title: "26. Feature Requests",
            description:
                "We welcome reasonable suggestions for Product improvements.\n\nSubmitting a suggestion does not:",
            bullets: [
                "require us or the Author to implement it;",
                "create a development commitment;",
                "give you ownership of a future feature;",
                "extend a support period; or",
                "entitle you to compensation.",
            ],
        },
        {
            type: "text",
            description:
                "A Product is assessed against the features described at the time of purchase, not against requested future functionality.",
        },
        {
            type: "text",
            title: "27. Refunds and Support",
            description:
                "A refund will not automatically be issued when a technical issue is first reported.\n\nWhere appropriate, we may first attempt:",
            bullets: [
                "re-delivery;",
                "activation correction;",
                "repair;",
                "replacement;",
                "an update;",
                "a workaround; or",
                "another reasonable solution.",
            ],
        },
        {
            type: "text",
            description:
                "A refund or price reduction may be available where the Product is materially defective or not as described and an appropriate repair or replacement is impossible, unsuccessful, unreasonably delayed or causes significant inconvenience.\n\nRefund eligibility is governed by our Refund and Cancellation Policy and applicable law.",
        },
        {
            type: "text",
            title: "28. Effect of a Refund or Chargeback",
            description:
                "Following a full refund or successful chargeback:",
            bullets: [
                "the Product Licence ends;",
                "Product Support ends;",
                "Download Links may be disabled;",
                "Activation Credentials may be cancelled; and",
                "you must stop using and delete the Product.",
            ],
        },
        {
            type: "text",
            description:
                "Support may remain available only for questions required to complete the refund, Account adjustment or Licence termination.",
        },
        {
            type: "text",
            title: "29. Product Discontinuation",
            description:
                "If a Product is discontinued, we may no longer be able to provide:",
            bullets: [
                "future updates;",
                "new compatibility work;",
                "replacement downloads;",
                "Author assistance; or",
                "ongoing activation services.",
            ],
        },
        {
            type: "text",
            description:
                "Discontinuation does not automatically terminate a valid existing Licence.\n\nWhere discontinuation affects a recently accepted Order or mandatory legal right, the available remedy will be determined under our Refund and Cancellation Policy and applicable law.",
        },
        {
            type: "text",
            title: "30. Privacy and Support Records",
            description:
                "We process Support Request information in accordance with our Privacy Policy.\n\nSupport records may include:",
            bullets: [
                "contact information;",
                "Account and Order details;",
                "licensed domain information;",
                "payment status;",
                "technical information;",
                "screenshots and logs;",
                "correspondence;",
                "investigation notes; and",
                "the resolution provided.",
            ],
        },
        {
            type: "text",
            description:
                "We may retain support records where reasonably necessary for service delivery, security, dispute resolution, fraud prevention and legal compliance.",
        },
        {
            type: "text",
            title: "31. Limitation of Support",
            description:
                "Support is provided only for lawful use of a validly purchased Product.\n\nWe may decline or restrict Support where:",
            bullets: [
                "the Product was obtained from an unauthorised source;",
                "the Licence has expired or been terminated;",
                "the purchase was refunded or reversed;",
                "Activation Credentials were shared or resold;",
                "the Product is being used on unauthorised websites;",
                "the requester cannot verify the Order;",
                "the request seeks assistance with unlawful activity; or",
                "there has been a material breach of our Terms or Licence.",
            ],
        },
        {
            type: "text",
            description:
                "This section does not remove rights that cannot legally be excluded.",
        },
        {
            type: "text",
            title: "32. Changes to This Policy",
            description:
                "We may update this Policy to reflect changes in:",
            bullets: [
                "support channels;",
                "Product functionality;",
                "delivery procedures;",
                "security requirements;",
                "legal obligations; or",
                "business operations.",
            ],
        },
        {
            type: "text",
            description:
                "The updated version will be published with a revised effective date.\n\nA change will not retroactively remove a support entitlement expressly included in an existing Order unless required by law or agreed with you.",
        },
        {
            type: "text",
            title: "33. Governing Law and Disputes",
            description:
                "This Policy and any non-contractual obligations arising from it are governed by the laws of England and Wales.\n\nIf you are a Consumer, this choice of law does not deprive you of mandatory protections available under the law of the country in which you ordinarily reside.\n\nIf you disagree with the handling of a Support Request, email info@earnerthemes.com and provide:",
            bullets: [
                "the Order number;",
                "the existing support correspondence;",
                "the reason you disagree; and",
                "the resolution requested.",
            ],
        },
        {
            type: "text",
            description:
                "We will review the complaint in good faith.",
        },
        {
            type: "text",
            title: "34. Contact Us",
            description: `Support Requests may be sent to:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}`,
        },
    ],
};

export default supportPolicyEn;
