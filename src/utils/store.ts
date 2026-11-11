import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ThemeTemplate } from "@/types/theme-template";
import { convertToBaseCurrency, isSupportedCurrency, roundMoney, BASE_CURRENCY } from "@/utils/money";

export interface CheckoutPlan {
    title: string;
    basePrice: number;
    amount: number;
    currency: string;
    variant: string;
    /**
     * The exact price shown to the customer in `currency`.
     * Kept alongside basePrice so the amount is never re-derived by converting
     * to the base currency and back, which would round it off by a cent.
     */
    displayPrice?: number;
}

interface CheckoutStore {
    plan: CheckoutPlan | null;
    setPlan: (plan: CheckoutPlan) => void;
    clearPlan: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
    plan: null,
    setPlan: (plan) => set({ plan }),
    clearPlan: () => set({ plan: null }),
}));

export interface TemplateCartItem {
    templateId: string;
    templateSlug: string;
    title: string;
    previewImage?: string;
    price: number;
    currency: string;
    platform: string;
    category: string;
    author: string;
    sourceUrl: string;
    livePreviewUrl?: string;
}

interface TemplateCartStore {
    items: TemplateCartItem[];
    addItem: (item: TemplateCartItem) => { added: boolean };
    removeItem: (templateId: string) => void;
    removeItems: (templateIds: string[]) => void;
    clearCart: () => void;
    isInCart: (templateId: string) => boolean;
    getItemCount: () => number;
    getTotal: () => number;
}

function createTemplateCartItem(template: ThemeTemplate): TemplateCartItem {
    return {
        templateId: template.id,
        templateSlug: template.slug,
        title: template.title,
        previewImage: template.coverImage,
        price: template.price,
        currency: template.currency,
        platform: template.platform,
        category: template.category,
        author: template.author,
        sourceUrl: template.sourceUrl,
        livePreviewUrl: template.livePreviewUrl,
    };
}

export function getTemplateCartItemCount(items: TemplateCartItem[]) {
    return items.length;
}

/**
 * Cart total in the base currency (GBP).
 *
 * Catalog prices are per-template — an entry-level tier is priced in EUR while
 * the imported items are in USD — so the amounts must be converted before they
 * are added up. This matches what the backend charges
 * (`convertToBaseCurrency(template.price, template.currency)`).
 */
export function getTemplateCartTotal(items: TemplateCartItem[]) {
    return roundMoney(
        items.reduce((sum, item) => {
            const currency = isSupportedCurrency(item.currency) ? item.currency : BASE_CURRENCY;
            return sum + convertToBaseCurrency(item.price, currency);
        }, 0)
    );
}

export function isTemplateInCart(items: TemplateCartItem[], templateId: string) {
    return items.some((item) => item.templateId === templateId);
}

export const useTemplateCartStore = create<TemplateCartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const alreadyInCart = get().items.some((existing) => existing.templateId === item.templateId);
                if (alreadyInCart) {
                    return { added: false };
                }

                set((state) => ({ items: [...state.items, item] }));
                return { added: true };
            },
            removeItem: (templateId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.templateId !== templateId),
                })),
            removeItems: (templateIds) =>
                set((state) => ({
                    items: state.items.filter((item) => !templateIds.includes(item.templateId)),
                })),
            clearCart: () => set({ items: [] }),
            isInCart: (templateId) => get().items.some((item) => item.templateId === templateId),
            getItemCount: () => getTemplateCartItemCount(get().items),
            getTotal: () => getTemplateCartTotal(get().items),
        }),
        {
            name: "template-cart",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export { createTemplateCartItem };
