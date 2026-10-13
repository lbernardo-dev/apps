import type { AppItem, LegalPage } from "./types";

const supportEmail = "romerodev.app@gmail.com";
const updatedAt = "2026-10-13";

const page = (title: string, title_en: string, body: string[], body_en: string[]): LegalPage => ({
  title,
  title_en,
  updatedAt,
  body,
  body_en
});

const privacy = page(
  "Política de privacidad de Kinsera",
  "Kinsera Privacy Policy",
  [
    "Esta política explica qué información trata Kinsera para ofrecer controles familiares en iPhone y iPad, qué permanece en el dispositivo y qué opciones tienes. Los derechos imperativos de tu país de residencia prevalecen cuando sean más favorables.",
    "## 1. Responsable y contacto",
    `El responsable es Lester Romero Bernardo (RomeroDev), con domicilio en Valencia, España. Para privacidad, soporte o solicitudes relacionadas con tus datos: ${supportEmail}.`,
    "## 2. Datos que trata Kinsera",
    "Kinsera guarda en el dispositivo perfiles, preferencias, políticas, selecciones y tokens de Family Controls, temporizadores, horarios, solicitudes de tiempo y recuentos agregados. Las extensiones usan un App Group local para aplicar la política. Si activas una conexión familiar, la app puede sincronizar órdenes y acuses de protección; si activas las funciones familiares correspondientes, también puede compartir estado de protección, batería y observaciones de ubicación con su fecha. Cada vínculo usa una invitación privada de un solo uso, no un enlace público reutilizable. El enlace no queda ligado a una cuenta Apple antes de canjearse: quien lo reciba puede reclamarlo primero, por lo que debe compartirse directamente con el dispositivo previsto.",
    "## 3. Lo que no recopilamos ni enviamos",
    "Kinsera no opera un backend propio, no muestra publicidad ni realiza seguimiento entre apps o sitios. No envía a analítica nombres de menores, nombres de apps, bundle IDs, dominios, tokens de Screen Time, mensajes, fotografías ni historial de navegación o actividad. El modo niño puede enviar una selección opaca de Apple en un campo cifrado de CloudKit para aplicar una sesión en el dispositivo conectado; el flujo familiar puede sincronizar ubicación solo cuando la función de ubicación está configurada y autorizada.",
    "## 4. Procesamiento local y permisos",
    "La autorización de Family Controls, la aplicación de bloqueos mediante Managed Settings y los informes agregados se ejecutan localmente con frameworks de Apple. Las funciones de control local siguen funcionando sin conexión. El control remoto depende de iCloud/CloudKit, de la conexión familiar y de la entrega de órdenes por Apple; el estado remoto solo se confirma tras recibir el acuse del dispositivo. Notificaciones, Face ID y ubicación se solicitan según las funciones que actives y los permisos pueden revocarse desde Ajustes.",
    "## 5. Informes y diagnóstico",
    "Cuando autorizas Device Activity, Kinsera muestra totales y recuentos agregados dentro del dispositivo. Las extensiones permanecen sin red. Los diagnósticos se limitan a estados y recuentos técnicos; no incluyen nombres, dominios, tokens ni contenido de políticas.",
    "## 6. Apple y compras",
    "Apple procesa la autorización de Screen Time, las notificaciones del sistema, los servicios del dispositivo y las compras mediante StoreKit. Kinsera recibe el estado técnico necesario para conceder o retirar funciones Premium; no recibe los datos completos de tu tarjeta. Apple trata la información bajo sus propios términos y políticas.",
    "## 7. Roles, menores y uso responsable",
    "La persona que configura una política debe tener autoridad para hacerlo y debe explicar al usuario protegido qué límites se aplican. Kinsera no ofrece vigilancia secreta ni lectura de mensajes. La ubicación no pertenece al modo niño; otra función familiar puede compartir observaciones de ubicación si se configura y autoriza. La persona responsable debe respetar la legislación aplicable, la autonomía y la seguridad del menor, y no utilizar la app para controlar a otra persona adulta sin su autorización.",
    "## 8. Conservación, eliminación y derechos",
    "Los registros sincronizados se alojan en el contenedor iCloud/CloudKit de Apple. En Privacidad puedes exportar a JSON una conexión cada vez; el archivo puede incluir ubicación, batería, estado de protección, solicitudes y el historial de órdenes y acuses. Excluye identidades de participantes y el payload de selección opaco de Family Controls. El tutor puede borrar la zona completa de un dispositivo después de que su cliente confirme el fin de Modo niño. Si el share tiene más de un cliente, otro participante o una invitación pendiente, Kinsera conserva la zona porque un único acuse no confirma el estado de todos; primero hay que retirar participantes adicionales desde los controles de compartir de Apple. El participante puede salir del share una vez finalizada la sesión y desbloqueados los controles de tutor: pierde su acceso, mientras la copia del tutor y los demás participantes se conservan. El borrado de zona es permanente. La función está implementada en la versión de desarrollo y pendiente de validación física y publicación; hasta que se publique, contacta con soporte para solicitudes de acceso o supresión. Desinstalar Kinsera no garantiza eliminar registros de iCloud.",
    "## 9. Cambios",
    "Publicaremos aquí los cambios materiales con una nueva fecha de actualización y, cuando proceda, mostraremos un aviso dentro de la aplicación."
  ],
  [
    "This policy explains what Kinsera processes to provide family controls on iPhone and iPad, what stays on the device, and which choices you have. Mandatory rights in your country of residence prevail where they provide stronger protection.",
    "## 1. Controller and contact",
    `The controller is Lester Romero Bernardo (RomeroDev), based in Valencia, Spain. For privacy, support, or data requests: ${supportEmail}.`,
    "## 2. Data Kinsera processes",
    "Kinsera stores profiles, preferences, policies, Family Controls selections and tokens, timers, schedules, time requests, and aggregate counts on the device. Extensions use a local App Group to enforce the policy. If you enable a family connection, the app can sync protection commands and receipts; when the related family features are enabled, it can also share protection state, battery, and location observations with their timestamps. Each link uses a private one-time invitation, not a reusable public URL. The URL is not bound to an Apple Account before redemption: whoever receives it can claim it first, so send it directly to the intended device.",
    "## 3. What we do not collect or send",
    "Kinsera does not operate its own backend, show ads, or track people across apps or sites. It does not send child names, app names, bundle IDs, domains, Screen Time tokens, messages, photos, or browsing/activity history to analytics. Child Mode may send an opaque Apple selection in an encrypted CloudKit field to enforce a session on a linked device; the family flow can sync location only when the location feature is configured and authorized.",
    "## 4. On-device processing and permissions",
    "Family Controls authorization, Managed Settings enforcement, and aggregate reports run locally through Apple's frameworks. Local controls continue to work offline. Remote control depends on iCloud/CloudKit, the family connection, and Apple's command delivery; remote state is confirmed only after the device receipt arrives. Notifications, Face ID, and location are requested according to the features you enable, and permissions can be revoked in Settings.",
    "## 5. Reports and diagnostics",
    "When you authorize Device Activity, Kinsera shows totals and aggregate counts on the device. Extensions remain network-free. Diagnostics are limited to technical states and counts; they do not include names, domains, tokens, or policy contents.",
    "## 6. Apple and purchases",
    "Apple processes Screen Time authorization, system notifications, device services, and purchases through StoreKit. Kinsera receives only the technical state required to grant or remove Premium features; it does not receive your complete card details. Apple handles information under its own terms and policies.",
    "## 7. Roles, children, and responsible use",
    "The person configuring a policy must have authority to do so and should explain the active limits to the protected user. Kinsera does not provide secret surveillance or message reading. Location is not part of Child Mode; another family feature can share location observations if configured and authorized. The responsible adult must follow applicable law, respect the child's autonomy and safety, and never use the app to control another adult without consent.",
    "## 8. Retention, deletion, and rights",
    "Synced records are hosted in Apple's iCloud/CloudKit container. Privacy lets you export one connection at a time as JSON; the file may contain location, battery, protection state, time requests, and command/receipt history. It excludes participant identities and opaque Family Controls selection tokens. A guardian can permanently delete one device's complete zone only after that client confirms Child Mode has ended. If the share has another client, participant or pending invitation, Kinsera retains the zone because one receipt cannot confirm every device; remove extra participants through Apple's share controls first. A participant can leave after the session ends and guardian controls are unlocked: their access is revoked while the owner's copy and other participants remain. This feature is implemented in the development version and is pending physical validation and release. Until it is published, contact support for access or erasure requests. Uninstalling Kinsera does not guarantee that iCloud records are deleted.",
    "## 9. Changes",
    "Material changes will be published here with a new update date and, where appropriate, an in-app notice."
  ]
);

