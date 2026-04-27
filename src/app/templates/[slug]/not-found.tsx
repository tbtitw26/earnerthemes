import Link from "next/link";

import styles from "./not-found.module.scss";

export default function TemplateNotFound() {
    return (
        <main className={styles.page}>
            <div className={styles.card}>
                <span className={styles.kicker}>Templates</span>
                <h1>Template not found</h1>
                <p>The template you requested is not available in the imported catalog.</p>
                <Link href="/templates" className={styles.link}>
                    Back to templates
                </Link>
            </div>
        </main>
    );
}
