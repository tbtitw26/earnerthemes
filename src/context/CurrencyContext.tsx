"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

import {
    BASE_CURRENCY,
    CURRENCY_RATES_FROM_GBP,
    CURRENCY_SIGNS,
    convertCurrency,
    convertFromBaseCurrency,
    convertToBaseCurrency,
    formatMoney,
    SupportedCurrency,
} from "@/utils/money";

const STORAGE_KEY = "selected-currency";

interface CurrencyContextType {
    currency: SupportedCurrency;
    setCurrency: (value: SupportedCurrency) => void;
    sign: string;
    rateFromGbp: number;
    convertFromBase: (baseAmount: number) => number;
    convertToBase: (displayAmount: number) => number;
    /** Converts an amount stored in `sourceCurrency` into the currency the customer selected. */
    convertFromCurrency: (amount: number, sourceCurrency?: string) => number;
    /** Formats an amount stored in `sourceCurrency` using the currency the customer selected. */
    formatPrice: (amount: number, sourceCurrency?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
    currency: BASE_CURRENCY,
    setCurrency: () => {},
    sign: CURRENCY_SIGNS[BASE_CURRENCY],
    rateFromGbp: CURRENCY_RATES_FROM_GBP[BASE_CURRENCY],
    convertFromBase: (value) => value,
    convertToBase: (value) => value,
    convertFromCurrency: (value, sourceCurrency) =>
        convertCurrency(value, sourceCurrency, BASE_CURRENCY),
    formatPrice: (value, sourceCurrency) =>
        formatMoney(convertCurrency(value, sourceCurrency, BASE_CURRENCY), BASE_CURRENCY),
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrencyState] = useState<SupportedCurrency>(BASE_CURRENCY);

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "GBP" || stored === "EUR" || stored === "USD") {
            setCurrencyState(stored);
        }
    }, []);

    const setCurrency = (value: SupportedCurrency) => {
        setCurrencyState(value);
        window.localStorage.setItem(STORAGE_KEY, value);
    };

    const value = useMemo<CurrencyContextType>(() => {
        const rateFromGbp = CURRENCY_RATES_FROM_GBP[currency];

        return {
            currency,
            setCurrency,
            sign: CURRENCY_SIGNS[currency],
            rateFromGbp,
            convertFromBase: (baseAmount) => convertFromBaseCurrency(baseAmount, currency),
            convertToBase: (displayAmount) => convertToBaseCurrency(displayAmount, currency),
            convertFromCurrency: (amount, sourceCurrency) =>
                convertCurrency(amount, sourceCurrency ?? BASE_CURRENCY, currency),
            formatPrice: (amount, sourceCurrency) =>
                formatMoney(convertCurrency(amount, sourceCurrency ?? BASE_CURRENCY, currency), currency),
        };
    }, [currency]);

    return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};
