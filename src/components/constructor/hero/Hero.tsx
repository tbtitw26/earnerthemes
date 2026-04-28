"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";
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

const TILT_RANGE = 10;
const BASE_ROTATE_X = 2;
const BASE_ROTATE_Y = -6;
const SPRING_CONFIG = { stiffness: 200, damping: 20 };
const SCALE_SPRING = { stiffness: 300, damping: 25 };
const GLARE_SPRING = { stiffness: 200, damping: 30 };

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
    const [tiltEnabled, setTiltEnabled] = useState(false);
    const { ref: sectionRef, scrollYProgress } = useStickyScrollProgressReveal<HTMLElement>();
    const parallax = useSubtleParallaxBlock<HTMLDivElement>(32);

    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const tiltScale = useMotionValue(1);
    const glareX = useMotionValue(50);
    const glareY = useMotionValue(50);
    const glareOpacity = useMotionValue(0);

    const springX = useSpring(tiltX, SPRING_CONFIG);
    const springY = useSpring(tiltY, SPRING_CONFIG);
    const springScale = useSpring(tiltScale, SCALE_SPRING);
    const springGlareOpacity = useSpring(glareOpacity, GLARE_SPRING);

    const finalRotateX = useTransform(springX, (v) => BASE_ROTATE_X + v);
    const finalRotateY = useTransform(springY, (v) => BASE_ROTATE_Y + v);

    const shadowOffsetX = useTransform(springY, (v) => Math.round(-v * 0.8));
    const shadowOffsetY = useTransform(springX, (v) => Math.round(v * 0.8 + 40));
    const boxShadow = useMotionTemplate`${shadowOffsetX}px ${shadowOffsetY}px 80px -20px rgba(15,23,42,0.28), 0px 16px 40px -12px rgba(15,23,42,0.12)`;

    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1025px) and (hover: hover)");
        setTiltEnabled(mq.matches && !reduced);
        const handler = (e: MediaQueryListEvent) => setTiltEnabled(e.matches && !reduced);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [reduced]);

    const handleCardMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPct = (x - rect.width / 2) / rect.width;
            const yPct = (y - rect.height / 2) / rect.height;
            tiltY.set(xPct * TILT_RANGE);
            tiltX.set(-yPct * TILT_RANGE);
            tiltScale.set(1.02);
            glareX.set((x / rect.width) * 100);
            glareY.set((y / rect.height) * 100);
            glareOpacity.set(1);
        },
        [tiltX, tiltY, tiltScale, glareX, glareY, glareOpacity],
    );

    const handleCardMouseLeave = useCallback(() => {
        tiltX.set(0);
        tiltY.set(0);
        tiltScale.set(1);
        glareOpacity.set(0);
    }, [tiltX, tiltY, tiltScale, glareOpacity]);

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
                    <motion.div
                        className={styles.mediaCard}
                        style={
                            tiltEnabled
                                ? {
                                      rotateX: finalRotateX,
                                      rotateY: finalRotateY,
                                      scale: springScale,
                                      boxShadow,
                                  }
                                : undefined
                        }
                        onMouseMove={tiltEnabled ? handleCardMouseMove : undefined}
                        onMouseLeave={tiltEnabled ? handleCardMouseLeave : undefined}
                    >
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

                        {tiltEnabled && (
                            <motion.div
                                className={styles.glare}
                                style={{
                                    background: glareBackground,
                                    opacity: springGlareOpacity,
                                }}
                            />
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
