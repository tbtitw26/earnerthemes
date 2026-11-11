const NAMED_ENTITIES = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    hellip: "\u2026",
    mdash: "\u2014",
    ndash: "\u2013",
    rsquo: "\u2019",
    lsquo: "\u2018",
    rdquo: "\u201d",
    ldquo: "\u201c",
    reg: "\u00ae",
    copy: "\u00a9",
    trade: "\u2122",
    deg: "\u00b0",
    eacute: "\u00e9",
};

/**
 * Supplier descriptions are HTML, so they carry character references
 * (&#8217;, &#38;, &hellip;). Left encoded they render literally on the product
 * page, which is exactly the "incomplete description" the payment review flagged.
 */
function decodeEntities(value) {
    return String(value || "")
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
        .replace(/&([a-z][a-z0-9]*);/gi, (match, name) => {
            const decoded = NAMED_ENTITIES[String(name).toLowerCase()];
            return decoded === undefined ? match : decoded;
        });
}

function stripHtml(value) {
    return decodeEntities(
        String(value || "")
            .replace(/<style[\s\S]*?<\/style>/gi, " ")
            .replace(/<script[\s\S]*?<\/script>/gi, " ")
            .replace(/<[^>]+>/g, " "),
    )
        .replace(/\s+/g, " ")
        .trim();
}

function toNumber(value) {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : 0;
    }

    if (typeof value === "string") {
        const normalized = value.replace(/[^\d.]+/g, "");
        return normalized ? Number(normalized) : 0;
    }

    return 0;
}

function toDateOnly(value) {
    if (!value) {
        return "";
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return "";
    }

    return parsed.toISOString().slice(0, 10);
}

function getFirstDefined(...values) {
    return values.find((value) => value !== undefined && value !== null && value !== "");
}

function inferPlatform({ sourceUrl, taxonomy = [], title = "", description = "" }) {
    const haystack = [sourceUrl, ...taxonomy, title, description].join(" ").toLowerCase();

    if (haystack.includes("wordpress")) {
        return "WordPress";
    }

    if (haystack.includes("shopify")) {
        return "Shopify";
    }

    if (haystack.includes("woocommerce")) {
        return "WordPress";
    }

    return "WordPress";
}

function normalizeCategory(category, sourceUrl, title) {
    const haystack = `${category || ""} ${sourceUrl} ${title}`.toLowerCase();

    if (haystack.includes("woocommerce") || haystack.includes("ecommerce") || haystack.includes("shop")) {
        return "Ecommerce";
    }

    if (haystack.includes("portfolio") || haystack.includes("photography")) {
        return "Portfolio";
    }

    if (haystack.includes("blog") || haystack.includes("magazine")) {
        return "Blog";
    }

    if (haystack.includes("creative") || haystack.includes("agency")) {
        return "Creative";
    }

    return "Business";
}

function inferLanguage(platform) {
    if (platform === "Shopify") {
        return "Liquid";
    }

    return "PHP";
}

function inferBuilder({ platform = "", title = "", description = "", compatibility = [], tags = [] }) {
    // Every builder below is WordPress-only; reporting one for a Shopify theme
    // would put an inaccurate spec on the product page.
    if (platform === "Shopify") {
        return "";
    }

    const haystack = `${title} ${description} ${compatibility.join(" ")} ${tags.join(" ")}`.toLowerCase();

    if (haystack.includes("elementor")) {
        return "Elementor";
    }

    if (haystack.includes("wpbakery") || haystack.includes("visual composer")) {
        return "WPBakery";
    }

    if (haystack.includes("gutenberg")) {
        return "Gutenberg";
    }

    if (haystack.includes("bebuilder")) {
        return "BeBuilder";
    }

    if (haystack.includes("ux builder")) {
        return "UX Builder";
    }

    if (haystack.includes("avada")) {
        return "Avada Builder";
    }

    return "";
}

function normalizeGallery(rawGallery) {
    if (!Array.isArray(rawGallery)) {
        return [];
    }

    return rawGallery
        .map((entry) => {
            if (typeof entry === "string") {
                return entry;
            }

            return getFirstDefined(entry.url, entry.src, entry.preview_url, entry.landscape_url);
        })
        .filter(Boolean);
}

/** Metadata the HTML mirror prepends to a page — never part of the product copy. */
const MIRROR_PREAMBLE =
    /^\s*(?:Title:[^\n]*|URL Source:[^\n]*|Published Time:[^\n]*|Warning:[^\n]*|Markdown Content:)\s*/gi;

function stripMirrorPreamble(value) {
    return String(value || "")
        .replace(MIRROR_PREAMBLE, "")
        .replace(/URL Source:\s*\S+/i, "")
        .trim();
}

/**
 * Product pages must show a complete description, so a description is only ever
 * cut at a sentence boundary — never mid-word with an ellipsis.
 */
/**
 * Supplier descriptions often end with a release log ("Changelog", "Version 2.1 is
 * out — ...", "Updated on 22 Oct 2026"). That is maintenance history, not a product
 * description, and it reads as truncated noise on the product page, so the tail is
 * cut as long as a usable description is left in front of it.
 */
const CHANGELOG_MARKER =
    /(?:\bchange\s?log\b|\bversion\s+\d+(?:\.\d+)*\s+(?:is out|available|released)\b|\bupdated on\s+\d{1,2}\s+\w+\s+\d{4}\b)/i;

const MIN_DESCRIPTION_BEFORE_CHANGELOG = 200;

