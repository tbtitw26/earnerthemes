import { themeforestTemplates } from "@/data/themeforestTemplates";
import { ThemeTemplate } from "@/types/theme-template";

function normalizeTemplateRef(value?: string) {
    return value?.trim().toLowerCase() || "";
}

export const templateCatalogService = {
    findTemplateByIdOrSlug(input: { templateId?: string; templateSlug?: string }): ThemeTemplate | null {
        const templateId = normalizeTemplateRef(input.templateId);
        const templateSlug = normalizeTemplateRef(input.templateSlug);

        if (!templateId && !templateSlug) {
            return null;
        }

        return (
            themeforestTemplates.templates.find((template) => {
                return (
                    normalizeTemplateRef(template.id) === templateId ||
                    normalizeTemplateRef(template.slug) === templateSlug
                );
            }) || null
        );
    },
};
