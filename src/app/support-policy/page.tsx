import type {Metadata} from "next";
import enSupport from "@/pageSchemas/support-policy/supportPolicy.en";

import PageCreator from "@/components/utils/page-creator/PageCreator";
import {metadataFromSchema} from "@/utils/fromSchema";
import styles from "@/resources/PolicyPage.module.scss";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enSupport.meta);
}

export default function Page() {
    return (
        <div className={styles.privacyContainer}>
            <PageCreator schemaMap={{sv: enSupport, en: enSupport}}/>
        </div>
    );
}
