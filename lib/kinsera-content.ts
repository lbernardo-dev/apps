import type { AppItem, LegalPage } from "./types";

const supportEmail = "romerodev.app@gmail.com";
const updatedAt = "2026-08-27";

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
    "Kinsera puede guardar localmente tu configuración de protección, horarios, temporizadores, estado de pausa, recuentos agregados, preferencias, solicitudes de tiempo y el estado técnico de las compras. Las selecciones y tokens necesarios para Apple Family Controls se conservan en el dispositivo o en el App Group local para que las extensiones puedan aplicar la política.",
    "## 3. Lo que no recopilamos ni enviamos",
    "Kinsera no envía a nuestros servidores nombres de menores, nombres de apps, bundle IDs, dominios, tokens de Screen Time, mensajes, fotografías, ubicación, historial de navegación, historial detallado de actividad ni el contenido de las políticas. La versión actual no tiene cuenta, backend de administración remota, publicidad, perfiles publicitarios ni seguimiento entre apps o sitios web.",
    "## 4. Procesamiento local y permisos",
    "La autorización de Family Controls, la aplicación de bloqueos mediante Managed Settings, los temporizadores, los horarios, las solicitudes locales, el estado del dispositivo y los informes agregados se ejecutan en el dispositivo con frameworks de Apple. Notificaciones y Face ID solo se solicitan cuando activas sus funciones. Puedes usar las funciones locales sin conexión; los permisos pueden revocarse desde Ajustes.",
    "## 5. Informes y diagnóstico",
    "Cuando autorizas Device Activity, Kinsera muestra totales y recuentos agregados dentro del dispositivo. Las extensiones permanecen sin red y no exportan nombres, dominios ni contenido de actividad. Los diagnósticos de la aplicación se limitan a estados técnicos y no deben incluir datos familiares o contenido de políticas.",
    "## 6. Apple y compras",
    "Apple procesa la autorización de Screen Time, las notificaciones del sistema, los servicios del dispositivo y las compras mediante StoreKit. Kinsera recibe el estado técnico necesario para conceder o retirar funciones Premium; no recibe los datos completos de tu tarjeta. Apple trata la información bajo sus propios términos y políticas.",
    "## 7. Roles, menores y uso responsable",
    "La persona que configura una política debe tener autoridad para hacerlo y debe explicar al usuario protegido qué límites se aplican. Kinsera no ofrece vigilancia secreta, lectura de mensajes ni seguimiento de ubicación. La persona responsable debe respetar la legislación aplicable, la autonomía y la seguridad del menor, y no utilizar la app para controlar a otra persona adulta sin su autorización.",
    "## 8. Conservación, eliminación y derechos",
    "Los datos de configuración permanecen localmente mientras los mantengas. Puedes desactivar o borrar la protección desde Kinsera y eliminar los datos locales desinstalando la app; las selecciones de Screen Time también deben revisarse en los ajustes de Apple. Como no mantenemos una cuenta ni una copia remota de estos datos en esta versión, no existe un registro remoto que podamos borrar. Puedes escribir a nuestro contacto para solicitar información o plantear derechos de acceso, rectificación, supresión, limitación, oposición o portabilidad cuando sean aplicables.",
    "## 9. Cambios",
    "Publicaremos aquí los cambios materiales con una nueva fecha de actualización y, cuando proceda, mostraremos un aviso dentro de la aplicación."
  ],
  [
    "This policy explains what Kinsera processes to provide family controls on iPhone and iPad, what stays on the device, and which choices you have. Mandatory rights in your country of residence prevail where they provide stronger protection.",
    "## 1. Controller and contact",
    `The controller is Lester Romero Bernardo (RomeroDev), based in Valencia, Spain. For privacy, support, or data requests: ${supportEmail}.`,
    "## 2. Data Kinsera processes",
    "Kinsera may store your protection settings, schedules, timers, pause state, aggregate counts, preferences, time requests, and technical purchase state locally. The selections and tokens required by Apple Family Controls remain on the device or in the local App Group so the extensions can enforce the policy.",
    "## 3. What we do not collect or send",
    "Kinsera does not send child names, app names, bundle IDs, domains, Screen Time tokens, messages, photos, location, browsing history, detailed activity history, or policy contents to our servers. The current version has no account, remote-administration backend, advertising, advertising profiles, or cross-app and cross-site tracking.",
    "## 4. On-device processing and permissions",
    "Family Controls authorization, Managed Settings enforcement, timers, schedules, local requests, device status, and aggregate reports run on the device using Apple's frameworks. Notifications and Face ID are requested only when you enable their related features. Local features work offline; permissions can be revoked in Settings.",
    "## 5. Reports and diagnostics",
    "When you authorize Device Activity, Kinsera shows totals and aggregate counts on the device. Extensions remain network-free and do not export names, domains, or activity content. App diagnostics are limited to technical states and must not include family data or policy contents.",
    "## 6. Apple and purchases",
    "Apple processes Screen Time authorization, system notifications, device services, and purchases through StoreKit. Kinsera receives only the technical state required to grant or remove Premium features; it does not receive your complete card details. Apple handles information under its own terms and policies.",
    "## 7. Roles, children, and responsible use",
    "The person configuring a policy must have authority to do so and should explain the active limits to the protected user. Kinsera does not provide secret surveillance, message reading, or location tracking. The responsible adult must follow applicable law, respect the child's autonomy and safety, and never use the app to control another adult without consent.",
    "## 8. Retention, deletion, and rights",
    "Configuration data remains local while you keep it. You can disable or clear protection from Kinsera and remove local data by uninstalling the app; Apple's Screen Time selections should also be reviewed in Apple Settings. Because this version keeps no account or remote copy of this data, there is no remote record for us to erase. You can contact us to request information or exercise access, rectification, erasure, restriction, objection, or portability rights where applicable.",
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
    "Kinsera es una herramienta local para configurar límites familiares en dispositivos Apple: selección de apps, categorías y sitios web mediante el selector del sistema, bloqueos, temporizadores, horarios, pausas, solicitudes de tiempo, informes agregados y superficies como widgets o Atajos cuando estén disponibles. La administración remota entre dispositivos no forma parte de la versión actual.",
    "## 2. Autoridad y transparencia",
    "Solo debes configurar o cambiar una política si tienes autoridad para hacerlo. Debes comunicar los límites de forma adecuada a la persona protegida, mantener el código del dispositivo y las credenciales bajo control y revisar que los límites sean proporcionales a la edad, la seguridad y las necesidades de la familia.",
    "## 3. Apple Screen Time",
    "La aplicación depende de Family Controls, Managed Settings, Device Activity, permisos del sistema, Family Sharing cuando proceda y las versiones compatibles de iOS o iPadOS. Apple puede limitar, cambiar o interrumpir estos servicios. Si el permiso se revoca, el dispositivo se reinicia o una función del sistema no está disponible, debes comprobar manualmente el estado de la protección.",
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
    "Kinsera is a local tool for configuring family limits on Apple devices: selecting apps, categories, and websites through Apple's system picker, plus shields, timers, schedules, pauses, time requests, aggregate reports, and surfaces such as widgets or Shortcuts when available. Remote administration between devices is not part of the current version.",
    "## 2. Authority and transparency",
    "You must configure or change a policy only when you have authority to do so. Explain limits appropriately to the protected person, keep the device passcode and credentials under control, and review whether limits are proportionate to the family's age, safety, and needs.",
    "## 3. Apple Screen Time",
    "The app depends on Family Controls, Managed Settings, Device Activity, system permissions, Family Sharing where applicable, and compatible iOS or iPadOS versions. Apple may limit, change, or interrupt these services. If permission is revoked, the device restarts, or a system feature is unavailable, you should manually check protection status.",
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
    "Kinsera está diseñada para que una persona responsable configure límites digitales claros y verificables en dispositivos Apple. Esta página complementa la Política de privacidad y los Términos de uso; no los sustituye.",
    "## Transparencia para la familia",
    "La persona protegida puede ver que existe un límite, su temporizador y la acción disponible. Kinsera no lee conversaciones, no captura pantallas, no obtiene ubicación y no construye un historial secreto de navegación.",
    "## Control local y sin conexión",
    "Los bloqueos, horarios, temporizadores, pausas y estados principales funcionan en el dispositivo sin depender de una cuenta o de un servidor. Las funciones entre dispositivos solo podrán habilitarse en una versión futura si existe una conexión segura, un rol autorizado y una explicación clara de qué se comparte.",
    "## Uso por parte de adultos responsables",
    "No uses Kinsera para vigilar o controlar a otra persona adulta sin consentimiento. Ajusta los límites a la edad, necesidades y seguridad de cada menor, revisa periódicamente la configuración y mantén un canal familiar para pedir ayuda o más tiempo.",
    `## Seguridad y soporte\nSi un límite se aplica por error, revisa la autorización de Family Controls, la política local y los ajustes del dispositivo. Para ayuda técnica o para informar de un riesgo de seguridad, escribe a ${supportEmail}.`
  ],
  [
    "Kinsera is designed to help a responsible adult configure clear, reviewable digital limits on Apple devices. This page complements the Privacy Policy and Terms of Use; it does not replace them.",
    "## Transparency for the family",
    "The protected person can see that a limit exists, its timer, and the available action. Kinsera does not read conversations, capture screens, obtain location, or build a secret browsing history.",
    "## Local and offline control",
    "Blocking, schedules, timers, pauses, and core status work on the device without depending on an account or server. Cross-device features may be enabled in a future version only when a secure connection, an authorized role, and a clear explanation of shared data exist.",
    "## Responsible adult use",
    "Do not use Kinsera to monitor or control another adult without consent. Adjust limits to each child's age, needs, and safety, review settings regularly, and keep a family channel for requesting help or more time.",
    `## Safety and support\nIf a limit is applied by mistake, review Family Controls authorization, the local policy, and device settings. For technical help or to report a safety concern, contact ${supportEmail}.`
  ]
);

