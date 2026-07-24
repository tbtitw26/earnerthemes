import type {Metadata} from "next";
import enPayment from "@/pageSchemas/payment-policy/paymentPolicy.en";

import PageCreator from "@/components/utils/page-creator/PageCreator";
import {metadataFromSchema} from "@/utils/fromSchema";
import styles from "@/resources/PolicyPage.module.scss";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enPayment.meta);
}

export default function Page() {
    return (
        <div className={styles.privacyContainer}>
            <PageCreator schemaMap={{sv: enPayment, en: enPayment}}/>
        </div>
    );
}
