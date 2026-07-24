"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface TemplatePriceProps {
    /** Amount as stored in the catalog. */
    value: number;
    /** Currency the catalog amount is denominated in (defaults to the base currency). */
    currency?: string;
}

/**
 * Renders a catalog price in the currency the customer selected.
 * Lives in its own client component so server-rendered pages can use it too.
 */
const TemplatePrice: React.FC<TemplatePriceProps> = ({ value, currency }) => {
    const { formatPrice } = useCurrency();

    return <>{formatPrice(value, currency)}</>;
};

export default TemplatePrice;