const terms = page(
  "Términos de uso de Kinsera",
  "Kinsera Terms of Use",
  [
    "Estos términos regulan el uso internacional de Kinsera. Al descargar o utilizar la app aceptas estos términos, la Política de privacidad y las reglas aplicables del App Store. Los derechos irrenunciables de consumidores y usuarios no quedan limitados.",
    "## 1. Servicio",
    "Kinsera ayuda a configurar límites familiares en dispositivos Apple mediante Family Controls, Managed Settings y Device Activity. Algunas funciones de control local están disponibles en la versión publicada. El modo niño y el control conectado tutor-dispositivo cliente están en integración y validación; solo estarán disponibles cuando una versión publicada los incluya y cumpla los requisitos de Apple.",
    "## 2. Autoridad y transparencia",
    "Solo debes configurar o cambiar una política si tienes autoridad para hacerlo. Debes comunicar los límites de forma adecuada a la persona protegida, mantener el código del dispositivo y las credenciales bajo control y revisar que los límites sean proporcionales a la edad, la seguridad y las necesidades de la familia.",
    "## 3. Apple Screen Time",
    "La aplicación depende de Family Controls, Managed Settings, Device Activity, iCloud/CloudKit para las funciones conectadas, permisos del sistema, En familia cuando proceda y versiones compatibles de iOS/iPadOS. Apple puede limitar, cambiar o interrumpir estos servicios. El temporizador de Device Activity depende de callbacks del sistema y no garantiza un cambio visual al segundo. Si se revoca un permiso o una orden remota sigue pendiente, comprueba el estado confirmado antes de prestar el dispositivo.",
    "## 4. Uso responsable",
    "No utilices Kinsera para vigilancia secreta, acoso, discriminación, acceso no autorizado, elusión de controles, fines ilícitos o para tratar datos de terceros sin autorización. La app no sustituye el criterio de madres, padres, tutores, educadores ni servicios de emergencia y no garantiza que una persona no pueda acceder a contenido por otros medios.",
    "## 5. Contenido y propiedad intelectual",
    "Conservas los derechos sobre la información que configuras y confirmas que puedes crear esas políticas. Kinsera, su código, marca, diseño, textos y materiales propios pertenecen a Lester Romero Bernardo (RomeroDev) o a sus licenciantes. Se concede una licencia personal, limitada, no exclusiva, no transferible y revocable para usar la app en dispositivos Apple compatibles.",
    `## 6. Compras y soporte\nLas funciones Premium se ofrecen mediante Apple In-App Purchase y están sujetas a las Condiciones de suscripción de Kinsera y a la información que Apple muestra antes de comprar. Apple gestiona el pago, las renovaciones y las solicitudes de reembolso. Para soporte técnico o consultas sobre datos, escribe a ${supportEmail}.`,
    "## 7. Disponibilidad y responsabilidad",
    "Podemos actualizar, modificar o retirar funciones. En la medida permitida por la ley, Kinsera se proporciona tal como está y no respondemos por decisiones tomadas sin revisar la política, interrupciones de Apple, permisos revocados, fallos del dispositivo o daños indirectos. Esta limitación no afecta a responsabilidades que no puedan excluirse legalmente.",
    "## 8. Apple como tercero beneficiario",
    "Cuando obtienes Kinsera desde el App Store, Apple es un tercero beneficiario de estos términos y puede hacerlos cumplir frente a ti según las reglas aplicables del App Store. Apple no está obligada a prestar mantenimiento ni soporte de Kinsera.",
    `## 9. Ley y contacto\nSe aplica la legislación de España, sin perjuicio de las normas imperativas y derechos de consumo del lugar donde resides. Contacto: Lester Romero Bernardo (RomeroDev), Valencia, España; ${supportEmail}.`
  ],
  [
    "These terms govern the international use of Kinsera. By downloading or using the app, you accept these terms, the Privacy Policy, and applicable App Store rules. Non-waivable consumer rights are not limited.",
    "## 1. Service",
    "Kinsera helps configure family limits on Apple devices through Family Controls, Managed Settings, and Device Activity. Some local controls are available in the public release. Child Mode and connected guardian-to-client control are in integration and validation; they will be available only when a published release includes them and Apple's requirements are met.",
    "## 2. Authority and transparency",
    "You must configure or change a policy only when you have authority to do so. Explain limits appropriately to the protected person, keep the device passcode and credentials under control, and review whether limits are proportionate to the family's age, safety, and needs.",
    "## 3. Apple Screen Time",
    "The app depends on Family Controls, Managed Settings, Device Activity, iCloud/CloudKit for connected features, system permissions, Family Sharing where applicable, and compatible iOS/iPadOS versions. Apple may limit, change, or interrupt these services. Device Activity timers rely on system callbacks and do not guarantee a visible change at the exact second. If a permission is revoked or a remote command remains pending, check the confirmed state before lending the device.",
    "## 4. Responsible use",
    "Do not use Kinsera for secret surveillance, harassment, discrimination, unauthorized access, bypassing controls, unlawful purposes, or processing third-party data without authorization. The app does not replace the judgment of parents, guardians, educators, or emergency services and cannot guarantee that a person will be unable to access content through other means.",
    "## 5. Content and intellectual property",
    "You keep rights in the information you configure and confirm that you are allowed to create those policies. Kinsera, its code, brand, design, text, and own materials belong to Lester Romero Bernardo (RomeroDev) or its licensors. You receive a personal, limited, non-exclusive, non-transferable, revocable license to use the app on compatible Apple devices.",
    `## 6. Purchases and support\nPremium features are offered through Apple In-App Purchase and are also governed by Kinsera's Subscription Terms and the information Apple displays before purchase. Apple handles payment, renewals, and refund requests. For technical support or data questions, contact ${supportEmail}.`,
    "## 7. Availability and liability",
    "We may update, change, or remove features. To the extent permitted by law, Kinsera is provided as is and we are not responsible for decisions made without reviewing a policy, Apple outages, revoked permissions, device failures, or indirect damages. This limitation does not affect liability that cannot legally be excluded.",
    "## 8. Apple as third-party beneficiary",
    "When you obtain Kinsera from the App Store, Apple is a third-party beneficiary of these terms and may enforce them against you under the applicable App Store rules. Apple is not required to provide maintenance or support for Kinsera.",
    `## 9. Law and contact\nSpanish law applies, without prejudice to mandatory rules and consumer rights in your place of residence. Contact: Lester Romero Bernardo (RomeroDev), Valencia, Spain; ${supportEmail}.`
  ]
);

