import {PageSchema} from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

const refundPolicyEn: PageSchema = {
    meta: {
        title: `Refund and Cancellation Policy – ${COMPANY_NAME}`,
        description:
            "Refund, cancellation and chargeback rules for digital products purchased on EarnerThemes.",
        canonical: "/refund-policy",
        ogImage: {
            title: `Refund and Cancellation Policy – ${COMPANY_NAME}`,
            description: "Refund, cancellation and chargeback rules for digital products purchased on EarnerThemes.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Refund and Cancellation Policy",
            description: "Effective date: 23 July 2026",
        },
        {
            type: "text",
            title: "1. About This Policy",
            description: `This Refund and Cancellation Policy (“Policy”) explains when an order, Account Balance top-up or digital Product purchased through www.earnerthemes.com may be cancelled, replaced, corrected or refunded.\n\nThe Website is operated by:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}\n\nIn this Policy, “EarnerThemes”, “we”, “us” and “our” refer to SENIOR EARNER LTD. “You” and “your” refer to the person or organisation making a purchase or requesting a cancellation or refund.\n\nThis Policy forms part of our Terms and Conditions.`,
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
                "Digital Delivery and Download Policy;",
                "Support Policy; and",
                "the description and Product-Specific Terms applicable to the purchased Product.",
            ],
        },
        {
            type: "text",
            description:
                "Nothing in this Policy excludes or limits rights that cannot lawfully be excluded, including mandatory rights relating to Digital Content that is faulty, materially not as described or otherwise non-compliant with applicable law.",
        },
        {
            type: "text",
            title: "3. Definitions",
            description:
                "For the purposes of this Policy:\n\n“Account Balance” means purchased store credit recorded in your Account and available to purchase eligible Products through the Website.\n\n“Activation Credentials” means a Licence key, activation code, token, login information or other credential supplied for the activation or use of a Product.\n\n“Business User” means a person or organisation purchasing wholly or mainly for purposes relating to a trade, business, profession or commercial activity.\n\n“Consumer” means an individual acting wholly or mainly outside their trade, business, craft or profession.\n\n“Digital Content” means data supplied in digital form, including themes, templates, files, archives, documentation and Activation Credentials.\n\n“Delivery” means sending the Product, download information, Activation Credentials or access instructions to the email address associated with the Order.\n\n“Licence” means the permission granted to use a Product under our Digital Product Licence Agreement.\n\n“Order” means a request submitted through the Website to purchase a Product.\n\n“Product” means a digital website theme, template, file, activation credential or related Digital Content offered through the Website.\n\n“Top-Up” means a payment made to add purchased store credit to an Account Balance.",
        },
        {
            type: "text",
            title: "4. Digital Nature of Products",
            description:
                "Products sold through EarnerThemes are digital and are delivered electronically. No physical goods are shipped.\n\nDigital files can be downloaded, stored and copied after Delivery. For this reason, change-of-mind cancellations and refunds may be restricted once supply of the Product has begun.\n\nHowever, the digital nature of a Product does not remove any mandatory legal rights you may have if the Product:",
            bullets: [
                "is faulty;",
                "is materially not as described;",
                "cannot be accessed or activated as promised;",
                "was not supplied with reasonable care and skill where a service is involved; or",
                "otherwise fails to meet applicable legal requirements.",
            ],
        },
        {
            type: "text",
            title: "5. Delivery Period",
            description:
                "Following successful checkout and payment confirmation, a member of our team will contact you and send the purchased Product and applicable Activation Credentials to the email address associated with your Order.\n\nDelivery will normally be completed within 24 hours after successful checkout and payment confirmation.\n\nIf you have not received the Product within 24 hours, you should:",
            bullets: [
                "check your spam, junk and filtered email folders;",
                "confirm that the email address provided with the Order is correct;",
                "check whether your email provider rejected or blocked attachments; and",
                "contact info@earnerthemes.com with your Order details.",
            ],
        },
        {
            type: "text",
            description:
                "Where Delivery has failed, we will first make reasonable efforts to resend the Product or provide an alternative secure delivery method.\n\nIf we cannot deliver the Product within a reasonable time after being notified, you may be entitled to cancel the Order and receive a refund.",
        },
        {
            type: "text",
            title: "6. Cancelling Before Delivery",
            description:
                "You may request cancellation of an Order before Delivery has begun by contacting info@earnerthemes.com as soon as possible.\n\nA cancellation request should include:",
            bullets: [
                "your name;",
                "the email address associated with the Order;",
                "the Order number;",
                "the Product purchased; and",
                "the reason for the request.",
            ],
        },
        {
            type: "text",
            description:
                "We will attempt to stop Delivery, but we cannot guarantee cancellation if the Product, files or Activation Credentials have already been prepared and sent.\n\nIf the Order is cancelled before Delivery begins:",
            bullets: [
                "any corresponding Account Balance deduction will be restored; or",
                "any external payment will be refunded to the original payment method.",
            ],
        },
        {
            type: "text",
            description:
                "This section does not limit any statutory cancellation rights available to Consumers.",
        },
        {
            type: "text",
            title: "7. Consumer Cancellation Rights",
            description:
                "If you are a Consumer, you may have a statutory right to cancel certain online contracts within 14 days.\n\nFor Digital Content supplied without a physical medium, that ordinary cancellation right may be lost once supply begins if, before Delivery:",
            bullets: [
                "you expressly requested that supply begin during the cancellation period; and",
                "you acknowledged that you would lose the ordinary right to cancel once supply began.",
            ],
        },
        {
            type: "text",
            description:
                "Where required, these confirmations must be provided through a separate affirmative action, such as an unticked checkout checkbox. We may retain a record of your consent and acknowledgement and confirm them in your Order communication.\n\nOnce the Product, files, access information or Activation Credentials have been sent following the required consent and acknowledgement, a change-of-mind cancellation may no longer be available.\n\nIf the required consent and acknowledgement were not properly obtained, any applicable statutory cancellation right will remain unaffected.\n\nThe loss of a change-of-mind cancellation right does not remove your legal rights if the Product is faulty, materially not as described or otherwise non-compliant.",
        },
        {
            type: "text",
            title: "8. Eligible Refund Circumstances",
            description:
                "Subject to the evidence provided, the Product description, the available remedy and applicable law, a full or partial refund may be available in the following circumstances.",
        },
        {
            type: "text",
            title: "8.1 Non-Delivery",
            description:
                "A refund may be available where:",
            bullets: [
                "payment was successfully completed;",
                "the Product was not delivered within 24 hours;",
                "you provided a valid email address;",
                "you notified us of the issue; and",
                "we could not complete Delivery within a reasonable time after notification.",
            ],
        },
        {
            type: "text",
            description:
                "A temporary email delay does not automatically create a right to a refund where the Product can be promptly resent.",
        },
        {
            type: "text",
            title: "8.2 Duplicate Purchase or Duplicate Charge",
            description:
                "A refund may be available where:",
            bullets: [
                "you were charged more than once for the same Order;",
                "the same Top-Up was processed more than once; or",
                "you accidentally purchased more than one identical Licence for the same End Product.",
            ],
        },
        {
            type: "text",
            description:
                "We may request the relevant Order and payment references before issuing a refund.",
        },
        {
            type: "text",
            title: "8.3 Material Defect",
            description:
                "A refund or other remedy may be available where a reproducible technical defect materially prevents the Product from operating in the manner described.\n\nBefore issuing a refund, we may offer to:",
            bullets: [
                "provide corrected files;",
                "repair the defect;",
                "provide an update;",
                "replace the affected Product; or",
                "supply reasonable instructions to resolve the issue.",
            ],
        },
        {
            type: "text",
            description:
                "A refund may be appropriate where repair or replacement is impossible, cannot be completed within a reasonable time or would cause significant inconvenience.",
        },
        {
            type: "text",
            title: "8.4 Product Materially Not as Described",
            description:
                "A remedy may be available where the delivered Product is materially different from the Product description, supported platform, included features or files presented at the time of purchase.\n\nMinor visual differences, subjective preferences or features not stated in the Product description do not make a Product materially not as described.",
        },
        {
            type: "text",
            title: "8.5 Invalid Activation Credentials",
            description:
                "A remedy may be available where Activation Credentials:",
            bullets: [
                "are invalid when first supplied;",
                "do not activate the Product as described;",
                "were previously used without your authorisation; or",
                "cannot be corrected or replaced within a reasonable time.",
            ],
        },
        {
            type: "text",
            description:
                "You must use the Activation Credentials only in accordance with the Digital Product Licence Agreement.\n\nActivation failure caused by unauthorised installations, prohibited sharing, unsupported software or breach of Licence restrictions will not normally qualify for a refund.",
        },
        {
            type: "text",
            title: "8.6 Incorrect Product Delivered",
            description:
                "If we deliver a Product different from the one stated in your accepted Order, we will provide the correct Product or issue an appropriate refund.\n\nYou must not use or distribute a Product delivered to you by mistake.",
        },
        {
            type: "text",
            title: "8.7 Product Unavailable",
            description:
                "If we accept an Order but cannot provide the Product because it has become unavailable, we will:",
            bullets: [
                "offer an appropriate replacement only with your agreement; or",
                "cancel the Order and refund or restore the amount paid.",
            ],
        },
        {
            type: "text",
            description:
                "You are not required to accept a substitute Product.",
        },
        {
            type: "text",
            title: "8.8 Unauthorised Payment",
            description:
                "If a payment or Top-Up was made without the payment method holder’s authorisation, we will investigate the report and cooperate with the relevant Payment Provider.\n\nA refund, reversal or other remedy will be provided where required by law or confirmed by the Payment Provider.",
        },
        {
            type: "text",
            title: "9. Circumstances That Normally Do Not Qualify",
            description:
                "Unless required by law, a refund will not normally be provided solely because:",
            bullets: [
                "you changed your mind after Delivery;",
                "you no longer need or want the Product;",
                "you purchased the wrong Product, platform version or Licence;",
                "you lack the knowledge or experience required to use the Product;",
                "you do not have suitable hosting, software, plugins or technical infrastructure;",
                "your hosting environment does not meet disclosed requirements;",
                "the Product is incompatible with a platform, plugin or software version not listed as supported;",
                "a desired feature was not included in the Product description;",
                "you expected installation, customisation or development services that were not included;",
                "you do not like the design after accessing the files;",
                "your Client rejected the Product;",
                "your project was cancelled or delayed;",
                "you found another Product at a lower price;",
                "you purchased a Product during or before a promotional sale;",
                "you failed to review the Product description, preview, Licence or requirements;",
                "you modified the Product and the modification caused the issue;",
                "a third-party service or plugin outside the Product caused the issue;",
                "you refused to provide information reasonably necessary to reproduce or investigate a reported defect;",
                "the Product works as described but does not produce a particular commercial result;",
                "an update or feature that was never promised is not released; or",
                "you breached the applicable Licence.",
            ],
        },
        {
            type: "text",
            description:
                "This list does not override mandatory legal rights.",
        },
        {
            type: "text",
            title: "10. Compatibility Issues",
            description:
                "Before purchasing, you are responsible for reviewing the Product’s:",
            bullets: [
                "supported platform;",
                "software version;",
                "hosting requirements;",
                "plugin requirements;",
                "browser requirements;",
                "technical documentation; and",
                "other compatibility information.",
            ],
        },
        {
            type: "text",
            description:
                "A compatibility issue may qualify for a remedy where:",
            bullets: [
                "the Product was advertised as compatible with your stated environment at the time of purchase;",
                "the incompatibility materially prevents normal use; and",
                "the issue cannot be corrected within a reasonable time.",
            ],
        },
        {
            type: "text",
            description:
                "A refund will not normally be available where the incompatibility concerns an environment or version that was not listed as supported.\n\nFuture changes made by WordPress, Shopify, WooCommerce, Elementor, a browser, a hosting provider or another third party do not automatically make the Product defective at the time it was supplied.",
        },
        {
            type: "text",
            title: "11. Technical Issue Resolution",
            description:
                "Before deciding a refund request involving a technical issue, we may attempt to verify and resolve the problem.\n\nYou may be asked to provide:",
            bullets: [
                "the Order number;",
                "the Product name and version;",
                "the relevant platform and software version;",
                "a description of the issue;",
                "steps required to reproduce it;",
                "screenshots or error messages; and",
                "other non-sensitive technical information reasonably necessary for investigation.",
            ],
        },
        {
            type: "text",
            description:
                "Do not send passwords, payment card details or other sensitive credentials by ordinary email.\n\nYou must provide reasonable cooperation. A refusal to provide information necessary to investigate the issue may prevent us from confirming eligibility for a discretionary refund.\n\nWe will not require unnecessary information or information unrelated to the reported problem.",
        },
        {
            type: "text",
            title: "12. Available Remedies",
            description:
                "Depending on the circumstances, we may provide one or more of the following:",
            bullets: [
                "re-delivery;",
                "corrected files;",
                "replacement Activation Credentials;",
                "repair or update;",
                "technical instructions;",
                "replacement with the same Product;",
                "replacement with another Product, with your agreement;",
                "restoration of Account Balance;",
                "partial refund;",
                "price reduction; or",
                "full refund.",
            ],
        },
        {
            type: "text",
            description:
                "Where applicable law gives you a particular remedy, we will provide that remedy as required.\n\nWe will not replace a Product with a different Product without your agreement.",
        },
        {
            type: "text",
            title: "13. Partial Refunds",
            description:
                "A partial refund or price reduction may be appropriate where:",
            bullets: [
                "only part of a Product is defective;",
                "only part of a bundle cannot be supplied;",
                "you retain and continue using the unaffected part;",
                "the issue reduces but does not eliminate the Product’s value; or",
                "another proportionate remedy is agreed.",
            ],
        },
        {
            type: "text",
            description:
                "The amount will reflect the affected part of the Product and the amount actually paid.\n\nIf a partial refund relates to a separable Product or Licence, your right to use the refunded part ends.",
        },
        {
            type: "text",
            title: "14. Bundles and Multiple-Product Orders",
            description:
                "Where an Order contains multiple Products, a refund may be limited to the affected Product.\n\nA full Order refund will not normally be issued where:",
            bullets: [
                "the Products are separately priced or usable; and",
                "the other Products were correctly delivered and remain usable.",
            ],
        },
        {
            type: "text",
            description:
                "If a bundle is sold as a single inseparable Product and a material defect affects the bundle as a whole, a broader remedy may be appropriate.",
        },
        {
            type: "text",
            title: "15. Discounted and Promotional Purchases",
            description:
                "Refund eligibility is not reduced merely because a Product was purchased at a discount.\n\nThe maximum refund will normally be the amount actually paid for the affected Product, including any amount paid through Account Balance.\n\nPromotional Credit, coupons and discounts do not have a cash refund value.\n\nWhere a refund causes the remaining Order to fall below the requirements of a promotion, we may recalculate the refund to reflect the valid price of the Products retained, provided that this was clearly disclosed and is lawful.",
        },
        {
            type: "text",
            title: "16. Account Balance Top-Up Refunds",
            description:
                "Top-Up refunds are governed primarily by the Payment and Account Balance Policy.\n\nA Top-Up refund may be available where:",
            bullets: [
                "the same Top-Up was charged more than once;",
                "payment was taken but no balance was credited;",
                "the wrong amount was charged because of a technical error;",
                "the payment was unauthorised;",
                "we cannot provide the purchased Account Balance; or",
                "applicable law gives you a cancellation or refund right.",
            ],
        },
        {
            type: "text",
            description:
                "Completed Top-Ups are not ordinarily refundable merely because you no longer wish to use the Website.\n\nWhere part of a Top-Up has already been used, only the unused portion may be considered for cancellation, unless the related Product purchase independently qualifies for a refund or applicable law requires another result.",
        },
        {
            type: "text",
            title: "17. Refund Method",
            description:
                "The refund method normally depends on the original payment method.",
        },
        {
            type: "text",
            title: "17.1 Purchases Paid With Account Balance",
            description:
                "If a Product was purchased entirely with Account Balance, an approved refund will normally be returned to the Account Balance.",
        },
        {
            type: "text",
            title: "17.2 Purchases Paid Externally",
            description:
                "If a Product was paid for directly using an external payment method, an approved refund will normally be returned to that payment method.",
        },
        {
            type: "text",
            title: "17.3 Split Payments",
            description:
                "Where a purchase was paid partly with Account Balance and partly through an external payment method, the refund may be divided proportionately between those methods.",
        },
        {
            type: "text",
            title: "17.4 Alternative Methods",
            description:
                "A different refund method may be used where:",
            bullets: [
                "the original method is unavailable;",
                "the Payment Provider cannot process the refund;",
                "you expressly agree to another lawful method; or",
                "applicable law requires a different method.",
            ],
        },
        {
            type: "text",
            description:
                "We will not substitute store credit for a monetary refund where applicable law requires a refund to the original payment method unless you expressly agree.",
        },
        {
            type: "text",
            title: "18. Refund Amount",
            description:
                "An approved refund will not ordinarily exceed the amount actually paid for the affected Product or Transaction.\n\nWhere required, the refund will include applicable taxes paid on the refunded amount.\n\nA refund will not include:",
            bullets: [
                "exchange-rate differences imposed by your bank;",
                "international transaction charges imposed by a third party;",
                "independent hosting, domain, software or service expenses;",
                "customisation or development costs paid to another person; or",
                "other consequential expenses not charged by EarnerThemes.",
            ],
        },
        {
            type: "text",
            description:
                "This does not exclude any compensation or remedy that applicable law requires us to provide.",
        },
        {
            type: "text",
            title: "19. Refund Processing Time",
            description:
                "We will process an approved monetary refund without undue delay and, where required by consumer law, within 14 days after confirming that you are entitled to the refund.\n\nRefunds to Account Balance will normally appear sooner, subject to technical processing.\n\nYour bank, card issuer or Payment Provider may require additional time to display the refund. That external processing time is outside our control.\n\nWe do not charge a refund fee where charging one is prohibited by law.",
        },
        {
            type: "text",
            title: "20. Effect of a Product Refund",
            description:
                "Once a full Product refund is issued:",
            bullets: [
                "the Licence ends;",
                "your right to install, activate or use the Product ends;",
                "Activation Credentials may be cancelled or disabled;",
                "you must remove the Product from active websites;",
                "you must delete all Product files and backup copies under your control;",
                "you must stop distributing or making the Product available; and",
                "you must ensure that any Client or contractor also stops using the Product.",
            ],
        },
        {
            type: "text",
            description:
                "A refund does not transfer ownership of the Product to you.\n\nContinuing to use a Product after receiving a full refund may constitute copyright infringement and breach of the Digital Product Licence Agreement.\n\nWhere only a partial refund is issued, we will explain which Licence rights, if any, remain in effect.",
        },
        {
            type: "text",
            title: "21. How to Request a Refund",
            description:
                "Send your request to info@earnerthemes.com.\n\nInclude:",
            bullets: [
                "your full name;",
                "the email address associated with the Order;",
                "the Order number;",
                "the Product name;",
                "the purchase date;",
                "the payment amount and method;",
                "the reason for the request;",
                "a clear description of any defect or delivery issue; and",
                "relevant supporting information.",
            ],
        },
        {
            type: "text",
            description:
                "Refund requests should be submitted as soon as reasonably possible after discovering the issue.\n\nFor discretionary refund requests, delays may make it more difficult to verify the issue. However, no time limit in this Policy reduces any longer period or right available under applicable law.",
        },
        {
            type: "text",
            title: "22. Review Process",
            description:
                "After receiving a complete request, we may:",
            bullets: [
                "verify the Order and payment;",
                "review the Product description and Licence;",
                "request reasonable additional information;",
                "attempt re-delivery, repair, correction or replacement;",
                "consult the relevant Author where necessary;",
                "determine whether a full or partial refund is appropriate; and",
                "notify you of the decision and available next steps.",
            ],
        },
        {
            type: "text",
            description:
                "We will review requests fairly and in good faith.\n\nWhere a request is declined, we will provide a reasonable explanation.",
        },
        {
            type: "text",
            title: "23. Business Users",
            description:
                "Business Users do not have statutory change-of-mind cancellation rights intended exclusively for Consumers.\n\nA Business User may receive a refund only where:",
            bullets: [
                "this Policy expressly permits it;",
                "the Product is materially defective or not as described;",
                "the Order was not delivered;",
                "the parties agree to a refund; or",
                "applicable law requires one.",
            ],
        },
        {
            type: "text",
            description:
                "Nothing in this section excludes liability that cannot lawfully be excluded.",
        },
        {
            type: "text",
            title: "24. Fraudulent or Abusive Requests",
            description:
                "We may decline a refund request and restrict an Account where there is reasonable evidence of:",
            bullets: [
                "fabricated technical issues;",
                "altered payment evidence;",
                "repeated abusive refund activity;",
                "unauthorised redistribution;",
                "sharing or resale of Activation Credentials;",
                "use of a Product after claiming non-delivery;",
                "a false chargeback;",
                "identity or payment fraud; or",
                "another material breach of our Terms or Licence.",
            ],
        },
        {
            type: "text",
            description:
                "Any restriction will be proportionate and will not override mandatory legal rights.",
        },
        {
            type: "text",
            title: "25. Chargebacks and Payment Disputes",
            description:
                "If you believe a payment is incorrect or unauthorised, please contact us before initiating a chargeback so that we can investigate.\n\nWe may suspend the affected Account, Account Balance, Product Licence or Activation Credentials while a chargeback is pending.\n\nIf a chargeback is successful, the related Product Licence ends unless the payment dispute is later reversed or the Product is repurchased.\n\nNothing in this section prevents you from exercising lawful rights through your bank, card issuer, Payment Provider or consumer protection authority.",
        },
        {
            type: "text",
            title: "26. Changes to This Policy",
            description:
                "We may update this Policy to reflect changes in law, Products, payment methods, delivery procedures or business operations.\n\nThe updated version will be published with a revised effective date.\n\nThe Policy in force when you placed an Order will normally apply to that Order unless:",
            bullets: [
                "a change is required by law;",
                "the updated Policy gives you more favourable rights; or",
                "you expressly agree otherwise.",
            ],
        },
        {
            type: "text",
            title: "27. Governing Law and Disputes",
            description:
                "This Policy and any non-contractual obligations arising from it are governed by the laws of England and Wales.\n\nIf you are a Consumer, this choice of law does not deprive you of mandatory protections available under the law of the country in which you ordinarily reside.\n\nIf you disagree with a refund decision, contact info@earnerthemes.com and identify:",
            bullets: [
                "the Order;",
                "the original decision;",
                "the reason you disagree; and",
                "the resolution requested.",
            ],
        },
        {
            type: "text",
            description:
                "We will review the complaint in good faith.\n\nBusiness Users submit to the exclusive jurisdiction of the courts of England and Wales. Consumers may also have the right to bring proceedings in another competent court under applicable consumer law.",
        },
        {
            type: "text",
            title: "28. Contact Us",
            description: `Cancellation and refund requests may be sent to:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}`,
        },
    ],
};

export default refundPolicyEn;
