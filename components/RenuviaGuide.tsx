import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, CircleAlert, FileText, HelpCircle, LifeBuoy, ShieldCheck } from "lucide-react";
import type { LocaleCode } from "@/lib/types";
import { getAppPath, getAppSubpagePath } from "@/lib/routes";

type GuideSection = {
  id: string;
  title: string;
  intro: string;
  steps: string[];
  note: string;
};

type GuideCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  contentsTitle: string;
  sections: GuideSection[];
  limitsTitle: string;
  limitsIntro: string;
  freeTitle: string;
  freeLimits: string[];
  proTitle: string;
  proBenefits: string[];
  caveatsTitle: string;
  caveats: string[];
  linksTitle: string;
  links: { kind: "faq" | "privacy" | "terms" | "subscriptions" | "support"; label: string }[];
};

const copy: Record<LocaleCode, GuideCopy> = {
  es: {
    eyebrow: "Centro de ayuda de Renuvia",
    title: "Guía de uso, privacidad y límites",
    intro: "Pasos para registrar una renovación, revisar una captura, preparar requisitos y entender qué guarda la app. Las fechas y condiciones siempre deben contrastarse con el documento original.",
    updated: "Revisada el 13 de octubre de 2026",
    contentsTitle: "Ir a una sección",
    sections: [
      {
        id: "quick-add",
        title: "1. Crea un expediente",
        intro: "El alta manual es la forma más directa de empezar y no requiere conexión, cámara, OCR ni cuenta.",
        steps: [
          "En el Radar, pulsa Añadir y elige la entrada manual.",
          "Selecciona una categoría o playbook. Puedes adaptar la lista de preparación a tu caso.",
          "Introduce la fecha de vencimiento o renovación que aparece en la fuente original. Añade emisor, referencia, responsable, coste y periodicidad si los conoces.",
          "Si el contrato especifica renovación automática, fecha límite o días de preaviso, regístralos tal como aparecen. Guarda y revisa el estado y la siguiente acción en el expediente."
        ],
        note: "Una fecha de renovación y una fecha límite para decidir pueden ser distintas. No conviertas una en otra sin revisar el contrato."
      },
      {
        id: "capture",
        title: "2. Captura y revisa un documento",
        intro: "La captura puede comenzar con cámara, Fotos, un PDF o un código de barras, según el material que tengas.",
        steps: [
          "Elige el tipo de captura en la app e importa solo el documento necesario.",
          "Espera las sugerencias de texto. La extracción se procesa en el dispositivo.",
          "En la pantalla de revisión, compara título, emisor, fecha, importe y URL con el original; corrige o completa lo que falte.",
          "Confirma y guarda únicamente después de revisar. Si el texto no se reconoce, crea o completa el expediente manualmente."
        ],
        note: "OCR y lectura de códigos ayudan a transcribir; no certifican el contenido. Un formato borroso, girado, recortado o ambiguo puede producir campos vacíos o incorrectos."
      },
      {
        id: "prepare",
        title: "3. Prepara los requisitos",
        intro: "Cada renovación reúne los datos de referencia y el trabajo pendiente en un mismo expediente.",
        steps: [
          "Abre un expediente y confirma quién lo emite, qué referencia lo identifica y quién se ocupa.",
          "Usa la checklist inicial para marcar los pasos completados. Comprueba los requisitos vigentes con el organismo o proveedor correspondiente.",
          "Añade los documentos necesarios y marca cada requisito cuando lo hayas reunido.",
          "Usa la siguiente acción sugerida para decidir si toca completar datos, reunir documentos, revisar requisitos, contactar con el emisor o registrar la renovación."
        ],
        note: "Los playbooks son listas de preparación iniciales. No son listas oficiales de organismos, aseguradoras o proveedores."
      },
      {
        id: "decide",
        title: "4. Registra la decisión y el resultado",
        intro: "El expediente conserva qué decidiste y qué pasó después.",
        steps: [
          "Elige mantener, cancelar, revisar, negociar, cambiar de proveedor o recibir un recordatorio más adelante.",
          "Renuvia puede abrir el enlace del proveedor para que completes allí la gestión; la app no cancela ni renueva por ti.",
          "Cuando una acción termine, márcala como completada y conserva una prueba si es útil.",
          "Al registrar una renovación, Renuvia guarda la fecha anterior, la nueva fecha y cuándo registraste el cambio."
        ],
        note: "El ahorro se cuenta como resultado solo después de completar una cancelación o cambio antes del objetivo del compromiso. No es una previsión ni un dato bancario verificado."
      },
      {
        id: "notifications",
        title: "5. Configura avisos y calendario",
        intro: "Renuvia programa avisos locales en el dispositivo. Los permisos se piden al utilizar la función correspondiente.",
        steps: [
          "Activa Notificaciones cuando la app te lo solicite y permite los avisos en Ajustes de iOS/iPadOS.",
          "Configura el calendario, Recordatorios o el patrón de avisos solo si quieres integrar esas funciones.",
          "Consulta el estado del permiso y los avisos pendientes desde los ajustes de la app."
        ],
        note: "iOS controla la entrega final. Modos de concentración, permisos y políticas del sistema pueden silenciar o retrasar un aviso. iOS admite hasta 64 notificaciones locales pendientes por app; Renuvia prioriza las fechas más cercanas."
      },
      {
        id: "privacy",
        title: "6. Entiende almacenamiento, iCloud y exportación",
        intro: "El flujo principal funciona localmente y no necesita una cuenta de Renuvia.",
        steps: [
          "La entrada manual, el OCR y la revisión se realizan en el dispositivo. Cámara, Fotos, Archivos, Calendario y Notificaciones se solicitan al activar cada función.",
          "Si activas iCloud Pro, los datos del expediente se sincronizan en tu base privada de Apple. La sincronización requiere que iCloud esté disponible.",
          "Los archivos adjuntos de imagen y PDF permanecen en el almacenamiento local de cada dispositivo y no se transfieren mediante la sincronización iCloud.",
          "La exportación CSV/JSON es una función Pro. JSON incluye los datos del expediente y metadatos de adjuntos, pero no copia los archivos adjuntos."
        ],
        note: "Conserva los originales en Fotos o Archivos si necesitas trasladar imágenes o PDF a otro dispositivo. Renuvia no elimina esos originales."
      }
    ],
    limitsTitle: "Planes y límites actuales",
    limitsIntro: "El plan y las ofertas disponibles pueden depender de tu cuenta y territorio. Antes de comprar, Apple muestra el precio, la duración y las condiciones finales.",
    freeTitle: "Renuvia Free",
    freeLimits: [
      "Hasta 7 expedientes activos.",
      "3 capturas OCR o de código de barras por mes.",
      "1 archivo adjunto por expediente.",
      "Alta manual sin conexión, Radar, playbooks esenciales y avisos locales."
    ],
    proTitle: "Renuvia Pro",
    proBenefits: [
      "Expedientes y capturas sin límite.",
      "Categorías personalizadas y recordatorios con intervalos configurables.",
      "Más de un archivo adjunto por expediente.",
      "Exportación/restauración CSV/JSON y sincronización privada opcional con iCloud."
    ],
    caveatsTitle: "Notas y limitaciones",
    caveats: [
      "Renuvia es una herramienta de organización, no ofrece asesoramiento legal, financiero, médico, fiscal ni contractual.",
      "No confirma la validez de contratos, fechas, importes, requisitos ni documentos; verifica la fuente antes de actuar.",
      "Una fecha límite de decisión solo aparece si introduces la fecha exacta o un plazo de preaviso explícito. Si no se conoce, la app lo indica.",
      "No contacta con proveedores, no cancela suscripciones y no ejecuta renovaciones en tu nombre.",
      "Los avisos dependen de iOS y se programan localmente; no sustituyen un sistema de emergencia o una confirmación del proveedor.",
      "La sincronización iCloud cubre datos del expediente; los archivos adjuntos permanecen locales. No hay un espacio web de equipo o una cuenta compartida de Renuvia.",
      "Los totales y equivalentes de coste se calculan con los importes y periodicidades que introduces. Renuvia ayuda a preparar renovaciones, no es una app de presupuestos."
    ],
    linksTitle: "Documentación y ayuda",
    links: [
      { kind: "faq", label: "Preguntas frecuentes" },
      { kind: "privacy", label: "Política de privacidad" },
      { kind: "terms", label: "Términos de uso" },
      { kind: "subscriptions", label: "Condiciones de suscripción" },
      { kind: "support", label: "Contactar con soporte" }
    ]
  },
  en: {
    eyebrow: "Renuvia Help Center",
    title: "Usage guide, privacy, and limits",
    intro: "Learn to record a renewal, review a capture, prepare requirements, and understand what the app stores. Always check dates and terms against the original document.",
    updated: "Reviewed October 13, 2026",
    contentsTitle: "Jump to a section",
    sections: [
      {
        id: "quick-add",
        title: "1. Create a dossier",
        intro: "Manual entry is the simplest way to start and does not require a connection, camera, OCR, or account.",
        steps: [
          "In the Radar, tap Add and choose manual entry.",
          "Select a category or playbook. Adapt the preparation list to your situation.",
          "Enter the expiration or renewal date shown in the original source. Add the issuer, reference, owner, cost, and cadence if known.",
          "If the contract states automatic renewal, an exact deadline, or a notice period, record it as written. Save, then review the status and next action in the dossier."
        ],
        note: "A renewal date and a decision deadline can be different. Do not treat one as the other without checking the contract."
      },
      {
        id: "capture",
        title: "2. Capture and review a document",
        intro: "Start a capture with the camera, Photos, a PDF, or a barcode, depending on the material you have.",
        steps: [
          "Choose a capture type in the app and import only the document you need.",
          "Wait for text suggestions. Extraction is processed on device.",
          "On the review screen, compare the title, issuer, date, amount, and URL with the source; correct or complete anything missing.",
          "Confirm and save only after review. If text is not recognized, create or complete the dossier manually."
        ],
        note: "OCR and barcode reading help with transcription; they do not certify the source. Blurry, rotated, cropped, or ambiguous material can produce missing or incorrect fields."
      },
      {
        id: "prepare",
        title: "3. Prepare requirements",
        intro: "Each renewal keeps reference details and remaining work together in one dossier.",
        steps: [
          "Open a dossier and confirm who issued it, what reference identifies it, and who is responsible.",
          "Use the starter checklist to mark completed steps. Confirm current requirements with the relevant authority or provider.",
          "Add required documents and mark each requirement when you have gathered it.",
          "Use the suggested next action to decide whether to add details, gather documents, check requirements, contact the issuer, or record the renewal."
        ],
        note: "Playbooks are starter checklists. They are not official lists from authorities, insurers, or providers."
      },
      {
        id: "decide",
        title: "4. Record the decision and outcome",
        intro: "The dossier keeps track of what you decided and what happened next.",
        steps: [
          "Choose keep, cancel, review, negotiate, switch, or be reminded later.",
          "Renuvia can open the provider's link so you can manage the service there; the app does not cancel or renew for you.",
          "When an action is finished, mark it complete and keep proof if useful.",
          "When you record a renewal, Renuvia keeps the previous date, new date, and the date you recorded the change."
        ],
        note: "Savings count as an outcome only after a cancellation or switch is completed before the commitment target. They are not a forecast or bank-verified figure."
      },
      {
        id: "notifications",
        title: "5. Configure alerts and calendar",
        intro: "Renuvia schedules local alerts on the device. Permissions are requested when you use the related feature.",
        steps: [
          "Enable Notifications when prompted and allow alerts in iOS/iPadOS Settings.",
          "Set up Calendar, Reminders, or an alert schedule only if you want those integrations.",
          "Check permission state and pending alerts in the app settings."
        ],
        note: "iOS controls final delivery. Focus modes, permissions, and system policies can silence or delay an alert. iOS allows up to 64 pending local notifications per app; Renuvia prioritizes the nearest dates."
      },
      {
        id: "privacy",
        title: "6. Understand storage, iCloud, and export",
        intro: "The main workflow runs locally and does not require a Renuvia account.",
        steps: [
          "Manual entry, OCR, and review happen on device. Camera, Photos, Files, Calendar, and Notifications are requested when you activate each feature.",
          "If you enable iCloud Pro, dossier data syncs to your private Apple database. Sync requires iCloud to be available.",
          "Image and PDF attachments stay in each device's local app storage and are not transferred by iCloud sync.",
          "CSV/JSON export is a Pro feature. JSON includes dossier data and attachment metadata, but does not copy attachment files."
        ],
        note: "Keep the originals in Photos or Files if you need to move images or PDFs to another device. Renuvia does not delete those originals."
      }
    ],
    limitsTitle: "Current plans and limits",
    limitsIntro: "Plan access and offers can depend on your account and territory. Before purchase, Apple shows the final price, duration, and terms.",
    freeTitle: "Renuvia Free",
    freeLimits: [
      "Up to 7 active dossiers.",
      "3 OCR or barcode captures per month.",
      "1 attachment per dossier.",
      "Manual entry offline, Radar, essential playbooks, and local alerts."
    ],
    proTitle: "Renuvia Pro",
    proBenefits: [
      "Unlimited dossiers and captures.",
      "Custom categories and configurable reminder intervals.",
      "More than one attachment per dossier.",
      "CSV/JSON export and restore, plus optional private iCloud sync."
    ],
    caveatsTitle: "Notes and limitations",
    caveats: [
      "Renuvia is an organization tool. It does not provide legal, financial, medical, tax, or contractual advice.",
      "It does not verify contracts, dates, amounts, requirements, or documents; check the source before taking action.",
      "A decision deadline appears only when you enter an exact date or explicit notice period. If it is unknown, the app says so.",
      "Renuvia does not contact providers, cancel subscriptions, or carry out renewals for you.",
      "Alerts depend on iOS and are scheduled locally; they do not replace emergency systems or provider confirmation.",
      "iCloud sync covers dossier data; attachment files stay local. Renuvia does not provide a team web space or shared account.",
      "Totals and cost equivalents use the amounts and cadence you enter. Renuvia helps prepare renewals; it is not a budgeting app."
    ],
    linksTitle: "Documentation and support",
    links: [
      { kind: "faq", label: "Frequently asked questions" },
      { kind: "privacy", label: "Privacy policy" },
      { kind: "terms", label: "Terms of use" },
      { kind: "subscriptions", label: "Subscription terms" },
      { kind: "support", label: "Contact support" }
    ]
  }
};

