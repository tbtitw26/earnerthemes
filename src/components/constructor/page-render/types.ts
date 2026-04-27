import React, {CSSProperties} from "react";
import {StaticImageData} from "next/image";

export type TextBlock = {
    type: "text";
    title?: string;
    description?: string;
    bullets?: string[];
    centerTitle?: boolean;
    centerDescription?: boolean;
    centerBullets?: boolean;
};

export type ContactFormBlock = {
    type: "custom";
    component: "ContactForm";
    title?: string;
    description?: string;
};

export type OgImageInput =
    | string
    | { title?: string; description?: string; bg?: string; color?: string };

export type MetaSchema = {
    title: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: OgImageInput;
};

export type MediaBlock = {
    type: "media";
    mediaType: "image" | "video";
    src: string;
    width?: string;
    height?: string;
    alt?: string;
    controls?: boolean;
    loop?: boolean;
    autoPlay?: boolean;
    muted?: boolean;

    hoverEnabled?: boolean;
    hoverText?: string;
    hoverButton?: { text: string; link: string };
};

export type SliderBlock = {
    type: "slider";
    images: string[];
};

export type FaqBlock = {
    type: "faq";
    image?: string;
    items: { question: string; answer: string }[];
};

export type CardBlock = {
    type: "card";
    image?: string;
    icon?: string | React.ReactNode;
    title: string;
    description: string;
    buttonLink: string;
    buttonText: string;
};

export type AlignInput = "left" | "right" | "center" | "start" | "end";

export type SectionBlock = {
    type: "section";
    title?: string;
    description?: string;
    align?: AlignInput;
    gap?: string;
    left?: PageBlock;
    right?: PageBlock;
};

export type GridItem = {
    block: PageBlock;
    colSpan?: number;
    key?: string;
};

export type LegacyCard = {
    image?: string;                  // ⬅️ optional
    icon?: string | React.ReactNode; // ⬅️ NEW
    title: string;
    description: string;
    buttonLink?: string;
    buttonText?: string;
};

export type GridBlock = {
    type: "grid";

    title?: string;
    description?: string;

    columns: number;
    gap?: string;
    style?: CSSProperties;
    items?: GridItem[];
    cards?: LegacyCard[];
};

export type PricingBlock = {
    type: "pricing";
    variant?: "basic" | "highlight" | "premium";
    title: string;
    amount?: number;
    price?: string;
    tokens?: number;
    description: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
    badgeTop?: string;
    badgeBottom?: string;
};

// ---------------- Custom Blocks ----------------

export type MissionBannerBlock = {
    type: "custom";
    component: "MissionBanner";
    title: string;
    description: string;
    image?: string;
};

export type InfoBlock = {
    type: "custom";
    component: "InfoBlock";
    title?: string;
    description?: string;
    icon?: string | React.ReactNode;       // emoji або svg-клас
    image?: string;      // ключ з media
    bullets?: string[];
    align?: "left" | "center" | "right";
};

export type ValuesIconsBlock = {
    type: "custom";
    component: "ValuesIcons";
    title?: string;
    description?: string; // ✅ тепер можна передавати опис секції
    values: {
        icon: string | React.ReactNode;
        title: string;
        text?: string;
        description?: string; // ✅ дозволяємо description для item
    }[];
};


export type StoryTimelineBlock = {
    type: "custom";
    component: "StoryTimeline";
    steps: { year?: string; title: string; description: string }[];
};

export type TeamGridBlock = {
    type: "custom";
    component: "TeamGrid";
    title?: string;
    description?: string;
    members: {
        name: string;
        role: string;
        bio: string;
        image: string
    }[];
};


export type CardSliderBlock = {
    type: "custom";
    component: "CardSlider";
    cards: {
        image: string;
        title: string;
        description: string;
        buttonText?: string;
        buttonLink?: string;
    }[];
};

export type HighlightStripBlock = {
    type: "custom";
    component: "HighlightStrip";
    items: {
        image?: string;
        icon?: string;
        text?: string;
        subtext?: string;
        color?: string;
    }[];
};

export type MarqueeBlock = {
    type: "custom";
    component: "Marquee";
    items: { text: string }[];
};

export type VideoDemoBlock = {
    type: "custom";
    component: "VideoDemo";
    title?: string;
    description?: string;
    video: string;
};


export type TimelineBlock = {
    type: "custom";
    component: "Timeline";
    title?: string;
    steps: { title: string; description: string, link?: string }[];
};


export type LogoBlock = {
    type: "custom";
    component: "LogoBlock";
    width?: number;
    height?: number;
};

export type HeroSectionBlock = {
    type: "custom";
    component: "HeroSection";
    title: string;
    highlight?: string;
    description: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
    image?: string;
    mediaType?: "image" | "video";
    align?: "left" | "right";
    showTrustBadge?: boolean;
};

export type TextWithButtonBlock = {
    type: "custom";
    component: "TextWithButton";
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    align?: "left" | "center" | "right";
};


export type LogoStripBlock = {
    type: "custom";
    component: "LogoStrip";
    title?: string;
    logos: { src: string; alt?: string; width?: number; height?: number }[];
};


export type TestimonialsSliderBlock = {
    type: "custom";
    component: "TestimonialsSlider";
    title?: string;
    description?: string;
    testimonials: {
        name: string;
        role?: string;
        image?: string;
        text: string;
        rating?: number;
    }[];
};

// ---------------- Union Types ----------------

export type CustomBlock =
    | MissionBannerBlock
    | ValuesIconsBlock
    | StoryTimelineBlock
    | TeamGridBlock
    | CardSliderBlock
    | HighlightStripBlock
    | MarqueeBlock
    | ContactFormBlock
    | TimelineBlock
    | LogoBlock
    | HeroSectionBlock
    | TestimonialsSliderBlock
    | VideoDemoBlock
    | TextWithButtonBlock
    | InfoBlock;

export type PageBlock =
    | TextBlock
    | MediaBlock
    | SliderBlock
    | FaqBlock
    | CardBlock
    | SectionBlock
    | PricingBlock
    | GridBlock
    | CustomBlock;

export type PageSchema = {
    meta: MetaSchema;
    blocks: PageBlock[];
};
