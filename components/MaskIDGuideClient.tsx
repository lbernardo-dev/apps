"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Cloud, FileCheck2, ShieldCheck, TriangleAlert } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { useLocale } from "@/lib/i18n";
import { getAppPath, getAppSubpagePath } from "@/lib/routes";
import type { AppItem } from "@/lib/types";

type GuideCard = { title: string; body: string };

export function MaskIDGuideClient({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const isEs = locale === "es";
  const steps: GuideCard[] = isEs ? [
    { title: "1. Importa o captura", body: "Elige cámara o escáner, Fotos, Archivos, la extensión Compartir o un archivo que hayas seleccionado desde Drive o Dropbox. Trabaja sobre una copia y conserva el original que necesites." },
    { title: "2. Revisa el documento completo", body: "Comprueba que todas las páginas estén presentes y legibles. Revisa bordes, reversos, firmas, códigos QR, códigos de barras, números pequeños y texto repetido." },
    { title: "3. Aplica las máscaras", body: "Añade las máscaras manualmente. Las sugerencias OCR te ayudan a localizar campos, pero no deciden qué debes ocultar ni sustituyen tu revisión. Mueve, ajusta o elimina cada máscara que no corresponda." },
    { title: "4. Exporta y vuelve a revisar", body: "Genera una copia rasterizada. Abre el resultado exportado, amplía cada página y comprueba que la información necesaria se ve y la que querías ocultar no se lee ni aparece en otra página." },
    { title: "5. Comparte con contexto", body: "Confirma que el destinatario acepta una copia con datos ocultos y que no exige otro formato o un documento íntegro. Comparte el archivo exportado que revisaste, no el original." }
  ] : [
    { title: "1. Import or capture", body: "Choose Camera or scanner, Photos, Files, the Share Extension, or a file you selected from Drive or Dropbox. Work on a copy and keep any original you need." },
    { title: "2. Review the complete document", body: "Check that every page is present and readable. Inspect edges, reverse sides, signatures, QR codes, barcodes, small print, and repeated text." },
    { title: "3. Apply masks", body: "Add masks manually. OCR suggestions can help locate fields, but they do not decide what you should hide or replace your review. Move, adjust, or remove any mask that is inaccurate." },
    { title: "4. Export and review again", body: "Create a rasterized copy. Open the exported result, zoom into every page, and confirm required information is visible while the information you meant to hide is unreadable and absent from other pages." },
    { title: "5. Share with context", body: "Confirm the recipient accepts a copy with hidden data and does not require another format or an unmodified document. Share the exported file you reviewed, not the original." }
  ];
  const links = [
    { key: "faq" as const, label: isEs ? "Preguntas frecuentes" : "FAQ" },
    { key: "privacy" as const, label: isEs ? "Política de privacidad" : "Privacy policy" },
    { key: "terms" as const, label: isEs ? "Términos de uso" : "Terms of use" },
    { key: "subscriptions" as const, label: isEs ? "Condiciones de suscripción" : "Subscription terms" },
    { key: "support" as const, label: isEs ? "Soporte técnico" : "Technical support" }
  ];
  const contents = isEs
    ? [["primeros-pasos", "Tutorial paso a paso"], ["privacidad", "Privacidad y sincronización"], ["limites", "Notas y limitaciones"], ["planes", "Planes y dispositivos"]]
    : [["primeros-pasos", "Step-by-step tutorial"], ["privacidad", "Privacy and sync"], ["limites", "Notes and limitations"], ["planes", "Plans and devices"]];

  return (
    <main className="section relative overflow-hidden bg-themed-white pt-24 md:pt-28">
      <div className="absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,var(--app-primary-soft),transparent)] opacity-80" aria-hidden="true" />
      <div className="container relative max-w-6xl">
        <Link href={getAppPath(app.slug, locale)} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-graphite hover:text-brand-blue">
          <ArrowLeft size={14} />{isEs ? "Volver a MaskID" : "Back to MaskID"}
        </Link>

        <header className="mt-8 grid gap-7 rounded-3xl border border-line bg-themed-card p-6 shadow-card md:grid-cols-[auto_1fr] md:items-center md:p-10">
          <AppIcon app={app} size={88} className="border border-line shadow-soft" />
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-brand-blue"><BookOpen size={15} />{isEs ? "Documentación del producto" : "Product documentation"}</div>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-5xl">{isEs ? "Guía, tutoriales y límites de MaskID" : "MaskID guide, tutorials, and limitations"}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-graphite">{isEs ? "Instrucciones para preparar y revisar una copia, información sobre privacidad y almacenamiento, y aclaraciones sobre lo que la app no puede garantizar." : "Instructions for preparing and reviewing a copy, privacy and storage details, and clear explanations of what the app cannot guarantee."}</p>
            <p className="mt-3 text-xs font-semibold text-graphite">{isEs ? "Revisado el 13 de octubre de 2026" : "Reviewed on October 13, 2026"}</p>
          </div>
        </header>

        <nav aria-label={isEs ? "Contenido de la guía" : "Guide contents"} className="mt-7 rounded-2xl border border-line bg-themed-mist p-5">
          <h2 className="text-sm font-black text-ink">{isEs ? "En esta guía" : "In this guide"}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {contents.map(([id, label]) => <a key={id} href={"#" + id} className="rounded-full border border-line bg-themed-card px-3 py-2 text-xs font-bold text-ink hover:border-brand-blue/40">{label}</a>)}
          </div>
        </nav>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-line bg-themed-card p-6">
            <div className="flex items-center gap-3"><ShieldCheck className="text-brand-blue" size={22} /><h2 className="text-xl font-black text-ink">{isEs ? "Para qué sirve" : "What it is for"}</h2></div>
            <p className="mt-3 text-sm leading-7 text-graphite">{isEs ? "MaskID crea una copia de trabajo para ocultar manualmente información personal que un destinatario concreto no necesita. La captura, el OCR, la edición y la exportación se procesan en el dispositivo." : "MaskID creates a working copy so you can manually hide personal information a specific recipient does not need. Capture, OCR, editing, and export are processed on-device."}</p>
          </article>
          <article className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6">
            <div className="flex items-center gap-3"><TriangleAlert className="text-amber-600" size={22} /><h2 className="text-xl font-black text-ink">{isEs ? "Antes de empezar" : "Before you start"}</h2></div>
            <p className="mt-3 text-sm leading-7 text-graphite">{isEs ? "Confirma que puedes procesar y compartir el documento y que el destinatario acepta una copia con datos ocultos. MaskID no presta asesoramiento jurídico ni garantiza que una entidad acepte el resultado." : "Confirm that you are allowed to process and share the document and that the recipient accepts a copy with hidden data. MaskID does not provide legal advice or guarantee an organization will accept the result."}</p>
          </article>
        </section>

        <section id="primeros-pasos" className="scroll-mt-28 mt-14">
          <div className="flex items-center gap-3"><FileCheck2 className="text-brand-blue" size={24} /><h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">{isEs ? "Tutorial: prepara una copia paso a paso" : "Tutorial: prepare a copy step by step"}</h2></div>
          <ol className="mt-6 grid gap-4">
            {steps.map((step) => <li key={step.title} className="grid gap-3 rounded-2xl border border-line bg-themed-card p-5 sm:grid-cols-[190px_1fr] sm:p-6"><h3 className="font-black text-ink">{step.title}</h3><p className="text-sm leading-7 text-graphite">{step.body}</p></li>)}
          </ol>
          <div className="mt-5 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-5">
            <h3 className="font-black text-ink">{isEs ? "Comprobación final recomendada" : "Recommended final check"}</h3>
            <p className="mt-2 text-sm leading-7 text-graphite">{isEs ? "Reabre el archivo exportado fuera del editor y revisa visualmente cada página. La comprobación técnica busca problemas concretos del archivo, pero no determina si olvidaste tapar una región ni si el documento es adecuado para tu trámite." : "Reopen the exported file outside the editor and visually inspect every page. The technical check looks for specific file issues; it cannot tell whether you forgot to cover a region or whether the document is suitable for your procedure."}</p>
          </div>
        </section>

        <section id="privacidad" className="scroll-mt-28 mt-14">
          <div className="flex items-center gap-3"><Cloud className="text-brand-blue" size={24} /><h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">{isEs ? "Privacidad, almacenamiento y conexiones" : "Privacy, storage, and connections"}</h2></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-line bg-themed-card p-6">
              <h3 className="font-black text-ink">{isEs ? "Local por defecto" : "Local by default"}</h3>
              <p className="mt-2 text-sm leading-7 text-graphite">{isEs ? "La captura, el OCR, las máscaras y la exportación principal se ejecutan en el dispositivo. El almacenamiento local está cifrado. La Bóveda utiliza controles separados y no forma parte de la sincronización." : "Capture, OCR, masks, and the main export workflow run on-device. Local storage is encrypted. The Vault uses separate controls and is not part of sync."}</p>
            </article>
            <article className="rounded-2xl border border-line bg-themed-card p-6">
              <h3 className="font-black text-ink">{isEs ? "Sincronización iCloud Pro" : "Pro iCloud sync"}</h3>
              <p className="mt-2 text-sm leading-7 text-graphite">{isEs ? "Es opcional. Si la activas, se guarda en tu base privada de CloudKit un paquete restaurable que puede incluir imágenes originales y de trabajo, el PDF de origen, OCR, máscaras y metadatos. La Bóveda no se sincroniza. Apple presta iCloud." : "It is optional. When enabled, a restorable package can be saved to your private CloudKit database, including original and working images, the source PDF, OCR, masks, and metadata. The Vault is not synced. Apple provides iCloud."}</p>
            </article>
            <article className="rounded-2xl border border-line bg-themed-card p-6">
              <h3 className="font-black text-ink">{isEs ? "Drive y Dropbox" : "Drive and Dropbox"}</h3>
              <p className="mt-2 text-sm leading-7 text-graphite">{isEs ? "La conexión directa es opcional y requiere autorización. Los tokens se guardan en el Llavero y eliges qué archivo importar; la transferencia con el proveedor necesita internet." : "Direct connection is optional and requires authorization. Tokens are stored in Keychain and you choose which file to import; transfers with the provider require internet."}</p>
            </article>
            <article className="rounded-2xl border border-line bg-themed-card p-6">
              <h3 className="font-black text-ink">{isEs ? "Analítica y diagnósticos" : "Analytics and diagnostics"}</h3>
              <p className="mt-2 text-sm leading-7 text-graphite">{isEs ? "Firebase Analytics está desactivado por defecto y solo se activa con tu consentimiento. Crashlytics se usa aparte para diagnósticos. El contenido documental, imágenes, OCR y máscaras no se envían a estos servicios." : "Firebase Analytics is off by default and only enabled with your consent. Crashlytics is used separately for diagnostics. Document content, images, OCR, and masks are not sent to these services."}</p>
            </article>
          </div>
        </section>

        <section id="limites" className="scroll-mt-28 mt-14">
          <div className="flex items-center gap-3"><TriangleAlert className="text-amber-600" size={24} /><h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">{isEs ? "Notas aclaratorias y limitaciones" : "Clarifications and limitations"}</h2></div>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {(isEs ? [
              "El OCR puede omitir datos sensibles, leerlos mal o proponer máscaras innecesarias. La revisión humana de cada página es necesaria.",
              "La comprobación de exportación es técnica; no demuestra que hayas detectado todo el contenido sensible ni certifica seguridad absoluta.",
              "Una máscara incorrecta, incompleta o desplazada puede dejar información visible. Revisa también códigos, firmas, reversos y páginas repetidas.",
              "La copia redactada puede no cumplir lo que solicita una inmobiliaria, administración, empresa u otra persona destinataria. Confirma sus requisitos.",
              "La exportación no sustituye asesoramiento jurídico, regulatorio, de identidad ni de conservación documental. Conserva originales cuando proceda.",
              "iCloud Pro sincroniza el paquete documental completo descrito arriba. No actives la opción si prefieres que el contenido permanezca solo en el dispositivo.",
              "Drive, Dropbox, iCloud, App Store, red, permisos del sistema y disponibilidad de almacenamiento dependen de terceros y pueden no estar disponibles."
            ] : [
              "OCR can miss sensitive data, misread it, or suggest unnecessary masks. A person must review every page.",
              "The export check is technical; it does not prove all sensitive content was found or certify absolute safety.",
              "An incorrect, incomplete, or misplaced mask can leave information visible. Also inspect codes, signatures, reverse sides, and repeated pages.",
              "A redacted copy may not meet a landlord's, public authority's, company's, or other recipient's requirements. Confirm those requirements.",
              "Export does not replace legal, regulatory, identity, or document-retention advice. Keep originals when appropriate.",
              "Pro iCloud syncs the complete document package described above. Do not enable it if you want content to remain only on-device.",
              "Drive, Dropbox, iCloud, the App Store, networks, system permissions, and available storage are provided by others and may be unavailable."
            ]).map((item) => <li key={item} className="flex gap-3 rounded-xl border border-line bg-themed-card p-5 text-sm leading-7 text-graphite"><TriangleAlert className="mt-1 shrink-0 text-amber-600" size={17} />{item}</li>)}
          </ul>
        </section>

        <section id="planes" className="scroll-mt-28 mt-14 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-line bg-themed-card p-6">
            <h2 className="text-xl font-black text-ink">{isEs ? "MaskID Free y MaskID Pro" : "MaskID Free and MaskID Pro"}</h2>
            <p className="mt-3 text-sm leading-7 text-graphite">{isEs ? "MaskID Free permite procesar hasta 10 documentos en total, de forma acumulativa. MaskID Pro elimina ese límite y añade procesamiento por lotes, plantillas, estilos, controles de imagen, marcas de agua y automatizaciones. Las funciones esenciales de máscara manual y exportación están disponibles en Free." : "MaskID Free allows up to 10 documents to be processed in total, cumulatively. MaskID Pro removes that limit and adds batch processing, templates, styles, image controls, watermarks, and automations. Essential manual masking and export are available in Free."}</p>
            <Link href={getAppPath(app.slug, locale) + "#pricing"} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-blue hover:underline">{isEs ? "Ver planes y precios" : "See plans and pricing"}<ArrowRight size={15} /></Link>
            <p className="mt-3 text-xs leading-6 text-graphite">{isEs ? "Apple muestra el precio, la duración, la renovación y la elegibilidad de cualquier prueba antes de confirmar. La prueba anual de 7 días solo se ofrece a cuentas elegibles." : "Apple shows price, duration, renewal, and eligibility for any trial before confirmation. The 7-day annual trial is only offered to eligible accounts."}</p>
          </article>
          <article className="rounded-2xl border border-line bg-themed-card p-6">
            <h2 className="text-xl font-black text-ink">{isEs ? "Dispositivos compatibles" : "Supported devices"}</h2>
            <p className="mt-3 text-sm leading-7 text-graphite">{isEs ? "MaskID está disponible para iPhone y iPad. La web y la ficha pueden indicar iOS y iPadOS; actualmente no hay una app de MaskID para Apple Watch." : "MaskID is available for iPhone and iPad. The site and listing may show iOS and iPadOS; there is currently no MaskID app for Apple Watch."}</p>
            <Link href={getAppSubpagePath(app.slug, "support", locale)} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-blue hover:underline">{isEs ? "Contactar con soporte" : "Contact support"}<ArrowRight size={15} /></Link>
          </article>
        </section>

        <section className="mt-14 rounded-3xl border border-line bg-themed-mist p-6 sm:p-8">
          <div className="flex items-center gap-3"><CheckCircle2 className="text-brand-green" size={22} /><h2 className="text-xl font-black text-ink">{isEs ? "Documentación relacionada" : "Related documentation"}</h2></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((item) => <Link key={item.key} href={getAppSubpagePath(app.slug, item.key, locale)} className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-line bg-themed-card px-4 py-3 text-sm font-bold text-ink hover:border-brand-blue/40">{item.label}<ArrowRight size={15} className="shrink-0 text-brand-blue" /></Link>)}
          </div>
          <Link href={getAppPath(app.slug, locale)} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-brand-blue hover:underline">{isEs ? "Volver a la ficha de MaskID" : "Back to the MaskID page"}<ArrowLeft size={15} /></Link>
        </section>
      </div>
    </main>
  );
}