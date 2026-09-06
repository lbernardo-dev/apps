import type {
  AppItem,
  AppChangelogEntry,
  FaqItem,
  HomeSection,
  LandingAnnouncement,
  LandingSurvey,
  LandingSurveyOption,
  Testimonial,
} from "@/lib/types";
import { createClient } from "@supabase/supabase-js";
import type { AppStoreReview } from "./appstore";
import appStoreSnapshot from "@/lib/generated/appstore-data.json";
import { changelogFromRows, changelogFromSnapshot } from "@/lib/changelog";
import { reviewsForLocale } from "@/lib/reviews";
import { enrichKnownProduct } from "@/lib/product-enrichment";
import { kinseraApp } from "./kinsera-content";
import { snapInboxApp } from "./snapinbox-content";
import { schoolSnapApp } from "./schoolsnap-content";
import { culminaApp, vitalsBudApp } from "./foundation-apps";

type SnapshotEntry = {
  appId: string;
  trackName: string;
  trackViewUrl: string;
  version: string;
  buildNumber?: string | null;
  releaseNotes?: string | null;
  currentVersionReleaseDate: string;
  minimumOsVersion: string;
  formattedPrice: string;
  developer: string;
  languages: string[];
  fileSizeBytes: string;
  averageUserRating: number;
  userRatingCount: number;
  syncedAt?: string;
  reviews?: Array<{
    id?: string;
    author: string;
    rating: number;
    title: string;
    content: string;
    date: string;
    market?: string;
    locale?: string;
    source?: string;
    sourceUrl?: string;
    externalId?: string;
  }>;
  changelog?: AppChangelogEntry[];
};

function applyAppStoreSnapshot(app: AppItem): AppItem {
  const snapshot = appStoreSnapshot[app.slug as keyof typeof appStoreSnapshot] as SnapshotEntry | undefined;
  if (!snapshot) return app;
  return {
    ...app,
    appStoreUrl: snapshot.trackViewUrl,
    primaryCtaUrl: snapshot.trackViewUrl,
    averageRating: snapshot.averageUserRating,
    userRatingCount: snapshot.userRatingCount,
    appStoreReviews: snapshot.reviews ?? [],
    changelog: app.changelog?.length ? app.changelog : changelogFromSnapshot(appStoreSnapshot, app.slug),
    appStore: {
      trackName: snapshot.trackName,
      version: snapshot.version,
      buildNumber: snapshot.buildNumber ?? undefined,
      releaseNotes: snapshot.releaseNotes ?? undefined,
      currentVersionReleaseDate: snapshot.currentVersionReleaseDate,
      minimumOsVersion: snapshot.minimumOsVersion,
      formattedPrice: snapshot.formattedPrice,
      developer: snapshot.developer,
      languages: snapshot.languages,
      fileSizeBytes: snapshot.fileSizeBytes,
      sourceUrl: snapshot.trackViewUrl,
      syncedAt: snapshot.syncedAt ?? new Date().toISOString()
    }
  };
}

