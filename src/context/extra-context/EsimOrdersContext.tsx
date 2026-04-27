"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export interface EsimOrder {
    _id: string;
    userId: string;
    email: string;
    country: string;
    countryCode: string;
    plan: string;
    amountUsed: number;
    status: "paid" | "delivered";
    createdAt: string;
}

interface EsimOrdersContextType {
    orders: EsimOrder[];
    loading: boolean;
    refreshOrders: () => Promise<void>;
}

const EsimOrdersContext = createContext<EsimOrdersContextType>({
    orders: [],
    loading: false,
    refreshOrders: async () => {},
});

export const useEsimOrders = () => useContext(EsimOrdersContext);

export const EsimOrdersProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                                children,
                                                                            }) => {
    const user = useUser();
    const [orders, setOrders] = useState<EsimOrder[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        if (!user?._id) return;

        setLoading(true);
        try {
            const res = await fetch("/api/e-sim/get-all");

            if (!res.ok) throw new Error("Failed to fetch eSIM orders");

            const data = await res.json();
            setOrders(Array.isArray(data.orders) ? data.orders : []);
        } catch (err: any) {
            console.error("❌ [EsimOrdersContext]", err.message);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user?._id]);

    return (
        <EsimOrdersContext.Provider
            value={{ orders, loading, refreshOrders: fetchOrders }}
        >
            {children}
        </EsimOrdersContext.Provider>
    );
};
