"use client";

import { useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";
import ContactUsForm from "@/components/widgets/contact-form/ContactForm";
import SeoRequestForm from "@/components/extra/seo/seo-form/SeoForm";
import styles from "./ContactUsPage.module.scss";

export default function ContactUsPage() {
    const user = useUser();
    const { currency, sign, convertFromBase } = useCurrency();
    const search = useSearchParams();
    const service = search.get("service");
    const amount = Number(search.get("amount") || 30);
    const displayAmount = convertFromBase(amount);

    if (!service) {
        return (
            <div className={styles.page}>
                <div className={styles.formShell}>
                    <ContactUsForm />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles.page}>
                <div className={styles.serviceShell}>
                    <div className={styles.serviceHero}>
                        <span className={styles.eyebrow}>Service Request</span>
                        <h1 className={styles.serviceTitle}>Login required to request this service.</h1>
                        <p className={styles.serviceDescription}>
                            You need to be signed in before submitting a paid SEO request. If you have
                            questions about the service or billing, send us a message below and we will help.
                        </p>
                        <div className={styles.loginNote}>
                            <strong>Request details</strong>
                            Service: {service}. Estimated charge: {sign}{displayAmount.toFixed(2)} {currency}.
                        </div>
                    </div>

                    <ContactUsForm />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.serviceShell}>
                <div className={styles.serviceHero}>
                    <span className={styles.eyebrow}>Service Request</span>
                    <h1 className={styles.serviceTitle}>Request {service}</h1>
                    <p className={styles.serviceDescription}>
                        Submit your request through the form below. Once confirmed, the service cost
                        will be deducted from your wallet balance automatically.
                    </p>
                </div>

                <div className={styles.serviceCard}>
                    <SeoRequestForm
                        service={service}
                        amount={amount}
                        title={`Request ${service}`}
                        description={`Submitting this request will deduct ${sign}${displayAmount.toFixed(2)} ${currency} from your wallet balance.`}
                    />
                </div>
            </div>
        </div>
    );
}
