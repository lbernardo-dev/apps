import type { Metadata } from "next";
import { AppCard } from "@/components/AppCard";
import { JsonLd } from "@/components/JsonLd";
import { getPublishedApps } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apps",
  description: "Catalogo de apps publicadas, en preparacion y documentadas por LB Apps."
};

export default function AppsPage() {
  const appItems = getPublishedApps();

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
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-ink">Catalogo de apps</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite">
            Productos propios y en preparacion, con detalle publico, soporte, FAQ y documentacion legal por app.
          </p>
          <div className="mt-10 grid gap-6">
            {appItems.map((app) => (
              <AppCard app={app} key={app.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
