import { Locale } from "./i18n";
import { resourcesData } from "./resources-content";

// Mappings for services
export const SERVICES_SLUGS = {
  "ios-development": { es: "desarrollo-ios", en: "ios-development" },
  "salesforce-consulting": { es: "consultoria-salesforce", en: "salesforce-consulting" },
  "app-audits": { es: "auditoria-de-apps", en: "app-audits" },
  "product-design": { es: "diseno-de-producto", en: "product-design" },
  "integrations-and-automation": { es: "integraciones-y-automatizacion", en: "integrations-and-automation" },
  "swiftui-development": { es: "desarrollo-swiftui", en: "swiftui-development" },
  "salesforce-development": { es: "desarrollo-salesforce", en: "salesforce-development" },
  "salesforce-debt": { es: "deuda-tecnica-salesforce", en: "salesforce-debt" }
} as const;

// Mappings for static pages
export const STATIC_PAGES_SLUGS = {
  about: { es: "sobre-mi", en: "about" },
  contact: { es: "contacto", en: "contact" },
  privacy: { es: "privacidad", en: "privacy" },
  terms: { es: "terminos", en: "terms" },
  cookies: { es: "cookies", en: "cookies" },
  resources: { es: "recursos", en: "resources" },
  products: { es: "productos", en: "products" },
  marketplace: { es: "marketplace", en: "marketplace" }
} as const;

// Case study subpage slugs
export const SUBPAGE_SLUGS = {
  support: { es: "soporte", en: "support" },
  privacy: { es: "privacidad", en: "privacy" },
  terms: { es: "terminos", en: "terms" },
  subscriptions: { es: "suscripciones", en: "subscriptions" },
  safety: { es: "seguridad-familiar", en: "family-safety" },
  faq: { es: "preguntas-frecuentes", en: "faq" }
} as const;

export function getAppPath(slug: string, locale: Locale): string {
  return locale === "es" ? `/es/casos/${slug}/` : `/en/case-studies/${slug}/`;
}

export function getAppSubpagePath(slug: string, subpageKey: keyof typeof SUBPAGE_SLUGS, locale: Locale): string {
  const subpageSlug = SUBPAGE_SLUGS[subpageKey][locale];
  return locale === "es" 
    ? `/es/casos/${slug}/${subpageSlug}/` 
    : `/en/case-studies/${slug}/${subpageSlug}/`;
}

export function getServicePath(serviceId: keyof typeof SERVICES_SLUGS, locale: Locale): string {
  const slug = SERVICES_SLUGS[serviceId][locale];
  return `/${locale}/${slug}/`;
}

export function getStaticPath(pageId: keyof typeof STATIC_PAGES_SLUGS, locale: Locale): string {
  const slug = STATIC_PAGES_SLUGS[pageId][locale];
  return `/${locale}/${slug}/`;
}

export function getResourcePath(articleId: string, locale: Locale): string {
  const article = resourcesData.find(art => art.id === articleId);
  if (!article) return `/${locale}/`;
  const slug = locale === "es" ? article.slug_es : article.slug_en;
  return locale === "es" ? `/es/recursos/${slug}/` : `/en/resources/${slug}/`;
}

// Maps a localized path back to a standard page details structure
export function resolveSlug(slug: string, locale: Locale): { type: "service" | "static" | "none"; id: string } | null {
  // Check services
  for (const [id, value] of Object.entries(SERVICES_SLUGS)) {
    if (value[locale] === slug) {
      return { type: "service", id };
    }
  }
  
  // Check static pages
  for (const [id, value] of Object.entries(STATIC_PAGES_SLUGS)) {
    if (value[locale] === slug) {
      return { type: "static", id };
    }
  }

  return null;
}
