import type { AppItem, LegalPage } from "./types";

const supportEmail = "romerodev.app@gmail.com";
const updatedAt = "2026-08-27";

const page = (
  title: string,
  title_en: string,
  body: string[],
  body_en: string[]
): LegalPage => ({ title, title_en, updatedAt, body, body_en });

const privacy = page(
  "Política de privacidad de SchoolSnap",
  "SchoolSnap Privacy Policy",
  [
    "Esta política explica qué información trata SchoolSnap para convertir avisos escolares, capturas y PDF en un plan familiar revisable. Los derechos imperativos del país donde resides prevalecen cuando ofrecen una protección mayor.",
    "## 1. Responsable y contacto",
    `El responsable es Lester Romero Bernardo (RomeroDev), con domicilio en Valencia, España. Para privacidad, soporte o solicitudes relacionadas con tus datos: ${supportEmail}.`,
    "## 2. Procesamiento local",
    "Las imágenes, capturas, PDF, texto reconocido, campos extraídos, correcciones, perfiles infantiles mínimos, avisos, fechas, listas y acciones propuestas se procesan y almacenan localmente en el dispositivo. El OCR y la extracción se ejecutan en el dispositivo.",
    "## 3. Datos que no necesitamos ni enviamos",
    "SchoolSnap no necesita una cuenta, fecha de nacimiento, dirección, datos médicos, identificador de estudiante ni identificador del colegio. No enviamos avisos, fotos, PDF, texto OCR, nombres de menores, direcciones, fechas, tareas ni contenido guardado a nuestros servidores. La asignación a un menor es manual y nunca se inventa silenciosamente.",
    "## 4. Fotos, Archivos y retención",
    "Cuando importas una foto, captura o PDF, SchoolSnap puede copiarlo temporalmente a un área controlada por la app para procesarlo. Tú eliges si se conserva ninguna copia, una miniatura o el original dentro del almacenamiento de la app. Los originales que permanezcan en Fotos o Archivos no se eliminan.",
    "## 5. Calendario, Recordatorios y notificaciones",
    "SchoolSnap solo propone o crea un evento o recordatorio después de tu revisión y confirmación. Los permisos se solicitan en el momento de usar la acción correspondiente. Las notificaciones son locales y se pueden desactivar desde el sistema.",
    "## 6. Apple, StoreKit y RevenueCat",
    "Apple procesa los pagos mediante StoreKit. Si utilizas SchoolSnap Plus, RevenueCat puede recibir un identificador anónimo de usuario, productos, estado de compra o entitlement, información de transacción y datos técnicos necesarios para mantener y restaurar la suscripción. No recibe tus avisos, fotos, PDF ni resultados OCR. Consulta también la política de privacidad de RevenueCat: https://www.revenuecat.com/privacy-policy/.",
    "## 7. Diagnóstico opcional",
    "La versión actual no muestra publicidad ni realiza seguimiento entre apps o sitios web. Si activas las opciones de analítica o informes de fallos, solo se envían métricas sin contenido, como el tipo de origen, intervalos de confianza, recuentos de campos o información técnica del fallo. Puedes cambiar estas opciones desde Ajustes.",
    "## 8. Conservación y eliminación",
    "Puedes revisar y eliminar tus avisos y perfiles desde la app, y configurar la retención del material de origen. La eliminación de datos locales no elimina los originales de Fotos o Archivos ni las transacciones que Apple deba conservar por motivos contables o de soporte. Desinstalar la app elimina sus copias locales controladas por ella.",
    `## 9. Derechos y cambios\nPuedes escribir a ${supportEmail} para solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad cuando sean aplicables, o para informar de una incidencia de privacidad. Publicaremos aquí los cambios materiales con una nueva fecha de actualización.`
  ],
  [
    "This policy explains what SchoolSnap processes to turn school notices, screenshots, and PDFs into a reviewable family plan. Mandatory rights in your country of residence prevail when they provide greater protection.",
    "## 1. Controller and contact",
    `The controller is Lester Romero Bernardo (RomeroDev), based in Valencia, Spain. For privacy, support, or data requests: ${supportEmail}.`,
    "## 2. On-device processing",
    "Images, screenshots, PDFs, recognized text, extracted fields, corrections, minimal child profiles, notices, dates, checklists, and proposed actions are processed and stored locally on the device. OCR and extraction run on the device.",
    "## 3. Data we do not need or send",
    "SchoolSnap does not need an account, date of birth, address, medical data, student ID, or school identifier. We do not send notices, photos, PDFs, OCR text, children's names, addresses, dates, tasks, or saved content to our servers. Assignment to a child is manual and is never silently invented.",
    "## 4. Photos, Files, and retention",
    "When you import a photo, screenshot, or PDF, SchoolSnap may copy it temporarily into an app-controlled area for processing. You choose whether to keep no source copy, a thumbnail, or the original inside the app's storage. Originals that remain in Photos or Files are not deleted.",
    "## 5. Calendar, Reminders, and notifications",
    "SchoolSnap only proposes or creates an event or reminder after you review and confirm it. Permissions are requested when you use the corresponding action. Local notifications can be disabled in the system settings.",
    "## 6. Apple, StoreKit, and RevenueCat",
    "Apple processes payments through StoreKit. If you use SchoolSnap Plus, RevenueCat may receive an anonymous app user ID, products, purchase or entitlement status, transaction information, and technical data needed to maintain and restore the subscription. It does not receive your notices, photos, PDFs, or OCR results. See RevenueCat's privacy policy: https://www.revenuecat.com/privacy-policy/.",
    "## 7. Optional diagnostics",
    "The current version does not show advertising or use cross-app or cross-site tracking. If you enable analytics or crash reports, only content-free metrics are sent, such as source type, confidence buckets, field counts, or technical crash information. You can change these choices in Settings.",
    "## 8. Retention and deletion",
    "You can review and delete notices and child profiles in the app and configure source-material retention. Deleting local data does not delete originals in Photos or Files or transactions Apple must retain for accounting or support. Uninstalling the app removes its app-controlled local copies.",
    `## 9. Rights and changes\nContact ${supportEmail} to request access, rectification, erasure, restriction, objection, or portability where applicable, or to report a privacy concern. Material changes will be published here with a new update date.`
  ]
);

