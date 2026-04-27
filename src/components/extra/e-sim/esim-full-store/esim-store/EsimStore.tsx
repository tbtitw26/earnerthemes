"use client";

import {useMemo, useState} from "react";
import styles from "./EsimStore.module.scss";
import {ESIM_COUNTRIES} from "./esimData";
import ButtonUI from "@/components/ui/button/ButtonUI";
import {useRouter} from "next/navigation";
import {useUser} from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function EsimStore() {
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState("all");
    const user = useUser()
    const { sign, currency, convertFromBase } = useCurrency();

    const markupBaseAmount = 1;

    const getDisplayedAmount = (baseAmount: number) => convertFromBase(baseAmount + markupBaseAmount);

    const popular = useMemo(
        () => ESIM_COUNTRIES.filter(c => c.popular),
        []
    );

    const filtered = useMemo(() => {
        return ESIM_COUNTRIES.filter(
            c =>
                !c.popular &&
                c.name.toLowerCase().includes(query.toLowerCase()) &&
                (region === "all" || c.region === region)
        );
    }, [query, region]);

    const router = useRouter();

    return (
        <section className={styles.page}>
            <header className={styles.header}>
                <h1>Global eSIM Store</h1>
                <p>Choose a destination and pay from your wallet balance.</p>
            </header>

            {/* ⭐ POPULAR */}
            {popular.length > 0 && (
                <section className={styles.popularSection}>
                    <h2>Popular destinations</h2>

                    <div className={styles.list}>
                        {popular.map(country => (
                            <div key={country.code} className={`${styles.countryBlock} ${styles.popular}`}>
                                <span className={styles.badge}>Popular</span>

                                <div className={styles.countryHeader}>
                                    <img
                                        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                        alt={country.name}
                                    />
                                    <span>{country.name}</span>
                                </div>

                                {country.plans.map((plan, i) => (
                                    <div key={i} className={styles.row}>
                                        <span className={styles.plan}>{plan.label}</span>
                                        <span className={styles.price}>
                      <strong>{sign}{getDisplayedAmount(plan.basePrice).toFixed(2)}</strong> {currency}
                    </span>
                                        <ButtonUI
                                            size="sm"
                                            shape="rounded"
                                            onClick={() => {
                                                const basePlanPrice = plan.basePrice;
                                                router.push(
                                                    user
                                                        ? `/extra/esim-checkout?country=${country.name}&code=${country.code}&plan=${plan.label}&basePrice=${basePlanPrice}`
                                                        : "/sign-in"
                                                );
                                            }}
                                        >
                                            Buy
                                        </ButtonUI>

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* FILTERS */}
            <div className={styles.filters}>
                <input
                    placeholder="Search country"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />

                <select value={region} onChange={e => setRegion(e.target.value)}>
                    <option value="all">All regions</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="americas">Americas</option>
                    <option value="africa">Africa</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>

            <h2 className={styles.allTitle}>All destinations</h2>

            <div className={styles.list}>
                {filtered.map(country => (
                    <div key={country.code} className={styles.countryBlock}>
                        <div className={styles.countryHeader}>
                            <img
                                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                alt={country.name}
                            />
                            <span>{country.name}</span>
                        </div>

                        {country.plans.map((plan, i) => (
                            <div key={i} className={styles.row}>
                                <span className={styles.plan}>{plan.label}</span>
                                <span className={styles.price}>
                  <strong>{sign}{getDisplayedAmount(plan.basePrice).toFixed(2)}</strong> {currency}
                </span>
                                <ButtonUI
                                    size="sm"
                                    shape="rounded"
                                    onClick={() => {
                                        const basePlanPrice = plan.basePrice;
                                        router.push(
                                            `/extra/esim-checkout?country=${country.name}&code=${country.code}&plan=${plan.label}&basePrice=${basePlanPrice}`
                                        );
                                    }}
                                >
                                    Buy
                                </ButtonUI>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
