"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Grid.module.scss";
import Text from "@/components/constructor/text/Text";
import { GridProps } from "./types";
import {
    cardReveal,
    cardStagger,
    headingReveal,
    inViewProps,
    sectionReveal,
} from "@/components/motion/system";

const Grid: React.FC<GridProps> = ({
                                       title,
                                       description,
                                       columns = 12,
                                       gap = "16px",
                                       alignItems = "stretch",
                                       justifyItems = "stretch",
                                       style,
                                       children,
                                   }) => {
    const reduced = useReducedMotion();

    return (
        <motion.section
            className={styles.wrapper}
            {...inViewProps(sectionReveal(reduced), { amount: 0.16 })}
        >
            {(title || description) && (
                <motion.div variants={headingReveal(reduced)}>
                    <Text
                        title={title}
                        description={description}
                        centerTitle
                        centerDescription
                    />
                </motion.div>
            )}

            <motion.div
                className={styles.grid}
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap,
                    alignItems,
                    justifyItems,
                    ...style,
                }}
                variants={cardStagger(reduced)}
            >
                {React.Children.map(children, (child, index) => (
                    <motion.div
                        key={React.isValidElement(child) && child.key != null ? String(child.key) : index}
                        variants={cardReveal(reduced)}
                    >
                        {child}
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default Grid;