const terms = page(
  "Términos de uso de SchoolSnap",
  "SchoolSnap Terms of Use",
  [
    "Estos términos regulan el uso de SchoolSnap junto con la Política de privacidad, las Condiciones de suscripción y las reglas del App Store. Los derechos irrenunciables del consumidor no quedan limitados.",
    "## 1. Servicio",
    "SchoolSnap importa avisos escolares desde una foto, captura, cámara o PDF, reconoce información en el dispositivo, conserva la evidencia y propone fechas, plazos, listas y acciones. La extracción es una ayuda y puede contener errores.",
    "## 2. Revisión y responsabilidad familiar",
    "Debes revisar el aviso original, corregir los campos y confirmar cada elemento antes de guardarlo o enviarlo a Calendario o Recordatorios. SchoolSnap ayuda a organizar información; no sustituye la comunicación oficial del colegio, la supervisión de una persona adulta ni tu criterio.",
    "## 3. Uso autorizado",
    "Importa únicamente material que tengas derecho a utilizar y que puedas tratar de forma legítima. No uses la app para vulnerar la privacidad de terceros, infringir la ley, suplantar a un colegio o interferir con la seguridad de Apple o de la aplicación.",
    "## 4. Perfiles infantiles",
    "Los perfiles están pensados como una ayuda organizativa y solo deben incluir el mínimo necesario, como un nombre visible o etiqueta familiar. No introduzcas datos sensibles o identificadores que la app no solicita.",
    "## 5. Licencia",
    "SchoolSnap y sus materiales pertenecen a Lester Romero Bernardo (RomeroDev) o a sus licenciantes. Se concede una licencia personal, limitada, no exclusiva y no transferible conforme al Standard EULA de Apple: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/.",
    `## 6. Compras y contacto\nLas funciones Plus se ofrecen mediante Apple In-App Purchase. Apple gestiona pagos, renovaciones y reembolsos. Para soporte técnico o consultas sobre datos, escribe a ${supportEmail}.`,
    "## 7. Disponibilidad y ley aplicable",
    "La app se proporciona tal como está en la medida permitida por la ley. Apple es tercero beneficiario de estos términos. Se aplica la legislación de España, sin perjuicio de las normas imperativas y derechos de consumo del lugar donde resides."
  ],
  [
    "These terms govern your use of SchoolSnap together with the Privacy Policy, Subscription Terms, and App Store rules. Non-waivable consumer rights are not limited.",
    "## 1. Service",
    "SchoolSnap imports school notices from a photo, screenshot, camera, or PDF, recognizes information on the device, preserves evidence, and proposes dates, deadlines, checklists, and actions. Extraction is an aid and may contain errors.",
    "## 2. Review and family responsibility",
    "You must review the original notice, correct fields, and confirm each item before saving it or sending it to Calendar or Reminders. SchoolSnap helps organize information; it does not replace official school communication, adult supervision, or your judgment.",
    "## 3. Authorized use",
    "Import only material you are entitled to use and lawfully process. Do not use the app to invade another person's privacy, break the law, impersonate a school, or interfere with Apple or app security.",
    "## 4. Child profiles",
    "Profiles are intended as an organizational aid and should contain only the minimum needed, such as a display name or family label. Do not enter sensitive data or identifiers the app does not request.",
    "## 5. License",
    "SchoolSnap and its materials belong to Lester Romero Bernardo (RomeroDev) or licensors. You receive a personal, limited, non-exclusive, non-transferable license under Apple's Standard EULA: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/.",
    `## 6. Purchases and contact\nPlus features use Apple In-App Purchase. Apple handles payments, renewals, and refunds. For technical support or data questions, contact ${supportEmail}.`,
    "## 7. Availability and governing law",
    "The app is provided as is to the extent permitted by law. Apple is a third-party beneficiary of these terms. Spanish law applies without prejudice to mandatory rules and consumer rights in your place of residence."
  ]
);

