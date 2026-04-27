function stripHtml(value) {
    return String(value || "")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
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

function inferBuilder({ title = "", description = "", compatibility = [], tags = [] }) {
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

function truncateDescription(value, maxLength = 220) {
    const clean = stripHtml(value);

    if (clean.length <= maxLength) {
        return clean;
    }

    return `${clean.slice(0, maxLength - 1).trimEnd()}…`;
}

export function normalizeThemeForestItem(rawItem, sourceUrl, fallbackCategory = "") {
    const source = rawItem?.attributes || rawItem || {};
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
        420,
    );
    const shortDescription = truncateDescription(description, 160);
    const compatibility = Array.isArray(source.compatible_with) ? source.compatible_with : [];
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
            builder: inferBuilder({ title, description, compatibility, tags }),
        },
        livePreviewUrl: String(
            getFirstDefined(source.live_preview_url, source.url && `${source.url}/full_screen_preview`, ""),
        ),
        isFeatured: Boolean(getFirstDefined(source.is_featured, false)),
        sourceUrl,
    };
}
