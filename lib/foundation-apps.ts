import type { AppItem, LegalPage } from "./types";

const updatedAt = "2026-09-06";

const page = (title: string, title_en: string, body: string[], body_en: string[]): LegalPage => ({
  title,
  title_en,
  updatedAt,
  body,
  body_en
});

const basicPrivacy = (name: string, product: string, email: string) => page(
  `Política de privacidad de ${name}`,
  `${name} Privacy Policy`,
  [
    `Esta política explica qué información trata ${name} para ofrecer ${product}. La información del producto se conserva localmente salvo que una función explícita de Apple o un proveedor configurado por la persona usuaria necesite sincronización o diagnóstico.`,
    "## 1. Responsable y contacto",
    `El responsable es Lester Romero Bernardo (RomeroDev), Valencia, España. Contacto de privacidad y soporte: ${email}.`,
    "## 2. Datos y permisos",
    `La aplicación trata únicamente los datos que introduces o que son necesarios para la función que activas. Los permisos de cámara, archivos, notificaciones, calendario, salud, mascotas, contactos o analítica se solicitan de forma contextual y pueden revocarse desde Ajustes.`,
    "## 3. Proveedores y compras",
    "Apple procesa las descargas y compras del App Store. Si activas diagnósticos o sincronización, los proveedores configurados reciben únicamente la información necesaria para esa función y conforme a sus políticas.",
    "## 4. Conservación y derechos",
    "Puedes eliminar los datos desde la aplicación o desinstalándola, cuando no exista una copia remota activada. Puedes solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad escribiendo al contacto anterior. Los derechos irrenunciables de tu país prevalecen.",
    "## 5. Cambios",
    "Publicaremos aquí los cambios materiales con una nueva fecha de actualización."
  ],
  [
    `This policy explains what ${name} processes to provide ${product}. Product information stays on-device unless an explicit Apple feature or a provider configured by the user needs sync or diagnostics.`,
    "## 1. Controller and contact",
    `The controller is Lester Romero Bernardo (RomeroDev), Valencia, Spain. Privacy and support contact: ${email}.`,
    "## 2. Data and permissions",
    "The app processes only information you enter or that is required for a feature you enable. Camera, files, notifications, calendar, health, pet, contacts, and analytics permissions are requested contextually and can be revoked in Settings.",
    "## 3. Providers and purchases",
    "Apple processes App Store downloads and purchases. If you enable diagnostics or sync, configured providers receive only what is needed for that feature and under their own policies.",
    "## 4. Retention and rights",
    "You can delete data from the app or by uninstalling it when no remote copy is enabled. You may request access, rectification, deletion, restriction, objection, or portability using the contact above. Mandatory local rights prevail.",
    "## 5. Changes",
    "Material changes will be published here with a new update date."
  ]
);

const basicTerms = (name: string, product: string, email: string) => page(
  `Términos de uso de ${name}`,
  `${name} Terms of Use`,
  [
    `Estos términos regulan el uso de ${name}, una herramienta para ${product}. Al utilizarla aceptas estos términos, la política de privacidad y las reglas del App Store.`,
    "## 1. Naturaleza del servicio",
    `${name} ofrece organización y asistencia operativa. No sustituye el criterio profesional, la comunicación oficial, las copias originales ni las decisiones que debas verificar fuera de la aplicación.`,
    "## 2. Uso responsable",
    "Debes revisar los datos, fechas, recordatorios, exportaciones y acciones antes de confiar en ellos. No introduzcas datos de terceros sin autorización ni interfieras con la aplicación o los servicios de Apple.",
    "## 3. Compras y disponibilidad",
    "Apple gestiona los pagos y las renovaciones. La disponibilidad puede depender de iOS, permisos, servicios de Apple y proveedores externos.",
    "## 4. Contacto y legislación",
    `Se aplica la legislación española sin perjuicio de tus derechos imperativos como consumidor. Contacto: ${email}.`
  ],
  [
    `These terms govern the use of ${name}, a tool for ${product}. By using it, you accept these terms, the Privacy Policy, and App Store rules.`,
    "## 1. Nature of the service",
    `${name} provides organization and operational assistance. It does not replace professional judgment, official communication, original records, or decisions you must verify outside the app.`,
    "## 2. Responsible use",
    "Review data, dates, reminders, exports, and actions before relying on them. Do not enter third-party data without permission or interfere with the app or Apple services.",
    "## 3. Purchases and availability",
    "Apple handles payments and renewals. Availability may depend on iOS, permissions, Apple services, and third-party providers.",
    "## 4. Contact and law",
    `Spanish law applies without limiting mandatory consumer rights. Contact: ${email}.`
  ]
);