const subscriptions = page(
  "Condiciones de suscripción de SchoolSnap Plus",
  "SchoolSnap Plus Subscription Terms",
  [
    "Estas condiciones complementan los Términos de uso y la Política de privacidad. Apple muestra el precio, impuestos, moneda, duración, prueba disponible y elegibilidad antes de confirmar una compra.",
    "## 1. Planes",
    "SchoolSnap Plus puede ofrecer suscripciones auto-renovables mensual y anual para funciones premium, como una mayor capacidad de uso y flujos familiares avanzados. La disponibilidad exacta depende del territorio y de Apple.",
    "## 2. Prueba gratuita y renovación",
    "Cuando Apple muestre una prueba gratuita de 7 días y seas elegible, la suscripción pasará al plan seleccionado al finalizar la prueba salvo que la canceles a tiempo. La suscripción se renueva automáticamente salvo cancelación al menos 24 horas antes del final del periodo actual. Apple puede cobrar dentro de las 24 horas anteriores.",
    "## 3. Gestionar o restaurar",
    "Gestiona o cancela la suscripción desde Ajustes > tu nombre > Suscripciones. Eliminar SchoolSnap no cancela una suscripción. Usa Restaurar compras dentro de la app con el mismo Apple Account.",
    "## 4. Reembolsos y fin del acceso",
    `Apple gestiona los reembolsos a través de https://reportaproblem.apple.com. Al finalizar el periodo pagado se desactivan las funciones Plus y permanecen las funciones gratuitas disponibles; los datos locales no se borran automáticamente. Para ayuda con compras, escribe a ${supportEmail}.`
  ],
  [
    "These terms supplement the Terms of Use and Privacy Policy. Apple displays price, taxes, currency, duration, any available trial, and eligibility before confirmation.",
    "## 1. Plans",
    "SchoolSnap Plus may offer monthly and annual auto-renewable subscriptions for premium features, such as higher usage capacity and advanced family workflows. Exact availability depends on territory and Apple.",
    "## 2. Free trial and renewal",
    "When Apple displays a 7-day free trial and you are eligible, the subscription moves to the selected plan at the end of the trial unless you cancel in time. The subscription renews automatically unless canceled at least 24 hours before the current period ends. Apple may charge within the preceding 24 hours.",
    "## 3. Manage or restore",
    "Manage or cancel the subscription in Settings > your name > Subscriptions. Deleting SchoolSnap does not cancel a subscription. Use Restore Purchases in the app with the same Apple Account.",
    `## 4. Refunds and end of access\nApple handles refunds at https://reportaproblem.apple.com. When the paid period ends, Plus features are disabled and available free features remain; local data is not automatically erased. For purchase help, contact ${supportEmail}.`
  ]
);

