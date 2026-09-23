import Link from "next/link";

import {
    LICENCE_AGREEMENT_HREF,
    STANDARD_LICENCE_HEADLINE,
    STANDARD_LICENCE_INCLUDES,
    STANDARD_LICENCE_NAME,
    STANDARD_LICENCE_RESTRICTIONS,
    THIRD_PARTY_AUTHOR_NOTICE,
} from "@/resources/licence";
import { ThemeTemplate } from "@/types/theme-template";

import styles from "./TemplateLicenceSummary.module.scss";

interface TemplateLicenceSummaryProps {
    template: ThemeTemplate;
    /** "compact" sits next to the buy button; "panel" is the full disclosure block. */
    variant?: "compact" | "panel";
}

export function getLicenceName(template: ThemeTemplate) {
    return template.licence?.name || STANDARD_LICENCE_NAME;
}

export function getProductionWebsites(template: ThemeTemplate) {
    return template.licence?.productionWebsites ?? 1;
}

export function getEndProducts(template: ThemeTemplate) {
    return template.licence?.endProducts ?? 1;
}

export function getProductTerms(template: ThemeTemplate) {
    return template.licence?.productTerms ?? [];
}

/** One-line scope statement, e.g. "1 End Product · 1 Production Website". */
export function getLicenceScopeLabel(template: ThemeTemplate) {
    const endProducts = getEndProducts(template);
    const productionWebsites = getProductionWebsites(template);

    return `${endProducts} End Product${endProducts === 1 ? "" : "s"} · ${productionWebsites} Production Website${
        productionWebsites === 1 ? "" : "s"
    }`;
}

export default function TemplateLicenceSummary({ template, variant = "panel" }: TemplateLicenceSummaryProps) {
    const licenceName = getLicenceName(template);
    const productTerms = getProductTerms(template);
    const isCustomScope = getEndProducts(template) !== 1 || getProductionWebsites(template) !== 1;

    if (variant === "compact") {
        return (
            <div className={styles.compact}>
                <div className={styles.compactHead}>
                    <span className={styles.badge}>{licenceName}</span>
                    <span className={styles.scope}>{getLicenceScopeLabel(template)}</span>
                </div>

                <p className={styles.compactText}>
                    {isCustomScope
                        ? `This purchase covers ${getLicenceScopeLabel(template)}. Each additional website or End Product requires a separate licence.`
                        : STANDARD_LICENCE_HEADLINE}
                </p>

                {productTerms.length ? (
                    <p className={styles.compactTerms}>
                        Product-Specific Terms apply to this template — see “Licence &amp; usage” below.
                    </p>
                ) : null}

                <Link href={LICENCE_AGREEMENT_HREF} className={styles.compactLink}>
                    Read the full Licence Agreement
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.panelBody}>
            <div className={styles.headline}>
                <span className={styles.badge}>{licenceName}</span>
                <strong>{getLicenceScopeLabel(template)}</strong>
            </div>

            {productTerms.length ? (
                <div className={styles.productTerms}>
                    <h3>Product-Specific Terms</h3>
                    <ul>
                        {productTerms.map((term) => (
                            <li key={term}>{term}</li>
                        ))}
                    </ul>
                    <p className={styles.note}>
                        These terms apply to this template in addition to the Licence Agreement and take priority over
                        the standard terms where they differ.
                    </p>
                </div>
            ) : null}

            <div className={styles.columns}>
                <div className={styles.column}>
                    <h3>What this licence allows</h3>
                    <ul>
                        {STANDARD_LICENCE_INCLUDES.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>Key restrictions</h3>
                    <ul className={styles.restrictions}>
                        {STANDARD_LICENCE_RESTRICTIONS.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className={styles.note}>{THIRD_PARTY_AUTHOR_NOTICE}</p>

            <Link href={LICENCE_AGREEMENT_HREF} className={styles.panelLink}>
                Read the full Digital Product Licence Agreement
            </Link>
        </div>
    );
}
