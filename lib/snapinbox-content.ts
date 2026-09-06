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
  "Política de privacidad de SnapInbox",
  "SnapInbox Privacy Policy",
  [
    "Esta política explica qué información trata SnapInbox para convertir imágenes y documentos en acciones revisables, qué permanece en tus dispositivos y qué servicios externos participan cuando activas una suscripción. Los derechos imperativos del país donde resides prevalecen cuando ofrecen una protección mayor.",
    "## 1. Responsable y contacto",
    `El responsable es Lester Romero Bernardo (RomeroDev), con domicilio en Valencia, España. Para privacidad, soporte o solicitudes relacionadas con tus datos: ${supportEmail}.`,
    "## 2. Información que SnapInbox procesa en el dispositivo",
    "Cuando importas una captura, imagen o PDF, SnapInbox procesa localmente el contenido seleccionado, el texto reconocido, los campos detectados, tus correcciones, las etiquetas y los elementos que decides guardar. También puede guardar localmente preferencias, historial de acciones confirmadas, ajustes de retención y datos necesarios para mostrar Inbox, Archivo, el widget, la extensión Share y los Atajos.",
    "El reconocimiento y la extracción se realizan en el dispositivo cuando la función está disponible. Las fechas, lugares, enlaces, precios y referencias detectados se presentan como propuestas: no se crea una acción de Calendario o Recordatorios sin tu revisión y confirmación.",
    "## 3. Lo que no enviamos como contenido",
    "La versión actual no envía a nuestros servidores tus capturas, fotografías, PDF, texto OCR, nombres, direcciones, códigos, precios, enlaces, eventos, recordatorios ni el contenido de tus elementos guardados. La app no necesita una cuenta y sus funciones principales son locales y utilizables sin conexión.",
    "## 4. Compras, Apple y RevenueCat",
    "Apple procesa las compras mediante StoreKit y el App Store. Para mantener el acceso Pro, restaurar compras y sincronizar el estado técnico de una suscripción, SnapInbox usa RevenueCat. RevenueCat puede recibir un identificador anónimo de usuario de la app, identificadores de producto, estado de compra o entitlement, información de transacción y datos técnicos de la app y del dispositivo necesarios para prestar ese servicio. No enviamos a RevenueCat tus capturas, PDF ni resultados OCR. RevenueCat trata esa información conforme a su propia política de privacidad: https://www.revenuecat.com/privacy-policy.",
    "No conocemos ni almacenamos los datos completos de tu tarjeta. Apple determina el precio, los impuestos, la moneda, la facturación, las renovaciones y los reembolsos.",
    "## 5. Analítica, diagnóstico y seguimiento",
    "La configuración de producción actual no incluye un proyecto Firebase activo y no habilita analítica ni Crashlytics por defecto. El código admite una integración opcional y consentida para eventos sin contenido y diagnósticos técnicos; si una versión futura la activa, actualizaremos esta política y la ficha de privacidad de App Store Connect antes de distribuirla. SnapInbox no usa seguimiento entre apps o sitios web ni publicidad personalizada, por lo que no solicita permiso App Tracking Transparency.",
    "## 6. Conservación y eliminación",
    "Los datos de Inbox y Archivo permanecen localmente mientras los conserves y según la política de retención que elijas. Puedes revisar, corregir, exportar o eliminar tus elementos desde la app. Al desinstalarla se eliminan sus copias locales controladas por la app; las acciones que hayas confirmado en Calendario o Recordatorios se gestionan desde esas apps de Apple. No mantenemos una cuenta o una copia remota del contenido que debamos borrar por ti.",
    "## 7. Permisos y terceros",
    "SnapInbox solicita permisos solo cuando activas una función: Fotos o Archivos para importar contenido, Calendario y Recordatorios para acciones que confirmes, Notificaciones para avisos y acceso al App Group para que la extensión Share y el widget funcionen. Puedes revocar los permisos desde Ajustes. Apple, RevenueCat y otros proveedores técnicos solo participan en los servicios que efectivamente habilites.",
    "## 8. Derechos y cambios",
    `Puedes contactar con ${supportEmail} para plantear solicitudes de acceso, rectificación, supresión, limitación, oposición o portabilidad cuando sean aplicables, o para informar de una incidencia de privacidad. Publicaremos aquí los cambios materiales con una nueva fecha de actualización y, cuando proceda, mostraremos un aviso dentro de la aplicación.`
  ],
  [
    "This policy explains what SnapInbox processes to turn images and documents into reviewable actions, what stays on your devices, and which external services participate when you enable a subscription. Mandatory rights in your country of residence prevail where they provide stronger protection.",
    "## 1. Controller and contact",
    `The controller is Lester Romero Bernardo (RomeroDev), based in Valencia, Spain. For privacy, support, or data requests: ${supportEmail}.`,
    "## 2. Information SnapInbox processes on the device",
    "When you import a screenshot, image, or PDF, SnapInbox processes the selected content, recognized text, detected fields, your corrections, labels, and items you choose to save locally. It may also store preferences, confirmed-action history, retention settings, and the data needed for Inbox, Archive, the widget, the Share extension, and Shortcuts.",
    "Recognition and extraction run on the device when the feature is available. Detected dates, places, links, prices, and references are proposals: SnapInbox does not create a Calendar or Reminders action without your review and confirmation.",
    "## 3. Content we do not send",
    "The current version does not send your screenshots, photos, PDFs, OCR text, names, addresses, codes, prices, links, events, reminders, or saved-item content to our servers. The app does not require an account, and its core features are local-first and usable offline.",
    "## 4. Purchases, Apple, and RevenueCat",
    "Apple processes purchases through StoreKit and the App Store. To maintain Pro access, restore purchases, and synchronize technical subscription status, SnapInbox uses RevenueCat. RevenueCat may receive an anonymous app user ID, product identifiers, purchase or entitlement status, transaction information, and technical app or device information needed to provide that service. We do not send your screenshots, PDFs, or OCR results to RevenueCat. RevenueCat handles that information under its own privacy policy: https://www.revenuecat.com/privacy-policy.",
    "We do not know or store your full card details. Apple determines price, taxes, currency, billing, renewals, and refunds.",
    "## 5. Analytics, diagnostics, and tracking",
    "The current production configuration has no active Firebase project and does not enable analytics or Crashlytics by default. The code supports an optional, consent-based integration for content-free events and technical diagnostics; if a future version enables it, we will update this policy and the App Store Connect privacy label before distribution. SnapInbox does not use cross-app or cross-site tracking or personalized advertising, so it does not request App Tracking Transparency permission.",
    "## 6. Retention and deletion",
    "Inbox and Archive data stays local while you keep it and according to the retention policy you choose. You can review, correct, export, or delete items in the app. Uninstalling the app removes its app-controlled local copies; actions you confirmed in Calendar or Reminders are managed in those Apple apps. We do not maintain an account or remote copy of your content that we must erase for you.",
    "## 7. Permissions and third parties",
    "SnapInbox requests permissions only when you enable a feature: Photos or Files to import content, Calendar and Reminders for actions you confirm, Notifications for alerts, and the App Group so the Share extension and widget can work. You can revoke permissions in Settings. Apple, RevenueCat, and other technical providers participate only in services you actually enable.",
    `## 8. Rights and changes\nYou can contact ${supportEmail} to request access, rectification, erasure, restriction, objection, or portability where applicable, or to report a privacy concern. Material changes will be published here with a new update date and, where appropriate, an in-app notice.`
  ]
);

