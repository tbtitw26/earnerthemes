import React from 'react';
import type { Metadata } from "next";

import Checkout from '@/components/widgets/checkout/Checkout';

/**
 * Test checkout used to verify the top-up, receipt and confirmation-email flow
 * before a payment provider is connected. Kept out of search engines.
 */
export const metadata: Metadata = {
    title: "Test Checkout",
    robots: { index: false, follow: false },
};

const Page = () => {
    return <Checkout testMode/>;
};

export default Page;
