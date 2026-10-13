import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, Clock3, LockKeyhole, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { getAppPath, getAppSubpagePath } from "@/lib/routes";
import type { Locale } from "@/lib/i18n";

const appleReferences = [
  {
    label: { es: "Family Controls", en: "Family Controls" },
    href: "https://developer.apple.com/documentation/familycontrols?language=swift"
  },
  {
    label: { es: "Autorización de Family Controls", en: "Family Controls authorization" },
    href: "https://developer.apple.com/documentation/familycontrols/authorizationcenter/requestauthorization%28for%3A%29?changes=__6"
  },
  {
    label: { es: "Fin de un intervalo Device Activity", en: "Device Activity interval end" },
    href: "https://developer.apple.com/documentation/deviceactivity/deviceactivitymonitor/intervaldidend(for:)"
  },
  {
    label: { es: "App Lock: modo de app única supervisado", en: "App Lock: supervised Single App Mode" },
    href: "https://developer.apple.com/documentation/devicemanagement/applock"
  },
  {
    label: { es: "Activar Single App Mode en Apple Configurator", en: "Set Single App Mode with Apple Configurator" },
    href: "https://support.apple.com/guide/apple-configurator-mac/set-single-app-mode-cadbf9c172/mac"
  },
  {
    label: { es: "Configuración familiar en Managed Settings", en: "Family setup with Managed Settings" },
    href: "https://developer.apple.com/documentation/managedsettings/connectionwithframeworks?changes=l_6"
  },
  {
    label: { es: "Participantes con URL de un solo uso en CloudKit", en: "CloudKit one-time URL participants" },
    href: "https://developer.apple.com/documentation/cloudkit/ckshare/participant/onetimeurlparticipant%28%29?changes=_7"
  },
  {
    label: { es: "Permisos de acceso público de CloudKit", en: "CloudKit public share permissions" },
    href: "https://developer.apple.com/documentation/cloudkit/ckshare/publicpermission?language=objc"
  },
  {
    label: { es: "Campos cifrados de CloudKit", en: "CloudKit encrypted fields" },
    href: "https://developer.apple.com/documentation/cloudkit/encrypting-user-data"
  },
  {
    label: { es: "Acceso a los datos de CloudKit", en: "Access to CloudKit data" },
    href: "https://developer.apple.com/documentation/cloudkit/providing-user-access-to-cloudkit-data"
  },
  {
    label: { es: "Eliminar datos de CloudKit", en: "Delete CloudKit data" },
    href: "https://developer.apple.com/documentation/cloudkit/responding-to-requests-to-delete-data"
  }
];

const localSteps = {
  es: [
    "En el dispositivo que vas a prestar, abre Kinsera y entra en Modo niño desde el área de controles parentales.",
    "Autoriza Family Controls como tutor. Para dificultar que se elimine Kinsera, configura el dispositivo del menor mediante En familia y autorización de tutor; el permiso individual no ofrece esa protección.",
    "En el selector de Apple, marca de 1 a 50 apps concretas. El modo no admite categorías ni listas de webs.",
    "Elige una duración de 5 a 180 minutos y pulsa Iniciar modo niño. Las apps no seleccionadas y los dominios web quedan bajo los escudos del sistema.",
    "Al terminar, el dispositivo pasa a bloqueado y necesita que el tutor finalice la sesión o autorice más tiempo. El cierre de Kinsera no elimina los ajustes de Managed Settings."
  ],
  en: [
    "On the device you are lending, open Kinsera and choose Child Mode from parental controls.",
    "Authorize Family Controls as a guardian. To make Kinsera harder to delete, set up the child's device through Family Sharing with guardian authorization; individual authorization does not provide that protection.",
    "In Apple's picker, select 1 to 50 specific apps. The mode does not support categories or website lists.",
    "Choose a duration from 5 to 180 minutes and tap Start Child Mode. Unselected apps and web domains are covered by system shields.",
    "When the interval ends, the device enters a locked state and needs the guardian to end the session or approve more time. Closing Kinsera does not clear Managed Settings."
  ]
} satisfies Record<Locale, string[]>;

