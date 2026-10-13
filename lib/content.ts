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
import { getFallbackAppFeatureComparisons } from "./app-comparisons";

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
  fileSizeBytes?: string;
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
  const publishedDate = snapshot.currentVersionReleaseDate?.slice(0, 10);
  const snapshotChangelog = changelogFromSnapshot(appStoreSnapshot, app.slug);
  const snapshotVersions = new Set(snapshotChangelog.map((entry) => entry.version));
  return {
    ...app,
    // A checked-in snapshot only comes from Apple's public storefront. It is
    // therefore the source that moves a catalog record out of pre-release
    // states in static builds too, even when Supabase still has an older row.
    status: "published",
    publishedAt: app.publishedAt ?? publishedDate,
    updatedAt: publishedDate ?? app.updatedAt,
    supportedLocales: app.supportedLocales?.length
      ? app.supportedLocales
      : snapshot.languages.map((language) => language.toLowerCase()),
    appStoreUrl: snapshot.trackViewUrl,
    primaryCtaUrl: snapshot.trackViewUrl,
    averageRating: snapshot.averageUserRating,
    userRatingCount: snapshot.userRatingCount,
    appStoreReviews: snapshot.reviews ?? [],
    changelog: [
      ...snapshotChangelog,
      ...(app.changelog ?? []).filter((entry) => !snapshotVersions.has(entry.version))
    ],
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
      "Registra hasta dos medicamentos gratis y organiza síntomas, constantes, perfiles familiares y citas en un solo lugar.",
    shortDescription_en:
      "Track up to two medications for free and organize symptoms, vitals, family profiles, and appointments in one place.",
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
    appStoreUrl: "https://apps.apple.com/es/app/vitalspath-salud-familiar/id6760143192",
    primaryCtaLabel: "Consíguelo en el App Store",
    primaryCtaUrl: "https://apps.apple.com/es/app/vitalspath-salud-familiar/id6760143192",
    secondaryCtaLabel: "Soporte de la App",
    secondaryCtaUrl: "/apps/vitalspath/support",
    updatedAt: "2026-10-11",
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
    tagline: "Planifica, registra y progresa.",
    tagline_en: "Plan, log, and progress.",
    shortDescription:
      "Planifica sesiones para gimnasio o casa, registra cada serie y entiende tu siguiente objetivo con el historial, la progresión y las señales de recuperación a mano.",
    shortDescription_en:
      "Plan gym or home sessions, log every set, and understand your next target with training history, progression, and recovery context at hand.",
    longDescription:
      "StreakReps reúne planificación de fuerza, registro de series y análisis del progreso en iPhone y iPad, con una app complementaria para Apple Watch. Crea una rutina para gimnasio o casa, consulta tu rendimiento anterior mientras entrenas y registra peso, repeticiones, esfuerzo, descansos y notas. Al completar sesiones, el historial alimenta marcas personales, volumen, tendencias y objetivos sugeridos para la próxima vez. La integración opcional con Apple Salud añade contexto de actividad y recuperación.",
    longDescription_en:
      "StreakReps brings strength planning, set logging, and progress analysis together on iPhone and iPad, with an Apple Watch companion app. Build a gym or home routine, check previous performance while you train, and record weight, reps, effort, rest, and notes. Completed sessions build the history behind personal records, volume, trends, and suggested targets for next time. Optional Apple Health access adds activity and recovery context.",
    problem:
      "Sin un historial claro es fácil perder tiempo entre series, olvidar qué hiciste la última vez o confundir una estimación con progreso medido.",
    problem_en:
      "Without a clear training history, it is easy to lose time between sets, forget what you lifted last time, or mistake an estimate for measured progress.",
    benefits: [
      "Plan con estructura: Define días, ejercicios, series, rangos de repeticiones, descansos y reglas de progresión.",
      "Registro sin perder el ritmo: Anota peso, repeticiones, esfuerzo y notas, con el rendimiento anterior a mano.",
      "Siguiente objetivo explicado: Las sugerencias usan las reglas elegidas y tus sesiones registradas; tú decides qué hacer.",
      "Progreso que puedes revisar: Consulta récords, volumen, historial y tendencias por ejercicio.",
      "Ecosistema Apple opcional: Usa Apple Health, Apple Watch, widgets, Live Activities, Atajos y controles compatibles."
    ],
    benefits_en: [
      "Structured plans: Set training days, exercises, sets, rep ranges, rest, and progression rules.",
      "Keep your training moving: Log weight, reps, effort, and notes with previous performance close by.",
      "An explained next target: Suggestions use your chosen rules and logged sessions; you decide what to do.",
      "Progress you can review: Explore personal records, volume, history, and exercise trends.",
      "Optional Apple ecosystem: Use Apple Health, Apple Watch, widgets, Live Activities, Shortcuts, and supported controls."
    ],
    features: [
      "Rutinas adaptables: Organiza días, ejercicios, series, repeticiones, descansos y reglas de progresión.",
      "Registro durante la sesión: Guarda cargas, repeticiones, esfuerzo percibido, descansos y notas por serie.",
      "Objetivos para la próxima sesión: Consulta sugerencias calculadas a partir de tus reglas y entrenamientos registrados.",
      "Historial y métricas: Revisa sesiones, récords personales, volumen y tendencias por ejercicio.",
      "Seguimiento corporal: Guarda medidas y revisa su evolución junto al entrenamiento.",
      "Contexto de salud opcional: Conecta Apple Salud para consultar datos autorizados de actividad y recuperación.",
      "Entrena dentro del ecosistema Apple: Continúa desde Apple Watch y usa widgets, Live Activities, Atajos y controles compatibles.",
      "Actividades al aire libre: Registra rutas de carrera o caminata con ubicación cuando inicias esa actividad."
    ],
    features_en: [
      "Flexible routines: Organize training days, exercises, sets, reps, rest, and progression rules.",
      "In-session logging: Save load, reps, perceived effort, rest, and notes for each set.",
      "Targets for your next session: Review suggestions based on your rules and logged workouts.",
      "History and metrics: Review sessions, personal records, volume, and exercise trends.",
      "Body tracking: Save measurements and follow changes alongside your training.",
      "Optional health context: Connect Apple Health to view authorized activity and recovery data.",
      "Train across Apple devices: Continue from Apple Watch and use widgets, Live Activities, Shortcuts, and supported controls.",
      "Outdoor activities: Record running or walking routes with location when you start that activity."
    ],
    audience: "Entusiastas del gimnasio, atletas de fuerza y personas que quieren llevar un control de su sobrecarga progresiva.",
    audience_en: "Gym enthusiasts, strength athletes, and people wanting to track their progressive overload.",
    status: "published",
    featured: true,
    category: "Salud y forma física",
    category_en: "Health & Fitness",
    platform: ["iOS", "iPadOS", "watchOS"],
    supportEmail: "romerodev.app+streakreps@gmail.com",
    iconUrl: "assets/images/reps/icons/streakreps-appstore-icon.webp",
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
    appStoreUrl: "https://apps.apple.com/es/app/streakreps-rutinas-y-pesas/id6775801149",
    primaryCtaLabel: "Consíguelo en el App Store",
    primaryCtaLabel_en: "Get it on the App Store",
    primaryCtaUrl: "https://apps.apple.com/es/app/streakreps-rutinas-y-pesas/id6775801149",
    secondaryCtaLabel: "Características",
    secondaryCtaLabel_en: "Features",
    secondaryCtaUrl: "/apps/reps#features",
    colorPrimary: "#2459e0",
    colorSecondary: "#ff632e",
    updatedAt: "2026-10-13",
    seo: {
      title: "StreakReps - Entrenamiento de fuerza, progreso y recuperación | RomeroDev",
      description: "Entrenamiento de fuerza en iPhone, iPad y Apple Watch: planifica rutinas, registra series, revisa tu progreso y activa Apple Health o rutas GPS de forma opcional."
    },
    faq: [
      {
        question: "¿Necesito una cuenta o conexión a internet para entrenar?",
        question_en: "Do I need an account or an internet connection to train?",
        answer: "Puedes usar el registro principal de entrenamientos sin activar las funciones sociales. Algunas funciones de cuenta, sincronización o contenido compartido necesitan iCloud o conexión a internet.",
        answer_en: "You can use the core workout log without enabling social features. Some account, sync, or shared-content features require iCloud or an internet connection."
      },
      {
        question: "¿Cómo empiezo una rutina y registro una sesión?",
        question_en: "How do I start a routine and log a workout?",
        answer: "Crea o elige una rutina, abre la sesión del día y registra las repeticiones y la carga de cada serie. Puedes añadir esfuerzo percibido, descanso y notas para conservar el contexto.",
        answer_en: "Create or choose a routine, open the day's session, and log the reps and load for each set. You can add perceived effort, rest, and notes to keep the context."
      },
      {
        question: "¿De dónde sale el siguiente objetivo sugerido?",
        question_en: "Where does the suggested next target come from?",
        answer: "Se calcula usando tus reglas de progresión y los entrenamientos que has registrado. Es una referencia para planificar; puedes editarla o decidir no seguirla.",
        answer_en: "It is calculated from your progression rules and logged workouts. It is a planning reference; you can edit it or choose not to follow it."
      },
      {
        question: "¿Las métricas o el 1RM estimado son una evaluación médica?",
        question_en: "Are metrics or estimated 1RM a medical assessment?",
        answer: "No. Las marcas, tendencias y estimaciones se basan en los datos disponibles y pueden variar si el registro está incompleto. No diagnostican lesiones ni sustituyen la orientación de un profesional sanitario.",
        answer_en: "No. Records, trends, and estimates are based on available data and can vary when logging is incomplete. They do not diagnose injuries or replace advice from a healthcare professional."
      },
      {
        question: "¿Tengo que dar acceso a Apple Salud o a mi ubicación?",
        question_en: "Do I have to grant Apple Health or location access?",
        answer: "No. Son permisos opcionales. Apple Salud se solicita para las funciones de salud que elijas y la ubicación solo se necesita para registrar una ruta de una actividad exterior. Puedes cambiar los permisos en Ajustes.",
        answer_en: "No. These permissions are optional. Apple Health is requested for the health features you choose, and location is needed only to record an outdoor activity route. You can change permissions in Settings."
      },
      {
        question: "¿Qué puedo hacer desde Apple Watch?",
        question_en: "What can I do from Apple Watch?",
        answer: "La app complementaria permite consultar y registrar partes del entrenamiento desde el reloj. La disponibilidad depende de tener un Apple Watch compatible, la app instalada y una versión de sistema compatible.",
        answer_en: "The companion app lets you view and log parts of a workout from your watch. Availability depends on a compatible Apple Watch, the app being installed, and a supported system version."
      },
      {
        question: "¿Puedo usar StreakReps sin Apple Watch?",
        question_en: "Can I use StreakReps without an Apple Watch?",
        answer: "Sí. La planificación, el registro y el seguimiento del progreso están disponibles en iPhone. El Apple Watch añade funciones para consultar o registrar partes del entrenamiento desde la muñeca.",
        answer_en: "Yes. Planning, workout logging, and progress tracking are available on iPhone. Apple Watch adds features for viewing or logging parts of a workout from your wrist."
      },
      {
        question: "¿Qué incluye la copia de seguridad de iCloud?",
        question_en: "What does the iCloud backup include?",
        answer: "La copia automática contiene una selección de datos operativos, como rutinas, ejercicios, preferencias y registros. No incluye métricas de Apple Salud, rutas, fotos ni datos derivados de HealthKit. Las exportaciones manuales pueden incluir más datos.",
        answer_en: "The automatic backup contains selected operational data such as routines, exercises, preferences, and workout logs. It excludes Apple Health metrics, routes, photos, and HealthKit-derived data. Manual exports may contain more data."
      },
      {
        question: "¿Cuánto cuesta StreakReps Pro y cómo se renueva?",
        question_en: "How much does StreakReps Pro cost, and how does renewal work?",
        answer: "El precio, la duración y las ofertas disponibles se muestran en la App Store y pueden variar según el país o la fecha. Apple gestiona el cobro y la renovación; consulta las condiciones de suscripción antes de confirmar la compra.",
        answer_en: "Price, duration, and available offers are shown in the App Store and can vary by country or date. Apple manages billing and renewal; review the subscription terms before confirming a purchase."
      },
      {
        question: "¿Cómo cancelo StreakReps Pro?",
        question_en: "How do I cancel StreakReps Pro?",
        answer: "Desde Ajustes del iPhone o iPad, pulsa tu nombre y entra en Suscripciones. Eliminar la app no cancela una suscripción activa.",
        answer_en: "Open Settings on iPhone or iPad, tap your name and choose Subscriptions. Deleting the app does not cancel an active subscription."
      },
      {
        question: "¿Puedo exportar o borrar mis datos?",
        question_en: "Can I export or delete my data?",
        answer: "La app ofrece opciones para exportar o importar una copia desde sus ajustes. Para eliminar datos locales, sociales o de cuenta, sigue las opciones disponibles en la app y consulta la política de privacidad; soporte puede orientarte si necesitas ayuda.",
        answer_en: "The app provides options to export or import a backup from its settings. To delete local, social, or account data, use the options available in the app and consult the privacy policy; support can guide you if needed."
      },
      {
        question: "¿Cómo puedo pedir ayuda?",
        question_en: "How can I get help?",
        answer: "Escribe a romerodev.app+streakreps@gmail.com o abre la página de soporte. Si informas de un problema, indica el modelo del dispositivo, la versión de iOS y los pasos para reproducirlo; no incluyas información sanitaria sensible.",
        answer_en: "Email romerodev.app+streakreps@gmail.com or open the support page. When reporting an issue, include your device model, iOS version, and reproduction steps; do not include sensitive health information."
      }
    ],
    tutorials: [
      {
        id: "routine",
        title: "Crear una rutina",
        title_en: "Create a routine",
        summary: "Prepara el plan de la semana y deja claros los ejercicios y rangos antes de entrenar.",
        summary_en: "Set up your week and define exercises and rep ranges before you train.",
        steps: ["Abre la sección de rutinas y crea una nueva o duplica una existente.", "Añade los días, ejercicios, series, rangos de repeticiones y descansos.", "Elige las reglas de progresión que quieres usar y guarda la rutina."],
        steps_en: ["Open routines and create a new one or duplicate an existing plan.", "Add training days, exercises, sets, rep ranges, and rest periods.", "Choose the progression rules you want to use and save the routine."]
      },
      {
        id: "workout-log",
        title: "Registrar un entrenamiento",
        title_en: "Log a workout",
        summary: "Registra cada serie mientras entrenas para mantener el historial al día.",
        summary_en: "Log each set as you train to keep your history up to date.",
        steps: ["Abre la rutina o sesión que vas a realizar.", "En cada ejercicio, anota las repeticiones y la carga de cada serie.", "Añade esfuerzo, descansos o notas cuando quieras conservar ese contexto y guarda la sesión."],
        steps_en: ["Open the routine or session you are about to do.", "For each exercise, enter the reps and load for every set.", "Add effort, rest, or notes when you want to keep that context, then save the session."]
      },
      {
        id: "next-target",
        title: "Revisar el siguiente objetivo",
        title_en: "Review your next target",
        summary: "Usa las sugerencias de progresión como referencia basada en tu plan y tu historial.",
        summary_en: "Use progression suggestions as a reference based on your plan and history.",
        steps: ["Completa y guarda una sesión con los datos que quieras conservar.", "Vuelve al ejercicio o a la siguiente sesión para consultar el objetivo sugerido.", "Ajusta el objetivo según cómo te encuentres; la sugerencia no sustituye tu criterio."],
        steps_en: ["Complete and save a session with the details you want to keep.", "Return to the exercise or next session to view its suggested target.", "Adjust the target to how you feel; the suggestion does not replace your judgment."]
      },
      {
        id: "progress",
        title: "Entender tu progreso",
        title_en: "Understand your progress",
        summary: "Consulta el historial junto con métricas que dependen de los entrenamientos registrados.",
        summary_en: "Review your history alongside metrics that depend on your logged workouts.",
        steps: ["Abre el historial o el detalle del ejercicio que quieras revisar.", "Compara sesiones, volumen y marcas personales a lo largo del tiempo.", "Interpreta las tendencias como estimaciones de tus registros, especialmente si faltan sesiones o series."],
        steps_en: ["Open the history or details for the exercise you want to review.", "Compare sessions, volume, and personal records over time.", "Treat trends as estimates from your logs, especially when sessions or sets are missing."]
      },
      {
        id: "health",
        title: "Conectar Apple Salud",
        title_en: "Connect Apple Health",
        summary: "Activa únicamente las categorías de salud que quieras usar con las funciones correspondientes.",
        summary_en: "Enable only the health categories you want to use with the related features.",
        steps: ["Abre los ajustes o la función de salud de StreakReps.", "Elige conectar Apple Salud y revisa cada permiso que solicita iOS.", "Autoriza solo las categorías que quieras compartir; puedes revocar el acceso en Ajustes > Salud."],
        steps_en: ["Open StreakReps settings or the health feature.", "Choose to connect Apple Health and review each permission requested by iOS.", "Authorize only the categories you want to share; you can revoke access in Settings > Health."]
      },
      {
        id: "watch-controls",
        title: "Entrenar con Apple Watch y controles del sistema",
        title_en: "Train with Apple Watch and system controls",
        summary: "Accede a las funciones compatibles desde el reloj, widgets, Atajos o controles de iOS.",
        summary_en: "Access supported features from your watch, widgets, Shortcuts, or iOS controls.",
        steps: ["Instala StreakReps en un Apple Watch compatible y confirma que ambos dispositivos están actualizados.", "Añade los widgets o controles de StreakReps que estén disponibles en tu versión del sistema.", "Comprueba los permisos y mantén el iPhone cerca cuando una función necesite conexión o continuidad."],
        steps_en: ["Install StreakReps on a compatible Apple Watch and check that both devices are up to date.", "Add the StreakReps widgets or controls available in your system version.", "Check permissions and keep your iPhone nearby when a feature needs connectivity or continuity."]
      },
      {
        id: "outdoor-backup",
        title: "Registrar una ruta y proteger tus datos",
        title_en: "Record a route and protect your data",
        summary: "La ubicación solo se usa para la actividad exterior que inicias; revisa también las opciones de copia y exportación.",
        summary_en: "Location is used only for the outdoor activity you start; also review backup and export options.",
        steps: ["Inicia una actividad exterior de carrera o caminata y concede ubicación si quieres registrar la ruta.", "Comprueba el permiso de ubicación y la señal GPS antes de empezar; la precisión depende del dispositivo y el entorno.", "Desde ajustes, consulta las opciones para exportar o restaurar datos y revisa qué incluye la copia de iCloud."],
        steps_en: ["Start an outdoor run or walk and grant location access if you want to record its route.", "Check location permission and GPS signal before starting; accuracy depends on your device and surroundings.", "In settings, review export or restore options and check what the iCloud backup includes."]
      }
    ],
    disclosures: [
      {
        id: "health-safety",
        title: "Salud y seguridad",
        title_en: "Health and safety",
        body: "StreakReps ofrece herramientas de organización y seguimiento del entrenamiento; no diagnostica, trata ni previene enfermedades y no sustituye consejo médico. Detén el ejercicio si sientes dolor y consulta a un profesional cuando lo necesites.",
        body_en: "StreakReps provides workout organization and tracking tools; it does not diagnose, treat, or prevent disease and does not replace medical advice. Stop exercising if you feel pain and consult a professional when needed."
      },
      {
        id: "estimates",
        title: "Métricas y estimaciones",
        title_en: "Metrics and estimates",
        body: "El volumen, las tendencias y las estimaciones de rendimiento se derivan de la información que registras y de los métodos de cálculo de la app. Pueden no representar una medición directa y cambiar si faltan datos o se modifica el método.",
        body_en: "Volume, trends, and performance estimates are derived from the information you log and the app's calculation methods. They may not represent direct measurements and can change when data is missing or the method changes."
      },
      {
        id: "permissions",
        title: "Permisos opcionales",
        title_en: "Optional permissions",
        body: "Apple Salud, ubicación, fotos, cámara y micrófono se solicitan para funciones concretas y son opcionales para el registro básico. Puedes revisar o retirar permisos en los ajustes de iOS.",
        body_en: "Apple Health, location, photos, camera, and microphone are requested for specific features and are optional for basic workout logging. You can review or revoke permissions in iOS Settings."
      },
      {
        id: "location-accuracy",
        title: "Rutas y precisión GPS",
        title_en: "Routes and GPS accuracy",
        body: "Una ruta solo se registra cuando inicias una actividad exterior que utiliza ubicación. La precisión y continuidad dependen del dispositivo, la cobertura, el entorno y los permisos del sistema.",
        body_en: "A route is recorded only when you start an outdoor activity that uses location. Accuracy and continuity depend on your device, coverage, surroundings, and system permissions."
      },
      {
        id: "backup-scope",
        title: "Alcance de iCloud y exportaciones",
        title_en: "iCloud and export scope",
        body: "La copia automática de iCloud incluye una selección de datos operativos y excluye métricas de salud, rutas y fotos. Una exportación manual puede contener más datos; guárdala y compártela con cuidado.",
        body_en: "The automatic iCloud backup includes selected operational data and excludes health metrics, routes, and photos. A manual export may contain more data; store and share it carefully."
      },
      {
        id: "offline",
        title: "Conexión y funciones en línea",
        title_en: "Connectivity and online features",
        body: "El registro principal puede utilizarse sin conexión. La sincronización, las funciones sociales, las compras y algunos servicios pueden requerir internet, iCloud o los servicios de Apple.",
        body_en: "Core workout logging can be used offline. Sync, social features, purchases, and some services may require internet, iCloud, or Apple services."
      },
      {
        id: "compatibility",
        title: "Compatibilidad del ecosistema Apple",
        title_en: "Apple ecosystem compatibility",
        body: "Las funciones de Apple Watch, widgets, Live Activities, Atajos, controles del sistema y Apple Salud dependen de dispositivos compatibles, permisos y versiones de iOS, iPadOS o watchOS.",
        body_en: "Apple Watch, widgets, Live Activities, Shortcuts, system controls, and Apple Health features depend on compatible devices, permissions, and iOS, iPadOS, or watchOS versions."
      },
      {
        id: "social-age",
        title: "Comunidad y edad mínima",
        title_en: "Community and minimum age",
        body: "Las funciones sociales son opcionales y están destinadas a personas de 13 años o más. El contenido que publiques puede ser visible para otros usuarios; evita compartir información sensible o de ubicación precisa.",
        body_en: "Social features are optional and intended for people aged 13 or older. Content you post may be visible to other users; avoid sharing sensitive information or precise location."
      }
    ],
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
    platform: ["iOS", "iPadOS", "watchOS"],
    supportEmail: "romerodev.app+shield@gmail.com",
    iconUrl: "assets/images/shield/maskid-appstore-icon.webp",
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
    appStoreUrl: "https://apps.apple.com/es/app/maskid-protege-datos-privados/id6790398619",
    primaryCtaLabel: "Consíguelo en el App Store",
    primaryCtaLabel_en: "Get it on the App Store",
    primaryCtaUrl: "https://apps.apple.com/es/app/maskid-protege-datos-privados/id6790398619",
    secondaryCtaLabel: "Ver funciones",
    secondaryCtaLabel_en: "View features",
    secondaryCtaUrl: "/apps/shield#features",
    colorPrimary: "#e6b900",
    colorSecondary: "#22c55e",
    updatedAt: "2026-10-03",
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
    status: "published",
    featured: true,
    category: "Finanzas",
    category_en: "Finance",
    platform: ["iOS", "iPadOS", "watchOS"],
    supportEmail: "romerodev.app@gmail.com",
    iconUrl: "assets/images/upledger/upledger-appstore-icon.webp",
    screenshots: ["Resumen", "Facturas", "Capturar", "Plan", "Libro", "Tendencias", "Hogar", "Cuentas", "Detalle", "Ajustes"],
    appStoreUrl: "https://apps.apple.com/es/app/upledger-finanzas-personales/id6797293742",
    version: "1.1.2",
    primaryCtaLabel: "Descargar en el App Store",
    primaryCtaLabel_en: "Get it on the App Store",
    primaryCtaUrl: "https://apps.apple.com/es/app/upledger-finanzas-personales/id6797293742",
    secondaryCtaLabel: "Centro de soporte",
    secondaryCtaLabel_en: "Support center",
    secondaryCtaUrl: "/es/casos/upledger/soporte/",
    colorPrimary: "#2563eb",
    colorSecondary: "#14b8a6",
    updatedAt: "2026-10-11",
    promotionalText: "Oferta anual de evento visible en App Store España: 11,49 € durante la campaña. Apple muestra las condiciones y el precio de renovación antes de confirmar.",
    promotionalText_en: "Event annual offer currently shown in the Spanish App Store: €11.49 during the campaign. Apple shows renewal terms and price before confirmation.",
    seo: {
      title: "UpLedger: finanzas personales privadas y claras | RomeroDev",
      description: "Gestiona cuentas, gastos, presupuestos, patrimonio y previsiones desde iPhone o iPad con UpLedger.",
      keywords: "ingresos,dinero,hogar,control,cuenta,tarjeta,movimiento,recibo,meta,calendario,registro,diario,saldo",
      keywords_en: "spending,tracker,income,savings,household,receipt,transaction,account,calendar,plan,organizer,record"
    },
    pricing: [
      { name: "Mensual", name_en: "Monthly", price: "2,99 €", cadence: "/mes", cadence_en: "/month", description: "Precio observado en App Store España; Apple muestra el importe final por territorio.", description_en: "Price observed in the Spanish App Store; Apple shows the final amount for each territory.", isIndicative: true },
      { name: "Anual", name_en: "Annual", price: "11,49 €", cadence: "/año", cadence_en: "/year", description: "Oferta anual de evento observada en App Store España; el precio estándar es 22,99 € y las condiciones de renovación aparecen antes de confirmar.", description_en: "Event annual offer observed in the Spanish App Store; the standard price is €22.99 and renewal terms appear before confirmation.", badge: "Oferta de evento −50%", badge_en: "50% event offer", featured: true, isIndicative: true },
      { name: "Vitalicio", name_en: "Lifetime", price: "49,99 €", cadence: "pago único", cadence_en: "one-time", description: "Compra única observada en App Store España.", description_en: "One-time purchase observed in the Spanish App Store.", isIndicative: true }
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
    status: "published",
    featured: true,
    category: "Productividad",
    category_en: "Productivity",
    platform: ["iOS", "iPadOS"],
    supportEmail: "romerodev.app+renuvia@gmail.com",
    supportedLocales: ["es", "en"],
    iconUrl: "assets/images/renuvia/renuvia-appstore-icon.webp",
    coverImageUrl: "assets/images/renuvia/screens/01_radar_es.png",
    videoUrl: "assets/videos/renuvia/renuvia-hero.mp4",
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
    appStoreUrl: "https://apps.apple.com/es/app/renuvia-vencimientos/id6804756403",
    primaryCtaLabel: "Descargar en el App Store",
    primaryCtaLabel_en: "Get it on the App Store",
    primaryCtaUrl: "https://apps.apple.com/es/app/renuvia-vencimientos/id6804756403",
    secondaryCtaLabel: "Soporte de la app",
    secondaryCtaLabel_en: "App support",
    secondaryCtaUrl: "/es/casos/renuvia/soporte/",
    colorPrimary: "#4f46e5",
    colorSecondary: "#22d3ee",
    publishedAt: "2026-09-09",
    updatedAt: "2026-10-03",
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
    const [linksResult, mediaResult, snapshotsResult, reviewsResult, auditsResult, changelogResult, localizationResult, featureComparisonsResult] = await Promise.all([
      supabase.from("app_links").select("*").order("sort_order", { ascending: true }),
      supabase.from("app_media").select("*").order("sort_order", { ascending: true }),
      supabase.from("app_store_snapshots").select("*"),
      supabase.from("app_reviews").select("*").eq("is_published", true).order("review_date", { ascending: false }),
      supabase.from("app_catalog_audits").select("*"),
      supabase.from("app_changelog").select("*").order("release_date", { ascending: false }),
      supabase.from("app_changelog_localizations").select("*"),
      supabase.from("app_feature_comparisons").select("*").order("sort_order", { ascending: true })
    ]);
    const dbLinks = linksResult.data ?? [];
    const dbMedia = mediaResult.data ?? [];
    const dbSnapshots = snapshotsResult.data ?? [];
    const dbReviews = reviewsResult.data ?? [];
    const dbAudits = auditsResult.data ?? [];
    const dbChangelog = changelogResult.data ?? [];
    const dbChangelogLocalizations = localizationResult.data ?? [];
    const dbFeatureComparisons = featureComparisonsResult.data ?? [];

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
        const featureComparisons = dbFeatureComparisons
          .filter((comparison) => comparison.app_id === app.id)
          .map((comparison) => ({
            id: comparison.id,
            appId: comparison.app_id,
            featureKey: comparison.feature_key,
            title: comparison.title,
            title_en: comparison.title_en || undefined,
            freeStatus: comparison.free_status,
            freeDetail: comparison.free_detail,
            freeDetail_en: comparison.free_detail_en || undefined,
            proStatus: comparison.pro_status,
            proDetail: comparison.pro_detail,
            proDetail_en: comparison.pro_detail_en || undefined,
            sortOrder: comparison.sort_order ?? 0,
            isEnabled: comparison.is_enabled !== false,
            sourceNote: comparison.source_note || undefined,
          }));

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
          featureComparisons: featureComparisons.length ? featureComparisons : undefined,
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

  const longerList = <T,>(candidate: T[] | undefined, fallback: T[] | undefined): T[] | undefined => {
    if (!candidate?.length) return fallback;
    if (!fallback?.length || candidate.length >= fallback.length) return candidate;
    return fallback;
  };

  const textOr = (candidate: string | undefined, fallback: string): string => candidate?.trim() || fallback;
  const optionalTextOr = (candidate: string | undefined, fallback: string | undefined): string | undefined => candidate?.trim() || fallback;

  const mergeLegalPage = (
    fallback: AppItem["legal"]["privacy"],
    candidate: AppItem["legal"]["privacy"] | undefined
  ): AppItem["legal"]["privacy"] => ({
    ...fallback,
    ...candidate,
    title: textOr(candidate?.title, fallback.title),
    title_en: optionalTextOr(candidate?.title_en, fallback.title_en),
    updatedAt: textOr(candidate?.updatedAt, fallback.updatedAt),
    body: candidate?.body?.length ? candidate.body : fallback.body,
    body_en: candidate?.body_en?.length ? candidate.body_en : fallback.body_en
  });

  for (const dbApp of dbApps) {
    const idx = merged.findIndex(
      (a) => a.slug === dbApp.slug || a.legacySlugs?.includes(dbApp.slug)
    );
    if (idx >= 0) {
      const fallback = merged[idx];
      const isCulminaStoreReviewListing = fallback.slug === "culmina";
      const isVitalsBudPublicListing = fallback.slug === "vitalsbud";
      const isVitalsPathCurrentListing = fallback.slug === "vitalspath";
      const isStreakRepsCurrentListing = fallback.slug === "reps";
      const isUpLedgerCurrentListing = fallback.slug === "upledger";
      const fallbackHasConfiguredPrice = fallback.pricing?.some(
        (plan) => !/precio en app store|en desarrollo/i.test(plan.price)
      );
      merged[idx] = {
        ...fallback,
        ...dbApp,
        id: fallback.id,
        slug: fallback.slug,
        legacySlugs: fallback.legacySlugs,
        name: fallback.name,
        status: isCulminaStoreReviewListing || isVitalsBudPublicListing ? fallback.status : dbApp.status,
        // Supabase is the editable layer, but empty/short fields must never
        // erase the curated product record or its real media assets.
        tagline: isVitalsBudPublicListing || isStreakRepsCurrentListing ? fallback.tagline : textOr(dbApp.tagline, fallback.tagline),
        tagline_en: isVitalsBudPublicListing || isStreakRepsCurrentListing ? fallback.tagline_en : optionalTextOr(dbApp.tagline_en, fallback.tagline_en),
        shortDescription: isVitalsBudPublicListing || isVitalsPathCurrentListing || isStreakRepsCurrentListing ? fallback.shortDescription : textOr(dbApp.shortDescription, fallback.shortDescription),
        shortDescription_en: isVitalsBudPublicListing || isVitalsPathCurrentListing || isStreakRepsCurrentListing ? fallback.shortDescription_en : optionalTextOr(dbApp.shortDescription_en, fallback.shortDescription_en),
        longDescription: isVitalsBudPublicListing || isStreakRepsCurrentListing ? fallback.longDescription : textOr(dbApp.longDescription, fallback.longDescription),
        longDescription_en: isVitalsBudPublicListing || isStreakRepsCurrentListing ? fallback.longDescription_en : optionalTextOr(dbApp.longDescription_en, fallback.longDescription_en),
        problem: isStreakRepsCurrentListing ? fallback.problem : textOr(dbApp.problem, fallback.problem),
        problem_en: isStreakRepsCurrentListing ? fallback.problem_en : optionalTextOr(dbApp.problem_en, fallback.problem_en),
        benefits: isVitalsBudPublicListing || isStreakRepsCurrentListing ? fallback.benefits : longerList(dbApp.benefits, fallback.benefits) ?? [],
        benefits_en: isVitalsBudPublicListing || isStreakRepsCurrentListing ? fallback.benefits_en : longerList(dbApp.benefits_en, fallback.benefits_en),
        features: isVitalsBudPublicListing || isStreakRepsCurrentListing ? fallback.features : longerList(dbApp.features, fallback.features) ?? [],
        features_en: isVitalsBudPublicListing || isStreakRepsCurrentListing ? fallback.features_en : longerList(dbApp.features_en, fallback.features_en),
        audience: isVitalsBudPublicListing ? fallback.audience : textOr(dbApp.audience, fallback.audience),
        audience_en: isVitalsBudPublicListing ? fallback.audience_en : optionalTextOr(dbApp.audience_en, fallback.audience_en),
        category: textOr(dbApp.category, fallback.category),
        category_en: optionalTextOr(dbApp.category_en, fallback.category_en),
        platform: isStreakRepsCurrentListing ? fallback.platform : longerList(dbApp.platform, fallback.platform) ?? fallback.platform,
        supportEmail: textOr(dbApp.supportEmail, fallback.supportEmail),
        appStoreUrl: isVitalsBudPublicListing ? fallback.appStoreUrl : optionalTextOr(dbApp.appStoreUrl, fallback.appStoreUrl),
        websiteUrl: optionalTextOr(dbApp.websiteUrl, fallback.websiteUrl),
        videoUrl: isVitalsBudPublicListing ? fallback.videoUrl : optionalTextOr(dbApp.videoUrl, fallback.videoUrl),
        iconUrl: isVitalsBudPublicListing ? fallback.iconUrl : optionalTextOr(dbApp.iconUrl, fallback.iconUrl),
        coverImageUrl: isVitalsBudPublicListing ? fallback.coverImageUrl : optionalTextOr(dbApp.coverImageUrl, fallback.coverImageUrl),
        screenshots: isVitalsBudPublicListing ? fallback.screenshots : longerList(dbApp.screenshots, fallback.screenshots) ?? [],
        links: isVitalsBudPublicListing ? fallback.links : dbApp.links?.length ? dbApp.links : fallback.links,
        media: isVitalsBudPublicListing ? fallback.media : dbApp.media?.length ? dbApp.media : fallback.media,
        bundleIdentifier: dbApp.bundleIdentifier ?? fallback.bundleIdentifier,
        version: isVitalsBudPublicListing ? undefined : isCulminaStoreReviewListing ? fallback.version : dbApp.version ?? fallback.version,
        buildNumber: isVitalsBudPublicListing ? undefined : isCulminaStoreReviewListing ? fallback.buildNumber : dbApp.buildNumber ?? fallback.buildNumber,
        supportedLocales: isVitalsBudPublicListing ? fallback.supportedLocales : dbApp.supportedLocales?.length ? dbApp.supportedLocales : fallback.supportedLocales,
        followEnabled: dbApp.followEnabled ?? fallback.followEnabled,
        completeness: isVitalsBudPublicListing ? fallback.completeness : dbApp.completeness ?? fallback.completeness,
        appStore: isVitalsBudPublicListing ? undefined : dbApp.appStore ?? fallback.appStore,
        changelog: isVitalsBudPublicListing ? undefined : dbApp.changelog?.length ? dbApp.changelog : fallback.changelog,
        appStoreReviews: dbApp.appStoreReviews?.length ? dbApp.appStoreReviews : fallback.appStoreReviews,
        averageRating: dbApp.averageRating ?? fallback.averageRating,
        userRatingCount: dbApp.userRatingCount ?? fallback.userRatingCount,
        promotionalText: isUpLedgerCurrentListing ? fallback.promotionalText : optionalTextOr(dbApp.promotionalText, fallback.promotionalText),
        promotionalText_en: isUpLedgerCurrentListing ? fallback.promotionalText_en : optionalTextOr(dbApp.promotionalText_en, fallback.promotionalText_en),
        primaryCtaLabel: isVitalsBudPublicListing ? fallback.primaryCtaLabel : textOr(dbApp.primaryCtaLabel, fallback.primaryCtaLabel),
        primaryCtaLabel_en: isVitalsBudPublicListing ? fallback.primaryCtaLabel_en : optionalTextOr(dbApp.primaryCtaLabel_en, fallback.primaryCtaLabel_en),
        primaryCtaUrl: isVitalsBudPublicListing ? fallback.primaryCtaUrl : textOr(dbApp.primaryCtaUrl, fallback.primaryCtaUrl),
        secondaryCtaLabel: optionalTextOr(dbApp.secondaryCtaLabel, fallback.secondaryCtaLabel),
        secondaryCtaLabel_en: optionalTextOr(dbApp.secondaryCtaLabel_en, fallback.secondaryCtaLabel_en),
        secondaryCtaUrl: optionalTextOr(dbApp.secondaryCtaUrl, fallback.secondaryCtaUrl),
        colorPrimary: optionalTextOr(dbApp.colorPrimary, fallback.colorPrimary),
        colorSecondary: optionalTextOr(dbApp.colorSecondary, fallback.colorSecondary),
        updatedAt: isCulminaStoreReviewListing || isVitalsBudPublicListing ? fallback.updatedAt : textOr(dbApp.updatedAt, fallback.updatedAt),
        pricing: isVitalsBudPublicListing ? fallback.pricing : fallbackHasConfiguredPrice
          ? fallback.pricing
          : longerList(dbApp.pricing, fallback.pricing),
        freeFeatures: isCulminaStoreReviewListing || isVitalsBudPublicListing || isVitalsPathCurrentListing ? fallback.freeFeatures : longerList(dbApp.freeFeatures, fallback.freeFeatures),
        freeFeatures_en: isCulminaStoreReviewListing || isVitalsBudPublicListing || isVitalsPathCurrentListing ? fallback.freeFeatures_en : longerList(dbApp.freeFeatures_en, fallback.freeFeatures_en),
        proFeatures: isCulminaStoreReviewListing || isVitalsBudPublicListing ? fallback.proFeatures : longerList(dbApp.proFeatures, fallback.proFeatures),
        proFeatures_en: isCulminaStoreReviewListing || isVitalsBudPublicListing ? fallback.proFeatures_en : longerList(dbApp.proFeatures_en, fallback.proFeatures_en),
        faq: isCulminaStoreReviewListing || isVitalsBudPublicListing || isStreakRepsCurrentListing ? fallback.faq : longerList(dbApp.faq, fallback.faq) ?? [],
        tutorials: isStreakRepsCurrentListing ? fallback.tutorials : dbApp.tutorials ?? fallback.tutorials,
        disclosures: isStreakRepsCurrentListing ? fallback.disclosures : dbApp.disclosures ?? fallback.disclosures,
        featureComparisons: isCulminaStoreReviewListing || isVitalsBudPublicListing
          ? fallback.featureComparisons ?? getFallbackAppFeatureComparisons(fallback.slug)
          : dbApp.featureComparisons?.length ? dbApp.featureComparisons : fallback.featureComparisons ?? getFallbackAppFeatureComparisons(fallback.slug),
        seo: {
          ...fallback.seo,
          title: isVitalsBudPublicListing ? fallback.seo.title : textOr(dbApp.seo.title, fallback.seo.title),
          description: isVitalsBudPublicListing || isStreakRepsCurrentListing ? fallback.seo.description : textOr(dbApp.seo.description, fallback.seo.description),
          keywords: optionalTextOr(dbApp.seo.keywords, fallback.seo.keywords),
          keywords_en: optionalTextOr(dbApp.seo.keywords_en, fallback.seo.keywords_en),
          image: optionalTextOr(dbApp.seo.image, fallback.seo.image)
        },
        legal: {
          privacy: mergeLegalPage(fallback.legal.privacy, isStreakRepsCurrentListing ? undefined : dbApp.legal.privacy),
          terms: mergeLegalPage(fallback.legal.terms, isStreakRepsCurrentListing ? undefined : dbApp.legal.terms),
          subscriptions: isCulminaStoreReviewListing || isStreakRepsCurrentListing
            ? fallback.legal.subscriptions
            : fallback.legal.subscriptions || dbApp.legal.subscriptions
              ? mergeLegalPage(fallback.legal.subscriptions ?? dbApp.legal.subscriptions!, dbApp.legal.subscriptions)
              : undefined,
          safety: fallback.legal.safety || dbApp.legal.safety
            ? mergeLegalPage(fallback.legal.safety ?? dbApp.legal.safety!, dbApp.legal.safety)
            : undefined
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
