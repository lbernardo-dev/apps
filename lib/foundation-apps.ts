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

const culminaSubscriptionTerms: LegalPage = {
  title: "Condiciones de compra y suscripción de Culmina Pro",
  title_en: "Culmina Pro Purchase and Subscription Terms",
  updatedAt: "2026-10-11",
  body: [
    "Culmina Pro se contrata dentro de la app mediante Apple In-App Purchase. Los planes mensual y anual son suscripciones con renovación automática; Culmina Pro Vitalicio es un pago único.",
    "Apple muestra el precio local, la duración y las condiciones antes de confirmar. Las suscripciones mensual y anual incluyen una prueba gratuita de una semana para cuentas elegibles. Después de la prueba, se renuevan al precio y periodo indicados por Apple salvo que canceles antes de la siguiente renovación.",
    "Puedes gestionar o cancelar las suscripciones en Ajustes > tu nombre > Suscripciones. Eliminar la app no cancela una suscripción. La compra vitalicia no se renueva.",
    "Apple gestiona las solicitudes de reembolso en reportaproblem.apple.com.",
    "Contacto de soporte: romerodev.app@gmail.com."
  ],
  body_en: [
    "Culmina Pro is purchased in the app through Apple In-App Purchase. Monthly and Annual are auto-renewable subscriptions; Culmina Pro Lifetime is a one-time purchase.",
    "Apple shows the local price, duration, and terms before confirmation. Monthly and Annual include a one-week free trial for eligible accounts. After the trial, they renew at the price and period shown by Apple unless cancelled before the next renewal.",
    "Manage or cancel subscriptions in Settings > your name > Subscriptions. Deleting the app does not cancel a subscription. The Lifetime purchase does not renew.",
    "Apple handles refund requests at reportaproblem.apple.com.",
    "Support contact: romerodev.app@gmail.com."
  ]
};

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
  status: "coming_soon",
  featured: true,
  category: "Productividad",
  category_en: "Productivity",
  platform: ["iOS", "iPadOS"],
  supportEmail: "romerodev.app@gmail.com",
  bundleIdentifier: "com.romerodev.culmina",
  version: "1.0.0",
  buildNumber: "1002026101201",
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
  updatedAt: "2026-10-11",
  seo: {
    title: "Culmina: workspace para proyectos complejos | RomeroDev",
    description: "Convierte proyectos, eventos y objetivos complejos en planes ejecutables con Culmina."
  },
  pricing: [
    { name: "Mensual", name_en: "Monthly", price: "2,99 €", cadence: "/mes", cadence_en: "/month", description: "Acceso a Culmina Pro con prueba gratuita de una semana para cuentas elegibles.", description_en: "Culmina Pro access with a one-week free trial for eligible accounts.", isIndicative: false },
    { name: "Anual", name_en: "Annual", price: "19,99 €", cadence: "/año", cadence_en: "/year", description: "Incluye una prueba gratuita de una semana para cuentas elegibles y ahorra un 44% frente a 12 pagos mensuales.", description_en: "Includes a one-week free trial for eligible accounts and saves 44% versus 12 monthly payments.", isIndicative: false, featured: true },
    { name: "Vitalicio", name_en: "Lifetime", price: "49,99 €", cadence: "pago único", cadence_en: "one-time", description: "Pago único con acceso permanente a las funciones Pro incluidas actualmente.", description_en: "One-time purchase with permanent access to the Pro features currently included.", isIndicative: false }
  ],
  freeFeatures: ["Hasta 3 iniciativas", "Acciones y dependencias", "Persistencia local", "Exportación e importación"],
  freeFeatures_en: ["Up to 3 initiatives", "Actions and dependencies", "Local persistence", "Export and import"],
  proFeatures: ["Iniciativas ilimitadas", "Filtros por estado", "Selección manual de temas de temporada"],
  proFeatures_en: ["Unlimited initiatives", "Status filters", "Manual seasonal theme selection"],
  faq: [
    { question: "¿Cuándo estará disponible Culmina?", question_en: "When will Culmina be available?", answer: "El build actualizado de Culmina 1.0.0 está preparado en App Store Connect para una nueva presentación a revisión. La app estará disponible cuando Apple apruebe la versión.", answer_en: "The updated Culmina 1.0.0 build is prepared in App Store Connect for a new review submission. The app will be available when Apple approves the version." },
    { question: "¿Dónde se guardan los datos?", question_en: "Where is data stored?", answer: "La versión actual usa persistencia local. La colaboración y sincronización remota son trabajo posterior y no deben darse por disponibles.", answer_en: "The current version uses local persistence. Remote collaboration and sync are future work and should not be assumed available." }
  ],
  legal: {
    privacy: basicPrivacy("Culmina", "organización y ejecución de proyectos", "romerodev.app@gmail.com"),
    terms: basicTerms("Culmina", "organización y ejecución de proyectos", "romerodev.app@gmail.com"),
    subscriptions: culminaSubscriptionTerms
  },
  followEnabled: true,
  completeness: { score: 72, missing: ["screenshots", "public_testflight_or_download", "final_store_metadata", "physical_device_qa"], verifiedAt: updatedAt, sourcePath: "/Volumes/SSD Externo/DESARROLLO/iOS/FollowUpPro" }
};