const remoteSteps = {
  es: [
    "Vincula el dispositivo desde la conexión familiar de Kinsera: el tutor crea una invitación privada de un solo uso. El enlace no queda ligado a una cuenta Apple antes de canjearse; cualquier persona que lo reciba puede reclamarlo primero. Envíalo directamente al dispositivo previsto. Ambos deben estar autorizados por Apple.",
    "En el panel del tutor, selecciona el perfil y dispositivo cliente, elige las apps y la duración, y envía la sesión.",
    "El dispositivo cliente aplica la selección y publica un acuse. Kinsera solo indica que se aplicó cuando recibe un acuse aceptado.",
    "El menor puede pedir más tiempo desde la pantalla de bloqueo. El tutor aprueba o rechaza; una aprobación extiende la misma lista de apps."
  ],
  en: [
    "Link the device through Kinsera's family connection: the guardian creates a private one-time invitation. The URL is not bound to an Apple Account before redemption; anyone who receives it can claim it first. Send it directly to the intended client. Both devices must have Apple's authorization.",
    "In the guardian dashboard, select the client profile and device, choose apps and duration, and send the session.",
    "The client applies the selection and publishes a receipt. Kinsera reports it as applied only after an accepted receipt arrives.",
    "The child can request more time from the shield. The guardian approves or denies it; approval extends the same app list."
  ]
} satisfies Record<Locale, string[]>;

const limits = {
  es: [
    "La función está en integración y validación. La versión pública del App Store no debe considerarse compatible hasta que una versión publicada incluya el flujo y se completen las validaciones indicadas aquí.",
    "iOS controla la aplicación de los escudos. El fin de Device Activity no es una alarma en tiempo real garantizada al segundo; el sistema puede entregar el callback cuando vuelva a usar el dispositivo. Kinsera reconcilia el vencimiento al volver a primer plano y mantiene el estado cerrado hasta la decisión del tutor.",
    "En control remoto se necesita conectividad y entrega de CloudKit. Si el cliente está desconectado o suspendido, el tutor verá la orden pendiente, no una aplicación confirmada; la orden se procesa al recibirla y el cliente debe revisar el vencimiento al activarse.",
    "La lista bloquea apps y dominios web a nivel de Screen Time. No puede quitar funciones que estén dentro de una app permitida: chats, navegador integrado, enlaces, compras o botones para compartir pueden seguir disponibles.",
    "No es un quiosco de iOS ni fija una sola app en pantalla. iOS conserva el comportamiento de las superficies del sistema. Single App Mode fija una sola app y requiere un dispositivo supervisado con un perfil App Lock, que se puede instalar mediante MDM o Apple Configurator.",
    "La protección frente a desinstalación depende de la autorización de Family Controls aprobada por tutor en una cuenta infantil de En familia. La autorización individual no impide desinstalar Kinsera. Ninguna app puede proteger frente al dueño que controla el código, la cuenta o el borrado/restauración del dispositivo.",
    "El modo niño admite de 1 a 50 apps individuales y entre 5 y 180 minutos. No admite categorías ni dominios permitidos seleccionados por el tutor."
  ],
  en: [
    "The feature is in integration and validation. Do not treat the current App Store version as supporting it until a published release includes the flow and the checks listed here are complete.",
    "iOS controls shield enforcement. Device Activity's end callback is not a real-time alarm guaranteed to fire at the exact second; the system may deliver it when the device is used again. Kinsera reconciles expiry on foreground and keeps the session locked pending the guardian's decision.",
    "Remote control needs connectivity and CloudKit delivery. If the client is offline or suspended, the guardian sees a pending command, not confirmed enforcement; the client processes it when delivered and checks expiry when it becomes active.",
    "The allowlist shields apps and web domains at the Screen Time level. It cannot remove features inside an allowed app: chats, an embedded browser, links, purchases, or share buttons may remain available.",
    "This is not an iOS kiosk and does not pin one app to the foreground. iOS retains its system-surface behavior. Single App Mode pins one app and requires a supervised device with an App Lock profile, which can be installed through MDM or Apple Configurator.",
    "Protection against uninstalling depends on guardian-approved Family Controls authorization for a child account in Family Sharing. Individual authorization does not prevent Kinsera from being deleted. No app can protect against the device owner controlling its passcode, account, or erase/restore process.",
    "Child Mode supports 1 to 50 individual apps and 5 to 180 minutes. It does not support categories or a guardian-selected list of allowed domains."
  ]
} satisfies Record<Locale, string[]>;

