import type { Metadata } from "next";

import TemplatesCatalogPage from "@/components/templates/catalog/TemplatesCatalogPage";
import { themeforestTemplates } from "@/data/themeforestTemplates";

export const metadata: Metadata = {
    title: "Templates Catalog",
    description: "Browse imported WordPress and Shopify templates with fast search, filters, and sorting.",
    alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
    return <TemplatesCatalogPage templates={themeforestTemplates.templates} />;
}