export const apps: AppItem[] = [
  culminaApp,
  vitalsBudApp,
  kinseraApp,
  snapInboxApp,
  schoolSnapApp,
  {
    id: "vitalspath",
    slug: "vitalspath",
    name: "VitalsPath",
    tagline: "Salud familiar, medicación y citas en un único espacio privado.",
    tagline_en: "Family health, medications, and appointments in a single private space.",
    shortDescription:
      "Organiza medicación, síntomas, constantes, citas y cuidados compartidos con perfiles familiares, Apple Watch e informes para el médico.",
    shortDescription_en:
      "Organize medications, symptoms, vitals, appointments, and shared care with family profiles, Apple Watch, and medical reports.",
    longDescription:
      "VitalsPath te ayuda a planificar dosis, registrar síntomas y constantes, preparar citas y tener el contexto diario a mano con widgets, Live Activities y Apple Watch.",
    longDescription_en:
      "VitalsPath helps you plan doses, log symptoms and vitals, manage appointments, and keep daily context at hand with widgets, Live Activities, and Apple Watch.",
    problem:
      "Gestionar la salud familiar es más difícil de lo que debería. Múltiples apps, recordatorios fallidos, información dispersa.",
    problem_en:
      "Managing family health is harder than it should be. Multiple apps, missed reminders, and scattered medical history.",
    benefits: [
      "Control de Tratamientos: Organiza medicamentos asociados a condiciones médicas.",
      "Citas Médicas: Gestiona visitas, especialistas y clínicas favoritas.",
      "Enfermedades y Condiciones: Seguimiento detallado del historial de patologías.",
      "Perfiles Familiares: Gestiona a toda tu familia desde un lugar central.",
      "Medicamentos y Dosis: Control exhaustivo de tomas, alertas y stock.",
      "Más de 100 Síntomas: Seguimiento de severidad y fases de recuperación."
    ],
    benefits_en: [
      "Treatment Control: Organize medicines associated with specific medical conditions.",
      "Medical Appointments: Manage visits, specialists, and favorite clinics.",
      "Diseases & Conditions: Detailed tracking of health histories and pathologies.",
      "Family Profiles: Manage your entire family's needs from one central hub.",
      "Medications & Doses: Exhaustive control of intakes, alerts, and stocks.",
      "Over 100 Symptoms: Track severity levels and recovery phases over time."
    ],
    features: [
      "Recordatorios de Pastillas: Alertas inteligentes y seguimiento de stock.",
      "Diario de Síntomas: Registra cómo te sientes. Sigue síntomas, ánimo y constantes.",
      "Calendario Médico: Organiza tus citas, visitas a especialistas y farmacias.",
      "Alertas de Reposición: Avisos inteligentes cuando se te acaben las recetas o pastillas.",
      "OCR Médico NATIVO: Escanea tus cajas de medicación y recetas.",
      "Actividades en Vivo & Dynamic Island: Sigue tus dosis activas desde la pantalla de bloqueo.",
      "Ecosistema Apple: Compatible con Apple Watch, widgets de inicio y bloqueo, y sincronización en iCloud con cifrado de extremo a extremo."
    ],
    features_en: [
      "Pill Reminders: Smart alerts and active stock tracking.",
      "Symptom Diary: Log how you feel. Track symptoms, mood, and vital signs.",
      "Doctor Calendar: Organize appointments, specialist visits, and pharmacies.",
      "Refill Alerts: Intelligent warnings before you run out of prescriptions or pills.",
      "Native Medical OCR: Scan medication boxes and prescriptions using the camera.",
      "Live Activities & Dynamic Island: Monitor active doses right from your lock screen.",
      "Apple Ecosystem: Integrated watchOS app, home widgets, and iCloud sync with end-to-end encryption."
    ],
    audience: "Familias, pacientes crónicos y personas que gestionan múltiples tratamientos de salud.",
    audience_en: "Families, chronic patients, and individuals managing multiple complex health treatments.",
    status: "published",
    featured: true,
    category: "Medicina",
    category_en: "Medical",
    platform: ["iOS", "iPadOS", "watchOS"],
    supportEmail: "romerodev.apps+vitalspath@gmail.com",
    iconUrl: "assets/images/vitalspath/AppIcon_v3-512.png",
    videoUrl: "assets/videos/vitalspath-preview.mp4",
    screenshots: [
      "Día actual",
      "Medicación",
      "Tratamiento",
      "Perfiles",
      "Condiciones",
      "Bienestar",
      "Citas",
      "Privacidad",
      "Insights",
      "Widgets"
    ],
    appStoreUrl: "https://apps.apple.com/es/app/vitalspath-control-medicaci%C3%B3n/id6760143192",
    primaryCtaLabel: "Consíguelo en el App Store",
    primaryCtaUrl: "https://apps.apple.com/es/app/vitalspath-control-medicaci%C3%B3n/id6760143192",
    secondaryCtaLabel: "Soporte de la App",
    secondaryCtaUrl: "/apps/vitalspath/support",
    updatedAt: "2026-08-21",
    seo: {
      title: "VitalsPath: salud familiar, medicación y citas",
      description:
        "Organiza pastillas, recetas, constantes vitales, síntomas y citas médicas para toda tu familia de forma privada con VitalsPath."
    },
    faq: [
      {
        question: "¿VitalsPath sustituye a los médicos?",
        answer:
          "No. VitalsPath es una herramienta organizativa de salud. No proporciona diagnóstico, tratamiento médico ni sustituye la consulta con un especialista de la salud."
      },
      {
        question: "¿La sincronización en iCloud es segura?",
        answer:
          "Sí. Todos tus perfiles familiares y registros se sincronizan usando iCloud con cifrado de extremo a extremo gestionado por Apple, lo que garantiza privacidad absoluta."
      },
      {
        question: "¿Puedo usar la aplicación solo para recordatorio de pastillas?",
        answer:
          "Sí. La aplicación es completamente modular y flexible. Puedes usarla únicamente para tus pastillas, o aprovechar todos los módulos de síntomas y citas si lo prefieres."
      },
      {
        question: "¿Cómo funciona el OCR Médico Nativo?",
        answer:
          "Permite escanear las cajas de tus medicamentos directamente con la cámara de tu iPhone. VitalsPath analizará el texto para rellenar automáticamente el nombre y la dosis, evitando errores de transcripción."
      }
    ],
    legal: {
      privacy: {
        title: "Política de Privacidad de VitalsPath",
        updatedAt: "2026-02-18",
        body: [
          "Lester Romero Bernardo, con domicilio en Valencia, España, en calidad de responsable del tratamiento, te informa sobre cómo recopilamos, utilizamos, compartimos y protegemos tus datos personales al usar la aplicación móvil VitalsPath.",
          "Todos los datos sensibles de salud se almacenan de forma local en tu dispositivo mediante SwiftData (base de datos cifrada localmente). No enviamos tus datos a servidores externos remotos.",
          "Con tu consentimiento explícito, la app puede solicitar permisos para notificaciones, lectura de datos de salud de Apple HealthKit, y copias de seguridad de iCloud cifradas de extremo a extremo.",
          "Para cualquier consulta relacionada con la privacidad o el ejercicio de tus derechos RGPD (Acceso, Rectificación, Supresión, Portabilidad), puedes contactar en romerodev.apps+vitalspath@gmail.com."
        ]
      },
      terms: {
        title: "Términos y Condiciones de VitalsPath",
        updatedAt: "2026-02-18",
        body: [
          "Estos Términos y Condiciones regulan el acceso y uso de la aplicación móvil VitalsPath – Health & Medication Tracker, destinada a la gestión y seguimiento de medicación, síntomas, citas médicas y constantes vitales.",
          "La Aplicación no proporciona diagnóstico médico, tratamiento, prescripción, ni sustituye la consulta con profesionales sanitarios. En caso de emergencia médica, el usuario debe contactar inmediatamente con los servicios de emergencia de su país.",
          "VitalsPath utiliza un modelo freemium, combinando funciones gratuitas limitadas y funciones Premium (perfiles idénticos, analíticas, iCloud Backup) mediante suscripciones o compra única gestionadas por Apple App Store.",
          "Todos los derechos de propiedad intelectual sobre la aplicación y su código fuente son titularidad exclusiva de Lester Romero Bernardo."
        ]
      }
    }
  },
  {
    id: "fc8651fd-6baf-4c38-8e12-c8b3b045148c",
    slug: "reps",
    name: "StreakReps",
    tagline: "Registro de entrenamientos y análisis de sobrecarga progresiva",
    tagline_en: "Workout tracking for consistent strength progress",
    shortDescription:
      "StreakReps ayuda a usuarios de iPhone a crear rutinas, registrar series rápido, proteger rachas y entender su fuerza.",
    shortDescription_en:
      "StreakReps helps iPhone users build plans, log workouts, track streaks, and understand strength progress.",
    longDescription:
      "Una bitácora de gimnasio inteligente diseñada específicamente para iOS. StreakReps mantiene el plan del día, el temporizador de descanso, las notas y el historial de series en una sola pantalla enfocada para no interrumpir tu entrenamiento. Traduce tu historial en señales de recuperación y fuerza, marcas personales (PR), estimaciones de 1RM, y volumen.",
    longDescription_en:
      "A smart gym logbook designed specifically for iOS. StreakReps keeps the daily plan, active rest timer, notes, and set history in one focused flow, so logging never interrupts training. Translate your history into recovery signals, PRs, 1RM estimations, and volume.",
    problem:
      "Registrar entrenamientos en papel o en hojas de cálculo complejas interrumpe el ritmo del gimnasio y dificulta visualizar tu sobrecarga progresiva.",
    problem_en:
      "Logging workouts on paper or complex spreadsheets interrupts your gym flow and makes it hard to visualize your progressive overload.",
    benefits: [
      "Flujo sin fricciones: Temporizador de descanso, notas e historial en una sola pantalla.",
      "Sugerencias inteligentes: Progresiones automáticas basadas en tu historial reciente.",
      "Resúmenes y rachas: Racha de constancia e informes visuales al terminar."
    ],
    benefits_en: [
      "Frictionless flow: Rest timers, notes, and set history on a single screen.",
      "Smart suggestions: Automatic progressions suggested from recent history.",
      "Summaries and streaks: Consistency streaks and visual summaries after each session."
    ],
    features: [
      "Creador de Rutinas: Diseña planes semanales, ajusta rangos de repeticiones y descansos.",
      "Calendario Histórico: Vista mensual de sesiones completadas, omitidas o perdidas.",
      "Señales de Recuperación: Seguimiento de marcas personales (PR), volumen e integración con Apple Health."
    ],
    features_en: [
      "Plan Builder: Design weekly routines, tune rest, and adjust rep ranges.",
      "Historical Calendar: Monthly view of completed, skipped, and missed sessions.",
      "Recovery Signals: Track personal records (PR), volume, and Apple Health integration."
    ],
    audience: "Entusiastas del gimnasio, atletas de fuerza y personas que quieren llevar un control de su sobrecarga progresiva.",
    audience_en: "Gym enthusiasts, strength athletes, and people wanting to track their progressive overload.",
    status: "published",
    featured: true,
    category: "Salud y forma física",
    category_en: "Health & Fitness",
    platform: ["iOS", "watchOS"],
    supportEmail: "romerodev.app+streakreps@gmail.com",
    iconUrl: "assets/images/reps/icons/reps-icon-v2.png",
    videoUrl: "assets/videos/streakreps-preview.mp4",
    screenshots: [
      "01-train-smarter",
      "02-follow-real-plan",
      "03-control-load",
      "04-see-weekly-progress",
      "05-connect-health",
      "06-map-every-muscle",
      "07-find-core-exercises",
      "08-start-structured",
      "09-track-your-body",
      "10-stay-consistent"
    ],
    appStoreUrl: "https://apps.apple.com/es/app/streakreps-rutinas-y-progreso/id6775801149",
    primaryCtaLabel: "Consíguelo en el App Store",
    primaryCtaLabel_en: "Get it on the App Store",
    primaryCtaUrl: "https://apps.apple.com/es/app/streakreps-rutinas-y-progreso/id6775801149",
    secondaryCtaLabel: "Características",
    secondaryCtaLabel_en: "Features",
    secondaryCtaUrl: "/apps/reps#features",
    colorPrimary: "#2459e0",
    colorSecondary: "#ff632e",
    updatedAt: "2026-08-20",
    seo: {
      title: "StreakReps - Entrenamiento de fuerza, progreso y recuperación | RomeroDev",
      description: "StreakReps para iPhone y Apple Watch: planes, registro de series, fuerza, recuperación, rutas GPS y Apple Health."
    },
    faq: [],
    legal: {
      privacy: {
        title: "Política de privacidad de StreakReps",
        title_en: "Privacy Policy of StreakReps",
        updatedAt: "2026-07-11",
        body: []
      },
      terms: {
        title: "Términos de uso de StreakReps",
        title_en: "Terms of Use of StreakReps",
        updatedAt: "2026-07-11",
        body: []
      }
    }
  },
  {
    id: "shield",
    slug: "shield",
    name: "MaskID",
    tagline: "Protege tu identidad antes de compartir un documento.",
    tagline_en: "Protect your identity before sharing a document.",
    shortDescription:
      "Oculta datos personales innecesarios en documentos generales o de identidad y comparte solo la información que cada trámite necesita.",
    shortDescription_en:
      "Hide unnecessary personal data in general or identity documents and share only what each process requires.",
    longDescription:
      "MaskID protege tu identidad cuando una inmobiliaria, agencia de viajes, profesional o entidad te pide documentación. Prepara contratos, nóminas, extractos, reservas o documentos de identidad para alquileres, viajes y procesos legales; oculta lo que el destinatario no necesita y exporta una copia verificada sin modificar el original.",
    longDescription_en:
      "MaskID protects your identity when a landlord, travel provider, professional, or organization asks for documentation. Prepare contracts, payslips, statements, bookings, or identity documents for rentals, travel, and legal processes; hide what the recipient does not need and export a verified copy without changing the original.",
    problem:
      "Compartir un documento completo puede revelar más información de la necesaria: domicilio, número de identificación, firma, datos bancarios o códigos personales. Una captura improvisada o un rectángulo dentro de un PDF tampoco garantiza que esos datos dejen de ser recuperables.",
    problem_en:
      "Sharing a complete document can expose more information than necessary: your address, identification number, signature, bank details, or personal codes. A quick screenshot or a rectangle placed over a PDF does not guarantee that the hidden data cannot be recovered.",
    benefits: [
      "Protege tu identidad: Comparte documentos de identificación sin entregar todos tus datos personales.",
      "Comparte solo lo necesario: Adapta cada copia al alquiler, viaje, trámite legal o destinatario concreto.",
      "Salida comprobada: La exportación rasteriza el resultado y busca texto residual recuperable.",
      "Privacidad desde el origen: Los documentos, el OCR, las máscaras y la exportación se procesan en el dispositivo."
    ],
    benefits_en: [
      "Protect your identity: Share identification documents without disclosing all your personal data.",
      "Share only what is needed: Tailor each copy to a rental, trip, legal process, or specific recipient.",
      "Checked output: Export flattens the result and checks for recoverable residual text.",
      "Private by design: Documents, OCR, masks, and exports are processed on device."
    ],
    features: [
      "Captura e importación: Cámara, escáner, Fotos, Archivos, PDF y extensión Compartir.",
      "OCR conservador: Sugerencias para identidad, email, teléfono, IBAN y tarjetas, siempre sujetas a revisión.",
      "Editor de precisión: Máscaras editables, documentos multipágina, estilos y ajustes de imagen.",
      "Flujos repetibles: Plantillas semánticas y procesamiento por lotes en MaskID Pro.",
      "Exportación segura: Copias PDF o imagen rasterizadas con verificación posterior.",
      "Privacidad local: Cifrado en reposo, Vault, archivos temporales protegidos y sin seguimiento publicitario.",
      "Accesibilidad nativa: iPhone, iPad, teclado, VoiceOver y Dynamic Type."
    ],
    features_en: [
      "Capture and import: Camera, scanner, Photos, Files, PDF, and the Share Extension.",
      "Conservative OCR: Suggestions for identity, email, phone, IBAN, and card data, always subject to review.",
      "Precision editor: Editable masks, multi-page documents, styles, and image adjustments.",
      "Repeatable workflows: Semantic templates and batch processing in MaskID Pro.",
      "Secure export: Rasterized PDF or image copies with post-export verification.",
      "Local privacy: Encryption at rest, Vault, protected temporary files, and no advertising tracking.",
      "Native accessibility: iPhone, iPad, keyboard, VoiceOver, and Dynamic Type."
    ],
    audience:
      "Personas que deben compartir documentos generales o de identificación con inmobiliarias, alojamientos, agencias, profesionales, empresas o entidades durante alquileres, viajes, procesos legales y otros trámites puntuales.",
    audience_en:
      "People who need to share general or identity documents with landlords, accommodation providers, agencies, professionals, companies, or organizations during rentals, travel, legal processes, and other occasional procedures.",
    status: "published",
    featured: true,
    category: "Productividad",
    category_en: "Productivity",
    platform: ["iOS", "iPadOS"],
    supportEmail: "romerodev.app+shield@gmail.com",
    iconUrl: "assets/images/shield/shield-icon-v2.png",
    coverImageUrl: "assets/images/shield/screens/simulator/01-home_es.jpg",
    videoUrl: "assets/videos/maskid-preview.mp4",
    screenshots: [
      "01-home",
      "02-capture",
      "03-editor",
      "04-ocr",
      "05-export",
      "06-gallery",
      "07-vault",
      "08-batch",
      "09-paywall",
      "10-settings"
    ],
    appStoreUrl: "https://apps.apple.com/es/app/maskid-protege-tu-identidad/id6790398619",
    primaryCtaLabel: "Consíguelo en el App Store",
    primaryCtaLabel_en: "Get it on the App Store",
    primaryCtaUrl: "https://apps.apple.com/es/app/maskid-protege-tu-identidad/id6790398619",
    secondaryCtaLabel: "Ver funciones",
    secondaryCtaLabel_en: "View features",
    secondaryCtaUrl: "/apps/shield#features",
    colorPrimary: "#e6b900",
    colorSecondary: "#22c55e",
    updatedAt: "2026-08-21",
    seo: {
      title: "MaskID - Protege tu identidad al compartir documentos | RomeroDev",
      description:
        "Oculta datos personales en documentos de identidad, alquileres, viajes y trámites legales. Comparte únicamente lo necesario con MaskID."
    },
    faq: [],
    legal: {
      privacy: {
        title: "Política de privacidad de MaskID",
        title_en: "MaskID Privacy Policy",
        updatedAt: "2026-07-20",
        body: []
      },
      terms: {
        title: "Términos de uso de MaskID",
        title_en: "MaskID Terms of Use",
        updatedAt: "2026-07-13",
        body: []
      }
    }
  },
  {
    id: "upledger",
    slug: "upledger",
    name: "UpLedger",
    tagline: "Tus finanzas claras, privadas y bajo control.",
    tagline_en: "Clear, private finances under your control.",
    shortDescription: "Registra movimientos, organiza cuentas y presupuestos, revisa tu patrimonio y toma decisiones con previsiones privadas.",
    shortDescription_en: "Track transactions, organize accounts and budgets, review your net worth, and plan ahead with private forecasts.",
    longDescription: "UpLedger convierte las finanzas personales en un sistema claro: cuentas, movimientos, presupuestos, patrimonio y previsiones en una experiencia diseñada para iPhone y iPad.",
    longDescription_en: "UpLedger turns personal finances into a clear system: accounts, transactions, budgets, net worth, and forecasts in an experience designed for iPhone and iPad.",
    problem: "Las hojas de cálculo y las apps que monetizan los datos convierten una tarea cotidiana en algo disperso, lento y poco confiable.",
    problem_en: "Spreadsheets and data-hungry apps turn an everyday task into a fragmented, slow, and untrustworthy experience.",
    benefits: [
      "Claridad diaria: entiende ingresos, gastos, cuentas y presupuestos desde una vista útil.",
      "Decisiones con contexto: revisa patrimonio y previsiones antes de comprometerte.",
      "Privacidad por diseño: tus registros se guardan en el dispositivo y en tu iCloud privado si activas sincronización."
    ],
    benefits_en: [
      "Daily clarity: understand income, expenses, accounts, and budgets from one useful view.",
      "Decisions with context: review net worth and forecasts before you commit.",
      "Privacy by design: records stay on-device and in your private iCloud when sync is enabled."
    ],
    features: [
      "Movimientos y borradores: registra, revisa y confirma gastos e ingresos con control.",
      "Cuentas y presupuestos: organiza tu dinero por categorías y detecta desviaciones.",
      "Patrimonio y previsiones: entiende evolución, compromisos recurrentes y escenarios futuros.",
      "Automatización opcional: reglas, dictado y asistencia inteligente con controles explícitos.",
      "Ecosistema Apple: iPhone, iPad, widgets, atajos y sincronización privada opcional."
    ],
    features_en: [
      "Transactions and drafts: record, review, and confirm expenses and income with control.",
      "Accounts and budgets: organize money by category and spot deviations.",
      "Net worth and forecasts: understand trends, recurring commitments, and future scenarios.",
      "Optional automation: rules, dictation, and intelligent assistance with explicit controls.",
      "Apple ecosystem: iPhone, iPad, widgets, shortcuts, and optional private sync."
    ],
    audience: "Personas que quieren gestionar sus finanzas personales sin publicidad, sin vender sus datos y sin perder tiempo en hojas de cálculo.",
    audience_en: "People who want to manage personal finances without ads, selling their data, or losing time in spreadsheets.",
    status: "development",
    featured: true,
    category: "Finanzas",
    category_en: "Finance",
    platform: ["iOS", "iPadOS"],
    supportEmail: "romerodev.app@gmail.com",
    iconUrl: "assets/images/upledger/upledger-icon.png",
    screenshots: ["Resumen", "Facturas", "Capturar", "Plan", "Libro", "Tendencias", "Hogar", "Cuentas", "Detalle", "Ajustes"],
    primaryCtaLabel: "Próximamente en App Store",
    primaryCtaLabel_en: "Coming soon on the App Store",
    primaryCtaUrl: "/es/casos/upledger/soporte/",
    secondaryCtaLabel: "Centro de soporte",
    secondaryCtaLabel_en: "Support center",
    secondaryCtaUrl: "/es/casos/upledger/soporte/",
    colorPrimary: "#2563eb",
    colorSecondary: "#14b8a6",
    updatedAt: "2026-08-02",
    promotionalText: "Entiende adónde va tu dinero y qué viene después. Controla gastos, planifica presupuestos, organiza facturas y metas y lleva las finanzas del hogar en una sola agenda.",
    promotionalText_en: "Know where your money goes and what comes next. Track spending, plan budgets, manage bills and goals, and keep household finances organized in one clear agenda.",
    seo: {
      title: "UpLedger: finanzas personales privadas y claras | RomeroDev",
      description: "Gestiona cuentas, gastos, presupuestos, patrimonio y previsiones desde iPhone o iPad con UpLedger.",
      keywords: "ingresos,dinero,hogar,control,cuenta,tarjeta,movimiento,recibo,meta,calendario,registro,diario,saldo",
      keywords_en: "spending,tracker,income,savings,household,receipt,transaction,account,calendar,plan,organizer,record"
    },
    pricing: [
      { name: "Mensual", name_en: "Monthly", price: "4,99 €", cadence: "/mes", cadence_en: "/month", description: "7 días de prueba para cuentas elegibles; renovación mensual.", description_en: "7-day trial for eligible accounts; monthly renewal.", badge: "Prueba de 7 días", badge_en: "7-day trial", isIndicative: true },
      { name: "Anual", name_en: "Annual", price: "34,99 €", cadence: "/año", cadence_en: "/year", description: "7 días de prueba para cuentas elegibles; el mejor valor anual.", description_en: "7-day trial for eligible accounts; best annual value.", badge: "Mejor valor", badge_en: "Best value", featured: true, isIndicative: true }
    ],
    freeFeatures: ["Cuentas y movimientos", "Categorías y presupuestos", "Patrimonio básico", "Datos locales y exportación"],
    freeFeatures_en: ["Accounts and transactions", "Categories and budgets", "Basic net worth", "Local data and export"],
    proFeatures: ["Previsiones y escenarios", "Reglas y automatizaciones", "Análisis avanzado", "Funciones Pro futuras incluidas"],
    proFeatures_en: ["Forecasts and scenarios", "Rules and automations", "Advanced analysis", "Included future Pro features"],
    faq: [
      { question: "¿UpLedger conecta con mi banco?", question_en: "Does UpLedger connect to my bank?", answer: "La primera versión se centra en el registro y control directo de tus finanzas. No solicita credenciales bancarias ni vende datos financieros.", answer_en: "The first version focuses on direct financial tracking and control. It does not request bank credentials or sell financial data." },
      { question: "¿Dónde se guardan mis datos?", question_en: "Where is my data stored?", answer: "Los datos se guardan localmente en tu dispositivo. Si activas la sincronización, se utiliza tu contenedor privado de iCloud.", answer_en: "Data is stored locally on your device. If you enable sync, it uses your private iCloud container." },
      { question: "¿Cómo funciona UpLedger Pro?", question_en: "How does UpLedger Pro work?", answer: "Pro ofrece suscripción mensual o anual. Apple muestra el precio final, impuestos, prueba disponible y condiciones antes de confirmar.", answer_en: "Pro offers monthly or annual subscriptions. Apple displays the final price, taxes, available trial, and terms before confirmation." },
      { question: "¿Puedo cancelar cuando quiera?", question_en: "Can I cancel anytime?", answer: "Sí. Gestiona o cancela la suscripción desde Ajustes > tu nombre > Suscripciones. Eliminar la app no cancela la suscripción.", answer_en: "Yes. Manage or cancel from Settings > your name > Subscriptions. Deleting the app does not cancel a subscription." }
    ],
    legal: {
      privacy: {
        title: "Política de privacidad de UpLedger",
        title_en: "UpLedger Privacy Policy",
        updatedAt: "2026-08-02",
        body: [
          "## 1. Responsable", "Responsable: Lester Romero Bernardo (RomeroDev), Calle Madre Juana María Condesa Lluch 6, Valencia, España. Contacto de privacidad: romerodev.app@gmail.com.",
          "## 2. Datos y finalidad", "UpLedger almacena cuentas, movimientos, categorías, presupuestos, previsiones, preferencias y borradores para prestar las funciones de gestión financiera. No utiliza los datos financieros para publicidad ni los vende.",
          "## 3. Almacenamiento y sincronización", "Los datos se almacenan localmente mediante SwiftData. Si activas la sincronización, se usa el contenedor privado de iCloud asociado a tu Apple ID. Puedes eliminar datos desde la app o desinstalándola.",
          "## 4. Proveedores opcionales", "Apple procesa las compras con StoreKit. RevenueCat gestiona técnicamente el estado de la suscripción y no recibe movimientos ni saldos. Si activas Diagnósticos y uso, Firebase Analytics y Crashlytics reciben eventos técnicos y fallos agregados, nunca movimientos, importes, comercios, texto capturado, correo ni saldos.",
          "## 5. IA y servicios externos", "La asistencia inteligente local no transmite tus registros. Si configuras un proveedor de IA propio, UpLedger pide consentimiento antes de enviar el texto necesario a ese proveedor. Los tipos de cambio e inflación pueden consultar servicios públicos para la divisa o país solicitado, sin enviar tu historial financiero.",
          "## 6. Permisos", "Micrófono y reconocimiento de voz se solicitan para dictado; biometría para el bloqueo local; notificaciones para alertas; y los permisos solo se usan al activar la función correspondiente.",
          "## 7. Derechos y contacto", "Puedes solicitar acceso, rectificación, supresión, limitación, oposición, portabilidad o retirada del consentimiento escribiendo a romerodev.app@gmail.com. También puedes reclamar ante la autoridad competente."
        ],
        body_en: [
          "## 1. Controller", "Controller: Lester Romero Bernardo (RomeroDev), Calle Madre Juana María Condesa Lluch 6, Valencia, Spain. Privacy contact: romerodev.app@gmail.com.",
          "## 2. Data and purpose", "UpLedger stores accounts, transactions, categories, budgets, forecasts, preferences, and drafts to provide personal-finance features. It does not use financial data for advertising or sell it.",
          "## 3. Storage and sync", "Data is stored locally through SwiftData. If you enable sync, UpLedger uses the private iCloud container associated with your Apple ID. You can delete data in the app or by uninstalling it.",
          "## 4. Optional providers", "Apple processes purchases through StoreKit. RevenueCat technically manages subscription status and does not receive transactions or balances. If you enable Diagnostics and usage, Firebase Analytics and Crashlytics receive aggregated technical events and crashes, never transactions, amounts, merchants, captured text, email, or balances.",
          "## 5. AI and external services", "Local intelligent assistance does not transmit records. If you configure your own AI provider, UpLedger asks for consent before sending the text needed to that provider. Exchange rates and inflation may query public services for the requested currency or country without sending your financial history.",
          "## 6. Permissions", "Microphone and speech recognition are requested for dictation; biometrics for local lock; notifications for alerts; and every permission is used only when you enable its related feature.",
          "## 7. Rights and contact", "You can request access, rectification, erasure, restriction, objection, portability, or withdraw consent by writing to romerodev.app@gmail.com. You may also complain to the competent authority."
        ]
      },
      terms: {
        title: "Términos de uso de UpLedger", title_en: "UpLedger Terms of Use", updatedAt: "2026-08-02",
        body: [
          "## 1. Aceptación", "Al instalar o utilizar UpLedger aceptas estos términos y la Política de privacidad.",
          "## 2. Naturaleza del servicio", "UpLedger es una herramienta de organización financiera personal. No presta asesoramiento financiero, fiscal, contable, legal ni de inversión, y no sustituye a un profesional cualificado.",
          "## 3. Uso responsable", "Eres responsable de revisar la información introducida, proteger tu dispositivo y Apple ID y utilizar la app de forma lícita. No debes intentar acceder a sistemas ajenos, eludir medidas de seguridad ni introducir datos de terceros sin autorización.",
          "## 4. Exactitud y disponibilidad", "Los cálculos, categorías, previsiones y sugerencias son informativos y pueden contener errores o depender de datos incompletos. Verifica cualquier decisión económica relevante. No garantizamos disponibilidad ininterrumpida de servicios de Apple o terceros.",
          "## 5. Propiedad intelectual", "UpLedger, su código, marca, diseño y materiales propios pertenecen a Lester Romero Bernardo (RomeroDev) o a sus licenciantes. Se concede una licencia personal, limitada, revocable y no transferible para usar la app conforme a estos términos.",
          "## 6. Compras", "Las funciones Pro se procesan mediante Apple y se rigen además por las Condiciones de suscripción publicadas en esta web y la información mostrada por App Store antes de comprar.",
          "## 7. Legislación y contacto", "Se aplica la legislación española, sin perjuicio de los derechos imperativos del consumidor. Contacto: romerodev.app@gmail.com."
        ],
        body_en: [
          "## 1. Acceptance", "By installing or using UpLedger, you accept these terms and the Privacy Policy.",
          "## 2. Nature of the service", "UpLedger is a personal-finance organization tool. It does not provide financial, tax, accounting, legal, or investment advice and does not replace a qualified professional.",
          "## 3. Responsible use", "You are responsible for reviewing entered information, protecting your device and Apple ID, and using the app lawfully. You must not attempt to access third-party systems, circumvent security measures, or enter third-party data without authorization.",
          "## 4. Accuracy and availability", "Calculations, categories, forecasts, and suggestions are informational and may be inaccurate or depend on incomplete data. Verify any relevant financial decision. We do not guarantee uninterrupted availability of Apple or third-party services.",
          "## 5. Intellectual property", "UpLedger, its code, brand, design, and own materials belong to Lester Romero Bernardo (RomeroDev) or its licensors. You receive a personal, limited, revocable, non-transferable license to use the app under these terms.",
          "## 6. Purchases", "Pro features are processed by Apple and are also governed by the Subscription Terms published on this website and the information the App Store displays before purchase.",
          "## 7. Law and contact", "Spanish law applies, without prejudice to mandatory consumer rights. Contact: romerodev.app@gmail.com."
        ]
      },
      subscriptions: {
        title: "Condiciones de suscripción de UpLedger Pro", title_en: "UpLedger Pro Subscription Terms", updatedAt: "2026-08-02",
        body: [
          "## 1. Planes", "UpLedger Pro ofrece planes mensual y anual. La versión gratuita puede utilizarse sin contratar una suscripción.",
          "## 2. Precio, facturación y prueba", "Apple procesa el pago y muestra antes de confirmar el precio final, impuestos, moneda, duración y cualquier prueba u oferta disponible. El plan mensual cuesta 4,99 € y el anual 34,99 € como precio base en España; los importes pueden variar por territorio. Las cuentas elegibles pueden recibir una prueba gratuita de 7 días.",
          "## 3. Renovación automática", "La suscripción se renueva automáticamente salvo cancelación al menos 24 horas antes del final del periodo. El cobro se realiza a tu Apple ID. Gestiona o cancela desde Ajustes > tu nombre > Suscripciones. Eliminar la app no cancela la suscripción.",
          "## 4. Restauración y acceso", "Puedes restaurar compras realizadas con el mismo Apple ID desde UpLedger. Al finalizar el periodo pagado, se desactivan las funciones Pro; tus datos no se eliminan automáticamente.",
          "## 5. Cambios y reembolsos", "Apple puede aplicar cambios de precio y los comunicará conforme a sus reglas. Apple gestiona cancelaciones y solicitudes de reembolso mediante reportaproblem.apple.com.",
          "## 6. Contacto", "Soporte y consultas de suscripción: romerodev.app@gmail.com."
        ],
        body_en: [
          "## 1. Plans", "UpLedger Pro offers monthly and annual plans. The free version can be used without a subscription.",
          "## 2. Price, billing, and trial", "Apple processes payment and displays the final price, taxes, currency, duration, and any available trial or offer before confirmation. The monthly plan is €4.99 and the annual plan is €34.99 as base prices in Spain; amounts may vary by territory. Eligible accounts may receive a 7-day free trial.",
          "## 3. Automatic renewal", "The subscription renews automatically unless canceled at least 24 hours before the period ends. Charges are made to your Apple ID. Manage or cancel in Settings > your name > Subscriptions. Deleting the app does not cancel the subscription.",
          "## 4. Restore and access", "You can restore purchases made with the same Apple ID from UpLedger. When a paid period ends, Pro features are disabled; your data is not automatically deleted.",
          "## 5. Changes and refunds", "Apple may apply price changes and notify you under its rules. Apple manages cancellations and refund requests at reportaproblem.apple.com.",
          "## 6. Contact", "Subscription support and questions: romerodev.app@gmail.com."
        ]
      }
    }
  },
  {
    id: "renuvia",
    slug: "renuvia",
    legacySlugs: ["expirely"],
    name: "Renuvia",
    tagline: "Convierte cada renovación en un expediente listo para actuar.",
    tagline_en: "Turn every renewal into a dossier ready for action.",
    shortDescription:
      "Un radar privado que convierte fechas de renovación en expedientes con preparación, requisitos e historial.",
    shortDescription_en:
      "A private radar that turns renewal dates into dossiers with readiness, requirements, and history.",
    longDescription:
      "Renuvia reúne tus fechas de renovación en un Radar vivo y convierte cada plazo en un expediente: emisor, referencia, checklist, documentos necesarios, siguiente acción e historial.",
    longDescription_en:
      "Renuvia brings renewal dates into a live Radar and turns each deadline into a dossier: issuer, reference, checklist, required documents, next action, and history.",
    problem:
      "Renovar no consiste solo en recordar una fecha: hay requisitos, documentos, responsables y decisiones previas que preparar. La información suele quedar repartida y la urgencia aparece demasiado tarde.",
    problem_en:
      "Renewing is not just remembering a date: there are requirements, documents, owners, and decisions to prepare. The information is scattered and urgency arrives too late.",
    benefits: [
      "Radar de preparación: Ve qué expediente necesita una decisión, un documento o contacto hoy.",
      "Playbooks de renovación: Adapta el checklist a pasaportes, inspecciones, seguros, contratos, garantías y permisos.",
      "Evidencia organizada: Conserva emisor, referencia, documentos requeridos, fechas y trazabilidad de cada renovación.",
      "Privacidad local: Añade manualmente sin conexión o captura con OCR en el dispositivo; todo queda revisable antes de guardar."
    ],
    benefits_en: [
      "Readiness Radar: See which dossier needs a decision, document, or contact today.",
      "Renewal playbooks: Adapt the checklist to passports, inspections, insurance, contracts, warranties, and permits.",
      "Organized evidence: Keep issuer, reference, required documents, dates, and renewal history together.",
      "Local privacy: Add entries offline or capture with on-device OCR; review everything before saving."
    ],
    features: [
      "Radar de preparación: Ordena expedientes por urgencia, preparación y siguiente acción.",
      "Playbooks: Inicia checklists específicos para identidad, vehículo, seguro, contrato, garantía, suscripción o permiso.",
      "Requisitos: Marca documentos reunidos y pendientes dentro del expediente.",
      "Historial de renovación: Conserva la fecha anterior, la nueva y cuándo registraste el cambio.",
      "Captura revisable: Usa cámara, Fotos, PDF o código de barras con OCR local y confirma cada campo.",
      "Privacidad y control: Sin cuenta, entrada manual offline, exportación CSV/JSON e iCloud opcional."
    ],
    features_en: [
      "Readiness Radar: Sort dossiers by urgency, readiness, and next action.",
      "Playbooks: Start focused checklists for identity, vehicle, insurance, contracts, warranties, subscriptions, or permits.",
      "Requirements: Mark gathered and missing documents inside each dossier.",
      "Renewal history: Preserve the previous date, the new date, and when the change was recorded.",
      "Reviewable capture: Use camera, Photos, PDF, or barcode with on-device OCR and confirm every field.",
      "Privacy and control: No account, offline manual entry, CSV/JSON export, and optional iCloud."
    ],
    audience:
      "Personas y hogares que necesitan preparar renovaciones reales —identidad, vehículo, seguros, contratos, garantías, suscripciones y permisos— sin depender de hojas de cálculo.",
    audience_en:
      "People and households who need to prepare real renewals—identity, vehicles, insurance, contracts, warranties, subscriptions, and permits—without spreadsheets.",
    status: "development",
    featured: true,
    category: "Productividad",
    category_en: "Productivity",
    platform: ["iOS", "iPadOS"],
    supportEmail: "romerodev.app+renuvia@gmail.com",
    iconUrl: "assets/images/renuvia/renuvia-icon.png",
    coverImageUrl: "assets/images/renuvia/screens/01_radar_es.png",
    screenshots: [
      "01_radar",
      "02_scanner",
      "03_review",
      "04_vault",
      "05_renewals",
      "06_analytics",
      "07_calendar",
      "08_alerts",
      "09_categories",
      "10_privacy"
    ],
    primaryCtaLabel: "Conocer el lanzamiento",
    primaryCtaLabel_en: "Follow the launch",
    primaryCtaUrl: "/es/casos/renuvia/soporte/",
    secondaryCtaLabel: "Soporte de la app",
    secondaryCtaLabel_en: "App support",
    secondaryCtaUrl: "/es/casos/renuvia/soporte/",
    colorPrimary: "#4f46e5",
    colorSecondary: "#22d3ee",
    updatedAt: "2026-08-28",
    promotionalText:
      "No solo recuerdes la fecha: prepara el expediente, completa requisitos y conserva la historia de cada renovación.",
    promotionalText_en:
      "Do more than remember the date: prepare the dossier, complete requirements, and keep every renewal history.",
    seo: {
      title: "Renuvia: expedientes privados de renovación con Radar | RomeroDev",
      description:
        "Prepara renovaciones de identidad, vehículos, seguros, contratos, garantías y permisos con expedientes, checklist, documentos y Radar local.",
      keywords: "renovación,expediente,radar,checklist,documentos,seguro,contrato,garantía,permiso,OCR",
      keywords_en: "renewal,dossier,radar,checklist,documents,insurance,contract,warranty,permit,OCR"
    },
    faq: [],
    legal: {
      privacy: {
        title: "Política de privacidad de Renuvia",
        title_en: "Renuvia Privacy Policy",
        updatedAt: "2026-08-28",
        body: []
      },
      terms: {
        title: "Términos de uso de Renuvia",
        title_en: "Renuvia Terms of Use",
        updatedAt: "2026-08-28",
        body: []
      }
    }
  }
];