const sharedData = {
  es: [
    "La selección que devuelve Apple se conserva como token opaco en el dispositivo protegido para aplicar la política. Kinsera no necesita resolverlo a nombres de apps para imponer el escudo.",
    "En una sesión entre dispositivos, la selección opaca viaja en el campo cifrado selectionPayload del comando de inicio, dentro del share CloudKit de ese dispositivo. Las solicitudes de tiempo contienen un identificador aleatorio, duración, fecha y estado. El acuse contiene el resultado técnico de aplicación.",
    "La app no envía a analítica los nombres de menores, nombres de apps, bundle IDs, dominios, mensajes ni historial de navegación. El flujo conectado puede sincronizar, si se configura, estado de protección, batería y ubicación, cada uno opcional y con su fecha de observación.",
    "En Privacidad puedes exportar como JSON la conexión actual; el archivo puede incluir la ubicación sincronizada, batería, estado de protección y el historial de solicitudes, órdenes y acuses, pero excluye identidades de participantes y el token opaco de selección. El tutor puede borrar una conexión por dispositivo solo tras recibir el acuse aceptado del fin de sesión y comprobar que hay un único cliente aceptado y ninguna invitación pendiente; el borrado elimina permanentemente la zona y su contenido para todos. El participante puede salir del share después de terminar la sesión y desbloquear los controles de tutor; pierde su acceso, pero la copia del tutor se conserva. Estos flujos están implementados en desarrollo y aún requieren validación física y publicación. Desinstalar la app no garantiza que se eliminen datos de CloudKit."
  ],
  en: [
    "Apple's selection is kept as an opaque token on the protected device so the policy can be enforced. Kinsera does not need to resolve it to app names to apply shields.",
    "In a cross-device session, the opaque selection travels in the encrypted selectionPayload field of the start command, inside that device's CloudKit share. Time requests contain a random identifier, duration, date, and state. The receipt contains the technical application result.",
    "The app does not send child names, app names, bundle IDs, domains, messages, or browsing history to analytics. If configured, the connected family flow can sync protection state, battery, and location; each is optional and carries its observation time.",
    "Privacy lets you export the current connection as JSON. The file may include synced location, battery, protection state, and request, command, and receipt history, while excluding participant identities and the opaque selection token. A guardian can permanently delete one device connection only after its exact client returns an accepted session-end receipt and the share has exactly one accepted client with no pending invitation; deleting the zone removes its records and share for everyone. A participant can leave the share after the session ends and guardian controls are unlocked; that participant loses access while the guardian's copy remains. These flows are implemented in development and still need physical validation and release. Uninstalling the app does not guarantee CloudKit data is removed."
  ]
} satisfies Record<Locale, string[]>;

function StatusNote({ locale }: { locale: Locale }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-100">
      <CircleAlert className="mt-0.5 shrink-0" size={22} aria-hidden="true" />
      <div>
        <p className="font-bold">{locale === "es" ? "En integración y validación" : "In integration and validation"}</p>
        <p className="mt-1 text-sm leading-6">
          {locale === "es"
            ? "El flujo ya está implementado en el código de Kinsera, pero faltan el despliegue del esquema CloudKit, la prueba en dos dispositivos físicos y la actualización de App Privacy. También falta ofrecer acceso/exportación y borrado de los datos CloudKit. Esta guía describe el comportamiento previsto; comprueba la versión instalada antes de confiarle una sesión."
            : "The flow is implemented in Kinsera's source code, but CloudKit schema deployment, a two-device physical test, and the App Privacy update remain. Kinsera also needs a CloudKit data access/export and deletion flow. This guide describes the intended behavior; check your installed version before relying on a session."}
        </p>
      </div>
    </div>
  );
}

