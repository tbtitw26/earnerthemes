import { ThemeTemplate } from "@/types/theme-template";

/**
 * Text scraped through the ThemeForest HTML fallback arrives with the mirror's
 * own preamble ("Title: ...", "URL Source: ...", "Markdown Content:") glued to
 * the front of the real copy. Anything matching that shape is not product copy.
 */
const MIRROR_PREAMBLE =
    /^\s*(?:Title:[^\n]*|URL Source:[^\n]*|Published Time:[^\n]*|Warning:[^\n]*|Markdown Content:)\s*/gi;

/** A description shorter than this cannot describe a product in any useful way. */
const MIN_USABLE_DESCRIPTION = 120;

/** WordPress-only page builders must never be reported for a Shopify theme. */
const WORDPRESS_ONLY_BUILDERS = ["elementor", "wpbakery", "visual composer", "gutenberg", "avada", "bebuilder"];

function collapse(value: string) {
    return value.replace(/\s+/g, " ").trim();
}

/**
 * Drops the mirror preamble and any sentence fragment left behind by the
 * importer's hard character cut, so a description always ends on a full stop.
 */
export function cleanImportedDescription(raw?: string) {
    if (!raw) {
        return "";
    }

    let text = collapse(String(raw).replace(MIRROR_PREAMBLE, ""));

    // The mirrored preamble can also appear inline after collapsing newlines.
    text = collapse(
        text
            .replace(/^Title:\s*/i, "")
            .replace(/URL Source:\s*\S+/i, "")
            .replace(/Markdown Content:\s*/i, "")
            .replace(/Published Time:\s*\S+/i, ""),
    );

    // Remove a trailing fragment produced by truncation ("… suited for" / "…").
    text = text.replace(/[…]+\s*$/, "").trim();

    const lastSentenceEnd = Math.max(text.lastIndexOf("."), text.lastIndexOf("!"), text.lastIndexOf("?"));
    if (lastSentenceEnd > MIN_USABLE_DESCRIPTION) {
        text = text.slice(0, lastSentenceEnd + 1);
    }

    return text.length >= MIN_USABLE_DESCRIPTION ? text : "";
}

/**
 * Last-resort copy so a product page can never render an empty "About this
 * template" section. Only states facts already held in the catalog record.
 */
export function buildFallbackDescription(template: ThemeTemplate) {
    const isShopify = template.platform === "Shopify";
    const sentences = [
        `${template.title} is a ${template.platform} ${template.category.toLowerCase()} template published by ${template.author}.`,
        isShopify
            ? "It is supplied as a Shopify theme package that you upload to your own store, with the home page, collection and product sections configured from the Shopify theme editor."
            : "It is supplied as a WordPress theme package that you install on your own site, with layouts, colours and typography configured from the theme options.",
        template.tech.builder
            ? `Page layouts are edited with ${template.tech.builder}.`
            : "Page layouts are edited with the tools bundled with the theme.",
        "The download contains the template files and the installation and setup documentation. A full feature list and a live demo are available through the Live Preview link on this page.",
    ];

    return sentences.join(" ");
}

export function buildShortDescription(description: string, maxLength = 160) {
    const text = collapse(description);

    if (text.length <= maxLength) {
        return text;
    }

    const window = text.slice(0, maxLength);
    const lastSentenceEnd = Math.max(window.lastIndexOf("."), window.lastIndexOf("!"), window.lastIndexOf("?"));
    if (lastSentenceEnd > 60) {
        return window.slice(0, lastSentenceEnd + 1);
    }

    const lastSpace = window.lastIndexOf(" ");
    return `${window.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}...`;
}

/**
 * The importer infers the page builder by keyword-matching the item's own copy,
 * which misfires when that copy is missing or was scraped from the wrong part of
 * the page. A builder is only reported when it cannot contradict the platform
 * and the template's own title or description actually names it — otherwise the
 * product page would state a spec we cannot stand behind.
 */
export function sanitizeBuilder(platform: string, builder: string | undefined, evidence: string) {
    if (!builder) {
        return "";
    }

    const name = builder.toLowerCase().replace(/\s*builder$/, "").trim();

    if (platform === "Shopify" && WORDPRESS_ONLY_BUILDERS.some((wpBuilder) => name.includes(wpBuilder))) {
        return "";
    }

    return evidence.toLowerCase().includes(name) ? builder : "";
}