export const homeSections: HomeSection[] = [
  {
    title: "Producto antes que plantilla",
    body: "Cada app se presenta con contexto, problema, beneficios, soporte y documentación legal preparada para publicación."
  },
  {
    title: "Base estática, contenido dinámico",
    body: "El sitio exporta a GitHub Pages y se conecta a Supabase para administrar contenido, assets y contactos."
  },
  {
    title: "SEO técnico desde el inicio",
    body: "Metadatos, sitemap, datos estructurados y rutas limpias forman parte de la base, no de una fase posterior."
  }
];

export const testimonials: Testimonial[] = [];

export const generalFaq: FaqItem[] = [
  {
    question: "¿Puedes desarrollar una app completa desde cero?",
    answer:
      "Sí. El foco está en apps iOS y productos digitales con estrategia, UI, desarrollo, preparación de publicación y soporte."
  },
  {
    question: "¿Este sitio funciona sin servidor propio?",
    answer:
      "Sí. El frontend se exporta como estático para GitHub Pages. Supabase cubre autenticación, base de datos, storage y reglas de acceso."
  },
  {
    question: "¿Cómo se actualizan las páginas legales de una app?",
    answer:
      "Pueden editarse desde el panel admin y guardarse en Supabase. Para rutas nuevas se recomienda lanzar un nuevo deploy estático."
  }
];

