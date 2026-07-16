import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const sitePath = new URL(siteConfig.url).pathname.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [`${sitePath}/admin/`]
    },
    sitemap: absoluteUrl("/sitemap.xml")
  };
}
