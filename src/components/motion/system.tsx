"use client";

import { useRef } from "react";
import {
    useReducedMotion,
    useScroll,
    useTransform,
    type Variants,
} from "framer-motion";

type RevealDirection = "up" | "down" | "left" | "right";

type RevealOptions = {
    direction?: RevealDirection;
    distance?: number;
    duration?: number;
    delay?: number;
    scale?: number;
    opacity?: number;
};

type ViewportOptions = {
    amount?: number;
    margin?: string;
    once?: boolean;
};

const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const motionViewport = {
    once: true,
    amount: 0.24,
} as const;

function getAxisOffset(direction: RevealDirection, distance: number, reduced: boolean) {
    if (reduced) {
        return { x: 0, y: 0 };
    }

    switch (direction) {
        case "left":
            return { x: distance, y: 0 };
        case "right":
            return { x: -distance, y: 0 };
        case "down":
            return { x: 0, y: -distance };
        case "up":
        default:
            return { x: 0, y: distance };
    }
}

function buildRevealVariant(
    reducedValue: boolean | null,
    {
        direction = "up",
        distance = 28,
        duration = 0.72,
        delay = 0,
        scale = 1,
        opacity = 0.001,
    }: RevealOptions = {},
): Variants {
    const reduced = Boolean(reducedValue);
    const axis = getAxisOffset(direction, distance, reduced);

    return {
        hidden: {
            opacity: reduced ? 1 : opacity,
            x: axis.x,
            y: axis.y,
            scale: reduced ? 1 : scale,
            filter: reduced ? "none" : "blur(0px)",
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: reduced ? 0.01 : duration,
                delay: reduced ? 0 : delay,
                ease: MOTION_EASE,
            },
        },
    };
}

export function sectionReveal(reduced: boolean | null): Variants {
    return buildRevealVariant(reduced, {
        distance: 20,
        duration: 0.7,
        opacity: 0.001,
    });
}

export function headingReveal(reduced: boolean | null): Variants {
    return buildRevealVariant(reduced, {
        distance: 26,
        duration: 0.68,
    });
}

export function contentReveal(
    reduced: boolean | null,
    direction: RevealDirection = "up",
): Variants {
    return buildRevealVariant(reduced, {
        direction,
        distance: 22,
        duration: 0.62,
    });
}

export function mediaReveal(
    reduced: boolean | null,
    direction: RevealDirection = "up",
): Variants {
    return buildRevealVariant(reduced, {
        direction,
        distance: 34,
        duration: 0.82,
        scale: 0.985,
        opacity: 0.001,
    });
}

export function softScaleReveal(reduced: boolean | null): Variants {
    return buildRevealVariant(reduced, {
        distance: 18,
        duration: 0.64,
        scale: 0.975,
        opacity: 0.001,
    });
}

export function splitReveal(
    reduced: boolean | null,
    side: "left" | "right",
): Variants {
    return buildRevealVariant(reduced, {
        direction: side === "left" ? "left" : "right",
        distance: 30,
        duration: 0.72,
    });
}

export function cardReveal(reduced: boolean | null): Variants {
    return buildRevealVariant(reduced, {
        distance: 24,
        duration: 0.58,
        scale: 0.985,
        opacity: 0.001,
    });
}

export function cardStagger(
    reducedValue: boolean | null,
    {
        staggerChildren = 0.1,
        delayChildren = 0.08,
    }: {
        staggerChildren?: number;
        delayChildren?: number;
    } = {},
): Variants {
    const reduced = Boolean(reducedValue);
    return {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduced ? 0 : staggerChildren,
                delayChildren: reduced ? 0 : delayChildren,
            },
        },
    };
}

export function inViewProps(variants: Variants, viewport?: ViewportOptions) {
    return {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: {
            ...motionViewport,
            ...viewport,
        },
        variants,
    };
}

export function immediateProps(variants: Variants) {
    return {
        initial: "hidden" as const,
        animate: "visible" as const,
        variants,
    };
}

export function useSubtleParallaxBlock<T extends HTMLElement>(distance = 28) {
    const ref = useRef<T>(null);
    const reduced = Boolean(useReducedMotion());
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        reduced ? [0, 0, 0] : [distance, 0, -distance],
    );

    return {
        ref,
        reduced,
        style: reduced ? undefined : { y },
    };
}

export function useStickyScrollProgressReveal<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const reduced = Boolean(useReducedMotion());
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    return {
        ref,
        reduced,
        scrollYProgress,
    };
}
