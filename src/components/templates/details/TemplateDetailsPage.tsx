import Image from "next/image";
import Link from "next/link";

import { getTemplateHref, getRelatedTemplates } from "@/data/themeforestTemplateHelpers";
import { themeforestTemplates } from "@/data/themeforestTemplates";
import { ThemeTemplate } from "@/types/theme-template";
import { getValidTemplateImageUrl } from "@/utils/templateImage";
import TemplateCartActions from "@/components/templates/details/TemplateCartActions";
import TemplatePrice from "@/components/templates/price/TemplatePrice";

import styles from "./TemplateDetailsPage.module.scss";

interface TemplateDetailsPageProps {
    template: ThemeTemplate;
}

function formatSales(value: number) {
    return new Intl.NumberFormat("en-US", {
        notation: value >= 1000 ? "compact" : "standard",
        maximumFractionDigits: 1,
    }).format(value);
}

function formatDate(value?: string) {
    if (!value) return "N/A";

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(parsed);
}

function normalizeDescription(template: ThemeTemplate) {
    const source = template.description || template.shortDescription || "";

    return source
        .replace(/\u2026/g, "...")
        .replace(/\s+/g, " ")
        .trim();
}

function getTemplateImages(template: ThemeTemplate) {
    return [template.coverImage, ...(template.gallery || [])]
        .map((image) => getValidTemplateImageUrl(image))
        .filter((image): image is string => Boolean(image))
        .filter((image, index, images) => images.indexOf(image) === index)
        .filter((image) => !image.includes("themeforest.net/item/"));
}

function getHighlights(template: ThemeTemplate) {
    const highlights = [
        `${template.platform} template`,
        template.category,
        template.tech.builder || null,
        template.livePreviewUrl ? "Live preview availablxe" : null,
    ].filter(Boolean);

    return highlights.slice(0, 4) as string[];
}

