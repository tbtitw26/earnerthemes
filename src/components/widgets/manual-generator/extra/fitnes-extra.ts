import { IconKey } from "@/resources/icons";

export type FitnessExtraId =
    | "warmupCooldown"
    | "exerciseLibrary"
    | "progressionAuto"
    | "injurySafeAlternatives"
    | "nutritionMacros"
    | "formVideoChecklist"
    | "weeklyCheckins"
    | "coachNotes";

export type FitnessExtra = {
    id: FitnessExtraId;
    title: string;
    description: string;
    amount: number;
    icon: IconKey;
    coachOnly?: boolean;
};

export const FITNESS_EXTRAS: FitnessExtra[] = [
    {
        id: "warmupCooldown",
        title: "Warm-up + Cool-down Protocols",
        description: "Personalized warm-ups, mobility work, and cool-downs for each workout.",
        amount: 9,
        icon: "flex",
    },
    {
        id: "exerciseLibrary",
        title: "Exercise Library (PDF)",
        description: "Technique, cues, tempo, common mistakes, and substitutions for each exercise.",
        amount: 3,
        icon: "brain",
    },
    {
        id: "progressionAuto",
        title: "Progression Rules",
        description: "How to progress: weight/reps/sets, deload week, and how to handle plateaus.",
        amount: 5,
        icon: "path",
    },
    {
        id: "injurySafeAlternatives",
        title: "Joint-Safe Alternatives",
        description: "Alternatives for knees/back/shoulders + simple risk-reduction guidelines.",
        amount: 10,
        icon: "settings",
    },
    {
        id: "nutritionMacros",
        title: "Nutrition & Macros Guide",
        description: "Calorie target and macros + simple nutrition rules aligned with your goal.",
        amount: 9,
        icon: "priceTag",
    },
    {
        id: "weeklyCheckins",
        title: "Weekly Check-in Template",
        description: "Weekly check-in template: sleep/stress/DOMS/weights/training volume.",
        amount: 4,
        icon: "calendar", // if there's no 'calendar' icon, use 'path'
    },
    {
        id: "coachNotes",
        title: "Coach Notes",
        description: "Coach notes: key cues, intensity guidance, and personalized focus points.",
        amount: 5,
        icon: "chef", // if there's no 'coach' icon, use 'chef' or 'brain'
        coachOnly: true,
    },
];
