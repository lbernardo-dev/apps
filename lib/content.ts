import type { AppItem, FaqItem, HomeSection, Testimonial } from "@/lib/types";

export const apps: AppItem[] = [
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

export function getPublishedApps() {
  return apps.filter((app) => app.status !== "archived");
}

export function getFeaturedApps() {
  return getPublishedApps().filter((app) => app.featured);
}

export function getAppBySlug(slug: string) {
  return apps.find((app) => app.slug === slug);
}
