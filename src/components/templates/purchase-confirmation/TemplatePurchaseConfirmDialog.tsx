"use client";

import { useEffect, useState } from "react";

import styles from "./TemplatePurchaseConfirmDialog.module.scss";
import { WITHDRAWAL_WAIVER_TEXT } from "@/resources/constants";

interface TemplatePurchaseConfirmItem {
    id: string;
    title: string;
    meta?: string;
    priceLabel: string;
}

interface TemplatePurchaseConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    items: TemplatePurchaseConfirmItem[];
    totalLabel: string;
    confirmLabel?: string;
    cancelLabel?: string;
    processing?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function TemplatePurchaseConfirmDialog({
    open,
    title,
    description,
    items,
    totalLabel,
    confirmLabel = "Confirm purchase",
    cancelLabel = "Cancel",
    processing = false,
    onConfirm,
    onCancel,
}: TemplatePurchaseConfirmDialogProps) {
    // EU/UK consumers must waive their withdrawal right before digital content is delivered.
    const [waiverAccepted, setWaiverAccepted] = useState(false);

    useEffect(() => {
        if (!open) setWaiverAccepted(false);
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !processing) {
                onCancel();
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onCancel, processing]);

    if (!open) return null;

    return (
        <div className={styles.overlay} role="presentation">
            <div
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby="template-purchase-confirm-title"
                aria-describedby="template-purchase-confirm-description"
            >
                <div className={styles.header}>
                    <div>
                        <span className={styles.kicker}>Confirm purchase</span>
                        <h2 id="template-purchase-confirm-title">{title}</h2>
                        <p id="template-purchase-confirm-description">{description}</p>
                    </div>

                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onCancel}
                        disabled={processing}
                        aria-label="Close confirmation dialog"
                    >
                        ×
                    </button>
                </div>

                <div className={styles.itemsPanel}>
                    {items.map((item) => (
                        <div key={item.id} className={styles.itemRow}>
                            <div className={styles.itemCopy}>
                                <strong>{item.title}</strong>
                                {item.meta ? <span>{item.meta}</span> : null}
                            </div>
                            <div className={styles.itemPrice}>{item.priceLabel}</div>
                        </div>
                    ))}
                </div>

                <div className={styles.totalRow}>
                    <span>Total</span>
                    <strong>{totalLabel}</strong>
                </div>

                <label className={styles.waiver}>
                    <input
                        type="checkbox"
                        checked={waiverAccepted}
                        onChange={(event) => setWaiverAccepted(event.target.checked)}
                        disabled={processing}
                    />
                    <span>{WITHDRAWAL_WAIVER_TEXT}</span>
                </label>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={onCancel}
                        disabled={processing}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className={styles.confirmButton}
                        onClick={onConfirm}
                        disabled={processing || !waiverAccepted}
                    >
                        {processing ? "Processing..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
