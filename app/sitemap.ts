import type { MetadataRoute } from "next";
import { getPublishedApps } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const staticRoutes = ["/", "/apps/", "/about/", "/contact/", "/privacy/", "/terms/", "/cookies/"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apps = await getPublishedApps();
  const appRoutes = apps.flatMap((app) => [
    `/apps/${app.slug}/`,
    `/apps/${app.slug}/privacy/`,
    `/apps/${app.slug}/terms/`,
    ...(app.legal.subscriptions ? [`/apps/${app.slug}/subscriptions/`] : []),
    `/apps/${app.slug}/support/`,
    `/apps/${app.slug}/faq/`
  ]);

  return [...staticRoutes, ...appRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-07-11"),
    changeFrequency: route.includes("/apps/") ? "monthly" : "weekly",
    priority: route === "/" ? 1 : 0.7
  }));
}
