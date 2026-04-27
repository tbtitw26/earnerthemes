export type EsimCountry = {
    name: string;
    code: string;
    region: "europe" | "asia" | "americas" | "africa" | "oceania" | "global";
    popular?: boolean;
    plans: {
        label: string;
        basePrice: number;
    }[];
};

export const ESIM_COUNTRIES: EsimCountry[] = [
    //global plans
    {
        name: "Global Basic",
        code: "UN",
        region: "global",
        plans: [
            { label: "5GB / 30 days", basePrice: 19 },
            { label: "10GB / 30 days", basePrice: 29 },
        ],
    },
    {
        name: "Global Plus",
        code: "UN",
        region: "global",
        plans: [
            { label: "20GB / 30 days", basePrice: 49 },
            { label: "Unlimited / 30 days", basePrice: 79 },
        ],
    },

    // 🌟 POPULAR
    {
        name: "United States", code: "US", region: "americas", popular: true, plans: [
            {label: "3GB / 15 days", basePrice: 6},
            {label: "10GB / 30 days", basePrice: 12},
        ]
    },
    {
        name: "United Kingdom", code: "GB", region: "europe", popular: true, plans: [
            {label: "Unlimited / 30 days", basePrice: 19},
        ]
    },
    {
        name: "Germany", code: "DE", region: "europe", popular: true, plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "France", code: "FR", region: "europe", popular: true, plans: [
            {label: "10GB / 30 days", basePrice: 12},
        ]
    },
    {
        name: "Japan", code: "JP", region: "asia", popular: true, plans: [
            {label: "1GB / 7 days", basePrice: 4.5},
            {label: "Unlimited / 15 days", basePrice: 18},
        ]
    },
    {
        name: "Thailand", code: "TH", region: "asia", popular: true, plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "United Arab Emirates", code: "AE", region: "asia", popular: true, plans: [
            {label: "5GB / 30 days", basePrice: 11},
        ]
    },
    {
        name: "Australia", code: "AU", region: "oceania", popular: true, plans: [
            {label: "10GB / 30 days", basePrice: 12},
        ]
    },
    {
        name: "Canada", code: "CA", region: "americas", popular: true, plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },

    // ===================== MISSING COUNTRIES =====================
    {
        name: "Ireland", code: "IE", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 11},
        ]
    },
    {
        name: "Switzerland", code: "CH", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 14},
        ]
    },
    {
        name: "Denmark", code: "DK", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 12},
        ]
    },
    {
        name: "Hungary", code: "HU", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Romania", code: "RO", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 8},
        ]
    },
    {
        name: "Bulgaria", code: "BG", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 8},
        ]
    },
    {
        name: "Croatia", code: "HR", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Slovenia", code: "SI", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Slovakia", code: "SK", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Estonia", code: "EE", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Latvia", code: "LV", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Lithuania", code: "LT", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Ukraine", code: "UA", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 7},
        ]
    },

    /* ===================== ASIA (MISSING) ===================== */
    {
        name: "Pakistan", code: "PK", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 8},
        ]
    },
    {
        name: "Bangladesh", code: "BD", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 7},
        ]
    },
    {
        name: "Nepal", code: "NP", region: "asia", plans: [
            {label: "3GB / 15 days", basePrice: 7},
        ]
    },
    {
        name: "Kazakhstan", code: "KZ", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Uzbekistan", code: "UZ", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Qatar", code: "QA", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 12},
        ]
    },
    {
        name: "Kuwait", code: "KW", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 12},
        ]
    },
    {
        name: "Oman", code: "OM", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 11},
        ]
    },

    /* ===================== AFRICA (MISSING) ===================== */
    {
        name: "Nigeria", code: "NG", region: "africa", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Ghana", code: "GH", region: "africa", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Tanzania", code: "TZ", region: "africa", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Uganda", code: "UG", region: "africa", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Senegal", code: "SN", region: "africa", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Ivory Coast", code: "CI", region: "africa", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },

    /* ===================== AMERICAS (MISSING) ===================== */
    {
        name: "Panama", code: "PA", region: "americas", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Costa Rica", code: "CR", region: "americas", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Dominican Republic", code: "DO", region: "americas", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },

    /* ===================== OCEANIA (MISSING) ===================== */
    {
        name: "Fiji", code: "FJ", region: "oceania", plans: [
            {label: "3GB / 15 days", basePrice: 9},
        ]
    },
    {
        name: "Papua New Guinea", code: "PG", region: "oceania", plans: [
            {label: "3GB / 15 days", basePrice: 10},
        ]
    },
    /* ===================== AMERICAS ===================== */
    {
        name: "United States", code: "US", region: "americas", plans: [
            {label: "3GB / 15 days", basePrice: 6},
            {label: "10GB / 30 days", basePrice: 12},
        ]
    },
    {
        name: "Canada", code: "CA", region: "americas", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Mexico", code: "MX", region: "americas", plans: [
            {label: "3GB / 15 days", basePrice: 7},
        ]
    },
    {
        name: "Brazil", code: "BR", region: "americas", plans: [
            {label: "5GB / 30 days", basePrice: 11},
        ]
    },
    {
        name: "Argentina", code: "AR", region: "americas", plans: [
            {label: "3GB / 15 days", basePrice: 8},
        ]
    },
    {
        name: "Chile", code: "CL", region: "americas", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Colombia", code: "CO", region: "americas", plans: [
            {label: "3GB / 15 days", basePrice: 7},
        ]
    },
    {
        name: "Peru", code: "PE", region: "americas", plans: [
            {label: "3GB / 15 days", basePrice: 7},
        ]
    },

    /* ===================== EUROPE ===================== */
    {
        name: "Germany", code: "DE", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "France", code: "FR", region: "europe", plans: [
            {label: "10GB / 30 days", basePrice: 12},
        ]
    },
    {
        name: "Italy", code: "IT", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 11},
        ]
    },
    {
        name: "Spain", code: "ES", region: "europe", plans: [
            {label: "10GB / 30 days", basePrice: 11.5},
        ]
    },
    {
        name: "United Kingdom", code: "GB", region: "europe", plans: [
            {label: "Unlimited / 30 days", basePrice: 19},
        ]
    },
    {
        name: "Netherlands", code: "NL", region: "europe", plans: [
            {label: "8GB / 30 days", basePrice: 11},
        ]
    },
    {
        name: "Belgium", code: "BE", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Austria", code: "AT", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Poland", code: "PL", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Czech Republic", code: "CZ", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Portugal", code: "PT", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Sweden", code: "SE", region: "europe", plans: [
            {label: "10GB / 30 days", basePrice: 13},
        ]
    },
    {
        name: "Norway", code: "NO", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 14},
        ]
    },
    {
        name: "Finland", code: "FI", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 13},
        ]
    },
    {
        name: "Greece", code: "GR", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Turkey", code: "TR", region: "europe", plans: [
            {label: "5GB / 30 days", basePrice: 9.5},
        ]
    },

    /* ===================== ASIA ===================== */
    {
        name: "Japan", code: "JP", region: "asia", plans: [
            {label: "1GB / 7 days", basePrice: 4.5},
            {label: "Unlimited / 15 days", basePrice: 18},
        ]
    },
    {
        name: "South Korea", code: "KR", region: "asia", plans: [
            {label: "5GB / 15 days", basePrice: 9},
        ]
    },
    {
        name: "China", code: "CN", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 12},
        ]
    },
    {
        name: "Thailand", code: "TH", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Vietnam", code: "VN", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 8},
        ]
    },
    {
        name: "Indonesia", code: "ID", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Malaysia", code: "MY", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "Philippines", code: "PH", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 9},
        ]
    },
    {
        name: "India", code: "IN", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 8},
        ]
    },
    {
        name: "Sri Lanka", code: "LK", region: "asia", plans: [
            {label: "3GB / 15 days", basePrice: 7},
        ]
    },
    {
        name: "United Arab Emirates", code: "AE", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 11},
        ]
    },
    {
        name: "Saudi Arabia", code: "SA", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 11},
        ]
    },
    {
        name: "Israel", code: "IL", region: "asia", plans: [
            {label: "5GB / 30 days", basePrice: 12},
        ]
    },

    /* ===================== AFRICA ===================== */
    {
        name: "South Africa", code: "ZA", region: "africa", plans: [
            {label: "5GB / 30 days", basePrice: 13},
        ]
    },
    {
        name: "Egypt", code: "EG", region: "africa", plans: [
            {label: "3GB / 15 days", basePrice: 8},
        ]
    },
    {
        name: "Morocco", code: "MA", region: "africa", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
    {
        name: "Tunisia", code: "TN", region: "africa", plans: [
            {label: "3GB / 15 days", basePrice: 8},
        ]
    },
    {
        name: "Kenya", code: "KE", region: "africa", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },

    /* ===================== OCEANIA ===================== */
    {
        name: "Australia", code: "AU", region: "oceania", plans: [
            {label: "10GB / 30 days", basePrice: 12},
        ]
    },
    {
        name: "New Zealand", code: "NZ", region: "oceania", plans: [
            {label: "5GB / 30 days", basePrice: 10},
        ]
    },
];