export function RenuviaGuide({ locale }: { locale: LocaleCode }) {
  const content = copy[locale];
  const appPath = getAppPath("renuvia", locale);
  const targetFor = (kind: GuideCopy["links"][number]["kind"]) =>
    kind === "support" || kind === "faq" || kind === "privacy" || kind === "terms" || kind === "subscriptions"
      ? getAppSubpagePath("renuvia", kind, locale)
      : appPath;
  const iconFor = (kind: GuideCopy["links"][number]["kind"]) => {
    switch (kind) {
      case "faq": return HelpCircle;
      case "privacy": return ShieldCheck;
      case "terms": return FileText;
      case "subscriptions": return CheckCircle2;
      case "support": return LifeBuoy;
    }
  };

  return (
    <article className="section relative overflow-hidden bg-themed-white pt-24 md:pt-28">
      <div className="absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,var(--app-primary-soft),transparent)] opacity-80" aria-hidden="true" />
      <div className="container relative max-w-6xl">
        <Link href={appPath} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-graphite transition hover:text-brand-blue">
          <ArrowLeft size={14} />
          {locale === "es" ? "Volver a Renuvia" : "Back to Renuvia"}
        </Link>

        <header className="mt-8 max-w-4xl">
          <div className="flex items-center gap-3 text-brand-blue">
            <BookOpen size={20} aria-hidden="true" />
            <p className="text-xs font-black uppercase tracking-[0.22em]">{content.eyebrow}</p>
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">{content.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-graphite">{content.intro}</p>
          <p className="mt-4 text-xs font-semibold text-graphite">{content.updated}</p>
        </header>

        <nav className="mt-10 rounded-2xl border border-line bg-themed-mist p-5" aria-label={content.contentsTitle}>
          <h2 className="text-sm font-black text-ink">{content.contentsTitle}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {content.sections.map((section) => (
              <li key={section.id}>
                <a href={"#" + section.id} className="inline-flex min-h-10 items-center rounded-full border border-line bg-themed-card px-4 py-2 text-xs font-bold text-graphite transition hover:border-brand-blue hover:text-brand-blue">
                  {section.title}
                </a>
              </li>
            ))}
            <li><a href="#limits" className="inline-flex min-h-10 items-center rounded-full border border-line bg-themed-card px-4 py-2 text-xs font-bold text-graphite transition hover:border-brand-blue hover:text-brand-blue">{content.limitsTitle}</a></li>
          </ul>
        </nav>

        <div className="mt-10 grid gap-6">
          {content.sections.map((section) => (
            <section id={section.id} key={section.id} className="scroll-mt-28 rounded-2xl border border-line bg-themed-card p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-graphite">{section.intro}</p>
              <ol className="mt-6 grid gap-3">
                {section.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 rounded-xl bg-themed-mist/70 p-4 text-sm leading-6 text-graphite">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-xs font-black text-brand-blue">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-brand-blue/15 bg-brand-blue/5 p-4 text-sm leading-6 text-graphite">
                <CircleAlert size={18} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden="true" />
                <p>{section.note}</p>
              </div>
            </section>
          ))}
        </div>

        <section id="limits" className="scroll-mt-28 mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-line bg-themed-card p-6 sm:p-8">
            <h2 className="text-2xl font-black text-ink">{content.limitsTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-graphite">{content.limitsIntro}</p>
            <h3 className="mt-6 font-black text-ink">{content.freeTitle}</h3>
            <ul className="mt-3 grid gap-2">
              {content.freeLimits.map((limit) => <li key={limit} className="flex items-start gap-2 text-sm leading-6 text-graphite"><CheckCircle2 className="mt-1 shrink-0 text-brand-green" size={16} />{limit}</li>)}
            </ul>
            <h3 className="mt-6 font-black text-ink">{content.proTitle}</h3>
            <ul className="mt-3 grid gap-2">
              {content.proBenefits.map((benefit) => <li key={benefit} className="flex items-start gap-2 text-sm leading-6 text-graphite"><CheckCircle2 className="mt-1 shrink-0 text-brand-blue" size={16} />{benefit}</li>)}
            </ul>
            <Link href={getAppSubpagePath("renuvia", "subscriptions", locale)} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:underline">
              {locale === "es" ? "Leer condiciones de suscripción" : "Read subscription terms"}
            </Link>
          </article>

          <article className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-black text-ink"><CircleAlert className="text-amber-600" size={22} />{content.caveatsTitle}</h2>
            <ul className="mt-5 grid gap-3">
              {content.caveats.map((caveat) => <li key={caveat} className="text-sm leading-7 text-graphite">{caveat}</li>)}
            </ul>
          </article>
        </section>

        <section className="mt-10 rounded-2xl border border-line bg-slate-950 p-6 text-white sm:p-8">
          <h2 className="text-xl font-black">{content.linksTitle}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {content.links.map((item) => {
              const Icon = iconFor(item.kind);
              return (
                <Link key={item.kind} href={targetFor(item.kind)} className="flex min-h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white">
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
