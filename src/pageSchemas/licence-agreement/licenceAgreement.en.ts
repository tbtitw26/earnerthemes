import {PageSchema} from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

const licenceAgreementEn: PageSchema = {
    meta: {
        title: `Digital Product Licence Agreement – ${COMPANY_NAME}`,
        description:
            "Licence terms describing how EarnerThemes digital themes and templates may be used, modified and deployed.",
        canonical: "/licence-agreement",
        ogImage: {
            title: `Digital Product Licence Agreement – ${COMPANY_NAME}`,
            description: "Licence terms describing how EarnerThemes digital themes and templates may be used, modified and deployed.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Digital Product Licence Agreement",
            description: "Effective date: 23 July 2026",
        },
        {
            type: "text",
            title: "1. About This Agreement",
            description: `This Digital Product Licence Agreement (“Licence Agreement”) governs your use of website themes, templates, layouts, files, activation credentials, documentation, updates and other digital products obtained through www.earnerthemes.com.\n\nThis Licence Agreement is entered into between you and:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}\n\nIn this Licence Agreement, “EarnerThemes”, “we”, “us” and “our” refer to SENIOR EARNER LTD. “You”, “your” and “Licensee” refer to the individual or organisation purchasing, downloading, activating or using a Product.\n\nBy purchasing, downloading, activating, installing or using a Product, you confirm that you have read and agree to this Licence Agreement.\n\nIf you do not agree to this Licence Agreement, you must not download, install, activate or use the Product.`,
        },
        {
            type: "text",
            title: "2. Relationship With Other Terms",
            description:
                "This Licence Agreement should be read together with:",
            bullets: [
                "our Terms and Conditions;",
                "the relevant Product description;",
                "any Product-specific licence terms;",
                "our Refund and Cancellation Policy;",
                "our Digital Delivery and Download Policy; and",
                "our Support Policy.",
            ],
        },
        {
            type: "text",
            description:
                "If a Product includes open-source software, third-party components or Product-specific licence terms, those terms may apply to the relevant parts of the Product.\n\nIn the event of a conflict, the following order of priority applies:",
            bullets: [
                "any mandatory rights or obligations under applicable law;",
                "applicable open-source or third-party licence terms for the relevant component;",
                "Product-specific licence terms disclosed before purchase or included with the Product;",
                "this Licence Agreement; and",
                "our general Terms and Conditions.",
            ],
        },
        {
            type: "text",
            title: "3. Definitions",
            description:
                "For the purposes of this Licence Agreement:\n\n“Activation Credentials” means any Licence key, activation code, token, login information, registration information or other credential supplied for the installation, activation or use of a Product.\n\n“Author” means the creator, developer, publisher or relevant rights holder of a Product.\n\n“Client” means a person or organisation for whom you create a completed website or other permitted End Product.\n\n“End Product” means a completed website, online store or other final project created using a Product and incorporating sufficient configuration, content or customisation to function as a finished project.\n\n“Licence” means the limited permission to use a Product granted under this Licence Agreement.\n\n“Product” means a website theme, template, layout, source file, archive, documentation, activation information, update or related Digital Content obtained through EarnerThemes.\n\n“Product-Specific Terms” means additional licence terms displayed on the Product page, at checkout, in the Product documentation or within the delivered files.\n\n“Production Website” means a live website, online store or other publicly accessible End Product.\n\n“Staging Website” means a non-public development, testing or staging copy used solely in connection with the same Production Website.",
        },
        {
            type: "text",
            title: "4. Ownership of Products",
            description:
                "Products made available through EarnerThemes may be created and owned by third-party Authors.\n\nEarnerThemes distributes or licenses such Products under commercial arrangements with the relevant Authors or rights holders. We grant only those rights that we are authorised to grant.\n\nThe Product is licensed, not sold. Your purchase does not transfer to you:",
            bullets: [
                "ownership of the Product;",
                "copyright or other intellectual property rights;",
                "ownership of the Author’s brand or trademarks;",
                "the right to distribute the Product;",
                "the right to claim authorship; or",
                "any right not expressly granted under this Licence Agreement.",
            ],
        },
        {
            type: "text",
            description:
                "All rights not expressly granted to you remain reserved by EarnerThemes, the Author or the applicable rights holder.",
        },
        {
            type: "text",
            title: "5. Standard Licence Grant",
            description:
                "Unless the Product page or Product-Specific Terms expressly provide otherwise, each purchase grants you an ongoing, non-exclusive, non-transferable and worldwide Licence to:",
            bullets: [
                "download and install one copy of the Product;",
                "use the Product to create one End Product;",
                "operate that End Product as one Production Website;",
                "use the End Product for personal or commercial purposes;",
                "modify and customise the Product for that End Product;",
                "create a Staging Website for development and testing of the same End Product;",
                "create reasonable backup copies for security and recovery purposes; and",
                "create the End Product for yourself or for one Client.",
            ],
        },
        {
            type: "text",
            description:
                "The Licence remains valid unless:",
            bullets: [
                "a fixed Licence period was clearly disclosed before purchase;",
                "the Licence is terminated under this Licence Agreement;",
                "the purchase is refunded or reversed; or",
                "applicable Product-Specific Terms provide otherwise.",
            ],
        },
        {
            type: "text",
            description:
                "A Product purchase does not automatically include unlimited websites, domains, stores, projects or Clients.\n\nA separate Licence is required for each additional Production Website or separate End Product unless the Product page expressly offers a multi-site, extended, agency or other broader Licence.",
        },
        {
            type: "text",
            title: "6. Personal and Commercial Use",
            description:
                "You may use a properly licensed Product:",
            bullets: [
                "for a personal website;",
                "for your own business website or online store;",
                "for a commercial website;",
                "for a website that sells goods or services;",
                "for a website that generates advertising or subscription revenue;",
                "as part of professional services provided to one Client; or",
                "for another lawful commercial purpose consistent with the Product description.",
            ],
        },
        {
            type: "text",
            description:
                "Commercial use of a completed End Product does not permit you to resell, redistribute or commercially exploit the Product itself as a theme, template, source file or competing digital product.",
        },
        {
            type: "text",
            title: "7. Client Projects",
            description:
                "You may use a Product to create one End Product for one Client, provided that:",
            bullets: [
                "the Product is used for only that Client’s End Product;",
                "the Client receives only the rights necessary to use the completed End Product;",
                "the Product is not supplied to the Client for independent reuse or redistribution;",
                "you do not retain the right to use the same Licence for another Client or separate End Product;",
                "the Client agrees to comply with the applicable Licence restrictions; and",
                "you take reasonable steps to protect the Product files and Activation Credentials.",
            ],
        },
        {
            type: "text",
            description:
                "You may charge a Client for your design, development, installation, configuration or customisation services.\n\nOnce the End Product is delivered to the Client, the Licence may be treated as assigned to that Client for continued use of that specific End Product. You must then obtain another Licence before using the Product for a separate project.\n\nIf you require the Product for multiple Clients, you must purchase a separate Licence for each Client or obtain an agency, multi-use or other suitable Licence where available.",
        },
        {
            type: "text",
            title: "8. Staging and Development Use",
            description:
                "You may maintain one or more reasonable development or staging copies solely for building, testing, maintaining or updating the same licensed Production Website.\n\nA Staging Website must not:",
            bullets: [
                "operate as a separate public website;",
                "serve a separate business, Client or commercial project;",
                "be used to avoid purchasing another Licence; or",
                "remain active as an independent Production Website.",
            ],
        },
        {
            type: "text",
            description:
                "When a staging copy is no longer required, you should remove or deactivate it.\n\nIf technical activation limits prevent a legitimate staging installation, contact us at info@earnerthemes.com.",
        },
        {
            type: "text",
            title: "9. Permitted Modifications",
            description:
                "You may modify the Product as reasonably necessary to create the licensed End Product, including changes to:",
            bullets: [
                "colours;",
                "typography;",
                "page layouts;",
                "settings;",
                "configuration;",
                "website content;",
                "stylesheets;",
                "images;",
                "template sections; and",
                "other customisable elements.",
            ],
        },
        {
            type: "text",
            description:
                "You may combine the Product with your own content and other properly licensed materials.\n\nModifying a Product does not transfer ownership of the original Product to you and does not allow you to sell, redistribute or license the modified Product as a standalone theme, template or stock item.\n\nYour rights in original content or code created independently by you remain yours. Rights in the underlying Product remain with the relevant rights holder.",
        },
        {
            type: "text",
            title: "10. Prohibited Uses",
            description:
                "Unless expressly permitted by Product-Specific Terms, you must not:",
            bullets: [
                "resell, redistribute, sublicense, rent, lease or share the Product;",
                "provide the Product as a standalone download;",
                "upload Product files to a public repository, file-sharing platform, marketplace or download directory;",
                "share Activation Credentials with another person or organisation;",
                "use one Licence for multiple Production Websites or separate End Products;",
                "use one Licence for multiple Clients;",
                "include the Product in another theme, template, plugin, stock item or product offered for sale or distribution;",
                "create a competing template or digital product substantially derived from the Product;",
                "distribute the Product as part of a bundle, membership, subscription or resource library;",
                "use the Product in a website builder, “build your own” platform, software-as-a-service product or on-demand customisation service that allows users to access or extract the Product;",
                "allow an End Product user to extract and reuse the Product separately;",
                "sell or transfer an unused Licence or Account;",
                "bypass, disable, alter or interfere with activation or Licence-verification controls;",
                "remove copyright, trademark, attribution or proprietary notices where their removal is prohibited;",
                "falsely claim that you created or own the Product;",
                "use the Product in violation of intellectual property, privacy or other third-party rights;",
                "use the Product for unlawful, fraudulent, malicious or deceptive purposes;",
                "introduce malicious code into the Product before distributing an End Product; or",
                "assist another person in any prohibited use.",
            ],
        },
        {
            type: "text",
            description:
                "Nothing in this section restricts rights that you may have under a mandatory open-source licence applicable to a particular component.",
        },
        {
            type: "text",
            title: "11. Activation Credentials",
            description:
                "Where Activation Credentials are provided, they are issued solely for the Product and Licence purchased.\n\nYou must:",
            bullets: [
                "keep Activation Credentials confidential and secure;",
                "use them only for permitted installations;",
                "prevent unauthorised copying or disclosure;",
                "notify us if they are lost, compromised or used without permission; and",
                "deactivate them from an old installation where reasonably required before activating the Product on a replacement domain.",
            ],
        },
        {
            type: "text",
            description:
                "Activation Credentials must not be sold, published, shared or included in files provided for public download.\n\nWe may suspend or replace Activation Credentials where we reasonably believe that they:",
            bullets: [
                "have been compromised;",
                "are being shared or resold;",
                "are being used for unauthorised installations;",
                "are associated with a refunded or reversed transaction; or",
                "are being used in material breach of this Licence Agreement.",
            ],
        },
        {
            type: "text",
            description:
                "Where legitimate activation fails, contact info@earnerthemes.com. We may request the Order number, licensed domain and reasonable technical information required to investigate.",
        },
        {
            type: "text",
            title: "12. Changing a Licensed Domain",
            description:
                "You may move the same licensed End Product to a replacement domain, provided that:",
            bullets: [
                "the Product is no longer used on the previous Production Website;",
                "the previous activation is removed or deactivated where technically possible;",
                "the replacement domain is used for the same End Product or project; and",
                "the change is not used to operate multiple Production Websites under one Licence.",
            ],
        },
        {
            type: "text",
            description:
                "A separate Licence is required if both the original and replacement websites remain live as independent End Products.\n\nWe may require reasonable verification before resetting or transferring an activation.",
        },
        {
            type: "text",
            title: "13. Updates",
            description:
                "The availability and duration of Product updates depend on:",
            bullets: [
                "the Product description;",
                "Product-Specific Terms;",
                "the Author’s release schedule;",
                "the applicable support or update period; and",
                "continued availability of the Product.",
            ],
        },
        {
            type: "text",
            description:
                "Unless expressly stated otherwise, purchasing a Product does not guarantee:",
            bullets: [
                "lifetime updates;",
                "updates for every future platform or software version;",
                "the addition of new features;",
                "permanent compatibility with third-party software; or",
                "indefinite operation of an external activation or update service.",
            ],
        },
        {
            type: "text",
            description:
                "An update does not grant an additional Licence. Updated files remain subject to this Licence Agreement.\n\nYou should maintain reasonable backups of the Product and the licensed End Product.",
        },
        {
            type: "text",
            title: "14. Support",
            description:
                "A Licence does not include unlimited technical, installation or customisation services.\n\nAvailable support is governed by the Product description and our Support Policy.\n\nUnless expressly included, the Licence does not entitle you to:",
            bullets: [
                "installation services;",
                "website setup;",
                "hosting or server configuration;",
                "custom development;",
                "design modifications;",
                "training;",
                "support for unrelated third-party software;",
                "recovery from user modifications; or",
                "development of new features.",
            ],
        },
        {
            type: "text",
            description:
                "The expiry of a support or update period does not automatically terminate your right to continue using the installed Product, unless a fixed-term Licence was clearly disclosed before purchase.",
        },
        {
            type: "text",
            title: "15. Third-Party Components and Assets",
            description:
                "A Product may include or reference third-party components, plugins, fonts, images, icons, libraries or other materials.\n\nSuch components may be governed by separate licence terms. You must comply with those terms.\n\nUnless expressly stated in the Product description or documentation:",
            bullets: [
                "demo images and preview content may not be included;",
                "premium third-party plugins may require separate activation or purchase;",
                "stock media may be provided for demonstration only;",
                "third-party services may require a separate account;",
                "hosting, domains and platform subscriptions are not included; and",
                "third-party trademarks remain the property of their respective owners.",
            ],
        },
        {
            type: "text",
            description:
                "You are responsible for checking the Product documentation before using third-party components in a public or commercial End Product.",
        },
        {
            type: "text",
            title: "16. Open-Source Components",
            description:
                "Certain Products, particularly WordPress themes and plugins, may contain components governed by the GNU General Public Licence or another open-source licence.\n\nWhere an open-source licence applies:",
            bullets: [
                "that licence governs the relevant component;",
                "nothing in this Licence Agreement reduces rights that must be granted under that licence;",
                "proprietary design elements, documentation, images, trademarks, Activation Credentials, support services and other components may remain subject to separate restrictions; and",
                "you remain responsible for complying with all applicable licence notices and attribution requirements.",
            ],
        },
        {
            type: "text",
            description:
                "The presence of an open-source component does not necessarily mean that every element of the Product is distributed under the same open-source licence.",
        },
        {
            type: "text",
            title: "17. Copies and Storage",
            description:
                "You may make reasonable copies of the Product for:",
            bullets: [
                "installation on the licensed Production Website;",
                "development and staging of the same End Product;",
                "secure internal backup; and",
                "disaster recovery.",
            ],
        },
        {
            type: "text",
            description:
                "Backup copies must remain under your control and must not be shared, published or used for another project.\n\nIf employees or contractors require access to the Product to work on the licensed End Product, you must ensure that:",
            bullets: [
                "access is limited to those who reasonably need it;",
                "they use the Product only for the licensed End Product;",
                "they do not retain or reuse the Product for another project; and",
                "they comply with confidentiality and Licence restrictions.",
            ],
        },
        {
            type: "text",
            description:
                "You remain responsible for use of the Product by persons to whom you provide access.",
        },
        {
            type: "text",
            title: "18. Licence Verification",
            description:
                "We may use reasonable technical measures to verify Licence validity and prevent unauthorised distribution.\n\nWhere reasonably necessary, we may request:",
            bullets: [
                "your Order number;",
                "the email address associated with the purchase;",
                "the licensed domain;",
                "information about active installations; or",
                "other evidence reasonably required to verify authorised use.",
            ],
        },
        {
            type: "text",
            description:
                "Licence verification will be conducted in accordance with our Privacy Policy and applicable data protection law.\n\nYou must not knowingly provide false verification information or interfere with reasonable Licence-verification measures.",
        },
        {
            type: "text",
            title: "19. Product Removal",
            description:
                "A Product may be removed or restricted where:",
            bullets: [
                "an Author ends distribution;",
                "rights to distribute the Product expire or change;",
                "the Product presents a material security concern;",
                "an intellectual property complaint is received;",
                "continued distribution may violate law or third-party rights; or",
                "technical or commercial circumstances require removal.",
            ],
        },
        {
            type: "text",
            description:
                "You should download and retain the delivered Product files.\n\nRemoval from the Website does not automatically terminate a valid existing Licence unless continued use is unlawful, the Licence is separately terminated or Product-Specific Terms provide otherwise.\n\nIf removal materially prevents you from receiving a Product already purchased, available remedies will be determined under our Refund and Cancellation Policy and applicable law.",
        },
        {
            type: "text",
            title: "20. Refunds and Licence Revocation",
            description:
                "If a full refund is issued for a Product:",
            bullets: [
                "the Licence ends;",
                "Activation Credentials may be disabled;",
                "you must stop using the Product;",
                "you must remove the Product from active websites and systems;",
                "you must delete all copies under your control; and",
                "you must ensure that any Client or contractor also stops using and deletes the Product.",
            ],
        },
        {
            type: "text",
            description:
                "A payment reversal or successful chargeback may have the same effect as a refund unless the payment dispute is resolved in our favour.\n\nIf only part of an Order is refunded, the Licence ends only for the Product or Licence covered by that refund.\n\nNothing in this section limits rights or remedies that cannot lawfully be excluded.",
        },
        {
            type: "text",
            title: "21. Licence Termination",
            description:
                "This Licence Agreement remains in effect until the Licence expires under disclosed Product-Specific Terms or is terminated.\n\nWe may terminate or suspend a Licence if you materially breach this Licence Agreement, including by:",
            bullets: [
                "redistributing or reselling the Product;",
                "sharing Activation Credentials;",
                "using the Product on unauthorised websites;",
                "bypassing activation restrictions;",
                "infringing intellectual property rights;",
                "engaging in fraud; or",
                "failing to remedy another material breach after reasonable notice.",
            ],
        },
        {
            type: "text",
            description:
                "Where a breach can reasonably be corrected, we may provide an opportunity to remedy it before termination. We may terminate immediately in cases of intentional redistribution, fraud, malicious use or serious infringement.\n\nUpon termination, you must:",
            bullets: [
                "stop using the Product;",
                "remove it from all unauthorised installations;",
                "delete copies that you are no longer entitled to retain;",
                "stop using the Activation Credentials; and",
                "comply with reasonable instructions necessary to protect the relevant rights holder.",
            ],
        },
        {
            type: "text",
            description:
                "Termination does not prevent us or the Author from pursuing remedies available for infringement or other unlawful use.",
        },
        {
            type: "text",
            title: "22. Product Warranties",
            description:
                "We warrant that, at the time of delivery, the Product will materially correspond with its description and that we are authorised to provide the Licence described at the time of purchase.\n\nWe do not warrant that a Product will:",
            bullets: [
                "meet every individual requirement;",
                "operate with software or versions not listed as supported;",
                "work with every third-party plugin, application or hosting environment;",
                "remain compatible with future third-party updates indefinitely;",
                "be free from every minor error; or",
                "provide a particular commercial result, level of traffic or conversion rate.",
            ],
        },
        {
            type: "text",
            description:
                "Nothing in this Licence Agreement excludes statutory rights relating to Digital Content that is faulty, materially not as described or otherwise non-compliant with applicable law.",
        },
        {
            type: "text",
            title: "23. Limitation of Liability",
            description:
                "Liability relating to the Website, Products and Licences is governed by the limitation of liability provisions in our Terms and Conditions.\n\nNothing in this Licence Agreement excludes or limits liability where doing so would be unlawful, including liability for:",
            bullets: [
                "death or personal injury caused by negligence;",
                "fraud or fraudulent misrepresentation;",
                "breach of mandatory consumer rights; or",
                "any other liability that cannot legally be excluded.",
            ],
        },
        {
            type: "text",
            title: "24. Intellectual Property Complaints",
            description:
                "If you believe that a Product infringes your intellectual property rights, contact us at info@earnerthemes.com and provide:",
            bullets: [
                "identification of the protected work;",
                "identification of the Product or material concerned;",
                "the relevant Website URL;",
                "evidence of ownership or authority to act;",
                "your contact information;",
                "an explanation of the alleged infringement; and",
                "confirmation that the complaint is accurate and made in good faith.",
            ],
        },
        {
            type: "text",
            description:
                "We may temporarily suspend a Product or Activation Credentials while investigating a credible complaint.\n\nFurther information is provided in our Intellectual Property and Takedown Policy.",
        },
        {
            type: "text",
            title: "25. Changes to This Licence Agreement",
            description:
                "We may update this Licence Agreement to reflect changes in law, technology, Product distribution or our services.\n\nAn updated Licence Agreement will apply to purchases made after its effective date.\n\nWe will not retroactively remove material Licence rights already granted for a completed purchase unless:",
            bullets: [
                "the change is required by law;",
                "the change is necessary to address infringement, fraud or a security threat;",
                "the applicable Author or rights holder lawfully requires the change; or",
                "you agree to the change.",
            ],
        },
        {
            type: "text",
            description:
                "Product updates may require acceptance of updated terms where new features, components or services are introduced.",
        },
        {
            type: "text",
            title: "26. Governing Law and Jurisdiction",
            description:
                "This Licence Agreement and any non-contractual obligations arising from it are governed by the laws of England and Wales.\n\nIf you are a Consumer, this choice of law does not deprive you of mandatory protections available under the law of the country in which you ordinarily reside.\n\nIf you are a Business User, the courts of England and Wales have exclusive jurisdiction.\n\nIf you are a Consumer, the courts of England and Wales have non-exclusive jurisdiction, and you may have the right to bring proceedings in another competent court under applicable consumer law.",
        },
        {
            type: "text",
            title: "27. General Provisions",
        },
        {
            type: "text",
            title: "27.1 Severability",
            description:
                "If any provision is found to be unlawful or unenforceable, it will be adjusted or removed only to the minimum extent necessary. The remaining provisions will continue in effect.",
        },
        {
            type: "text",
            title: "27.2 No Waiver",
            description:
                "A delay or failure to enforce a provision does not waive the right to enforce it later.",
        },
        {
            type: "text",
            title: "27.3 Assignment",
            description:
                "You may transfer a Licence only to a Client as expressly permitted by this Licence Agreement or with our prior written approval.\n\nWe may transfer our rights or obligations as part of a business transfer, restructuring or sale, provided that your mandatory legal rights are not reduced.",
        },
        {
            type: "text",
            title: "27.4 Entire Agreement",
            description:
                "This Licence Agreement, the relevant Product description, Product-Specific Terms and incorporated policies constitute the agreement concerning your Licence to use the Product.",
        },
        {
            type: "text",
            title: "27.5 No Implied Rights",
            description:
                "No Licence or other right is granted by implication, waiver or estoppel. Any right not expressly granted remains reserved.",
        },
        {
            type: "text",
            title: "28. Contact Us",
            description: `Questions about Product licensing, activation or permitted use may be sent to:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}`,
        },
    ],
};

export default licenceAgreementEn;
