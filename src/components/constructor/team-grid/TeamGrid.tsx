"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./TeamGrid.module.scss";
import { media } from "@/resources/media";
import ButtonUI from "@/components/ui/button/ButtonUI";
import {
    cardReveal,
    cardStagger,
    contentReveal,
    headingReveal,
    inViewProps,
    sectionReveal,
    softScaleReveal,
} from "@/components/motion/system";

interface TeamMember {
    name: string;
    role: string;
    image: keyof typeof media;
}

interface TeamGridProps {
    title?: string;
    description?: string;
    members: TeamMember[];
    viewAllText?: string;
    viewAllLink?: string;
}

const TeamGrid: React.FC<TeamGridProps> = ({
                                               title,
                                               description,
                                               members,
                                               viewAllText = "View all chefs",
                                               viewAllLink = "/extra/chefs",
                                           }) => {
    const reduced = useReducedMotion();

    return (
        <motion.section
            className={styles.section}
            {...inViewProps(sectionReveal(reduced), { amount: 0.14 })}
        >
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    variants={cardStagger(reduced, {
                        staggerChildren: 0.08,
                        delayChildren: 0.03,
                    })}
                >
                    <div className={styles.titleStack}>
                        {title && <motion.h2 className={styles.mainTitle} variants={headingReveal(reduced)}>{title}</motion.h2>}
                        {description && <motion.p className={styles.subTitle} variants={contentReveal(reduced)}>{description}</motion.p>}
                    </div>

                    {viewAllLink && (
                        <motion.div variants={softScaleReveal(reduced)}>
                            <Link href={viewAllLink} passHref legacyBehavior>
                                <ButtonUI
                                    variant="solid"
                                    color="primary"
                                    shape="default"
                                    size="md"
                                    hoverEffect="scale"
                                >
                                    {viewAllText}
                                </ButtonUI>
                            </Link>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div className={styles.gallery} variants={cardStagger(reduced)}>
                    {members.map((m, i) => {
                        const img = media[m.image] as StaticImageData;

                        return (
                            <motion.div
                                key={`${m.name}-${i}`}
                                className={styles.memberCard}
                                variants={cardReveal(reduced)}
                                whileHover={{ y: -10 }}
                            >
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={img}
                                        alt={m.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className={styles.chefImage}
                                    />
                                    <div className={styles.overlay}>
                                        <div className={styles.glassInfo}>
                                            <span className={styles.chefRole}>{m.role}</span>
                                            <h3 className={styles.chefName}>{m.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default TeamGrid;
