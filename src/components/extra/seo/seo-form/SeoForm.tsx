"use client";

import {useState, useMemo} from "react";
import {useUser} from "@/context/UserContext";
import {useAlert} from "@/context/AlertContext";
import ButtonUI from "@/components/ui/button/ButtonUI";
import styles from "./SeoForm.module.scss";
import {useCurrency} from "@/context/CurrencyContext";

interface SeoRequestFormProps {
    service: string;
    amount: number;
    title?: string;
    description?: string;
}

interface ExtraOption {
    name: string;
    price: number;
    desc: string;
    type?: "checkbox" | "file" | "number" | "text" | "textarea" | "url";
    min?: number;
    max?: number;
}

/* 🎯 Affordable SEO add-ons */
const extraOptions: Record<string, ExtraOption[]> = {
    "Technical Website Audit": [
        {
            name: "Core Web Vitals Optimization",
            price: 10,
            desc: "Improve loading speed and stability.",
            type: "checkbox"
        },
        {name: "Crawl Budget Analysis", price: 8, desc: "Optimize how Google crawls your pages.", type: "checkbox"},
        {name: "Upload Sitemap File", price: 1, desc: "Upload XML sitemap for review.", type: "file"},
        {name: "Pages to Audit", price: 1.3, desc: "Specify number of pages.", type: "number", min: 1, max: 100},
    ],

    "SEO Copywriting": [
        {name: "Custom Keywords List", price: 5, desc: "Provide your own keywords.", type: "textarea"},
        {name: "Content Reference URL", price: 1, desc: "Link to tone reference.", type: "url"},
        {name: "AI Tone & Voice Adjustment", price: 2.5, desc: "Adapt text tone and style.", type: "checkbox"},
    ],

    "Off-Page SEO": [
        {name: "Backlink Profile Audit", price: 10, desc: "Analyze backlinks.", type: "checkbox"},
        {name: "Upload Backlink List", price: 1, desc: "Attach CSV or XLSX.", type: "file"},
        {name: "Guest Posting Outreach", price: 10, desc: "Find guest post opportunities.", type: "checkbox"},
    ],

    "Local SEO": [
        {name: "Google My Business Optimization", price: 10, desc: "Optimize GMB profile.", type: "checkbox"},
        {name: "NAP Consistency Check", price: 5, desc: "Fix name/address/phone data.", type: "checkbox"},
        {name: "Local Keyword Research", price: 8, desc: "Find best local keywords.", type: "checkbox"},
    ],
};