const terms = page(
  "Términos de uso de SnapInbox",
  "SnapInbox Terms of Use",
  [
    "Estos términos regulan el uso de SnapInbox. Al descargar o utilizar la app aceptas estos términos, la Política de privacidad y las reglas aplicables del App Store. Los derechos irrenunciables de consumidores y usuarios no quedan limitados.",
    "## 1. Servicio",
    "SnapInbox es una herramienta local para importar imágenes o PDF, reconocer información, conservar capturas revisadas y proponer próximos pasos como Calendario, Recordatorios, enlaces, exportaciones, widgets, Share y Atajos. La app presenta evidencia y confianza para que tú decidas; no garantiza que una extracción sea correcta.",
    "## 2. Revisión antes de actuar",
    "Debes revisar el contenido original, los campos detectados y la fecha antes de guardar o confirmar una acción. SnapInbox no sustituye tu criterio y no debe utilizarse como única fuente para decisiones médicas, financieras, legales, de viaje o de seguridad. Comprueba manualmente cualquier dato importante.",
    "## 3. Uso autorizado",
    "Solo debes importar material que tengas derecho a usar. No utilices SnapInbox para vulnerar la privacidad de terceros, tratar datos sin autorización, infringir la ley, eludir controles del sistema, crear spam o intentar interferir con la seguridad de la app o de Apple.",
    "## 4. Licencia y propiedad intelectual",
    "SnapInbox, su código, marca, diseño, textos y materiales propios pertenecen a Lester Romero Bernardo (RomeroDev) o a sus licenciantes. Se concede una licencia personal, limitada, no exclusiva, no transferible y revocable para usar la app en dispositivos Apple compatibles, conforme al Standard EULA de Apple: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/.",
    "## 5. Compras y soporte",
    `Las funciones Pro se ofrecen mediante Apple In-App Purchase y están sujetas a las Condiciones de suscripción de SnapInbox y a la información que Apple muestra antes de comprar. Apple gestiona pagos, renovaciones y reembolsos. Para soporte técnico o consultas sobre datos, escribe a ${supportEmail}.`,
    "## 6. Disponibilidad y responsabilidad",
    "Podemos actualizar, modificar o retirar funciones. En la medida permitida por la ley, SnapInbox se proporciona tal como está y no respondemos por datos que no hayas revisado, decisiones tomadas sin confirmar la evidencia, interrupciones de Apple, permisos revocados, fallos del dispositivo o daños indirectos. Esta limitación no afecta a responsabilidades que no puedan excluirse legalmente.",
    "## 7. Apple como tercero beneficiario",
    "Cuando obtienes SnapInbox desde el App Store, Apple es un tercero beneficiario de estos términos y puede hacerlos cumplir frente a ti según las reglas aplicables del App Store. Apple no está obligada a prestar mantenimiento ni soporte de SnapInbox.",
    `## 8. Ley y contacto\nSe aplica la legislación de España, sin perjuicio de las normas imperativas y derechos de consumo del lugar donde resides. Contacto: Lester Romero Bernardo (RomeroDev), Valencia, España; ${supportEmail}.`
  ],
  [
    "These terms govern your use of SnapInbox. By downloading or using the app, you accept these terms, the Privacy Policy, and applicable App Store rules. Non-waivable consumer rights are not limited.",
    "## 1. Service",
    "SnapInbox is a local tool for importing images or PDFs, recognizing information, keeping reviewed captures, and suggesting next steps such as Calendar, Reminders, links, exports, widgets, Share, and Shortcuts. The app presents evidence and confidence so you can decide; it does not guarantee that extraction is correct.",
    "## 2. Review before acting",
    "You must review the original content, detected fields, and dates before saving or confirming an action. SnapInbox does not replace your judgment and should not be the sole source for medical, financial, legal, travel, or safety decisions. Manually check any important information.",
    "## 3. Authorized use",
    "Import only material you have the right to use. Do not use SnapInbox to invade another person's privacy, process data without authorization, break the law, bypass system controls, create spam, or interfere with the security of the app or Apple.",
    "## 4. License and intellectual property",
    "SnapInbox, its code, brand, design, text, and own materials belong to Lester Romero Bernardo (RomeroDev) or its licensors. You receive a personal, limited, non-exclusive, non-transferable, revocable license to use the app on compatible Apple devices under Apple's Standard EULA: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/.",
    `## 5. Purchases and support\nPro features are offered through Apple In-App Purchase and are governed by SnapInbox's Subscription Terms and the information Apple displays before purchase. Apple handles payments, renewals, and refunds. For technical support or data questions, contact ${supportEmail}.`,
    "## 6. Availability and liability",
    "We may update, change, or remove features. To the extent permitted by law, SnapInbox is provided as is and we are not responsible for unreviewed data, decisions made without confirming evidence, Apple outages, revoked permissions, device failures, or indirect damages. This limitation does not affect liability that cannot legally be excluded.",
    "## 7. Apple as third-party beneficiary",
    "When you obtain SnapInbox from the App Store, Apple is a third-party beneficiary of these terms and may enforce them against you under applicable App Store rules. Apple is not required to provide maintenance or support for SnapInbox.",
    `## 8. Law and contact\nSpanish law applies, without prejudice to mandatory rules and consumer rights in your place of residence. Contact: Lester Romero Bernardo (RomeroDev), Valencia, Spain; ${supportEmail}.`
  ]
);