const safety = page(
  "Compromiso de seguridad familiar de SchoolSnap",
  "SchoolSnap Family Safety Statement",
  [
    "SchoolSnap está diseñado para ayudar a familias adultas a organizar avisos escolares, no para crear cuentas infantiles ni perfilar menores.",
    "## Datos mínimos",
    "La app no solicita fecha de nacimiento, dirección, datos médicos, identificador de estudiante ni identificador del colegio. Usa perfiles opcionales con un nombre visible o etiqueta que la familia elige.",
    "## Control adulto",
    "La persona que importa un aviso revisa sus datos y decide si asignarlo a un perfil. SchoolSnap no establece por sí sola quién es el menor, no envía mensajes al colegio y no toma decisiones sobre salud, educación o seguridad.",
    "## Acciones confirmadas",
    "Las acciones de Calendario y Recordatorios requieren una revisión y confirmación explícitas. Las notificaciones son locales y se pueden controlar desde Ajustes del dispositivo.",
    `## Contacto\nPara informar de un riesgo de seguridad, abuso o tratamiento inadecuado de datos, escribe a ${supportEmail}.`
  ],
  [
    "SchoolSnap is designed to help adult families organize school notices, not to create child accounts or profile children.",
    "## Minimal data",
    "The app does not request date of birth, address, medical data, student ID, or school identifier. It uses optional profiles with a display name or label chosen by the family.",
    "## Adult control",
    "The person importing a notice reviews its data and decides whether to assign it to a profile. SchoolSnap does not decide who a child is, message a school, or make health, education, or safety decisions.",
    "## Confirmed actions",
    "Calendar and Reminders actions require explicit review and confirmation. Local notifications can be controlled in the device settings.",
    `## Contact\nTo report a safety risk, abuse, or inappropriate data handling, contact ${supportEmail}.`
  ]
);

