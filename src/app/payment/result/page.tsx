"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import styles from "./PaymentResult.module.scss";

interface PaymentStatusResponse {
    referenceId: string;
    status: "PENDING" | "COMPLETED" | "DECLINED" | "CANCELLED" | "ERROR";
    amount: number;
    currency: string;
    baseAmount: number;
    credited: boolean;
    errorCode?: string;
    errorMessage?: string;
}

function PaymentResultContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const referenceId = searchParams.get("referenceId");

    const [loading, setLoading] = useState(true);
    const [statusData, setStatusData] = useState<PaymentStatusResponse | null>(null);
    const [pollCount, setPollCount] = useState(0);

    // Support embedded iframe checkout events
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const data = event.data;
            if (data?.source !== "payment-checkout" || data?.type !== "checkout.state") return;

            if (data.state === "COMPLETED") {
                // Trigger immediate status re-check
                setPollCount((prev) => prev + 1);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    useEffect(() => {
        if (!referenceId) {
            setLoading(false);
            return;
        }

        let isMounted = true;
        let timer: NodeJS.Timeout | null = null;

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/payments/status?referenceId=${encodeURIComponent(referenceId)}`, {
                    cache: "no-store",
                });
                if (!res.ok) {
                    if (isMounted) setLoading(false);
                    return;
                }
                const data = (await res.json()) as PaymentStatusResponse;
                if (!isMounted) return;

                setStatusData(data);

                // If completed, refresh Next.js router to update session user balance
                if (data.status === "COMPLETED") {
                    setLoading(false);
                    router.refresh();
                    return;
                }

                // If still pending and polled less than 10 times, retry in 2.5s
                if (data.status === "PENDING" && pollCount < 10) {
                    timer = setTimeout(() => {
                        setPollCount((p) => p + 1);
                    }, 2500);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error fetching payment status:", err);
                if (isMounted) setLoading(false);
            }
        };

        checkStatus();

        return () => {
            isMounted = false;
            if (timer) clearTimeout(timer);
        };
    }, [referenceId, pollCount, router]);

    if (!referenceId) {
        return (
            <div className={styles.container}>
                <div className={`${styles.iconWrapper} ${styles.error}`}>
                    <XCircle />
                </div>
                <h1 className={styles.title}>Missing Reference</h1>
                <p className={styles.subtitle}>
                    No payment reference was provided. If you believe this is an error, please check your profile or contact support.
                </p>
                <div className={styles.actions}>
                    <Link href="/profile" className={styles.primaryBtn}>
                        Go to Profile
                    </Link>
                </div>
            </div>
        );
    }

    if (loading && (!statusData || statusData.status === "PENDING")) {
        return (
            <div className={styles.container}>
                <div className={`${styles.iconWrapper} ${styles.pending}`}>
                    <div className={styles.spinner} />
                </div>
                <h1 className={styles.title}>Confirming Payment...</h1>
                <p className={styles.subtitle}>
                    We are verifying your transaction with the payment gateway. This may take a few moments.
                </p>
                <div className={styles.detailsCard}>
                    <div className={styles.row}>
                        <span>Reference</span>
                        <span>{referenceId}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (statusData?.status === "COMPLETED") {
        return (
            <div className={styles.container}>
                <div className={`${styles.iconWrapper} ${styles.success}`}>
                    <CheckCircle2 />
                </div>
                <h1 className={styles.title}>Payment Successful!</h1>
                <p className={styles.subtitle}>
                    Your transaction has been confirmed and your account balance has been topped up. A receipt has been sent to your email.
                </p>

                <div className={styles.detailsCard}>
                    <div className={styles.row}>
                        <span>Reference</span>
                        <span>{statusData.referenceId}</span>
                    </div>
                    <div className={styles.row}>
                        <span>Amount Charged</span>
                        <span>
                            {statusData.currency} {statusData.amount?.toFixed(2)}
                        </span>
                    </div>
                    <div className={styles.row}>
                        <span>Credited to Wallet</span>
                        <span style={{ color: "#16a34a", fontWeight: 700 }}>
                            €{statusData.baseAmount?.toFixed(2)} EUR
                        </span>
                    </div>
                    <div className={styles.row}>
                        <span>Status</span>
                        <span style={{ color: "#16a34a" }}>Completed</span>
                    </div>
                </div>

                <div className={styles.actions}>
                    <a href="/templates" className={styles.primaryBtn}>
                        Browse Templates
                    </a>
                    <a href="/profile" className={styles.secondaryBtn}>
                        View Profile &amp; Balance
                    </a>
                </div>
            </div>
        );
    }

    if (statusData?.status === "CANCELLED") {
        return (
            <div className={styles.container}>
                <div className={`${styles.iconWrapper} ${styles.pending}`}>
                    <Clock />
                </div>
                <h1 className={styles.title}>Payment Cancelled</h1>
                <p className={styles.subtitle}>
                    The payment was cancelled or timed out. No funds were debited from your account.
                </p>
                <div className={styles.actions}>
                    <Link href="/checkout" className={styles.primaryBtn}>
                        Try Again
                    </Link>
                    <Link href="/contact-us" className={styles.secondaryBtn}>
                        Contact Support
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.iconWrapper} ${styles.error}`}>
                <XCircle />
            </div>
            <h1 className={styles.title}>Payment Declined</h1>
            <p className={styles.subtitle}>
                {statusData?.errorMessage || "The payment could not be processed by your card issuer or payment gateway."}
            </p>

            <div className={styles.detailsCard}>
                <div className={styles.row}>
                    <span>Reference</span>
                    <span>{referenceId}</span>
                </div>
                {statusData?.errorCode ? (
                    <div className={styles.row}>
                        <span>Reason Code</span>
                        <span>{statusData.errorCode}</span>
                    </div>
                ) : null}
            </div>

            <div className={styles.actions}>
                <Link href="/checkout" className={styles.primaryBtn}>
                    Try Again
                </Link>
                <Link href="/contact-us" className={styles.secondaryBtn}>
                    Need Help?
                </Link>
            </div>
        </div>
    );
}

export default function PaymentResultPage() {
    return (
        <Suspense
            fallback={
                <div className={styles.container}>
                    <h1 className={styles.title}>Loading payment status...</h1>
                </div>
            }
        >
            <PaymentResultContent />
        </Suspense>
    );
}
