import type { AppItem, FaqItem, HomeSection, Testimonial } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";
import { fetchAppStoreMetadata, fetchAppStoreReviews } from "./appstore";
import appStoreSnapshot from "@/lib/generated/appstore-data.json";
import { enrichKnownProduct } from "@/lib/product-enrichment";

type SnapshotEntry = (typeof appStoreSnapshot)[keyof typeof appStoreSnapshot];

function applyAppStoreSnapshot(app: AppItem): AppItem {
  const snapshot = appStoreSnapshot[app.id as keyof typeof appStoreSnapshot] as SnapshotEntry | undefined;
  if (!snapshot) return app;
  return {
    ...app,
    appStoreUrl: snapshot.trackViewUrl,
    primaryCtaUrl: snapshot.trackViewUrl,
    averageRating: snapshot.averageUserRating,
    userRatingCount: snapshot.userRatingCount,
    appStoreReviews: snapshot.reviews,
    appStore: {
      trackName: snapshot.trackName,
      version: snapshot.version,
      releaseNotes: snapshot.releaseNotes,
      currentVersionReleaseDate: snapshot.currentVersionReleaseDate,
      minimumOsVersion: snapshot.minimumOsVersion,
      formattedPrice: snapshot.formattedPrice,
      developer: snapshot.developer,
      languages: snapshot.languages,
      fileSizeBytes: snapshot.fileSizeBytes,
      sourceUrl: snapshot.trackViewUrl,
      syncedAt: snapshot.syncedAt
    }
  };
}

