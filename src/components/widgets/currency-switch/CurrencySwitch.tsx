"use client";

import React, { useMemo } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { SUPPORTED_CURRENCIES } from "@/utils/money";
import styles from "./CurrencySwitch.module.scss";

const CURRENCIES = SUPPORTED_CURRENCIES;

const CurrencySwitch: React.FC = () => {
    const { currency, setCurrency } = useCurrency();

    const activeIndex = useMemo(() => CURRENCIES.indexOf(currency), [currency]);

    return (
        <div className={styles.container}>
            <div className={styles.segmentedControl}>
                {/* Рухома підкладка */}
                <div
                    className={styles.activeGlow}
                    style={{ transform: `translateX(${activeIndex * 100}%)` }}
                />

                {CURRENCIES.map((c) => (
                    <button
                        key={c}
                        type="button"
                        className={`${styles.tab} ${currency === c ? styles.active : ""}`}
                        onClick={() => setCurrency(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CurrencySwitch;
