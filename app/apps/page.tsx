import type { Metadata } from "next";
import { FilteredAppGrid } from "@/components/FilteredAppGrid";
import { JsonLd } from "@/components/JsonLd";
import { getPublishedApps } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apps",
  description: "Catálogo de apps publicadas, en preparación y documentadas por LB Apps."
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
      <section className="section bg-white">
        <div className="container">
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-ink">Catálogo de apps</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite">
            Productos propios y en preparación, con detalle público, soporte, FAQ y documentación legal por app.
          </p>
          <FilteredAppGrid apps={appItems} />
        </div>
      </section>
    </>
  );
}