export const apps: AppItem[] = [
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
      "VitalsPath 2.0 te ayuda a planificar dosis, registrar síntomas y constantes, preparar citas y tener el contexto diario a mano con widgets, Live Activities y Apple Watch.",
    longDescription_en:
      "VitalsPath 2.0 helps you plan doses, log symptoms and vitals, manage appointments, and keep daily context at hand with widgets, Live Activities, and Apple Watch.",
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
    platform: ["iOS", "iPadOS", "watchOS"],
    supportEmail: "romerodev.apps+vitalspath@gmail.com",
    screenshots: [
      "Dashboard",
      "Medicación",
      "Síntomas",
      "Bienestar",
      "Citas",
      "Widgets",
      "Live Activity"
    ],
    appStoreUrl: "https://apps.apple.com/es/app/id6760143192",
    primaryCtaLabel: "Consíguelo en el App Store",
    primaryCtaUrl: "https://apps.apple.com/es/app/id6760143192",
    secondaryCtaLabel: "Soporte de la App",
    secondaryCtaUrl: "/apps/vitalspath/support",
    updatedAt: "2026-07-08",
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
    name: "Reps",
    tagline: "Registro de entrenamientos y análisis de sobrecarga progresiva",
    tagline_en: "Workout tracking for consistent strength progress",
    shortDescription:
      "Reps ayuda a usuarios de iPhone a crear rutinas, registrar series rápido, proteger rachas y entender su fuerza.",
    shortDescription_en:
      "Reps helps iPhone users build plans, log workouts, track streaks, and understand strength progress.",
    longDescription:
      "Una bitácora de gimnasio inteligente diseñada específicamente para iOS. Reps mantiene el plan del día, el temporizador de descanso, las notas y el historial de series en una sola pantalla enfocada para no interrumpir tu entrenamiento. Traduce tu historial en señales de recuperación y fuerza, marcas personales (PR), estimaciones de 1RM, y volumen.",
    longDescription_en:
      "A smart gym logbook designed specifically for iOS. Reps keeps the daily plan, active rest timer, notes, and set history in one focused flow, so logging never interrupts training. Translate your history into recovery signals, PRs, 1RM estimations, and volume.",
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
    status: "coming_soon",
    featured: true,
    category: "Salud y forma física",
    platform: ["iOS", "watchOS"],
    supportEmail: "romerodev.app+streakreps@gmail.com",
    screenshots: [
      "01-train-smarter",
      "02-follow-real-plan",
      "03-control-load",
      "04-see-weekly-progress",
      "05-connect-health",
      "06-map-every-muscle",
      "09-track-your-body"
    ],
    primaryCtaLabel: "Unirse a la Beta",
    primaryCtaLabel_en: "Join iOS Beta",
    primaryCtaUrl: "/contact",
    secondaryCtaLabel: "Características",
    secondaryCtaLabel_en: "Features",
    secondaryCtaUrl: "/apps/reps#features",
    colorPrimary: "#2459e0",
    colorSecondary: "#ff632e",
    updatedAt: "2026-07-11",
    seo: {
      title: "StreakReps - Registro de entrenamientos, rachas y progresión | RomeroDev",
      description: "StreakReps para iPhone y Apple Watch: rutinas, series, progresión, recuperación, rachas, Apple Health, precios, privacidad y soporte oficial."
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

    const mappedApps = await Promise.all(
      dbApps.map(async (app): Promise<AppItem> => {
        // Fetch App Store metadata and reviews if app_store_url is present
        const meta = app.app_store_url ? await fetchAppStoreMetadata(app.app_store_url) : null;
        const reviews = app.app_store_url ? await fetchAppStoreReviews(app.app_store_url) : [];

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
          platform: app.platform || [],
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
            title: `${app.name} - ${app.tagline}`,
            description: app.short_description
          },
          faq,
          legal: {
            privacy: {
              title: privacyPage?.title || `Política de privacidad de ${app.name}`,
              title_en: privacyPage?.title_en || `Privacy policy of ${app.name}`,
              updatedAt: privacyPage?.updated_at ? new Date(privacyPage.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
              body: privacyPage?.body ? privacyPage.body.split("\n").filter(Boolean) : [
                `Esta es la política de privacidad de la aplicación ${app.name}.`,
                "Nos tomamos muy en serio la privacidad de tus datos personales.",
                "Esta aplicación no recopila, almacena ni transmite ningún dato personal a servidores externos.",
                "Todos tus datos se guardan de forma local en tu dispositivo y se sincronizan a través de tu cuenta privada de iCloud."
              ],
              body_en: privacyPage?.body_en ? privacyPage.body_en.split("\n").filter(Boolean) : [
                `This is the privacy policy for the ${app.name} application.`,
                "We take the privacy of your personal data very seriously.",
                "This application does not collect, store, or transmit any personal data to external servers.",
                "All your data is saved locally on your device and synced via your private iCloud account."
              ]
            },
            terms: {
              title: termsPage?.title || `Términos y condiciones de ${app.name}`,
              title_en: termsPage?.title_en || `Terms and conditions of ${app.name}`,
              updatedAt: termsPage?.updated_at ? new Date(termsPage.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
              body: termsPage?.body ? termsPage.body.split("\n").filter(Boolean) : [
                `Estos son los términos y condiciones de uso de la aplicación ${app.name}.`,
                "Al utilizar esta aplicación, aceptas estos términos en su totalidad.",
                "El uso de la aplicación es exclusivamente personal y no comercial.",
                "El desarrollador no se hace responsable de la pérdida de datos o fallos del sistema."
              ],
              body_en: termsPage?.body_en ? termsPage.body_en.split("\n").filter(Boolean) : [
                `These are the terms and conditions of use for the ${app.name} application.`,
                "By using this application, you accept these terms in their entirety.",
                "The use of the application is solely personal and non-commercial.",
                "The developer is not responsible for data loss or system failures."
              ]
            }
          },
          averageRating: meta?.averageUserRating,
          userRatingCount: meta?.userRatingCount ?? 0,
          appStoreReviews: reviews.map((r) => ({
            author: r.author,
            rating: r.rating,
            title: r.title,
            content: r.content,
            date: new Date(r.updatedAt).toISOString().split("T")[0]
          }))
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
  const merged = [...apps];

  for (const dbApp of dbApps) {
    const idx = merged.findIndex((a) => a.slug === dbApp.slug);
    if (idx >= 0) {
      merged[idx] = dbApp;
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
  return all.find((app) => app.slug === slug);
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

// Fetch testimonials from Supabase
export async function getTestimonials(): Promise<Testimonial[]> {
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
