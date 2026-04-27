"use client";
import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./InfoBlock.module.scss";
import { media } from "@/resources/media";
import { renderIcon } from "@/utils/renderIcon";
import { IconKey } from "@/resources/icons";
import Link from "next/link";
import { cardStagger, contentReveal, mediaReveal } from "@/components/motion/system";

const CheckIcon = () => (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const COLOR_VARIANTS: Record<string, { accent: string; hover: string }> = {
    default: { accent: "var(--primary-color)", hover: "var(--secondary-color)" },
    blue: { accent: "var(--primary-color)", hover: "var(--secondary-color)" },
    green: { accent: "var(--success-color)", hover: "#095924" },
    purple: { accent: "#7C3AED", hover: "#6D28D9" },
    orange: { accent: "#F97316", hover: "#EA580C" },
};

interface InfoBlockProps {
    title: string;
    description?: string;
    image?: keyof typeof media;
    icon?: IconKey | string | React.ReactNode;
    bullets?: string[];
    variant?: "light" | "dark";
    badge?: string;
    buttonText?: string;
    buttonLink?: string;
    label?: string;
    cta?: string;
    ctaLink?: string;
    color?: "blue" | "green" | "purple" | "orange" | "default";
}

const InfoBlock: React.FC<InfoBlockProps> = ({
    title,
    description,
    image,
    icon,
    bullets,
    variant = "light",
    badge,
    buttonText,
    buttonLink,
    label,
    cta,
    ctaLink,
    color = "default",
}) => {
    const reduced = useReducedMotion();
    const imageSrc = image ? media[image] : null;
    const colors = COLOR_VARIANTS[color] || COLOR_VARIANTS.default;
    const accentStyle = { "--info-accent": colors.accent, "--info-hover": colors.hover } as React.CSSProperties;

    const eyebrow = label || badge;
    const ctaText = cta || buttonText;
    const ctaHref = ctaLink || buttonLink;

    return (
        <motion.div
            className={`${styles.infoBlock} ${styles[variant]}`}
            style={accentStyle}
            variants={cardStagger(reduced, {
                staggerChildren: 0.07,
                delayChildren: 0.02,
            })}
        >
            {imageSrc && (
                <motion.div className={styles.imageWrapper} variants={mediaReveal(reduced)}>
                    <Image src={imageSrc} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" />
                </motion.div>
            )}

            {!imageSrc && icon && (
                <motion.div className={styles.decorativeIcon} aria-hidden="true" variants={contentReveal(reduced)}>
                    {renderIcon(icon)}
                </motion.div>
            )}

            <div className={styles.content}>
                {eyebrow && (
                    <motion.span className={styles.eyebrow} variants={contentReveal(reduced)}>
                        {eyebrow}
                    </motion.span>
                )}

                <motion.h3 className={styles.title} variants={contentReveal(reduced)}>
                    {title}
                </motion.h3>

                {description && (
                    <motion.p className={styles.description} variants={contentReveal(reduced)}>
                        {description}
                    </motion.p>
                )}

                {bullets && (
                    <motion.ul className={styles.bullets} variants={cardStagger(reduced, { staggerChildren: 0.05, delayChildren: 0 })}>
                        {bullets.map((item, i) => (
                            <motion.li key={i} variants={contentReveal(reduced)}>
                                <span className={styles.checkWrapper}><CheckIcon /></span>
                                {item}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}

                {ctaText && ctaHref && (
                    <motion.div variants={contentReveal(reduced)}>
                        <Link href={ctaHref} className={styles.ctaLink}>
                            {ctaText}
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default InfoBlock;
