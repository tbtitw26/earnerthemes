import { themeforestTemplates } from "@/data/themeforestTemplates";
import { ThemeTemplate } from "@/types/theme-template";

function toTimestamp(value?: string) {
    if (!value) {
        return 0;
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

export function getTemplateHref(template: ThemeTemplate) {
    return `/templates/${template.slug || template.id}`;
}

export function findTemplateBySlug(slug: string, templates: ThemeTemplate[] = themeforestTemplates.templates) {
    return templates.find((template) => template.slug === slug) ?? templates.find((template) => template.id === slug) ?? null;
}

export function getRelatedTemplates(
    currentTemplate: ThemeTemplate,
    templates: ThemeTemplate[] = themeforestTemplates.templates,
    limit = 4,
) {
    return templates
        .filter((template) => template.id !== currentTemplate.id)
        .sort((left, right) => {
            const leftScore =
                Number(left.category === currentTemplate.category) * 3 +
                Number(left.platform === currentTemplate.platform) * 2 +
                Number(Boolean(left.isFeatured));
            const rightScore =
                Number(right.category === currentTemplate.category) * 3 +
                Number(right.platform === currentTemplate.platform) * 2 +
                Number(Boolean(right.isFeatured));

            if (rightScore !== leftScore) {
                return rightScore - leftScore;
            }

            const salesDelta = right.sales - left.sales;
            if (salesDelta !== 0) {
                return salesDelta;
            }

            return toTimestamp(right.updatedAt || right.createdAt) - toTimestamp(left.updatedAt || left.createdAt);
        })
        .slice(0, limit);
}
