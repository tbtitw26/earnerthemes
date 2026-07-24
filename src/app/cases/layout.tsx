import type { Metadata } from "next";

/**
 * This section is not part of the published site — see src/resources/unpublishedRoutes.ts.
 * It is kept out of the sitemap and robots.txt, and marked noindex here so it is
 * excluded from search engines even when reached by a direct link.
 */
export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
