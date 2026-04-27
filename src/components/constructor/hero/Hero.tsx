"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { media } from "@/resources/media";
import {
    cardStagger,
    contentReveal,
    headingReveal,
    immediateProps,
    mediaReveal,
    sectionReveal,
    softScaleReveal,
    useStickyScrollProgressReveal,
    useSubtleParallaxBlock,
} from "@/components/motion/system";

import styles from "./Hero.module.scss";

interface HeroSectionProps {
    title: React.ReactNode;
    description?: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
    image: keyof typeof media;
    badge?: { label: string; title: string };
    features?: boolean;
}

export default function HeroSection({
    title,
    description,
    primaryCta,
    secondaryCta,
    image,
    badge,
}: HeroSectionProps) {
    const reduced = useReducedMotion();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const { ref: sectionRef, scrollYProgress } = useStickyScrollProgressReveal<HTMLElement>();
    const parallax = useSubtleParallaxBlock<HTMLDivElement>(32);

    const selectedMedia = media[image];

    const isVideo = useMemo(() => {
        if (typeof selectedMedia === "string") {
            return selectedMedia.endsWith(".mp4");
        }

        return false;
    }, [selectedMedia]);

    const contentY = useTransform(
        scrollYProgress,
        [0, 1],
        reduced ? [0, 0] : [0, -18],
    );
    const mediaScale = useTransform(
        scrollYProgress,
        [0, 0.7, 1],
        reduced ? [1, 1, 1] : [1.02, 1, 0.985],
    );
    const mediaOpacity = useTransform(
        scrollYProgress,
        [0, 1],
        reduced ? [1, 1] : [1, 0.88],
    );

    const handlePlay = () => {
        if (!videoRef.current) {
            return;
        }

        videoRef.current.play();
        setPlaying(true);
    };

    return (
        <motion.section
            ref={sectionRef}
            className={styles.hero}
            {...immediateProps(sectionReveal(reduced))}
        >
            <div className={styles.inner}>
                <motion.div
                    className={styles.content}
                    style={{ y: contentY }}
                    variants={cardStagger(reduced, {
                        staggerChildren: 0.09,
                        delayChildren: 0.1,
                    })}
                >
                    {badge && (
                        <motion.div className={styles.badge} variants={contentReveal(reduced)}>
                            <span className={styles.badgeLabel}>{badge.label}</span>
                            <span className={styles.badgeTitle}>{badge.title}</span>
                        </motion.div>
                    )}

                    <motion.h1 className={styles.title} variants={headingReveal(reduced)}>
                        {title}
                    </motion.h1>

                    {description && (
                        <motion.p className={styles.description} variants={contentReveal(reduced)}>
                            {description}
                        </motion.p>
                    )}

                    {(primaryCta || secondaryCta) && (
                        <motion.div
                            className={styles.actions}
                            variants={cardStagger(reduced, {
                                staggerChildren: 0.07,
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

                <motion.div
                    ref={parallax.ref}
                    className={styles.mediaWrapper}
                    style={{
                        ...parallax.style,
                        scale: mediaScale,
                        opacity: mediaOpacity,
                    }}
                    variants={mediaReveal(reduced, "right")}
                >
                    <div className={styles.mediaCard}>
                        {!isVideo && (
                            <Image
                                src={selectedMedia as StaticImageData}
                                alt="Hero media"
                                fill
                                priority
                                className={styles.media}
                            />
                        )}

                        {isVideo && (
                            <>
                                <video
                                    ref={videoRef}
                                    className={styles.media}
                                    playsInline
                                    preload="metadata"
                                >
                                    <source src={selectedMedia as string} type="video/mp4" />
                                </video>
                                {!playing && (
                                    <button className={styles.playButton} onClick={handlePlay}>
                                        ▶
                                    </button>
                                )}
                            </>
                        )}

                        {badge && (
                            <motion.div className={styles.overlay} variants={contentReveal(reduced)}>
                                <div className={styles.badgeContent}>
                                    <span className={styles.overlayLabel}>{badge.label}</span>
                                    <span className={styles.overlayTitle}>{badge.title}</span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
