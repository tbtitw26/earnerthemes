"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CVOrderType } from "@/backend/types/cv.types";
import { TemplatePurchaseType } from "@/backend/types/template-purchase.types";

export interface AiOrder {
    _id: string;
    userId: string;
    email: string;
    prompt: string;
    response: string;
    createdAt: string;
}

interface AllOrdersContextType {
    aiOrders: AiOrder[];
    cvOrders: CVOrderType[];
    templatePurchases: TemplatePurchaseType[];
    refreshOrders: () => Promise<void>;
    loading: boolean;
}

const AllOrdersContext = createContext<AllOrdersContextType>({
    aiOrders: [],
    cvOrders: [],
    templatePurchases: [],
    refreshOrders: async () => {},
    loading: false,
});

export const useAllOrders = () => useContext(AllOrdersContext);

export const AllOrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [aiOrders, setAiOrders] = useState<AiOrder[]>([]);
    const [cvOrders, setCvOrders] = useState<CVOrderType[]>([]);
    const [templatePurchases, setTemplatePurchases] = useState<TemplatePurchaseType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            // 🔹 Отримуємо CV ордери
            const resCv = await fetch("/api/cv/get-all-orders", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const dataCv = await resCv.json();
            const normalizedCv = Array.isArray(dataCv) ? dataCv : dataCv.orders;
            setCvOrders(Array.isArray(normalizedCv) ? normalizedCv : []);

            // 🔹 (опціонально) AI ордери
            const resAi = await fetch("/api/universal/get-orders", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }).catch(() => null);
            if (resAi) {
                const dataAi = await resAi.json();
                const normalizedAi = Array.isArray(dataAi) ? dataAi : dataAi.orders;
                setAiOrders(Array.isArray(normalizedAi) ? normalizedAi : []);
            }

            const resTemplates = await fetch("/api/template-purchases/purchased", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }).catch(() => null);
            if (resTemplates) {
                const dataTemplates = await resTemplates.json();
                const normalizedTemplates = Array.isArray(dataTemplates) ? dataTemplates : dataTemplates.purchases;
                setTemplatePurchases(Array.isArray(normalizedTemplates) ? normalizedTemplates : []);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Unknown error";
            console.error("❌ [AllOrdersContext] Error fetching orders:", message);
            setAiOrders([]);
            setCvOrders([]);
            setTemplatePurchases([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <AllOrdersContext.Provider value={{ aiOrders, cvOrders, templatePurchases, refreshOrders: fetchOrders, loading }}>
            {children}
        </AllOrdersContext.Provider>
    );
};
