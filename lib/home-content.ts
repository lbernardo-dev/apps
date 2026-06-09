// home-content.ts
// Stores content for the landing page sections with Supabase as source of truth.
// Each key maps to a row in public.home_sections with the same `key` value.
// The landing page fetches all rows and merges with fallback.

export type HomeSection = {
  key: string;
  title: string;
  body: string;
  is_enabled: boolean;
};

/** All editable home-page sections with fallback text. */
export const fallbackHomeSections: Record<string, HomeSection> = {
  // ── Hero ──────────────────────────────────────────────────
  "hero": {
    key: "hero",
    title: "Consultoría Salesforce & Apps iOS Nativas",
    body: "Implemento soluciones CRM Salesforce a medida para empresas y autónomos, y desarrollo aplicaciones móviles nativas para iOS. Transformo tus necesidades de negocio en software de alta calidad.",
    is_enabled: true,
  },
  "hero.cta.primary": {
    key: "hero.cta.primary",
    title: "Hablemos de tu proyecto",
    body: "",
    is_enabled: true,
  },
  "hero.cta.secondary": {
    key: "hero.cta.secondary",
    title: "Ver mis apps",
    body: "",
    is_enabled: true,
  },
  "hero.proof.1": {
    key: "hero.proof.1",
    title: "Soluciones Salesforce",
    body: "Flujos de trabajo, automatizaciones y CRM.",
    is_enabled: true,
  },
  "hero.proof.2": {
    key: "hero.proof.2",
    title: "Apps iOS Nativas",
    body: "Rendimiento y experiencia nativa premium.",
    is_enabled: true,
  },
  "hero.proof.3": {
    key: "hero.proof.3",
    title: "Para Empresas y Autónomos",
    body: "Soluciones escalables que generan valor.",
    is_enabled: true,
  },

  // ── Bio ───────────────────────────────────────────────────
  "bio": {
    key: "bio",
    title: "Hola, soy Lester Romero Bernardo",
    body: "Ingeniero informático con base en Valencia y más de una década de experiencia traduciendo retos complejos de negocio en software de alta calidad. Combino mi dominio técnico en consultoría CRM avanzada (Salesforce) con mi pasión por la artesanía del software móvil para iOS.\n\nMi enfoque no es solo escribir código limpio, sino comprender los objetivos de tu negocio, diseñar flujos de experiencia de usuario nativos que enamoren a tus clientes y crear arquitecturas de datos e integraciones robustas y escalables.",
    is_enabled: true,
  },
  "bio.label": {
    key: "bio.label",
    title: "INGENIERO DE SOFTWARE & CONSULTOR CRM",
    body: "",
    is_enabled: true,
  },
  "bio.cta": {
    key: "bio.cta",
    title: "Conocer más sobre mi perfil",
    body: "",
    is_enabled: true,
  },

  // ── Services ──────────────────────────────────────────────
  "services": {
    key: "services",
    title: "¿Qué puedo hacer por ti?",
    body: "Ofrezco soluciones de principio a fin, combinando criterio de producto con excelencia técnica.",
    is_enabled: true,
  },
  "services.growth": {
    key: "services.growth",
    title: "Consultoría Salesforce",
    body: "Configuración de CRM, automatizaciones avanzadas con Flows e integraciones a medida.",
    is_enabled: true,
  },
  "services.ios": {
    key: "services.ios",
    title: "Apps iOS nativas",
    body: "Desarrollo con Swift y SwiftUI pensado para ser rápido, estable y siguiendo las pautas de Apple.",
    is_enabled: true,
  },
  "services.design": {
    key: "services.design",
    title: "Diseño centrado en el usuario",
    body: "Interfaces intuitivas y cuidadas que enamoran y convierten usuarios en clientes.",
    is_enabled: true,
  },
  "services.backend": {
    key: "services.backend",
    title: "Backend e Integraciones",
    body: "Bases de datos seguras (Supabase/Firebase) y conectividad con APIs y sistemas externos.",
    is_enabled: true,
  },

  // ── Process ───────────────────────────────────────────────
  "process": {
    key: "process",
    title: "Mi proceso",
    body: "",
    is_enabled: true,
  },
  "process.1": {
    key: "process.1",
    title: "Descubrimiento",
    body: "Entiendo tu idea, objetivos y usuarios para definir el rumbo correcto.",
    is_enabled: true,
  },
  "process.2": {
    key: "process.2",
    title: "Diseño",
    body: "Wireframes y UI/UX que validan la experiencia antes de construir.",
    is_enabled: true,
  },
  "process.3": {
    key: "process.3",
    title: "Desarrollo",
    body: "Código limpio, pruebas y buenas prácticas desde el primer día.",
    is_enabled: true,
  },
  "process.4": {
    key: "process.4",
    title: "Lanzamiento",
    body: "Publicación en App Store y preparación de marketing y métricas.",
    is_enabled: true,
  },
  "process.5": {
    key: "process.5",
    title: "Evolución",
    body: "Analizamos, iteramos y hacemos crecer tu app juntos.",
    is_enabled: true,
  },

  // ── Testimonials header ───────────────────────────────────
  "testimonials": {
    key: "testimonials",
    title: "Diseño y desarrollo de confianza",
    body: "Lo que dicen de la calidad, dedicación y entrega de mis productos.",
    is_enabled: true,
  },

  // ── FAQ ───────────────────────────────────────────────────
  "faq": {
    key: "faq",
    title: "Preguntas frecuentes",
    body: "",
    is_enabled: true,
  },
  "faq.q1": {
    key: "faq.q1",
    title: "¿Cuánto cuesta desarrollar una app iOS?",
    body: "El coste depende de la complejidad de la aplicación, el diseño y las integraciones necesarias. Tras una sesión de descubrimiento para acotar el alcance, te proporcionaré un presupuesto cerrado para evitar sorpresas.",
    is_enabled: true,
  },
  "faq.q2": {
    key: "faq.q2",
    title: "¿Cuánto tiempo tarda en estar lista una aplicación?",
    body: "Un MVP (Producto Mínimo Viable) suele requerir entre 4 y 8 semanas de desarrollo. Proyectos de mayor envergadura con backend propio o integraciones avanzadas pueden tomar entre 3 y 6 meses.",
    is_enabled: true,
  },
  "faq.q3": {
    key: "faq.q3",
    title: "¿Me ayudas a subir la app a la App Store?",
    body: "Sí, me encargo de todo el proceso de publicación: configuración de App Store Connect, preparación de metadatos, optimización ASO inicial y resolución de cualquier feedback durante el proceso de revisión de Apple.",
    is_enabled: true,
  },
  "faq.q4": {
    key: "faq.q4",
    title: "¿Qué tecnologías utilizas para el desarrollo?",
    body: "Desarrollo de forma nativa para iOS y iPadOS usando Swift y SwiftUI para garantizar la mejor experiencia. Para el backend y bases de datos utilizo soluciones eficientes como Supabase, Firebase o APIs a medida.",
    is_enabled: true,
  },
  "faq.q5": {
    key: "faq.q5",
    title: "¿Ofreces soporte y mantenimiento tras el lanzamiento?",
    body: "Sí, ofrezco servicios de mantenimiento mensual para garantizar la compatibilidad con las nuevas actualizaciones de iOS, solucionar posibles incidencias y continuar añadiendo mejoras de forma continua.",
    is_enabled: true,
  },

  // ── CTA Banner ────────────────────────────────────────────
  "cta": {
    key: "cta",
    title: "¿Tienes una idea en mente?",
    body: "Convirtámosla en una app iOS que tus usuarios amen y que haga crecer tu negocio.",
    is_enabled: true,
  },
};

/**
 * Merges Supabase rows into the fallback map.
 * Returns a lookup: section(key).title / section(key).body
 */
export function mergeHomeSections(
  rows: Array<{ key: string; title: string; body: string; is_enabled: boolean }>
): Record<string, HomeSection> {
  const merged = { ...fallbackHomeSections };
  for (const row of rows) {
    merged[row.key] = row;
  }
  return merged;
}
