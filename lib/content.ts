import type { AppItem, FaqItem, HomeSection, Testimonial } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";

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
  },
  {
    id: "focusflow",
    slug: "focusflow",
    name: "FocusFlow",
    tagline: "Planifica sesiones profundas sin friccion.",
    shortDescription:
      "Una app iOS para organizar bloques de foco, revisar progreso y proteger tiempo de trabajo real.",
    longDescription:
      "FocusFlow combina planificacion ligera, temporizadores flexibles y revision diaria para ayudar a profesionales independientes a trabajar con mas intencion.",
    problem:
      "Muchos profesionales empiezan el dia con demasiadas tareas y poca claridad sobre que merece su mejor energia.",
    benefits: [
      "Reduce el coste mental de decidir que hacer a continuacion.",
      "Convierte bloques de tiempo en compromisos visibles.",
      "Ayuda a revisar el dia sin hojas de calculo ni configuracion pesada."
    ],
    features: [
      "Bloques de foco con duracion ajustable",
      "Revision diaria y semanal",
      "Recordatorios locales",
      "Historial privado en el dispositivo"
    ],
    audience: "Freelancers, founders y equipos pequeños que quieren proteger trabajo profundo.",
    status: "coming_soon",
    featured: true,
    category: "Productividad",
    platform: ["iOS", "iPadOS"],
    supportEmail: "support@example.com",
    screenshots: ["Plan del dia", "Temporizador", "Revision semanal"],
    primaryCtaLabel: "Ver detalle",
    primaryCtaUrl: "/apps/focusflow",
    secondaryCtaLabel: "Soporte",
    secondaryCtaUrl: "/apps/focusflow/support",
    updatedAt: "2026-06-06",
    seo: {
      title: "FocusFlow - App iOS para trabajo profundo",
      description:
        "Descubre FocusFlow, una app iOS para planificar sesiones de foco, revisar progreso y proteger tiempo de trabajo."
    },
    faq: [
      {
        question: "¿FocusFlow esta publicada en App Store?",
        answer:
          "Todavia esta en preparacion. La pagina se actualizara con el enlace de App Store cuando este disponible."
      },
      {
        question: "¿La app sincroniza datos en la nube?",
        answer:
          "La primera version prioriza privacidad y datos locales. Las funciones de sincronizacion se documentaran antes de publicarse."
      }
    ],
    legal: {
      privacy: {
        title: "Politica de privacidad de FocusFlow",
        updatedAt: "2026-06-06",
        body: [
          "FocusFlow esta diseñada para minimizar la recopilacion de datos personales.",
          "Los datos de sesiones y revisiones se usan para ofrecer la funcionalidad principal de la app.",
          "Si se añaden servicios de sincronizacion o analitica, esta politica se actualizara antes de su activacion."
        ]
      },
      terms: {
        title: "Terminos y condiciones de FocusFlow",
        updatedAt: "2026-06-06",
        body: [
          "FocusFlow se ofrece como herramienta de productividad personal.",
          "El usuario es responsable de revisar que la app se ajusta a su flujo de trabajo y obligaciones.",
          "Las condiciones podran actualizarse cuando se publiquen nuevas funciones o planes comerciales."
        ]
      }
    }
  },
  {
    id: "receiptkit",
    slug: "receiptkit",
    name: "ReceiptKit",
    tagline: "Captura gastos y encuentra recibos en segundos.",
    shortDescription:
      "Una utilidad movil para ordenar recibos, fotografias de tickets y notas de gasto con busqueda rapida.",
    longDescription:
      "ReceiptKit ayuda a convertir tickets dispersos en un archivo claro, etiquetado y facil de consultar para cierres mensuales o proyectos.",
    problem:
      "Los recibos suelen perderse entre fotos, chats y correos justo cuando hace falta justificar un gasto.",
    benefits: [
      "Centraliza justificantes con una experiencia movil simple.",
      "Facilita encontrar gastos por proyecto, fecha o categoria.",
      "Prepara el terreno para exportaciones contables futuras."
    ],
    features: [
      "Captura guiada de tickets",
      "Etiquetas por proyecto",
      "Busqueda por importe y fecha",
      "Exportacion preparada para proximas versiones"
    ],
    audience: "Autonomos, consultores y pequeñas empresas con gastos recurrentes.",
    status: "draft",
    featured: true,
    category: "Finanzas",
    platform: ["iOS"],
    supportEmail: "support@example.com",
    screenshots: ["Captura", "Archivo", "Detalle de recibo"],
    primaryCtaLabel: "Explorar app",
    primaryCtaUrl: "/apps/receiptkit",
    secondaryCtaLabel: "Privacidad",
    secondaryCtaUrl: "/apps/receiptkit/privacy",
    updatedAt: "2026-06-06",
    seo: {
      title: "ReceiptKit - Organizador de recibos para iOS",
      description:
        "ReceiptKit es una app iOS para capturar, ordenar y encontrar recibos y justificantes de gasto."
    },
    faq: [
      {
        question: "¿ReceiptKit sustituye a una asesoria?",
        answer:
          "No. Es una herramienta de organizacion. La validacion fiscal o contable debe realizarla un profesional cualificado."
      },
      {
        question: "¿Puedo solicitar soporte?",
        answer:
          "Si. La pagina de soporte de la app incluye email y pasos para enviar contexto util."
      }
    ],
    legal: {
      privacy: {
        title: "Politica de privacidad de ReceiptKit",
        updatedAt: "2026-06-06",
        body: [
          "ReceiptKit tratara imagenes y metadatos de recibos solo para prestar las funciones solicitadas por el usuario.",
          "No deben subirse documentos con datos sensibles que no sean necesarios para la gestion del gasto.",
          "La version publicada detallara cualquier proveedor externo usado para almacenamiento, sincronizacion o analitica."
        ]
      },
      terms: {
        title: "Terminos y condiciones de ReceiptKit",
        updatedAt: "2026-06-06",
        body: [
          "ReceiptKit no ofrece asesoramiento fiscal, contable ni legal.",
          "El usuario debe conservar los justificantes originales cuando asi lo exija la normativa aplicable.",
          "Las funcionalidades pueden cambiar durante el desarrollo y se comunicaran en la pagina publica de la app."
        ]
      }
    }
  }
];

