import {PageSchema} from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

const termsAndConditionsEn: PageSchema = {
    meta: {
        title: `Terms and Conditions – ${COMPANY_NAME}`,
        description:
            "Terms and Conditions governing accounts, Account Balance top-ups, orders, licences, delivery and refunds on EarnerThemes.",
        canonical: "/terms-and-conditions",
        ogImage: {
            title: `Terms and Conditions – ${COMPANY_NAME}`,
            description: "Terms and Conditions governing accounts, Account Balance top-ups, orders, licences, delivery and refunds on EarnerThemes.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Terms and Conditions",
            description: "Effective date: 23 July 2026",
        },
        {
            type: "text",
            title: "1. About These Terms",
            description: `These Terms and Conditions (“Terms”) govern your access to and use of the website located at www.earnerthemes.com (the “Website”), including the creation and use of an account, Account Balance top-ups, orders, purchases, delivery and use of digital website themes, templates and related digital content.\n\nThe Website is operated by:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}\n\nIn these Terms, “EarnerThemes”, “we”, “us” and “our” refer to SENIOR EARNER LTD. “You” and “your” refer to the person or organisation accessing the Website, creating an account or placing an order.\n\nPlease read these Terms carefully before using the Website or purchasing any Product. By creating an account, topping up your Account Balance, placing an order or otherwise confirming your acceptance of these Terms, you agree to be legally bound by them.\n\nIf you do not agree to these Terms, you must not place an order or use any part of the Website that requires acceptance of these Terms.`,
        },
        {
            type: "text",
            title: "2. Related Policies",
            description:
                "These Terms should be read together with the following policies, where applicable:",
            bullets: [
                "Digital Product Licence Agreement;",
                "Payment and Account Balance Policy;",
                "Refund and Cancellation Policy;",
                "Digital Delivery and Download Policy;",
                "Support Policy;",
                "Privacy Policy;",
                "Cookie Policy; and",
                "Intellectual Property and Takedown Policy.",
            ],
        },
        {
            type: "text",
            description:
                "These documents form part of the agreement between you and EarnerThemes. If there is a conflict between these Terms and a policy specifically governing a particular matter, the more specific policy will apply to that matter.",
        },
        {
            type: "text",
            title: "3. Definitions",
            description:
                "For the purposes of these Terms:\n\n“Account” means a registered user account created on the Website.\n\n“Account Balance” means store credit recorded in your Account and available to purchase eligible Products on the Website.\n\n“Author” means the creator, developer, publisher or relevant rights holder of a Product.\n\n“Business User” means a person or organisation using the Website wholly or mainly for purposes relating to a trade, business, profession or commercial activity.\n\n“Consumer” means an individual acting wholly or mainly outside their trade, business, craft or profession.\n\n“Digital Content” means data produced and supplied in digital form, including themes, templates, files, archives, documentation, updates and activation information.\n\n“Licence” means the limited permission granted to you to use a Product in accordance with the applicable Digital Product Licence Agreement and any Product-specific licence terms.\n\n“Order” means a request submitted through the Website to purchase a Product.\n\n“Product” means a digital website theme, template, design, layout, associated file, activation credential or other Digital Content made available through the Website.",
        },
        {
            type: "text",
            title: "4. Nature of the Marketplace",
            description: `EarnerThemes provides an online catalogue and distribution platform through which users can obtain licensed digital website themes, templates and related Products.\n\nSome Products are created and owned by third-party Authors. EarnerThemes makes such Products available under commercial, distribution or licensing arrangements with the relevant Authors or rights holders.\n\nUnless expressly stated otherwise on a Product page, your purchase contract is with SENIOR EARNER LTD. The relevant Author retains ownership of the intellectual property rights in the Product.\n\nPurchasing a Product does not transfer ownership of the Product, its source code, design, trademarks or other intellectual property to you. You receive only the rights expressly granted under the applicable Licence.`,
        },
        {
            type: "text",
            title: "5. Eligibility",
            description:
                "You must be at least 18 years old and legally capable of entering into a binding contract to create an Account, top up an Account Balance or place an Order.\n\nIf you use the Website on behalf of a company or another organisation, you confirm that you have authority to bind that organisation to these Terms.\n\nYou must not use the Website if applicable law prohibits you from receiving or using the Products or services offered through it.",
        },
        {
            type: "text",
            title: "6. Accounts",
            description:
                "Certain Website features, including Account Balance top-ups, purchases and access to order information, may require an Account.\n\nWhen creating or using an Account, you must:",
            bullets: [
                "provide accurate, complete and current information;",
                "maintain a valid email address;",
                "keep your login credentials confidential;",
                "promptly update information that changes;",
                "prevent unauthorised access to your Account; and",
                "notify us promptly if you suspect unauthorised access or a security breach.",
            ],
        },
        {
            type: "text",
            description:
                "You are responsible for activity conducted through your Account unless that activity results from a failure by us to use reasonable security measures.\n\nAccounts are personal to the registered user and must not be sold, transferred, shared or made available to another person without our written permission.\n\nWe may require reasonable verification information before processing an Order, changing Account information, restoring access or responding to a security concern.",
        },
        {
            type: "text",
            title: "7. Product Information",
            description:
                "We take reasonable care to ensure that Product descriptions, previews, prices, compatibility information and other material details are accurate.\n\nBefore placing an Order, you are responsible for reviewing:",
            bullets: [
                "the Product description and preview;",
                "supported platforms and software versions;",
                "technical and hosting requirements;",
                "included files and features;",
                "Licence restrictions;",
                "support and update information; and",
                "any third-party software or services required to use the Product.",
            ],
        },
        {
            type: "text",
            description:
                "Images, demonstrations and previews are provided to illustrate the Product. Minor visual differences may arise from browser settings, devices, software versions, plugins, content, configuration or customisation.\n\nA Product may require separately purchased services or software, including hosting, a domain name, WordPress, Shopify, plugins, applications or other third-party services. These are not included unless the Product description expressly states otherwise.\n\nIf a Product page contains a material error, please contact us before purchasing.",
        },
        {
            type: "text",
            title: "8. Prices and Taxes",
            description:
                "Prices are displayed in pounds sterling (GBP) unless another currency is expressly shown.\n\nThe price payable is the price displayed at checkout when you submit your Order. Where applicable, the checkout will identify any taxes, fees or other charges included in or added to the price.\n\nWe may change Product prices and Account Balance top-up options at any time. Price changes do not affect Orders already accepted by us.\n\nIf an obvious pricing or technical error affects an Order, we may contact you to offer the Product at the correct price or cancel the Order and restore or refund the amount paid.",
        },
        {
            type: "text",
            title: "9. Account Balance",
            description:
                "You may purchase Account Balance through the top-up options offered on the Website. Available options may include fixed and custom top-up amounts.\n\nAccount Balance:",
            bullets: [
                "may be used only to purchase eligible Products through the Website;",
                "is not a bank account, deposit or investment;",
                "does not earn interest;",
                "must not be sold or transferred to another user;",
                "cannot ordinarily be withdrawn or exchanged for cash, except where required by law or expressly permitted by our Refund and Cancellation Policy; and",
                "may be adjusted where necessary to correct an error, process an authorised refund or reverse a fraudulent or disputed transaction.",
            ],
        },
        {
            type: "text",
            description:
                "Any expiry or special condition applicable to promotional credit must be clearly disclosed when that credit is issued. Purchased Account Balance will not expire solely because of the passage of time unless an expiry condition was clearly disclosed before the top-up or is required by law.\n\nThe Payment and Account Balance Policy contains additional rules governing top-ups, deductions, corrections, refunds, payment disputes and Account closure.",
        },
        {
            type: "text",
            title: "10. Placing an Order",
            description:
                "Products may be purchased using an available Account Balance or another payment method offered at checkout.\n\nBy placing an Order, you confirm that:",
            bullets: [
                "the information provided is accurate;",
                "you are authorised to use the selected payment method or Account Balance;",
                "you have reviewed the Product description and technical requirements;",
                "the Product is suitable for your intended platform and use;",
                "you agree to the applicable Licence and policies; and",
                "you authorise us to deduct the stated amount.",
            ],
        },
        {
            type: "text",
            description:
                "An Order submitted through the Website is an offer to purchase the selected Product. An automated Order acknowledgement confirms that we have received your Order but does not necessarily mean that we have accepted it.\n\nA contract for the Product is formed when we accept the Order by sending the Product, download files, access instructions or activation information to your email address, or when we send a separate confirmation that the Order has been accepted.\n\nWe may decline or cancel an Order before acceptance where:",
            bullets: [
                "the Product is unavailable;",
                "payment cannot be authorised;",
                "additional verification is reasonably required;",
                "the Order or Account appears fraudulent or unlawful;",
                "the price or Product information contains an obvious error;",
                "fulfilling the Order would infringe third-party rights or applicable law; or",
                "you have materially breached these Terms.",
            ],
        },
        {
            type: "text",
            description:
                "If we cancel an Order after taking payment or deducting Account Balance, the corresponding amount will be refunded or restored, subject to any reasonable fraud or payment investigation permitted by law.",
        },
        {
            type: "text",
            title: "11. Digital Delivery",
            description:
                "Products are delivered electronically. No physical goods will be shipped.\n\nFollowing successful checkout and payment confirmation, a member of our team will contact you using the email address associated with your Order. The purchased Product and the relevant activation details or access instructions will be sent by email.\n\nWe aim to complete delivery within 24 hours after successful checkout and payment confirmation. If additional information or verification is required before delivery, we will contact you using the email address provided with the Order.\n\nYou are responsible for:",
            bullets: [
                "providing a complete and accurate email address;",
                "maintaining access to that email account;",
                "checking spam, junk and filtering folders;",
                "ensuring that messages and attachments from EarnerThemes can be received; and",
                "contacting us if delivery has not been received within 24 hours.",
            ],
        },
        {
            type: "text",
            description:
                "Delivery will normally be treated as completed when the email containing the Product, access link, activation information or other delivery instructions has been sent to the email address provided with the Order, provided that we have not received a delivery failure notification.\n\nThis does not affect your rights if the Product was not delivered or could not reasonably be accessed.\n\nYou must keep activation details, Licence keys and other access credentials secure. They must not be published, resold, shared or provided to another person except where expressly permitted by the applicable Licence.\n\nAdditional delivery rules are contained in the Digital Delivery and Download Policy.",
        },
        {
            type: "text",
            title: "12. Immediate Supply of Digital Content",
            description:
                "Where you purchase as a Consumer and ask us to provide Digital Content during an applicable statutory cancellation period, we may ask you to:",
            bullets: [
                "expressly request that supply begins before the cancellation period ends; and",
                "acknowledge that your ordinary right to cancel may be lost once supply of the Digital Content begins.",
            ],
        },
        {
            type: "text",
            description:
                "Where the required consent and acknowledgement have been obtained, your ordinary cancellation right may end when we begin supplying the Product by sending the files, access information or activation details.\n\nThis provision does not limit any statutory rights relating to Digital Content that is faulty, materially not as described or otherwise non-compliant with applicable law.",
        },
        {
            type: "text",
            title: "13. Product Licences",
            description:
                "Every purchase is subject to the Digital Product Licence Agreement and any Product-specific Licence terms displayed before purchase or included with the Product.\n\nUnless expressly stated otherwise, a Licence is:",
            bullets: [
                "limited;",
                "non-exclusive;",
                "non-transferable;",
                "granted for lawful use only; and",
                "restricted to the number of websites, stores, projects or end products specified for the relevant Product.",
            ],
        },
        {
            type: "text",
            description:
                "You must not:",
            bullets: [
                "resell, redistribute or sublicense the Product as a standalone product;",
                "share source files, archives, Licence keys or activation credentials;",
                "upload the Product to a public repository, file-sharing service or download directory;",
                "falsely claim ownership or authorship;",
                "remove copyright, trademark or attribution notices where their removal is prohibited;",
                "use the Product beyond the permitted number of websites or projects;",
                "use the Product to create a directly competing template or stock product; or",
                "use the Product in violation of law or third-party rights.",
            ],
        },
        {
            type: "text",
            description:
                "Different terms may apply to open-source components, third-party assets or software distributed under the GNU General Public Licence or another open-source licence. Where applicable, those terms will be identified in the Product files, documentation or Product-specific Licence information.",
        },
        {
            type: "text",
            title: "14. Updates and Availability",
            description:
                "Whether updates are included depends on the Product description, applicable Licence and Support Policy.\n\nUnless expressly promised for a defined period, we do not guarantee that:",
            bullets: [
                "every Product will receive future updates;",
                "a Product will remain compatible with every future version of WordPress, Shopify, a browser, plugin or other third-party platform;",
                "an Author will continue developing a Product indefinitely; or",
                "a Product will remain permanently available through the Website.",
            ],
        },
        {
            type: "text",
            description:
                "You should download and securely retain the Product files and documentation supplied to you.\n\nIf a Product is removed due to a legal, security or rights-related concern, we may suspend further access or activation where reasonably necessary. Any available remedy will be determined under applicable law and the Refund and Cancellation Policy.",
        },
        {
            type: "text",
            title: "15. Support",
            description:
                "Support relating to Accounts, Account Balance top-ups, Orders, delivery and access is provided by EarnerThemes.\n\nProduct-specific technical support is provided only to the extent described on the Product page or in the Support Policy.\n\nUnless expressly included, support does not include:",
            bullets: [
                "hosting or server administration;",
                "installation or deployment;",
                "website design or development services;",
                "customisation or modification;",
                "training in WordPress, Shopify or other third-party platforms;",
                "assistance with unrelated third-party products;",
                "recovery of a website damaged by third-party software or user modifications; or",
                "creation of new features.",
            ],
        },
        {
            type: "text",
            description:
                "We may request reasonable diagnostic information before investigating a technical issue.",
        },
        {
            type: "text",
            title: "16. Refunds and Cancellations",
            description:
                "Refunds and cancellations are governed by the Refund and Cancellation Policy and applicable law.\n\nBecause Products are digital and can be copied after delivery, a purchase will not normally qualify for a refund merely because:",
            bullets: [
                "you changed your mind;",
                "you purchased the wrong Product;",
                "you lack the technical knowledge required to use it;",
                "you do not have the required platform, software or hosting environment;",
                "you no longer need the Product; or",
                "the Product is incompatible with software or a version that was not listed as supported.",
            ],
        },
        {
            type: "text",
            description:
                "A refund may be considered where, for example:",
            bullets: [
                "the same Product or top-up was charged more than once;",
                "the Product was not delivered;",
                "the files are materially defective;",
                "the Product is materially different from its description; or",
                "a confirmed technical defect prevents normal use and cannot be remedied within a reasonable time.",
            ],
        },
        {
            type: "text",
            description:
                "Nothing in these Terms or the Refund and Cancellation Policy excludes rights that cannot legally be excluded.\n\nIf a Product refund is issued, the associated Licence and right to use the Product end. You must stop using the Product and delete all files, copies and activation information in your possession or control, unless applicable law requires otherwise.",
        },
        {
            type: "text",
            title: "17. Payment Disputes and Chargebacks",
            description:
                "If you believe a payment was unauthorised or incorrect, please contact us before initiating a chargeback so that we have an opportunity to investigate and resolve the issue.\n\nWe may suspend the affected Account, Account Balance or Product access while a payment dispute, reversal, fraud investigation or chargeback is pending.\n\nSubmitting a knowingly false, misleading or abusive payment dispute may constitute a material breach of these Terms.\n\nNothing in this section prevents you from exercising lawful rights through your bank, card provider, payment provider or applicable consumer protection procedure.",
        },
        {
            type: "text",
            title: "18. Acceptable Use",
            description:
                "You must not use the Website, an Account or a Product to:",
            bullets: [
                "engage in unlawful, fraudulent or deceptive activity;",
                "infringe intellectual property, privacy or other rights;",
                "distribute malware, malicious code or harmful material;",
                "obtain unauthorised access to systems, Accounts or data;",
                "interfere with the Website’s security or operation;",
                "scrape, harvest or systematically extract Website data without permission;",
                "circumvent Licence restrictions or activation controls;",
                "share or commercially exploit another user’s Account;",
                "manipulate payments, Account Balance, reviews or Website functionality;",
                "impersonate another person or misrepresent your affiliation; or",
                "assist another person in carrying out any prohibited activity.",
            ],
        },
        {
            type: "text",
            description:
                "We may take reasonable technical and legal measures to prevent abuse, fraud, unauthorised distribution and Licence violations.",
        },
        {
            type: "text",
            title: "19. Intellectual Property",
            description: `The Website, including its branding, design, text, graphics, software, databases and original content, is owned by or licensed to SENIOR EARNER LTD and is protected by intellectual property laws.\n\nProducts and Product-related trademarks may be owned by their respective Authors or other rights holders. Their appearance on the Website does not transfer ownership to EarnerThemes or to the purchaser.\n\nYou may use Website content and Products only as expressly permitted by these Terms and the applicable Licence.\n\nIf you believe that material available through the Website infringes your intellectual property rights, contact info@earnerthemes.com with:`,
            bullets: [
                "identification of the protected work;",
                "identification and location of the allegedly infringing material;",
                "your name and contact information;",
                "evidence of your ownership or authority to act;",
                "an explanation of the alleged infringement; and",
                "a statement confirming that the information supplied is accurate and submitted in good faith.",
            ],
        },
        {
            type: "text",
            description:
                "We may remove or restrict access to disputed material while investigating a credible complaint.",
        },
        {
            type: "text",
            title: "20. Third-Party Platforms and Services",
            description:
                "Products may be designed to operate with third-party platforms such as WordPress, WooCommerce, Shopify, Elementor or other software and services.\n\nThose platforms are operated independently and are subject to their own terms, licences, technical requirements and privacy practices.\n\nUnless expressly stated, EarnerThemes is not affiliated with, endorsed by or responsible for any third-party platform. We are not responsible for changes made by third parties that are outside our reasonable control, although your statutory rights relating to the Product remain unaffected.",
        },
        {
            type: "text",
            title: "21. Suspension and Termination",
            description:
                "We may suspend or restrict an Account, Order, Account Balance or access to Website services where reasonably necessary to:",
            bullets: [
                "protect the Website or other users;",
                "investigate suspected fraud or unauthorised access;",
                "respond to a payment dispute;",
                "comply with law or a lawful authority request;",
                "protect intellectual property rights; or",
                "address a material breach of these Terms.",
            ],
        },
        {
            type: "text",
            description:
                "Where reasonably possible, we will explain the reason and provide an opportunity to resolve the issue.\n\nWe may terminate an Account for a serious or repeated breach. Termination does not remove any payment obligation, Licence restriction or liability that arose before termination.\n\nThe treatment of unused purchased Account Balance following Account closure will be determined under the Payment and Account Balance Policy, the reason for closure and applicable law.",
        },
        {
            type: "text",
            title: "22. Website Availability",
            description:
                "We aim to keep the Website available and secure but do not guarantee uninterrupted or error-free operation.\n\nWe may temporarily suspend or restrict the Website for maintenance, security, updates, capacity management or circumstances outside our reasonable control.\n\nWe are not responsible for a delay or failure caused by events outside our reasonable control, provided that we take reasonable steps to reduce the effect of the delay and resume performance.",
        },
        {
            type: "text",
            title: "23. Our Responsibility to Consumers",
            description:
                "If you are a Consumer, we are responsible for losses that are a foreseeable result of our breach of these Terms or failure to use reasonable care and skill.\n\nWe are not responsible for losses that were not reasonably foreseeable when the contract was formed.\n\nProducts are supplied for personal and permitted professional project use. If you use a Product for a commercial purpose, we are not responsible to you as a Consumer for business losses, including loss of profit, revenue, business opportunity, goodwill or anticipated savings.\n\nNothing in these Terms excludes or limits liability where doing so would be unlawful, including liability for:",
            bullets: [
                "death or personal injury caused by negligence;",
                "fraud or fraudulent misrepresentation;",
                "breach of rights that cannot legally be excluded; or",
                "defective Digital Content where applicable law provides a mandatory remedy.",
            ],
        },
        {
            type: "text",
            title: "24. Our Responsibility to Business Users",
            description:
                "If you are a Business User, to the fullest extent permitted by law:",
            bullets: [
                "the Website and Products are provided subject to the express terms stated in these Terms, the Product description and the applicable Licence;",
                "implied warranties and conditions are excluded where legally permitted;",
                "we are not liable for indirect or consequential loss;",
                "we are not liable for loss of profit, revenue, contracts, business opportunity, goodwill, anticipated savings or data; and",
                "our total aggregate liability arising from a Product or Order will not exceed the amount paid to us for the Product or Order giving rise to the claim.",
            ],
        },
        {
            type: "text",
            description:
                "Nothing in this section excludes or limits liability for death or personal injury caused by negligence, fraud, fraudulent misrepresentation or any other liability that cannot lawfully be excluded.",
        },
        {
            type: "text",
            title: "25. Business User Indemnity",
            description: `If you are a Business User, you agree to indemnify SENIOR EARNER LTD against reasonable losses, liabilities, damages and costs arising directly from:`,
            bullets: [
                "your unlawful use or redistribution of a Product;",
                "your material breach of the applicable Licence;",
                "content or materials you add to a Product that infringe third-party rights; or",
                "your fraudulent or wilful misuse of the Website.",
            ],
        },
        {
            type: "text",
            description:
                "This indemnity does not apply to the extent that a loss was caused by our breach, negligence or unlawful conduct.",
        },
        {
            type: "text",
            title: "26. Privacy and Cookies",
            description:
                "We process personal data in accordance with our Privacy Policy.\n\nOur Cookie Policy explains how we use cookies and similar technologies and how you can manage your preferences.\n\nYou are responsible for reviewing those policies before creating an Account or placing an Order.",
        },
        {
            type: "text",
            title: "27. Electronic Communications",
            description:
                "You agree that we may send transactional and administrative communications electronically, including:",
            bullets: [
                "Account notices;",
                "Order acknowledgements;",
                "delivery emails;",
                "activation information;",
                "payment and refund notices;",
                "security alerts;",
                "support correspondence; and",
                "notices concerning these Terms or related policies.",
            ],
        },
        {
            type: "text",
            description:
                "Transactional communications are not marketing messages and may be necessary to provide the services you request.\n\nMarketing communications will be sent only where permitted by law. You may unsubscribe from marketing without affecting essential Order or Account communications.",
        },
        {
            type: "text",
            title: "28. Changes to These Terms",
            description:
                "We may update these Terms to reflect changes in law, Website functionality, Products, payment methods or business practices.\n\nThe updated version will be published on the Website with a revised effective date.\n\nMaterial changes will apply prospectively. Terms accepted for an existing Order will continue to govern that Order unless a change is required by law or you expressly agree otherwise.\n\nYour continued use of the Website after updated Terms take effect constitutes acceptance only where such acceptance is legally valid. We may require you to confirm acceptance before placing another Order.",
        },
        {
            type: "text",
            title: "29. Governing Law and Disputes",
            description:
                "These Terms and any non-contractual obligations arising from them are governed by the laws of England and Wales.\n\nIf you are a Consumer, this choice of law does not deprive you of mandatory protections available under the law of the country in which you ordinarily reside.\n\nBefore starting formal proceedings, you should contact us at info@earnerthemes.com and provide sufficient information about the issue, the relevant Order and the resolution requested. We will attempt to resolve the complaint in good faith.\n\nIf you are a Business User, the courts of England and Wales will have exclusive jurisdiction.\n\nIf you are a Consumer, the courts of England and Wales will have non-exclusive jurisdiction. You may also have the right to bring proceedings in the courts of the part of the United Kingdom or other country in which you reside, where applicable law permits.",
        },
        {
            type: "text",
            title: "30. General Provisions",
        },
        {
            type: "text",
            title: "30.1 Assignment",
            description:
                "You may not transfer your rights or obligations under these Terms without our written consent.\n\nWe may transfer our rights or obligations as part of a business transfer, restructuring or sale, provided that doing so does not reduce your mandatory legal rights.",
        },
        {
            type: "text",
            title: "30.2 Severability",
            description:
                "If any provision is found to be unlawful or unenforceable, that provision will be adjusted or removed only to the minimum extent necessary. The remaining provisions will continue in effect.",
        },
        {
            type: "text",
            title: "30.3 No Waiver",
            description:
                "A delay or failure to enforce a provision does not waive the right to enforce it later.",
        },
        {
            type: "text",
            title: "30.4 Entire Agreement",
            description: `These Terms and the policies incorporated into them constitute the agreement between you and SENIOR EARNER LTD concerning the Website, Account Balance and Products.\n\nIf you are a Consumer, this provision does not exclude liability for statements or representations that cannot lawfully be excluded.`,
        },
        {
            type: "text",
            title: "30.5 No Third-Party Rights",
            description: `Except where the applicable Licence expressly grants enforceable rights to an Author or rights holder, no person other than you and SENIOR EARNER LTD has the right to enforce these Terms.`,
        },
        {
            type: "text",
            title: "31. Contact Us",
            description: `Questions, complaints and legal notices concerning these Terms may be sent to:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}`,
        },
    ],
};

export default termsAndConditionsEn;
