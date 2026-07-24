"use client";

import { Formik, FormikHelpers, Form } from "formik";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";

import InputUI from "@/components/ui/input/InputUI";
import ButtonUI from "@/components/ui/button/ButtonUI";
import styles from "./SignIn.module.scss";

import {
    signInInitialValues,
    signInValidation,
    signInOnSubmit,
} from "@/validationSchemas/sign-in/schema";

export type SignInValues = {
    email: string;
    password: string;
};

export default function SignIn() {
    const { showAlert } = useAlert();
    const router = useRouter();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.formColumn}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>Sign In to Your Account</h1>
                        <p className={styles.subtitle}>
                            Access your purchased templates, downloads and Account Balance.
                        </p>
                    </header>

                    <Formik<SignInValues>
                        initialValues={signInInitialValues}
                        validate={signInValidation}
                        onSubmit={(values, helpers: FormikHelpers<SignInValues>) =>
                            signInOnSubmit(values, helpers, showAlert, router)
                        }
                    >
                        {({ isSubmitting }) => (
                            <Form className={styles.form}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>Email address</label>
                                    <InputUI
                                        name="email"
                                        type="email"
                                        placeholder="john.doe@enterprise.com"
                                        formik
                                    />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>Password</label>
                                    <InputUI
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        formik
                                    />
                                </div>

                                <ButtonUI
                                    type="submit"
                                    text="Sign In to Dashboard"
                                    disabled={isSubmitting}
                                    loading={isSubmitting}
                                    fullWidth
                                />
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}