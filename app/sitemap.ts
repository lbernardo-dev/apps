import type { MetadataRoute } from "next";
import { getPublishedApps } from "@/lib/content";
import { resourcesData } from "@/lib/resources-content";
import { absoluteUrl } from "@/lib/site";
import { SERVICES_SLUGS, STATIC_PAGES_SLUGS, SUBPAGE_SLUGS, getAppPath, getAppSubpagePath, getResourcePath, getServicePath, getStaticPath } from "@/lib/routes";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  const apps = await getPublishedApps();

  // Find the latest modification date across all dynamic items
  const allDates = [
    ...apps.map((a) => (a.updatedAt ? new Date(a.updatedAt) : new Date())),
    ...resourcesData.map((r) => (r.date ? new Date(r.date) : new Date()))
  ];
  const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));
  const latestModifiedDate = isNaN(maxDate.getTime()) ? new Date() : maxDate;

  // 1. Root Home path
  sitemapEntries.push({
    url: absoluteUrl("/es/"),
    lastModified: latestModifiedDate,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        es: absoluteUrl("/es/"),
        en: absoluteUrl("/en/")
      }
    }
  });
  sitemapEntries.push({
    url: absoluteUrl("/en/"),
    lastModified: latestModifiedDate,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        es: absoluteUrl("/es/"),
        en: absoluteUrl("/en/")
      }
    }
  });

  // 2. Static Pages (about, contact, privacy, terms, cookies, resources, products)
  for (const pageId of Object.keys(STATIC_PAGES_SLUGS) as (keyof typeof STATIC_PAGES_SLUGS)[]) {
    const pathEs = getStaticPath(pageId, "es");
    const pathEn = getStaticPath(pageId, "en");
    
    sitemapEntries.push({
      url: absoluteUrl(pathEs),
      lastModified: latestModifiedDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          es: absoluteUrl(pathEs),
          en: absoluteUrl(pathEn)
        }
      }
    });

    sitemapEntries.push({
      url: absoluteUrl(pathEn),
      lastModified: latestModifiedDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          es: absoluteUrl(pathEs),
          en: absoluteUrl(pathEn)
        }
      }
    });
  }

  // 3. Services (ios-development, salesforce-consulting, app-audits, product-design, integrations-and-automation)
  for (const svcId of Object.keys(SERVICES_SLUGS) as (keyof typeof SERVICES_SLUGS)[]) {
    const pathEs = getServicePath(svcId, "es");
    const pathEn = getServicePath(svcId, "en");

    sitemapEntries.push({
      url: absoluteUrl(pathEs),
      lastModified: latestModifiedDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          es: absoluteUrl(pathEs),
          en: absoluteUrl(pathEn)
        }
      }
    });

    sitemapEntries.push({
      url: absoluteUrl(pathEn),
      lastModified: latestModifiedDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          es: absoluteUrl(pathEs),
          en: absoluteUrl(pathEn)
        }
      }
    });
  }

  // 4. Case Studies & their subpages
  for (const app of apps) {
    const pathEs = getAppPath(app.slug, "es");
    const pathEn = getAppPath(app.slug, "en");
    const appModDate = app.updatedAt ? new Date(app.updatedAt) : latestModifiedDate;

    // Root app case details
    sitemapEntries.push({
      url: absoluteUrl(pathEs),
      lastModified: appModDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          es: absoluteUrl(pathEs),
          en: absoluteUrl(pathEn)
        }
      }
    });
    sitemapEntries.push({
      url: absoluteUrl(pathEn),
      lastModified: appModDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          es: absoluteUrl(pathEs),
          en: absoluteUrl(pathEn)
        }
      }
    });

    // Subpages (support, privacy, terms, subscriptions, faq)
    for (const subpageKey of Object.keys(SUBPAGE_SLUGS) as (keyof typeof SUBPAGE_SLUGS)[]) {
      // Subscriptions condition
      if (subpageKey === "subscriptions" && !app.legal?.subscriptions && !app.pricing?.length) {
        continue;
      }
      if (subpageKey === "safety" && !app.legal?.safety) {
        continue;
      }

      const subpathEs = getAppSubpagePath(app.slug, subpageKey, "es");
      const subpathEn = getAppSubpagePath(app.slug, subpageKey, "en");

      sitemapEntries.push({
        url: absoluteUrl(subpathEs),
        lastModified: appModDate,
        changeFrequency: "monthly",
        priority: 0.4,
        alternates: {
          languages: {
            es: absoluteUrl(subpathEs),
            en: absoluteUrl(subpathEn)
          }
        }
      });
      sitemapEntries.push({
        url: absoluteUrl(subpathEn),
        lastModified: appModDate,
        changeFrequency: "monthly",
        priority: 0.4,
        alternates: {
          languages: {
            es: absoluteUrl(subpathEs),
            en: absoluteUrl(subpathEn)
          }
        }
      });
    }
  }

  // 5. Resource Articles
  for (const art of resourcesData) {
    const pathEs = getResourcePath(art.id, "es");
    const pathEn = getResourcePath(art.id, "en");
    const artModDate = art.date ? new Date(art.date) : latestModifiedDate;

    sitemapEntries.push({
      url: absoluteUrl(pathEs),
      lastModified: artModDate,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          es: absoluteUrl(pathEs),
          en: absoluteUrl(pathEn)
        }
      }
    });
    sitemapEntries.push({
      url: absoluteUrl(pathEn),
      lastModified: artModDate,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          es: absoluteUrl(pathEs),
          en: absoluteUrl(pathEn)
        }
      }
    });
  }

  return sitemapEntries;
}
