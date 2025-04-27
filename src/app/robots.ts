import { APP_BASE_URL, RELATIVE_PATHS } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: RELATIVE_PATHS.homePage,
    },
    sitemap: `${APP_BASE_URL}/sitemap.xml`,
  };
}
