import { JsonLd } from "@/components/JsonLd";
import { LandingPageClient } from "@/components/LandingPageClient";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
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
      <LandingPageClient />
    </>
  );
}
