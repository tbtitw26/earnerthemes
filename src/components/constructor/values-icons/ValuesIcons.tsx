"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./ValuesIcons.module.scss";
import Text from "@/components/constructor/text/Text";
import { renderIcon } from "@/utils/renderIcon";
import { IconKey } from "@/resources/icons";
import {
    cardReveal,
    cardStagger,
    contentReveal,
    inViewProps,
    sectionReveal,
} from "@/components/motion/system";

type BackgroundColor =
    | "background-light"
    | "surface-muted"
    | "tertiary-color"
    | "quaternary-color"
    | "background-dark";

interface ValueItem {
    icon: IconKey | string;
    title: string;
    description?: string;
}

interface ValuesIconsProps {
    tagline?: string;
    title?: string;
    description?: string;
    values: ValueItem[];
    backgroundColor?: BackgroundColor;
    theme?: "light" | "dark"; // Новий проп для теми
}

const ValuesIcons: React.FC<ValuesIconsProps> = ({
                                                     tagline,
                                                     title,
                                                     description,
                                                     values,
                                                     backgroundColor,
                                                     theme = "light", // за замовчуванням світлий
                                                 }) => {
    const reduced = useReducedMotion();

    return (
        <motion.section
            className={`${styles.section} ${styles[theme]}`} // додаємо клас теми
            style={
                backgroundColor && theme !== "dark"
                    ? { background: `var(--${backgroundColor})` }
                    : undefined
            }
            {...inViewProps(sectionReveal(reduced), { amount: 0.16 })}
        >
            <motion.div
                className={styles.headerContainer}
                variants={cardStagger(reduced, {
                    staggerChildren: 0.08,
                    delayChildren: 0.03,
                })}
            >
                {tagline && <motion.span className={styles.tagline} variants={contentReveal(reduced)}>{tagline}</motion.span>}
                <motion.div variants={contentReveal(reduced)}>
                    <Text
                        title={title}
                        description={description}
                        centerTitle
                        centerDescription
                    />
                </motion.div>
            </motion.div>

            <motion.div
                className={`${styles.grid} ${styles[`grid${Math.min(values.length, 4)}`]}`}
                variants={cardStagger(reduced)}
            >
                {values.map((v, i) => (
                    <motion.div
                        key={i}
                        className={styles.card}
                        variants={cardReveal(reduced)}
                    >
                        <div className={styles.iconWrapper}>
                            {renderIcon(v.icon)}
                        </div>

                        <h3 className={styles.cardTitle}>{v.title}</h3>
                        <p className={styles.cardText}>{v.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default ValuesIcons;
