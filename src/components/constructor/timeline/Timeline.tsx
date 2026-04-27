"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Timeline.module.scss";

interface Step {
    title: string;
    description: string;
}

interface TimelineProps {
    title?: string;
    description?: string;
    steps: Step[];
    align?: "left" | "center";
}

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

const Timeline: React.FC<TimelineProps> = ({
                                               title,
                                               description,
                                               steps,
                                               align = "left",
                                           }) => {
    return (
        <section className={styles.timelineSection}>
            <div className={styles.container}>
                {(title || description) && (
                    <div
                        className={`${styles.head} ${
                            align === "center" ? styles.headCenter : ""
                        }`}
                    >
                        {title && <h2 className={styles.sectionTitle}>{title}</h2>}
                        {description && <p className={styles.sectionDesc}>{description}</p>}
                    </div>
                )}

                <div className={styles.timelineList}>
                    {steps.map((step, index) => (
                        <motion.div
                            key={`${step.title}-${index}`}
                            className={styles.timelineItem}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, delay: index * 0.08 }}
                        >
                            <div className={styles.number}>
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            <div className={styles.content}>
                                <h3 className={styles.itemTitle}>{step.title}</h3>
                                <p className={styles.itemDescription}>{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;