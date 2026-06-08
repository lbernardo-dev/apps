"use client";

import { createContext, useContext } from "react";

export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";

export function detectLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const stored = localStorage.getItem("lb-locale");
  if (stored === "en" || stored === "es") return stored;
  const nav = navigator.language.slice(0, 2);
  return nav === "en" ? "en" : "es";
}

// ─── Dictionaries ───────────────────────────────────────────

const dictionaries = {
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.apps": "Apps",
    "nav.about": "Sobre mí",
    "nav.contact": "Contacto",
    "nav.cta": "Hablemos",

    // Hero
    "hero.title.before": "Apps iOS",
    "hero.title.highlight": "cuidadas",
    "hero.title.after": ", listas para crecer",
    "hero.subtitle": "Desarrollo apps iOS a medida con foco en diseño, rendimiento y negocio. Desde la idea hasta la App Store y más allá.",
    "hero.cta.primary": "Hablemos de tu proyecto",
    "hero.cta.secondary": "Ver mis apps",
    "hero.proof.native.title": "Nativas para iOS",
    "hero.proof.native.body": "Rendimiento y experiencia superior.",
    "hero.proof.privacy.title": "Privacidad primero",
    "hero.proof.privacy.body": "Tus datos y los de tus usuarios, seguros.",
    "hero.proof.results.title": "Enfocadas en resultados",
    "hero.proof.results.body": "Apps que generan valor desde el día uno.",

    // Showcase
    "showcase.title": "Producto Destacado",
    "showcase.subtitle": "Explora mis productos diseñados nativamente para iOS, con atención al detalle y enfoque comercial.",
    "showcase.explore": "Explorar todas las características de",

    // Services
    "services.title": "¿Qué puedo hacer por ti?",
    "services.subtitle": "Ofrezco soluciones de principio a fin, combinando criterio de producto con excelencia técnica.",
    "services.ios.title": "Apps iOS nativas",
    "services.ios.body": "Desarrollo con Swift y SwiftUI pensado para ser rápido, estable y escalable.",
    "services.design.title": "Diseño centrado en el usuario",
    "services.design.body": "Interfaces intuitivas y cuidadas que enamoran y convierten usuarios en clientes.",
    "services.backend.title": "Backend y datos",
    "services.backend.body": "Integraciones robustas con Supabase y APIs seguras, escalables y mantenibles.",
    "services.growth.title": "Entrega y crecimiento",
    "services.growth.body": "Publicación en App Store, métricas, soporte y mejoras continuas.",

    // Process
    "process.title": "Mi proceso",
    "process.1.title": "Descubrimiento",
    "process.1.body": "Entiendo tu idea, objetivos y usuarios para definir el rumbo correcto.",
    "process.2.title": "Diseño",
    "process.2.body": "Wireframes y UI/UX que validan la experiencia antes de construir.",
    "process.3.title": "Desarrollo",
    "process.3.body": "Código limpio, pruebas y buenas prácticas desde el primer día.",
    "process.4.title": "Lanzamiento",
    "process.4.body": "Publicación en App Store y preparación de marketing y métricas.",
    "process.5.title": "Evolución",
    "process.5.body": "Analizamos, iteramos y hacemos crecer tu app juntos.",

    // FAQ
    "faq.title": "Preguntas frecuentes",
    "faq.cta.title": "¿Tienes otra pregunta?",
    "faq.cta.body": "Estoy aquí para ayudarte. Hablemos de tu proyecto y te respondo sin compromiso.",
    "faq.cta.button": "Hablemos",
    "faq.q1.q": "¿Cuánto cuesta desarrollar una app iOS?",
    "faq.q1.a": "El coste depende de la complejidad de la aplicación, el diseño y las integraciones necesarias. Tras una sesión de descubrimiento para acotar el alcance, te proporcionaré un presupuesto cerrado para evitar sorpresas.",
    "faq.q2.q": "¿Cuánto tiempo tarda en estar lista una aplicación?",
    "faq.q2.a": "Un MVP (Producto Mínimo Viable) suele requerir entre 4 y 8 semanas de desarrollo. Proyectos de mayor envergadura con backend propio o integraciones avanzadas pueden tomar entre 3 y 6 meses.",
    "faq.q3.q": "¿Me ayudas a subir la app a la App Store?",
    "faq.q3.a": "Sí, me encargo de todo el proceso de publicación: configuración de App Store Connect, preparación de metadatos, optimización ASO inicial y resolución de cualquier feedback durante el proceso de revisión de Apple.",
    "faq.q4.q": "¿Qué tecnologías utilizas para el desarrollo?",
    "faq.q4.a": "Desarrollo de forma nativa para iOS y iPadOS usando Swift y SwiftUI para garantizar la mejor experiencia. Para el backend y bases de datos utilizo soluciones eficientes como Supabase, Firebase o APIs a medida.",
    "faq.q5.q": "¿Ofreces soporte y mantenimiento tras el lanzamiento?",
    "faq.q5.a": "Sí, ofrezco servicios de mantenimiento mensual para garantizar la compatibilidad con las nuevas actualizaciones de iOS, solucionar posibles incidencias y continuar añadiendo mejoras de forma continua.",

    // CTA
    "cta.title": "¿Tienes una idea en mente?",
    "cta.body": "Convirtámosla en una app iOS que tus usuarios amen y que haga crecer tu negocio.",
    "cta.button": "Hablemos de tu proyecto",

    // Contact
    "contact.title": "Hablemos de tu app",
    "contact.subtitle": "Cuéntame qué quieres construir, en qué punto estás y qué resultado de negocio esperas.",
    "contact.email.label": "Email directo:",
    "contact.form.name": "Nombre",
    "contact.form.name.placeholder": "Tu nombre completo",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "correo@ejemplo.com",
    "contact.form.topic": "Tema de consulta",
    "contact.form.topic.placeholder": "Ej: Desarrollo App iOS, Consultoría Salesforce",
    "contact.form.message": "Mensaje",
    "contact.form.message.placeholder": "Describe tu idea, requerimientos o plazos...",
    "contact.form.submit": "Enviar consulta",
    "contact.form.sending": "Enviando mensaje...",
    "contact.form.error": "Completa nombre, email y mensaje.",
    "contact.form.success": "Mensaje enviado. Te responderé lo antes posible.",

    // Apps catalog
    "apps.title": "Catálogo de apps",
    "apps.subtitle": "Productos propios y en preparación, con detalle público, soporte, FAQ y documentación legal por app.",
    "apps.search.placeholder": "Buscar por nombre o descripción...",
    "apps.filter.all.categories": "Todas las Categorías",
    "apps.filter.all.platforms": "Todas las Plataformas",
    "apps.empty": "No se encontraron aplicaciones que coincidan con tu búsqueda.",
    "apps.card.details": "Ver detalles",
    "apps.card.published": "Publicada",
    "apps.card.coming_soon": "Próximamente",
    "apps.card.draft": "Borrador",

    // Footer
    "footer.site": "Sitio",
    "footer.legal": "Legal",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",
    "footer.cookies": "Cookies",
    "footer.rights": "Todos los derechos reservados.",

    // Admin
    "admin.not_configured.title": "Panel no disponible en producción",
    "admin.not_configured.body": "Este panel requiere conexión directa con Supabase y solo está disponible en el entorno de desarrollo local. Las variables de entorno no se incluyen en el deploy estático por seguridad.",

    // App detail
    "app.challenge": "El Reto",
    "app.challenge.title": "Problema que resuelve",
    "app.features.label": "Características",
    "app.features.title": "Funcionalidades clave",
    "app.specs.title": "Especificaciones de la Aplicación",
    "app.specs.status": "Estado de desarrollo",
    "app.specs.status.published": "Publicada",
    "app.specs.status.coming_soon": "En preparación",
    "app.specs.platforms": "Plataformas soportadas",
    "app.specs.audience": "Público objetivo",
    "app.specs.updated": "Última actualización",
    "app.faq.label": "Ayuda",
    "app.faq.title": "Preguntas de",
    "app.faq.subtitle": "Respuestas directas y resolución de dudas sobre la aplicación.",
    "app.support.cta": "Soporte de la App",
    "app.screenshots": "Capturas de Pantalla",
    "app.benefit": "Beneficio",

    // Support page
    "support.title": "Soporte de",
    "support.body": "Si necesitas ayuda, envía una descripción breve del problema, pasos para reproducirlo, versión de iOS y capturas si aportan contexto.",
    "support.email": "Enviar email",
    "support.faq": "Ver FAQ",
    "support.info.title": "Datos útiles para soporte",
    "support.info.app": "Nombre de la app:",
    "support.info.platform": "Plataforma:",
    "support.info.email": "Email de soporte:",
    "support.info.updated": "Última actualización legal:",
  },

  en: {
    // Nav
    "nav.home": "Home",
    "nav.apps": "Apps",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cta": "Let's Talk",

    // Hero
    "hero.title.before": "Crafted iOS",
    "hero.title.highlight": "apps",
    "hero.title.after": ", ready to grow",
    "hero.subtitle": "I build custom iOS apps focused on design, performance and business. From idea to the App Store and beyond.",
    "hero.cta.primary": "Let's talk about your project",
    "hero.cta.secondary": "See my apps",
    "hero.proof.native.title": "Native for iOS",
    "hero.proof.native.body": "Superior performance and experience.",
    "hero.proof.privacy.title": "Privacy first",
    "hero.proof.privacy.body": "Your data and your users' data, secure.",
    "hero.proof.results.title": "Results-focused",
    "hero.proof.results.body": "Apps that deliver value from day one.",

    // Showcase
    "showcase.title": "Featured Product",
    "showcase.subtitle": "Explore my products designed natively for iOS, with attention to detail and commercial focus.",
    "showcase.explore": "Explore all features of",

    // Services
    "services.title": "What can I do for you?",
    "services.subtitle": "End-to-end solutions combining product thinking with technical excellence.",
    "services.ios.title": "Native iOS apps",
    "services.ios.body": "Development with Swift and SwiftUI designed to be fast, stable and scalable.",
    "services.design.title": "User-centered design",
    "services.design.body": "Intuitive, polished interfaces that delight and convert users into customers.",
    "services.backend.title": "Backend & data",
    "services.backend.body": "Robust integrations with Supabase and secure, scalable, maintainable APIs.",
    "services.growth.title": "Delivery & growth",
    "services.growth.body": "App Store publishing, metrics, support and continuous improvements.",

    // Process
    "process.title": "My process",
    "process.1.title": "Discovery",
    "process.1.body": "I understand your idea, goals and users to define the right direction.",
    "process.2.title": "Design",
    "process.2.body": "Wireframes and UI/UX that validate the experience before building.",
    "process.3.title": "Development",
    "process.3.body": "Clean code, testing and best practices from day one.",
    "process.4.title": "Launch",
    "process.4.body": "App Store publication and marketing & metrics preparation.",
    "process.5.title": "Evolution",
    "process.5.body": "We analyze, iterate and grow your app together.",

    // FAQ
    "faq.title": "Frequently asked questions",
    "faq.cta.title": "Have another question?",
    "faq.cta.body": "I'm here to help. Let's talk about your project and I'll answer without commitment.",
    "faq.cta.button": "Let's Talk",
    "faq.q1.q": "How much does it cost to develop an iOS app?",
    "faq.q1.a": "The cost depends on the complexity of the application, design and required integrations. After a discovery session to define scope, I'll provide a fixed budget to avoid surprises.",
    "faq.q2.q": "How long does it take for an app to be ready?",
    "faq.q2.a": "An MVP usually requires 4 to 8 weeks of development. Larger projects with custom backends or advanced integrations can take 3 to 6 months.",
    "faq.q3.q": "Do you help publish the app on the App Store?",
    "faq.q3.a": "Yes, I handle the entire publishing process: App Store Connect setup, metadata preparation, initial ASO optimization and resolution of any feedback during Apple's review process.",
    "faq.q4.q": "What technologies do you use for development?",
    "faq.q4.a": "I develop natively for iOS and iPadOS using Swift and SwiftUI to ensure the best experience. For backend and databases I use efficient solutions like Supabase, Firebase or custom APIs.",
    "faq.q5.q": "Do you offer post-launch support and maintenance?",
    "faq.q5.a": "Yes, I offer monthly maintenance services to ensure compatibility with new iOS updates, fix potential issues and continue adding improvements continuously.",

    // CTA
    "cta.title": "Have an idea in mind?",
    "cta.body": "Let's turn it into an iOS app that your users love and that grows your business.",
    "cta.button": "Let's talk about your project",

    // Contact
    "contact.title": "Let's talk about your app",
    "contact.subtitle": "Tell me what you want to build, where you are and what business outcome you expect.",
    "contact.email.label": "Direct email:",
    "contact.form.name": "Name",
    "contact.form.name.placeholder": "Your full name",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "email@example.com",
    "contact.form.topic": "Topic",
    "contact.form.topic.placeholder": "E.g.: iOS App Development, Salesforce Consulting",
    "contact.form.message": "Message",
    "contact.form.message.placeholder": "Describe your idea, requirements or timeline...",
    "contact.form.submit": "Send inquiry",
    "contact.form.sending": "Sending message...",
    "contact.form.error": "Please fill in name, email and message.",
    "contact.form.success": "Message sent. I'll get back to you as soon as possible.",

    // Apps catalog
    "apps.title": "App catalog",
    "apps.subtitle": "Own products and upcoming apps, with public details, support, FAQ and legal documentation per app.",
    "apps.search.placeholder": "Search by name or description...",
    "apps.filter.all.categories": "All Categories",
    "apps.filter.all.platforms": "All Platforms",
    "apps.empty": "No apps found matching your search.",
    "apps.card.details": "View details",
    "apps.card.published": "Published",
    "apps.card.coming_soon": "Coming Soon",
    "apps.card.draft": "Draft",

    // Footer
    "footer.site": "Site",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.cookies": "Cookies",
    "footer.rights": "All rights reserved.",

    // Admin
    "admin.not_configured.title": "Panel not available in production",
    "admin.not_configured.body": "This panel requires a direct connection to Supabase and is only available in the local development environment. Environment variables are not included in the static deploy for security.",

    // App detail
    "app.challenge": "The Challenge",
    "app.challenge.title": "Problem it solves",
    "app.features.label": "Features",
    "app.features.title": "Key functionalities",
    "app.specs.title": "Application Specifications",
    "app.specs.status": "Development status",
    "app.specs.status.published": "Published",
    "app.specs.status.coming_soon": "In preparation",
    "app.specs.platforms": "Supported platforms",
    "app.specs.audience": "Target audience",
    "app.specs.updated": "Last updated",
    "app.faq.label": "Help",
    "app.faq.title": "Questions about",
    "app.faq.subtitle": "Direct answers and doubt resolution about the application.",
    "app.support.cta": "App Support",
    "app.screenshots": "Screenshots",
    "app.benefit": "Benefit",

    // Support page
    "support.title": "Support for",
    "support.body": "If you need help, send a brief description of the problem, steps to reproduce, iOS version and screenshots if relevant.",
    "support.email": "Send email",
    "support.faq": "View FAQ",
    "support.info.title": "Useful support information",
    "support.info.app": "App name:",
    "support.info.platform": "Platform:",
    "support.info.email": "Support email:",
    "support.info.updated": "Last legal update:",
  },
} as const;

export type DictionaryKey = keyof (typeof dictionaries)["es"];

// ─── Context ────────────────────────────────────────────────

export type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: DictionaryKey) => string;
};

export const LocaleContext = createContext<LocaleContextValue>({
  locale: "es",
  setLocale: () => {},
  t: (key) => key,
});

export function useLocale() {
  return useContext(LocaleContext);
}

export function getTranslator(locale: Locale) {
  const dict = dictionaries[locale];
  return (key: DictionaryKey): string => dict[key] ?? key;
}
