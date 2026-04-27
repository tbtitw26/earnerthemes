"use client";

import React, { useState } from "react";
import styles from "./TestimonialsSlider.module.scss";
import Image from "next/image";
import { media } from "@/resources/media";
import type { StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PiStarFill } from "react-icons/pi";
import { HiSparkles } from "react-icons/hi2";
import {
    cardReveal,
    cardStagger,
    contentReveal,
    headingReveal,
    inViewProps,
    sectionReveal,
    softScaleReveal,
} from "@/components/motion/system";

interface Testimonial {
    name: string;
    image: keyof typeof media;
    text: string;
    rating?: number;
}

interface Props {
    label?: string;
    title: string;
    description?: string;
    testimonials: Testimonial[];
}

// Окремий компонент для рендерингу зірок з підтримкою дробових значень
const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className={styles.stars}>
            {[...Array(5)].map((_, idx) => {
                // Вираховуємо рівень заповнення конкретної зірки (від 0 до 1)
                const fillLevel = Math.max(0, Math.min(1, rating - idx));

                return (
                    <div key={idx} className={styles.starWrapper}>
                        {/* Фонова порожня зірка */}
                        <PiStarFill className={styles.star} />

                        {/* Активна зірка, що накладається зверху з обрізкою по ширині */}
                        <div
                            className={styles.starFilledWrapper}
                            style={{ width: `${fillLevel * 100}%` }}
                        >
                            <PiStarFill className={styles.starActive} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default function TestimonialsSlider({
                                               label,
                                               title,
                                               description,
                                               testimonials,
                                           }: Props) {
    const reduced = useReducedMotion();
    const [expanded, setExpanded] = useState(false);
    const averageRating = testimonials.length
        ? (
              testimonials.reduce((sum, item) => sum + (item.rating ?? 5), 0) /
              testimonials.length
          ).toFixed(1)
        : "5.0";

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
                    <div className={styles.headerCopy}>
                        {label && <motion.span className={styles.label} variants={contentReveal(reduced)}>{label}</motion.span>}
                        <motion.h2 className={styles.title} variants={headingReveal(reduced)}>{title}</motion.h2>
                        {description && (
                            <motion.p className={styles.description} variants={contentReveal(reduced)}>
                                {description}
                            </motion.p>
                        )}
                    </div>

                    <motion.div className={styles.overviewCard} variants={softScaleReveal(reduced)}>
                        <span className={styles.overviewEyebrow}>
                            <HiSparkles className={styles.overviewIcon} />
                            Real feedback
                        </span>
                        <div className={styles.overviewValue}>{averageRating}/5</div>
                        <p className={styles.overviewText}>
                            Average rating from {testimonials.length} recent client stories.
                        </p>
                    </motion.div>
                </motion.div>

                <div className={styles.gridWrapper}>
                    <motion.div
                        className={`${styles.grid} ${!expanded ? styles.collapsed : ""}`}
                        variants={cardStagger(reduced)}
                    >
                        {testimonials.map((item, i) => {
                            const img = media[item.image] as StaticImageData;
                            const rating = item.rating ?? 5;

                            return (
                                <motion.div
                                    key={i}
                                    className={styles.card}
                                    variants={cardReveal(reduced)}
                                >
                                    <span className={styles.quoteMark}>“</span>

                                    <div className={styles.cardHeader}>
                                        <div className={styles.ratingBlock}>
                                            <StarRating rating={rating} />
                                            <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
                                        </div>
                                    </div>

                                    <p className={styles.quote}>“{item.text}”</p>

                                    <div className={styles.userInfo}>
                                        <div className={styles.avatarWrap}>
                                            <Image
                                                src={img}
                                                alt={item.name}
                                                fill
                                                className={styles.avatar}
                                            />
                                        </div>
                                        <div className={styles.userMeta}>
                                            <span className={styles.userName}>
                                                {item.name}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {!expanded && <div className={styles.fadeOverlay} />}
                </div>

                <motion.div className={styles.buttonWrap} variants={contentReveal(reduced)}>
                    <button
                        className={styles.showMoreBtn}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "Show fewer stories" : "Show more stories"}
                    </button>
                </motion.div>
            </div>
        </motion.section>
    );
}
