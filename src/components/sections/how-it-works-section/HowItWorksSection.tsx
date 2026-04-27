"use client";

import React from "react";
import styles from "./HowItWorksSection.module.scss";
import { ICONS } from "@/resources/icons";
import type { IconKey } from "@/resources/icons";
import { motion, useReducedMotion } from "framer-motion";
import {
    cardReveal,
    cardStagger,
    contentReveal,
    headingReveal,
    inViewProps,
    sectionReveal,
    splitReveal,
} from "@/components/motion/system";

interface Step {
    icon?: IconKey;
    title?: string;
    description?: string;
}

interface Highlight {
    title: string;
    description?: string;
}

interface HowItWorksSectionProps {
    label?: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    steps?: Step[];
    highlights?: Highlight[];
    note?: React.ReactNode;
}

export default function HowItWorksSection({
                                              label,
                                              title,
                                              description,
                                              steps,
                                              highlights,
                                              note,
                                          }: HowItWorksSectionProps) {
    const reduced = useReducedMotion();

    return (
        <motion.section
            className={styles.section}
            {...inViewProps(sectionReveal(reduced), { amount: 0.18 })}
        >
            <div className={styles.inner}>
                <motion.div
                    className={styles.left}
                    variants={cardStagger(reduced, {
                        staggerChildren: 0.08,
                        delayChildren: 0.04,
                    })}
                >
                    {label && <motion.span className={styles.label} variants={contentReveal(reduced)}>{label}</motion.span>}
                    {title && <motion.h2 className={styles.title} variants={headingReveal(reduced)}>{title}</motion.h2>}
                    {description && <motion.div className={styles.description} variants={contentReveal(reduced)}>{description}</motion.div>}

                    {highlights?.length && (
                        <motion.div
                            className={styles.highlightsContainer}
                            variants={cardStagger(reduced, {
                                staggerChildren: 0.06,
                                delayChildren: 0.02,
                            })}
                        >
                            {highlights.map((item, i) => (
                                <motion.div key={i} className={styles.highlightItem} variants={contentReveal(reduced)}>
                                    <div className={styles.checkIcon}>✓</div>
                                    <div className={styles.highlightText}>
                                        <strong>{item.title}</strong>
                                        {item.description && <p>{item.description}</p>}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                <motion.div className={styles.right} variants={splitReveal(reduced, "right")}>
                    <motion.div
                        className={styles.processCard}
                        variants={cardStagger(reduced, {
                            staggerChildren: 0.1,
                            delayChildren: 0.08,
                        })}
                    >
                        {steps?.map((step, i) => {
                            const Icon = step.icon ? ICONS[step.icon] : null;
                            return (
                                <motion.div
                                    key={i}
                                    className={styles.stepRow}
                                    variants={cardReveal(reduced)}
                                >
                                    <div className={styles.iconColumn}>
                                        <div className={styles.iconCircle}>
                                            {Icon ? <Icon /> : <span>{i + 1}</span>}
                                        </div>
                                        {i !== steps.length - 1 && <div className={styles.connectorLine} />}
                                    </div>
                                    <div className={styles.stepContent}>
                                        <span className={styles.stepTag}>Step 0{i + 1}</span>
                                        <h4 className={styles.stepTitle}>{step.title}</h4>
                                        <p className={styles.stepDescription}>{step.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {note && (
                            <motion.div className={styles.modernNote} variants={contentReveal(reduced)}>
                                <div className={styles.noteIndicator} />
                                <p>{note}</p>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
