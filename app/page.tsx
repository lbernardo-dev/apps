import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LandingPageClient } from "@/components/LandingPageClient";
import { siteConfig } from "@/lib/site";
import { getHomeSections, getTestimonials, getAboutProfile, getFeaturedApps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Diseño de producto, apps iOS y automatización Salesforce",
  description: "Dirección de producto, UX, desarrollo iOS nativo, backend y automatización Salesforce. Explora VitalsPath y StreakReps, productos reales construidos por Lester Romero Bernardo."
};

export default async function HomePage() {
  const [sections, testimonials, profile, featuredApps] = await Promise.all([
    getHomeSections(),
    getTestimonials(),
    getAboutProfile(),
    getFeaturedApps()
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${siteConfig.url}/#website`,
              "url": siteConfig.url,
              "name": siteConfig.name,
              "description": siteConfig.description,
              "publisher": {
                "@id": `${siteConfig.url}/#person`
              }
            },
            {
              "@type": "ProfessionalService",
              "@id": `${siteConfig.url}/#service`,
              "name": "Lester Romero Bernardo - Desarrollador iOS y Consultor CRM",
              "image": "https://media.licdn.com/dms/image/v2/D4D03AQF_OSrap5VrTQ/profile-displayphoto-scale_200_200/B4DZkJH.2OGsAY-/0/1756794712068?e=2147483647&v=beta&t=g_rvVTM2sUulaUSQSP3XMBlDJ1bjDR8pSZ6wXMvzPY8",
              "url": siteConfig.url,
              "telephone": "",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Valencia",
                "addressRegion": "Comunidad Valenciana",
                "addressCountry": "ES"
              },
              "knowsAbout": [
                "Desarrollo iOS Nativo",
                "Swift",
                "SwiftUI",
                "Salesforce CRM",
                "Scrum",
                "Integraciones de software"
              ]
            },
            {
              "@type": "Person",
              "@id": `${siteConfig.url}/#person`,
              "name": "Lester Romero Bernardo",
              "jobTitle": "iOS Developer & Salesforce Consultant",
              "url": "https://www.linkedin.com/in/lbernardo-cu",
              "sameAs": [
                "https://www.linkedin.com/in/lbernardo-cu",
                "https://github.com/lbernardo-dev"
              ]
            }
          ]
        }}
      />
      <LandingPageClient
        initialSections={sections}
        initialTestimonials={testimonials}
        initialProfile={profile}
        initialFeaturedApps={featuredApps}
      />
    </>
  );
}
