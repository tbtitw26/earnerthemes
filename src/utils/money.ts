export const BASE_CURRENCY = "EUR" as const;
export const LEGACY_TOKENS_PER_BALANCE_UNIT = 100;

export const SUPPORTED_CURRENCIES = ["EUR"] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const CURRENCY_SIGNS: Record<string, string> = {
    EUR: "€",
    GBP: "£",
    USD: "$",
};

// Rates from the base currency (EUR is 1)
export const CURRENCY_RATES_FROM_GBP: Record<string, number> = {
    EUR: 1,
    GBP: 1,
    USD: 1,
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
    return value === "EUR";
}

export function convertToBaseCurrency(amount: number, currency?: string): number {
    return roundMoney(amount);
}

export function convertFromBaseCurrency(amount: number, currency?: string): number {
    return roundMoney(amount);
}

/**
 * Single currency system: returns the amount rounded to 2 decimals.
 */
export function convertCurrency(
    amount: number,
    from?: string,
    to?: string
): number {
    if (!Number.isFinite(amount)) return 0;
    return roundMoney(amount);
}

export function legacyTokensToBalance(tokens: number): number {
    return roundMoney(tokens / LEGACY_TOKENS_PER_BALANCE_UNIT);
}

export function formatMoney(amount: number, currency: string = BASE_CURRENCY): string {
    return new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(roundMoney(amount));
}