const subscriptions = page(
  "Condiciones de suscripción de Kinsera Plus",
  "Kinsera Plus Subscription Terms",
  [
    "Estas condiciones complementan los Términos de uso y la Política de privacidad de Kinsera. La información contractual final, el precio, la moneda, los impuestos y la elegibilidad son los que Apple muestra antes de confirmar la compra.",
    "## 1. Planes y funciones",
    "Kinsera Plus puede ofrecer planes mensual y anual auto-renovables para funciones Premium como rutinas, informes, solicitudes y herramientas adicionales cuando estén disponibles en la versión publicada. Las funciones locales esenciales y la información de protección deben seguir siendo comprensibles en la app.",
    "## 2. Compra y prueba",
    "Apple procesa el pago mediante In-App Purchase y carga el importe a tu Apple Account. Si existe una prueba u oferta, Apple muestra antes de confirmar su duración, elegibilidad y precio posterior. Los precios mostrados en esta web son orientativos y nunca sustituyen al precio del App Store de tu territorio.",
    "## 3. Renovación automática",
    "La suscripción se renueva automáticamente por el mismo periodo salvo cancelación al menos 24 horas antes del final del periodo vigente. Apple puede realizar el cargo dentro de las 24 horas anteriores a la renovación al precio mostrado para el siguiente periodo.",
    "## 4. Gestionar, cancelar y restaurar",
    "Puedes gestionar o cancelar la suscripción desde Ajustes > tu nombre > Suscripciones en el iPhone o iPad. Eliminar Kinsera no cancela una suscripción. Kinsera incluye Restaurar compras para recuperar el acceso adquirido con el mismo Apple Account cuando Apple confirme el estado.",
    "## 5. Reembolsos y cambios",
    "Apple gestiona reembolsos, pagos, disputas de facturación y cambios de precio conforme a sus reglas y la legislación aplicable. Puedes solicitar un reembolso en reportaproblem.apple.com. Nada de estas condiciones limita los derechos obligatorios del consumidor.",
    `## 6. Fin del acceso y contacto\nAl finalizar el periodo pagado se desactivan las funciones Plus y permanecen las funciones gratuitas disponibles. La cancelación o expiración no borra automáticamente tu configuración local. Soporte de compras y suscripciones: ${supportEmail}.`
  ],
  [
    "These terms complement Kinsera's Terms of Use and Privacy Policy. The final contractual information, price, currency, taxes, and eligibility are what Apple displays before purchase confirmation.",
    "## 1. Plans and features",
    "Kinsera Plus may offer monthly and annual auto-renewable plans for Premium features such as routines, reports, requests, and additional tools when available in the released version. Essential local controls and protection status should remain understandable in the app.",
    "## 2. Purchase and trial",
    "Apple processes payment through In-App Purchase and charges your Apple Account. If a trial or offer exists, Apple displays its duration, eligibility, and post-offer price before confirmation. Prices shown on this website are indicative and never replace the App Store price for your territory.",
    "## 3. Automatic renewal",
    "The subscription renews automatically for the same period unless canceled at least 24 hours before the current period ends. Apple may charge within the 24 hours before renewal at the displayed next-period price.",
    "## 4. Manage, cancel, and restore",
    "You can manage or cancel from Settings > your name > Subscriptions on iPhone or iPad. Deleting Kinsera does not cancel a subscription. Kinsera includes Restore Purchases to recover access bought with the same Apple Account once Apple confirms the state.",
    "## 5. Refunds and changes",
    "Apple handles refunds, payments, billing disputes, and price changes under its rules and applicable law. You can request a refund at reportaproblem.apple.com. Nothing in these terms limits mandatory consumer rights.",
    `## 6. End of access and contact\nWhen the paid period ends, Plus features are disabled and available free features remain. Cancellation or expiration does not automatically erase local configuration. Purchase and subscription support: ${supportEmail}.`
  ]
);