function stripChangelogTail(text) {
    const match = CHANGELOG_MARKER.exec(text);

    if (!match || match.index < MIN_DESCRIPTION_BEFORE_CHANGELOG) {
        return text;
    }

    const head = text.slice(0, match.index);
    const lastSentenceEnd = Math.max(head.lastIndexOf("."), head.lastIndexOf("!"), head.lastIndexOf("?"));

    return (lastSentenceEnd > MIN_DESCRIPTION_BEFORE_CHANGELOG ? head.slice(0, lastSentenceEnd + 1) : head).trim();
}

function truncateDescription(value, maxLength = 220) {
    const clean = stripChangelogTail(stripHtml(stripMirrorPreamble(value)));

    if (clean.length <= maxLength) {
        return clean;
    }

    const window = clean.slice(0, maxLength);
    const lastSentenceEnd = Math.max(window.lastIndexOf("."), window.lastIndexOf("!"), window.lastIndexOf("?"));

    if (lastSentenceEnd > maxLength * 0.4) {
        return window.slice(0, lastSentenceEnd + 1).trim();
    }

    const lastSpace = window.lastIndexOf(" ");
    return `${window.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}...`;
}

/**
 * The Envato catalog API returns `attributes` as an ARRAY of
 * `{ name, value, label }` entries, while some search payloads nest the item's own
 * fields under an `attributes` OBJECT. Only the object form is the item itself —
 * treating the array as the item silently loses id, price and previews and pushes
 * every record onto the HTML fallback scraper.
 */
function resolveSource(rawItem) {
    const attributes = rawItem?.attributes;

    if (attributes && !Array.isArray(attributes) && typeof attributes === "object") {
        return attributes;
    }

    return rawItem || {};
}

/**
 * Flattens the `attributes` array into `{ [name]: value }` so declared software
 * compatibility and the demo URL can be read from it.
 */
function resolveAttributeMap(rawItem) {
    const attributes = rawItem?.attributes;

    if (!Array.isArray(attributes)) {
        return {};
    }

    return attributes.reduce((map, entry) => {
        if (entry?.name) {
            map[String(entry.name)] = entry.value;
        }

        return map;
    }, {});
}

function toStringList(value) {
    if (Array.isArray(value)) {
        return value.map((entry) => String(entry)).filter(Boolean);
    }

    return value ? [String(value)] : [];
}

export function normalizeThemeForestItem(rawItem, sourceUrl, fallbackCategory = "") {
    const source = resolveSource(rawItem);
    const attributeMap = resolveAttributeMap(rawItem);
    const taxonomy = [
        source.classification,
        source.category,
        source.site,
        ...(Array.isArray(source.tags) ? source.tags : []),
    ].filter(Boolean);

    const title = getFirstDefined(source.name, source.title, source.item, rawItem?.name, rawItem?.title, "Untitled template");
    const platform = inferPlatform({
        sourceUrl,
        taxonomy,
        title,
        description: getFirstDefined(source.description, source.summary, ""),
    });
    const category = normalizeCategory(
        getFirstDefined(source.classification, source.category, fallbackCategory),
        sourceUrl,
        title,
    );
    const description = truncateDescription(
        getFirstDefined(source.description, source.summary, source.short_description, ""),
        2000,
    );
    const shortDescription = truncateDescription(description, 160);
    const compatibility = Array.isArray(source.compatible_with)
        ? source.compatible_with
        : [...toStringList(attributeMap["compatible-with"]), ...toStringList(attributeMap["compatible-software"])];
    const tags = Array.isArray(source.tags) ? source.tags : [];

    return {
        id: String(getFirstDefined(source.id, rawItem?.id, "")),
        slug: String(
            getFirstDefined(
                source.slug,
                source.url?.split("/").filter(Boolean).at(-2),
                sourceUrl.split("/").filter(Boolean).at(-2),
                "",
            ),
        ),
        title,
        platform,
        category,
        author: String(
            getFirstDefined(
                source.author_username,
                source.author,
                source.user,
                rawItem?.author,
                "Unknown",
            ),
        ),
        price: toNumber(getFirstDefined(source.price_cents && Number(source.price_cents) / 100, source.price)),
        currency: String(getFirstDefined(source.currency, "USD")),
        sales: toNumber(getFirstDefined(source.number_of_sales, source.sales, source.sales_count)),
        createdAt: toDateOnly(getFirstDefined(source.published_at, source.created_at, source.createdAt)),
        updatedAt: toDateOnly(getFirstDefined(source.updated_at, source.updatedAt, source.last_update)),
        coverImage: String(
            getFirstDefined(
                source.previews?.landscape_preview?.landscape_url,
                source.previews?.icon_with_landscape_preview?.landscape_url,
                source.previews?.icon_with_video_preview?.landscape_url,
                source.previews?.icon_preview?.icon_url,
                source.previews?.icon_with_landscape_preview?.icon_url,
                source.previews?.icon_preview?.url,
                source.previews?.icon_with_landscape_preview?.url,
                source.thumbnail,
                source.cover,
                "",
            ),
        ),
        gallery: normalizeGallery(
            getFirstDefined(source.previews?.gallery_preview, source.gallery, source.screenshots, []),
        ),
        description,
        shortDescription,
        tech: {
            language: inferLanguage(platform),
            builder: inferBuilder({ platform, title, description, compatibility, tags }),
        },
        livePreviewUrl: String(
            getFirstDefined(
                source.live_preview_url,
                source.previews?.live_site?.href,
                attributeMap["demo-url"],
                source.url && `${source.url}/full_screen_preview`,
                "",
            ),
        ),
        isFeatured: Boolean(getFirstDefined(source.is_featured, false)),
        sourceUrl,
    };
}
