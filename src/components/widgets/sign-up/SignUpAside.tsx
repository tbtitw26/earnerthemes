"use client";

import React from "react";
import styles from "./SignUpAside.module.scss";
import { media } from "@/resources/media";
import Image from "next/image";

const avatars = [media.review1, media.review2, media.review3];

const SignUpAside: React.FC = () => {
    return (
        <aside className={styles.aside}>
            <span className={styles.badge}>Specialist-First Platform</span>

            <h3 className={styles.title}>
                Get a Training Program <br /> Built by Experts
            </h3>

            <p className={styles.subtitle}>
                Join athletes who train with certified specialists and use AI when they need a faster solution.
            </p>

            <ul className={styles.features}>
                <li>
                    <span className={styles.icon}>◆</span>
                    <div>
                        <strong>Coach-Made Programs</strong>
                        <p>Detailed, structured training plans created manually by specialists.</p>
                    </div>
                </li>

                <li>
                    <span className={styles.icon}>✳</span>
                    <div>
                        <strong>Wallet Balance</strong>
                        <p>Top up your balance any time from £10.00. No subscriptions. Pay only when you order a plan.</p>
                    </div>
                </li>

                <li>
                    <span className={styles.icon}>●</span>
                    <div>
                        <strong>AI Fast Option</strong>
                        <p>Generate a structured workout plan quickly when you need it now.</p>
                    </div>
                </li>
            </ul>

            <div className={styles.socialProof}>
                <div className={styles.avatars}>
                    {avatars.map((img, index) => (
                        <div key={index} className={styles.avatar}>
                            <Image
                                src={img}
                                alt={`User avatar ${index + 1}`}
                                width={28}
                                height={28}
                                quality={90}
                            />
                        </div>
                    ))}
                </div>

                <span className={styles.socialText}>
                    Join 12,000+ athletes training smarter
                </span>
            </div>
        </aside>
    );
};

export default SignUpAside;