const subscriptions = page(
  "Condiciones de suscripción de SnapInbox Pro",
  "SnapInbox Pro Subscription Terms",
  [
    "Estas condiciones complementan los Términos de uso y la Política de privacidad de SnapInbox. La información contractual final, el precio, la moneda, los impuestos y la elegibilidad son los que Apple muestra antes de confirmar la compra.",
    "## 1. Planes y funciones",
    "SnapInbox Pro puede ofrecer planes mensual y anual auto-renovables para aumentar el espacio de trabajo y habilitar funciones Premium disponibles en la versión publicada. La disponibilidad concreta depende del territorio, del App Store y de la configuración que Apple muestre en la pantalla de compra.",
    "## 2. Compra y ofertas",
    "Apple procesa el pago mediante In-App Purchase y carga el importe a tu Apple Account. Si existe una prueba u oferta, Apple muestra antes de confirmar su duración, elegibilidad, precio posterior y condiciones. Los precios de esta web son orientativos y nunca sustituyen al precio del App Store de tu territorio.",
    "## 3. Renovación automática",
    "La suscripción se renueva automáticamente por el mismo periodo salvo cancelación al menos 24 horas antes del final del periodo vigente. Apple puede realizar el cargo dentro de las 24 horas anteriores a la renovación al precio mostrado para el siguiente periodo.",
    "## 4. Gestionar, cancelar y restaurar",
    "Puedes gestionar o cancelar la suscripción desde Ajustes > tu nombre > Suscripciones en el iPhone o iPad. Eliminar SnapInbox no cancela la suscripción. Usa Restaurar compras dentro de SnapInbox para recuperar el acceso adquirido con el mismo Apple Account cuando Apple y RevenueCat confirmen el estado.",
    "## 5. Reembolsos, cambios y fin del acceso",
    "Apple gestiona reembolsos, pagos, disputas de facturación y cambios de precio conforme a sus reglas y la legislación aplicable. Puedes solicitar un reembolso en https://reportaproblem.apple.com. Al finalizar el periodo pagado se desactivan las funciones Pro y permanecen las funciones gratuitas disponibles; la cancelación o expiración no borra automáticamente tus datos locales.",
    `## 6. Contacto\nPara ayuda con compras, restauración o suscripciones: ${supportEmail}.`
  ],
  [
    "These terms complement SnapInbox's Terms of Use and Privacy Policy. The final contractual information, price, currency, taxes, and eligibility are what Apple displays before purchase confirmation.",
    "## 1. Plans and features",
    "SnapInbox Pro may offer monthly and annual auto-renewable plans to expand the workspace and enable Premium features available in the released version. Exact availability depends on territory, the App Store, and the configuration Apple shows on the purchase screen.",
    "## 2. Purchase and offers",
    "Apple processes payment through In-App Purchase and charges your Apple Account. If a trial or offer exists, Apple displays its duration, eligibility, post-offer price, and terms before confirmation. Website prices are indicative and never replace the App Store price in your territory.",
    "## 3. Automatic renewal",
    "The subscription renews automatically for the same period unless canceled at least 24 hours before the current period ends. Apple may charge within the 24 hours before renewal at the displayed next-period price.",
    "## 4. Manage, cancel, and restore",
    "You can manage or cancel from Settings > your name > Subscriptions on iPhone or iPad. Deleting SnapInbox does not cancel the subscription. Use Restore Purchases in SnapInbox to recover access bought with the same Apple Account once Apple and RevenueCat confirm the status.",
    "## 5. Refunds, changes, and end of access",
    "Apple handles refunds, payments, billing disputes, and price changes under its rules and applicable law. You can request a refund at https://reportaproblem.apple.com. When the paid period ends, Pro features are disabled and available free features remain; cancellation or expiration does not automatically erase local data.",
    `## 6. Contact\nFor help with purchases, restoration, or subscriptions: ${supportEmail}.`
  ]
);

