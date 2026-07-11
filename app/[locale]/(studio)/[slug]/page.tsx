import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAboutProfile, getPublishedApps } from "@/lib/content";
import { SERVICES_SLUGS, STATIC_PAGES_SLUGS, resolveSlug } from "@/lib/routes";
import { Locale } from "@/lib/i18n";

// Component imports
import { AboutProfileView } from "@/components/AboutProfileView";
import { ContactPageClient } from "@/components/ContactPageClient";
import { LegalDocument } from "@/components/LegalDocument";
import { AppsCatalogClient } from "@/components/AppsCatalogClient";
import { ServiceDetailView } from "@/components/ServiceDetailView";
import { ResourcesCatalog } from "@/components/ResourcesCatalog";

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
      "integrations-and-automation": { es: "Integraciones y Automatización ERP", en: "Integrations & Automation ERP" }
    };
    const title = serviceTitles[resolved.id]?.[loc] || "Servicios";
    const desc = isEn 
      ? `Professional ${title} services by RomeroDev. High quality, efficiency, and scalable execution.`
      : `Servicios profesionales de ${title} por RomeroDev. Calidad premium, eficiencia y visión de producto.`;
    return { title, description: desc };
  }

  // Static Pages Metadata
  if (resolved.type === "static") {
    if (resolved.id === "about") {
      return {
        title: isEn ? "About Lester Romero Bernardo" : "Sobre Lester Romero Bernardo",
        description: isEn 
          ? "Professional profile of Lester Romero Bernardo: Salesforce Certified Professional, ScrumMaster, and Product Engineer based in Valencia."
          : "Perfil profesional de Lester Romero Bernardo: Salesforce Certified Professional, ScrumMaster y Product Engineer basado en Valencia."
      };
    }
    if (resolved.id === "contact") {
      return {
        title: isEn ? "Contact RomeroDev" : "Contacto RomeroDev",
        description: isEn 
          ? "Get in touch with RomeroDev for iOS app development, Salesforce CRM consulting, or app audits."
          : "Contacta con RomeroDev para desarrollo iOS, consultoría Salesforce CRM o auditorías de aplicaciones."
      };
    }
    if (resolved.id === "privacy") {
      return {
        title: isEn ? "Privacy Policy" : "Política de Privacidad",
        description: isEn ? "Privacy policy and data protection terms." : "Política de privacidad y protección de datos."
      };
    }
    if (resolved.id === "terms") {
      return {
        title: isEn ? "Terms & Conditions" : "Términos y Condiciones",
        description: isEn ? "General terms and conditions of use." : "Términos y condiciones generales de uso."
      };
    }
    if (resolved.id === "cookies") {
      return {
        title: isEn ? "Cookies Policy" : "Política de Cookies",
        description: isEn ? "Cookies and local storage settings." : "Información sobre cookies y almacenamiento local."
      };
    }
    if (resolved.id === "resources") {
      return {
        title: isEn ? "Resources & Guides" : "Recursos y Guías",
        description: isEn 
          ? "Professional articles on SwiftUI performance, Salesforce audits, SAP integrations, and App Store releases."
          : "Artículos profesionales sobre rendimiento de SwiftUI, auditorías de Salesforce, integraciones SAP y publicaciones en la App Store."
      };
    }
    if (resolved.id === "products") {
      return {
        title: isEn ? "Our Products" : "Nuestros Productos",
        description: isEn 
          ? "Explore real iOS products like VitalsPath and StreakReps built and published by RomeroDev."
          : "Explora productos reales para iOS como VitalsPath y StreakReps diseñados y publicados por RomeroDev."
      };
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
<p>Nuestras aplicaciones iOS publicadas (VitalsPath y StreakReps) cuentan con políticas de privacidad específicas accesibles desde sus fichas de producto. Por norma general, no recopilamos ni almacenamos ningún dato de salud ni personal en servidores externos; toda la información se almacena localmente y se sincroniza mediante tu cuenta cifrada de iCloud.</p>

<h2>3. Ejercicio de Derechos</h2>
<p>Puedes solicitar el acceso, rectificación o eliminación de cualquier información que tengamos sobre ti enviando un correo directo a romerodev.app@gmail.com.</p>`}
          bodyEn={`<h2>1. Data Processing</h2>
<p>At RomeroDev we take your data privacy seriously. This website collects personal information only through our contact form (name, email, need, and message). This data is stored securely in our database (Supabase) and is used exclusively to reply to your business inquiry.</p>

<h2>2. iOS Applications</h2>
<p>Our published iOS applications (VitalsPath and StreakReps) have specific privacy policies accessible from their detail pages. Generally, we do not collect or store any health or personal data on external servers; all information is saved locally and synced via your encrypted iCloud account.</p>

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
