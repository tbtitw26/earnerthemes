export const BASE_CURRENCY = "GBP" as const;
export const MIN_TOP_UP_AMOUNT = 10;
export const LEGACY_TOKENS_PER_BALANCE_UNIT = 100;

export const SUPPORTED_CURRENCIES = ["GBP", "EUR", "USD"] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const CURRENCY_SIGNS: Record<SupportedCurrency, string> = {
    GBP: "£",
    EUR: "€",
    USD: "$",
};

// Display conversion rates from the base currency (GBP).
export const CURRENCY_RATES_FROM_GBP: Record<SupportedCurrency, number> = {
    GBP: 1,
    EUR: 1.190476,
    USD: 1.297619,
};

/**
 * All prices shown on the site are VAT-inclusive (gross).
 * These helpers split a gross amount into its net and VAT parts for invoicing/display.
 */
export const VAT_RATE = 0.2;

export function netFromGross(grossAmount: number): number {
    return roundMoney(grossAmount / (1 + VAT_RATE));
}

export function vatFromGross(grossAmount: number): number {
    return roundMoney(grossAmount - netFromGross(grossAmount));
}

export function roundMoney(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function parseMoneyAmount(value: unknown): number | null {
    if (typeof value === "number") {
        return Number.isFinite(value) ? roundMoney(value) : null;
    }

    if (typeof value !== "string") {
        return null;
    }

    const normalized = value.trim();
    if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
        return null;
    }

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? roundMoney(parsed) : null;
}

export function isSupportedCurrency(value: unknown): value is SupportedCurrency {
    return typeof value === "string" && SUPPORTED_CURRENCIES.includes(value as SupportedCurrency);
}

export function convertToBaseCurrency(amount: number, currency: SupportedCurrency): number {
    return roundMoney(amount / CURRENCY_RATES_FROM_GBP[currency]);
}

export function convertFromBaseCurrency(amount: number, currency: SupportedCurrency): number {
    return roundMoney(amount * CURRENCY_RATES_FROM_GBP[currency]);
}

export function legacyTokensToBalance(tokens: number): number {
    return roundMoney(tokens / LEGACY_TOKENS_PER_BALANCE_UNIT);
}

export function formatMoney(amount: number, currency: SupportedCurrency = BASE_CURRENCY): string {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(roundMoney(amount));
}
