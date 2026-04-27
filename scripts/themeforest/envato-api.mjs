const ENVATO_API_BASE_URL = "https://api.envato.com";
const FETCH_TIMEOUT_MS = 12000;

function toSearchParams(query = {}) {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
            return;
        }

        if (Array.isArray(value)) {
            value.forEach((entry) => params.append(key, String(entry)));
            return;
        }

        params.set(key, String(value));
    });

    return params;
}

function getAuthToken() {
    return process.env.ENVANTO_API || process.env.ENVATO_API || "";
}

export class EnvatoApiError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = "EnvatoApiError";
        this.details = details;
    }
}

export class EnvatoApiClient {
    constructor({ fetchImpl = fetch } = {}) {
        this.fetchImpl = fetchImpl;
        this.token = getAuthToken().trim();
    }

    ensureToken() {
        if (!this.token) {
            throw new EnvatoApiError(
                "Missing Envato API token. Expected process.env.ENVANTO_API or process.env.ENVATO_API.",
            );
        }
    }

    async request(pathname, query = {}) {
        this.ensureToken();

        const search = toSearchParams(query).toString();
        const url = `${ENVATO_API_BASE_URL}${pathname}${search ? `?${search}` : ""}`;

        const response = await this.fetchImpl(url, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                Accept: "application/json",
            },
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });

        const text = await response.text();
        const payload = text ? safeJsonParse(text) : null;

        if (!response.ok) {
            throw new EnvatoApiError(
                `Envato API request failed with ${response.status} for ${pathname}`,
                { status: response.status, payload, text },
            );
        }

        return payload;
    }

    async getCatalogItem(itemId) {
        return this.request("/v3/market/catalog/item", { id: itemId });
    }

    async searchCatalogItems({ site = "themeforest.net", pageSize = 12, term = "", category = "", page = 1 }) {
        const candidates = [
            {
                pathname: "/v1/discovery/search/search/item",
                query: {
                    site,
                    page,
                    page_size: pageSize,
                    term,
                    category,
                    sort_by: "sales",
                },
            },
            {
                pathname: "/v1/discovery/search/search/item",
                query: {
                    site,
                    page,
                    page_size: pageSize,
                    term,
                    sort_by: "sales",
                },
            },
            {
                pathname: "/v3/market/catalog/search",
                query: {
                    site,
                    page,
                    page_size: pageSize,
                    term,
                    category,
                    sort_by: "sales",
                },
            },
        ];

        let lastError = null;

        for (const candidate of candidates) {
            try {
                return await this.request(candidate.pathname, candidate.query);
            } catch (error) {
                lastError = error;
            }
        }

        throw lastError || new EnvatoApiError("Unable to search Envato catalog.");
    }
}

export function extractCatalogItems(payload) {
    if (!payload) {
        return [];
    }

    if (Array.isArray(payload)) {
        return payload;
    }

    if (Array.isArray(payload.matches)) {
        return payload.matches;
    }

    if (Array.isArray(payload.items)) {
        return payload.items;
    }

    if (Array.isArray(payload.results)) {
        return payload.results;
    }

    if (payload.search && Array.isArray(payload.search.items)) {
        return payload.search.items;
    }

    return [];
}

function safeJsonParse(value) {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
}
