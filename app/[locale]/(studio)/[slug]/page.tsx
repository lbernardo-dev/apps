import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAboutProfile, getPublishedApps } from "@/lib/content";
import { SERVICES_SLUGS, STATIC_PAGES_SLUGS, getServicePath, getStaticPath, resolveSlug } from "@/lib/routes";
import { Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";

// Component imports
import { AboutProfileView } from "@/components/AboutProfileView";
import { ContactPageClient } from "@/components/ContactPageClient";
import { LegalDocument } from "@/components/LegalDocument";
import { AppsCatalogClient } from "@/components/AppsCatalogClient";
import { ServiceDetailView } from "@/components/ServiceDetailView";
import { ResourcesCatalog } from "@/components/ResourcesCatalog";
import { MarketplaceGrid } from "@/components/MarketplaceGrid";
import { getMarketplaceProducts } from "@/lib/marketplace";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  const locales = ["es", "en"] as const;

  for (const locale of locales) {
    // Add all services
    for (const service of Object.values(SERVICES_SLUGS)) {
      params.push({ locale, slug: service[locale] });
    }
    // Add all static pages
    for (const page of Object.values(STATIC_PAGES_SLUGS)) {
      params.push({ locale, slug: page[locale] });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const resolved = resolveSlug(slug, loc);

  if (!resolved) return {};

  const isEn = loc === "en";

  if (resolved.type === "service") {
    // Services Metadata
    const serviceTitles: Record<string, { es: string; en: string }> = {
      "ios-development": { es: "Desarrollo iOS Nativo", en: "Native iOS Development" },
      "salesforce-consulting": { es: "Consultoría Salesforce CRM", en: "Salesforce CRM Consulting" },
      "app-audits": { es: "Auditoría de Aplicaciones", en: "App Audits & Modernisation" },
      "product-design": { es: "Diseño de Producto Digital", en: "Digital Product Design" },
      "integrations-and-automation": { es: "Integraciones y Automatización ERP", en: "Integrations & Automation ERP" },
      "swiftui-development": { es: "Desarrollo SwiftUI", en: "SwiftUI Development" },
      "salesforce-development": { es: "Desarrollo Salesforce Custom", en: "Custom Salesforce Development" },
      "salesforce-debt": { es: "Auditoría Deuda Salesforce", en: "Salesforce Technical Debt Auditing" }
    };
    const title = serviceTitles[resolved.id]?.[loc] || "Servicios";
    const desc = isEn 
      ? `Professional ${title} services by RomeroDev. High quality, efficiency, and scalable execution.`
      : `Servicios profesionales de ${title} por RomeroDev. Calidad premium, eficiencia y visión de producto.`;
    const serviceId = resolved.id as keyof typeof SERVICES_SLUGS;
    return constructMetadata({
      title,
      description: desc,
      canonicalPath: getServicePath(serviceId, loc),
      locale: loc,
      alternateLocales: {
        es: getServicePath(serviceId, "es"),
        en: getServicePath(serviceId, "en")
      }
    });
  }

  // Static Pages Metadata
  if (resolved.type === "static") {
    if (resolved.id === "about") {
      return constructMetadata({
        title: isEn ? "About Lester Romero Bernardo" : "Sobre Lester Romero Bernardo",
        description: isEn 
          ? "Professional profile of Lester Romero Bernardo: Salesforce Certified Professional, ScrumMaster, and Product Engineer based in Valencia."
          : "Perfil profesional de Lester Romero Bernardo: Salesforce Certified Professional, ScrumMaster y Product Engineer basado en Valencia.",
        canonicalPath: getStaticPath("about", loc), locale: loc,
        alternateLocales: { es: getStaticPath("about", "es"), en: getStaticPath("about", "en") }
      });
    }
    if (resolved.id === "contact") {
      return constructMetadata({
        title: isEn ? "Contact RomeroDev" : "Contacto RomeroDev",
        description: isEn 
          ? "Get in touch with RomeroDev for iOS app development, Salesforce CRM consulting, or app audits."
          : "Contacta con RomeroDev para desarrollo iOS, consultoría Salesforce CRM o auditorías de aplicaciones.",
        canonicalPath: getStaticPath("contact", loc), locale: loc,
        alternateLocales: { es: getStaticPath("contact", "es"), en: getStaticPath("contact", "en") }
      });
    }
    if (resolved.id === "privacy") {
      return constructMetadata({
        title: isEn ? "Privacy Policy" : "Política de Privacidad",
        description: isEn ? "Privacy policy and data protection terms." : "Política de privacidad y protección de datos.",
        canonicalPath: getStaticPath("privacy", loc), locale: loc,
        alternateLocales: { es: getStaticPath("privacy", "es"), en: getStaticPath("privacy", "en") }
      });
    }
    if (resolved.id === "terms") {
      return constructMetadata({
        title: isEn ? "Terms & Conditions" : "Términos y Condiciones",
        description: isEn ? "General terms and conditions of use." : "Términos y condiciones generales de uso.",
        canonicalPath: getStaticPath("terms", loc), locale: loc,
        alternateLocales: { es: getStaticPath("terms", "es"), en: getStaticPath("terms", "en") }
      });
    }
    if (resolved.id === "cookies") {
      return constructMetadata({
        title: isEn ? "Cookies Policy" : "Política de Cookies",
        description: isEn ? "Cookies and local storage settings." : "Información sobre cookies y almacenamiento local.",
        canonicalPath: getStaticPath("cookies", loc), locale: loc,
        alternateLocales: { es: getStaticPath("cookies", "es"), en: getStaticPath("cookies", "en") }
      });
    }
    if (resolved.id === "resources") {
      return constructMetadata({
        title: isEn ? "Resources & Guides" : "Recursos y Guías",
        description: isEn 
          ? "Professional articles on SwiftUI performance, Salesforce audits, SAP integrations, and App Store releases."
          : "Artículos profesionales sobre rendimiento de SwiftUI, auditorías de Salesforce, integraciones SAP y publicaciones en la App Store.",
        canonicalPath: getStaticPath("resources", loc), locale: loc,
        alternateLocales: { es: getStaticPath("resources", "es"), en: getStaticPath("resources", "en") }
      });
    }
    if (resolved.id === "products") {
      return constructMetadata({
        title: isEn ? "Our Products" : "Nuestros Productos",
        description: isEn 
          ? "Explore iOS products such as VitalsPath, StreakReps and Shield, designed and built by RomeroDev."
          : "Explora productos para iOS como VitalsPath, StreakReps y Shield, diseñados y construidos por RomeroDev.",
        canonicalPath: getStaticPath("products", loc), locale: loc,
        alternateLocales: { es: getStaticPath("products", "es"), en: getStaticPath("products", "en") }
      });
    }
    if (resolved.id === "marketplace") {
      return constructMetadata({
        title: isEn ? "Tech Marketplace" : "Marketplace de Tecnología",
        description: isEn 
          ? "AI-reviewed deals on gadgets, iOS accessories, and charging gear from AliExpress."
          : "Ofertas revisadas de gadgets, accesorios para iOS y soluciones de carga de AliExpress.",
        canonicalPath: getStaticPath("marketplace", loc), locale: loc,
        alternateLocales: { es: getStaticPath("marketplace", "es"), en: getStaticPath("marketplace", "en") }
      });
    }
  }

  return {};
}

export default async function LocalizedSlugPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const resolved = resolveSlug(slug, loc);

  if (!resolved) {
    notFound();
  }

  // 1. Render Service Details
  if (resolved.type === "service") {
    return <ServiceDetailView serviceId={resolved.id} />;
  }

  // 2. Render Static Pages
  if (resolved.type === "static") {
    if (resolved.id === "about") {
      const profile = await getAboutProfile();
      return <AboutProfileView initialProfile={profile || undefined} />;
    }
    if (resolved.id === "contact") {
      return <ContactPageClient />;
    }
    if (resolved.id === "products") {
      const apps = await getPublishedApps();
      return <AppsCatalogClient apps={apps} />;
    }
    if (resolved.id === "resources") {
      return <ResourcesCatalog />;
    }
    if (resolved.id === "marketplace") {
      const products = await getMarketplaceProducts();
      return <MarketplaceGrid initialProducts={products} />;
    }
    
    // Legal documents (privacy, terms, cookies)
    if (resolved.id === "privacy") {
      return (
        <LegalDocument
          title="Política de Privacidad"
          titleEn="Privacy Policy"
          updatedAt="2026-07-11"
          body={`<h2>1. Tratamiento de Datos</h2>
<p>En RomeroDev nos tomamos en serio la privacidad de tus datos. Este sitio web recopila información personal únicamente a través de nuestro formulario de contacto (nombre, correo electrónico, necesidad y mensaje). Esta información se almacena de forma segura en nuestro proveedor de base de datos (Supabase) y se utiliza exclusivamente para responder a tu solicitud comercial.</p>

<h2>2. Aplicaciones iOS</h2>
<p>Nuestras aplicaciones iOS, entre ellas VitalsPath, StreakReps y Shield, cuentan con políticas de privacidad específicas accesibles desde sus fichas de producto. Consulta cada política para conocer con precisión qué datos trata la app, dónde se guardan y qué proveedores intervienen.</p>

<h2>3. Ejercicio de Derechos</h2>
<p>Puedes solicitar el acceso, rectificación o eliminación de cualquier información que tengamos sobre ti enviando un correo directo a romerodev.app@gmail.com.</p>`}
          bodyEn={`<h2>1. Data Processing</h2>
<p>At RomeroDev we take your data privacy seriously. This website collects personal information only through our contact form (name, email, need, and message). This data is stored securely in our database (Supabase) and is used exclusively to reply to your business inquiry.</p>

<h2>2. iOS Applications</h2>
<p>Our iOS applications, including VitalsPath, StreakReps and Shield, have product-specific privacy policies available from their detail pages. Review each policy to understand exactly what data the app processes, where it is stored and which providers are involved.</p>

<h2>3. User Rights</h2>
<p>You can request access to, rectification, or deletion of any personal information we hold by emailing directly to romerodev.app@gmail.com.</p>`}
        />
      );
    }

    if (resolved.id === "terms") {
      return (
        <LegalDocument
          title="Términos y Condiciones"
          titleEn="Terms & Conditions"
          updatedAt="2026-07-11"
          body={`<h2>1. Uso del Sitio</h2>
<p>El uso de este sitio web implica la aceptación de estos términos. La información mostrada tiene carácter comercial e informativo sobre los servicios profesionales de desarrollo y consultoría de RomeroDev.</p>

<h2>2. Propiedad Intelectual</h2>
<p>Todos los diseños, logotipos, contenidos y código de esta web son titularidad de Lester Romero Bernardo o cuentan con las licencias correspondientes. Queda prohibida la reproducción total o parcial sin consentimiento previo.</p>

<h2>3. Exención de Responsabilidad</h2>
<p>Aunque nos esforzamos por mantener la información actualizada y veraz, no nos hacemos responsables de posibles fallos de conexión o de la exactitud contractual de los precios indicativos mostrados para las aplicaciones antes de su publicación en el App Store.</p>`}
          bodyEn={`<h2>1. Website Use</h2>
<p>Using this website implies acceptance of these terms. The information shown is for commercial and informative purposes regarding the professional development and consulting services of RomeroDev.</p>

<h2>2. Intellectual Property</h2>
<p>All designs, logos, contents, and code on this site are owned by Lester Romero Bernardo or are properly licensed. Total or partial reproduction without prior consent is prohibited.</p>

<h2>3. Disclaimer</h2>
<p>While we strive to keep information updated and accurate, we are not responsible for connection drop-offs or the contractual accuracy of indicative prices shown for applications before their official release in the App Store.</p>`}
        />
      );
    }

    if (resolved.id === "cookies") {
      return (
        <LegalDocument
          title="Política de Cookies"
          titleEn="Cookies Policy"
          updatedAt="2026-07-11"
          body={`<h2>1. Uso de Cookies</h2>
<p>Este sitio web utiliza almacenamiento técnico local (localStorage) únicamente para recordar tus preferencias de tema visual (claro/oscuro) e idioma. No utilizamos cookies de perfilado publicitario de terceros.</p>

<h2>2. Analítica de Datos</h2>
<p>Si la analítica de datos está habilitada, utilizamos una solución respetuosa con la privacidad (Plausible o Umami) que no recopila datos personales, no utiliza cookies de seguimiento invasivas y anonimiza las direcciones IP.</p>`}
          bodyEn={`<h2>1. Cookie Usage</h2>
<p>This website uses local technical storage (localStorage) solely to remember your visual theme preference (light/dark) and language. We do not use third-party advertising tracking cookies.</p>

<h2>2. Data Analytics</h2>
<p>If data analytics is enabled, we use a privacy-respecting solution (Plausible or Umami) that does not collect personal data, does not use invasive tracking cookies, and anonymizes IP addresses.</p>`}
        />
      );
    }
  }

  notFound();
}
