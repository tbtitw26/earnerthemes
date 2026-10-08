"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import styles from "./TemplatePurchaseConfirmDialog.module.scss";
import { DELIVERY_NOTICE, WITHDRAWAL_WAIVER_TEXT } from "@/resources/constants";
import {
    LICENCE_ACKNOWLEDGEMENT_TEXT,
    LICENCE_AGREEMENT_HREF,
    STANDARD_LICENCE_RESTRICTIONS,
} from "@/resources/licence";

interface TemplatePurchaseConfirmItem {
    id: string;
    title: string;
    meta?: string;
    priceLabel: string;
    /** Licence name plus scope, e.g. "Standard Licence · 1 End Product · 1 Production Website". */
    licenceLabel?: string;
    /** Product-Specific Terms that apply to this item on top of the Licence Agreement. */
    productTerms?: string[];
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
    // The licence scope must be accepted, not merely displayed, before payment.
    const [licenceAccepted, setLicenceAccepted] = useState(false);

    const itemsWithProductTerms = items.filter((item) => item.productTerms?.length);

    useEffect(() => {
        if (!open) {
            setWaiverAccepted(false);
            setLicenceAccepted(false);
        }
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
                                {item.licenceLabel ? (
                                    <span className={styles.itemLicence}>{item.licenceLabel}</span>
                                ) : null}
                            </div>
                            <div className={styles.itemPrice}>{item.priceLabel}</div>
                        </div>
                    ))}
                </div>

                <div className={styles.totalRow}>
                    <span>Total</span>
                    <strong>{totalLabel}</strong>
                </div>

                <div className={styles.deliveryPanel}>
                    <h3>Delivery</h3>
                    <p>{DELIVERY_NOTICE}</p>
                </div>

                <div className={styles.licencePanel}>
                    <h3>Licence you are buying</h3>
                    <ul>
                        {STANDARD_LICENCE_RESTRICTIONS.map((restriction) => (
                            <li key={restriction}>{restriction}</li>
                        ))}
                    </ul>

                    {itemsWithProductTerms.length ? (
                        <div className={styles.productTerms}>
                            <h4>Product-Specific Terms</h4>
                            {itemsWithProductTerms.map((item) => (
                                <div key={`${item.id}-terms`}>
                                    <strong>{item.title}</strong>
                                    <ul>
                                        {item.productTerms?.map((term) => (
                                            <li key={term}>{term}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : null}

                    <Link href={LICENCE_AGREEMENT_HREF} target="_blank" className={styles.licenceLink}>
                        Read the full Digital Product Licence Agreement
                    </Link>
                </div>

                <label className={styles.waiver}>
                    <input
                        type="checkbox"
                        checked={licenceAccepted}
                        onChange={(event) => setLicenceAccepted(event.target.checked)}
                        disabled={processing}
                    />
                    <span>{LICENCE_ACKNOWLEDGEMENT_TEXT}</span>
                </label>

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
                        disabled={processing || !waiverAccepted || !licenceAccepted}
                    >
                        {processing ? "Processing..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
