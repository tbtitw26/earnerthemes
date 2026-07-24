"use client";

import { pdf } from "@react-pdf/renderer";

import { renderReceiptPDF, ReceiptData } from "./ReceiptRenderer";

export async function downloadReceiptPDF(data: ReceiptData) {
    const blob = await pdf(renderReceiptPDF(data)).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${data.reference}.pdf`;
    link.click();

    URL.revokeObjectURL(url);
}