export default function TemplateDetailsPage({ template }: TemplateDetailsPageProps) {
    const description = normalizeDescription(template);
    const images = getTemplateImages(template);
    const heroImage = images[0];
    const galleryImages = images.slice(1, 5);
    const highlights = getHighlights(template);
    const relatedTemplates = getRelatedTemplates(template, themeforestTemplates.templates, 4);

    const specs = [
        { label: "Platform", value: template.platform },
        { label: "Category", value: template.category },
        { label: "Builder", value: template.tech.builder || "Standard" },
        { label: "Language", value: template.tech.language },
        { label: "Author", value: template.author },
        { label: "Sales", value: formatSales(template.sales) },
        { label: "Created", value: formatDate(template.createdAt) },
        { label: "Updated", value: formatDate(template.updatedAt) },
    ];

    return (
        <main className={styles.page}>
            <section className={styles.topSection}>
                <div className={styles.topHeader}>
                    <div className={styles.headingBlock}>
                        <div className={styles.breadcrumbs}>
                            <Link href="/templates">Templates</Link>
                            <span>/</span>
                            <span>{template.category}</span>
                        </div>

                        <h1>{template.title}</h1>

                        <div className={styles.metaRow}>
                            <span>{template.platform}</span>
                            <span>{template.category}</span>
                            {template.tech.builder ? <span>{template.tech.builder}</span> : null}
                            <span>{template.author}</span>
                        </div>
                    </div>

                    <Link href="/templates" className={styles.backLink}>
                        Back to catalog
                    </Link>
                </div>

                <div className={styles.topContent}>
                    <div className={styles.previewCard}>
                        <div className={styles.previewMedia}>
                            {heroImage ? (
                                <Image
                                    src={heroImage}
                                    alt={template.title}
                                    fill
                                    priority
                                    sizes="(max-width: 960px) 100vw, 740px"
                                    className={styles.previewImage}
                                />
                            ) : (
                                <div className={styles.previewFallback}>
                                    <span>{template.platform}</span>
                                </div>
                            )}
                        </div>

                        {galleryImages.length ? (
                            <div className={styles.thumbRow}>
                                {galleryImages.map((image, index) => (
                                    <div key={`${template.id}-${index}`} className={styles.thumbCard}>
                                        <Image
                                            src={image}
                                            alt={`${template.title} preview ${index + 2}`}
                                            fill
                                            sizes="120px"
                                            className={styles.thumbImage}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <aside className={styles.buyCard}>
                        <div className={styles.priceBlock}>
                            <span className={styles.priceLabel}>Price (incl. VAT)</span>
                            <strong>
                                <TemplatePrice value={template.price} currency={template.currency} />
                            </strong>
                        </div>

                        <div className={styles.miniStats}>
                            <div>
                                <span>Author</span>
                                <strong>{template.author}</strong>
                            </div>
                            <div>
                                <span>Sales</span>
                                <strong>{formatSales(template.sales)}</strong>
                            </div>
                        </div>

                        <div className={styles.actionBlock}>
                            <TemplateCartActions template={template} />
                            {template.livePreviewUrl ? (
                                <Link
                                    href={template.livePreviewUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={styles.previewButton}
                                >
                                    Live Preview
                                </Link>
                            ) : null}
                        </div>

                        <div className={styles.quickInfo}>
                            {highlights.map((highlight) => (
                                <div key={highlight} className={styles.quickInfoItem}>
                                    {highlight}
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>

            <section className={styles.infoGrid}>
                <article className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <span className={styles.sectionLabel}>Overview</span>
                        <h2>About this template</h2>
                    </div>

                    <p className={styles.description}>{description}</p>
                </article>

                <article className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <span className={styles.sectionLabel}>Details</span>
                        <h2>Template information</h2>
                    </div>

                    <div className={styles.specGrid}>
                        {specs.map((item) => (
                            <div key={item.label} className={styles.specCard}>
                                <span>{item.label}</span>
                                <strong>{item.value}</strong>
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            {images.length > 1 ? (
                <section className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <span className={styles.sectionLabel}>Screenshots</span>
                        <h2>Template preview</h2>
                    </div>

                    <div className={styles.galleryGrid}>
                        {images.slice(0, 6).map((image, index) => (
                            <div key={`${template.id}-gallery-${index}`} className={styles.galleryCard}>
                                <Image
                                    src={image}
                                    alt={`${template.title} gallery image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 960px) 100vw, 33vw"
                                    className={styles.galleryImage}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}

            {relatedTemplates.length ? (
                <section className={styles.relatedSection}>
                    <div className={styles.relatedHeader}>
                        <div>
                            <span className={styles.sectionLabel}>More Like This</span>
                            <h2>Related templates</h2>
                        </div>

                        <Link href="/templates" className={styles.backLink}>
                            Browse all
                        </Link>
                    </div>

                    <div className={styles.relatedGrid}>
                        {relatedTemplates.map((relatedTemplate) => {
                            const relatedImage = getValidTemplateImageUrl(relatedTemplate.coverImage);

                            return (
                                <article key={relatedTemplate.id} className={styles.relatedCard}>
                                    <Link href={getTemplateHref(relatedTemplate)} className={styles.relatedLink}>
                                        <div className={styles.relatedMedia}>
                                            {relatedImage ? (
                                                <Image
                                                    src={relatedImage}
                                                    alt={relatedTemplate.title}
                                                    fill
                                                    sizes="(max-width: 900px) 100vw, 25vw"
                                                    className={styles.relatedImage}
                                                />
                                            ) : null}
                                        </div>

                                        <div className={styles.relatedBody}>
                                            <div className={styles.relatedTitleRow}>
                                                <h3>{relatedTemplate.title}</h3>
                                                <strong>
                                                    <TemplatePrice
                                                        value={relatedTemplate.price}
                                                        currency={relatedTemplate.currency}
                                                    />
                                                </strong>
                                            </div>

                                            <div className={styles.relatedTags}>
                                                <span>{relatedTemplate.platform}</span>
                                                <span>{relatedTemplate.category}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </section>
            ) : null}
        </main>
    );
}