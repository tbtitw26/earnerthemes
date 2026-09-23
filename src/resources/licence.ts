/**
 * Pre-purchase licence disclosure.
 *
 * Every string here must stay consistent with the Digital Product Licence
 * Agreement (`src/pageSchemas/licence-agreement/licenceAgreement.en.ts`,
 * section 5 "Standard Licence Grant"). If the agreement changes, change this
 * file in the same commit — these are the terms the customer is shown before
 * they pay.
 */

export const LICENCE_AGREEMENT_HREF = "/licence-agreement";

export const STANDARD_LICENCE_NAME = "Standard Licence";

/** Headline restriction, shown wherever there is only room for one line. */
export const STANDARD_LICENCE_HEADLINE =
    "Standard Licence — one End Product, operated as one Production Website. Each additional website or End Product needs a separate licence.";

/** Scope of the licence: what the purchase allows. */
export const STANDARD_LICENCE_INCLUDES = [
    "Download and install one copy of the template.",
    "Use it to create one End Product (one finished website or store).",
    "Operate that End Product as one Production Website.",
    "Use the End Product for personal or commercial purposes.",
    "Modify and customise the template for that End Product.",
    "Run a Staging Website for development and testing of the same End Product.",
    "Build the End Product for yourself or for one Client.",
];

/** Key restrictions the customer must see before paying. */
export const STANDARD_LICENCE_RESTRICTIONS = [
    "One licence does not cover multiple Production Websites, End Products or Clients.",
    "A separate licence is required for each additional Production Website or End Product.",
    "The template is licensed, not sold — ownership and copyright stay with the Author.",
    "You may not resell, redistribute, sublicense, rent, lease or share the template files.",
    "You may not sell or distribute the template, modified or not, as a theme, template or stock item.",
    "A licence does not include installation, setup, custom development or unlimited support.",
];

/** Applies to every product in the catalog: the templates are authored by third parties. */
export const THIRD_PARTY_AUTHOR_NOTICE =
    "This template is created by a third-party Author and distributed under our commercial arrangement with that Author. Open-source or third-party components inside the template remain subject to their own licence terms.";

/**
 * Verbatim acknowledgement the customer must tick before a purchase is
 * submitted, so the licence scope is accepted rather than merely displayed.
 */
export const LICENCE_ACKNOWLEDGEMENT_TEXT =
    "I have read the Standard Licence and understand that it covers one End Product operated as one Production Website, and that each additional website or End Product requires a separate licence.";
