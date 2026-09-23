export interface ThemeTemplateTech {
    language: string;
    builder?: string;
}

/**
 * Licence terms shown on the product page and at checkout. Defaults come from
 * `src/resources/licence.ts`; per-product overrides live in
 * `src/data/template-licences.json` and must be disclosed before purchase.
 */
export interface ThemeTemplateLicence {
    /** Licence name, when a product is not sold under the Standard Licence. */
    name?: string;
    /** Number of Production Websites the licence covers. Defaults to 1. */
    productionWebsites?: number;
    /** Number of End Products the licence covers. Defaults to 1. */
    endProducts?: number;
    /** Product-Specific Terms that apply on top of the Licence Agreement. */
    productTerms?: string[];
}

export interface ThemeTemplate {
    id: string;
    slug: string;
    title: string;
    platform: string;
    category: string;
    author: string;
    price: number;
    currency: string;
    sales: number;
    createdAt: string;
    updatedAt?: string;
    coverImage: string;
    gallery?: string[];
    description: string;
    shortDescription?: string;
    tech: ThemeTemplateTech;
    livePreviewUrl?: string;
    isFeatured?: boolean;
    sourceUrl: string;
    licence?: ThemeTemplateLicence;
}

export interface ThemeTemplateCollection {
    templates: ThemeTemplate[];
}
