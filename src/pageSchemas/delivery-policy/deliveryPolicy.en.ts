import {PageSchema} from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

const deliveryPolicyEn: PageSchema = {
    meta: {
        title: `Digital Delivery and Download Policy – ${COMPANY_NAME}`,
        description:
            "How digital products, download links and activation credentials are delivered after purchase on EarnerThemes.",
        canonical: "/delivery-policy",
        ogImage: {
            title: `Digital Delivery and Download Policy – ${COMPANY_NAME}`,
            description: "How digital products, download links and activation credentials are delivered after purchase on EarnerThemes.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Digital Delivery and Download Policy",
            description: "Effective date: 23 July 2026",
        },
        {
            type: "text",
            title: "1. About This Policy",
            description: `This Digital Delivery and Download Policy (“Policy”) explains how digital website themes, templates, files, Activation Credentials and related materials purchased through www.earnerthemes.com are processed, delivered and made available to customers.\n\nThe Website is operated by:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}\n\nIn this Policy, “EarnerThemes”, “we”, “us” and “our” refer to SENIOR EARNER LTD. “You” and “your” refer to the person or organisation placing an Order or receiving a Product.\n\nThis Policy forms part of our Terms and Conditions.`,
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
                "Support Policy; and",
                "any Product-Specific Terms displayed before purchase or included with the Product.",
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
                "For the purposes of this Policy:\n\n“Account” means a registered user account created through the Website.\n\n“Activation Credentials” means a Licence key, activation code, token, login information, registration data or other credential supplied for the activation or use of a Product.\n\n“Delivery” means sending the Product, Product files, download link, Activation Credentials or access instructions to the email address associated with the Order.\n\n“Delivery Email” means an email containing or providing access to the purchased Product or the information required to receive, download or activate it.\n\n“Digital Content” means data supplied in digital form, including themes, templates, files, archives, documentation and Activation Credentials.\n\n“Download Link” means a link supplied by us through which a Product may be downloaded.\n\n“Licence” means the limited permission to use a Product under our Digital Product Licence Agreement.\n\n“Order” means a request submitted through the Website to purchase a Product.\n\n“Product” means a digital website theme, template, file, archive, activation credential, documentation or other Digital Content offered through the Website.",
        },
        {
            type: "text",
            title: "4. Digital-Only Delivery",
            description:
                "All Products sold through EarnerThemes are supplied digitally.\n\nWe do not ship physical:",
            bullets: [
                "discs;",
                "printed materials;",
                "Licence cards;",
                "installation media;",
                "documents; or",
                "other tangible goods.",
            ],
        },
        {
            type: "text",
            description:
                "No shipping or postal delivery address is required unless needed for payment, billing, tax or verification purposes.\n\nReferences to “delivery”, “shipment” or “sending” in connection with a Product mean electronic Delivery.",
        },
        {
            type: "text",
            title: "5. Delivery Method",
            description:
                "Following successful checkout and payment confirmation, a member of our team will contact you using the email address associated with your Order.\n\nDepending on the Product, the Delivery Email may contain:",
            bullets: [
                "the Product as an email attachment;",
                "a secure Download Link;",
                "Activation Credentials;",
                "installation or activation instructions;",
                "Product documentation;",
                "information required to access the Product;",
                "information about included files; or",
                "instructions for obtaining further assistance.",
            ],
        },
        {
            type: "text",
            description:
                "For security, file-size or technical reasons, Product files and Activation Credentials may be sent in separate emails.\n\nA Product may also be delivered through another secure electronic method where necessary. We will provide the relevant access instructions by email.",
        },
        {
            type: "text",
            title: "6. Delivery Time",
            description:
                "We aim to complete Delivery within 24 hours after:",
            bullets: [
                "checkout has been successfully completed;",
                "payment has been confirmed;",
                "sufficient Account Balance has been deducted, where applicable; and",
                "the Order has passed any reasonably necessary security or payment checks.",
            ],
        },
        {
            type: "text",
            description:
                "The 24-hour delivery period is measured in consecutive hours and is not limited to business hours.\n\nIf information supplied with the Order is incomplete or requires clarification, we will contact you as soon as reasonably possible.\n\nIf exceptional circumstances prevent Delivery within 24 hours, we will notify you and provide:",
            bullets: [
                "information about the delay;",
                "an updated delivery estimate; and",
                "available cancellation or refund options where appropriate.",
            ],
        },
        {
            type: "text",
            title: "7. Order Acknowledgement and Acceptance",
            description:
                "An automated email confirming that we have received your Order is an Order acknowledgement. It does not necessarily mean that the Order has been accepted or delivered.\n\nAn Order is normally accepted when we:",
            bullets: [
                "send the Product;",
                "send the Download Link;",
                "send the Activation Credentials;",
                "send access instructions; or",
                "issue a separate acceptance confirmation.",
            ],
        },
        {
            type: "text",
            description:
                "We may decline or cancel an Order before acceptance where:",
            bullets: [
                "payment cannot be confirmed;",
                "the Product is unavailable;",
                "the Order appears fraudulent or unauthorised;",
                "additional verification cannot be completed;",
                "Product or price information contains an obvious error;",
                "Delivery would infringe applicable law or third-party rights; or",
                "you have materially breached our Terms and Conditions.",
            ],
        },
        {
            type: "text",
            description:
                "If an Order is declined after payment or an Account Balance deduction, the corresponding amount will be refunded or restored in accordance with our Refund and Cancellation Policy and Payment and Account Balance Policy.",
        },
        {
            type: "text",
            title: "8. Customer Email Address",
            description:
                "You are responsible for providing a complete and accurate email address when creating an Account and placing an Order.\n\nYou must ensure that:",
            bullets: [
                "the email account is active;",
                "you have access to it;",
                "the mailbox has sufficient available storage;",
                "attachments and messages from EarnerThemes can be received;",
                "spam or security settings do not automatically reject our messages; and",
                "the email address remains current until Delivery is complete.",
            ],
        },
        {
            type: "text",
            description:
                "Before contacting us about non-delivery, check:",
            bullets: [
                "your spam folder;",
                "your junk folder;",
                "filtered or quarantined messages;",
                "inbox rules;",
                "blocked sender settings; and",
                "any alternative inbox tabs used by your email provider.",
            ],
        },
        {
            type: "text",
            description:
                "We are not responsible for a delay caused solely by an incorrect email address supplied by you or by your email provider’s filtering settings. However, we will make reasonable efforts to verify your Order and resend the Product to a corrected address.",
        },
        {
            type: "text",
            title: "9. Correcting an Email Address",
            description:
                "If you entered the wrong email address, contact info@earnerthemes.com as soon as possible.\n\nInclude:",
            bullets: [
                "your full name;",
                "the incorrect email address;",
                "the correct email address;",
                "the Order number;",
                "the Product name; and",
                "reasonable evidence that you are the purchaser.",
            ],
        },
        {
            type: "text",
            description:
                "For security, we may require additional verification before changing the delivery address or resending Activation Credentials.\n\nWe will not redirect Delivery where we reasonably believe that the request is fraudulent, unauthorised or intended to obtain access to another customer’s Product.",
        },
        {
            type: "text",
            title: "10. When Delivery Is Completed",
            description:
                "Delivery will normally be treated as completed when the Delivery Email containing the Product, Download Link, Activation Credentials or access instructions has been sent to the email address associated with the Order, provided that we have not received a delivery failure notification.\n\nWhere the Product and Activation Credentials are sent separately, Delivery is completed when all material elements required to access and use the purchased Product have been sent.\n\nThe following do not automatically mean that Delivery failed:",
            bullets: [
                "the email was placed in a spam or junk folder;",
                "the email was opened later;",
                "you did not immediately download the Product;",
                "you temporarily lost access to your email account; or",
                "your device could not open a supported file format.",
            ],
        },
        {
            type: "text",
            description:
                "This does not limit your rights where the Product was not actually sent, the Download Link did not function or the Product could not reasonably be accessed.",
        },
        {
            type: "text",
            title: "11. Reporting Non-Delivery",
            description:
                "If Delivery has not been received within 24 hours, contact info@earnerthemes.com.\n\nInclude:",
            bullets: [
                "your full name;",
                "the email address associated with the Order;",
                "the Order number;",
                "the Product name;",
                "the date and approximate time of purchase;",
                "the payment method; and",
                "a brief description of the issue.",
            ],
        },
        {
            type: "text",
            description:
                "We will investigate the Order and may:",
            bullets: [
                "resend the Delivery Email;",
                "provide a replacement Download Link;",
                "send the Product using an alternative electronic method;",
                "correct the email address after verification;",
                "provide replacement Activation Credentials; or",
                "issue an appropriate refund if Delivery cannot be completed.",
            ],
        },
        {
            type: "text",
            description:
                "A refund is governed by our Refund and Cancellation Policy.",
        },
        {
            type: "text",
            title: "12. Download Links",
            description:
                "A Delivery Email may contain a Download Link instead of an attachment.\n\nA Download Link may be:",
            bullets: [
                "protected by a token or password;",
                "limited to the intended recipient;",
                "subject to reasonable security restrictions;",
                "limited in the number of download attempts; or",
                "available for a stated period.",
            ],
        },
        {
            type: "text",
            description:
                "Any material expiration period or download limit will be disclosed in the Delivery Email or related instructions.\n\nExpiration of a Download Link does not automatically terminate a valid Product Licence.\n\nIf a legitimate Download Link expires before you can reasonably download the Product, contact us. Subject to Order verification, Product availability and Licence status, we may issue a replacement link.",
        },
        {
            type: "text",
            title: "13. Downloading the Product",
            description:
                "You are responsible for:",
            bullets: [
                "using a secure and compatible device;",
                "maintaining a stable internet connection;",
                "ensuring sufficient storage space;",
                "using suitable software to open the supplied archive or file format;",
                "following the Delivery and installation instructions; and",
                "protecting downloaded files from unauthorised access.",
            ],
        },
        {
            type: "text",
            description:
                "Interrupted or incomplete downloads should be attempted again where the Download Link remains active.\n\nIf repeated download attempts fail, contact us before attempting to obtain the Product from another source.",
        },
        {
            type: "text",
            title: "14. Product Files and Formats",
            description:
                "Product files may be supplied in formats including:",
            bullets: [
                "ZIP or other compressed archives;",
                "WordPress theme packages;",
                "Shopify theme packages;",
                "template files;",
                "source code;",
                "documentation files;",
                "configuration files; and",
                "other formats described on the Product page.",
            ],
        },
        {
            type: "text",
            description:
                "You are responsible for confirming before purchase that your platform, software and hosting environment can use the stated format.\n\nA Product package may contain more than one archive. The installable theme file may be located inside a larger documentation or source package.\n\nSupport may provide reasonable guidance identifying the correct file, but installation and configuration services are not included unless expressly stated.",
        },
        {
            type: "text",
            title: "15. File Integrity and Corrupted Files",
            description:
                "If a downloaded archive or file is incomplete, corrupted or cannot be opened, you should:",
            bullets: [
                "confirm that the download completed;",
                "download the file again where possible;",
                "check that your extraction or installation software supports the file format;",
                "confirm that the correct package is being installed; and",
                "contact us if the problem continues.",
            ],
        },
        {
            type: "text",
            description:
                "Where the delivered file is confirmed to be corrupted or incomplete, we will provide:",
            bullets: [
                "a replacement copy;",
                "a corrected archive;",
                "an alternative Download Link; or",
                "another remedy under our Refund and Cancellation Policy.",
            ],
        },
        {
            type: "text",
            description:
                "Do not download purported replacement copies from unauthorised websites or file-sharing services.",
        },
        {
            type: "text",
            title: "16. Activation Credentials",
            description:
                "Where a Product requires activation, the relevant Activation Credentials will be included in the Delivery Email or sent separately.\n\nActivation Credentials:",
            bullets: [
                "are linked to the purchased Licence;",
                "must be kept confidential;",
                "may be limited to a stated number of installations;",
                "must not be sold, published or shared;",
                "must not be used for unrelated websites or Clients; and",
                "may be disabled following a refund, chargeback or material Licence breach.",
            ],
        },
        {
            type: "text",
            description:
                "If Activation Credentials do not work when first supplied, contact us with:",
            bullets: [
                "the Order number;",
                "the Product name;",
                "the licensed domain;",
                "the relevant error message; and",
                "reasonable non-sensitive technical information.",
            ],
        },
        {
            type: "text",
            description:
                "Do not send passwords, payment card details or unrelated confidential information by ordinary email.",
        },
        {
            type: "text",
            title: "17. Domain and Activation Changes",
            description:
                "If you need to move the same licensed website to a replacement domain, you may be required to:",
            bullets: [
                "deactivate the Product from the previous domain;",
                "confirm that the previous website is no longer using the Licence;",
                "provide the old and new domain details; and",
                "complete reasonable Licence verification.",
            ],
        },
        {
            type: "text",
            description:
                "A domain change does not permit simultaneous use on multiple Production Websites.\n\nThe applicable rules are contained in our Digital Product Licence Agreement.",
        },
        {
            type: "text",
            title: "18. Product Contents",
            description:
                "The delivered Product will include the files and components identified in the Product description or Product-Specific Terms.\n\nUnless expressly stated otherwise:",
            bullets: [
                "preview images may not be included;",
                "demo content may differ from the supplied package;",
                "hosting and domain services are not included;",
                "third-party platform subscriptions are not included;",
                "premium third-party plugins may require separate licensing;",
                "installation and customisation services are not included; and",
                "updates and support are governed separately.",
            ],
        },
        {
            type: "text",
            description:
                "You should review the Product description before purchase and the included documentation after Delivery.",
        },
        {
            type: "text",
            title: "19. Installation",
            description:
                "Delivery does not include installation unless the Product page or Order expressly states otherwise.\n\nYou are responsible for:",
            bullets: [
                "installing the Product;",
                "maintaining a suitable hosting environment;",
                "meeting the disclosed technical requirements;",
                "backing up your website before installation;",
                "following the Product documentation; and",
                "ensuring that third-party software is compatible.",
            ],
        },
        {
            type: "text",
            description:
                "Our Support Policy explains what assistance may be available.",
        },
        {
            type: "text",
            title: "20. Backups and Long-Term Storage",
            description:
                "After Delivery, you should promptly:",
            bullets: [
                "download the Product;",
                "verify that the files can be opened;",
                "retain the original Delivery Email;",
                "save the Order information;",
                "store Activation Credentials securely; and",
                "create at least one secure backup copy.",
            ],
        },
        {
            type: "text",
            description:
                "Subject to the Digital Product Licence Agreement, backup copies may be retained solely for the licensed End Product.\n\nWe do not guarantee that a Product or Download Link will remain permanently available through the Website or our delivery systems.\n\nFailure to retain a backup does not automatically entitle you to a refund.",
        },
        {
            type: "text",
            title: "21. Replacement Delivery",
            description:
                "We may provide replacement Delivery where:",
            bullets: [
                "the original email was not received;",
                "an attachment was blocked;",
                "a Download Link expired before reasonable use;",
                "the files were corrupted;",
                "Activation Credentials were invalid;",
                "the Product was delivered to an incorrect email address and ownership is verified; or",
                "another legitimate technical issue prevented access.",
            ],
        },
        {
            type: "text",
            description:
                "Replacement Delivery is subject to:",
            bullets: [
                "verification of the original Order;",
                "continued validity of the Licence;",
                "absence of a completed refund or chargeback;",
                "Product availability; and",
                "compliance with our Terms and Licence.",
            ],
        },
        {
            type: "text",
            description:
                "We may decline replacement Delivery where there is reasonable evidence of fraud, unauthorised redistribution or Licence abuse.",
        },
        {
            type: "text",
            title: "22. Product Updates",
            description:
                "Updates, if included, may be delivered:",
            bullets: [
                "by email;",
                "through a new Download Link;",
                "through an activation or update system;",
                "through the Author’s authorised system; or",
                "by another method described in the Product documentation.",
            ],
        },
        {
            type: "text",
            description:
                "The purchase of a Product does not guarantee lifetime updates unless that entitlement was expressly stated before purchase.\n\nThe availability of updates does not remove your responsibility to retain the originally delivered files.",
        },
        {
            type: "text",
            title: "23. Product Removal or Discontinuation",
            description:
                "A Product may be removed or discontinued because of:",
            bullets: [
                "an Author’s decision;",
                "expiry or change of distribution rights;",
                "a legal or intellectual property complaint;",
                "a material security concern;",
                "technical incompatibility; or",
                "another legitimate operational reason.",
            ],
        },
        {
            type: "text",
            description:
                "Removal from the Website does not automatically terminate a valid existing Licence.\n\nHowever, future downloads, updates or activation services may become unavailable where continued provision is unlawful or outside our reasonable control.\n\nIf a Product is removed before your accepted Order is delivered, we will offer:",
            bullets: [
                "an appropriate replacement, with your agreement; or",
                "a refund or Account Balance restoration.",
            ],
        },
        {
            type: "text",
            title: "24. Delivery Security",
            description:
                "We take reasonable measures to protect Digital Delivery and prevent unauthorised access.\n\nYou must not:",
            bullets: [
                "forward Delivery Emails to unauthorised persons;",
                "publish Download Links;",
                "share Activation Credentials;",
                "upload Product files to public storage;",
                "bypass download restrictions;",
                "attempt to access another customer’s Product; or",
                "use automated tools to make excessive download requests.",
            ],
        },
        {
            type: "text",
            description:
                "We may suspend a Download Link or Activation Credential where we reasonably believe that it has been compromised or misused.",
        },
        {
            type: "text",
            title: "25. Privacy",
            description:
                "We process Delivery information in accordance with our Privacy Policy.\n\nInformation used for Delivery may include:",
            bullets: [
                "your name;",
                "email address;",
                "Account information;",
                "Order and payment status;",
                "Product and Licence information;",
                "licensed domain;",
                "delivery records; and",
                "support correspondence.",
            ],
        },
        {
            type: "text",
            description:
                "We may retain evidence that a Delivery Email was sent, delivered, rejected or accessed where reasonably necessary for Order fulfilment, fraud prevention and dispute resolution.",
        },
        {
            type: "text",
            title: "26. Delivery Delays Outside Our Control",
            description:
                "We are not responsible for delays caused solely by circumstances outside our reasonable control, including:",
            bullets: [
                "Payment Provider outages;",
                "email service failures;",
                "internet or hosting outages;",
                "cyberattacks;",
                "widespread infrastructure failures;",
                "government restrictions;",
                "severe technical incidents; or",
                "other events that could not reasonably be prevented.",
            ],
        },
        {
            type: "text",
            description:
                "Where such an event occurs, we will:",
            bullets: [
                "take reasonable steps to minimise the delay;",
                "resume Delivery as soon as reasonably possible;",
                "keep affected customers informed where practical; and",
                "provide cancellation or refund options where required by law or our Refund and Cancellation Policy.",
            ],
        },
        {
            type: "text",
            title: "27. Refunds",
            description:
                "Delivery-related refunds are governed by our Refund and Cancellation Policy.\n\nA refund may be available where:",
            bullets: [
                "the Product was not delivered;",
                "we cannot complete Delivery within a reasonable time;",
                "the wrong Product was delivered;",
                "the files are materially defective;",
                "Activation Credentials are invalid and cannot be corrected; or",
                "applicable law requires a refund.",
            ],
        },
        {
            type: "text",
            description:
                "A refund is not normally available solely because:",
            bullets: [
                "you failed to check your spam folder;",
                "you provided an incorrect email address but the Product can be resent;",
                "you did not download the Product after Delivery;",
                "you lack suitable software or technical knowledge;",
                "you lost your downloaded copy; or",
                "you changed your mind after valid Delivery.",
            ],
        },
        {
            type: "text",
            description:
                "Nothing in this section limits mandatory legal rights.",
        },
        {
            type: "text",
            title: "28. Effect of Refund or Chargeback",
            description:
                "If a full Product refund or successful chargeback is processed:",
            bullets: [
                "the Product Licence ends;",
                "the Download Link may be disabled;",
                "Activation Credentials may be cancelled;",
                "you must stop using the Product;",
                "you must delete downloaded and backup copies; and",
                "you must remove the Product from active websites.",
            ],
        },
        {
            type: "text",
            description:
                "Continued use after a refund may constitute breach of contract and infringement of intellectual property rights.",
        },
        {
            type: "text",
            title: "29. Liability",
            description:
                "Our liability concerning Orders, Digital Delivery and Products is governed by our Terms and Conditions.\n\nNothing in this Policy excludes or limits liability where doing so would be unlawful, including liability for:",
            bullets: [
                "fraud or fraudulent misrepresentation;",
                "death or personal injury caused by negligence;",
                "breach of mandatory consumer rights; or",
                "any other liability that cannot legally be excluded.",
            ],
        },
        {
            type: "text",
            title: "30. Changes to This Policy",
            description:
                "We may update this Policy to reflect changes in:",
            bullets: [
                "delivery methods;",
                "Website functionality;",
                "Product formats;",
                "security procedures;",
                "applicable law; or",
                "business operations.",
            ],
        },
        {
            type: "text",
            description:
                "The updated version will be published with a revised effective date.\n\nThe Policy in force when you place an Order will normally govern Delivery of that Order unless a change is required by law or gives you more favourable rights.",
        },
        {
            type: "text",
            title: "31. Governing Law and Disputes",
            description:
                "This Policy and any non-contractual obligations arising from it are governed by the laws of England and Wales.\n\nIf you are a Consumer, this choice of law does not deprive you of mandatory protections available under the law of the country in which you ordinarily reside.\n\nBefore beginning formal proceedings, contact info@earnerthemes.com with the relevant Order information and requested resolution. We will attempt to resolve the matter in good faith.",
        },
        {
            type: "text",
            title: "32. Contact Us",
            description: `Questions and Delivery issues may be sent to:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}`,
        },
    ],
};

export default deliveryPolicyEn;
