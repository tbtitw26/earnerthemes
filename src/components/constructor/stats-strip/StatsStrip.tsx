"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./StatsStrip.module.scss";
import { cardReveal, cardStagger, inViewProps, sectionReveal } from "@/components/motion/system";

interface StatItem {
    value: string;
    label: string;
}

interface StatsStripProps {
    items: StatItem[];
    backgroundColor?: string;
    theme?: "dark" | "light";
    className?: string;
    accentColor?: string;
}

// Parse "120k+", "$2.4B", "99.9%", "24/7" etc.
function parseValue(raw: string): { prefix: string; number: number; decimals: number; suffix: string } | null {
    const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) return null;
    const number = parseFloat(match[2]);
    const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
    return { prefix: match[1], number, decimals, suffix: match[3] };
}

function AnimatedValue({ value, delay }: { value: string; delay: number }) {
    const parsed = parseValue(value);
    const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);
    const ref = useRef<HTMLSpanElement>(null);
    const hasRun = useRef(false);

    const animate = useCallback(() => {
        if (!parsed || hasRun.current) return;
        hasRun.current = true;

        // Respect reduced motion
        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDisplay(value);
            return;
        }

        const duration = 1600; // ms
        const startTime = performance.now() + delay * 1000;

        const tick = (now: number) => {
            const elapsed = now - startTime;
            if (elapsed < 0) { requestAnimationFrame(tick); return; }
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * parsed.number;
            setDisplay(`${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [parsed, value, delay]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!parsed) { setDisplay(value); return; }

        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { animate(); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [animate, parsed, value]);

    return <span ref={ref} className={styles.value}>{display}</span>;
}

const StatsStrip: React.FC<StatsStripProps> = ({
    items,
    backgroundColor,
    theme = "dark",
    className,
    accentColor,
}) => {
    const reduced = useReducedMotion();
    const count = Math.min(items.length, 4);
    const gridClass = styles[`grid${count}`] || styles.grid4;

    const customVars = {
        ...(backgroundColor ? { "--stats-bg": backgroundColor } : {}),
        ...(accentColor ? { "--stats-accent": accentColor } : {}),
    } as React.CSSProperties;

    return (
        <motion.section
            className={`${styles.section} ${styles[theme]} ${className || ""}`}
            style={customVars}
            {...inViewProps(sectionReveal(reduced), { amount: 0.35 })}
        >
            <motion.div
                className={`${styles.grid} ${gridClass}`}
                variants={cardStagger(reduced, {
                    staggerChildren: 0.08,
                    delayChildren: 0.02,
                })}
            >
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        className={styles.item}
                        variants={cardReveal(reduced)}
                    >
                        <AnimatedValue value={item.value} delay={i * 0.08} />
                        <span className={styles.label}>{item.label}</span>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default StatsStrip;