export const schoolSnapApp: AppItem = {
  id: "schoolsnap",
  slug: "schoolsnap",
  name: "SchoolSnap",
  tagline: "De cada aviso escolar a un plan familiar claro.",
  tagline_en: "Turn every school notice into a clear family plan.",
  shortDescription:
    "Captura avisos escolares, revisa la extracción y organiza fechas, tareas y acciones para cada miembro de la familia, con procesamiento local.",
  shortDescription_en:
    "Capture school notices, review extraction, and organize dates, tasks, and actions for each family member with on-device processing.",
  longDescription:
    "SchoolSnap convierte fotos, capturas y PDF de avisos escolares en una bandeja familiar revisable. Mantén la evidencia, corrige lo que haga falta y confirma cada fecha, checklist, evento o recordatorio antes de pasarlo a tus herramientas de Apple. El flujo principal funciona sin cuenta y procesa el contenido en el dispositivo.",
  longDescription_en:
    "SchoolSnap turns photos, screenshots, and school PDFs into a reviewable family desk. Keep the evidence, correct what needs attention, and confirm every date, checklist, event, or reminder before sending it to Apple's tools. The core flow works without an account and processes content on-device.",
  problem:
    "Los avisos escolares llegan por demasiados canales y las fechas, materiales y permisos terminan repartidos entre Fotos, PDF, chats y memoria.",
  problem_en:
    "School notices arrive through too many channels, leaving dates, materials, and permissions scattered across Photos, PDFs, chats, and memory.",
  benefits: [
    "Captura flexible: importa una foto, captura, archivo PDF o usa la cámara.",
    "Revisión con evidencia: comprueba el origen, la confianza y corrige cada campo.",
    "Un aviso, todo el plan: conserva fechas, plazos, checklist y acciones estructuradas.",
    "Familia sin confusiones: asigna cada aviso manualmente al perfil correcto.",
    "Mañana de un vistazo: prioriza el próximo evento y lo que hay que preparar.",
    "Privacidad local: OCR y extracción en el dispositivo, con retención bajo tu control."
  ],
  benefits_en: [
    "Flexible capture: import a photo, screenshot, PDF, or use the camera.",
    "Evidence-backed review: check source, confidence, and correct every field.",
    "One notice, one plan: keep dates, deadlines, checklists, and structured actions together.",
    "Family clarity: manually assign every notice to the right profile.",
    "Tomorrow at a glance: prioritize the next event and what needs preparation.",
    "Local privacy: OCR and extraction on-device, with retention under your control."
  ],
  features: [
    "Importación desde Fotos, Archivos, cámara y Share Extension.",
    "OCR local y extracción determinista con confianza y evidencia.",
    "Fechas múltiples, plazos, checklist y acciones por cada aviso.",
    "Timeline de avisos, búsqueda, archivo y vista determinista de Mañana.",
    "Asignación manual a perfiles familiares con opción de dejar sin asignar.",
    "Acciones de Calendario y Recordatorios solo después de confirmar.",
    "Widgets, Atajos y notificaciones locales para el siguiente momento escolar."
  ],
  features_en: [
    "Import from Photos, Files, camera, and Share Extension.",
    "On-device OCR and deterministic extraction with confidence and evidence.",
    "Multiple dates, deadlines, checklists, and actions for every notice.",
    "Notice timeline, search, archive, and a deterministic Tomorrow view.",
    "Manual assignment to family profiles, with an unassigned option.",
    "Calendar and Reminders actions only after confirmation.",
    "Widgets, Shortcuts, and local notifications for the next school moment."
  ],
  audience: "Familias y personas adultas que coordinan la vida escolar de uno o varios menores.",
  audience_en: "Families and adults coordinating school life for one or more children.",
  status: "published",
  featured: true,
  category: "Productividad familiar",
  category_en: "Family Productivity",
  platform: ["iOS", "iPadOS"],
  appStoreUrl: "https://apps.apple.com/app/id6805556628",
  supportEmail,
  iconUrl: "assets/images/schoolsnap/SchoolSnapBrandMark.png",
  coverImageUrl: "assets/images/schoolsnap/OnboardingPlan.png",
  screenshots: ["capture", "plan", "privacy"],
  primaryCtaLabel: "Descargar en el App Store",
  primaryCtaLabel_en: "Download on the App Store",
  primaryCtaUrl: "https://apps.apple.com/app/id6805556628",
  secondaryCtaLabel: "Soporte",
  secondaryCtaLabel_en: "Support",
  secondaryCtaUrl: "/es/casos/schoolsnap/soporte/",
  colorPrimary: "#D56A4A",
  colorSecondary: "#2F6B5D",
  updatedAt,
  promotionalText: "La bandeja familiar privada para convertir cada aviso escolar en el siguiente paso.",
  promotionalText_en: "A private family desk for turning every school notice into the next clear step.",
  seo: {
    title: "SchoolSnap: avisos escolares y plan familiar | RomeroDev",
    description:
      "Convierte fotos, capturas y PDF escolares en fechas, tareas y acciones revisables con SchoolSnap para iPhone y iPad.",
    keywords: "avisos escolares,colegio,familia,OCR,calendario,tareas,recordatorios,privacidad",
    keywords_en: "school notices,family organizer,OCR,calendar,tasks,reminders,privacy"
  },
  pricing: [
    {
      name: "Mensual",
      name_en: "Monthly",
      price: "Precio en App Store",
      cadence: "/mes",
      cadence_en: "/month",
      description: "Apple muestra el precio, impuestos y condiciones finales antes de confirmar.",
      description_en: "Apple shows the final price, taxes, and terms before confirmation.",
      isIndicative: true
    },
    {
      name: "Anual",
      name_en: "Annual",
      price: "Precio en App Store",
      cadence: "/año",
      cadence_en: "/year",
      description: "La disponibilidad y elegibilidad dependen del territorio y de Apple.",
      description_en: "Availability and eligibility depend on territory and Apple.",
      featured: true,
      badge: "Mejor valor",
      badge_en: "Best value",
      isIndicative: true
    }
  ],
  freeFeatures: [
    "Captura y revisión de avisos",
    "OCR y extracción local",
    "Fechas, checklist y acciones confirmables",
    "Timeline, Mañana, widgets y Atajos"
  ],
  freeFeatures_en: [
    "Notice capture and review",
    "On-device OCR and extraction",
    "Dates, checklists, and confirmable actions",
    "Timeline, Tomorrow, widgets, and Shortcuts"
  ],
  proFeatures: [
    "Más capacidad de uso",
    "Más perfiles y flujos familiares avanzados",
    "Suscripción restaurable con el mismo Apple Account"
  ],
  proFeatures_en: [
    "Higher usage capacity",
    "More profiles and advanced family workflows",
    "Subscription restorable with the same Apple Account"
  ],
  faq: [
    {
      question: "¿Se envían mis avisos o fotos a la nube?",
      question_en: "Are my notices or photos sent to the cloud?",
      answer: "No. El flujo principal procesa y guarda el contenido localmente. RevenueCat solo recibe la información técnica necesaria para la suscripción; no recibe avisos, fotos, PDF ni resultados OCR.",
      answer_en: "No. The core flow processes and stores content locally. RevenueCat receives only the technical information needed for the subscription; it does not receive notices, photos, PDFs, or OCR results."
    },
    {
      question: "¿Necesito una cuenta o introducir datos del menor?",
      question_en: "Do I need an account or child data?",
      answer: "No. Puedes usar el flujo principal sin cuenta. Los perfiles son opcionales y solo necesitan el nombre visible o etiqueta que elijas; no se solicita fecha de nacimiento, dirección, datos médicos o identificador escolar.",
      answer_en: "No. You can use the core flow without an account. Profiles are optional and only need the display name or label you choose; date of birth, address, medical data, and school ID are not requested."
    },
    {
      question: "¿Puedo confiar en las fechas extraídas?",
      question_en: "Can I trust extracted dates?",
      answer: "SchoolSnap muestra confianza y evidencia, pero una extracción puede equivocarse. Revisa siempre el aviso original y corrige los campos antes de guardar o crear una acción.",
      answer_en: "SchoolSnap shows confidence and evidence, but extraction can be wrong. Always review the original notice and correct fields before saving or creating an action."
    },
    {
      question: "¿Crea eventos o recordatorios automáticamente?",
      question_en: "Does it create events or reminders automatically?",
      answer: "No. Las acciones de Calendario y Recordatorios requieren tu revisión y confirmación explícitas, y los permisos se solicitan en el momento de usar la acción.",
      answer_en: "No. Calendar and Reminders actions require your explicit review and confirmation, and permissions are requested when you use the action."
    },
    {
      question: "¿Cómo elimino mis datos?",
      question_en: "How do I delete my data?",
      answer: "Puedes borrar avisos y perfiles desde Ajustes y elegir cómo conservar el material de origen. Desinstalar la app elimina sus copias locales; los originales de Fotos y Archivos no se borran.",
      answer_en: "You can delete notices and profiles in Settings and choose how source material is retained. Uninstalling removes the app's local copies; originals in Photos and Files are not deleted."
    },
    {
      question: "¿Cómo restauro SchoolSnap Plus?",
      question_en: "How do I restore SchoolSnap Plus?",
      answer: "Usa Restaurar compras dentro de SchoolSnap con el mismo Apple Account. Apple gestiona el pago y la suscripción puede cancelarse desde Ajustes > tu nombre > Suscripciones.",
      answer_en: "Use Restore Purchases in SchoolSnap with the same Apple Account. Apple handles payment, and the subscription can be canceled in Settings > your name > Subscriptions."
    }
  ],
  legal: { privacy, terms, subscriptions, safety }
};
