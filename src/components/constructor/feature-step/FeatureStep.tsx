"use client";

import React from "react";
import styles from "./FeatureStep.module.scss";
import { motion } from "framer-motion";
import { renderIcon } from "@/utils/renderIcon";
import type { IconKey } from "@/resources/icons";
import { media } from "@/resources/media";

interface FeatureStepProps {
    step: number;
    title: string;
    description?: string;
    bullets?: string[];
    image?: keyof typeof media;
    badge?: string;
    buttonText?: string;
    buttonLink?: string;
    imagePosition?: "left" | "right";
    icon?: IconKey | string | React.ReactNode;
}

const FeatureStep: React.FC<FeatureStepProps> = ({
                                                     step,
                                                     title,
                                                     description,
                                                     bullets,
                                                     icon,
                                                 }) => {
    const fallbackDescription =
        description || (bullets?.length ? bullets.join(" ") : "");

    return (
        <motion.article
            className={styles.card}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className={styles.cardContent}>
                <span className={styles.stepTag}>
                    STEP {String(step).padStart(2, "0")}
                </span>

                <h3 className={styles.title}>{title}</h3>

                {fallbackDescription && (
                    <p className={styles.description}>{fallbackDescription}</p>
                )}
            </div>

            <div className={styles.iconWrap}>
                <span className={styles.icon}>
                    {renderIcon(icon)}
                </span>
            </div>
        </motion.article>
    );
};

export default FeatureStep;