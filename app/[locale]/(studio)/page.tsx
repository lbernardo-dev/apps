import { getHomeSections, getTestimonials, getAboutProfile, getFeaturedApps } from "@/lib/content";
import { LandingPageClient } from "@/components/LandingPageClient";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { getAppPath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;
  const [sections, testimonials, profile, featuredApps] = await Promise.all([
    getHomeSections(),
    getTestimonials(),
    getAboutProfile(),
    getFeaturedApps()
  ]);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "es" ? "Apps de RomeroDev" : "RomeroDev apps",
    itemListElement: featuredApps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: app.name,
        applicationCategory: app.category,
        operatingSystem: app.platform.join(", "),
        url: absoluteUrl(getAppPath(app.slug, locale as "es" | "en")),
        sameAs: app.appStoreUrl
      }
    }))
  };

  return (
    <>
      {featuredApps.length > 0 ? <JsonLd data={itemList} /> : null}
      <LandingPageClient
        initialSections={sections}
        initialTestimonials={testimonials}
        initialProfile={profile}
        initialFeaturedApps={featuredApps}
      />
    </>
  );
}
