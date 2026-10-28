"use client";

import React, { createContext, useContext, useMemo, ReactNode } from "react";

import {
    BASE_CURRENCY,
    CURRENCY_SIGNS,
    formatMoney,
    roundMoney,
    SupportedCurrency,
} from "@/utils/money";

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
    sign: "€",
    rateFromGbp: 1,
    convertFromBase: (value) => roundMoney(value),
    convertToBase: (value) => roundMoney(value),
    convertFromCurrency: (value) => roundMoney(value),
    formatPrice: (value) => formatMoney(value),
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const value = useMemo<CurrencyContextType>(() => {
        return {
            currency: "EUR",
            setCurrency: () => {},
            sign: "€",
            rateFromGbp: 1,
            convertFromBase: (amount) => roundMoney(amount),
            convertToBase: (amount) => roundMoney(amount),
            convertFromCurrency: (amount) => roundMoney(amount),
            formatPrice: (amount) => formatMoney(amount),
        };
    }, []);

    return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};