const subscriptionTerms = (name: string, email: string) => page(
  `Condiciones de suscripción de ${name}`,
  `${name} Subscription Terms`,
  [
    "Las funciones Premium, si están disponibles, se ofrecen mediante Apple In-App Purchase.",
    "Apple muestra el precio final, impuestos, duración, prueba y renovación antes de confirmar. Las suscripciones se renuevan automáticamente salvo cancelación desde Ajustes > tu nombre > Suscripciones.",
    "Eliminar la app no cancela una suscripción. Apple gestiona los reembolsos desde reportaproblem.apple.com.",
    `Contacto de soporte: ${email}.`
  ],
  [
    "Premium features, when available, are offered through Apple In-App Purchase.",
    "Apple shows the final price, taxes, duration, trial, and renewal before confirmation. Subscriptions renew automatically unless cancelled in Settings > your name > Subscriptions.",
    "Deleting the app does not cancel a subscription. Apple handles refunds at reportaproblem.apple.com.",
    `Support contact: ${email}.`
  ]
);

export const culminaApp: AppItem = {
  id: "culmina",
  slug: "culmina",
  legacySlugs: ["followuppro"],
  name: "Culmina",
  tagline: "Convierte proyectos complejos en resultados completados.",
  tagline_en: "Turn complex projects into completed outcomes.",
  shortDescription: "Planifica iniciativas, acciones, personas, recursos, costes y evidencias en un espacio local-first.",
  shortDescription_en: "Plan initiatives, actions, people, resources, costs, and evidence in a local-first workspace.",
  longDescription: "Culmina es un espacio de ejecución para proyectos, eventos y objetivos complejos. Conecta fases, acciones, responsables, presupuesto, documentos, imágenes, enlaces y actividad hasta que el resultado queda completado y documentado.",
  longDescription_en: "Culmina is an execution workspace for complex projects, events, and goals. Connect stages, actions, owners, budgets, documents, images, links, and activity until the outcome is complete and documented.",
  problem: "Los proyectos con muchas piezas se dispersan entre listas, chats, documentos y hojas de cálculo, haciendo difícil saber qué falta y qué ocurre después.",
  problem_en: "Projects with many moving parts become scattered across lists, chats, documents, and spreadsheets, making it hard to know what is missing and what happens next.",
  benefits: [
    "Centro de control: Prioriza próximos pasos, bloqueos y fechas.",
    "Contexto conectado: Mantén acciones, personas, recursos, costes y evidencias relacionados.",
    "Registro completo: Conserva decisiones, documentos y actividad hasta el cierre."
  ],
  benefits_en: [
    "Command center: Prioritize next steps, blockers, and deadlines.",
    "Connected context: Keep actions, people, resources, costs, and evidence related.",
    "Complete record: Preserve decisions, documents, and activity through completion."
  ],
  features: [
    "Iniciativas y fases: Crea proyectos desde plantillas o desde cero.",
    "Acciones y dependencias: Asigna responsables, fechas, prioridades y bloqueos.",
    "Finanzas y evidencias: Controla presupuesto, gastos, archivos, imágenes y enlaces.",
    "Privacidad local: Persistencia SwiftData y exportación/importación JSON."
  ],
  features_en: [
    "Initiatives and stages: Create projects from templates or from scratch.",
    "Actions and dependencies: Assign owners, dates, priorities, and blockers.",
    "Finance and evidence: Track budgets, expenses, files, images, and links.",
    "Local privacy: SwiftData persistence and JSON export/import."
  ],
  audience: "Profesionales independientes, familias, organizadores, creadores, equipos pequeños y personas que gestionan proyectos con contexto.",
  audience_en: "Independent professionals, families, organizers, creators, small teams, and people managing high-context projects.",
  status: "testing",
  featured: true,
  category: "Productividad",
  category_en: "Productivity",
  platform: ["iOS", "iPadOS"],
  supportEmail: "romerodev.app@gmail.com",
  bundleIdentifier: "com.romerodev.culmina",
  version: "1.0.0",
  buildNumber: "100202609063",
  iconUrl: "assets/images/culmina/culmina-icon.png",
  coverImageUrl: "assets/images/culmina/culmina-hero.png",
  media: [
    { kind: "icon", path: "assets/images/culmina/culmina-icon.png", alt: "Icono de Culmina" },
    { kind: "cover", path: "assets/images/culmina/culmina-hero.png", alt: "Culmina workspace" },
    { kind: "press", path: "assets/images/culmina/culmina-mark.svg", alt: "Marca de Culmina" }
  ],
  screenshots: [],
  primaryCtaLabel: "Seguir el desarrollo",
  primaryCtaLabel_en: "Follow development",
  primaryCtaUrl: "/es/casos/culmina/soporte/",
  secondaryCtaLabel: "Ver soporte",
  secondaryCtaLabel_en: "View support",
  secondaryCtaUrl: "/es/casos/culmina/soporte/",
  colorPrimary: "#0f5bff",
  colorSecondary: "#ffc857",
  updatedAt,
  seo: {
    title: "Culmina: workspace para proyectos complejos | RomeroDev",
    description: "Convierte proyectos, eventos y objetivos complejos en planes ejecutables con Culmina."
  },
  pricing: [
    { name: "Anual", name_en: "Annual", price: "Precio en App Store", cadence: "/año", cadence_en: "/year", description: "Precio pendiente de publicación; Apple mostrará las condiciones finales.", description_en: "Pricing is pending publication; Apple will show the final terms.", isIndicative: true, featured: true },
    { name: "Vitalicio", name_en: "Lifetime", price: "Precio en App Store", cadence: "pago único", cadence_en: "one-time", description: "Compra única prevista para cuentas elegibles.", description_en: "One-time purchase planned for eligible accounts.", isIndicative: true }
  ],
  freeFeatures: ["Iniciativas y fases", "Acciones y dependencias", "Persistencia local", "Exportación e importación"],
  freeFeatures_en: ["Initiatives and stages", "Actions and dependencies", "Local persistence", "Export and import"],
  proFeatures: ["Finanzas avanzadas", "Colaboración y sincronización futura", "Automatizaciones", "Capacidades Premium previstas"],
  proFeatures_en: ["Advanced finance", "Future collaboration and sync", "Automations", "Planned Premium capabilities"],
  faq: [
    { question: "¿Culmina está publicada?", question_en: "Is Culmina published?", answer: "Todavía no. El núcleo local está implementado y validado, pero la ficha, las URLs legales, las capturas y el QA físico siguen pendientes antes de una publicación pública.", answer_en: "Not yet. The local core is implemented and validated, but the listing, legal URLs, screenshots, and physical QA remain before public release." },
    { question: "¿Dónde se guardan los datos?", question_en: "Where is data stored?", answer: "La versión actual usa persistencia local. La colaboración y sincronización remota son trabajo posterior y no deben darse por disponibles.", answer_en: "The current version uses local persistence. Remote collaboration and sync are future work and should not be assumed available." }
  ],
  legal: {
    privacy: basicPrivacy("Culmina", "organización y ejecución de proyectos", "romerodev.app@gmail.com"),
    terms: basicTerms("Culmina", "organización y ejecución de proyectos", "romerodev.app@gmail.com"),
    subscriptions: subscriptionTerms("Culmina", "romerodev@gmail.com")
  },
  followEnabled: true,
  completeness: { score: 72, missing: ["screenshots", "public_testflight_or_download", "final_store_metadata", "physical_device_qa"], verifiedAt: updatedAt, sourcePath: "/Volumes/SSD Externo/DESARROLLO/iOS/FollowUpPro" }
};

