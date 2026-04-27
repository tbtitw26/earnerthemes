export interface ThemeTemplateTech {
    language: string;
    builder?: string;
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
}

export interface ThemeTemplateCollection {
    templates: ThemeTemplate[];
}