export function KinseraChildModeTeaser({ locale }: { locale: Locale }) {
  return (
    <section className="section border-b border-line bg-themed-mist">
      <div className="container">
        <div className="grid gap-8 rounded-3xl border border-line bg-themed-card p-6 shadow-soft sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brand-blue">
              <ShieldCheck size={16} aria-hidden="true" />
              {locale === "es" ? "Modo niño" : "Child Mode"}
              <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] tracking-wide text-amber-900">
                {locale === "es" ? "EN VALIDACIÓN" : "VALIDATING"}
              </span>
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {locale === "es" ? "Presta el dispositivo con una lista de apps y un tiempo definido" : "Lend the device with an app list and a set time"}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-graphite">
              {locale === "es"
                ? "El tutor elige de 1 a 50 apps y de 5 a 180 minutos. Al vencer, las apps permitidas se bloquean y el tutor decide si finaliza o concede más tiempo. También puede enviar la sesión a un dispositivo cliente conectado."
                : "The guardian chooses 1 to 50 apps and 5 to 180 minutes. At expiry, allowed apps are shielded and the guardian decides whether to end the session or grant more time. The session can also be sent to a linked client device."}
            </p>
          </div>
          <ButtonLink href={getAppSubpagePath("kinsera", "childMode", locale)}>
            {locale === "es" ? "Ver guía, pasos y límites" : "Read setup, steps, and limits"}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function KinseraChildModeGuide({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const appPath = getAppPath("kinsera", locale);
  const supportPath = getAppSubpagePath("kinsera", "support", locale);
  const privacyPath = getAppSubpagePath("kinsera", "privacy", locale);
  const sections = [
    { id: "local-setup", title: es ? "Configurar en el mismo dispositivo" : "Set up on the same device", steps: localSteps[locale] },
    { id: "remote-setup", title: es ? "Usar el móvil del tutor para controlar otro" : "Use the guardian's phone to control another", steps: remoteSteps[locale] }
  ];

  return (
    <main className="section relative overflow-hidden bg-themed-white pt-24 md:pt-28">
      <div className="absolute inset-x-0 top-0 h-96 bg-[linear-gradient(180deg,var(--app-primary-soft),transparent)] opacity-80" aria-hidden="true" />
      <div className="container relative max-w-5xl">
        <Link href={appPath} className="text-sm font-semibold text-brand-blue hover:underline">
          {es ? "← Volver a Kinsera" : "← Back to Kinsera"}
        </Link>
        <header className="max-w-4xl py-10">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-blue">Kinsera · {es ? "Guía de producto" : "Product guide"}</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-6xl">{es ? "Modo niño" : "Child Mode"}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite">
            {es
              ? "Prepara el iPhone o iPad para prestar el dispositivo: el tutor selecciona las apps que se pueden abrir, fija una duración y conserva el control de la sesión."
              : "Prepare an iPhone or iPad for lending: the guardian selects which apps can open, sets a duration, and keeps control of the session."}
          </p>
        </header>

        <StatusNote locale={locale} />

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: es ? "Apps elegidas por el tutor" : "Guardian-selected apps", body: es ? "De 1 a 50 apps individuales; no categorías ni webs permitidas." : "1 to 50 individual apps; no categories or allowed websites." },
            { icon: Clock3, title: es ? "Duración definida" : "Set duration", body: es ? "De 5 a 180 minutos. El vencimiento deja la sesión bloqueada." : "5 to 180 minutes. Expiry leaves the session locked." },
            { icon: LockKeyhole, title: es ? "Control del tutor" : "Guardian control", body: es ? "El menor puede solicitar tiempo; el tutor aprueba o rechaza." : "The child can request time; the guardian approves or denies." }
          ].map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-2xl border border-line bg-themed-card p-6">
              <Icon className="text-brand-blue" size={22} aria-hidden="true" />
              <h2 className="mt-4 font-bold text-ink">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-graphite">{body}</p>
            </article>
          ))}
        </section>

        <nav aria-label={es ? "En esta guía" : "On this page"} className="mt-10 rounded-2xl border border-line bg-themed-mist p-5">
          <p className="font-bold text-ink">{es ? "En esta guía" : "On this page"}</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[
              ["local-setup", es ? "Configuración local" : "Local setup"],
              ["remote-setup", es ? "Control remoto" : "Remote control"],
              ["expiry", es ? "Qué ocurre al vencer" : "What happens at expiry"],
              ["privacy", es ? "Datos y privacidad" : "Data and privacy"],
              ["limits", es ? "Límites conocidos" : "Known limits"],
              ["references", es ? "Referencias de Apple" : "Apple references"]
            ].map(([id, label]) => <li key={id}><a className="font-semibold text-brand-blue hover:underline" href={`#${id}`}>{label}</a></li>)}
          </ul>
        </nav>

        {sections.map(({ id, title, steps }) => (
          <section id={id} key={id} className="scroll-mt-24 border-b border-line py-12">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{title}</h2>
            <ol className="mt-6 grid gap-4">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-2xl border border-line bg-themed-card p-5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-black text-brand-blue">{index + 1}</span>
                  <p className="text-sm leading-7 text-graphite">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <section id="expiry" className="scroll-mt-24 border-b border-line py-12">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{es ? "Temporizador y bloqueo al terminar" : "Timer and lock at the end"}</h2>
          <div className="mt-5 rounded-2xl border border-line bg-themed-card p-6 text-sm leading-7 text-graphite">
            <p>{es
              ? "Kinsera guarda la hora de fin y programa Device Activity. Cuando iOS entrega el evento de fin, el dispositivo protegido aplica el escudo a todas las apps. Si el evento llega mientras el dispositivo no está en uso, iOS puede entregarlo al volver a utilizarlo; al abrir Kinsera también se reconcilia una sesión vencida. La interfaz no debe interpretarse como garantía de precisión al segundo."
              : "Kinsera stores the end time and schedules Device Activity. When iOS delivers the end event, the protected device shields all apps. If the event arrives while the device is not in use, iOS may deliver it when the device is used again; opening Kinsera also reconciles an expired session. The interface is not a second-by-second guarantee."}</p>
            <p className="mt-4">{es
              ? "El cierre forzado de Kinsera no borra el escudo. Para detener o extender una sesión, el tutor debe finalizarla en ese dispositivo o, en la sesión conectada, aprobar más tiempo desde el panel del tutor. Si un dispositivo remoto no confirma una orden, Kinsera conserva el estado pendiente y no afirma que se haya aplicado."
              : "Force-quitting Kinsera does not clear the shield. To stop or extend a session, the guardian must end it on that device or, in a linked session, approve more time from the guardian dashboard. If a remote device does not confirm a command, Kinsera keeps it pending and does not claim it was applied."}</p>
          </div>
        </section>

        <section id="privacy" className="scroll-mt-24 border-b border-line py-12">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{es ? "Datos que intervienen" : "Data involved"}</h2>
          <ul className="mt-6 grid gap-3">
            {sharedData[locale].map((item) => <li key={item} className="flex gap-3 rounded-xl bg-themed-mist p-4 text-sm leading-7 text-graphite"><CheckCircle2 className="mt-1 shrink-0 text-brand-green" size={17} aria-hidden="true" /><span>{item}</span></li>)}
          </ul>
          <p className="mt-5 text-sm leading-7 text-graphite">
            <Link href={privacyPath} className="font-semibold text-brand-blue hover:underline">{es ? "Lee la política de privacidad completa." : "Read the full Privacy Policy."}</Link>
          </p>
        </section>

        <section id="limits" className="scroll-mt-24 border-b border-line py-12">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{es ? "Límites y notas aclaratorias" : "Limits and important notes"}</h2>
          <ul className="mt-6 grid gap-3">
            {limits[locale].map((item) => <li key={item} className="flex gap-3 rounded-xl border border-line bg-themed-card p-4 text-sm leading-7 text-graphite"><CircleAlert className="mt-1 shrink-0 text-amber-600" size={17} aria-hidden="true" /><span>{item}</span></li>)}
          </ul>
        </section>

        <section id="references" className="scroll-mt-24 py-12">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{es ? "Referencias técnicas de Apple" : "Apple technical references"}</h2>
          <p className="mt-3 text-sm leading-7 text-graphite">{es ? "La disponibilidad exacta depende de iOS/iPadOS, los permisos concedidos y la configuración familiar." : "Exact availability depends on iOS/iPadOS, granted permissions, and family setup."}</p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {appleReferences.map(({ label, href }) => <li key={href}><a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-themed-card px-4 py-2 text-sm font-semibold text-brand-blue hover:border-brand-blue">{label[locale]}<ArrowRight size={14} aria-hidden="true" /></a></li>)}
          </ul>
        </section>

        <footer className="grid gap-4 rounded-2xl border border-line bg-themed-mist p-6 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <p className="text-sm leading-6 text-graphite">{es ? "¿Necesitas ayuda o quieres consultar una limitación de tu dispositivo?" : "Need help or want to check a device limitation?"}</p>
          <ButtonLink href={supportPath} variant="secondary">{es ? "Soporte" : "Support"}</ButtonLink>
          <ButtonLink href={appPath}>{es ? "Ver Kinsera" : "Explore Kinsera"}</ButtonLink>
        </footer>
      </div>
    </main>
  );
}
