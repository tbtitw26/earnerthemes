/**
 * Routes that still exist in the codebase but are not part of the published site.
 * They carry content from unrelated projects, so they are kept out of the sitemap,
 * disallowed in robots.txt and marked noindex — the code stays in place.
 */
export const UNPUBLISHED_ROUTES = [
    "/services",
    "/join-team",
    "/dashboard",
    "/extra",
    "/checkout-test",
    "/cases",
    "/resources",
    "/success",
] as const;

/** True when a route is unpublished, including any nested route beneath it. */
export function isUnpublishedRoute(route: string): boolean {
    return UNPUBLISHED_ROUTES.some(
        (unpublished) => route === unpublished || route.startsWith(`${unpublished}/`)
    );
}
