"use client";

import React, { useState } from "react";
import styles from "./EsimStorefront.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Text from "@/components/constructor/text/Text";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import {ESIM_COUNTRIES, EsimCountry} from "../esim-full-store/esim-store/esimData";
import { useCurrency } from "@/context/CurrencyContext";

interface Props {
    title: string;
    description?: string;
}

const MARKUP_BASE_AMOUNT = 1;

const EsimStorefront: React.FC<Props> = ({ title, description }) => {
    const router = useRouter();
    const user = useUser();
    const { sign, currency, convertFromBase } = useCurrency();

    const tabs = [
        {
            key: "popular",
            label: "Popular",
            countries: ESIM_COUNTRIES.filter(c => c.popular),
        },
        {
            key: "europe",
            label: "Europe",
            countries: ESIM_COUNTRIES
                .filter(c => c.region === "europe")
                .slice(0, 6),
        },
        {
            key: "global",
            label: "Global",
            countries: ESIM_COUNTRIES.filter(c => c.region === "global"),
        },
    ];

    const [active, setActive] = useState(tabs[0].key);
    const current = tabs.find(t => t.key === active);

    const handleBuy = (country: EsimCountry, plan: EsimCountry["plans"][0]) => {
        if (!user) {
            router.push("/sign-in");
            return;
        }

        router.push(
            `/extra/esim-checkout?country=${country.name}&code=${country.code}&plan=${plan.label}&basePrice=${plan.basePrice}`
        );
    };

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <Text title={title} description={description} />
            </header>

            {/* Tabs */}
            <div className={styles.tabsWrapper}>
                <div className={styles.tabs}>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            className={active === tab.key ? styles.active : ""}
                            onClick={() => setActive(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <Link href="/extra/esim-store">
                    <ButtonUI
                        variant="outlined"
                        size="md"
                        endIcon={<FaArrowRight />}
                        text="Explore all eSIMs"
                        color="secondary"
                        hoverColor="none"
                    />
                </Link>
            </div>

            {/* LIST */}
            <div className={styles.list}>
                {current?.countries.map(country => (
                    <div key={country.code + country.name} className={styles.countryBlock}>
                        <div className={styles.countryHeader}>
                            <img
                                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                alt={country.name}
                            />
                            <span>{country.name}</span>
                        </div>

                        {country.plans.map((plan, idx) => (
                            <div key={idx} className={styles.row}>
                                <span className={styles.plan}>{plan.label}</span>

                                <span className={styles.price}>
                                    <strong>{sign}{convertFromBase(plan.basePrice + MARKUP_BASE_AMOUNT).toFixed(2)}</strong> {currency}
                                </span>

                                <ButtonUI
                                    size="sm"
                                    shape="rounded"
                                    onClick={() => handleBuy(country, plan)}
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
};

export default EsimStorefront;
