import { Suspense } from "react";
import type { Metadata } from "next";

import TemplatesCatalogPage from "@/components/templates/catalog/TemplatesCatalogPage";
import { themeforestTemplates } from "@/data/themeforestTemplates";

export const metadata: Metadata = {
    title: "Templates Catalog",
    description: "Browse imported WordPress, Shopify and HTML templates with fast search, filters, and sorting.",
    alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
    // The catalog reads the ?platform=/?category= link parameters, so it renders
    // inside a Suspense boundary.
    return (
        <Suspense fallback={null}>
            <TemplatesCatalogPage templates={themeforestTemplates.templates} />
        </Suspense>
    );
}
