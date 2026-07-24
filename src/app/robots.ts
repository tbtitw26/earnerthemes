import { baseURL } from "@/resources/content";
import { UNPUBLISHED_ROUTES } from "@/resources/unpublishedRoutes";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // A path without a trailing slash is treated as a prefix, so this also
        // covers every nested route (e.g. /extra/chefs, /extra/esim-store).
        disallow: [...UNPUBLISHED_ROUTES],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
