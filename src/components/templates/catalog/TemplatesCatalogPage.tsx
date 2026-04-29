"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Funnel, Search, SlidersHorizontal, X } from "lucide-react";

import { ThemeTemplate } from "@/types/theme-template";

import TemplateCard from "./TemplateCard";
import styles from "./TemplatesCatalogPage.module.scss";

type SortOption =
    | "recommended"
    | "newest"
    | "oldest"
    | "price-asc"
    | "price-desc"
    | "sales-desc"
    | "title-asc"
    | "title-desc";

interface TemplatesCatalogPageProps {
    templates: ThemeTemplate[];
}

const PER_PAGE_OPTIONS = [12, 24, 48, 96];

const SALES_FILTERS = [
    { value: "all", label: "All popularity" },
    { value: "1000", label: "1K+ sales" },
    { value: "10000", label: "10K+ sales" },
    { value: "50000", label: "50K+ sales" },
];

function toTimestamp(value?: string) {
    if (!value) {
        return 0;
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

function getPriceBounds(templates: ThemeTemplate[]) {
    const prices = templates.map((template) => template.price).filter((price) => Number.isFinite(price));

    return {
        min: Math.min(...prices),
        max: Math.max(...prices),
    };
}

function getFacetCounts(
    templates: ThemeTemplate[],
    getValue: (template: ThemeTemplate) => string,
) {
    return templates.reduce<Record<string, number>>((acc, template) => {
        const value = getValue(template);
        if (!value) {
            return acc;
        }

        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
}

function toggleValue(current: string[], value: string) {
    return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}

function formatPrice(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

function formatNumber(value: number) {
    return new Intl.NumberFormat("en-US").format(value);
}

function normalizeQuery(value: string) {
    return value.trim().toLowerCase();
}

function buildPageNumbers(current: number, total: number): (number | "...")[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    if (current > 3) {
        pages.push("...");
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (current < total - 2) {
        pages.push("...");
    }

    pages.push(total);
    return pages;
}

function matchesFacet(values: string[], value?: string) {
    if (!values.length) {
        return true;
    }

    return value ? values.includes(value) : false;
}

export default function TemplatesCatalogPage({ templates }: TemplatesCatalogPageProps) {
    const priceBounds = useMemo(() => getPriceBounds(templates), [templates]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("recommended");
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBuilders, setSelectedBuilders] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [salesThreshold, setSalesThreshold] = useState("all");
    const [minPrice, setMinPrice] = useState(priceBounds.min);
    const [maxPrice, setMaxPrice] = useState(priceBounds.max);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [perPage, setPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const deferredSearch = useDeferredValue(search);

    const searchQuery = normalizeQuery(deferredSearch);

    const templatesForSearch = useMemo(() => {
        if (!searchQuery) {
            return templates;
        }

        return templates.filter((template) => {
            const haystack = [
                template.title,
                template.author,
                template.platform,
                template.category,
                template.tech.language,
                template.tech.builder || "",
                template.description,
            ]
                .join(" ")
                .toLowerCase();

            return haystack.includes(searchQuery);
        });
    }, [templates, searchQuery]);

    const filteredTemplates = useMemo(() => {
        const minSales = Number(salesThreshold);

        const next = templatesForSearch.filter((template) => {
            if (!matchesFacet(selectedPlatforms, template.platform)) {
                return false;
            }

            if (!matchesFacet(selectedCategories, template.category)) {
                return false;
            }

            if (!matchesFacet(selectedBuilders, template.tech.builder || "")) {
                return false;
            }

            if (!matchesFacet(selectedLanguages, template.tech.language)) {
                return false;
            }

            if (template.price < minPrice || template.price > maxPrice) {
                return false;
            }

            if (minSales && template.sales < minSales) {
                return false;
            }

            return true;
        });

        const sorted = [...next];

        sorted.sort((left, right) => {
            if (sortBy === "newest") {
                return toTimestamp(right.updatedAt || right.createdAt) - toTimestamp(left.updatedAt || left.createdAt);
            }

            if (sortBy === "oldest") {
                return toTimestamp(left.createdAt) - toTimestamp(right.createdAt);
            }

            if (sortBy === "price-asc") {
                return left.price - right.price;
            }

            if (sortBy === "price-desc") {
                return right.price - left.price;
            }

            if (sortBy === "sales-desc") {
                return right.sales - left.sales;
            }

            if (sortBy === "title-asc") {
                return left.title.localeCompare(right.title);
            }

            if (sortBy === "title-desc") {
                return right.title.localeCompare(left.title);
            }

            const featuredDelta = Number(Boolean(right.isFeatured)) - Number(Boolean(left.isFeatured));
            if (featuredDelta !== 0) {
                return featuredDelta;
            }

            const salesDelta = right.sales - left.sales;
            if (salesDelta !== 0) {
                return salesDelta;
            }

            return toTimestamp(right.updatedAt || right.createdAt) - toTimestamp(left.updatedAt || left.createdAt);
        });

        return sorted;
    }, [
        maxPrice,
        minPrice,
        salesThreshold,
        selectedBuilders,
        selectedCategories,
        selectedLanguages,
        selectedPlatforms,
        sortBy,
        templatesForSearch,
    ]);

    const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / perPage));

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredTemplates.length, perPage]);

    const paginatedTemplates = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filteredTemplates.slice(start, start + perPage);
    }, [filteredTemplates, currentPage, perPage]);

    const platformCounts = useMemo(() => getFacetCounts(templatesForSearch, (template) => template.platform), [templatesForSearch]);
    const categoryCounts = useMemo(() => getFacetCounts(templatesForSearch, (template) => template.category), [templatesForSearch]);
    const builderCounts = useMemo(
        () => getFacetCounts(templatesForSearch, (template) => template.tech.builder || ""),
        [templatesForSearch],
    );
    const languageCounts = useMemo(
        () => getFacetCounts(templatesForSearch, (template) => template.tech.language),
        [templatesForSearch],
    );

    const platforms = useMemo(() => Object.keys(platformCounts).sort(), [platformCounts]);
    const categories = useMemo(() => Object.keys(categoryCounts).sort(), [categoryCounts]);
    const builders = useMemo(() => Object.keys(builderCounts).sort(), [builderCounts]);
    const languages = useMemo(() => Object.keys(languageCounts).sort(), [languageCounts]);

    const activeFilters = useMemo(() => {
        const next = [
            ...selectedPlatforms.map((value) => ({ key: "platform", value })),
            ...selectedCategories.map((value) => ({ key: "category", value })),
            ...selectedBuilders.map((value) => ({ key: "builder", value })),
            ...selectedLanguages.map((value) => ({ key: "language", value })),
        ];

        if (salesThreshold !== "all") {
            next.push({ key: "sales", value: `${formatNumber(Number(salesThreshold))}+ sales` });
        }

        if (minPrice !== priceBounds.min || maxPrice !== priceBounds.max) {
            next.push({ key: "price", value: `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}` });
        }

        if (searchQuery) {
            next.push({ key: "search", value: `Search: ${deferredSearch}` });
        }

        return next;
    }, [
        deferredSearch,
        maxPrice,
        minPrice,
        priceBounds.max,
        priceBounds.min,
        salesThreshold,
        searchQuery,
        selectedBuilders,
        selectedCategories,
        selectedLanguages,
        selectedPlatforms,
    ]);

    function clearFilters() {
        setSearch("");
        setSortBy("recommended");
        setSelectedPlatforms([]);
        setSelectedCategories([]);
        setSelectedBuilders([]);
        setSelectedLanguages([]);
        setSalesThreshold("all");
        setMinPrice(priceBounds.min);
        setMaxPrice(priceBounds.max);
    }

    function renderFacet(
        title: string,
        options: string[],
        selected: string[],
        counts: Record<string, number>,
        onToggle: (value: string) => void,
    ) {
        return (
            <section className={styles.filterGroup}>
                <h3>{title}</h3>
                <div className={styles.optionList}>
                    {options.map((option) => (
                        <label key={option} className={styles.optionItem}>
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => onToggle(option)}
                            />
                            <span>{option}</span>
                            <strong>{counts[option]}</strong>
                        </label>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <div className={styles.page}>
            <section className={styles.hero}>

                <div className={styles.heroTop}>
                    <div className={styles.heroCopy}>
                        <p className={styles.kicker}>Digital Assets Marketplace</p>
                        <h1>Browse premium Shopify and WordPress templates in one catalog.</h1>
                        <p className={styles.subtitle}>
                            Imported ThemeForest inventory, normalized for quick comparison, fast filtering,
                            and marketplace-style browsing.
                        </p>
                    </div>

                    <div className={styles.heroStats}>
                        <div>
                            <span>Total Templates</span>
                            <strong>{formatNumber(templates.length)}</strong>
                        </div>
                        <div>
                            <span>Platforms</span>
                            <strong>{platforms.length}</strong>
                        </div>
                        <div>
                            <span>Categories</span>
                            <strong>{categories.length}</strong>
                        </div>
                    </div>
                </div>

                <div className={styles.toolbar}>
                    <label className={styles.searchField}>
                        <Search size={18} />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by title, author, platform, category..."
                            aria-label="Search templates"
                        />
                    </label>

                    <div className={styles.toolbarActions}>
                        <button type="button" className={styles.mobileFiltersButton} onClick={() => setMobileFiltersOpen(true)}>
                            <Funnel size={16} />
                            Filters
                        </button>

                        <label className={styles.sortSelect}>
                            <span>Sort by:</span>
                            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)}>
                                <option value="recommended">Recommended</option>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="sales-desc">Best Selling</option>
                                <option value="title-asc">A-Z</option>
                                <option value="title-desc">Z-A</option>
                            </select>
                        </label>
                    </div>
                </div>
            </section>

            <div className={styles.catalogLayout}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarInner}>
                        <div className={styles.sidebarHeader}>
                            <div>
                                <p>Refine Results</p>
                                <strong>{formatNumber(filteredTemplates.length)} matches</strong>
                            </div>
                            <button type="button" onClick={clearFilters} className="clear-all-btn">
                                Clear all
                            </button>
                        </div>

                        {renderFacet("Platform", platforms, selectedPlatforms, platformCounts, (value) =>
                            setSelectedPlatforms((current) => toggleValue(current, value)),
                        )}
                        {renderFacet("Category", categories, selectedCategories, categoryCounts, (value) =>
                            setSelectedCategories((current) => toggleValue(current, value)),
                        )}

                        <section className={styles.filterGroup}>
                            <h3>Price Range</h3>
                            <div className={styles.priceSummary}>
                                <div>
                                    <span>Min</span>
                                    <strong>{formatPrice(minPrice)}</strong>
                                </div>
                                <div>
                                    <span>Max</span>
                                    <strong>{formatPrice(maxPrice)}</strong>
                                </div>
                            </div>

                            <div className={styles.rangeTrack}>
                                <div
                                    className={styles.rangeFill}
                                    style={{
                                        left: `${((minPrice - priceBounds.min) / (priceBounds.max - priceBounds.min || 1)) * 100}%`,
                                        right: `${100 - ((maxPrice - priceBounds.min) / (priceBounds.max - priceBounds.min || 1)) * 100}%`,
                                    }}
                                />
                            </div>

                            <div className={styles.rangeInputs}>
                                <input
                                    type="range"
                                    min={priceBounds.min}
                                    max={priceBounds.max}
                                    value={minPrice}
                                    onChange={(event) =>
                                        setMinPrice(Math.min(Number(event.target.value), maxPrice))
                                    }
                                />
                                <input
                                    type="range"
                                    min={priceBounds.min}
                                    max={priceBounds.max}
                                    value={maxPrice}
                                    onChange={(event) =>
                                        setMaxPrice(Math.max(Number(event.target.value), minPrice))
                                    }
                                />
                            </div>

                            <div className={styles.priceFields}>
                                <label>
                                    <span>Min</span>
                                    <input
                                        type="number"
                                        value={minPrice}
                                        min={priceBounds.min}
                                        max={maxPrice}
                                        onChange={(event) =>
                                            setMinPrice(Math.min(Number(event.target.value) || priceBounds.min, maxPrice))
                                        }
                                    />
                                </label>
                                <label>
                                    <span>Max</span>
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        min={minPrice}
                                        max={priceBounds.max}
                                        onChange={(event) =>
                                            setMaxPrice(Math.max(Number(event.target.value) || priceBounds.max, minPrice))
                                        }
                                    />
                                </label>
                            </div>
                        </section>

                        <section className={styles.filterGroup}>
                            <h3>Popularity</h3>
                            <div className={styles.optionList}>
                                {SALES_FILTERS.map((option) => (
                                    <label key={option.value} className={styles.optionItem}>
                                        <input
                                            type="radio"
                                            name="sales-threshold"
                                            checked={salesThreshold === option.value}
                                            onChange={() => setSalesThreshold(option.value)}
                                        />
                                        <span>{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {renderFacet("Builder", builders, selectedBuilders, builderCounts, (value) =>
                            setSelectedBuilders((current) => toggleValue(current, value)),
                        )}
                        {renderFacet("Language", languages, selectedLanguages, languageCounts, (value) =>
                            setSelectedLanguages((current) => toggleValue(current, value)),
                        )}
                    </div>
                </aside>

                <section className={styles.results}>
                    <div className={styles.resultsHeader}>
                        <div>
                            <p className={styles.resultsEyebrow}>Catalog Results</p>
                            <h2>{formatNumber(filteredTemplates.length)} templates ready to browse</h2>
                        </div>
                        <div className={styles.resultsMeta}>
                            <SlidersHorizontal size={16} />
                            <span>{sortBy.replace("-", " ")}</span>
                        </div>
                    </div>

                    {activeFilters.length ? (
                        <div className={styles.activeFilters}>
                            {activeFilters.map((filter) => (
                                <span key={`${filter.key}-${filter.value}`} className={styles.filterChip}>
                                    {filter.value}
                                </span>
                            ))}
                        </div>
                    ) : null}

                    {filteredTemplates.length ? (
                        <>
                            <div className={styles.grid}>
                                {paginatedTemplates.map((template) => (
                                    <TemplateCard key={template.id} template={template} />
                                ))}
                            </div>

                            <div className={styles.pagination}>
                                <div className={styles.perPage}>
                                    <span>Show:</span>
                                    {PER_PAGE_OPTIONS.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            className={perPage === option ? styles.perPageActive : undefined}
                                            onClick={() => setPerPage(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className={styles.paginationControls}>
                                        <button
                                            type="button"
                                            disabled={currentPage <= 1}
                                            onClick={() => setCurrentPage((p) => p - 1)}
                                            aria-label="Previous page"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>

                                        {buildPageNumbers(currentPage, totalPages).map((page, i) =>
                                            page === "..." ? (
                                                <span key={`ellipsis-${i}`} className={styles.ellipsis}>...</span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    type="button"
                                                    className={currentPage === page ? styles.pageActive : undefined}
                                                    onClick={() => setCurrentPage(page as number)}
                                                >
                                                    {page}
                                                </button>
                                            ),
                                        )}

                                        <button
                                            type="button"
                                            disabled={currentPage >= totalPages}
                                            onClick={() => setCurrentPage((p) => p + 1)}
                                            aria-label="Next page"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>
                                <Search size={22} />
                            </div>
                            <h3>No templates match this filter set.</h3>
                            <p>Try widening the price range, clearing a facet, or searching for a broader keyword.</p>
                            <button type="button" onClick={clearFilters}>
                                Reset filters
                            </button>
                        </div>
                    )}
                </section>
            </div>

            {mobileFiltersOpen ? (
                <div className={styles.mobileOverlay} onClick={() => setMobileFiltersOpen(false)}>
                    <div className={styles.mobileSheet} onClick={(event) => event.stopPropagation()}>
                        <div className={styles.mobileSheetHeader}>
                            <div>
                                <p>Filters</p>
                                <strong>{formatNumber(filteredTemplates.length)} results</strong>
                            </div>
                            <button type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                                <X size={20} />
                            </button>
                        </div>

                        <div className={styles.mobileSheetBody}>
                            {renderFacet("Platform", platforms, selectedPlatforms, platformCounts, (value) =>
                                setSelectedPlatforms((current) => toggleValue(current, value)),
                            )}
                            {renderFacet("Category", categories, selectedCategories, categoryCounts, (value) =>
                                setSelectedCategories((current) => toggleValue(current, value)),
                            )}
                            {renderFacet("Builder", builders, selectedBuilders, builderCounts, (value) =>
                                setSelectedBuilders((current) => toggleValue(current, value)),
                            )}
                            {renderFacet("Language", languages, selectedLanguages, languageCounts, (value) =>
                                setSelectedLanguages((current) => toggleValue(current, value)),
                            )}
                        </div>

                        <div className={styles.mobileSheetFooter}>
                            <button type="button" className={styles.ghostButton} onClick={clearFilters}>
                                Clear all
                            </button>
                            <button type="button" className={styles.primaryButton} onClick={() => setMobileFiltersOpen(false)}>
                                View {formatNumber(filteredTemplates.length)} results
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
