import importedTemplates from "@/data/themeforest-templates.json";
import descriptionOverrides from "@/data/template-descriptions.json";
import licenceOverrides from "@/data/template-licences.json";
import {
    buildFallbackDescription,
    buildShortDescription,
    cleanImportedDescription,
    sanitizeBuilder,
} from "@/data/templateContent";
import { ThemeTemplate, ThemeTemplateCollection, ThemeTemplateLicence } from "@/types/theme-template";

interface DescriptionOverride {
    description: string;
    shortDescription?: string;
}

const descriptions = descriptionOverrides as Record<string, DescriptionOverride>;
const licences = licenceOverrides as Record<string, ThemeTemplateLicence | string>;

function resolveLicence(id: string): ThemeTemplateLicence | undefined {
    const entry = licences[id];
    return entry && typeof entry === "object" ? entry : undefined;
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

    return {
        ...template,
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
