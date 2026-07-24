"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./Media.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { media as mediaMap } from "@/resources/media";

interface MediaProps {
    src: string | StaticImageData;
    type?: "image" | "video";
    alt?: string;
    className?: string;
    objectFit?: "cover" | "contain" | "fill";
    controls?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    aspectRatio?: string;

    // 🆕 Нові пропси
    hoverEnabled?: boolean;
    hoverText?: string;
    hoverButton?: { text: string; link: string };
}

const Media: React.FC<MediaProps> = ({
                                         src,
                                         type = "image",
                                         alt = "media",
                                         className = "",
                                         objectFit = "cover",
                                         controls = true,
                                         autoPlay = false,
                                         loop = false,
                                         muted = false,
                                         aspectRatio = "16/9",
                                         hoverEnabled = false,
                                         hoverText,
                                         hoverButton,
                                     }) => {

    /** Registry values are a mix of imported images and plain URLs, hence the union. */
    function resolveMedia(
        key?: string | StaticImageData
    ): string | StaticImageData | undefined {
        if (typeof key === "string" && key in mediaMap) {
            return (mediaMap as Record<string, string | StaticImageData>)[key];
        }
        return key;
    }

    const resolvedSrc = resolveMedia(src);

    return (
        <div
            className={`${styles.mediaWrapper} ${hoverEnabled ? styles.hoverable : ""} ${className}`}
            style={{ aspectRatio }}
        >
            {type === "image" ? (
                resolvedSrc && (
                    <Image
                        src={resolvedSrc}
                        alt={alt}
                        fill
                        style={{ objectFit }}
                        className={styles.image}
                    />
                )
            ) : (
                typeof src === "string" && (
                    <video
                        src={src}
                        controls={controls}
                        autoPlay={autoPlay}
                        loop={loop}
                        muted={muted}
                        className={styles.video}
                        style={{ objectFit }}
                    />
                )
            )}

            {/* 🧾 Hover Overlay */}
            {hoverEnabled && (hoverText || hoverButton) && (
                <div className={styles.overlay}>
                    {hoverText && <p className={styles.hoverText}>{hoverText}</p>}
                    {hoverButton && (
                        <a href={hoverButton.link}>
                            <ButtonUI
                                text={hoverButton.text}
                                color="primary"
                                variant="solid"
                                size="md"
                                hoverEffect="scale"
                            />
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default Media;
