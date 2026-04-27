import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { EnvatoApiClient, EnvatoApiError, extractCatalogItems } from "./themeforest/envato-api.mjs";
import { normalizeThemeForestItem } from "./themeforest/normalize-themeforest.mjs";
import {
    fetchFallbackCategoryItems,
    fetchFallbackItem,
    isValidTemplateImage,
} from "./themeforest/themeforest-fallback.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const SOURCE_PATH = path.join(projectRoot, "src", "data", "themeforest-sources.json");
const OUTPUT_PATH = path.join(projectRoot, "src", "data", "themeforest-templates.json");

function isItemUrl(url) {
    return /themeforest\.net\/item\/[^/]+\/\d+/.test(url);
}

function isCategoryUrl(url) {
    return /themeforest\.net\/category\//.test(url);
}

function parseThemeForestUrl(url) {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);

    if (segments[0] === "item" && segments[2]) {
        return {
            kind: "item",
            itemId: segments[2],
            slug: segments[1],
            sourceUrl: url,
        };
    }

    if (segments[0] === "category" && segments.length >= 3) {
        const [, platform, ...categoryPath] = segments;
        return {
            kind: "category",
            platform,
            categoryPath,
            sourceUrl: url,
        };
    }

    return { kind: "unknown", sourceUrl: url };
}

function buildCategorySearch(parsedUrl) {
    const categorySlug = parsedUrl.categoryPath.at(-1) || "";
    const term = [parsedUrl.platform, ...parsedUrl.categoryPath].join(" ");

    return {
        category: categorySlug,
        term,
        fallbackCategory: categorySlug,
    };
}

async function readSourceUrls() {
    const raw = await fs.readFile(SOURCE_PATH, "utf8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed.urls)) {
        throw new Error(`Expected "urls" array in ${SOURCE_PATH}`);
    }

    return parsed.urls.filter(Boolean);
}

async function importThemeForestUrls() {
    const client = new EnvatoApiClient();
    const urls = await readSourceUrls();
    const templatesById = new Map();
    let failedCount = 0;

    for (const sourceUrl of urls) {
        const parsed = parseThemeForestUrl(sourceUrl);

        try {
            if (parsed.kind === "item") {
                let normalized;

                try {
                    const payload = await client.getCatalogItem(parsed.itemId);
                    normalized = normalizeThemeForestItem(payload, sourceUrl);
                } catch (error) {
                    if (!(error instanceof EnvatoApiError)) {
                        throw error;
                    }

                    const fallbackRawItem = await fetchFallbackItem(sourceUrl, sourceUrl);
                    normalized = normalizeThemeForestItem(fallbackRawItem, sourceUrl);
                }

                if (!normalized.coverImage || !(await isValidTemplateImage(normalized.coverImage))) {
                    const fallbackRawItem = await fetchFallbackItem(sourceUrl, sourceUrl);
                    normalized = normalizeThemeForestItem(fallbackRawItem, sourceUrl);
                }

                if (normalized.id) {
                    templatesById.set(normalized.id, normalized);
                }
                continue;
            }

            if (parsed.kind === "category") {
                const search = buildCategorySearch(parsed);
                let items = [];

                try {
                    const payload = await client.searchCatalogItems({
                        term: search.term,
                        category: search.category,
                        pageSize: 12,
                        page: 1,
                    });
                    items = extractCatalogItems(payload);
                } catch (error) {
                    if (!(error instanceof EnvatoApiError)) {
                        throw error;
                    }

                    const fallbackItemUrls = await fetchFallbackCategoryItems(sourceUrl);
                    for (const itemUrl of fallbackItemUrls) {
                        const fallbackRawItem = await fetchFallbackItem(itemUrl, sourceUrl, search.fallbackCategory);
                        const normalized = normalizeThemeForestItem(fallbackRawItem, sourceUrl, search.fallbackCategory);

                        if (normalized.id) {
                            templatesById.set(normalized.id, normalized);
                        }
                    }

                    continue;
                }

                for (const item of items) {
                    let normalized = normalizeThemeForestItem(item, sourceUrl, search.fallbackCategory);

                    if (!normalized.coverImage || !(await isValidTemplateImage(normalized.coverImage))) {
                        const itemUrl = item?.url || item?.attributes?.url;
                        if (itemUrl) {
                            const fallbackRawItem = await fetchFallbackItem(itemUrl, sourceUrl, search.fallbackCategory);
                            normalized = normalizeThemeForestItem(fallbackRawItem, sourceUrl, search.fallbackCategory);
                        }
                    }

                    if (normalized.id) {
                        templatesById.set(normalized.id, normalized);
                    }
                }
                continue;
            }

            console.warn(`Skipping unsupported ThemeForest URL: ${sourceUrl}`);
        } catch (error) {
            failedCount += 1;
            const message =
                error instanceof EnvatoApiError ? error.message : error instanceof Error ? error.message : String(error);

            console.error(`Failed to import ${sourceUrl}`);
            console.error(message);
        }
    }

    const output = {
        templates: Array.from(templatesById.values()),
    };

    if (!output.templates.length) {
        throw new Error(
            `ThemeForest import produced 0 templates. Keeping the existing output file untouched. Failed sources: ${failedCount}/${urls.length}.`,
        );
    }

    await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");

    console.log(`Imported ${output.templates.length} unique templates into ${path.relative(projectRoot, OUTPUT_PATH)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    importThemeForestUrls().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}

export { importThemeForestUrls, isCategoryUrl, isItemUrl, parseThemeForestUrl };
