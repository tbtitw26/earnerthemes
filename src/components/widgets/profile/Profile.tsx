"use client";

import React from "react";
import Link from "next/link";
import { FaArrowRight, FaCreditCard, FaGear, FaShieldHalved } from "react-icons/fa6";
import ProfileHead from "@/components/features/profile-head/ProfileHead";
import BalanceCard from "@/components/features/balance-card/BalanceCard";
import Dashboard from "@/components/features/dashboard/Dashboard";
import { useUser } from "@/context/UserContext";
import { LogoutButton } from "@/components/ui/logout-button/LogoutButton";
import styles from "./Profile.module.scss";

const Profile = () => {
    const user = useUser();
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Your account";
    const firstName = fullName.split(" ")[0] || "there";

    return (
        <div className={styles.profilePage}>
            <section className={styles.heroSection}>
                <div className={styles.overviewGrid}>
                    <div className={styles.overviewColumn}>
                        <div className={styles.heroCopy}>
                            <span className={styles.kicker}>Account overview</span>
                            <h1>Welcome back, {firstName}</h1>
                            <p>
                                Manage your purchased templates, wallet activity, and account access from one clean,
                                structured workspace.
                            </p>
                        </div>

                        <ProfileHead />
                    </div>

                    <BalanceCard />
                </div>

                <div className={styles.actionBar}>
                    <Link href="/templates" className={styles.inlineAction}>
                        <FaArrowRight />
                        Browse Templates
                    </Link>
                    <div className={styles.logoutWrap}>
                        <LogoutButton />
                    </div>
                </div>
            </section>

            <section className={styles.dashboardSection}>
                <Dashboard />
            </section>
        </div>
    );
};

export default Profile;