// Supabase fetching helper
export async function fetchAppsFromSupabase(): Promise<AppItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: dbApps, error: appsError } = await supabase
      .from("apps")
      .select("*");

    if (appsError || !dbApps) {
      console.error("Error fetching apps from Supabase:", appsError);
      return [];
    }

    const { data: dbFaqs } = await supabase
      .from("app_faqs")
      .select("*")
      .order("sort_order", { ascending: true });

    const { data: dbLegal } = await supabase
      .from("app_legal_pages")
      .select("*");

    // Extended catalog surfaces are optional until the catalog migration has
    // been applied. Each result is intentionally independent so an older
    // Supabase project can still render the core catalog.
    const [linksResult, mediaResult, snapshotsResult, reviewsResult, auditsResult, changelogResult, localizationResult] = await Promise.all([
      supabase.from("app_links").select("*").order("sort_order", { ascending: true }),
      supabase.from("app_media").select("*").order("sort_order", { ascending: true }),
      supabase.from("app_store_snapshots").select("*"),
      supabase.from("app_reviews").select("*").eq("is_published", true).order("review_date", { ascending: false }),
      supabase.from("app_catalog_audits").select("*"),
      supabase.from("app_changelog").select("*").order("release_date", { ascending: false }),
      supabase.from("app_changelog_localizations").select("*")
    ]);
    const dbLinks = linksResult.data ?? [];
    const dbMedia = mediaResult.data ?? [];
    const dbSnapshots = snapshotsResult.data ?? [];
    const dbReviews = reviewsResult.data ?? [];
    const dbAudits = auditsResult.data ?? [];
    const dbChangelog = changelogResult.data ?? [];
    const dbChangelogLocalizations = localizationResult.data ?? [];

    const mappedApps = await Promise.all(
      dbApps.map(async (app): Promise<AppItem> => {
        // Static generation consumes persisted App Store snapshots/reviews.
        // The explicit catalog sync job owns network reads from Apple's public
        // endpoints; keeping them out of page generation makes deploys
        // deterministic and prevents a storefront outage from hanging Pages.
        const persistedReviews = dbReviews.filter((r) => r.app_id === app.id || r.app_slug === app.slug);
        const reviews: AppStoreReview[] = [];

        const faq = (dbFaqs ?? [])
          .filter((f) => f.app_id === app.id)
          .map((f) => ({
            question: f.question,
            question_en: f.question_en || undefined,
            answer: f.answer,
            answer_en: f.answer_en || undefined
          }));

        const privacyPage = (dbLegal ?? []).find((l) => l.app_id === app.id && l.kind === "privacy");
        const termsPage = (dbLegal ?? []).find((l) => l.app_id === app.id && l.kind === "terms");
        const subscriptionsPage = (dbLegal ?? []).find((l) => l.app_id === app.id && l.kind === "subscriptions");
        const safetyPage = (dbLegal ?? []).find((l) => l.app_id === app.id && l.kind === "safety");
        const storeSnapshot = dbSnapshots.find((s) => s.app_id === app.id || s.app_slug === app.slug);
        const links = dbLinks.filter((l) => l.app_id === app.id);
        const media = dbMedia.filter((m) => m.app_id === app.id);
        const audit = dbAudits.find((a) => a.app_id === app.id);
        const changelogRows = dbChangelog.filter((entry) => entry.app_id === app.id || entry.app_slug === app.slug);
        const changelogIds = new Set(changelogRows.map((entry) => entry.id));
        const changelogLocalizations = dbChangelogLocalizations.filter(
          (entry) => entry.app_slug === app.slug || changelogIds.has(entry.changelog_id)
        );
        const liveChangelog = changelogFromRows(changelogRows, changelogLocalizations);

        return {
          id: app.id,
          slug: app.slug,
          name: app.name,
          tagline: app.tagline,
          tagline_en: app.tagline_en || undefined,
          shortDescription: app.short_description,
          shortDescription_en: app.short_description_en || undefined,
          longDescription: app.long_description,
          longDescription_en: app.long_description_en || undefined,
          problem: app.problem || "",
          problem_en: app.problem_en || undefined,
          benefits: app.benefits || [],
          benefits_en: app.benefits_en || [],
          features: app.features || [],
          features_en: app.features_en || [],
          audience: app.audience || "",
          audience_en: app.audience_en || undefined,
          status: app.status as AppItem["status"],
          featured: app.featured || false,
          category: app.category,
          category_en: app.category_en || undefined,
          platform: app.platform || [],
          supportedLocales: app.supported_locales?.length ? app.supported_locales : undefined,
          appStoreUrl: app.app_store_url || undefined,
          websiteUrl: app.website_url || undefined,
          supportEmail: app.support_email,
          iconUrl: app.icon_url || undefined,
          coverImageUrl: app.cover_image_url || undefined,
          screenshots: app.screenshots || [],
          videoUrl: app.video_url || undefined,
          primaryCtaLabel: app.primary_cta_label,
          primaryCtaLabel_en: app.primary_cta_label_en || undefined,
          primaryCtaUrl: app.primary_cta_url,
          secondaryCtaLabel: app.secondary_cta_label || undefined,
          secondaryCtaLabel_en: app.secondary_cta_label_en || undefined,
          secondaryCtaUrl: app.secondary_cta_url || undefined,
          colorPrimary: app.color_primary || undefined,
          colorSecondary: app.color_secondary || undefined,
          publishedAt: app.published_at || undefined,
          updatedAt: app.updated_at ? new Date(app.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
          seo: {
            title: app.seo_title || `${app.name} - ${app.tagline}`,
            description: app.seo_description || app.short_description,
            image: app.seo_image || undefined
          },
          pricing: Array.isArray(app.pricing) ? app.pricing : [],
          freeFeatures: app.free_features || [],
          freeFeatures_en: app.free_features_en || [],
          proFeatures: app.pro_features || [],
          proFeatures_en: app.pro_features_en || [],
          links: links.length ? links.map((l) => ({
            kind: l.kind,
            label: l.label,
            label_en: l.label_en || undefined,
            url: l.url,
            isPrimary: Boolean(l.is_primary),
            isExternal: l.is_external !== false
          })) : undefined,
          media: media.length ? media.map((m) => ({
            kind: m.kind,
            path: m.path,
            alt: m.alt || app.name,
            alt_en: m.alt_en || undefined,
            locale: m.locale || undefined,
            sortOrder: m.sort_order ?? undefined,
            source: m.source || undefined
          })) : undefined,
          bundleIdentifier: app.bundle_identifier || undefined,
          version: app.version || undefined,
          buildNumber: app.build_number || undefined,
          followEnabled: app.follow_enabled !== false,
          completeness: audit ? {
            score: Number(audit.score ?? 0),
            missing: audit.missing_fields || [],
            verifiedAt: audit.verified_at || undefined,
            sourcePath: audit.source_path || undefined
          } : undefined,
          faq,
          legal: {
            privacy: {
              title: privacyPage?.title || `Política de privacidad de ${app.name}`,
              title_en: privacyPage?.title_en || `Privacy policy of ${app.name}`,
              updatedAt: privacyPage?.updated_at ? new Date(privacyPage.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
              body: privacyPage?.body ? privacyPage.body.split("\n").filter(Boolean) : [],
              body_en: privacyPage?.body_en ? privacyPage.body_en.split("\n").filter(Boolean) : []
            },
            terms: {
              title: termsPage?.title || `Términos y condiciones de ${app.name}`,
              title_en: termsPage?.title_en || `Terms and conditions of ${app.name}`,
              updatedAt: termsPage?.updated_at ? new Date(termsPage.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
              body: termsPage?.body ? termsPage.body.split("\n").filter(Boolean) : [],
              body_en: termsPage?.body_en ? termsPage.body_en.split("\n").filter(Boolean) : []
            },
            subscriptions: subscriptionsPage ? {
              title: subscriptionsPage.title,
              title_en: subscriptionsPage.title_en || undefined,
              updatedAt: subscriptionsPage.updated_at ? new Date(subscriptionsPage.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
              body: subscriptionsPage.body ? subscriptionsPage.body.split("\n").filter(Boolean) : [],
              body_en: subscriptionsPage.body_en ? subscriptionsPage.body_en.split("\n").filter(Boolean) : []
            } : undefined,
            safety: safetyPage ? {
              title: safetyPage.title,
              title_en: safetyPage.title_en || undefined,
              updatedAt: safetyPage.updated_at ? new Date(safetyPage.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
              body: safetyPage.body ? safetyPage.body.split("\n").filter(Boolean) : [],
              body_en: safetyPage.body_en ? safetyPage.body_en.split("\n").filter(Boolean) : []
            } : undefined
          },
          averageRating: storeSnapshot?.average_rating,
          userRatingCount: storeSnapshot?.user_rating_count ?? 0,
          appStoreReviews: persistedReviews.length ? persistedReviews.map((r) => ({
            id: r.id,
            author: r.author,
            rating: r.rating,
            title: r.title || "",
            content: r.content,
            date: r.review_date || new Date(r.created_at).toISOString().split("T")[0],
            market: r.market || undefined,
            locale: r.locale || undefined,
            source: r.source || undefined,
            sourceUrl: r.source_url || undefined,
            externalId: r.external_id || undefined
          })) : reviews.map((r) => ({
            id: r.id,
            author: r.author,
            rating: r.rating,
            title: r.title,
            content: r.content,
            date: new Date(r.updatedAt).toISOString().split("T")[0],
            market: r.market,
            locale: r.locale,
            source: r.source,
            sourceUrl: r.sourceUrl,
            externalId: r.externalId
          })),
          appStore: storeSnapshot ? {
            trackName: storeSnapshot.track_name,
            version: storeSnapshot.version,
            buildNumber: storeSnapshot.build_number || undefined,
            releaseNotes: storeSnapshot.release_notes || undefined,
            currentVersionReleaseDate: storeSnapshot.current_version_release_date || undefined,
            minimumOsVersion: storeSnapshot.minimum_os_version || undefined,
            formattedPrice: storeSnapshot.formatted_price || undefined,
            developer: storeSnapshot.developer || undefined,
            languages: storeSnapshot.languages || [],
            fileSizeBytes: storeSnapshot.file_size_bytes || undefined,
            sourceUrl: storeSnapshot.track_view_url,
            syncedAt: storeSnapshot.synced_at
          } : undefined,
          changelog: liveChangelog.length ? liveChangelog : changelogFromSnapshot(appStoreSnapshot, app.slug)
        };
      })
    );

    return mappedApps;
  } catch (err) {
    console.error("Supabase dynamic fetch failed:", err);
    return [];
  }
}

export async function getApps(): Promise<AppItem[]> {
  const dbApps = await fetchAppsFromSupabase();
  const merged = apps.map(enrichKnownProduct);

  for (const dbApp of dbApps) {
    const idx = merged.findIndex(
      (a) => a.slug === dbApp.slug || a.legacySlugs?.includes(dbApp.slug)
    );
    if (idx >= 0) {
      const fallback = merged[idx];
      merged[idx] = {
        ...fallback,
        ...dbApp,
        id: fallback.id,
        slug: fallback.slug,
        legacySlugs: fallback.legacySlugs,
        name: fallback.name,
        // Supabase can contain catalog rows without media while the curated
        // source still has the real product assets. Keep those assets as the
        // fallback so the home hero never collapses to an empty showcase.
        videoUrl: dbApp.videoUrl ?? fallback.videoUrl,
        iconUrl: dbApp.iconUrl ?? fallback.iconUrl,
        coverImageUrl: dbApp.coverImageUrl ?? fallback.coverImageUrl,
        screenshots: dbApp.screenshots?.length ? dbApp.screenshots : fallback.screenshots,
        links: dbApp.links?.length ? dbApp.links : fallback.links,
        media: dbApp.media?.length ? dbApp.media : fallback.media,
        bundleIdentifier: dbApp.bundleIdentifier ?? fallback.bundleIdentifier,
        version: dbApp.version ?? fallback.version,
        buildNumber: dbApp.buildNumber ?? fallback.buildNumber,
        supportedLocales: dbApp.supportedLocales?.length ? dbApp.supportedLocales : fallback.supportedLocales,
        followEnabled: dbApp.followEnabled ?? fallback.followEnabled,
        completeness: dbApp.completeness ?? fallback.completeness,
        appStore: dbApp.appStore ?? fallback.appStore,
        changelog: dbApp.changelog?.length ? dbApp.changelog : fallback.changelog,
        appStoreReviews: dbApp.appStoreReviews?.length ? dbApp.appStoreReviews : fallback.appStoreReviews,
        averageRating: dbApp.averageRating ?? fallback.averageRating,
        userRatingCount: dbApp.userRatingCount ?? fallback.userRatingCount,
        seo: {
          ...fallback.seo,
          ...dbApp.seo,
          keywords: dbApp.seo.keywords ?? fallback.seo.keywords,
          keywords_en: dbApp.seo.keywords_en ?? fallback.seo.keywords_en
        },
        legal: {
          privacy: dbApp.legal.privacy.body.length ? dbApp.legal.privacy : fallback.legal.privacy,
          terms: dbApp.legal.terms.body.length ? dbApp.legal.terms : fallback.legal.terms,
          subscriptions: dbApp.legal.subscriptions?.body.length ? dbApp.legal.subscriptions : fallback.legal.subscriptions,
          safety: dbApp.legal.safety?.body.length ? dbApp.legal.safety : fallback.legal.safety
        }
      };
    } else {
      merged.push(dbApp);
    }
  }

  return merged.map(applyAppStoreSnapshot).map(enrichKnownProduct);
}

export async function getPublishedApps(): Promise<AppItem[]> {
  const all = await getApps();
  return all.filter((app) => app.status !== "archived");
}

export async function getFeaturedApps(): Promise<AppItem[]> {
  const all = await getPublishedApps();
  return all.filter((app) => app.featured);
}

export async function getAppBySlug(slug: string): Promise<AppItem | undefined> {
  const all = await getApps();
  return all.find((app) => app.slug === slug || app.legacySlugs?.includes(slug));
}

export function getAppRouteSlugs(app: Pick<AppItem, "slug" | "legacySlugs">): string[] {
  return [app.slug, ...(app.legacySlugs ?? [])];
}

// Fetch home sections from Supabase
export async function getHomeSections(): Promise<Record<string, HomeSection>> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return {};

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data } = await supabase
      .from("home_sections")
      .select("key, title, title_en, body, body_en, is_enabled")
      .order("sort_order", { ascending: true });
    if (!data) return {};

    const result: Record<string, HomeSection> = {};
    for (const row of data) {
      if (row.is_enabled) {
        result[row.key] = {
          title: row.title,
          title_en: row.title_en || undefined,
          body: row.body,
          body_en: row.body_en || undefined
        };
      }
    }
    return result;
  } catch (err) {
    console.error("Error fetching home sections:", err);
    return {};
  }
}

