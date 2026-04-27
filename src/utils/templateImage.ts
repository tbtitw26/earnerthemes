const ALLOWED_IMAGE_HOSTS = [
    ".freepik.com",
    "media.shipster.se",
    ".envatousercontent.com",
    "s3.envato.com",
];

export function getValidTemplateImageUrl(value?: string): string | null {
    if (!value || value === "undefined" || value === "null") {
        return null;
    }

    try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
            return null;
        }

        if (url.pathname.endsWith("/favicon.ico")) {
            return null;
        }

        const hostname = url.hostname.toLowerCase();
        const isAllowedHost = ALLOWED_IMAGE_HOSTS.some((allowedHost) => {
            if (allowedHost.startsWith(".")) {
                return hostname.endsWith(allowedHost);
            }

            return hostname === allowedHost;
        });

        return isAllowedHost ? url.toString() : null;
    } catch {
        return null;
    }
}