export default function SeoRequestForm({
                                           service,
                                           amount,
                                           title,
                                           description,
                                       }: SeoRequestFormProps) {
    const user = useUser();
    const {showAlert} = useAlert();
    const {currency, sign, convertFromBase} = useCurrency();

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [extraValues, setExtraValues] = useState<Record<string, string | File>>({});

    const extras = useMemo(() => extraOptions[service] || [], [service]);

    const toggleExtra = (extraName: string) => {
        setSelectedExtras((prev) =>
            prev.includes(extraName)
                ? prev.filter((e) => e !== extraName)
                : [...prev, extraName]
        );
    };

    const handleExtraValueChange = (name: string, value: string | File) => {
        setExtraValues((prev) => ({...prev, [name]: value}));
    };

    const totalAmount = useMemo(
        () =>
            amount +
            extras
                .filter((e) => selectedExtras.includes(e.name))
                .reduce((sum, e) => sum + e.price, 0),
        [amount, extras, selectedExtras]
    );

    const convertedPrice = useMemo(() => convertFromBase(totalAmount), [convertFromBase, totalAmount]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!user) {
            showAlert("Login required", "Please log in to send a request.", "warning");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("userId", user._id);
            formData.append("userEmail", user.email);
            formData.append("service", service);
            formData.append("message", message);
            formData.append("amount", totalAmount.toFixed(2));
            formData.append("extras", JSON.stringify(selectedExtras));
            formData.append("extraValues", JSON.stringify(extraValues));

            Object.entries(extraValues).forEach(([key, value]) => {
                if (value instanceof File) formData.append(key, value);
            });

            const res = await fetch("/api/seo-request", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const err = (await res.json()) as { error?: string };
                throw new Error(err.error || "Request failed");
            }

            setSuccess(true);
            showAlert("Success", "Your SEO request has been sent.", "success");
        } catch (err: unknown) {
            showAlert("Error", err instanceof Error ? err.message : "Request failed", "error");
        } finally {
            setLoading(false);
        }
    }

    if (success)
        return <div className={styles.success}>✅ Request sent successfully!</div>;

    return (
        <section className={styles.section}>
            <h3>{title ?? `Request ${service}`}</h3>
            {description && <p>{description}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.serviceInfo}>
                    <span>Service: {service}</span>
                    <span className={styles.tokens}>
            💰 {sign}{convertedPrice.toFixed(2)} {currency}
          </span>
                </div>

                <label htmlFor="message">Project details</label>
                <textarea
                    id="message"
                    placeholder="Describe your goals, target audience, or website link..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {extras.length > 0 && (
                    <div className={styles.extrasSection}>
                        <h4>Additional Features</h4>
                        <div className={styles.extrasList}>
                            {extras.map((extra) => (
                                <div key={extra.name} className={styles.extraItem}>
                                    {/* ✅ Checkbox */}
                                    {extra.type === "checkbox" && (
                                        <>
                                            <input
                                                type="checkbox"
                                                checked={selectedExtras.includes(extra.name)}
                                                onChange={() => toggleExtra(extra.name)}
                                            />
                                            <div className={styles.extraInfo}>
                                                <strong>{extra.name}</strong>
                                                <p>{extra.desc}</p>
                                            </div>
                                            <span className={styles.extraPrice}>
                        +{sign}{convertFromBase(extra.price).toFixed(2)} {currency}
                      </span>
                                        </>
                                    )}

                                    {/* 📁 File */}
                                    {extra.type === "file" && (
                                        <div className={styles.extraInputBlock}>
                                            <label>
                                                {extra.name}{" "}
                                                <span className={styles.extraPrice}>
                          +{sign}{convertFromBase(extra.price).toFixed(2)} {currency}
                        </span>
                                            </label>
                                            <input
                                                type="file"
                                                accept=".xml,.csv,.xlsx,.pdf"
                                                onChange={(e) =>
                                                    handleExtraValueChange(extra.name, e.target.files?.[0])
                                                }
                                            />
                                            <p>{extra.desc}</p>
                                        </div>
                                    )}

                                    {/* 🔢 Number */}
                                    {extra.type === "number" && (
                                        <div className={styles.extraInputBlock}>
                                            <label>
                                                {extra.name}{" "}
                                                <span className={styles.extraPrice}>
                          +{sign}{convertFromBase(extra.price).toFixed(2)} {currency}
                        </span>
                                            </label>
                                            <input
                                                type="number"
                                                min={extra.min || 1}
                                                max={extra.max || 100}
                                                onChange={(e) =>
                                                    handleExtraValueChange(extra.name, e.target.value)
                                                }
                                            />
                                            <p>{extra.desc}</p>
                                        </div>
                                    )}

                                    {/* 📝 Textarea */}
                                    {extra.type === "textarea" && (
                                        <div className={styles.extraInputBlock}>
                                            <label>
                                                {extra.name}{" "}
                                                <span className={styles.extraPrice}>
                          +{sign}{convertFromBase(extra.price).toFixed(2)} {currency}
                        </span>
                                            </label>
                                            <textarea
                                                placeholder={extra.desc}
                                                onChange={(e) =>
                                                    handleExtraValueChange(extra.name, e.target.value)
                                                }
                                            />
                                        </div>
                                    )}

                                    {/* 🔗 URL */}
                                    {extra.type === "url" && (
                                        <div className={styles.extraInputBlock}>
                                            <label>
                                                {extra.name}{" "}
                                                <span className={styles.extraPrice}>
                          +{sign}{convertFromBase(extra.price).toFixed(2)} {currency}
                        </span>
                                            </label>
                                            <input
                                                type="url"
                                                placeholder="https://example.com"
                                                onChange={(e) =>
                                                    handleExtraValueChange(extra.name, e.target.value)
                                                }
                                            />
                                            <p>{extra.desc}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <ButtonUI
                    type="submit"
                    loading={loading}
                    fullWidth
                    color="secondary"
                    textColor="backgroundLight"
                    text={`Send Request (${sign}${convertedPrice.toFixed(2)} ${currency})`}
                />
            </form>
        </section>
    );
}
