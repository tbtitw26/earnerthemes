import type {Metadata} from "next";
import enLicence from "@/pageSchemas/licence-agreement/licenceAgreement.en";

import PageCreator from "@/components/utils/page-creator/PageCreator";
import {metadataFromSchema} from "@/utils/fromSchema";
import styles from "@/resources/PolicyPage.module.scss";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enLicence.meta);
}

export default function Page() {
    return (
        <div className={styles.privacyContainer}>
            <PageCreator schemaMap={{sv: enLicence, en: enLicence}}/>
        </div>
    );
}
