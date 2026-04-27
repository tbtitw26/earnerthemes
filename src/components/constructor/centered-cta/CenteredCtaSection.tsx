"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import styles from "./CenteredCtaSection.module.scss";
import {
    cardStagger,
    contentReveal,
    inViewProps,
    sectionReveal,
    softScaleReveal,
} from "@/components/motion/system";

interface CenteredCtaSectionProps {
    title: React.ReactNode | string;
    description?: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
    backgroundColor?: string;
    theme?: "dark" | "light";
}

const CenteredCtaSection: React.FC<CenteredCtaSectionProps> = ({
    title,
    description,
    primaryCta,
    secondaryCta,
    backgroundColor,
    theme = "dark",
}) => {
    const reduced = useReducedMotion();
    const customVars = backgroundColor
        ? ({ "--cta-bg": backgroundColor } as React.CSSProperties)
        : undefined;

    return (
        <motion.section
            className={`${styles.section} ${styles[theme]}`}
            style={customVars}
            {...inViewProps(sectionReveal(reduced), { amount: 0.28 })}
        >
            <motion.div
                className={styles.inner}
                variants={cardStagger(reduced, {
                    staggerChildren: 0.08,
                    delayChildren: 0.04,
                })}
            >
                <motion.h2 className={styles.title} variants={contentReveal(reduced)}>
                    {title}
                </motion.h2>

                {description && (
                    <motion.p className={styles.description} variants={contentReveal(reduced)}>
                        {description}
                    </motion.p>
                )}

                {(primaryCta || secondaryCta) && (
                    <motion.div
                        className={styles.actions}
                        variants={cardStagger(reduced, {
                            staggerChildren: 0.06,
                            delayChildren: 0,
                        })}
                    >
                        {primaryCta && (
                            <motion.div variants={softScaleReveal(reduced)}>
                                <Link href={primaryCta.link} className={styles.primaryBtn}>
                                    {primaryCta.text}
                                </Link>
                            </motion.div>
                        )}
                        {secondaryCta && (
                            <motion.div variants={softScaleReveal(reduced)}>
                                <Link href={secondaryCta.link} className={styles.secondaryBtn}>
                                    {secondaryCta.text}
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </motion.section>
    );
};

export default CenteredCtaSection;
