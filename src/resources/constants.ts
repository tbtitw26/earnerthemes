export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME;
export const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS;
export const COMPANY_PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE;
export const COMPANY_LEGAL_NAME = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME;
export const COMPANY_NUMBER = process.env.NEXT_PUBLIC_COMPANY_NUMBER;
export const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL;

/**
 * The statement descriptor the cardholder sees on their bank statement.
 * Must match exactly what the acquirer has configured for this merchant.
 */
export const BILLING_DESCRIPTOR =
    process.env.NEXT_PUBLIC_BILLING_DESCRIPTOR ?? "EARNERTHEMES";

/** True while no live payment provider is connected — the checkout says so explicitly. */
export const PAYMENT_TEST_MODE =
    process.env.NEXT_PUBLIC_PAYMENT_TEST_MODE === "true";

/**
 * Verbatim wording required by the card schemes when the customer can pick
 * a currency at checkout. Must not be reworded.
 */
export const CURRENCY_CONVERSION_NOTICE =
    "MAKE SURE YOU UNDERSTAND THE COSTS OF CURRENCY CONVERSION AS THEY MAY BE DIFFERENT DEPENDING ON WHETHER YOU SELECT YOUR HOME CURRENCY OR THE TRANSACTION CURRENCY";

/** Verbatim EU/UK digital-content withdrawal waiver acknowledgement. */
export const WITHDRAWAL_WAIVER_TEXT =
    "I understand that by purchasing digital goods and requesting immediate delivery, I waive my statutory right of withdrawal once delivery begins.";