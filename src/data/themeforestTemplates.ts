import importedTemplates from "@/data/themeforest-templates.json";
import descriptionOverrides from "@/data/template-descriptions.json";
import licenceOverrides from "@/data/template-licences.json";
import priceOverrides from "@/data/template-prices.json";
import {
    buildFallbackDescription,
    buildShortDescription,
    cleanImportedDescription,
    sanitizeBuilder,
} from "@/data/templateContent";
import { ThemeTemplate, ThemeTemplateCollection, ThemeTemplateLicence } from "@/types/theme-template";
import { isSupportedCurrency } from "@/utils/money";

interface DescriptionOverride {
    description: string;
    shortDescription?: string;
}

interface PriceOverride {
    price: number;
    currency: string;
}

const descriptions = descriptionOverrides as Record<string, DescriptionOverride>;
const licences = licenceOverrides as Record<string, ThemeTemplateLicence | string>;
const prices = priceOverrides as Record<string, PriceOverride | string>;

function resolveLicence(id: string): ThemeTemplateLicence | undefined {
    const entry = licences[id];
    return entry && typeof entry === "object" ? entry : undefined;
}

/**
 * Entry-level price tiers are maintained by hand in template-prices.json, because
 * the importer can only report the Author's catalog price. A malformed entry is
 * ignored rather than applied, so a typo cannot mis-charge a customer: the
 * backend charges from this same resolved record.
 */
function resolvePrice(template: ThemeTemplate): Pick<ThemeTemplate, "price" | "currency"> {
    const entry = prices[template.id];

    if (!entry || typeof entry !== "object") {
        return { price: template.price, currency: template.currency };
    }

    if (!Number.isFinite(entry.price) || entry.price <= 0 || !isSupportedCurrency(entry.currency)) {
        return { price: template.price, currency: template.currency };
    }

    return { price: entry.price, currency: entry.currency };
}

/**
 * The imported JSON is a build artifact and some records arrive with an empty
 * or scraper-polluted description. Product pages must never show an incomplete
 * description, so every record is resolved here:
 * curated override → cleaned imported copy → factual fallback.
 */
function resolveTemplate(template: ThemeTemplate): ThemeTemplate {
    const override = descriptions[template.id];
    const importedDescription = cleanImportedDescription(template.description);
    const description = override?.description?.trim() || importedDescription || buildFallbackDescription(template);

    const builder = sanitizeBuilder(template.platform, template.tech.builder, `${template.title} ${description}`);
    const { price, currency } = resolvePrice(template);

    return {
        ...template,
        price,
        currency,
        description,
        shortDescription:
            override?.shortDescription?.trim() ||
            cleanImportedDescription(template.shortDescription) ||
            buildShortDescription(description),
        tech: {
            ...template.tech,
            builder,
        },
        licence: resolveLicence(template.id),
    };
}

const collection = importedTemplates as ThemeTemplateCollection;

export const themeforestTemplates: ThemeTemplateCollection = {
    templates: collection.templates.map(resolveTemplate),
};
