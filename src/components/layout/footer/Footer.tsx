"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";
import {footerContent} from "@/resources/content";
import {footerStyles} from "@/resources/styles-config";
import {SmartLinkProps} from "@/types/smart-link";
import {FaInstagram, FaPinterest} from "react-icons/fa";
import visa from "@/assets/cards/visa.png";
import mastercard from "@/assets/cards/mastercard.png";
import pciDss from "@/assets/cards/pci-dss-compliant-logo-vector.svg";

const SmartLink: React.FC<SmartLinkProps> = ({href, className, children, ariaLabel, title, target, rel}) => {
    const isInternal = href?.startsWith("/");
    if (isInternal) {
        return (
            <Link href={href} className={className} aria-label={ariaLabel} title={title}>
                {children}
            </Link>
        );
    }
    return (
        <a href={href} className={className} aria-label={ariaLabel} title={title} target={target} rel={rel}>
            {children}
        </a>
    );
};

const Footer: React.FC = () => {
    const {logo, columns, contact, legal} = footerContent;

    return (
        <footer className={styles.footer}>
            {/* ── Main Section: Brand + Columns side by side ── */}
            <div className={styles.mainSection}>
                <div className={styles.inner}>
                    <div className={styles.mainGrid}>
                        {/* Brand column */}
                        <div className={styles.brand}>
                            <SmartLink href={logo.href} className={styles.logoLink}>
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={footerStyles.logo?.width}
                                    height={footerStyles.logo?.height}
                                    className={styles.logoImg}
                                />
                            </SmartLink>
                            <p className={styles.brandDesc}>
                                Premium marketplace for website templates, landing pages, eCommerce designs, and modern web layouts built to help you launch faster.
                            </p>
                            <div className={styles.socials}>
                                <a href="https://www.instagram.com/terafit.eu" className={styles.socialLink} aria-label="Instagram">
                                    <FaInstagram />
                                </a>
                                <a href="https://www.pinterest.com/terafitgo/" className={styles.socialLink} aria-label="Pinterest">
                                    <FaPinterest />
                                </a>
                            </div>
                        </div>

                        {/* Link columns */}
                        {columns.map((col) => (
                            <div className={styles.column} key={col.title}>
                                <h4 className={styles.columnTitle}>{col.title}</h4>
                                <nav className={styles.nav}>
                                    {col.links.map((link) => (
                                        <SmartLink key={link.label} href={link.href} className={styles.link}>
                                            {link.label}
                                        </SmartLink>
                                    ))}
                                </nav>
                            </div>
                        ))}

                        {/* Company column */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Company</h4>
                            <div className={styles.legalInfo}>
                                <div className={styles.legalLine}>
                                    <span className={styles.label}>Company:</span> <strong>{legal.companyName}</strong>
                                </div>
                                {legal.companyNumber && <div className={styles.legalLine}>{legal.companyNumber}</div>}
                                <div className={styles.contactItems}>
                                    {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
                                    {contact.phone && <a href={`tel:${contact.phone}`}>{contact.phone}</a>}
                                    {contact.address && <span>{contact.address}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom Section: Payments + Copyright ── */}
            <div className={styles.bottomSection}>
                <div className={styles.inner}>
                    <div className={styles.bottomGrid}>
                        <p className={styles.copyright}>
                            © {new Date().getFullYear()} {legal.companyName}. All rights reserved.
                        </p>
                        <div className={styles.paymentsContent}>
                            <Image src={visa} alt="Visa" placeholder="blur" className={styles.paymentIconColor} />
                            <Image src={mastercard} alt="Mastercard" placeholder="blur" className={styles.paymentIconColor} />
                            <Image src={pciDss} alt="PCI DSS Compliant" className={styles.paymentIconColor} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;