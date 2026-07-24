import {PageSchema} from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

const paymentPolicyEn: PageSchema = {
    meta: {
        title: `Payment and Account Balance Policy – ${COMPANY_NAME}`,
        description:
            "How payments, currencies, conversion, taxes and Account Balance top-ups work on EarnerThemes.",
        canonical: "/payment-policy",
        ogImage: {
            title: `Payment and Account Balance Policy – ${COMPANY_NAME}`,
            description: "How payments, currencies, conversion, taxes and Account Balance top-ups work on EarnerThemes.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Payment and Account Balance Policy",
            description: "Effective date: 23 July 2026",
        },
        {
            type: "text",
            title: "1. About This Policy",
            description: `This Payment and Account Balance Policy (“Policy”) explains how payments, Account Balance top-ups, deductions, corrections, refunds, payment disputes and related transactions are handled through www.earnerthemes.com.\n\nThe Website is operated by:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}\n\nIn this Policy, “EarnerThemes”, “we”, “us” and “our” refer to SENIOR EARNER LTD. “You” and “your” refer to the person or organisation making a payment, topping up or using an Account Balance, or purchasing a Product.\n\nThis Policy forms part of our Terms and Conditions. By purchasing Account Balance or using it to place an Order, you agree to this Policy.`,
        },
        {
            type: "text",
            title: "2. Related Policies",
            description:
                "This Policy should be read together with:",
            bullets: [
                "our Terms and Conditions;",
                "Digital Product Licence Agreement;",
                "Refund and Cancellation Policy;",
                "Digital Delivery and Download Policy;",
                "Privacy Policy; and",
                "any payment or promotional terms displayed at checkout.",
            ],
        },
        {
            type: "text",
            description:
                "If there is a conflict, Product-specific or transaction-specific terms disclosed before payment will apply to that transaction to the extent of the conflict.\n\nNothing in this Policy excludes rights that cannot lawfully be excluded.",
        },
        {
            type: "text",
            title: "3. Definitions",
            description:
                "For the purposes of this Policy:\n\n“Account” means a registered user account created through the Website.\n\n“Account Balance” means purchased store credit recorded in your Account and available to pay for eligible Products through the Website.\n\n“Available Balance” means Account Balance that has been successfully credited, has not been spent, reserved, reversed or restricted and is available for use.\n\n“Payment Provider” means a bank, card network, payment gateway, payment processor or other third party used to process a payment.\n\n“Product” means a digital website theme, template, file, activation credential or other Digital Content offered through the Website.\n\n“Promotional Credit” means credit issued without a corresponding cash payment, including bonuses, goodwill credits, vouchers and promotional rewards.\n\n“Top-Up” means a payment made to add purchased store credit to an Account Balance.\n\n“Transaction” means a Top-Up, Product purchase, deduction, refund, reversal, correction, promotional credit or other movement recorded in an Account Balance.",
        },
        {
            type: "text",
            title: "4. Nature of Account Balance",
            description:
                "Account Balance is a closed-loop store credit that may be used only to purchase eligible Products through EarnerThemes.\n\nAccount Balance:",
            bullets: [
                "is linked to your Account;",
                "may be used only on the Website;",
                "is not a bank account or deposit;",
                "does not earn interest;",
                "cannot be used to make payments to third parties;",
                "cannot be transferred between users unless we expressly permit it;",
                "cannot ordinarily be withdrawn or exchanged for cash; and",
                "has no use outside the EarnerThemes Website.",
            ],
        },
        {
            type: "text",
            description:
                "Account Balance is not a cryptocurrency, investment product, savings account or general-purpose payment instrument.\n\nAccount Balance remains subject to this Policy, our Terms and Conditions and applicable law.",
        },
        {
            type: "text",
            title: "5. Eligibility and Account Requirements",
            description:
                "You must have an eligible Account to purchase or use Account Balance.\n\nYou must:",
            bullets: [
                "provide accurate and current Account information;",
                "maintain a valid email address;",
                "protect your Account credentials;",
                "use only payment methods that you are authorised to use;",
                "promptly report suspected unauthorised access; and",
                "provide reasonable verification information where required.",
            ],
        },
        {
            type: "text",
            description:
                "Account Balance is personal to the Account holder and must not be sold, rented, shared or transferred.\n\nIf an Account is operated on behalf of a company or other organisation, the person making the payment confirms that they have authority to act for and bind that organisation.",
        },
        {
            type: "text",
            title: "6. Currency",
            description:
                "Account Balance and Product prices are normally denominated in pounds sterling (GBP).\n\nWhere your bank or Payment Provider processes the payment in another currency:",
            bullets: [
                "the Payment Provider may apply its own exchange rate;",
                "additional conversion or international payment fees may apply; and",
                "EarnerThemes does not control those exchange rates or fees.",
            ],
        },
        {
            type: "text",
            description:
                "The amount credited to your Account Balance will be the GBP amount shown and confirmed at checkout.",
        },
        {
            type: "text",
            title: "6.1 How Displayed Prices Are Converted",
            description:
                "The Website lets you display prices in GBP, EUR or USD. Conversion works as follows:",
            bullets: [
                "GBP is the base currency in which Account Balance and Product prices are held.",
                "Prices in EUR and USD are calculated from the GBP price using a fixed reference rate maintained by EarnerThemes. It is a published shop rate, not a live market rate, and it is reviewed periodically.",
                "The rate used is applied consistently across the Website, and the converted amount is rounded to two decimal places.",
                "EarnerThemes adds no separate conversion fee, commission or surcharge to the displayed price.",
                "Fixed Top-Up packages are offered as clean denominations in each supported currency, so the amount you see is the amount you pay.",
                "The exact amount and currency you will be charged are shown on the Top-Up Summary page before you confirm payment.",
            ],
        },
        {
            type: "text",
            description:
                "If your card or bank account is held in a different currency from the transaction currency, your card issuer or bank may apply its own exchange rate and its own fees. Those rates and fees are set by your provider, not by EarnerThemes.\n\nMAKE SURE YOU UNDERSTAND THE COSTS OF CURRENCY CONVERSION AS THEY MAY BE DIFFERENT DEPENDING ON WHETHER YOU SELECT YOUR HOME CURRENCY OR THE TRANSACTION CURRENCY.",
        },
        {
            type: "text",
            title: "7. Top-Up Options",
            description:
                "Available Top-Up amounts are displayed on the Website and may include:",
            bullets: [
                "fixed Top-Up packages; and",
                "a custom Top-Up option, which lets you enter any amount you choose.",
            ],
        },
        {
            type: "text",
            description:
                "EarnerThemes does not impose a minimum or maximum transaction amount for card payments. Fixed packages are offered for convenience only, and the custom Top-Up option is always available for any other amount.",
        },
        {
            type: "text",
            description:
                "We may change available Top-Up options or limits at any time. A change will not affect a completed Top-Up already credited to your Account.\n\nThe exact amount, currency and any applicable taxes or charges will be displayed before you confirm payment.",
        },
        {
            type: "text",
            title: "8. Making a Top-Up",
            description:
                "To make a Top-Up, you must:",
            bullets: [
                "sign in to your Account;",
                "select an available Top-Up amount;",
                "review the amount and payment details;",
                "accept the applicable terms and policies; and",
                "complete payment using an available payment method.",
            ],
        },
        {
            type: "text",
            description:
                "Submitting a Top-Up request authorises us and the relevant Payment Provider to process the displayed amount.\n\nA Top-Up is completed only when:",
            bullets: [
                "the Payment Provider confirms successful payment;",
                "the Transaction passes any applicable fraud or security review; and",
                "the corresponding amount is credited to your Account.",
            ],
        },
        {
            type: "text",
            description:
                "An automated payment acknowledgement does not guarantee that the payment has been finally settled.",
        },
        {
            type: "text",
            title: "9. Payment Processing",
            description:
                "Payments may be processed by third-party Payment Providers.\n\nA Payment Provider may apply its own:",
            bullets: [
                "terms of service;",
                "privacy policy;",
                "authentication requirements;",
                "security procedures;",
                "transaction limits; and",
                "fraud-prevention measures.",
            ],
        },
        {
            type: "text",
            description:
                "We do not control a Payment Provider’s approval or rejection of a payment.\n\nA payment may be declined or delayed because of:",
            bullets: [
                "incorrect payment information;",
                "insufficient funds;",
                "authentication failure;",
                "security or fraud controls;",
                "geographic restrictions;",
                "limits imposed by the Payment Provider; or",
                "technical issues outside our reasonable control.",
            ],
        },
        {
            type: "text",
            description:
                "If payment is unsuccessful, no Account Balance will be credited unless funds are later confirmed as received.",
        },
        {
            type: "text",
            title: "10. Payment Verification",
            description:
                "We may delay or restrict a Top-Up or Order while carrying out reasonable payment, identity, fraud or security checks.\n\nWe may request information reasonably necessary to verify:",
            bullets: [
                "the identity of the Account holder;",
                "authorisation to use the payment method;",
                "the billing information;",
                "the source or purpose of an unusual Transaction; or",
                "a suspected unauthorised payment.",
            ],
        },
        {
            type: "text",
            description:
                "Failure to provide reasonably requested information may result in the Transaction being declined, reversed or refunded.\n\nVerification measures will be applied proportionately and in accordance with our Privacy Policy.",
        },
        {
            type: "text",
            title: "11. Crediting Account Balance",
            description:
                "A successfully completed Top-Up will normally be credited to your Account shortly after payment confirmation.\n\nThe Account Balance shown in your Account is the authoritative record of the credit available for use, subject to correction of technical or payment errors.\n\nIf payment has been taken but the corresponding balance is not displayed, contact info@earnerthemes.com and provide:",
            bullets: [
                "your Account email address;",
                "the date and amount of the payment;",
                "the payment or Transaction reference; and",
                "reasonable evidence of payment.",
            ],
        },
        {
            type: "text",
            description:
                "We will investigate and, where payment is confirmed, credit the Account Balance or process an appropriate refund.",
        },
        {
            type: "text",
            title: "12. Using Account Balance",
            description:
                "Available Balance may be used to purchase eligible Products offered through the Website.\n\nWhen placing an Order:",
            bullets: [
                "the Product price will be displayed before confirmation;",
                "the required amount may be reserved or deducted from your Account Balance;",
                "your balance must be sufficient to cover the Order unless another payment method is offered for the difference; and",
                "the Transaction will be recorded in your Account.",
            ],
        },
        {
            type: "text",
            description:
                "If an Order is not accepted or cannot be fulfilled, the reserved or deducted amount will be restored to your Account Balance.\n\nAn Account Balance deduction does not expand the Licence granted for a Product. Each Product remains subject to the applicable Digital Product Licence Agreement.",
        },
        {
            type: "text",
            title: "13. Insufficient Balance",
            description:
                "If your Available Balance is lower than the total amount payable, you may be required to:",
            bullets: [
                "purchase an additional Top-Up;",
                "select a different Product;",
                "reduce the Order value; or",
                "use another payment option, if offered.",
            ],
        },
        {
            type: "text",
            description:
                "We are not required to process an Order that exceeds your Available Balance.",
        },
        {
            type: "text",
            title: "14. Transaction History",
            description:
                "Where available, your Account may show a history of:",
            bullets: [
                "Top-Ups;",
                "Product purchases;",
                "balance deductions;",
                "refunds;",
                "reversals;",
                "corrections; and",
                "Promotional Credits.",
            ],
        },
        {
            type: "text",
            description:
                "You should review Transaction information and notify us promptly if you identify an error or an unauthorised Transaction.\n\nWe may retain Transaction records where reasonably necessary for accounting, tax, fraud prevention, dispute resolution and legal compliance.",
        },
        {
            type: "text",
            title: "15. Purchased Balance Expiry",
            description:
                "Purchased Account Balance does not expire solely because of the passage of time unless:",
            bullets: [
                "an expiry condition was clearly disclosed before the Top-Up;",
                "a specific legal requirement applies; or",
                "you expressly agreed to a different arrangement.",
            ],
        },
        {
            type: "text",
            description:
                "This provision applies only to Account Balance purchased with money. Different conditions may apply to Promotional Credit.\n\nWe may contact inactive Account holders before making a material change affecting unused purchased balance.",
        },
        {
            type: "text",
            title: "16. Promotional Credit",
            description:
                "We may occasionally issue Promotional Credit as part of a promotion, voucher, customer service resolution or other offer.\n\nPromotional Credit:",
            bullets: [
                "may be subject to an expiry date;",
                "may be limited to specified Products;",
                "may have a minimum purchase requirement;",
                "may not be combined with another promotion;",
                "cannot be withdrawn or exchanged for cash;",
                "may be cancelled if issued by mistake, fraudulently obtained or used in breach of its terms; and",
                "may be subject to additional conditions disclosed when issued.",
            ],
        },
        {
            type: "text",
            description:
                "Where both purchased Account Balance and Promotional Credit are available, we may apply Promotional Credit first unless the relevant promotional terms state otherwise.\n\nThe expiry or cancellation of Promotional Credit does not affect valid purchased Account Balance.",
        },
        {
            type: "text",
            title: "17. Errors and Corrections",
            description:
                "We may correct an Account Balance where a Transaction has been:",
            bullets: [
                "credited or deducted more than once;",
                "recorded for the wrong amount;",
                "affected by a technical error;",
                "reversed by a Payment Provider;",
                "refunded;",
                "cancelled;",
                "fraudulently obtained; or",
                "otherwise incorrectly processed.",
            ],
        },
        {
            type: "text",
            description:
                "Before making a material adverse correction, we will normally notify you and explain the reason, unless immediate action is reasonably necessary to prevent fraud, security harm or further incorrect Transactions.\n\nA correction will be limited to the amount reasonably necessary to address the error.\n\nIf you believe a correction is wrong, contact info@earnerthemes.com with the relevant Transaction information.",
        },
        {
            type: "text",
            title: "18. Top-Up Cancellations and Refunds",
            description:
                "Because Account Balance becomes available for immediate use, completed Top-Ups are not ordinarily refundable merely because you changed your mind or no longer wish to use the Website.\n\nA Top-Up refund may be available where:",
            bullets: [
                "the same Top-Up was charged more than once;",
                "payment was taken but no corresponding balance was credited;",
                "the Top-Up was unauthorised;",
                "a technical error caused the wrong amount to be charged;",
                "we are unable to provide the Account Balance purchased; or",
                "applicable law gives you a right to cancel or receive a refund.",
            ],
        },
        {
            type: "text",
            description:
                "Where you have used any part of a Top-Up, the used portion cannot ordinarily be refunded unless required by law or the related Product purchase independently qualifies for a refund.\n\nIf you are a Consumer, nothing in this Policy limits any applicable statutory cancellation rights. The availability and consequences of cancellation depend on the nature of the Transaction, whether the Account Balance has been used and applicable law.\n\nRefund requests must be submitted to info@earnerthemes.com with sufficient information to identify the Transaction.",
        },
        {
            type: "text",
            title: "19. Product Refunds Paid With Account Balance",
            description:
                "Where a Product purchased entirely with Account Balance qualifies for a refund, the refund will normally be returned to your Account Balance.\n\nWhere a Product was paid for partly with Account Balance and partly through another payment method, an approved refund may be divided between:",
            bullets: [
                "restoration of the relevant Account Balance; and",
                "refund to the original external payment method.",
            ],
        },
        {
            type: "text",
            description:
                "Where applicable law requires a different refund method, we will comply with that requirement.\n\nOnce a full Product refund has been issued:",
            bullets: [
                "the Product Licence ends;",
                "Activation Credentials may be disabled;",
                "you must stop using the Product; and",
                "you must delete the Product files and copies under your control.",
            ],
        },
        {
            type: "text",
            description:
                "Further conditions are contained in the Refund and Cancellation Policy.",
        },
        {
            type: "text",
            title: "20. Monetary Refund Processing",
            description:
                "Where a monetary refund is approved, it will normally be issued to the original payment method unless:",
            bullets: [
                "the payment method is no longer available;",
                "the Payment Provider cannot process the refund;",
                "you expressly agree to another lawful method; or",
                "applicable law requires a different method.",
            ],
        },
        {
            type: "text",
            description:
                "We will process an approved monetary refund without undue delay and, where required by consumer law, within 14 days after confirming entitlement to the refund.\n\nYour bank or Payment Provider may require additional time to display the refunded amount. That processing time is outside our control.\n\nWe do not charge a fee for a refund where charging such a fee is prohibited by law.",
        },
        {
            type: "text",
            title: "21. Unauthorised Transactions",
            description:
                "If you believe that an Account Balance Top-Up or deduction was unauthorised, contact us immediately at info@earnerthemes.com.\n\nYou should also secure your Account by changing your password and reviewing your email account and payment method.\n\nWe may temporarily restrict the Account or Account Balance while investigating.\n\nWe may request:",
            bullets: [
                "the relevant Transaction reference;",
                "the date and amount;",
                "confirmation from the Payment Provider;",
                "information about Account access; and",
                "other reasonable evidence required to investigate the claim.",
            ],
        },
        {
            type: "text",
            description:
                "You remain responsible for Transactions you authorised or permitted, subject to applicable law.",
        },
        {
            type: "text",
            title: "22. Chargebacks and Payment Reversals",
            description:
                "If you believe a payment is incorrect, we encourage you to contact us before initiating a chargeback so that we can investigate.\n\nIf a Top-Up payment is reversed after the Account Balance has been credited, we may:",
            bullets: [
                "remove the corresponding Account Balance;",
                "suspend use of the affected balance;",
                "suspend Products purchased using the reversed balance;",
                "disable related Activation Credentials;",
                "place the Account Balance into a negative amount where the credit has already been spent; and",
                "request repayment of the outstanding amount.",
            ],
        },
        {
            type: "text",
            description:
                "If a chargeback or payment dispute is resolved in our favour, access may be restored after the payment is confirmed.\n\nSubmitting a knowingly false or abusive chargeback may result in Account suspension or termination.\n\nNothing in this section prevents you from exercising lawful rights through your bank, card issuer or Payment Provider.",
        },
        {
            type: "text",
            title: "23. Negative Account Balance",
            description:
                "An Account may show a negative balance where:",
            bullets: [
                "a Top-Up is reversed after the balance was spent;",
                "a refund or correction exceeds the Available Balance;",
                "an unauthorised payment is reversed; or",
                "another valid adjustment is required.",
            ],
        },
        {
            type: "text",
            description:
                "Where an Account has a negative balance:",
            bullets: [
                "new purchases may be restricted;",
                "further Top-Ups may first be applied to the negative amount; and",
                "we may request payment of the outstanding amount.",
            ],
        },
        {
            type: "text",
            description:
                "We will provide reasonable information about the Transaction that created the negative balance.",
        },
        {
            type: "text",
            title: "24. Account Restrictions",
            description:
                "We may temporarily restrict a Top-Up, Account Balance or Account where reasonably necessary to:",
            bullets: [
                "prevent suspected fraud;",
                "investigate an unauthorised Transaction;",
                "respond to a chargeback;",
                "protect the Account holder;",
                "comply with law or a lawful request;",
                "correct a material error; or",
                "address a serious breach of our Terms and Conditions.",
            ],
        },
        {
            type: "text",
            description:
                "Restrictions will be proportionate to the issue being investigated.\n\nWhere reasonably possible, we will notify you of the restriction and explain what information is required to resolve it.",
        },
        {
            type: "text",
            title: "25. Account Closure",
            description:
                "You may request closure of your Account by contacting info@earnerthemes.com.\n\nBefore requesting closure, you should review and use any valid Account Balance.\n\nClosing an Account does not automatically create a right to withdraw unused Account Balance as cash. Any refund of unused purchased balance will be determined under:",
            bullets: [
                "this Policy;",
                "the reason for Account closure;",
                "the payment history;",
                "any outstanding dispute or liability; and",
                "applicable law.",
            ],
        },
        {
            type: "text",
            description:
                "If we discontinue the Account Balance programme or close your Account for reasons unrelated to your breach, we will provide a reasonable opportunity to use valid purchased balance or provide another appropriate remedy.\n\nWe will not withhold valid purchased balance solely as a penalty. We may, however, deduct amounts lawfully owed to us, reverse invalid credits or restrict funds reasonably connected with fraud or a payment dispute.",
        },
        {
            type: "text",
            title: "26. Taxes and Records",
            description:
                "Prices and taxes will be displayed as required at checkout.\n\nYou are responsible for providing accurate billing, country and tax information.\n\nIf you purchase as a business, you are responsible for determining whether you have any additional tax, accounting or reporting obligations.\n\nWe may issue electronic receipts, payment confirmations or invoices using the email address associated with your Account.\n\nWe may retain payment and Transaction records as required for tax, accounting, fraud prevention, consumer protection and legal compliance.",
        },
        {
            type: "text",
            title: "27. Security",
            description:
                "You are responsible for protecting access to your Account and payment methods.\n\nYou must not:",
            bullets: [
                "allow another person to use your Account Balance;",
                "buy or sell Account Balance outside the Website;",
                "use stolen or unauthorised payment information;",
                "attempt to manipulate the Account Balance system;",
                "exploit a technical error;",
                "create multiple Accounts to abuse promotions;",
                "launder funds or disguise the source of payments; or",
                "use the payment system for unlawful purposes.",
            ],
        },
        {
            type: "text",
            description:
                "You must notify us if you receive Account Balance that you reasonably believe was credited by mistake.\n\nKnowingly spending an incorrect or fraudulently obtained balance is a material breach of this Policy.",
        },
        {
            type: "text",
            title: "28. Payment Provider and Website Availability",
            description:
                "We aim to keep payment and Account Balance services available, but uninterrupted availability cannot be guaranteed.\n\nA Transaction may be delayed by:",
            bullets: [
                "Website maintenance;",
                "Payment Provider outages;",
                "security checks;",
                "network failures;",
                "banking delays;",
                "circumstances outside our reasonable control; or",
                "incomplete or inaccurate information.",
            ],
        },
        {
            type: "text",
            description:
                "We will take reasonable steps to correct confirmed errors and restore affected services.",
        },
        {
            type: "text",
            title: "29. Liability",
            description:
                "Our liability in connection with payments and Account Balance is governed by our Terms and Conditions.\n\nNothing in this Policy excludes or limits liability where doing so would be unlawful, including liability for:",
            bullets: [
                "fraud or fraudulent misrepresentation;",
                "death or personal injury caused by negligence;",
                "breach of mandatory consumer rights; or",
                "any other liability that cannot legally be excluded.",
            ],
        },
        {
            type: "text",
            description:
                "We are not responsible for exchange rates, fees, declined payments or delays imposed solely by your bank or Payment Provider.",
        },
        {
            type: "text",
            title: "30. Changes to This Policy",
            description:
                "We may update this Policy to reflect changes in:",
            bullets: [
                "payment methods;",
                "Account Balance functionality;",
                "Website features;",
                "legal or regulatory requirements;",
                "fraud-prevention procedures; or",
                "business operations.",
            ],
        },
        {
            type: "text",
            description:
                "The updated Policy will be published with a revised effective date.\n\nA material change will not retroactively reduce valid purchased Account Balance unless:",
            bullets: [
                "the change is required by law;",
                "the relevant Transaction was invalid, fraudulent or incorrectly credited;",
                "the Account holder agrees to the change; or",
                "another lawful basis applies.",
            ],
        },
        {
            type: "text",
            description:
                "Where appropriate, we will provide advance notice of a material change affecting existing Account Balance.",
        },
        {
            type: "text",
            title: "31. Governing Law and Disputes",
            description:
                "This Policy and any non-contractual obligations arising from it are governed by the laws of England and Wales.\n\nIf you are a Consumer, this choice of law does not deprive you of mandatory protections available under the law of the country in which you ordinarily reside.\n\nBefore starting formal proceedings, contact info@earnerthemes.com with:",
            bullets: [
                "your Account email;",
                "the relevant Transaction or Order number;",
                "the amount and date;",
                "a description of the issue; and",
                "the resolution requested.",
            ],
        },
        {
            type: "text",
            description:
                "We will review the matter and attempt to resolve it in good faith.",
        },
        {
            type: "text",
            title: "32. Contact Us",
            description: `Questions, refund requests and payment concerns may be sent to:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}`,
        },
    ],
};

export default paymentPolicyEn;