const safety = page(
  "Compromiso de seguridad familiar de Kinsera",
  "Kinsera Family Safety Statement",
  [
    "Kinsera está diseñada para que una persona responsable configure límites digitales claros y comprensibles en dispositivos Apple. El modo niño está en integración y validación; esta guía explica su comportamiento previsto, no confirma que esté disponible en la versión publicada. Esta página complementa la Política de privacidad y los Términos de uso.",
    "## Transparencia para la familia",
    "La persona protegida puede ver que existe un límite, su temporizador y la acción disponible. Kinsera no lee conversaciones, no captura pantallas ni construye un historial secreto de navegación. La ubicación no forma parte del modo niño; otra función familiar puede compartir observaciones de ubicación si el adulto la configura y autoriza.",
    "## Control local y sin conexión",
    "Los bloqueos locales se aplican en el dispositivo. El modo niño conectado usa una conexión familiar de iCloud/CloudKit y requiere que el cliente reciba y confirme la orden; sin conectividad no hay confirmación remota. Se comparte únicamente la información técnica descrita en la Política de privacidad. La autorización individual no impide desinstalar Kinsera; para protección frente al borrado se necesita autorización de tutor en En familia.",
    "## Uso por parte de adultos responsables",
    "No uses Kinsera para vigilar o controlar a otra persona adulta sin consentimiento. Ajusta los límites a la edad, necesidades y seguridad de cada menor, revisa periódicamente la configuración y mantén un canal familiar para pedir ayuda o más tiempo.",
    `## Seguridad y soporte\nSi un límite se aplica por error, revisa la autorización de Family Controls, la política local y los ajustes del dispositivo. Para ayuda técnica o para informar de un riesgo de seguridad, escribe a ${supportEmail}.`
  ],
  [
    "Kinsera is designed to help a responsible adult configure clear, understandable digital limits on Apple devices. Child Mode is in integration and validation; this guide describes intended behavior and does not confirm availability in the public release. This page complements the Privacy Policy and Terms of Use.",
    "## Transparency for the family",
    "The protected person can see that a limit exists, its timer, and the available action. Kinsera does not read conversations, capture screens, or build a secret browsing history. Location is not part of Child Mode; another family feature can share location observations if an adult configures and authorizes it.",
    "## Local and offline control",
    "Local shields are enforced on the device. Connected Child Mode uses an iCloud/CloudKit family connection and requires the client to receive and confirm the command; without connectivity there is no remote confirmation. Only the technical information described in the Privacy Policy is shared. Individual authorization does not prevent Kinsera from being deleted; guardian authorization through Family Sharing is required for deletion protection.",
    "## Responsible adult use",
    "Do not use Kinsera to monitor or control another adult without consent. Adjust limits to each child's age, needs, and safety, review settings regularly, and keep a family channel for requesting help or more time.",
    `## Safety and support\nIf a limit is applied by mistake, review Family Controls authorization, the local policy, and device settings. For technical help or to report a safety concern, contact ${supportEmail}.`
  ]
);

