import type { AppItem, FaqItem, HomeSection, Testimonial } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";
import { fetchAppStoreMetadata, fetchAppStoreReviews } from "./appstore";

export const apps: AppItem[] = [
  {
    id: "vitalspath",
    slug: "vitalspath",
    name: "VitalsPath",
    tagline: "Tu recordatorio de medicación, registro de síntomas y cronología de salud privada.",
    shortDescription:
      "Controla pastillas, recetas, constantes vitales y citas médicas con precisión médica y diseño Liquid Glass.",
    longDescription:
      "VitalsPath 2.0 te ayuda a planificar dosis, registrar síntomas y constantes, preparar citas y tener el contexto diario a mano con widgets, Live Activities y Apple Watch.",
    problem:
      "Gestionar la salud familiar es más difícil de lo que debería. Múltiples apps, recordatorios fallidos, información dispersa.",
    benefits: [
      "Control de Tratamientos: Organiza medicamentos asociados a condiciones médicas.",
      "Citas Médicas: Gestiona visitas, especialistas y clínicas favoritas.",
      "Enfermedades y Condiciones: Seguimiento detallado del historial de patologías.",
      "Perfiles Familiares: Gestiona a toda tu familia desde un lugar central.",
      "Medicamentos y Dosis: Control exhaustivo de tomas, alertas y stock.",
      "Más de 100 Síntomas: Seguimiento de severidad y fases de recuperación."
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
    audience: "Familias, pacientes crónicos y personas que gestionan múltiples tratamientos de salud.",
    status: "published",
    featured: true,
    category: "Salud y Bienestar",
    platform: ["iOS", "iPadOS", "watchOS"],
    supportEmail: "vitalspath@gmail.com",
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
    updatedAt: "2026-06-08",
    seo: {
      title: "VitalsPath - Recordatorio de medicación y registro de síntomas",
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
          "Para cualquier consulta relacionada con la privacidad o el ejercicio de tus derechos RGPD (Acceso, Rectificación, Supresión, Portabilidad), puedes contactar en vitalspath@gmail.com."
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
          averageRating: meta?.averageUserRating ?? 4.9,
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

  return merged;
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
