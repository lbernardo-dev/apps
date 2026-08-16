"use client";
import { createContext, useContext } from "react";
import { resourcesData } from "./resources-content";

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
    "nav.apps": "Productos",
    "nav.services": "Servicios",
    "nav.about": "Sobre mí",
    "nav.contact": "Contacto",
    "nav.cta": "Hablemos",
    "nav.resources": "Recursos",

    // Home Redesign Additions
    "home.trust.certs": "9x Certificaciones Salesforce",
    "home.trust.native": "Desarrollo iOS Nativo",
    "home.trust.xp": "Experiencia en PageGroup",
    "home.trust.delivered": "Apps Publicadas",

    "home.bio.label": "INGENIERO DE SOFTWARE & PRODUCTO",
    "home.bio.title": "Hola, soy Lester Romero Bernardo",
    "home.bio.body1": "Ingeniero informático con base en Valencia y más de una década de experiencia traduciendo retos complejos de negocio en software de alta calidad. Combino mi dominio técnico en consultoría CRM avanzada (Salesforce) con mi pasión por la artesanía del software móvil para iOS.",
    "home.bio.body2": "Mi enfoque no es solo escribir código limpio, sino comprender los objetivos de tu negocio, diseñar flujos de experiencia de usuario nativos que enamoren a tus clientes y crear arquitecturas de datos e integraciones robustas y y fáciles de mantener.",
    "home.bio.cta": "Conocer más sobre mi perfil",

    "home.testimonials.title": "Diseño y desarrollo de confianza",
    "home.testimonials.subtitle": "Lo que dicen de la calidad, dedicación y entrega de mis productos.",
    "home.testimonials.quote1": "Excelente atención al detalle. VitalsPath es intuitiva, rápida y la interfaz de usuario se siente sumamente limpia, nativa y moderna.",
    "home.testimonials.author1": "Usuario de VitalsPath",
    "home.testimonials.quote2": "Una arquitectura muy sólida. La integración de widgets en la pantalla de bloqueo y la sincronización con iCloud es impecable.",
    "home.testimonials.author2": "Opinión en App Store",

    // Hero
    "hero.title.before": "Diseño, desarrollo & ",
    "hero.title.highlight": "estabilización",
    "hero.title.after": " de productos digitales",
    "hero.subtitle": "Aplicaciones iOS, SwiftUI, Salesforce e integraciones construidas con visión de producto, rigor técnico y capacidad real de ejecución.",
    "hero.cta.primary": "Necesito desarrollar una app",
    "hero.cta.secondary": "Necesito mejorar Salesforce",
    "hero.cta.audit": "Quiero auditar un producto",
    "hero.proof.native.title": "Soluciones Salesforce",
    "hero.proof.native.body": "Flujos de trabajo, automatizaciones y CRM.",
    "hero.proof.privacy.title": "Apps iOS Nativas",
    "hero.proof.privacy.body": "Rendimiento y experiencia nativa premium.",
    "hero.proof.results.title": "Para Empresas y Autónomos",
    "hero.proof.results.body": "Soluciones escalables que generan valor.",

    // Showcase
    "showcase.title": "Producto Destacado",
    "showcase.subtitle": "Explora mis productos diseñados nativamente para iOS, con atención al detalle y enfoque comercial.",
    "showcase.explore": "Explorar todas las características de",

    // Services
    "services.title": "¿Qué puedo hacer por ti?",
    "services.subtitle": "Ofrezco soluciones de principio a fin, combinando criterio de producto con excelencia técnica.",
    "services.ios.title": "Desarrollo iOS nativo",
    "services.ios.body": "Apps iPhone, iPad y Apple Watch con Swift y SwiftUI de alto rendimiento, listas para publicar.",
    "services.salesforce.title": "Consultoría Salesforce",
    "services.salesforce.body": "Apex, LWC, Flows y optimizaciones avanzadas para exprimir al máximo tu CRM corporativo.",
    "services.audit.title": "Auditoría de apps",
    "services.audit.body": "Identifico deuda técnica, fugas de memoria, problemas de accesibilidad y bloqueos en SwiftUI.",
    "services.design.title": "Diseño de producto",
    "services.design.body": "Discovery, UX/UI, wireframes y sistemas de diseño alineados con las HIG de Apple.",
    "services.automation.title": "Integración y automatización",
    "services.automation.body": "Conexión segura de Salesforce con SAP, APIs REST/SOAP y automatización de procesos.",

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
    "contact.title": "Hablemos de tu proyecto",
    "contact.subtitle": "Cuéntame qué quieres construir o qué reto técnico necesitas resolver en tu Salesforce o aplicación.",
    "contact.email.label": "Email directo:",
    "contact.form.name": "Nombre",
    "contact.form.name.placeholder": "Tu nombre completo",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "correo@ejemplo.com",
    "contact.form.topic": "Tipo de necesidad",
    "contact.form.topic.placeholder": "Ej: Desarrollo App iOS, Consultoría Salesforce",
    "contact.form.message": "Mensaje",
    "contact.form.message.placeholder": "Describe tu idea, requerimientos o plazos...",
    "contact.form.submit": "Enviar consulta",
    "contact.form.sending": "Enviando mensaje...",
    "contact.form.error": "Completa nombre, email y mensaje.",
    "contact.form.success": "Mensaje enviado. Te responderé lo antes posible.",

    // Apps catalog
    "apps.title": "Productos RomeroDev",
    "apps.subtitle": "Soluciones reales diseñadas, publicadas y mantenidas por RomeroDev.",
    "apps.search.placeholder": "Buscar por nombre o descripción...",
    "apps.filter.all.categories": "Todas las Categorías",
    "apps.filter.all.platforms": "Todas las Plataformas",
    "apps.empty": "No se encontraron aplicaciones que coincidan con tu búsqueda.",
    "apps.card.details": "Ver detalles",
    "apps.card.published": "Publicada",
    "apps.card.coming_soon": "Próximamente",
    "apps.card.draft": "Borrador",

    // Marketplace
    "marketplace.nav": "Marketplace",
    "marketplace.eyebrow": "Ofertas revisadas",
    "marketplace.title": "Marketplace de tecnología",
    "marketplace.subtitle": "Gadgets, accesorios para iOS y soluciones de carga seleccionados y verificados. Los datos (precio, fotos, valoración) se obtienen directamente de AliExpress.",
    "marketplace.search.placeholder": "Buscar producto...",
    "marketplace.filter.all": "Todas las Categorías",
    "marketplace.featured": "Destacado",
    "marketplace.rating": "Valoración",
    "marketplace.sold": "vendidos",
    "marketplace.buy": "Ver oferta",
    "marketplace.empty": "No se encontraron productos que coincidan con tu búsqueda.",
    "marketplace.disclaimer": "Como afiliado, obtengo una pequeña comisión si compras a través de estos enlaces, sin coste extra para ti.",
    "marketplace.admin.hint": "Gestiona o vincula productos manualmente desde /admin → Marketplace.",

    // Footer
    "footer.site": "Sitio",
    "footer.legal": "Legal",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",
    "footer.cookies": "Cookies",
    "footer.rights": "Todos los derechos reservados.",

    // Admin
    "admin.not_configured.title": "Panel no disponible en producción",
    "admin.not_configured.body": "Este panel requiere conexión directa con Supabase y solo está disponible en el entorno de desarrollo local.",

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

    // Screenshots
    "screenshot.vitalspath.día-actual": "Hoy: contexto diario de la familia",
    "screenshot.vitalspath.medicación": "Detalle y planificación de medicación",
    "screenshot.vitalspath.tratamiento": "Seguimiento del tratamiento",
    "screenshot.vitalspath.perfiles": "Perfiles familiares compartidos",
    "screenshot.vitalspath.condiciones": "Condiciones y patologías",
    "screenshot.vitalspath.bienestar": "Métricas y constantes corporales",
    "screenshot.vitalspath.citas": "Calendario de citas y tareas",
    "screenshot.vitalspath.privacidad": "Control de privacidad y permisos",
    "screenshot.vitalspath.insights": "Insights de bienestar",
    "screenshot.vitalspath.widgets": "Widgets interactivos",
    "screenshot.reps.01-train-smarter": "Planes y rutinas para entrenar con estructura",
    "screenshot.reps.02-follow-real-plan": "Sigue el plan del día en tu entrenamiento",
    "screenshot.reps.03-control-load": "Controla carga, repeticiones y descansos",
    "screenshot.reps.04-see-weekly-progress": "Mira tu progreso semanal",
    "screenshot.reps.05-connect-health": "Sincronización con Apple Health",
    "screenshot.reps.06-map-every-muscle": "Mapea cada grupo muscular",
    "screenshot.reps.07-find-core-exercises": "Encuentra ejercicios core y tus rutinas",
    "screenshot.reps.08-start-structured": "Empieza con un plan estructurado",
    "screenshot.reps.09-track-your-body": "Registra la evolución de tu cuerpo",
    "screenshot.reps.10-stay-consistent": "Mantén la racha y sé constante",
    "screenshot.shield.01-home": "Biblioteca privada y acceso rápido",
    "screenshot.shield.02-capture": "Cámara, escáner, Fotos y Archivos",
    "screenshot.shield.03-editor": "Máscaras precisas y editables",
    "screenshot.shield.04-ocr": "Sugerencias OCR revisables",
    "screenshot.shield.05-export": "Exportación rasterizada y verificada",
    "screenshot.shield.06-gallery": "Galería de documentos procesados",
    "screenshot.shield.07-vault": "Bóveda cifrada con autenticación",
    "screenshot.shield.08-batch": "Procesamiento por lotes",
    "screenshot.shield.09-paywall": "MaskID Pro y funciones avanzadas",
    "screenshot.shield.10-settings": "Controles claros de privacidad",
    "screenshot.upledger.resumen": "Tu dinero en una sola agenda",
    "screenshot.upledger.facturas": "Facturas siempre bajo control",
    "screenshot.upledger.capturar": "Captura gastos en segundos",
    "screenshot.upledger.plan": "Planifica tu mes, gasta mejor",
    "screenshot.upledger.libro": "Cada transacción en su sitio",
    "screenshot.upledger.tendencias": "Ve las tendencias que importan",
    "screenshot.upledger.hogar": "Organiza las finanzas de tu hogar",
    "screenshot.upledger.cuentas": "Tus cuentas de un vistazo",
    "screenshot.upledger.detalle": "Registra cada movimiento con detalle",
    "screenshot.upledger.ajustes": "Configura UpLedger a tu manera"
  },

  en: {
    // Nav
    "nav.home": "Home",
    "nav.apps": "Products",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cta": "Let's Talk",
    "nav.resources": "Resources",

    // Home Redesign Additions
    "home.trust.certs": "9x Salesforce Certifications",
    "home.trust.native": "Native iOS Development",
    "home.trust.xp": "PageGroup Experience",
    "home.trust.delivered": "Published Apps",

    "home.bio.label": "SOFTWARE & PRODUCT ENGINEER",
    "home.bio.title": "Hi, I'm Lester Romero Bernardo",
    "home.bio.body1": "Software engineer based in Valencia with over a decade of experience translating complex business challenges into high-quality software. I combine my technical expertise in advanced CRM consulting (Salesforce) with my passion for mobile software craftsmanship on iOS.",
    "home.bio.body2": "My approach is not just writing clean code, but understanding your business objectives, designing native user experiences that delight your customers, and building robust, scalable data architectures and integrations.",
    "home.bio.cta": "Learn more about my background",

    "home.testimonials.title": "Trusted Design & Development",
    "home.testimonials.subtitle": "What people say about the quality, dedication, and delivery of my products.",
    "home.testimonials.quote1": "Excellent attention to detail. VitalsPath is intuitive, fast, and the user interface feels extremely clean, native, and modern.",
    "home.testimonials.author1": "VitalsPath User",
    "home.testimonials.quote2": "A very solid architecture. The integration of lock screen widgets and iCloud sync is absolutely flawless.",
    "home.testimonials.author2": "App Store Review",

    // Hero
    "hero.title.before": "I design, build & ",
    "hero.title.highlight": "stabilise",
    "hero.title.after": " digital products",
    "hero.subtitle": "iOS apps, SwiftUI, Salesforce, and integrations delivered with product thinking, technical rigour, and end-to-end execution.",
    "hero.cta.primary": "I need an app built",
    "hero.cta.secondary": "I need to improve Salesforce",
    "hero.cta.audit": "I need a product audit",
    "hero.proof.native.title": "Salesforce Solutions",
    "hero.proof.native.body": "Custom workflows, automations, and CRM setups.",
    "hero.proof.privacy.title": "Native iOS Apps",
    "hero.proof.privacy.body": "Exceptional performance and native iOS design.",
    "hero.proof.results.title": "For Businesses & Freelancers",
    "hero.proof.results.body": "Scalable software products that drive business value.",

    // Showcase
    "showcase.title": "Featured Product",
    "showcase.subtitle": "Explore my products designed natively for iOS, with attention to detail and commercial focus.",
    "showcase.explore": "Explore all features of",

    // Services
    "services.title": "What can I do for you?",
    "services.subtitle": "End-to-end solutions combining product thinking with technical excellence.",
    "services.ios.title": "Native iOS development",
    "services.ios.body": "iPhone, iPad, and Apple Watch apps using high-performance Swift & SwiftUI, ready for release.",
    "services.salesforce.title": "Salesforce Consulting",
    "services.salesforce.body": "Apex, LWC, Flows, and advanced optimizations to unlock your corporate CRM's full value.",
    "services.audit.title": "App Audits & Modernisation",
    "services.audit.body": "Identify structural technical debt, memory leaks, WCAG accessibility flaws, and SwiftUI lags.",
    "services.design.title": "Product Design",
    "services.design.body": "Discovery, UX/UI, wireframes, and design systems fully aligned with Apple's HIG.",
    "services.automation.title": "Integrations & Automation",
    "services.automation.body": "Secure Salesforce connectivity with ERPs (SAP), custom REST/SOAP APIs, and process sync.",

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
    "contact.title": "Let's talk about your project",
    "contact.subtitle": "Tell me what you want to build or what technical problem you need solved in your software.",
    "contact.email.label": "Direct email:",
    "contact.form.name": "Name",
    "contact.form.name.placeholder": "Your full name",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "email@example.com",
    "contact.form.topic": "Need Type",
    "contact.form.topic.placeholder": "E.g.: iOS App Development, Salesforce Consulting",
    "contact.form.message": "Message",
    "contact.form.message.placeholder": "Describe your idea, requirements or timeline...",
    "contact.form.submit": "Send inquiry",
    "contact.form.sending": "Sending message...",
    "contact.form.error": "Please fill in name, email and message.",
    "contact.form.success": "Message sent. I'll get back to you as soon as possible.",

    // Apps catalog
    "apps.title": "RomeroDev Products",
    "apps.subtitle": "Real products designed, published, and supported by RomeroDev.",
    "apps.search.placeholder": "Search by name or description...",
    "apps.filter.all.categories": "All Categories",
    "apps.filter.all.platforms": "All Platforms",
    "apps.empty": "No apps found matching your search.",
    "apps.card.details": "View details",
    "apps.card.published": "Published",
    "apps.card.coming_soon": "Coming Soon",
    "apps.card.draft": "Draft",

    // Marketplace
    "marketplace.nav": "Marketplace",
    "marketplace.eyebrow": "Curated deals",
    "marketplace.title": "Tech marketplace",
    "marketplace.subtitle": "AI-reviewed deals on gadgets, iOS accessories, and charging gear from AliExpress.",
    "marketplace.search.placeholder": "Search products...",
    "marketplace.filter.all": "All Categories",
    "marketplace.featured": "Featured",
    "marketplace.rating": "Rating",
    "marketplace.sold": "sold",
    "marketplace.buy": "View deal",
    "marketplace.empty": "No products found matching your search.",
    "marketplace.disclaimer": "As an affiliate, I earn a small commission if you buy through these links, at no extra cost to you.",
    "marketplace.admin.hint": "Manage or link products manually from /admin → Marketplace.",

    // Footer
    "footer.site": "Site",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.cookies": "Cookies",
    "footer.rights": "All rights reserved.",

    // Admin
    "admin.not_configured.title": "Panel not available in production",
    "admin.not_configured.body": "This panel requires a direct connection to Supabase and is only available in local development.",

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

    // Screenshots
    "screenshot.vitalspath.día-actual": "Today: family daily context",
    "screenshot.vitalspath.medicación": "Medication detail and planning",
    "screenshot.vitalspath.tratamiento": "Treatment tracking",
    "screenshot.vitalspath.perfiles": "Shared family profiles",
    "screenshot.vitalspath.condiciones": "Conditions and pathologies",
    "screenshot.vitalspath.bienestar": "Vitals and body measurements",
    "screenshot.vitalspath.citas": "Appointments and task calendar",
    "screenshot.vitalspath.privacidad": "Privacy and permission controls",
    "screenshot.vitalspath.insights": "Wellness insights",
    "screenshot.vitalspath.widgets": "Interactive widgets",
    "screenshot.reps.01-train-smarter": "Smart routines and workout plans",
    "screenshot.reps.02-follow-real-plan": "Follow today's plan in your workout",
    "screenshot.reps.03-control-load": "Control load, reps and rest",
    "screenshot.reps.04-see-weekly-progress": "See your weekly progress",
    "screenshot.reps.05-connect-health": "Apple Health synchronization",
    "screenshot.reps.06-map-every-muscle": "Map every muscle group",
    "screenshot.reps.07-find-core-exercises": "Find core exercises and your routines",
    "screenshot.reps.08-start-structured": "Start with a structured plan",
    "screenshot.reps.09-track-your-body": "Track your body evolution",
    "screenshot.reps.10-stay-consistent": "Stay consistent and keep your streak",
    "screenshot.shield.01-home": "Private library and quick actions",
    "screenshot.shield.02-capture": "Camera, scanner, Photos, and Files",
    "screenshot.shield.03-editor": "Precise, editable masks",
    "screenshot.shield.04-ocr": "Reviewable OCR suggestions",
    "screenshot.shield.05-export": "Rasterized, verified export",
    "screenshot.shield.06-gallery": "Processed documents gallery",
    "screenshot.shield.07-vault": "Encrypted, authenticated Vault",
    "screenshot.shield.08-batch": "Batch processing",
    "screenshot.shield.09-paywall": "MaskID Pro and advanced features",
    "screenshot.shield.10-settings": "Clear privacy controls",
    "screenshot.upledger.resumen": "Your money in one clear agenda",
    "screenshot.upledger.facturas": "Stay ahead of every bill",
    "screenshot.upledger.capturar": "Capture spending in seconds",
    "screenshot.upledger.plan": "Plan your month before you spend",
    "screenshot.upledger.libro": "Every transaction in one ledger",
    "screenshot.upledger.tendencias": "See the bigger picture over time",
    "screenshot.upledger.hogar": "Built for household money",
    "screenshot.upledger.cuentas": "Keep accounts, cash and cards organized",
    "screenshot.upledger.detalle": "Add every detail that matters",
    "screenshot.upledger.ajustes": "Make UpLedger your own"
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

// ─── Path Translation Helpers ──────────────────────────────────

export function getEquivalentPath(pathname: string, targetLocale: Locale): string {
  // Normalize and split path parts
  const cleanPath = pathname.replace(/^\/(apps\/|es\/|en\/)/, "/");
  const parts = cleanPath.split("/").filter(Boolean);

  if (parts.length === 0) {
    return `/${targetLocale}/`;
  }

  const section = parts[0];
  const slug = parts[1];

  if (targetLocale === "en") {
    if (section === "sobre-mi") return "/en/about/";
    if (section === "contacto") return "/en/contact/";
    if (section === "privacidad") return "/en/privacy/";
    if (section === "terminos") return "/en/terms/";
    if (section === "cookies") return "/en/cookies/";
    if (section === "recursos") {
      if (slug) {
        const art = resourcesData.find(a => a.slug_es === slug);
        return art ? `/en/resources/${art.slug_en}/` : "/en/resources/";
      }
      return "/en/resources/";
    }
    if (section === "productos") return "/en/products/";
    if (section === "marketplace") return "/en/marketplace/";

    // Services
    if (section === "desarrollo-ios") return "/en/ios-development/";
    if (section === "consultoria-salesforce") return "/en/salesforce-consulting/";
    if (section === "auditoria-de-apps") return "/en/app-audits/";
    if (section === "diseno-de-producto") return "/en/product-design/";
    if (section === "integraciones-y-automatizacion" || section === "integracion-y-automatizacion") return "/en/integrations-and-automation/";

    // Cases
    if (section === "casos") {
      if (slug) {
        const sub = parts[2];
        if (sub) {
          let subEn = sub;
          if (sub === "soporte") subEn = "support";
          if (sub === "privacidad") subEn = "privacy";
          if (sub === "terminos") subEn = "terms";
          if (sub === "suscripciones") subEn = "subscriptions";
          if (sub === "preguntas-frecuentes") subEn = "faq";
          return `/en/case-studies/${slug}/${subEn}/`;
        }
        return `/en/case-studies/${slug}/`;
      }
      return "/en/products/";
    }
  } else {
    if (section === "about") return "/es/sobre-mi/";
    if (section === "contact") return "/es/contacto/";
    if (section === "privacy") return "/es/privacidad/";
    if (section === "terms") return "/es/terms/";
    if (section === "cookies") return "/es/cookies/";
    if (section === "resources") {
      if (slug) {
        const art = resourcesData.find(a => a.slug_en === slug);
        return art ? `/es/recursos/${art.slug_es}/` : "/es/recursos/";
      }
      return "/es/recursos/";
    }
    if (section === "products") return "/es/productos/";
    if (section === "marketplace") return "/es/marketplace/";

    // Services
    if (section === "ios-development") return "/es/desarrollo-ios/";
    if (section === "salesforce-consulting") return "/es/consultoria-salesforce/";
    if (section === "app-audits") return "/es/auditoria-de-apps/";
    if (section === "product-design") return "/es/diseno-de-producto/";
    if (section === "integrations-and-automation") return "/es/integraciones-y-automatizacion/";

    // Cases
    if (section === "case-studies") {
      if (slug) {
        const sub = parts[2];
        if (sub) {
          let subEs = sub;
          if (sub === "support") subEs = "soporte";
          if (sub === "privacy") subEs = "privacidad";
          if (sub === "terms") subEs = "terminos";
          if (sub === "subscriptions") subEs = "suscripciones";
          if (sub === "faq") subEs = "preguntas-frecuentes";
          return `/es/casos/${slug}/${subEs}/`;
        }
        return `/es/casos/${slug}/`;
      }
      return "/es/productos/";
    }
  }

  return `/${targetLocale}/`;
}