function isLiveLandingItem(item: { is_enabled: boolean; starts_at?: string | null; ends_at?: string | null }) {
  if (!item.is_enabled) return false;
  const now = Date.now();
  return (!item.starts_at || new Date(item.starts_at).getTime() <= now)
    && (!item.ends_at || new Date(item.ends_at).getTime() >= now);
}

export async function getLandingAnnouncements(): Promise<LandingAnnouncement[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return [];

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase
      .from("landing_announcements")
      .select("*")
      .eq("is_enabled", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []).filter(isLiveLandingItem) as LandingAnnouncement[];
  } catch (err) {
    console.error("Error fetching landing announcements:", err);
    return [];
  }
}

export async function getLandingSurveys(): Promise<LandingSurvey[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return [];

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase
      .from("landing_surveys")
      .select("*")
      .eq("is_enabled", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;

    const liveRows = (data ?? []).filter(isLiveLandingItem);
    return await Promise.all(liveRows.map(async (row) => {
      const { data: resultRows } = await supabase.rpc("get_landing_survey_results", { p_slug: row.slug });
      const results = Object.fromEntries(
        (resultRows ?? []).map((result: { option_id: string; votes: number | string }) => [result.option_id, Number(result.votes) || 0])
      );
      const options = (Array.isArray(row.options) ? row.options : []) as LandingSurveyOption[];
      return { ...row, options, results } as LandingSurvey;
    }));
  } catch (err) {
    console.error("Error fetching landing surveys:", err);
    return [];
  }
}

