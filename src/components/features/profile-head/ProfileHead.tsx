"use client";

import { FaUserCircle } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import styles from "./ProfileHead.module.scss";

const ProfileHead = () => {
    const user = useUser();

    const createdDate = user?.createdAt
        ? new Date(user.createdAt).toISOString().split('T')[0]
        : null;

    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || "User";

    return (
        <section className={styles.card}>
            <div className={styles.identityRow}>
                <div className={styles.avatarWrap} aria-hidden>
                    <FaUserCircle className={styles.avatarIcon} />
                </div>

                <div className={styles.identityCopy}>
                    <span className={styles.eyebrow}>Profile</span>
                    <h2 className={styles.title}>{fullName}</h2>
                    <p className={styles.description}>
                        Your account details and billing identity remain synced here across template purchases and
                        wallet activity.
                    </p>
                </div>
            </div>

            <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                    <span className={styles.detailLabel}>Email</span>
                    <span className={styles.detailValue}>{user?.email ?? "—"}</span>
                </div>
                <div className={styles.detailCard}>
                    <span className={styles.detailLabel}>Member since</span>
                    <span className={styles.detailValue}>{createdDate ?? "—"}</span>
                </div>
                <div className={styles.detailCard}>
                    <span className={styles.detailLabel}>Location</span>
                    <span className={styles.detailValue}>
                        {[user?.address?.country, user?.address?.city].filter(Boolean).join(", ") || "—"}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default ProfileHead;
