import type { Metadata } from "next";
import { notFound } from "next/navigation";

import TemplateDetailsPage from "@/components/templates/details/TemplateDetailsPage";
import { findTemplateBySlug } from "@/data/themeforestTemplateHelpers";
import { themeforestTemplates } from "@/data/themeforestTemplates";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateStaticParams() {
    return themeforestTemplates.templates.map((template) => ({
        slug: template.slug || template.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const template = findTemplateBySlug(slug);

    if (!template) {
        return {
            title: "Template Not Found",
        };
    }

    return {
        title: `${template.title} | Templates`,
        description: template.shortDescription || template.description,
        alternates: {
            canonical: `/templates/${template.slug || template.id}`,
        },
    };
}

export default async function TemplateDetailsRoute({ params }: PageProps) {
    const { slug } = await params;
    const template = findTemplateBySlug(slug);

    if (!template) {
        notFound();
    }

    return <TemplateDetailsPage template={template} />;
}
