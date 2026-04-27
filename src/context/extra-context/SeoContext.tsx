"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export interface SeoRequest {
    _id: string;
    userId: string;
    email: string;
    service: string;
    message?: string;
    amountUsed: number;
    status: string;
    createdAt: string;
}

interface SeoRequestsContextType {
    seoRequests: SeoRequest[];
    loading: boolean;
    refreshSeoRequests: () => Promise<void>;
}

const SeoRequestsContext = createContext<SeoRequestsContextType>({
    seoRequests: [],
    loading: false,
    refreshSeoRequests: async () => {},
});

export const useSeoRequests = () => useContext(SeoRequestsContext);

export const SeoRequestsProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                                 children,
                                                                             }) => {
    const user = useUser();
    const [seoRequests, setSeoRequests] = useState<SeoRequest[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchSeoRequests = async () => {
        if (!user?._id) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/seo-request/get-all?userId=${user._id}`);

            if (!res.ok) throw new Error("Failed to fetch SEO requests");
            const data = await res.json();

            const normalized =
                Array.isArray(data) ? data : data.requests || data.seoRequests;
            setSeoRequests(Array.isArray(normalized) ? normalized : []);
        } catch (err: any) {
            console.error("❌ [SeoRequestsContext] Error:", err.message);
            setSeoRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeoRequests();
    }, [user?._id]);

    return (
        <SeoRequestsContext.Provider
            value={{ seoRequests, loading, refreshSeoRequests: fetchSeoRequests }}
        >
            {children}
        </SeoRequestsContext.Provider>
    );
};