// Fetch testimonials from Supabase, falling back to real App Store reviews
// synced into the snapshot. Curated rows (if added in the Dashboard) take
// precedence; otherwise we surface the best real reviews, already filtered by
// the active locale so the section never shows fake quotes.
export async function getTestimonials(locale: "es" | "en" = "es"): Promise<Testimonial[]> {
  const curated = await fetchCuratedTestimonials();
  if (curated.length > 0) return curated;

  const entries = Object.entries(appStoreSnapshot);
  const result: Testimonial[] = [];
  for (const [slug, entry] of entries) {
    if (slug === "__changelog") continue;
    const app = entry as SnapshotEntry;
    const appName = app.trackName?.split(":")[0]?.trim() || slug;
    const reviews = reviewsForLocale(app.reviews, locale, 2).slice(0, 2);
    for (const r of reviews) {
      result.push({
        quote: r.content,
        name: r.author,
        role: locale === "es" ? `Reseña de ${appName}` : `${appName} review`
      });
    }
  }
  return result.slice(0, 6);
}

async function fetchCuratedTestimonials(): Promise<Testimonial[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return [];

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data } = await supabase
      .from("testimonials")
      .select("quote, quote_en, name, role, role_en")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    return (data ?? []).map((t) => ({
      quote: t.quote,
      quote_en: t.quote_en || undefined,
      name: t.name,
      role: t.role || "",
      role_en: t.role_en || undefined
    }));
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    return [];
  }
}

// Fetch about profile from Supabase
export async function getAboutProfile(): Promise<any> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data } = await supabase
      .from("about_profiles")
      .select("*")
      .eq("slug", "lester-romero-bernardo")
      .maybeSingle();
    return data;
} catch (err) {
    console.error("Error fetching profile:", err);
    return null;
  }
}