export const snapInboxApp: AppItem = {
  id: "snapinbox",
  slug: "snapinbox",
  name: "SnapInbox: Action Inbox",
  tagline: "Convierte capturas en acciones verificadas.",
  tagline_en: "Turn screenshots into verified next steps.",
  shortDescription: "Importa una captura o PDF, revisa lo que encuentra SnapInbox y conviértelo en una acción útil sin enviar tu contenido a la nube.",
  shortDescription_en: "Import a screenshot or PDF, review what SnapInbox finds, and turn it into a useful next step without sending your content to the cloud.",
  longDescription: "SnapInbox da un lugar a las capturas que guardaste para después. Extrae fechas, horas, lugares, enlaces, precios y referencias en el dispositivo, conserva la evidencia y te deja confirmar cada acción antes de enviarla a Calendario o Recordatorios.",
  longDescription_en: "SnapInbox gives the screenshots you saved for later a place to go. It extracts dates, times, places, links, prices, and references on the device, keeps the evidence, and lets you confirm each action before sending it to Calendar or Reminders.",
  problem: "Las capturas importantes se pierden entre fotos, PDF, mensajes y recordatorios mentales. Cuando vuelves a ellas, ya no recuerdas qué querías hacer.",
  problem_en: "Important screenshots get lost among photos, PDFs, messages, and mental reminders. When you return to them, you no longer remember what you meant to do.",
  benefits: [
    "Inbox de acción: Reúne lo que guardaste para después y separa lo pendiente de lo archivado.",
    "Procesamiento local: Reconoce texto y datos útiles sin enviar tus capturas o PDF a un servidor.",
    "Evidencia y confianza: Revisa el origen de cada campo y corrige antes de guardar.",
    "Acciones bajo control: Confirma cada evento, recordatorio, enlace o exportación antes de ejecutarlo."
  ],
  benefits_en: [
    "Action inbox: Bring together what you saved for later and separate pending items from archived work.",
    "On-device processing: Recognize text and useful details without sending screenshots or PDFs to a server.",
    "Evidence and confidence: Review each field's source and correct it before saving.",
    "Actions under your control: Confirm every event, reminder, link, or export before it runs."
  ],
  features: [
    "Captura desde Fotos, Archivos, Share y Atajos: Importa el material desde la superficie que ya estás usando.",
    "OCR y extracción local: Detecta fechas, horas, lugares, enlaces, precios y referencias con confianza y evidencia.",
    "Revisión guiada: Corrige campos ambiguos y conserva el contenido original junto con tus decisiones.",
    "Inbox y Archivo: Busca elementos revisados, marca lo resuelto y conserva lo que todavía necesita atención.",
    "Calendario y Recordatorios: Crea acciones únicamente después de tu confirmación explícita.",
    "Widget y App Shortcuts: Consulta y captura sin romper el flujo de trabajo.",
    "SnapInbox Pro: Suscripciones mensual y anual opcionales gestionadas por Apple y RevenueCat."
  ],
  features_en: [
    "Import from Photos, Files, Share, and Shortcuts: Bring in material from the surface you already use.",
    "On-device OCR and extraction: Detect dates, times, places, links, prices, and references with confidence and evidence.",
    "Guided review: Correct ambiguous fields and keep the original content alongside your decisions.",
    "Inbox and Archive: Search reviewed items, mark work complete, and keep what still needs attention.",
    "Calendar and Reminders: Create actions only after your explicit confirmation.",
    "Widget and App Shortcuts: Check and capture without breaking your workflow.",
    "SnapInbox Pro: Optional monthly and annual subscriptions managed by Apple and RevenueCat."
  ],
  audience: "Personas que guardan capturas, documentos, reservas, recibos, enlaces y tareas para actuar sobre ellos más tarde.",
  audience_en: "People who save screenshots, documents, bookings, receipts, links, and tasks to act on later.",
  status: "development",
  featured: true,
  category: "Productividad",
  category_en: "Productivity",
  platform: ["iOS", "iPadOS"],
  supportEmail,
  iconUrl: "assets/images/snapinbox/AppIcon-1024.png",
  coverImageUrl: "assets/images/snapinbox/AppIcon-1024.png",
  screenshots: [],
  primaryCtaLabel: "Ver soporte y lanzamiento",
  primaryCtaLabel_en: "View support and launch",
  primaryCtaUrl: "/es/casos/snapinbox/soporte/",
  secondaryCtaLabel: "Privacidad",
  secondaryCtaLabel_en: "Privacy",
  secondaryCtaUrl: "/es/casos/snapinbox/privacidad/",
  colorPrimary: "#5b5ce2",
  colorSecondary: "#24c8a5",
  updatedAt,
  promotionalText: "Una bandeja local para convertir lo que guardas en decisiones claras, revisadas y accionables.",
  promotionalText_en: "A local inbox for turning what you save into clear, reviewed, actionable next steps.",
  seo: {
    title: "SnapInbox: convierte capturas en acciones | RomeroDev",
    description: "Importa capturas y PDF, extrae información en el dispositivo y confirma cada acción con SnapInbox para iPhone y iPad.",
    keywords: "capturas,OCR,calendario,recordatorios,PDF,productividad,privacidad,documentos,inbox",
    keywords_en: "screenshots,OCR,calendar,reminders,PDF,productivity,privacy,documents,inbox"
  },
  pricing: [
    { name: "Mensual", name_en: "Monthly", price: "Precio en App Store", cadence: "/mes", cadence_en: "/month", description: "Apple mostrará el precio, impuestos y condiciones finales antes de confirmar.", description_en: "Apple shows the final price, taxes, and terms before confirmation.", isIndicative: true },
    { name: "Anual", name_en: "Annual", price: "Precio en App Store", cadence: "/año", cadence_en: "/year", description: "La disponibilidad y elegibilidad dependen del territorio y de Apple.", description_en: "Availability and eligibility depend on territory and Apple.", featured: true, badge: "Mejor valor", badge_en: "Best value", isIndicative: true }
  ],
  freeFeatures: ["Inbox y Archivo local", "OCR y extracción en el dispositivo", "Revisión y confirmación de acciones", "Widget, Share y Atajos"],
  freeFeatures_en: ["Local Inbox and Archive", "On-device OCR and extraction", "Action review and confirmation", "Widget, Share, and Shortcuts"],
  proFeatures: ["Más espacio para capturas", "Funciones Premium de flujo de trabajo", "Suscripción restaurable entre dispositivos con el mismo Apple Account"],
  proFeatures_en: ["More room for captures", "Premium workflow features", "Restorable subscription across devices with the same Apple Account"],
  faq: [
    { question: "¿Se envían mis capturas a la nube?", question_en: "Are my screenshots sent to the cloud?", answer: "No. La versión actual procesa y guarda el contenido de SnapInbox localmente. RevenueCat solo recibe la información técnica necesaria para gestionar la suscripción Pro; no recibe tus capturas ni resultados OCR.", answer_en: "No. The current version processes and stores SnapInbox content locally. RevenueCat receives only the technical information needed to manage the Pro subscription; it does not receive your screenshots or OCR results." },
    { question: "¿Necesito una cuenta?", question_en: "Do I need an account?", answer: "No. El flujo principal funciona sin cuenta y sin conexión. Las compras se asocian al Apple Account que usa el App Store.", answer_en: "No. The main flow works without an account or connection. Purchases are associated with the Apple Account used by the App Store." },
    { question: "¿Puedo confiar en las fechas detectadas?", question_en: "Can I trust detected dates?", answer: "SnapInbox muestra confianza y evidencia, pero una extracción puede equivocarse. Revisa el contenido original y corrige los campos antes de guardar o crear una acción.", answer_en: "SnapInbox shows confidence and evidence, but extraction can be wrong. Review the original content and correct fields before saving or creating an action." },
    { question: "¿Crea eventos o recordatorios automáticamente?", question_en: "Does it create events or reminders automatically?", answer: "No. Las acciones de Calendario y Recordatorios requieren tu confirmación explícita después de revisar los datos.", answer_en: "No. Calendar and Reminders actions require your explicit confirmation after you review the data." },
    { question: "¿Cómo elimino un elemento?", question_en: "How do I delete an item?", answer: "Puedes eliminarlo desde la app y ajustar la retención de la captura original. Al desinstalar SnapInbox se eliminan sus copias locales controladas por la app.", answer_en: "You can delete it in the app and adjust source-capture retention. Uninstalling SnapInbox removes its app-controlled local copies." },
    { question: "¿Cómo restauro SnapInbox Pro?", question_en: "How do I restore SnapInbox Pro?", answer: "Usa Restaurar compras dentro de SnapInbox con el mismo Apple Account. Apple y RevenueCat comprobarán el estado de la suscripción; las suscripciones se gestionan desde Ajustes > tu nombre > Suscripciones.", answer_en: "Use Restore Purchases in SnapInbox with the same Apple Account. Apple and RevenueCat will check the subscription status; subscriptions are managed in Settings > your name > Subscriptions." }
  ],
  legal: { privacy, terms, subscriptions }
};