export const kinseraApp: AppItem = {
  id: "kinsera",
  slug: "kinsera",
  name: "Kinsera",
  tagline: "Límites digitales claros, privados y familiares.",
  tagline_en: "Clear, private, family-first digital limits.",
  shortDescription: "Configura límites de apps, categorías y webs y consulta la guía de Modo niño, con requisitos, pasos y límites de iOS.",
  shortDescription_en: "Set app, category, and website limits, and read the Child Mode guide for setup, requirements, and iOS limits.",
  longDescription: "Kinsera convierte Apple Screen Time en una experiencia familiar clara: la persona responsable configura la protección y el dispositivo aplica los límites localmente. La guía de Modo niño explica cómo elegir apps, fijar el temporizador y controlar una sesión local o conectada, junto con los requisitos y límites de iOS.",
  longDescription_en: "Kinsera turns Apple Screen Time into a clear family experience: a responsible adult configures protection and the device enforces limits locally. The Child Mode guide explains app selection, session timers, local or connected control, and the requirements and limits of iOS.",
  problem: "Los límites digitales suelen estar dispersos entre ajustes del sistema, reglas difíciles de explicar y herramientas que dependen de una cuenta o de un servidor.",
  problem_en: "Digital limits are often scattered across system settings, hard-to-explain rules, and tools that depend on an account or server.",
  benefits: [
    "Control local: La protección se aplica en el propio dispositivo, incluso sin conexión.",
    "Límites configurables: Selecciona apps, categorías y webs, y combina horarios, temporizadores y pausas.",
    "Transparencia familiar: El dispositivo protegido muestra el límite activo y las acciones disponibles.",
    "Modo niño: Lista de apps y temporizador bajo control del tutor; la disponibilidad conectada depende de iCloud y de la validación de la versión.",
    "Privacidad por diseño: No enviamos nombres, dominios, mensajes ni historial de uso a analítica; la ubicación es opcional y requiere autorización."
  ],
  benefits_en: [
    "Local control: Protection is enforced on the device, even without a connection.",
    "Configurable limits: Select apps, categories, and websites, then combine schedules, timers, and pauses.",
    "Family transparency: The protected device shows the active limit and available actions.",
    "Child Mode: App allowlist and timer controlled by the guardian; connected availability depends on iCloud and release validation.",
    "Privacy by design: We do not send names, domains, messages, or usage history to analytics; location is optional and permission-based."
  ],
  features: [
    "Selector de Apple: Elige apps, categorías y sitios web mediante FamilyActivityPicker.",
    "Temporizadores y horarios: Aplica límites de corta duración y rutinas repetibles por días.",
    "Pausa y solicitudes: Pausa la protección con autorización y conserva las solicitudes de tiempo de forma local.",
    "Bloqueo explicable: El escudo informa por qué el contenido no está disponible y qué puede hacer la familia.",
    "Actividad agregada: Consulta totales de uso sin mostrar nombres de apps, dominios o mensajes en diagnósticos.",
    "Widget y Atajos: Consulta el estado y ejecuta acciones locales desde superficies del sistema cuando estén configuradas.",
    "Modo niño: El tutor permite apps concretas durante un periodo y conserva la sesión bloqueada hasta que actúe; consulta la guía para conocer límites y disponibilidad.",
    "Control conectado: Las órdenes se confirman solo tras el acuse del dispositivo cliente; iCloud y conectividad son necesarios."
  ],
  features_en: [
    "Apple picker: Choose apps, categories, and websites through FamilyActivityPicker.",
    "Timers and schedules: Apply short limits and repeatable day-based routines.",
    "Pause and requests: Pause protection with authorization and keep time requests locally.",
    "Explainable shield: The shield explains why content is unavailable and what the family can do.",
    "Aggregate activity: See usage totals without exposing app names, domains, or messages in diagnostics.",
    "Widget and Shortcuts: Check status and run local actions from system surfaces when configured.",
    "Child Mode: The guardian allows specific apps for a set period and keeps the session locked until taking action; see the guide for limits and availability.",
    "Connected control: Commands are confirmed only after the client device receipt arrives; iCloud and connectivity are required."
  ],
  audience: "Familias y tutores que quieren límites digitales comprensibles y privados en iPhone y iPad.",
  audience_en: "Families and guardians who want understandable, private digital limits on iPhone and iPad.",
  status: "published",
  featured: true,
  category: "Estilo de vida",
  category_en: "Lifestyle",
  platform: ["iOS", "iPadOS"],
  supportEmail,
  supportedLocales: ["es", "en"],
  iconUrl: "assets/images/kinsera/kinsera-appstore-icon.webp",
  coverImageUrl: "assets/images/kinsera/showcase-es.png",
  videoUrl: "assets/videos/kinsera/kinsera-hero.mp4",
  screenshots: ["01-set", "02-choose", "03-control", "04-time", "05-pause", "06-plan", "07-review", "08-see", "09-privacy", "10-start"],
  appStoreUrl: "https://apps.apple.com/es/app/kinsera-control-parental/id6805556421",
  primaryCtaLabel: "Descargar en el App Store",
  primaryCtaLabel_en: "Get it on the App Store",
  primaryCtaUrl: "https://apps.apple.com/es/app/kinsera-control-parental/id6805556421",
  secondaryCtaLabel: "Soporte de la app",
  secondaryCtaLabel_en: "App support",
  secondaryCtaUrl: "/es/casos/kinsera/soporte/",
  colorPrimary: "#12243d",
  colorSecondary: "#5eead4",
  publishedAt: "2026-09-09",
  updatedAt: "2026-10-13",
  promotionalText: "Control parental local y transparente: bloqueos, temporizadores, rutinas y actividad agregada sin convertir la vida familiar en vigilancia.",
  promotionalText_en: "Local, transparent parental control: shields, timers, routines, and aggregate activity without turning family life into surveillance.",
  seo: {
    title: "Kinsera: control parental local y privado | RomeroDev",
    description: "Configura límites de apps, categorías, sitios web y sesiones de Modo niño en iPhone y iPad; consulta disponibilidad, pasos, privacidad y límites de Apple.",
    description_en: "Set app, category, website, and Child Mode limits on iPhone and iPad; read setup, privacy, availability, and Apple platform limits.",
    keywords: "control parental,seguridad infantil,screen time,bloqueo apps,temporizador,privacidad,familia",
    keywords_en: "parental controls,kids safety,screen time,app blocker,timer,privacy,family"
  },
  pricing: [
    { name: "Mensual", name_en: "Monthly", price: "2,99 €", price_en: "€2.99", cadence: "/mes", cadence_en: "/month", description: "Apple muestra el importe final por territorio antes de confirmar.", description_en: "Apple shows the final price for your territory before confirmation.", isIndicative: true },
    { name: "Anual", name_en: "Annual", price: "29,99 €", price_en: "€29.99", cadence: "/año", cadence_en: "/year", description: "Apple muestra el importe final por territorio antes de confirmar.", description_en: "Apple shows the final price for your territory before confirmation.", featured: true, badge: "Mejor valor", badge_en: "Best value", isIndicative: true }
  ],
  freeFeatures: ["Protección local", "Selector de apps, categorías y webs", "Temporizadores y pausas", "Estado transparente"],
  freeFeatures_en: ["Local protection", "App, category, and website picker", "Timers and pauses", "Transparent status"],
  proFeatures: ["Rutinas ampliadas", "Informes agregados", "Solicitudes de tiempo", "Herramientas Premium disponibles en la versión publicada"],
  proFeatures_en: ["Extended routines", "Aggregate reports", "Time requests", "Premium tools available in the released version"],
  faq: [
    { question: "¿Qué es Modo niño?", question_en: "What is Child Mode?", answer: "Permite al tutor elegir de 1 a 50 apps individuales y fijar una sesión de 5 a 180 minutos. Al terminar, el dispositivo bloquea las apps y espera la decisión del tutor.", answer_en: "It lets a guardian choose 1 to 50 individual apps and set a 5 to 180 minute session. At expiry, the device shields apps and waits for the guardian's decision." },
    { question: "¿Está disponible en la versión del App Store?", question_en: "Is it available in the App Store version?", answer: "El flujo está en integración y validación. Falta desplegar el esquema CloudKit, completar la prueba con dos dispositivos físicos y actualizar App Privacy. Consulta la versión instalada; esta guía no confirma que el binario público ya incluya Modo niño.", answer_en: "The flow is in integration and validation. CloudKit schema deployment, a two-device physical test, and the App Privacy update remain. Check your installed version; this guide does not confirm that the public binary includes Child Mode." },
    { question: "¿Cómo lo configuro en el mismo iPhone?", question_en: "How do I set it up on the same iPhone?", answer: "En los controles parentales de Kinsera, autoriza Family Controls como tutor, elige de 1 a 50 apps con el selector de Apple, ajusta entre 5 y 180 minutos y pulsa Iniciar modo niño.", answer_en: "In Kinsera parental controls, authorize Family Controls as a guardian, select 1 to 50 apps with Apple's picker, choose 5 to 180 minutes, and tap Start Child Mode." },
    { question: "¿Puedo controlarlo desde el móvil del tutor?", question_en: "Can I control it from the guardian's phone?", answer: "Sí, cuando ambos dispositivos estén enlazados en la conexión familiar de Kinsera y tengan permisos de Apple. El tutor elige el dispositivo cliente y envía la sesión. La app la marca aplicada solo cuando el cliente confirma la recepción y la aplicación del escudo.", answer_en: "Yes, once both devices are linked in Kinsera's family connection and have Apple's permissions. The guardian chooses the client device and sends the session. Kinsera reports it as applied only after the client confirms receipt and shield enforcement." },
    { question: "¿La invitación queda vinculada a la cuenta del menor?", question_en: "Is the invitation tied to the child's account?", answer: "No antes de canjearla. Es un enlace privado de un solo uso, pero quien lo reciba puede reclamarlo primero. Compártelo directamente con el dispositivo previsto; si lo reclama otra cuenta, retira ese participante desde los controles de compartir de Apple y crea otra invitación.", answer_en: "Not before redemption. It is a private single-use URL, but whoever receives it can claim it first. Send it directly to the intended device; if another account claims it, remove that participant in Apple's share controls and create a new invitation." },
    { question: "¿Qué pasa cuando se acaba el tiempo?", question_en: "What happens when time runs out?", answer: "El dispositivo aplica un escudo a todas las apps y el menor puede solicitar más tiempo. Device Activity depende de callbacks de iOS: el cambio no está garantizado al segundo y el evento puede llegar al volver a usar el dispositivo. Kinsera también reconcilia el vencimiento al abrirse.", answer_en: "The device shields all apps and the child can request more time. Device Activity relies on iOS callbacks: a change is not guaranteed at the exact second and the event may arrive when the device is used again. Kinsera also reconciles expiry when opened." },
    { question: "¿Cerrar Kinsera detiene el modo?", question_en: "Does closing Kinsera stop the mode?", answer: "No. Los escudos se aplican mediante Managed Settings y permanecen aunque se cierre la app. Para terminar o extender la sesión hace falta la acción del tutor. iOS sigue controlando la entrega de los eventos temporizados.", answer_en: "No. Managed Settings applies the shields and they remain when the app closes. Ending or extending a session requires the guardian. iOS still controls delivery of timer events." },
    { question: "¿El menor puede desinstalar Kinsera?", question_en: "Can the child delete Kinsera?", answer: "La protección frente al borrado requiere autorización de Family Controls aprobada por tutor para una cuenta infantil de En familia. La autorización individual no impide desinstalar la app. El control del código, de la cuenta Apple o el borrado/restauración del dispositivo queda fuera de Kinsera.", answer_en: "Deletion protection requires guardian-approved Family Controls authorization for a child account in Family Sharing. Individual authorization does not prevent app deletion. Control of the device passcode, Apple Account, or erase/restore process is outside Kinsera." },
    { question: "¿Se bloquean los chats y botones de compartir de una app permitida?", question_en: "Are chats and share buttons inside an allowed app blocked?", answer: "No necesariamente. Modo niño limita apps y dominios con Screen Time; no puede quitar chat, enlaces, navegador integrado, compras ni opciones de compartir dentro de una app permitida. Elige solo apps cuyo contenido interno sea apropiado.", answer_en: "Not necessarily. Child Mode limits apps and domains through Screen Time; it cannot remove chat, links, an embedded browser, purchases, or share options inside an allowed app. Choose apps whose internal features are appropriate." },
    { question: "¿Funciona sin conexión?", question_en: "Does it work offline?", answer: "La sesión local se aplica en el dispositivo y no necesita internet. El control entre dispositivos requiere iCloud/CloudKit y conectividad. Si el cliente no confirma una orden, el estado del tutor permanece pendiente.", answer_en: "A local session is enforced on the device and does not need internet. Cross-device control needs iCloud/CloudKit and connectivity. If the client does not confirm a command, the guardian sees it as pending." },
    { question: "¿Qué datos se sincronizan?", question_en: "What data is synced?", answer: "La selección de apps viaja como payload opaco en un campo cifrado de CloudKit dentro del share del dispositivo. Las solicitudes incluyen un ID aleatorio, duración, fecha y estado; los acuses indican el resultado técnico. No se envían nombres de apps, dominios, mensajes ni historial a analítica. La ubicación y la batería pertenecen a funciones familiares opcionales.", answer_en: "The app selection travels as an opaque payload in an encrypted CloudKit field inside that device's share. Requests include a random ID, duration, date, and state; receipts report the technical result. App names, domains, messages, and history are not sent to analytics. Location and battery belong to optional family features." },
    { question: "¿Puedo permitir una categoría o una web en vez de una app?", question_en: "Can I allow a category or website instead of an app?", answer: "Modo niño admite apps individuales: de 1 a 50. No permite configurar categorías o dominios como lista permitida.", answer_en: "Child Mode accepts individual apps: 1 to 50. It does not support categories or domains as an allowlist." },
    { question: "¿Cómo solicito más tiempo?", question_en: "How can the child request more time?", answer: "Cuando la sesión está bloqueada, el menor puede enviar una solicitud desde el escudo. El tutor la aprueba o rechaza; la aprobación conserva la misma selección de apps y agrega tiempo.", answer_en: "When the session is locked, the child can send a request from the shield. The guardian approves or denies it; approval keeps the same app selection and adds time." },
    { question: "¿Desinstalar la app borra los datos de iCloud?", question_en: "Does uninstalling the app delete iCloud data?", answer: "No necesariamente. Desinstalar Kinsera no borra automáticamente los registros de CloudKit. La versión de desarrollo incluye una opción para borrar la zona de un dispositivo tras recibir confirmación del cliente; está pendiente de validación física y publicación. Hasta entonces, contacta con soporte para solicitar supresión.", answer_en: "Not necessarily. Uninstalling Kinsera does not automatically remove CloudKit records. The development version includes a way to delete a device zone after the client confirms the session ended; it is pending physical validation and release. Until then, contact support for erasure requests." },
    { question: "¿Cómo exporto o borro los datos de CloudKit?", question_en: "How can I export or delete CloudKit data?", answer: "La versión de desarrollo incluye exportación JSON de una conexión y dos opciones de salida: el tutor borra toda la zona del dispositivo solo tras recibir el acuse aceptado de fin de sesión del cliente; el participante puede salir del share después de acabar Modo niño y desbloquear los controles de tutor. La salida del participante conserva la copia del tutor; borrar la zona revoca el acceso de todos y elimina sus registros. El borrado queda bloqueado si hay más de un participante aceptado o invitaciones pendientes, hasta retirarlos en los controles de compartir de Apple. La exportación omite los tokens de selección opacos y las identidades de participantes, pero puede incluir la última ubicación sincronizada. El flujo está pendiente de validación física y publicación. Hasta entonces, contacta con soporte para solicitudes de acceso o supresión.", answer_en: "The development version includes JSON export for one connection and two exit options: the guardian deletes the complete device zone only after an accepted client receipt ending the session; the participant can leave the share after Child Mode ends and guardian controls are unlocked. Leaving preserves the owner's copy; deleting the zone revokes access for everyone and removes its records. Deletion is blocked while extra accepted participants or pending invitations remain; remove them in Apple's share controls first. The export omits opaque selection tokens and participant identities, but may contain the latest synced location. This flow is pending physical validation and release. Until then, contact support for access or erasure requests." },
    { question: "¿Cómo funcionan las compras de Kinsera Plus?", question_en: "How do Kinsera Plus purchases work?", answer: "Apple gestiona el pago, las renovaciones y los reembolsos. Puedes restaurar una compra con el mismo Apple Account y cancelar desde Ajustes > tu nombre > Suscripciones.", answer_en: "Apple handles payment, renewals, and refunds. You can restore a purchase with the same Apple Account and cancel from Settings > your name > Subscriptions." }
  ],
  legal: { privacy, terms, subscriptions, safety }
};
