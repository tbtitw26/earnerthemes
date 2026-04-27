"use client";

import React from "react";
import styles from "./FeatureStepsWrapper.module.scss";

interface FeatureStepsWrapperProps {
    children: React.ReactNode;
    columns?: 2 | 3 | 4;
    className?: string;

    label?: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
}

const FeatureStepsWrapper: React.FC<FeatureStepsWrapperProps> = ({
                                                                     children,
                                                                     columns = 3,
                                                                     className,
                                                                     label,
                                                                     title,
                                                                     description,
                                                                 }) => {
    return (
        <section className={`${styles.section} ${className ?? ""}`}>
            <div className={styles.inner}>

                {(label || title || description) && (
                    <div className={styles.heading}>
                        {label && <span className={styles.label}>{label}</span>}
                        {title && <h2 className={styles.title}>{title}</h2>}
                        {description && (
                            <p className={styles.description}>{description}</p>
                        )}
                    </div>
                )}

                <div
                    className={styles.steps}
                    style={
                        {
                            ["--feature-steps-columns" as string]: columns,
                        } as React.CSSProperties
                    }
                >
                    {children}
                </div>
            </div>
        </section>
    );
};

export default FeatureStepsWrapper;