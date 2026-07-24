import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

import {
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
    COMPANY_LEGAL_NAME,
    COMPANY_NAME,
    COMPANY_NUMBER,
} from "@/resources/constants";

export interface ReceiptData {
    reference: string;
    issuedAt: string;
    customerEmail: string;
    description: string;
    currency: string;
    /** Gross (VAT-inclusive) amount actually charged. */
    grossAmount: number;
    netAmount: number;
    vatAmount: number;
    vatRate: number;
    balanceAfter: number;
    balanceCurrency: string;
    billingDescriptor?: string;
    simulated?: boolean;
}

const colors = {
    text: "#111827",
    muted: "#6B7280",
    border: "#D1D5DB",
    accent: "#2563EB",
};

const styles = StyleSheet.create({
    page: {
        padding: 48,
        backgroundColor: "#FFFFFF",
        fontFamily: "Helvetica",
        fontSize: 10.5,
        color: colors.text,
        lineHeight: 1.5,
    },
    header: {
        borderBottomWidth: 2,
        borderBottomColor: colors.accent,
        paddingBottom: 12,
        marginBottom: 20,
    },
    title: { fontSize: 20, fontWeight: "bold", textTransform: "uppercase" },
    subtitle: { fontSize: 10, color: colors.muted, marginTop: 4 },
    section: { marginBottom: 18 },
    sectionTitle: {
        fontSize: 9,
        color: colors.muted,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 6,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 8,
        marginTop: 6,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    bold: { fontWeight: "bold" },
    muted: { color: colors.muted },
    notice: {
        marginTop: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: colors.border,
        fontSize: 9,
        color: colors.muted,
    },
    footer: {
        marginTop: 28,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        fontSize: 9,
        color: colors.muted,
    },
});

const money = (amount: number, currency: string) =>
    `${currency} ${amount.toFixed(2)}`;

export function renderReceiptPDF(data: ReceiptData) {
    return (
        <Document
            title={`Receipt ${data.reference}`}
            author={COMPANY_LEGAL_NAME ?? COMPANY_NAME ?? "EarnerThemes"}
        >
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Receipt</Text>
                    <Text style={styles.subtitle}>
                        {COMPANY_NAME ?? "EarnerThemes"} · Receipt no. {data.reference}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Issued by</Text>
                    <Text style={styles.bold}>{COMPANY_LEGAL_NAME}</Text>
                    <Text style={styles.muted}>Company number: {COMPANY_NUMBER}</Text>
                    <Text style={styles.muted}>{COMPANY_ADDRESS}</Text>
                    <Text style={styles.muted}>{COMPANY_EMAIL}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Issued to</Text>
                    <Text>{data.customerEmail}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <View style={styles.row}>
                        <Text style={styles.muted}>Date</Text>
                        <Text>{data.issuedAt}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.muted}>Description</Text>
                        <Text>{data.description}</Text>
                    </View>
                    {data.billingDescriptor ? (
                        <View style={styles.row}>
                            <Text style={styles.muted}>Card statement descriptor</Text>
                            <Text>{data.billingDescriptor}</Text>
                        </View>
                    ) : null}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Amount</Text>
                    <View style={styles.row}>
                        <Text style={styles.muted}>Net amount</Text>
                        <Text>{money(data.netAmount, data.currency)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.muted}>
                            VAT ({Math.round(data.vatRate * 100)}%), included
                        </Text>
                        <Text>{money(data.vatAmount, data.currency)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.bold}>Total paid (incl. VAT)</Text>
                        <Text style={styles.bold}>{money(data.grossAmount, data.currency)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.muted}>Account Balance after this transaction</Text>
                        <Text>{money(data.balanceAfter, data.balanceCurrency)}</Text>
                    </View>
                </View>

                {data.simulated ? (
                    <Text style={styles.notice}>
                        Test transaction. No card was charged and no funds were taken.
                    </Text>
                ) : null}

                <Text style={styles.footer}>
                    Account Balance is non-transferable store credit usable only on{" "}
                    {COMPANY_NAME ?? "EarnerThemes"}. It is not cryptocurrency, is not tradable and is
                    not redeemable for cash. This receipt was generated electronically and is valid
                    without a signature.
                </Text>
            </Page>
        </Document>
    );
}
