"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Section.module.scss";
import {
    cardStagger,
    contentReveal,
    headingReveal,
    inViewProps,
    sectionReveal,
    splitReveal,
} from "@/components/motion/system";

interface SectionProps {
    title?: string;
    description?: string;

    left?: React.ReactNode;
    right?: React.ReactNode;
    children?: React.ReactNode;

    imagePosition?: "left" | "right";
    gap?: string;
    align?: "center" | "start" | "end";
    justify?: "center" | "space-between" | "start" | "end";
}

const Section: React.FC<SectionProps> = ({
                                             title,
                                             description,
                                             left,
                                             right,
                                             children,
                                             imagePosition = "right",
                                             gap = "3rem",
                                         align = "center",
                                         justify = "center",
                                     }) => {
    const reduced = useReducedMotion();
    const isImageLeft = imagePosition === "left";
    const hasChildren = Boolean(children);
    const isSingle = hasChildren || !left || !right;

    return (
        <motion.section
            className={styles.wrapper}
            {...inViewProps(sectionReveal(reduced), { amount: 0.18 })}
        >
            {(title || description) && (
                <motion.div
                    className={styles.header}
                    variants={cardStagger(reduced, {
                        staggerChildren: 0.08,
                        delayChildren: 0.04,
                    })}
                >
                    {title && (
                        <motion.h2 className={styles.title} variants={headingReveal(reduced)}>
                            {title}
                        </motion.h2>
                    )}
                    {description && (
                        <motion.p className={styles.description} variants={contentReveal(reduced)}>
                            {description}
                        </motion.p>
                    )}
                </motion.div>
            )}

            <motion.div
                className={`${styles.section} ${isSingle ? styles.single : ""}`}
                style={{
                    flexDirection: isImageLeft ? "row-reverse" : "row",
                    gap,
                    alignItems: align,
                    justifyContent: isSingle ? "center" : justify,
                }}
                variants={cardStagger(reduced, {
                    staggerChildren: 0.12,
                    delayChildren: 0.08,
                })}
            >
                {children ? (
                    React.Children.map(children, (child, index) => (
                        <motion.div
                            key={React.isValidElement(child) && child.key != null ? String(child.key) : index}
                            variants={contentReveal(reduced)}
                        >
                            {child}
                        </motion.div>
                    ))
                ) : (
                    <>
                        {left && (
                            <motion.div
                                className={styles.left}
                                variants={splitReveal(reduced, isImageLeft ? "right" : "left")}
                            >
                                {left}
                            </motion.div>
                        )}
                        {right && (
                            <motion.div
                                className={styles.right}
                                variants={splitReveal(reduced, isImageLeft ? "left" : "right")}
                            >
                                {right}
                            </motion.div>
                        )}
                    </>
                )}
            </motion.div>
        </motion.section>
    );
};

export default Section;