export const kinseraApp: AppItem = {
  id: "kinsera",
  slug: "kinsera",
  name: "Kinsera: Kids Safety",
  tagline: "Límites digitales claros, privados y familiares.",
  tagline_en: "Clear, private, family-first digital limits.",
  shortDescription: "Configura límites de apps, categorías y sitios web con temporizadores, horarios, pausas e informes agregados que funcionan en el propio dispositivo.",
  shortDescription_en: "Set app, category, and website limits with timers, schedules, pauses, and aggregate reports that work on the device itself.",
  longDescription: "Kinsera convierte Apple Screen Time en una experiencia familiar clara: la persona responsable configura la protección, el dispositivo la aplica localmente y la persona protegida puede entender qué ocurre y cuándo termina.",
  longDescription_en: "Kinsera turns Apple Screen Time into a clear family experience: a responsible adult configures protection, the device enforces it locally, and the protected person can understand what is happening and when it ends.",
  problem: "Los límites digitales suelen estar dispersos entre ajustes del sistema, reglas difíciles de explicar y herramientas que dependen de una cuenta o de un servidor.",
  problem_en: "Digital limits are often scattered across system settings, hard-to-explain rules, and tools that depend on an account or server.",
  benefits: [
    "Control local: La protección se aplica en el propio dispositivo, incluso sin conexión.",
    "Límites configurables: Selecciona apps, categorías y webs, y combina horarios, temporizadores y pausas.",
    "Transparencia familiar: El dispositivo protegido muestra el límite activo y las acciones disponibles.",
    "Privacidad por diseño: No enviamos nombres, dominios, mensajes, ubicación ni historial detallado a un servidor."
  ],
  benefits_en: [
    "Local control: Protection is enforced on the device, even without a connection.",
    "Configurable limits: Select apps, categories, and websites, then combine schedules, timers, and pauses.",
    "Family transparency: The protected device shows the active limit and available actions.",
    "Privacy by design: We do not send names, domains, messages, location, or detailed history to a server."
  ],
  features: [
    "Selector de Apple: Elige apps, categorías y sitios web mediante FamilyActivityPicker.",
    "Temporizadores y horarios: Aplica límites de corta duración y rutinas repetibles por días.",
    "Pausa y solicitudes: Pausa la protección con autorización y conserva las solicitudes de tiempo de forma local.",
    "Bloqueo explicable: El escudo informa por qué el contenido no está disponible y qué puede hacer la familia.",
    "Actividad agregada: Consulta totales de uso sin mostrar nombres de apps, dominios o mensajes en diagnósticos.",
    "Widget y Atajos: Consulta el estado y ejecuta acciones locales desde superficies del sistema cuando estén configuradas.",
    "Preparada para roles: La base local separa la vista responsable de la vista protegida; el control entre dispositivos requiere conexión y autorización futura."
  ],
  features_en: [
    "Apple picker: Choose apps, categories, and websites through FamilyActivityPicker.",
    "Timers and schedules: Apply short limits and repeatable day-based routines.",
    "Pause and requests: Pause protection with authorization and keep time requests locally.",
    "Explainable shield: The shield explains why content is unavailable and what the family can do.",
    "Aggregate activity: See usage totals without exposing app names, domains, or messages in diagnostics.",
    "Widget and Shortcuts: Check status and run local actions from system surfaces when configured.",
    "Role-ready foundation: The local base separates responsible and protected views; cross-device control requires future connectivity and authorization."
  ],
  audience: "Familias y tutores que quieren límites digitales comprensibles y privados en iPhone y iPad.",
  audience_en: "Families and guardians who want understandable, private digital limits on iPhone and iPad.",
  status: "coming_soon",
  featured: true,
  category: "Estilo de vida",
  category_en: "Lifestyle",
  platform: ["iOS", "iPadOS"],
  supportEmail,
  iconUrl: "assets/images/kinsera/kinsera-icon.svg",
  coverImageUrl: "assets/images/kinsera/kinsera-control-plane.svg",
  screenshots: ["control-plane"],
  primaryCtaLabel: "Ver soporte y lanzamiento",
  primaryCtaLabel_en: "View support and launch",
  primaryCtaUrl: "/es/casos/kinsera/soporte/",
  secondaryCtaLabel: "Privacidad",
  secondaryCtaLabel_en: "Privacy",
  secondaryCtaUrl: "/es/casos/kinsera/privacidad/",
  colorPrimary: "#12243d",
  colorSecondary: "#5eead4",
  updatedAt,
  promotionalText: "Control parental local y transparente: bloqueos, temporizadores, rutinas y actividad agregada sin convertir la vida familiar en vigilancia.",
  promotionalText_en: "Local, transparent parental control: shields, timers, routines, and aggregate activity without turning family life into surveillance.",
  seo: {
    title: "Kinsera: control parental local y privado | RomeroDev",
    description: "Configura límites de apps, categorías y sitios web con temporizadores, horarios y protección local para iPhone y iPad.",
    keywords: "control parental,seguridad infantil,screen time,bloqueo apps,temporizador,privacidad,familia",
    keywords_en: "parental controls,kids safety,screen time,app blocker,timer,privacy,family"
  },
  pricing: [
    { name: "Mensual", name_en: "Monthly", price: "Precio en App Store", cadence: "/mes", cadence_en: "/month", description: "Apple mostrará el precio, impuestos y condiciones finales antes de confirmar.", description_en: "Apple shows the final price, taxes, and terms before confirmation.", isIndicative: true },
    { name: "Anual", name_en: "Annual", price: "Precio en App Store", cadence: "/año", cadence_en: "/year", description: "La disponibilidad y elegibilidad dependen del territorio y de Apple.", description_en: "Availability and eligibility depend on territory and Apple.", featured: true, badge: "Mejor valor", badge_en: "Best value", isIndicative: true }
  ],
  freeFeatures: ["Protección local", "Selector de apps, categorías y webs", "Temporizadores y pausas", "Estado transparente"],
  freeFeatures_en: ["Local protection", "App, category, and website picker", "Timers and pauses", "Transparent status"],
  proFeatures: ["Rutinas ampliadas", "Informes agregados", "Solicitudes de tiempo", "Herramientas Premium disponibles en la versión publicada"],
  proFeatures_en: ["Extended routines", "Aggregate reports", "Time requests", "Premium tools available in the released version"],
  faq: [
    { question: "¿Kinsera funciona sin conexión?", question_en: "Does Kinsera work offline?", answer: "Sí. La autorización, los bloqueos, temporizadores, horarios, pausas y el estado local funcionan en el propio dispositivo. Apple puede exigir permisos o Family Sharing para determinados escenarios.", answer_en: "Yes. Authorization, shields, timers, schedules, pauses, and local status work on the device itself. Apple may require permissions or Family Sharing for specific scenarios." },
    { question: "¿Qué puedo controlar?", question_en: "What can I control?", answer: "Puedes elegir apps, categorías y sitios web mediante el selector de Apple y aplicar límites temporales o rutinas. La disponibilidad concreta depende de las APIs y permisos de Apple.", answer_en: "You can choose apps, categories, and websites through Apple's picker and apply time limits or routines. Exact availability depends on Apple's APIs and permissions." },
    { question: "¿Kinsera lee mensajes o mi ubicación?", question_en: "Does Kinsera read messages or location?", answer: "No. Esas funciones no forman parte del producto. La app no lee conversaciones, no captura pantallas y no rastrea ubicación.", answer_en: "No. Those features are not part of the product. The app does not read conversations, capture screens, or track location." },
    { question: "¿Puede un adulto controlar otro dispositivo?", question_en: "Can an adult control another device?", answer: "La versión actual está implementada para control local en el mismo dispositivo. La base contempla roles, pero el control entre dispositivos requiere una versión futura con conexión, autorización y un modelo de compartición revisado.", answer_en: "The current version is implemented for local control on the same device. The foundation anticipates roles, but cross-device control requires a future version with connectivity, authorization, and a reviewed sharing model." },
    { question: "¿Qué ocurre cuando se bloquea algo?", question_en: "What happens when something is blocked?", answer: "El escudo de Apple muestra una explicación clara del límite activo y la acción disponible, por ejemplo esperar al final del horario o solicitar tiempo cuando la configuración lo permita.", answer_en: "Apple's shield shows a clear explanation of the active limit and available action, such as waiting until the schedule ends or requesting time when configured." },
    { question: "¿Dónde se guardan las políticas?", question_en: "Where are policies stored?", answer: "La configuración y los tokens necesarios para aplicar la protección se guardan localmente. Kinsera no mantiene una copia remota ni envía el contenido de la política a un servidor.", answer_en: "Configuration and the tokens required to enforce protection stay local. Kinsera does not keep a remote copy or send policy contents to a server." },
    { question: "¿Cómo funcionan las compras de Kinsera Plus?", question_en: "How do Kinsera Plus purchases work?", answer: "Apple gestiona el pago, las renovaciones y los reembolsos. Puedes restaurar una compra con el mismo Apple Account y cancelar desde Ajustes > tu nombre > Suscripciones.", answer_en: "Apple handles payment, renewals, and refunds. You can restore a purchase with the same Apple Account and cancel from Settings > your name > Subscriptions." },
    { question: "¿Cómo elimino mis datos?", question_en: "How do I delete my data?", answer: "Desactiva o borra la protección desde Kinsera y desinstala la app para eliminar sus datos locales. Revisa también los ajustes de Screen Time de Apple; no existe una cuenta o copia remota que solicitar borrar en esta versión.", answer_en: "Disable or clear protection in Kinsera and uninstall the app to remove its local data. Also review Apple's Screen Time settings; this version has no account or remote copy to request deletion from." }
  ],
  legal: { privacy, terms, subscriptions, safety }
};
