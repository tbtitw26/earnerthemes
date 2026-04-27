"use client";

import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import { FaBars } from "react-icons/fa";

import { headerContent } from "@/resources/content";
import { headerStyles } from "@/resources/styles-config";
import DrawerMenu from "@/components/ui/drawer/Drawer";
import AuthButtons from "@/components/widgets/auth-buttons/AuthButtons";
import CurrencySwitch from "@/components/widgets/currency-switch/CurrencySwitch";

type HeaderCssVars = React.CSSProperties & {
    "--header-link-color": string;
    "--header-link-hover-color": string;
    "--header-bg-scrolled": string;
};

const Header: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 12);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ---------- CSS variables from config ---------- */
    const headerCssVars: HeaderCssVars = {
        "--header-link-color": headerStyles.linkColor,
        "--header-link-hover-color": headerStyles.linkHoverColor,
        "--header-bg-scrolled": headerStyles.scrollBackground,
    };

    /* ---------- Classes ---------- */
    const headerClassName = [
        styles.header,
        headerStyles.type === "sticky" && styles.sticky,
        headerStyles.type === "sticky-rounded" && styles.stickyRounded,
        isScrolled && styles.scrolled,
        isScrolled && headerStyles.type === "sticky-rounded" && styles.scrolledRounded,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            <motion.header
                className={headerClassName}
                style={headerCssVars}
                initial={{ opacity: 0, y: -32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className={styles.headerInner}>
                    <a href={headerContent.logo.href} className={styles.logo}>
                        <Image
                            src={headerContent.logo.src}
                            alt={headerContent.logo.alt}
                            width={190}
                            height={60}
                            priority
                        />
                    </a>

                    <nav className={styles.nav}>
                        {headerContent.links.map((link) => (
                            <a key={link.label} href={link.href} className={styles.link}>
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className={styles.actionsNav}>
                        <CurrencySwitch />
                        <AuthButtons />
                    </div>

                    <div className={styles.menuButton}>
                        <IconButton onClick={() => setDrawerOpen(true)}>
                            <FaBars />
                        </IconButton>
                    </div>
                </div>
            </motion.header>

            <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    );
};

export default Header;
