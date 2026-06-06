import type { MetadataRoute } from "next";
import { apps } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const staticRoutes = ["/", "/apps/", "/about/", "/contact/", "/privacy/", "/terms/", "/cookies/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const appRoutes = apps.flatMap((app) => [
    `/apps/${app.slug}/`,
    `/apps/${app.slug}/privacy/`,
    `/apps/${app.slug}/terms/`,
    `/apps/${app.slug}/support/`,
    `/apps/${app.slug}/faq/`
  ]);

  return [...staticRoutes, ...appRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-06-06"),
    changeFrequency: route.includes("/apps/") ? "monthly" : "weekly",
    priority: route === "/" ? 1 : 0.7
  }));
}
