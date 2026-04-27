import EsimCheckout from "@/components/extra/e-sim/esim-checkout/EsimCheckout";

type CheckoutPageProps = {
    searchParams: {
        country?: string;
        code?: string;
        plan?: string;
        basePrice?: string;
    };
};

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
    const { country, code, plan, basePrice } = searchParams;

    if (!country || !code || !plan || !basePrice) {
        return <div style={{ padding: 80 }}>Invalid checkout data</div>;
    }

    return (
        <EsimCheckout
            country={country}
            code={code}
            plan={plan}
            basePrice={Number(basePrice)}
        />
    );
}
