"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./StoryTimeline.module.scss";
import { FaRocket, FaGlobe, FaUsers, FaChartLine } from "react-icons/fa";
import {
    cardReveal,
    cardStagger,
    contentReveal,
    headingReveal,
    inViewProps,
    sectionReveal,
} from "@/components/motion/system";

interface TimelineStep {
    icon?: string;
    year: string;
    title: string;
    description: string;
}

const icons: Record<string, React.ReactNode> = {
    rocket: <FaRocket />,
    globe: <FaGlobe />,
    users: <FaUsers />,
    chart: <FaChartLine />,
};

const StoryTimeline: React.FC<{ steps: TimelineStep[] }> = ({ steps }) => {
    const reduced = useReducedMotion();

    return (
        <motion.section
            className={styles.section}
            {...inViewProps(sectionReveal(reduced), { amount: 0.14 })}
        >
            <motion.div
                className={styles.header}
                variants={cardStagger(reduced, {
                    staggerChildren: 0.08,
                    delayChildren: 0.02,
                })}
            >
                <motion.span className={styles.eyebrow} variants={contentReveal(reduced)}>
                    Growth
                </motion.span>
                <motion.h2 className={styles.heading} variants={headingReveal(reduced)}>
                    Our Journey
                </motion.h2>
            </motion.div>

            <motion.div className={styles.timeline} variants={cardStagger(reduced, { staggerChildren: 0.1, delayChildren: 0.06 })}>
                <div className={styles.rail} />

                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        className={styles.item}
                        variants={cardReveal(reduced)}
                        style={{ left: i % 2 === 0 ? "10%" : "55%" }}
                    >
                        <div className={styles.year}>{step.year}</div>

                        <div className={styles.card}>
                            <div className={styles.icon}>
                                {icons[step.icon || "rocket"]}
                            </div>

                            <div className={styles.content}>
                                <strong>{step.title}</strong>
                                <p>{step.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default StoryTimeline;
