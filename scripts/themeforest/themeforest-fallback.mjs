const MIRROR_PREFIX = "https://r.jina.ai/http://";
const IMAGE_SKIP_PATTERNS = [
    "blob:http",
    "public-assets.envato-static.com",
    "assets.market-storefront.envato-static.com",
    "envato-elements",
    "envato-logo",
    "icon_",
    "badges/",
];
const FALLBACK_CATEGORY_LIMIT = 12;
const FETCH_TIMEOUT_MS = 12000;
const MIRROR_MIN_INTERVAL_MS = 1600;
const MIRROR_MAX_RETRIES = 5;
let lastMirrorRequestAt = 0;

function buildMirrorUrl(url) {
    return `${MIRROR_PREFIX}${url}`;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function normalizeWhitespace(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
}

function stripMarkdown(value) {
    return normalizeWhitespace(
        value
            .replace(/!\[[^\]]*]\(([^)]+)\)/g, " ")
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
            .replace(/[*_`>#-]/g, " "),
    );
}

function parseAbsoluteDate(value) {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return "";
    }

    return parsed.toISOString().slice(0, 10);
}

function parseRelativeCreatedDate(value) {
    const match = normalizeWhitespace(value).match(/(\d+)\s+(day|week|month|year)s?\s+ago/i);
    if (!match) {
        return "";
    }

    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();
    const date = new Date();

    if (unit === "day") {
        date.setDate(date.getDate() - amount);
    } else if (unit === "week") {
        date.setDate(date.getDate() - amount * 7);
    } else if (unit === "month") {
        date.setMonth(date.getMonth() - amount);
    } else if (unit === "year") {
        date.setFullYear(date.getFullYear() - amount);
    }

    return date.toISOString().slice(0, 10);
}

function toNumber(value) {
    return Number(String(value || "0").replace(/[^\d.]+/g, "")) || 0;
}

function parseImages(markdown) {
    const matches = [...markdown.matchAll(/!\[[^\]]*]\((https?:\/\/[^)\s]+)\)/g)];
    return matches
        .map((match) => match[1])
        .filter((url) => !IMAGE_SKIP_PATTERNS.some((pattern) => url.includes(pattern)));
}

function extractDescription(markdown) {
    const lines = markdown.split("\n");
    const livePreviewIndex = lines.findIndex((line) => line.includes("[Live Preview]"));
    const startIndex = livePreviewIndex >= 0 ? livePreviewIndex + 1 : 0;
    const stopPatterns = [
        "Regular License",
        "Last Update",
        "Price is in US dollars",
        "Included: 6 months support",
        "Comments ",
        "Support",
        "© 2026 Envato",
    ];
    const collected = [];

    for (let index = startIndex; index < lines.length; index += 1) {
        const line = lines[index].trim();

        if (!line) {
            continue;
        }

        if (stopPatterns.some((pattern) => line.includes(pattern))) {
            break;
        }

        if (line.startsWith("![") || line.startsWith("[![") || line.startsWith("*   [")) {
            continue;
        }

        if (/^\*\*\$\d+/.test(line) || /^###\s*\$/.test(line)) {
            break;
        }

        const cleaned = stripMarkdown(line);
        if (cleaned.length < 30) {
            continue;
        }

        collected.push(cleaned);

        if (collected.join(" ").length >= 420) {
            break;
        }
    }

    return collected.join(" ").slice(0, 420).trim();
}

function inferFallbackCategory(sourceUrl, title) {
    const haystack = `${sourceUrl} ${title}`.toLowerCase();

    if (haystack.includes("shopify")) {
        if (haystack.includes("fashion") || haystack.includes("jewelry") || haystack.includes("beauty")) {
            return "Fashion";
        }

        if (haystack.includes("technology") || haystack.includes("electronics") || haystack.includes("medical")) {
            return "Technology";
        }

        if (haystack.includes("organic") || haystack.includes("food") || haystack.includes("beauty")) {
            return "Health & Beauty";
        }

        return "Ecommerce";
    }

    if (haystack.includes("blog") || haystack.includes("magazine") || haystack.includes("news")) {
        return "Blog";
    }

    if (haystack.includes("education") || haystack.includes("course") || haystack.includes("university")) {
        return "Education";
    }

    if (haystack.includes("technology") || haystack.includes("saas") || haystack.includes("software") || haystack.includes("ai ")) {
        return "Technology";
    }

    if (haystack.includes("charity") || haystack.includes("nonprofit") || haystack.includes("activism")) {
        return "Non Profit";
    }

    if (haystack.includes("woocommerce") || haystack.includes("ecommerce")) {
        return "Ecommerce";
    }

    return "Business";
}

async function fetchMirrorMarkdown(url) {
    for (let attempt = 0; attempt < MIRROR_MAX_RETRIES; attempt += 1) {
        const waitTime = MIRROR_MIN_INTERVAL_MS - (Date.now() - lastMirrorRequestAt);
        if (waitTime > 0) {
            await sleep(waitTime);
        }

        lastMirrorRequestAt = Date.now();

        const response = await fetch(buildMirrorUrl(url), {
            headers: {
                Accept: "text/plain",
            },
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });

        if (response.ok) {
            return response.text();
        }

        if (response.status !== 429 || attempt === MIRROR_MAX_RETRIES - 1) {
            throw new Error(`ThemeForest mirror request failed with ${response.status} for ${url}`);
        }

        await sleep(4000 * (attempt + 1));
    }

    throw new Error(`ThemeForest mirror request failed for ${url}`);
}

async function isImageReachable(url) {
    if (!url) {
        return false;
    }

    try {
        const response = await fetch(url, {
            method: "HEAD",
            redirect: "follow",
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });

        const contentType = response.headers.get("content-type") || "";
        if (response.ok && contentType.startsWith("image/")) {
            return true;
        }
    } catch {
        return false;
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Range: "bytes=0-0",
            },
            redirect: "follow",
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });

        const contentType = response.headers.get("content-type") || "";
        return response.ok && contentType.startsWith("image/");
    } catch {
        return false;
    }
}

async function resolveCoverImage(imageUrls = []) {
    for (const imageUrl of imageUrls) {
        if (await isImageReachable(imageUrl)) {
            return imageUrl;
        }
    }

    return "";
}

function buildFallbackRawItem({
    itemUrl,
    sourceUrl,
    title,
    author,
    price,
    sales,
    createdAt,
    updatedAt,
    coverImage,
    gallery,
    description,
    livePreviewUrl,
    fallbackCategory,
}) {
    const id = itemUrl.split("/").filter(Boolean).at(-1) || "";
    const slug = itemUrl.split("/").filter(Boolean).at(-2) || "";

    return {
        id,
        slug,
        title,
        name: title,
        author_username: author,
        price,
        currency: "USD",
        number_of_sales: sales,
        created_at: createdAt,
        updated_at: updatedAt,
        previews: {
            icon_preview: { url: coverImage },
            gallery_preview: gallery.map((url) => ({ url })),
        },
        description,
        summary: description,
        live_preview_url: livePreviewUrl || `https://preview.themeforest.net/item/${slug}/full_screen_preview/${id}`,
        is_featured: sales >= 50000,
        category: fallbackCategory,
        classification: fallbackCategory,
        tags: [fallbackCategory],
        url: itemUrl,
        sourceUrl,
    };
}

export async function fetchFallbackItem(itemUrl, sourceUrl, fallbackCategory = "") {
    const markdown = await fetchMirrorMarkdown(itemUrl);
    const titleMatch = markdown.match(/^Title:\s+(.+)$/m);
    const authorMatch = markdown.match(/\n\s*By \[([^\]]+)\]/);
    const priceMatch = markdown.match(/\*\*\$(\d+(?:\.\d+)?)\*\*/);
    const salesMatch = markdown.match(/\*\*([\d,]+)\*\*\s+sales/);
    const updateMatch = markdown.match(/Last Update ([^\n]+)/);
    const createdMatch = markdown.match(/Created ([^\n]+)/);
    const previewMatch = markdown.match(/\[Live Preview\]\((https:\/\/[^)]+)\)/);
    const imageUrls = parseImages(markdown);
    const coverImage = await resolveCoverImage(imageUrls);
    const gallery = imageUrls.filter((url) => url !== coverImage).slice(0, 6);
    const title = normalizeWhitespace(titleMatch?.[1] || "");
    const description = extractDescription(markdown);

    return buildFallbackRawItem({
        itemUrl,
        sourceUrl,
        title: title.replace(/\s+\|\s+ThemeForest$/, ""),
        author: normalizeWhitespace(authorMatch?.[1] || "Unknown"),
        price: toNumber(priceMatch?.[1]),
        sales: toNumber(salesMatch?.[1]),
        createdAt: parseRelativeCreatedDate(createdMatch?.[1] || "") || parseAbsoluteDate(updateMatch?.[1] || ""),
        updatedAt: parseAbsoluteDate(updateMatch?.[1] || ""),
        coverImage,
        gallery,
        description,
        livePreviewUrl: previewMatch?.[1] || `${itemUrl}/full_screen_preview/${itemUrl.split("/").at(-1) || ""}`,
        fallbackCategory: fallbackCategory || inferFallbackCategory(sourceUrl, title),
    });
}

export async function fetchFallbackCategoryItems(sourceUrl) {
    const markdown = await fetchMirrorMarkdown(sourceUrl);
    const seen = new Set();
    const items = [];
    const matches = markdown.matchAll(/^### \[[^\]]+\]\((https:\/\/themeforest\.net\/item\/[^)\s]+)\)/gm);

    for (const match of matches) {
        const itemUrl = match[1];
        const itemId = itemUrl.split("/").filter(Boolean).at(-1);

        if (!itemId || seen.has(itemId)) {
            continue;
        }

        seen.add(itemId);
        items.push(itemUrl);

        if (items.length >= FALLBACK_CATEGORY_LIMIT) {
            break;
        }
    }

    return items;
}

export async function isValidTemplateImage(url) {
    return isImageReachable(url);
}
