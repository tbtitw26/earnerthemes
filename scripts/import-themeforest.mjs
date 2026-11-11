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

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 2000;

/**
 * Titles produced by bot-protection / error pages that the HTML fallback can scrape
 * instead of a real product page. A record carrying one of these is never a product.
 */
const GARBAGE_TITLE_PATTERN =
    /^\s*(?:just a moment|attention required|access denied|checking your browser|error|not found|403 forbidden|502 bad gateway|page not found|one more step|please wait)\b/i;

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Guards the catalog against records that would render as a broken product page.
 * The catalog is also the price source the backend charges from
 * (templateCatalog.service.ts), so a 0-priced or untitled record must never enter it.
 */
function rejectReason(template) {
    if (!template?.id) {
        return "missing id";
    }

    if (!template.title || !String(template.title).trim()) {
        return "missing title";
    }

    if (GARBAGE_TITLE_PATTERN.test(String(template.title))) {
        return `bot-protection page title ("${String(template.title).slice(0, 40)}")`;
    }

    if (!Number.isFinite(template.price) || template.price <= 0) {
        return `non-positive price (${template.price})`;
    }

    if (!template.coverImage || !String(template.coverImage).trim()) {
        return "missing cover image";
    }

    return "";
}

async function readExistingTemplates() {
    try {
        const raw = await fs.readFile(OUTPUT_PATH, "utf8");
        const parsed = JSON.parse(raw);

        if (!Array.isArray(parsed.templates)) {
            return new Map();
        }

        return new Map(
            parsed.templates.filter((template) => template?.id).map((template) => [String(template.id), template]),
        );
    } catch (error) {
        if (error?.code === "ENOENT") {
            return new Map();
        }

        throw error;
    }
}

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

    // The import is ADDITIVE: it starts from the catalog already on disk, so a source
    // that times out, 403s or stops being listed upstream never removes a product that
    // customers may already have bought. Only an explicit upstream record replaces one.
    const existingById = await readExistingTemplates();
    const templatesById = new Map(existingById);
    const stats = { added: [], updated: [], rejected: [] };
    let failedCount = 0;

    function accept(normalized) {
        const reason = rejectReason(normalized);

        if (reason) {
            stats.rejected.push({ id: normalized?.id || "?", title: normalized?.title || "?", reason });
            return;
        }

        const id = String(normalized.id);
        (existingById.has(id) ? stats.updated : stats.added).push(id);
        templatesById.set(id, normalized);
    }

    for (const sourceUrl of urls) {
        const parsed = parseThemeForestUrl(sourceUrl);

        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
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

                    accept(normalized);
                    break;
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
                            const fallbackRawItem = await fetchFallbackItem(
                                itemUrl,
                                sourceUrl,
                                search.fallbackCategory,
                            );
                            const normalized = normalizeThemeForestItem(
                                fallbackRawItem,
                                sourceUrl,
                                search.fallbackCategory,
                            );

                            accept(normalized);
                        }

                        break;
                    }

                    for (const item of items) {
                        let normalized = normalizeThemeForestItem(item, sourceUrl, search.fallbackCategory);

                        if (!normalized.coverImage || !(await isValidTemplateImage(normalized.coverImage))) {
                            const itemUrl = item?.url || item?.attributes?.url;
                            if (itemUrl) {
                                const fallbackRawItem = await fetchFallbackItem(
                                    itemUrl,
                                    sourceUrl,
                                    search.fallbackCategory,
                                );
                                normalized = normalizeThemeForestItem(
                                    fallbackRawItem,
                                    sourceUrl,
                                    search.fallbackCategory,
                                );
                            }
                        }

                        accept(normalized);
                    }

                    break;
                }

                console.warn(`Skipping unsupported ThemeForest URL: ${sourceUrl}`);
                break;
            } catch (error) {
                const message =
                    error instanceof EnvatoApiError
                        ? error.message
                        : error instanceof Error
                          ? error.message
                          : String(error);

                if (attempt < MAX_ATTEMPTS) {
                    console.warn(`Attempt ${attempt}/${MAX_ATTEMPTS} failed for ${sourceUrl}: ${message} — retrying`);
                    await delay(RETRY_DELAY_MS * attempt);
                    continue;
                }

                failedCount += 1;
                console.error(`Failed to import ${sourceUrl} after ${MAX_ATTEMPTS} attempts`);
                console.error(message);
            }
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

    if (output.templates.length < existingById.size) {
        throw new Error(
            `Refusing to write a smaller catalog: ${existingById.size} templates on disk, ${output.templates.length} after import. The import is meant to be additive — this is a bug.`,
        );
    }

    await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");

    console.log(
        `Catalog: ${existingById.size} -> ${output.templates.length} templates in ${path.relative(projectRoot, OUTPUT_PATH)}`,
    );
    console.log(`  added:   ${stats.added.length}${stats.added.length ? ` (${stats.added.join(", ")})` : ""}`);
    console.log(`  updated: ${stats.updated.length}`);
    console.log(`  kept untouched: ${existingById.size - stats.updated.length}`);

    if (stats.rejected.length) {
        console.warn(`  rejected ${stats.rejected.length} unusable record(s):`);
        for (const entry of stats.rejected) {
            console.warn(`    - ${entry.id} "${entry.title}" — ${entry.reason}`);
        }
    }

    if (failedCount) {
        console.warn(`  failed sources: ${failedCount}/${urls.length} (existing records for them were kept)`);
    }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    importThemeForestUrls().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}

export { importThemeForestUrls, isCategoryUrl, isItemUrl, parseThemeForestUrl };
