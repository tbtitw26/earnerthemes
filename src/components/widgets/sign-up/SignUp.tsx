"use client";

import {
    Formik,
    FormikHelpers,
    Form,
    Field,
    ErrorMessage,
    useFormikContext,
} from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useAlert } from "@/context/AlertContext";

import InputUI from "@/components/ui/input/InputUI";
import ButtonUI from "@/components/ui/button/ButtonUI";
import CountrySelect from "@/components/ui/country-select/CountrySelect";
import styles from "./SignUp.module.scss";
import asideImage from "@/assets/images/image7.png";

import {
    signUpInitialValues,
    signUpValidation,
    signUpOnSubmit,
} from "@/validationSchemas/sign-up/schema";

export type SignUpValues = typeof signUpInitialValues;

function SignUpForm({ isSubmitting }: { isSubmitting: boolean }) {
    const { values } = useFormikContext<SignUpValues>();
    const isButtonDisabled = isSubmitting || !values.terms;

    return (
        <Form className={styles.form}>
            <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Name</label>
                    <InputUI name="firstName" type="text" placeholder="John" formik />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Surname</label>
                    <InputUI name="lastName" type="text" placeholder="Doe" formik />
                </div>
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Email address</label>
                <InputUI
                    name="email"
                    type="email"
                    placeholder="john.doe@enterprise.com"
                    formik
                />
            </div>

            <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Password</label>
                    <InputUI
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        formik
                    />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Confirm password</label>
                    <InputUI
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        formik
                    />
                </div>
            </div>

            <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Phone number</label>
                    <InputUI
                        name="phoneNumber"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        formik
                    />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Date of birth</label>
                    <InputUI
                        name="dateOfBirth"
                        type="date"
                        placeholder="mm/dd/yyyy"
                        formik
                    />
                </div>
            </div>

            <h3 className={styles.sectionHeading}>Address Details</h3>

            <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Street address</label>
                <InputUI
                    name="street"
                    type="text"
                    placeholder="123 Business Way"
                    formik
                />
            </div>

            <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>City</label>
                    <InputUI
                        name="city"
                        type="text"
                        placeholder="San Francisco"
                        formik
                    />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Post code</label>
                    <InputUI
                        name="postCode"
                        type="text"
                        placeholder="94105"
                        formik
                    />
                </div>
            </div>

            <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Country</label>
                    <CountrySelect name="country" placeholder="Select a country" />
                </div>
                <div className={styles.fieldGroup} />
            </div>

            <p className={styles.hint}>
                Note: Services unavailable in restricted jurisdictions.
            </p>

            <div className={styles.termsBlock}>
                <label className={styles.termsLabel}>
                    <Field type="checkbox" name="terms" />
                    <span>
                        I agree to the{" "}
                        <a href="/terms-and-conditions" target="_blank" rel="noreferrer">
                            Terms &amp; Conditions
                        </a>{" "}
                        and{" "}
                        <a href="/privacy-policy" target="_blank" rel="noreferrer">
                            Privacy Policy
                        </a>
                        . I understand my data will be handled according to enterprise
                        security standards.
                    </span>
                </label>

                <ErrorMessage
                    name="terms"
                    component="div"
                    className={styles.errorText}
                />
            </div>

            <ButtonUI
                type="submit"
                text="Create Account →"
                disabled={isButtonDisabled}
                loading={isSubmitting}
                fullWidth
            />
        </Form>
    );
}

function ShowcaseCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const target = { x: -8, y: 6 };
        const current = { x: -8, y: 6 };
        let rafId = 0;

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            current.x = lerp(current.x, target.x, 0.12);
            current.y = lerp(current.y, target.y, 0.12);

            if (cardRef.current) {
                cardRef.current.style.transform = `rotateY(${current.x}deg) rotateX(${current.y}deg)`;
            }

            rafId = requestAnimationFrame(animate);
        };

        const onMouseMove = (e: MouseEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;

            target.x = nx * -10;
            target.y = ny * 9;
        };

        window.addEventListener("mousemove", onMouseMove);
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className={styles.showcase}>
            <div className={styles.cardPerspective}>
                <div className={styles.tiltCard} ref={cardRef}>
                    <Image
                        src={asideImage}
                        alt="Premium template preview"
                        fill
                        priority
                        quality={95}
                        sizes="(max-width: 1360px) 42vw, 560px"
                        className={styles.cardImage}
                    />

                    <div className={styles.cardGlow} />
                    <div className={styles.cardOverlay}>
                        <span className={styles.cardBadge}>Premium Template Preview</span>
                    </div>
                </div>
            </div>

            <div className={styles.showcaseBottom}>
                <div className={styles.showcaseAccent} />

                <div className={styles.showcaseInfo}>
                    <h3 className={styles.showcaseTitle}>The Professional Choice</h3>

                    <div className={styles.showcaseBadges}>
                        <div className={styles.badgeCard}>
                            <span className={styles.badgeIcon}>✦</span>
                            <span className={styles.badgeText}>Quality Guaranteed</span>
                        </div>

                        <div className={styles.badgeCard}>
                            <span className={styles.badgeIcon}>◌</span>
                            <span className={styles.badgeText}>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SignUp() {
    const { showAlert } = useAlert();
    const router = useRouter();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.formColumn}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>Create your account</h1>
                        <p className={styles.subtitle}>
                            Join the enterprise marketplace for high-performance assets.
                        </p>
                    </header>

                    <Formik<SignUpValues>
                        initialValues={signUpInitialValues}
                        validate={signUpValidation}
                        onSubmit={(values, helpers: FormikHelpers<SignUpValues>) =>
                            signUpOnSubmit(values, helpers, showAlert, router)
                        }
                    >
                        {({ isSubmitting }) => (
                            <SignUpForm isSubmitting={isSubmitting} />
                        )}
                    </Formik>
                </div>

                <div className={styles.showcaseColumn}>
                    <ShowcaseCard />
                </div>
            </div>
        </div>
    );
}