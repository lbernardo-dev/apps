import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { getPublishedApps } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { AppsCatalogClient } from "@/components/AppsCatalogClient";

export const metadata: Metadata = {
  title: "Apps",
  description: "App catalog — published products, upcoming apps, support, FAQ and legal documentation."
};

export default async function AppsPage() {
  const appItems = await getPublishedApps();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Apps",
          url: absoluteUrl("/apps/"),
          hasPart: appItems.map((app) => ({
            "@type": "SoftwareApplication",
            name: app.name,
            applicationCategory: app.category,
            operatingSystem: app.platform.join(", ")
          }))
        }}
      />
      <AppsCatalogClient apps={appItems} />
    </>
  );
}
