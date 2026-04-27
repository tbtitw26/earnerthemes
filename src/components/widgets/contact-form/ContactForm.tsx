"use client";

import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import { FaArrowRight, FaClock, FaEnvelope, FaHeadset, FaShieldAlt } from "react-icons/fa";

import ButtonUI from "@/components/ui/button/ButtonUI";
import { COMPANY_EMAIL } from "@/resources/constants";
import { useAlert } from "@/context/AlertContext";

import { initialValues, sendContactRequest, validationSchema } from "./schema";
import styles from "./ContactForm.module.scss";

type ContactFormValues = typeof initialValues;

const supportHighlights = [
    {
        icon: FaClock,
        title: "Fast reply window",
        text: "Most messages get a response within 24 hours.",
    },
    {
        icon: FaShieldAlt,
        title: "Handled with care",
        text: "Questions about orders, payments, and accounts go directly to support.",
    },
    {
        icon: FaHeadset,
        title: "Human support",
        text: "Get practical help with your purchase or account without extra friction.",
    },
];

const ContactSupport: React.FC = () => {
    const { showAlert } = useAlert();
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (
        values: ContactFormValues,
        { setSubmitting, resetForm }: FormikHelpers<ContactFormValues>
    ) => {
        try {
            const payload = {
                ...values,
                phone: values.phone.replace(/\D/g, ""),
            };

            await sendContactRequest(payload);
            resetForm();
            setSuccessMsg(
                "Your message has been sent. Our culinary team will get back to you shortly."
            );
            showAlert("Success", "Message sent successfully", "success");
        } catch {
            showAlert("Error", "Something went wrong. Try again.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.hero}>
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h1 className={styles.title}>Talk to our team about your account, order, or next step.</h1>
                    <p className={styles.description}>
                        Reach out for help with purchases, support requests, wallet balance questions,
                        and anything else you need before or after checkout.
                    </p>

                    <div className={styles.metaRow}>
                        <a href={`mailto:${COMPANY_EMAIL}`} className={styles.metaCard}>
                            <span className={styles.metaIcon}>
                                <FaEnvelope />
                            </span>
                            <span>
                                <strong>Email support</strong>
                                <small>{COMPANY_EMAIL}</small>
                            </span>
                        </a>

                        <div className={styles.metaCard}>
                            <span className={styles.metaIcon}>
                                <FaClock />
                            </span>
                            <span>
                                <strong>Response time</strong>
                                <small>Usually within 24 hours</small>
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.highlights}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    viewport={{ once: true }}
                >
                    {supportHighlights.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div key={item.title} className={styles.highlightCard}>
                                <span className={styles.highlightIcon}>
                                    <Icon />
                                </span>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            <div className={styles.layout}>
                <motion.aside
                    className={styles.sidebar}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.sidebarCard}>
                        <span className={styles.sidebarLabel}>Support details</span>
                        <h2>Choose the fastest way to get unstuck.</h2>
                        <p>
                            Use the form for account issues, order questions, payment help, or general
                            product support. Clear details help us resolve things faster.
                        </p>

                        <div className={styles.supportList}>
                            <div className={styles.supportItem}>
                                <FaEnvelope />
                                <div>
                                    <strong>Email</strong>
                                    <span>{COMPANY_EMAIL}</span>
                                </div>
                            </div>

                            <div className={styles.supportItem}>
                                <FaClock />
                                <div>
                                    <strong>Reply window</strong>
                                    <span>Monday to Sunday, usually within 24 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.noteCard}>
                        <span className={styles.noteLabel}>Before you send</span>
                        <p>
                            Include your account email, order details, or the exact issue you are seeing.
                            That usually cuts down the back-and-forth significantly.
                        </p>
                    </div>
                </motion.aside>

                <motion.div
                    className={styles.formCard}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.formHeader}>
                        <span className={styles.formKicker}>Send a message</span>
                        <h2>Support request</h2>
                        <p>We will review your message and route it to the right person.</p>
                    </div>

                    {successMsg ? (
                        <div className={styles.success}>
                            <strong>Message sent successfully</strong>
                            <span>{successMsg}</span>
                        </div>
                    ) : (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            validateOnBlur
                            validateOnChange
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, isValid }) => (
                                <Form className={styles.form}>
                                    <div className={styles.row}>
                                        <div className={styles.field}>
                                            <label htmlFor="contact-name">First name</label>
                                            <Field id="contact-name" name="name" placeholder="Enter your first name" />
                                            <ErrorMessage name="name" component="div" className={styles.error} />
                                        </div>

                                        <div className={styles.field}>
                                            <label htmlFor="contact-second-name">Second name</label>
                                            <Field
                                                id="contact-second-name"
                                                name="secondName"
                                                placeholder="Enter your second name"
                                            />
                                            <ErrorMessage name="secondName" component="div" className={styles.error} />
                                        </div>
                                    </div>

                                    <div className={styles.row}>
                                        <div className={styles.field}>
                                            <label htmlFor="contact-email">Email address</label>
                                            <Field
                                                id="contact-email"
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                            />
                                            <ErrorMessage name="email" component="div" className={styles.error} />
                                        </div>

                                        <div className={styles.field}>
                                            <label htmlFor="contact-phone">Phone number</label>
                                            <Field
                                                id="contact-phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="+380 67 123 45 67"
                                            />
                                            <ErrorMessage name="phone" component="div" className={styles.error} />
                                        </div>
                                    </div>

                                    <div className={styles.field}>
                                        <label htmlFor="contact-message">How can we help?</label>
                                        <Field
                                            as="textarea"
                                            id="contact-message"
                                            name="message"
                                            placeholder="Tell us what you need help with, include any relevant order or account details, and we’ll take it from there."
                                            rows={6}
                                        />
                                        <ErrorMessage name="message" component="div" className={styles.error} />
                                    </div>

                                    <div className={styles.formFooter}>
                                        <div className={styles.policy}>
                                            By submitting this form, you agree to our <b>Privacy Policy</b>.
                                        </div>

                                        <ButtonUI
                                            type="submit"
                                            loading={isSubmitting}
                                            disabled={!isValid || isSubmitting}
                                            text="Send Message"
                                            endIcon={<FaArrowRight />}
                                            color="primary"
                                            size="lg"
                                            sx={{
                                                minHeight: 54,
                                                borderRadius: "14px",
                                                px: 3,
                                                fontWeight: 700,
                                                boxShadow: "0 18px 44px rgba(15, 23, 42, 0.12)",
                                            }}
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSupport;