export const vitalsBudApp: AppItem = {
  id: "vitalsbud",
  slug: "vitalsbud",
  name: "VitalsBud",
  tagline: "Historial, rutinas y cuidados preventivos para tus mascotas.",
  tagline_en: "Pet health records, routines, and preventive care.",
  shortDescription: "Organiza los cuidados y el historial de tu mascota; prepara un resumen PDF para la próxima visita veterinaria.",
  shortDescription_en: "Organize your pet’s care and health history, then prepare a PDF summary for the next veterinary visit.",
  longDescription: "VitalsBud reúne el cuidado diario de perros, gatos y otras mascotas: perfiles, vacunas, medicación, peso, síntomas, visitas y notas. Organiza rutinas y cuidados preventivos con calendario y recordatorios, y consulta el inventario de comida desde la app. Prepara un resumen PDF factual con la información que elijas y compártelo desde la hoja de compartir de iOS. El plan gratis incluye una mascota, historial, rutinas y exportación; VitalsBud Plus añade mascotas ilimitadas y analítica avanzada. Los registros se guardan en el dispositivo y funcionan sin conexión, pero la versión actual no los sincroniza entre dispositivos. VitalsBud no diagnostica ni sustituye el criterio veterinario.",
  longDescription_en: "VitalsBud brings everyday care for dogs, cats, and other pets together: profiles, vaccines, medication, weight, symptoms, visits, and notes. Organize routines and preventive care with a calendar and reminders, and manage food inventory in the app. Prepare a factual PDF summary with the information you choose and share it through the iOS share sheet. The free plan includes one pet, health history, routines, and export; VitalsBud Plus adds unlimited pets and advanced analytics. Records are stored on the device and work offline, but the current version does not sync them between devices. VitalsBud does not diagnose or replace veterinary judgment.",
  problem: "La información de una mascota vive repartida entre memoria, notas, fotos, PDFs, chats y calendarios, lo que dificulta cuidar y compartir contexto.",
  problem_en: "A pet's information is scattered across memory, notes, photos, PDFs, chats, and calendars, making care and context sharing difficult.",
  benefits: [
    "Cuidado preventivo: Mantén a mano vacunas, medicación, peso, rutinas y recordatorios.",
    "Historial listo para consulta: Conserva notas y registros, y prepara un resumen PDF factual para compartir.",
    "Cuidado diario organizado: Planifica rutinas y consulta el inventario de comida de tus mascotas."
  ],
  benefits_en: [
    "Preventive care: Keep vaccines, medication, weight, routines, and reminders at hand.",
    "History ready for appointments: Keep notes and records together, then prepare a factual PDF summary to share.",
    "Organized everyday care: Plan routines and manage your pets’ food inventory."
  ],
  features: [
    "Perfiles de mascotas: Centraliza la información y el historial de cada mascota.",
    "Historial de salud: Registra vacunas, medicación, peso, síntomas, visitas y notas.",
    "Cuidados preventivos: Organiza rutinas, calendario y recordatorios.",
    "Comida e inventario: Anota productos y cantidades para tener el stock a mano.",
    "Resumen PDF: Selecciona información de salud y compártela manualmente desde iOS.",
    "Límites actuales: Una mascota gratis; Plus añade mascotas ilimitadas y analítica avanzada."
  ],
  features_en: [
    "Pet profiles: Keep each pet’s information and history together.",
    "Health history: Log vaccines, medication, weight, symptoms, visits, and notes.",
    "Preventive care: Organize routines, calendar dates, and reminders.",
    "Food inventory: Record products and quantities to keep stock in view.",
    "PDF summary: Select health information and share it manually through iOS.",
    "Current plan limits: One free pet; Plus adds unlimited pets and advanced analytics."
  ],
  audience: "Personas y hogares que quieren cuidar mejor de sus mascotas y llegar a la consulta veterinaria con el contexto preparado.",
  audience_en: "People and households who want to care better for their pets and arrive at veterinary visits with context prepared.",
  status: "published",
  featured: true,
  category: "Salud y mascotas",
  category_en: "Pet Health",
  platform: ["iOS", "iPadOS"],
  supportEmail: "romerodev.app+vitalsbud@gmail.com",
  bundleIdentifier: "com.romerodev.vitalsbud",
  screenshots: ["Inicio", "Perfil", "Rutinas", "Salud"],
  iconUrl: "assets/images/vitalsbud/vitalsbud-appstore-icon.webp",
  coverImageUrl: "assets/images/vitalsbud/screens/01-home-dashboard.webp",
  appStoreUrl: "https://apps.apple.com/es/app/vitalsbud-mascotas/id6809153004",
  supportedLocales: ["es", "en"],
  primaryCtaLabel: "Descargar en el App Store",
  primaryCtaLabel_en: "Get it on the App Store",
  primaryCtaUrl: "https://apps.apple.com/es/app/vitalsbud-mascotas/id6809153004",
  secondaryCtaLabel: "Ver soporte",
  secondaryCtaLabel_en: "View support",
  secondaryCtaUrl: "/es/casos/vitalsbud/soporte/",
  colorPrimary: "#3478e5",
  colorSecondary: "#36b9c3",
  updatedAt: "2026-10-13",
  seo: {
    title: "VitalsBud: cuidado diario y salud preventiva para mascotas | RomeroDev",
    description: "Organiza vacunas, medicación, peso, rutinas e historial de salud de tu mascota. Consulta planes, guías y límites de VitalsBud.",
    description_en: "Organize your pet’s vaccines, medication, weight, routines, and health history. Read VitalsBud’s plans, guides, and current limits."
  },
  pricing: [
    { name: "Gratis", name_en: "Free", price: "Gratis", cadence: "", cadence_en: "", description: "Una mascota, historial de salud, rutinas, recordatorios y resumen PDF. Descarga gratis; Apple muestra cualquier compra integrada antes de confirmarla.", description_en: "One pet, health history, routines, reminders, and a PDF summary. Free to download; Apple shows any in-app purchase before confirmation." },
    { name: "VitalsBud Plus", name_en: "VitalsBud Plus", price: "Ver en App Store", price_en: "See App Store", cadence: "", cadence_en: "", description: "Añade mascotas ilimitadas y analítica avanzada de salud. Apple muestra el precio, la renovación y las condiciones vigentes en tu territorio antes de confirmar.", description_en: "Adds unlimited pets and advanced health analytics. Apple shows the current price, renewal, and terms for your territory before confirmation.", isIndicative: true, featured: true }
  ],
  freeFeatures: ["Una mascota", "Historial de salud y notas", "Rutinas y recordatorios", "Resumen PDF para compartir", "Uso local y sin conexión"],
  freeFeatures_en: ["One pet", "Health history and notes", "Routines and reminders", "Shareable PDF summary", "Local and offline use"],
  proFeatures: ["Mascotas ilimitadas", "Analítica avanzada de salud"],
  proFeatures_en: ["Unlimited pets", "Advanced health analytics"],
  faq: [
    {
      question: "Guía rápida: ¿Cómo añado mi primera mascota?",
      question_en: "Quick guide: How do I add my first pet?",
      answer: "Abre Mascotas y pulsa Añadir mascota. Completa la ficha con los datos que quieras conservar; puedes volver a editarla más adelante. El plan gratis permite un perfil de mascota.",
      answer_en: "Open Pets and choose Add Pet. Complete the profile with the details you want to keep; you can edit it later. The free plan allows one pet profile."
    },
    {
      question: "Guía rápida: ¿Cómo registro un cuidado o un cambio de salud?",
      question_en: "Quick guide: How do I record care or a health change?",
      answer: "En la ficha de la mascota, añade un registro de salud y completa el tipo, la fecha y las notas pertinentes, por ejemplo para una vacuna, medicación, peso, síntoma o visita. Revisa lo guardado: VitalsBud registra la información que introduces, pero no la valida clínicamente.",
      answer_en: "From the pet profile, add a health record and enter its type, date, and relevant notes, such as a vaccine, medication, weight, symptom, or visit. Review what you save: VitalsBud records the information you enter but does not clinically verify it."
    },
    {
      question: "Guía rápida: ¿Cómo preparo una rutina o un recordatorio?",
      question_en: "Quick guide: How do I set up a routine or reminder?",
      answer: "Crea o edita una rutina o un cuidado y activa su recordatorio con la fecha y hora que necesites. Permite las notificaciones de VitalsBud en Ajustes de iOS y comprueba allí también los modos de concentración y los permisos.",
      answer_en: "Create or edit a routine or care item, then enable its reminder with the date and time you need. Allow VitalsBud notifications in iOS Settings and check Focus modes and permissions there too."
    },
    {
      question: "Guía rápida: ¿Cómo comparto un resumen con la clínica veterinaria?",
      question_en: "Quick guide: How do I share a summary with a veterinary clinic?",
      answer: "Abre Resumen PDF para la mascota, elige las secciones que quieres incluir y usa la hoja de compartir de iOS para guardarlo o enviarlo. VitalsBud no lo envía automáticamente a una clínica.",
      answer_en: "Open the pet’s PDF Summary, choose the sections to include, and use the iOS share sheet to save or send it. VitalsBud does not send it to a clinic automatically."
    },
    {
      question: "Guía rápida: ¿Cómo organizo la comida y el inventario?",
      question_en: "Quick guide: How do I organize food and inventory?",
      answer: "Abre Inventario de comida, añade cada producto y ajusta sus cantidades cuando cambien. Es un registro manual: no compra ni repone productos automáticamente.",
      answer_en: "Open Food Inventory, add each product, and update its quantity when it changes. Inventory is manual; the app does not buy or restock products automatically."
    },
    {
      question: "¿Qué diferencia hay entre Resumen PDF y Exportar mis datos?",
      question_en: "What is the difference between PDF Summary and Export My Data?",
      answer: "Resumen PDF permite elegir secciones del historial de salud para compartir. Exportar mis datos, en Ajustes > Gestión de datos, genera actualmente una ficha básica con nombre, especie, raza y peso; no es una copia completa del historial ni una copia de seguridad restaurable.",
      answer_en: "PDF Summary lets you choose health-history sections to share. Export My Data under Settings > Data Management currently creates a basic profile export with name, species, breed, and weight; it is not a full history export or a restorable backup."
    },
    {
      question: "¿Qué incluye Gratis y qué añade VitalsBud Plus?",
      question_en: "What is included in Free and what does VitalsBud Plus add?",
      answer: "Gratis incluye una mascota, el historial de salud, rutinas, recordatorios y el resumen PDF básico. Plus añade mascotas ilimitadas y analítica avanzada de salud. El precio y las condiciones de tu territorio aparecen en el App Store antes de comprar.",
      answer_en: "Free includes one pet, health history, routines, reminders, and the basic PDF summary. Plus adds unlimited pets and advanced health analytics. Your territory’s price and terms appear in the App Store before purchase."
    },
    {
      question: "¿Mis datos se sincronizan o aparecen en otro dispositivo?",
      question_en: "Do my records sync or appear on another device?",
      answer: "No. Los registros se guardan en el dispositivo y se pueden usar sin conexión; la versión actual no ofrece sincronización de VitalsBud ni restauración remota entre dispositivos. El PDF sirve para compartir información, no para restaurarla dentro de la app.",
      answer_en: "No. Records are stored on the device and can be used offline; the current version does not offer VitalsBud sync or remote restoration across devices. A PDF is for sharing information, not restoring it into the app."
    },
    {
      question: "¿Puedo invitar a otra persona para compartir el hogar?",
      question_en: "Can I invite someone to share a household?",
      answer: "La versión actual puede guardar localmente datos de un miembro del hogar, pero no envía invitaciones ni sincroniza los perfiles entre dispositivos. Cada dispositivo conserva sus propios datos.",
      answer_en: "The current version can store a household member’s details locally, but it does not send invitations or sync profiles between devices. Each device keeps its own data."
    },
    {
      question: "¿Los recordatorios están garantizados?",
      question_en: "Are reminders guaranteed?",
      answer: "No. Dependen de que iOS permita las notificaciones y de los ajustes del dispositivo, como concentración, sonido y programación. Comprueba los permisos y las notificaciones de VitalsBud en Ajustes; no son alertas de emergencia.",
      answer_en: "No. They depend on iOS notification permission and device settings such as Focus, sound, and scheduling. Check VitalsBud’s notification settings in iOS Settings; reminders are not emergency alerts."
    },
    {
      question: "¿VitalsBud diagnostica o recomienda tratamientos?",
      question_en: "Does VitalsBud diagnose or recommend treatment?",
      answer: "No. VitalsBud es una herramienta de organización y registro. No diagnostica, no indica dosis ni tratamientos y no sustituye la consulta con una persona veterinaria.",
      answer_en: "No. VitalsBud is an organization and record-keeping tool. It does not diagnose, prescribe doses or treatment, or replace advice from a veterinary professional."
    },
    {
      question: "¿El PDF sirve como certificado oficial o pasaporte de viaje?",
      question_en: "Can I use the PDF as an official certificate or travel passport?",
      answer: "No. El PDF es un resumen organizativo basado en los datos que introduces, no un certificado veterinario, pasaporte oficial ni autorización de viaje. Confirma vacunas, requisitos fronterizos y condiciones de aerolíneas con tu clínica y las autoridades.",
      answer_en: "No. The PDF is an organizational summary based on the information you enter, not a veterinary certificate, official passport, or travel authorization. Confirm vaccines, border requirements, and airline rules with your clinic and the relevant authorities."
    },
    {
      question: "¿Qué integraciones y dispositivos admite la versión actual?",
      question_en: "Which integrations and devices does the current version support?",
      answer: "La app está disponible para iPhone y iPad; consulta el requisito mínimo de iOS/iPadOS en la ficha del App Store. La versión actual no incluye app para Apple Watch ni sincronización con iCloud, Apple Health, dispositivos clínicos o sistemas de clínicas.",
      answer_en: "The app is available for iPhone and iPad; check the current iOS/iPadOS minimum in the App Store listing. The current version has no Apple Watch app or sync with iCloud, Apple Health, clinical devices, or clinic systems."
    },
    {
      question: "¿Cómo gestiono o cancelo VitalsBud Plus?",
      question_en: "How do I manage or cancel VitalsBud Plus?",
      answer: "Apple gestiona las compras y renovaciones. Ve a Ajustes > tu nombre > Suscripciones para consultar o cancelar; eliminar la app no cancela la suscripción. Apple muestra el precio y las condiciones antes de confirmar la compra.",
      answer_en: "Apple manages purchases and renewals. Go to Settings > your name > Subscriptions to review or cancel; deleting the app does not cancel a subscription. Apple shows the price and terms before purchase."
    },
    {
      question: "¿Cómo elimino los datos guardados?",
      question_en: "How do I delete saved data?",
      answer: "Usa la opción de eliminación en Ajustes > Gestión de datos. Borra permanentemente los datos locales de VitalsBud en este dispositivo; no elimina datos de una cuenta remota porque la versión actual no tiene sincronización ni cuenta en la nube. Exporta antes lo que quieras conservar.",
      answer_en: "Use the deletion option under Settings > Data Management. It permanently removes VitalsBud’s local data from this device; it does not delete a remote account because the current version has no cloud account or sync. Export anything you want to keep first."
    }
  ],
  legal: {
    privacy: basicPrivacy("VitalsBud", "organización del cuidado de mascotas", "romerodev.app+vitalsbud@gmail.com"),
    terms: basicTerms("VitalsBud", "organización del cuidado de mascotas", "romerodev.app+vitalsbud@gmail.com"),
    subscriptions: subscriptionTerms("VitalsBud", "romerodev.app+vitalsbud@gmail.com")
  },
  followEnabled: true,
};