export const homeSections: HomeSection[] = [
  {
    title: "Producto antes que plantilla",
    body: "Cada app se presenta con contexto, problema, beneficios, soporte y documentacion legal preparada para publicacion."
  },
  {
    title: "Base estatica, contenido dinamico",
    body: "El sitio exporta a GitHub Pages y se conecta a Supabase para administrar contenido, assets y contactos."
  },
  {
    title: "SEO tecnico desde el inicio",
    body: "Metadatos, sitemap, datos estructurados y rutas limpias forman parte de la base, no de una fase posterior."
  }
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "La combinacion de criterio de producto y ejecucion tecnica reduce mucho el ruido antes de publicar.",
    name: "Cliente beta",
    role: "Founder SaaS"
  },
  {
    quote:
      "El enfoque en soporte, privacidad y App Store evita improvisar justo antes del lanzamiento.",
    name: "Colaborador",
    role: "Diseño de producto"
  }
];

export const generalFaq: FaqItem[] = [
  {
    question: "¿Puedes desarrollar una app completa desde cero?",
    answer:
      "Si. El foco esta en apps iOS y productos digitales con estrategia, UI, desarrollo, preparacion de publicacion y soporte."
  },
  {
    question: "¿Este sitio funciona sin servidor propio?",
    answer:
      "Si. El frontend se exporta como estatico para GitHub Pages. Supabase cubre autenticacion, base de datos, storage y reglas de acceso."
  },
  {
    question: "¿Como se actualizan las paginas legales de una app?",
    answer:
      "Pueden editarse desde el panel admin y guardarse en Supabase. Para rutas nuevas se recomienda lanzar un nuevo deploy estatico."
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

    return dbApps.map((app): AppItem => {
      const faq = (dbFaqs ?? [])
        .filter((f) => f.app_id === app.id)
        .map((f) => ({ question: f.question, answer: f.answer }));

      const privacyPage = (dbLegal ?? []).find((l) => l.app_id === app.id && l.kind === "privacy");
      const termsPage = (dbLegal ?? []).find((l) => l.app_id === app.id && l.kind === "terms");

      return {
        id: app.id,
        slug: app.slug,
        name: app.name,
        tagline: app.tagline,
        shortDescription: app.short_description,
        longDescription: app.long_description,
        problem: app.problem || "",
        benefits: app.benefits || [],
        features: app.features || [],
        audience: app.audience || "",
        status: app.status as any,
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
        primaryCtaUrl: app.primary_cta_url,
        secondaryCtaLabel: app.secondary_cta_label || undefined,
        secondaryCtaUrl: app.secondary_cta_url || undefined,
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
            updatedAt: privacyPage?.updated_at ? new Date(privacyPage.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
            body: privacyPage?.body ? privacyPage.body.split("\n").filter(Boolean) : []
          },
          terms: {
            title: termsPage?.title || `Términos y condiciones de ${app.name}`,
            updatedAt: termsPage?.updated_at ? new Date(termsPage.updated_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
            body: termsPage?.body ? termsPage.body.split("\n").filter(Boolean) : []
          }
        }
      };
    });
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
