import {PageSchema} from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_EMAIL,
} from "@/resources/constants";

const ipPolicyEn: PageSchema = {
    meta: {
        title: `Intellectual Property and Takedown Policy – ${COMPANY_NAME}`,
        description:
            "How to report intellectual property infringement on EarnerThemes and how notices and counter-notices are handled.",
        canonical: "/ip-policy",
        ogImage: {
            title: `Intellectual Property and Takedown Policy – ${COMPANY_NAME}`,
            description: "How to report intellectual property infringement on EarnerThemes and how notices and counter-notices are handled.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Intellectual Property and Takedown Policy",
            description: "Effective date: 23 July 2026",
        },
        {
            type: "text",
            title: "1. About This Policy",
            description: `This Intellectual Property and Takedown Policy (“Policy”) explains how SENIOR EARNER LTD handles reports that a Product or other material available through www.earnerthemes.com infringes intellectual property rights.\n\nThe Website is operated by:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}\n\nIn this Policy, “EarnerThemes”, “we”, “us” and “our” refer to SENIOR EARNER LTD. “You” and “your” refer to a rights holder, Author, user, complainant or other person interacting with this process.\n\nThis Policy forms part of our Terms and Conditions.`,
        },
        {
            type: "text",
            title: "2. Our Commitment",
            description:
                "EarnerThemes respects intellectual property rights and expects Product Authors, customers and Website users to do the same.\n\nProducts offered through EarnerThemes may be created and owned by third-party Authors. We make such Products available under commercial, distribution or licensing arrangements with the relevant Authors or rights holders.\n\nWe take credible intellectual property complaints seriously and may remove, restrict or suspend material while a complaint is investigated.\n\nNothing in this Policy makes EarnerThemes a court or legal tribunal. Complex disputes may need to be resolved between the parties or through mediation, the Intellectual Property Office or an appropriate court.",
        },
        {
            type: "text",
            title: "3. Related Policies",
            description:
                "This Policy should be read together with:",
            bullets: [
                "our Terms and Conditions;",
                "Digital Product Licence Agreement;",
                "Refund and Cancellation Policy;",
                "Digital Delivery and Download Policy;",
                "Support Policy; and",
                "Privacy Policy.",
            ],
        },
        {
            type: "text",
            description:
                "Nothing in this Policy limits a right or remedy available under applicable law.",
        },
        {
            type: "text",
            title: "4. Intellectual Property Rights Covered",
            description:
                "This Policy may be used to report alleged infringement of:",
            bullets: [
                "copyright;",
                "database rights;",
                "registered or unregistered trademarks;",
                "passing off rights;",
                "registered or unregistered design rights;",
                "patent rights;",
                "rights in software or source code;",
                "moral rights;",
                "trade secrets;",
                "confidential information; and",
                "other legally recognised intellectual property rights.",
            ],
        },
        {
            type: "text",
            description:
                "A disagreement about Product quality, refunds, support or compatibility should be submitted through the relevant Support or Refund procedure rather than this Policy.",
        },
        {
            type: "text",
            title: "5. Material Covered",
            description:
                "A notice may relate to:",
            bullets: [
                "a Product;",
                "Product source files;",
                "Product documentation;",
                "images or previews;",
                "Website text;",
                "logos or branding;",
                "Product names;",
                "screenshots;",
                "downloadable files;",
                "user-submitted material;",
                "reviews or comments, where available;",
                "marketing content; or",
                "another identifiable item available through the Website.",
            ],
        },
        {
            type: "text",
            description:
                "A notice must identify the specific material concerned. General allegations against the Website or an entire Product category may not contain enough information for us to act.",
        },
        {
            type: "text",
            title: "6. Who May Submit a Notice",
            description:
                "A notice may be submitted by:",
            bullets: [
                "the owner of the relevant intellectual property right;",
                "an exclusive licensee with enforcement authority;",
                "a solicitor or legal representative;",
                "an authorised licensing body;",
                "an authorised agent; or",
                "another person legally entitled to enforce the right.",
            ],
        },
        {
            type: "text",
            description:
                "If you submit a notice on behalf of another person or organisation, you must identify that party and confirm your authority to act.\n\nWe may request evidence of authority.",
        },
        {
            type: "text",
            title: "7. Before Submitting a Notice",
            description:
                "Before submitting a notice, consider whether:",
            bullets: [
                "you own or control the right concerned;",
                "the material is actually protected;",
                "the alleged use is covered by a valid licence;",
                "an open-source licence applies;",
                "permission was previously granted;",
                "the material was created independently;",
                "the use may be legally permitted;",
                "the complaint concerns the whole work or a substantial part; and",
                "the dispute could be resolved directly with the Author.",
            ],
        },
        {
            type: "text",
            description:
                "You may wish to obtain independent legal advice. EarnerThemes cannot advise you on whether your rights have been infringed.",
        },
        {
            type: "text",
            title: "8. How to Submit a Notice",
            description:
                "Send the notice to:\n\nEmail: info@earnerthemes.com\nSubject: Intellectual Property Notice\n\nTo allow us to investigate, include the information listed in section 9.\n\nA notice may also be sent by post to the registered office stated at the end of this Policy.",
        },
        {
            type: "text",
            title: "9. Required Notice Information",
            description:
                "Your notice should include:",
        },
        {
            type: "text",
            title: "9.1 Complainant Information",
            bullets: [
                "your full legal name;",
                "company or organisation name, where applicable;",
                "email address;",
                "postal address;",
                "your relationship to the rights holder; and",
                "details of any representative acting for you.",
            ],
        },
        {
            type: "text",
            title: "9.2 Identification of the Protected Right",
            description:
                "Provide a clear description of the intellectual property concerned, including where relevant:",
            bullets: [
                "title of the work;",
                "name of the Author or rights holder;",
                "date of creation or first publication;",
                "trademark or design registration number;",
                "patent number;",
                "territory of protection;",
                "registration certificate;",
                "original source or publication;",
                "source-code repository or development record; and",
                "other evidence of ownership or exclusive rights.",
            ],
        },
        {
            type: "text",
            description:
                "Copyright protection in the United Kingdom generally arises automatically, so registration is not required for a copyright notice. However, you should provide reasonable evidence showing ownership or authority.",
        },
        {
            type: "text",
            title: "9.3 Identification of the Reported Material",
            description:
                "Identify the specific material you believe is infringing, including:",
            bullets: [
                "Product name;",
                "Product page URL;",
                "file or image concerned;",
                "screenshot;",
                "location within the Website or Product;",
                "relevant code, text or design element; and",
                "any other information needed to locate it.",
            ],
        },
        {
            type: "text",
            title: "9.4 Explanation of the Alleged Infringement",
            description:
                "Explain:",
            bullets: [
                "which right is allegedly infringed;",
                "how the reported material uses the protected work;",
                "why you believe the use is unauthorised;",
                "whether any licence or permission was previously granted;",
                "whether that licence was terminated;",
                "the territories affected; and",
                "the action you request.",
            ],
        },
        {
            type: "text",
            title: "9.5 Confirmation",
            description:
                "Include a statement confirming that:",
            bullets: [
                "you have a good-faith belief that the reported use is not authorised by the rights holder, its agent or applicable law;",
                "the information in the notice is accurate to the best of your knowledge;",
                "you are the rights holder or are authorised to act for the rights holder; and",
                "you understand that materially false or misleading notices may cause loss to others.",
            ],
        },
        {
            type: "text",
            title: "9.6 Signature",
            description:
                "Include your physical or electronic signature.\n\nTyping your full legal name at the end of an email may be accepted as an electronic signature.",
        },
        {
            type: "text",
            title: "10. Supporting Evidence",
            description:
                "Useful supporting evidence may include:",
            bullets: [
                "signed licence or distribution agreements;",
                "copyright assignments;",
                "original dated source files;",
                "repository history;",
                "trademark or design registrations;",
                "correspondence with the alleged infringer;",
                "screenshots;",
                "invoices;",
                "publication records;",
                "archived pages;",
                "metadata; and",
                "other documents showing ownership, authorship or unauthorised use.",
            ],
        },
        {
            type: "text",
            description:
                "Do not send unnecessary personal data, passwords, payment card information or unrelated confidential documents.\n\nYou may redact information that is not relevant to the complaint, provided that the remaining evidence is sufficient to verify the claim.",
        },
        {
            type: "text",
            title: "11. Incomplete Notices",
            description:
                "If a notice does not contain enough information, we may:",
            bullets: [
                "request clarification;",
                "request additional evidence;",
                "explain which information is missing;",
                "take no action until the missing information is supplied; or",
                "close the notice if no response is received within a reasonable time.",
            ],
        },
        {
            type: "text",
            description:
                "An incomplete notice does not automatically require removal of a Product.\n\nWe may still take temporary protective action where the available information indicates a serious legal, security or infringement risk.",
        },
        {
            type: "text",
            title: "12. Initial Review",
            description:
                "After receiving a sufficiently detailed notice, we may:",
            bullets: [
                "confirm receipt;",
                "verify that the material can be located;",
                "review the evidence provided;",
                "check our records and agreements;",
                "consult the relevant Author or rights holder;",
                "request further information;",
                "temporarily restrict the Product;",
                "preserve relevant Transaction and Licence records; and",
                "determine the appropriate next step.",
            ],
        },
        {
            type: "text",
            description:
                "The time required depends on the complexity of the claim, the quality of the evidence and whether another party must respond.\n\nAn acknowledgement of receipt does not mean that the complaint has been accepted as valid.",
        },
        {
            type: "text",
            title: "13. Interim Measures",
            description:
                "While a complaint is investigated, we may temporarily:",
            bullets: [
                "remove a Product from sale;",
                "hide or restrict a Product page;",
                "suspend new Orders;",
                "disable new downloads;",
                "suspend new activations;",
                "preserve existing files and records;",
                "add an appropriate notice;",
                "contact affected parties; or",
                "take another proportionate protective measure.",
            ],
        },
        {
            type: "text",
            description:
                "Interim action does not constitute a final determination that infringement occurred.\n\nWe will consider:",
            bullets: [
                "the credibility of the evidence;",
                "the seriousness of the alleged infringement;",
                "potential harm to the rights holder;",
                "potential harm to the Author and customers;",
                "the existence of a licence;",
                "whether continued availability may be unlawful; and",
                "whether a less restrictive measure is available.",
            ],
        },
        {
            type: "text",
            title: "14. Notification to the Author",
            description:
                "Where appropriate, we may send the relevant Author or supplier:",
            bullets: [
                "the substance of the complaint;",
                "identification of the reported material;",
                "supporting evidence;",
                "the complainant’s identity and contact details;",
                "the action requested; and",
                "instructions for responding.",
            ],
        },
        {
            type: "text",
            description:
                "We may withhold information where disclosure would be unlawful, unnecessary, unsafe or subject to a valid confidentiality restriction.\n\nAn Author must not use complaint information to harass, threaten or retaliate against a complainant.",
        },
        {
            type: "text",
            title: "15. Author Response",
            description:
                "The Author or affected party may respond by:",
            bullets: [
                "accepting the complaint;",
                "agreeing to removal;",
                "correcting the Product;",
                "providing evidence of ownership;",
                "providing a licence or distribution agreement;",
                "demonstrating independent creation;",
                "identifying applicable open-source terms;",
                "explaining a legally permitted use;",
                "disputing the scope of the claimed right; or",
                "submitting a formal counter-notice.",
            ],
        },
        {
            type: "text",
            description:
                "A response should be provided within the period stated in our notification. We may proceed without a response if none is received within a reasonable time.",
        },
        {
            type: "text",
            title: "16. Counter-Notice",
            description:
                "A counter-notice should include:",
            bullets: [
                "the respondent’s full legal name;",
                "company or organisation name, where applicable;",
                "email and postal address;",
                "identification of the removed or restricted Product;",
                "the relevant Product URL;",
                "an explanation of why removal or restriction was mistaken;",
                "evidence of ownership, licensing, permission or lawful use;",
                "copies of relevant agreements or records;",
                "confirmation that the information is accurate and submitted in good faith; and",
                "a physical or electronic signature.",
            ],
        },
        {
            type: "text",
            description:
                "Where a distribution agreement is commercially confidential, the respondent may initially provide a redacted copy, summary or other evidence sufficient to establish the relevant rights.\n\nWe may require access to an unredacted version where necessary to verify authority, subject to reasonable confidentiality arrangements.",
        },
        {
            type: "text",
            title: "17. Sharing a Counter-Notice",
            description:
                "Where lawful and appropriate, we may send the counter-notice or its relevant substance to the original complainant.\n\nThe complainant may be asked to:",
            bullets: [
                "withdraw the complaint;",
                "provide further evidence;",
                "confirm that legal proceedings have begun;",
                "agree to mediation; or",
                "explain why the material should remain restricted.",
            ],
        },
        {
            type: "text",
            description:
                "We are not required to restore material merely because a counter-notice was received.",
        },
        {
            type: "text",
            title: "18. Possible Outcomes",
            description:
                "After review, we may:",
            bullets: [
                "take no action;",
                "restore the Product;",
                "keep the Product restricted;",
                "permanently remove the Product;",
                "require changes to files, images, text or branding;",
                "disable Activation Credentials;",
                "stop further distribution;",
                "suspend or terminate an Author relationship;",
                "notify affected purchasers;",
                "offer replacement Delivery;",
                "process appropriate refunds;",
                "preserve evidence for legal proceedings;",
                "refer the parties to mediation or legal resolution; or",
                "take another action reasonably necessary to protect rights and comply with law.",
            ],
        },
        {
            type: "text",
            description:
                "We will base our decision on the information reasonably available to us. A platform decision does not determine the parties’ legal rights in court.",
        },
        {
            type: "text",
            title: "19. Product Restoration",
            description:
                "A Product may be restored where:",
            bullets: [
                "the complainant withdraws the notice;",
                "the Author provides sufficient evidence of rights;",
                "the parties resolve the dispute;",
                "the complaint concerns material that has been removed or replaced;",
                "the reported use is shown to be authorised;",
                "a competent authority permits restoration; or",
                "the available evidence does not reasonably justify continued restriction.",
            ],
        },
        {
            type: "text",
            description:
                "Restoration may be subject to:",
            bullets: [
                "modifications;",
                "updated attribution;",
                "removal of disputed components;",
                "revised Product descriptions;",
                "additional Licence terms; or",
                "other reasonable safeguards.",
            ],
        },
        {
            type: "text",
            title: "20. Permanent Removal",
            description:
                "A Product may remain permanently unavailable where:",
            bullets: [
                "infringement is admitted or established;",
                "the Author cannot provide sufficient evidence of rights;",
                "a licence has expired or been terminated;",
                "a competent court or authority requires removal;",
                "the Product contains counterfeit or unlawfully distributed material;",
                "restoration would create an unacceptable legal risk;",
                "the Product repeatedly infringes third-party rights; or",
                "continued distribution would violate our agreements or applicable law.",
            ],
        },
        {
            type: "text",
            description:
                "Permanent removal may result in termination of the relevant Author or supplier relationship.",
        },
        {
            type: "text",
            title: "21. Effect on Existing Purchasers",
            description:
                "Removal of a Product from the Website does not automatically mean that every previous customer must stop using it.\n\nThe effect on an existing purchaser depends on:",
            bullets: [
                "the nature of the complaint;",
                "the purchaser’s Licence;",
                "the Author’s rights;",
                "applicable open-source terms;",
                "whether continued use is lawful;",
                "any court or authority order; and",
                "the final outcome of the complaint.",
            ],
        },
        {
            type: "text",
            description:
                "Where appropriate, we may notify affected purchasers and instruct them to:",
            bullets: [
                "stop further downloading;",
                "install a corrected version;",
                "remove a disputed component;",
                "stop using the Product;",
                "deactivate Activation Credentials; or",
                "take another necessary step.",
            ],
        },
        {
            type: "text",
            description:
                "If a purchaser can no longer lawfully use a Product, available remedies will be determined under the Refund and Cancellation Policy and applicable law.",
        },
        {
            type: "text",
            title: "22. Refunds Following Removal",
            description:
                "A refund is not automatic merely because a Product is temporarily restricted or removed from future sale.\n\nA refund or other remedy may be available where:",
            bullets: [
                "an accepted Order cannot be delivered;",
                "the purchaser cannot lawfully use the Product;",
                "the Licence granted was materially invalid;",
                "the Product is materially not as described;",
                "a replacement cannot reasonably be provided; or",
                "applicable law requires a remedy.",
            ],
        },
        {
            type: "text",
            description:
                "Any refund will have the consequences stated in the Digital Product Licence Agreement and Refund and Cancellation Policy, including termination of the refunded Licence.",
        },
        {
            type: "text",
            title: "23. Activation and Download Restrictions",
            description:
                "We may suspend a Download Link or Activation Credential where reasonably necessary to:",
            bullets: [
                "comply with a court order;",
                "prevent continuing infringement;",
                "protect an Author or rights holder;",
                "investigate counterfeit distribution;",
                "prevent unauthorised sharing; or",
                "enforce the outcome of a complaint.",
            ],
        },
        {
            type: "text",
            description:
                "Restrictions will be proportionate to the issue and will not be used as a substitute for resolving an ordinary customer support dispute.",
        },
        {
            type: "text",
            title: "24. Repeat Infringement",
            description:
                "We may suspend or terminate access to EarnerThemes where an Author, supplier or user repeatedly:",
            bullets: [
                "submits infringing material;",
                "redistributes Products without permission;",
                "shares Activation Credentials;",
                "falsely claims ownership;",
                "ignores valid takedown decisions;",
                "circumvents restrictions; or",
                "otherwise violates intellectual property rights.",
            ],
        },
        {
            type: "text",
            description:
                "We may consider:",
            bullets: [
                "the number and seriousness of complaints;",
                "whether complaints were substantiated;",
                "the person’s response;",
                "corrective action;",
                "repeated use of the same material; and",
                "evidence of intentional conduct.",
            ],
        },
        {
            type: "text",
            description:
                "A person will not be treated as a repeat infringer solely because multiple unsupported or abusive notices were submitted against them.",
        },
        {
            type: "text",
            title: "25. False or Abusive Notices",
            description:
                "You must not knowingly submit a notice that is:",
            bullets: [
                "false;",
                "materially misleading;",
                "submitted without authority;",
                "intended to harass a competitor;",
                "designed to interfere with lawful sales;",
                "based on rights you do not own or control; or",
                "unsupported by a reasonable good-faith belief.",
            ],
        },
        {
            type: "text",
            description:
                "A false or abusive notice may cause significant loss to EarnerThemes, Authors and customers.\n\nWe may:",
            bullets: [
                "reject the notice;",
                "request further verification;",
                "suspend access to the reporting process;",
                "preserve evidence;",
                "disclose information where legally required; or",
                "pursue available legal remedies.",
            ],
        },
        {
            type: "text",
            description:
                "This section does not discourage genuine good-faith complaints.",
        },
        {
            type: "text",
            title: "26. Confidentiality",
            description:
                "We will treat complaint information with reasonable care but cannot guarantee that all information will remain confidential.\n\nInformation may be disclosed to:",
            bullets: [
                "the complainant;",
                "the Author or respondent;",
                "professional advisers;",
                "service providers;",
                "insurers;",
                "courts;",
                "law-enforcement bodies;",
                "regulators; and",
                "other competent authorities.",
            ],
        },
        {
            type: "text",
            description:
                "Do not submit information that is unnecessary for the complaint.\n\nIf particular information is commercially sensitive, clearly identify it and explain why confidential treatment is requested.",
        },
        {
            type: "text",
            title: "27. Personal Data",
            description:
                "We process personal data submitted through this procedure to:",
            bullets: [
                "investigate the complaint;",
                "verify authority and ownership;",
                "communicate with the parties;",
                "prevent fraud and abuse;",
                "enforce our agreements;",
                "comply with legal obligations; and",
                "establish, exercise or defend legal claims.",
            ],
        },
        {
            type: "text",
            description:
                "Further information is provided in our Privacy Policy.\n\nSubmitting a notice authorises us to share relevant information with the affected party where reasonably necessary to assess and resolve the complaint.",
        },
        {
            type: "text",
            title: "28. Record Retention",
            description:
                "We may retain notices, counter-notices, evidence, correspondence and decisions for as long as reasonably necessary to:",
            bullets: [
                "administer the complaint;",
                "identify repeat infringement;",
                "comply with legal obligations;",
                "respond to authorities;",
                "maintain contractual records; and",
                "establish, exercise or defend legal claims.",
            ],
        },
        {
            type: "text",
            description:
                "When information is no longer required, it will be deleted, anonymised or securely restricted in accordance with our Privacy Policy.",
        },
        {
            type: "text",
            title: "29. Court Orders and Authorities",
            description:
                "We may comply with valid:",
            bullets: [
                "court orders;",
                "injunctions;",
                "disclosure orders;",
                "law-enforcement requests;",
                "regulator requests; and",
                "other legally binding directions.",
            ],
        },
        {
            type: "text",
            description:
                "We may preserve relevant files and records where litigation or an official investigation is reasonably anticipated.\n\nNothing in this Policy prevents a rights holder or respondent from seeking independent legal relief.",
        },
        {
            type: "text",
            title: "30. Criminal Infringement",
            description:
                "Suspected deliberate commercial counterfeiting, piracy or other serious intellectual property crime may be reported to an appropriate authority.\n\nWe may cooperate with law enforcement and preserve relevant evidence where legally permitted or required.",
        },
        {
            type: "text",
            title: "31. No Legal Advice or Final Adjudication",
            description:
                "Information provided by EarnerThemes through this process is not legal advice.\n\nOur decision to remove, restrict, restore or retain material:",
            bullets: [
                "is an operational platform decision;",
                "does not determine ownership;",
                "does not prevent either party from bringing legal proceedings;",
                "does not waive any legal rights; and",
                "may be reconsidered if new evidence becomes available.",
            ],
        },
        {
            type: "text",
            description:
                "Parties should obtain independent legal advice where a dispute is complex or valuable.",
        },
        {
            type: "text",
            title: "32. Changes to This Policy",
            description:
                "We may update this Policy to reflect changes in:",
            bullets: [
                "applicable law;",
                "Website functionality;",
                "Product distribution;",
                "reporting procedures;",
                "intellectual property enforcement practices; or",
                "our business operations.",
            ],
        },
        {
            type: "text",
            description:
                "The updated version will be published with a revised effective date.\n\nA pending complaint will normally be handled under the procedure in effect when it was submitted, unless a legal or procedural change requires otherwise.",
        },
        {
            type: "text",
            title: "33. Governing Law and Disputes",
            description:
                "This Policy and any non-contractual obligations arising from it are governed by the laws of England and Wales.\n\nPlatform complaints should first be submitted through this procedure.\n\nNothing prevents a party from seeking urgent court relief or using another remedy available under applicable law.",
        },
        {
            type: "text",
            title: "34. Contact Us",
            description: `Intellectual property notices and counter-notices may be sent to:\n\n${COMPANY_LEGAL_NAME}\nCompany number: ${COMPANY_NUMBER}\nRegistered office: ${COMPANY_ADDRESS}\nEmail: ${COMPANY_EMAIL}\nRecommended subject: Intellectual Property Notice`,
        },
    ],
};

export default ipPolicyEn;
