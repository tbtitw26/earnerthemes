import { IconKey } from "@/resources/icons";

export type CourseExtraId =
    | "extendedDepth"
    | "weeklyVariations"
    | "personalAdjustments"
    | "progressionPath"
    | "shoppingPrep"
    | "chefNotes";

export type CourseExtra = {
    id: CourseExtraId;
    title: string;
    description: string;
    amount: number;
    icon: IconKey;
    chefOnly?: boolean;
};

export const COURSE_EXTRAS: CourseExtra[] = [
    {
        id: "extendedDepth",
        title: "Extended Curriculum Depth",
        description: "In-depth explanations, techniques, mistakes, and alternatives inside your PDF.",
        amount: 0.3,
        icon: "brain",
    },
    {
        id: "weeklyVariations",
        title: "Weekly Recipe Variations",
        description: "2–3 variations per week added directly to the PDF.",
        amount: 0.2,
        icon: "flex",
    },
    {
        id: "personalAdjustments",
        title: "Personalized Adjustments",
        description: "Custom sections adapted to your skill level and dietary preferences.",
        amount: 0.25,
        icon: "settings",
    },
    {
        id: "progressionPath",
        title: "Progression Path",
        description: "Clear roadmap for what to learn next after completing the course.",
        amount: 0.2,
        icon: "path",
    },
    {
        id: "shoppingPrep",
        title: "Shopping & Meal Prep Guide",
        description: "Optimized shopping lists and preparation tips included in PDF.",
        amount: 0.15,
        icon: "priceTag",
    },
    {
        id: "chefNotes",
        title: "Chef Notes",
        description: "Professional chef insights and personal tips added to the PDF.",
        amount: 0.4,
        icon: "chef",
        chefOnly: true,
    },
];
