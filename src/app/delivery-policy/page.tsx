import type {Metadata} from "next";
import enDelivery from "@/pageSchemas/delivery-policy/deliveryPolicy.en";

import PageCreator from "@/components/utils/page-creator/PageCreator";
import {metadataFromSchema} from "@/utils/fromSchema";
import styles from "@/resources/PolicyPage.module.scss";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enDelivery.meta);
}

export default function Page() {
    return (
        <div className={styles.privacyContainer}>
            <PageCreator schemaMap={{sv: enDelivery, en: enDelivery}}/>
        </div>
    );
}