export const vitalsBudApp: AppItem = {
  id: "vitalsbud",
  slug: "vitalsbud",
  name: "VitalsBud",
  tagline: "Salud, rutinas y documentos veterinarios para tu hogar.",
  tagline_en: "Pet health, routines, and veterinary records for your home.",
  shortDescription: "Una app pet-first para centralizar prevención, medicación, rutinas, historial veterinario y colaboración entre cuidadores.",
  shortDescription_en: "A pet-first app for prevention, medication, routines, veterinary records, and caregiver coordination.",
  longDescription: "VitalsBud está evolucionando desde una base SwiftUI hacia una experiencia completa de cuidado para mascotas: perfiles, prevención, citas, medicación, peso, síntomas, rutinas, documentos y exportes para veterinaria.",
  longDescription_en: "VitalsBud is evolving from a SwiftUI foundation into a complete pet-care experience: profiles, prevention, appointments, medication, weight, symptoms, routines, records, and veterinary exports.",
  problem: "La información de una mascota vive repartida entre memoria, notas, fotos, PDFs, chats y calendarios, lo que dificulta cuidar y compartir contexto.",
  problem_en: "A pet's information is scattered across memory, notes, photos, PDFs, chats, and calendars, making care and context sharing difficult.",
  benefits: [
    "Pet-first: Salud preventiva, rutinas y documentos con lenguaje pensado para mascotas.",
    "Contexto útil: Prepara citas y decisiones con historial y registros relacionados.",
    "Privacidad local: Base SwiftData y permisos solicitados solo cuando una función los necesita."
  ],
  benefits_en: [
    "Pet-first: Preventive health, routines, and records designed for pets.",
    "Useful context: Prepare appointments and decisions with related history and records.",
    "Local privacy: SwiftData foundation and permissions requested only when needed."
  ],
  features: [
    "Perfiles de mascotas y hogares.",
    "Vacunas, preventivos, medicación, síntomas, peso y citas.",
    "Rutinas diarias, documentos médicos y exporte veterinario.",
    "Localización ES/EN, StoreKit y arquitectura preparada para evolución."
  ],
  features_en: [
    "Pet and household profiles.",
    "Vaccines, preventives, medication, symptoms, weight, and appointments.",
    "Daily routines, medical records, and veterinary export.",
    "EN/ES localization, StoreKit, and an extensible architecture."
  ],
  audience: "Personas y hogares que quieren cuidar mejor de sus mascotas y llegar a la consulta veterinaria con el contexto preparado.",
  audience_en: "People and households who want to care better for their pets and arrive at veterinary visits with context prepared.",
  status: "development",
  featured: true,
  category: "Salud y mascotas",
  category_en: "Pet Health",
  platform: ["iOS", "iPadOS"],
  supportEmail: "romerodev.app@gmail.com",
  bundleIdentifier: "com.romerodev.vitalsbud",
  version: "1.0.0",
  buildNumber: "100202609061",
  screenshots: [],
  iconUrl: "assets/images/vitalsbud/vitalsbud-icon.png",
  primaryCtaLabel: "Disponible próximamente",
  primaryCtaLabel_en: "Coming soon",
  primaryCtaUrl: "/es/casos/vitalsbud/soporte/",
  secondaryCtaLabel: "Ver soporte",
  secondaryCtaLabel_en: "View support",
  secondaryCtaUrl: "/es/casos/vitalsbud/soporte/",
  colorPrimary: "#d97706",
  colorSecondary: "#14b8a6",
  updatedAt,
  seo: {
    title: "VitalsBud: cuidado de mascotas y salud preventiva | RomeroDev",
    description: "VitalsBud centraliza salud, rutinas, documentos y prevención veterinaria para hogares con mascotas."
  },
  pricing: [
    { name: "Gratis", name_en: "Free", price: "En desarrollo", cadence: "", cadence_en: "", description: "El producto y sus límites comerciales siguen en definición.", description_en: "The product and commercial limits are still being defined.", isIndicative: true },
    { name: "VitalsBud Plus", name_en: "VitalsBud Plus", price: "En desarrollo", cadence: "", cadence_en: "", description: "Suscripción prevista; aún no disponible para compra.", description_en: "Planned subscription; not available for purchase yet.", isIndicative: true, featured: true }
  ],
  freeFeatures: ["Perfil de mascota", "Registros de salud", "Rutinas y calendario"],
  freeFeatures_en: ["Pet profile", "Health records", "Routines and calendar"],
  proFeatures: ["Analítica avanzada", "Exportes veterinarios", "Funciones Plus previstas"],
  proFeatures_en: ["Advanced analytics", "Veterinary exports", "Planned Plus features"],
  faq: [
    { question: "¿VitalsBud está lista para descargar?", question_en: "Is VitalsBud ready to download?", answer: "No. El repositorio aún está en fase de desarrollo y reforma; no hay una descarga pública que debamos presentar como disponible.", answer_en: "No. The repository is still in development and reform; there is no public download to present as available." },
    { question: "¿Es una app médica?", question_en: "Is it a medical app?", answer: "No. VitalsBud es una herramienta de organización del cuidado de mascotas y no sustituye el criterio veterinario.", answer_en: "No. VitalsBud is a pet-care organization tool and does not replace veterinary judgment." }
  ],
  legal: {
    privacy: basicPrivacy("VitalsBud", "organización del cuidado de mascotas", "romerodev.app@gmail.com"),
    terms: basicTerms("VitalsBud", "organización del cuidado de mascotas", "romerodev.app@gmail.com"),
    subscriptions: subscriptionTerms("VitalsBud", "romerodev.app@gmail.com")
  },
  followEnabled: true,
  completeness: { score: 58, missing: ["screenshots", "video", "public_download", "final_store_metadata", "physical_device_qa"], verifiedAt: updatedAt, sourcePath: "/Volumes/SSD Externo/DESARROLLO/iOS/VitalsBud" }
};
