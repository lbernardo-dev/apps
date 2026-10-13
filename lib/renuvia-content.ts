import type { AppItem, FaqItem } from "@/lib/types";

export const renuviaFaq: FaqItem[] = [
  {
    "question": "¿Puedo usar Renuvia sin cuenta o conexión?",
    "question_en": "Can I use Renuvia without an account or internet?",
    "answer": "Sí. La entrada manual, el Radar, la base local y los recordatorios locales funcionan sin crear una cuenta. La entrada manual no necesita OCR, cámara, IA ni conexión. iCloud es opcional y necesita una cuenta de Apple y conexión para sincronizar.",
    "answer_en": "Yes. Manual entry, the Radar, local storage, and local reminders work without creating an account. Manual entry does not need OCR, a camera, AI, or a network connection. iCloud is optional and requires an Apple Account and a connection to sync."
  },
  {
    "question": "¿Qué debo revisar después de una captura OCR?",
    "question_en": "What should I check after an OCR capture?",
    "answer": "Comprueba cada campo sugerido —en especial fecha, importe, emisor y referencia— frente al documento original. OCR y códigos de barras pueden omitir o interpretar mal datos. Solo guarda el expediente cuando hayas confirmado la información.",
    "answer_en": "Check each suggested field—especially the date, amount, issuer, and reference—against the original document. OCR and barcode recognition can miss or misread data. Save the dossier only after confirming the details."
  },
  {
    "question": "¿Renuvia calcula cuándo debo cancelar?",
    "question_en": "Does Renuvia calculate when I need to cancel?",
    "answer": "Solo muestra una fecha límite si indicas la fecha exacta o el plazo de preaviso que figura en el contrato. Si ese dato no está disponible, la fecha para decidir aparece como desconocida; Renuvia no inventa plazos.",
    "answer_en": "It shows a decision deadline only when you enter an exact deadline or the notice period stated in the contract. If that information is unavailable, the decision date stays unknown; Renuvia does not invent notice periods."
  },
  {
    "question": "¿Renuvia cancela o renueva contratos por mí?",
    "question_en": "Does Renuvia cancel or renew contracts for me?",
    "answer": "No. Renuvia organiza la decisión, el checklist y la evidencia, pero no contacta con proveedores ni ejecuta cancelaciones o renovaciones. Abre el canal del proveedor, completa allí la acción y registra el resultado en el expediente.",
    "answer_en": "No. Renuvia organizes the decision, checklist, and evidence, but it does not contact providers or carry out cancellations or renewals. Use the provider's own channel, complete the action there, and record the outcome in the dossier."
  },
  {
    "question": "¿Qué sincroniza iCloud?",
    "question_en": "What does iCloud sync?",
    "answer": "La sincronización privada opcional guarda datos del expediente en tu base privada de iCloud. Los archivos adjuntos —imágenes y PDF— permanecen en el almacenamiento local de cada dispositivo y no se transfieren con esa sincronización. Necesitas iCloud disponible en los dispositivos implicados.",
    "answer_en": "Optional private sync stores dossier data in your private iCloud database. Attachments—images and PDFs—stay in each device's local app storage and are not transferred by that sync. iCloud must be available on the devices involved."
  },
  {
    "question": "¿Qué límites tiene el plan gratuito?",
    "question_en": "What are the free plan limits?",
    "answer": "El plan gratuito permite hasta 7 expedientes activos, 3 capturas OCR o de código de barras al mes y 1 archivo adjunto por expediente. La app muestra el acceso y el plan disponibles en tu cuenta antes de bloquear una función.",
    "answer_en": "The free plan allows up to 7 active dossiers, 3 OCR or barcode captures per month, and 1 attachment per dossier. The app shows the access and plan available to your account when a feature reaches its limit."
  },
  {
    "question": "¿Las notificaciones siempre llegan a la hora prevista?",
    "question_en": "Will notifications always arrive at the scheduled time?",
    "answer": "Son avisos locales del dispositivo, no notificaciones push de un servidor. iOS puede retrasarlos o silenciarlos por permisos, modos de concentración o políticas del sistema. Renuvia prioriza las 64 próximas alertas pendientes que permite iOS; revisa la app y el documento original cuando una fecha sea importante.",
    "answer_en": "These are local device alerts, not server push notifications. iOS may delay or silence them because of permissions, Focus modes, or system policies. Renuvia prioritizes the next 64 pending alerts allowed by iOS; check the app and the original document when a date matters."
  },
  {
    "question": "¿Renuvia ofrece asesoramiento legal o financiero?",
    "question_en": "Does Renuvia provide legal or financial advice?",
    "answer": "No. Es una herramienta de organización. No interpreta de forma autorizada contratos, leyes, seguros ni decisiones financieras. Verifica siempre fechas, requisitos e importes en la fuente original o con un profesional cualificado.",
    "answer_en": "No. Renuvia is an organization tool. It does not provide authoritative interpretation of contracts, laws, insurance, or financial decisions. Always verify dates, requirements, and amounts against the original source or with a qualified professional."
  },
  {
    "question": "¿Cómo se calcula el ahorro que aparece en la app?",
    "question_en": "How does the app calculate recorded savings?",
    "answer": "El ahorro se registra como resultado cuando marcas una cancelación o cambio como completado antes del objetivo del compromiso. No es una previsión ni dinero verificado por el banco; depende de los importes y fechas que hayas introducido.",
    "answer_en": "Savings are recorded as an outcome when you mark a cancellation or switch complete before the commitment target. They are not a forecast or bank-verified amount; they depend on the amounts and dates you entered."
  },
  {
    "question": "¿Cómo cancelo o restauro Renuvia Pro?",
    "question_en": "How do I cancel or restore Renuvia Pro?",
    "answer": "Gestiona o cancela la suscripción en Ajustes de iOS/iPadOS > tu nombre > Suscripciones. Borrar la app no cancela el plan. Para restaurar una compra, abre Renuvia Pro y usa Restaurar compras con la misma cuenta de Apple.",
    "answer_en": "Manage or cancel the subscription in iOS/iPadOS Settings > your name > Subscriptions. Deleting the app does not cancel a plan. To restore a purchase, open Renuvia Pro and choose Restore Purchases with the same Apple Account."
  }
];

export const renuviaPricing: NonNullable<AppItem["pricing"]> = [
  {
    "name": "Mensual",
    "name_en": "Monthly",
    "price": "2,99 €",
    "price_en": "€2.99",
    "cadence": "/mes",
    "cadence_en": "/month",
    "description": "Prueba de 7 días para cuentas elegibles; después, renovación mensual.",
    "description_en": "7-day trial for eligible accounts; then renews monthly.",
    "isIndicative": true
  },
  {
    "name": "Anual",
    "name_en": "Annual",
    "price": "29,99 €",
    "price_en": "€29.99",
    "cadence": "/año",
    "cadence_en": "/year",
    "description": "Prueba de 7 días para cuentas elegibles; después, renovación anual.",
    "description_en": "7-day trial for eligible accounts; then renews yearly.",
    "badge": "Mejor valor",
    "badge_en": "Best value",
    "featured": true,
    "isIndicative": true
  }
];

export const renuviaFreeFeatures = [
  "Alta manual sin cuenta y disponible sin conexión",
  "Hasta 7 expedientes activos",
  "3 capturas OCR o de código de barras al mes",
  "1 archivo adjunto por expediente",
  "Categorías y playbooks integrados, Radar y avisos locales básicos"
];
export const renuviaFreeFeaturesEn = [
  "Manual entry without an account, available offline",
  "Up to 7 active dossiers",
  "3 OCR or barcode captures per month",
  "1 attachment per dossier",
  "Built-in categories and playbooks, Radar, and basic local alerts"
];
export const renuviaProFeatures = [
  "Expedientes y capturas sin límite",
  "Expedientes activos y capturas OCR/códigos sin límite",
  "Categorías personalizadas y recordatorios con intervalos configurables",
  "Recordatorios avanzados",
  "Varios archivos adjuntos por expediente",
  "Exportación y restauración CSV/JSON",
  "Sincronización privada opcional con iCloud"
];
export const renuviaProFeaturesEn = [
  "Unlimited dossiers and captures",
  "Unlimited active dossiers and OCR/barcode captures",
  "Custom categories and configurable reminder intervals",
  "Advanced reminders",
  "Multiple attachments per dossier",
  "CSV/JSON export and restore",
  "Optional private iCloud sync"
];

export const renuviaLegal: AppItem["legal"] = {
  "privacy": {
    "title": "Política de privacidad de Renuvia",
    "title_en": "Renuvia Privacy Policy",
    "updatedAt": "2026-08-28",
    "body": [
      "Esta política se aplica internacionalmente a Renuvia y explica qué información puede tratar la aplicación, para qué se utiliza y qué opciones tienes. Los derechos imperativos de tu país de residencia prevalecen cuando sean más favorables.",
      "## 1. Responsable y contacto",
      "El responsable es Lester Romero Bernardo (RomeroDev), con domicilio en Valencia, España. Contacto de privacidad y soporte: romerodev.app+renuvia@gmail.com.",
      "## 2. Datos que puede tratar Renuvia",
      "Renuvia trata los datos que introduces o confirmas, como títulos, fechas de vencimiento, categorías, notas, costes, condiciones y el historial de renovaciones. Si importas una imagen o un PDF, puede crear una copia temporal para el análisis local. La app no necesita una cuenta, nombre, teléfono ni correo para funcionar.",
      "## 3. Procesamiento local y permisos",
      "La entrada manual, la extracción de texto, el OCR, la revisión, la base de datos local, los recordatorios y las exportaciones se procesan en tu dispositivo. La cámara, Fotos, Archivos, Calendario, Recordatorios y Notificaciones solo se solicitan cuando activas la función correspondiente. Puedes seguir utilizando la entrada manual sin conceder permisos de captura.",
      "## 4. iCloud y servicios de Apple",
      "Si activas la sincronización, Renuvia utiliza el contenedor privado de iCloud asociado a tu Apple ID para sincronizar los datos que la función necesita. Apple trata esos datos conforme a sus políticas y controles. StoreKit procesa las compras y suscripciones; Renuvia recibe el estado técnico de la transacción, no los datos completos de tu tarjeta.",
      "## 5. Diagnósticos opcionales",
      "Si activas Analíticas de producto, los servicios configurados pueden recibir eventos técnicos y agregados sobre el uso de funciones, rendimiento y fallos. No se envían títulos, texto OCR, imágenes, PDF, fechas, costes, notas, identificadores documentales ni el contenido de tus renovaciones. Esta opción está desactivada por defecto y puede revocarse en Ajustes.",
      "## 6. Conservación, eliminación y exportación",
      "Los registros permanecen en tu dispositivo o en tu contenedor privado de iCloud mientras los mantengas. Puedes eliminar elementos, borrar todos los datos y exportar CSV/JSON desde la aplicación. Las copias temporales controladas por Renuvia se eliminan conforme al flujo de captura; la app nunca borra tus originales de Fotos o Archivos.",
      "## 7. Compartición y transferencias internacionales",
      "No vendemos tus datos, no creamos perfiles publicitarios y no rastreamos tu actividad entre aplicaciones o sitios web. Solo se comparte información con Apple o proveedores técnicos cuando activas la función que los necesita, cuando es necesario para prestar el servicio o cuando la ley lo exige. Cualquier transferencia internacional se realizará con las garantías exigidas por la normativa aplicable.",
      "## 8. Derechos y menores",
      "Según tu lugar de residencia, puedes solicitar acceso, rectificación, supresión, limitación, oposición, portabilidad o retirada del consentimiento escribiendo al contacto anterior. También puedes reclamar ante la autoridad de protección de datos competente. Renuvia es una herramienta general y no está dirigida a menores; no introduzcas datos de menores sin la autoridad y salvaguardas necesarias.",
      "## 9. Cambios",
      "Publicaremos aquí los cambios materiales con una nueva fecha de actualización y, cuando proceda, un aviso dentro de la aplicación."
    ],
    "body_en": [
      "This policy applies internationally to Renuvia and explains what information the app may process, why it is used, and what choices you have. Mandatory rights in your country of residence prevail where they provide stronger protection.",
      "## 1. Controller and contact",
      "The controller is Lester Romero Bernardo (RomeroDev), based in Valencia, Spain. Privacy and support contact: romerodev.app+renuvia@gmail.com.",
      "## 2. Data Renuvia may process",
      "Renuvia processes information you enter or confirm, such as titles, expiration dates, categories, notes, costs, conditions, and renewal history. If you import an image or PDF, it may create a temporary copy for local analysis. The app does not require an account, name, phone number, or email to work.",
      "## 3. On-device processing and permissions",
      "Manual entry, text extraction, OCR, review, the local database, reminders, and exports are processed on your device. Camera, Photos, Files, Calendar, Reminders, and Notifications are requested only when you activate the related feature. You can keep using manual entry without granting capture permissions.",
      "## 4. iCloud and Apple services",
      "If you enable sync, Renuvia uses the private iCloud container associated with your Apple Account to sync the data required by that feature. Apple handles that data under its own policies and controls. StoreKit processes purchases and subscriptions; Renuvia receives technical transaction entitlement state, not your complete card details.",
      "## 5. Optional diagnostics",
      "If you enable Product Analytics, configured services may receive technical and aggregated events about feature use, performance, and crashes. Titles, OCR text, images, PDFs, dates, costs, notes, document identifiers, and renewal content are not sent. This option is off by default and can be revoked in Settings.",
      "## 6. Retention, deletion, and export",
      "Records remain on your device or in your private iCloud container while you keep them. You can delete items, erase all data, and export CSV/JSON from the app. Renuvia-controlled temporary copies are removed according to the capture flow; the app never deletes your originals in Photos or Files.",
      "## 7. Sharing and international transfers",
      "We do not sell your data, create advertising profiles, or track you across apps or websites. Information is shared with Apple or technical providers only when you enable a feature that needs them, when required to provide the service, or when the law requires it. International transfers will use the safeguards required by applicable law.",
      "## 8. Rights and children",
      "Depending on where you live, you may request access, rectification, deletion, restriction, objection, portability, or withdrawal of consent by contacting us above. You may also complain to your competent data protection authority. Renuvia is a general-purpose tool and is not directed to children; do not enter a child's data without the required authority and safeguards.",
      "## 9. Changes",
      "Material changes will be published here with a new update date and, where appropriate, an in-app notice."
    ]
  },
  "terms": {
    "title": "Términos de uso de Renuvia",
    "title_en": "Renuvia Terms of Use",
    "updatedAt": "2026-08-28",
    "body": [
      "Estos términos regulan el uso internacional de Renuvia. Al descargar o utilizar la aplicación aceptas estos términos, la Política de privacidad y las reglas aplicables del App Store. Los derechos irrenunciables de consumidores y usuarios no quedan limitados.",
      "## 1. Servicio",
      "Renuvia es una herramienta de organización de fechas, documentos y renovaciones. No presta asesoramiento legal, financiero, médico, fiscal o contractual, no garantiza que una fecha sea correcta y no sustituye la revisión de documentos ni la consulta con un profesional.",
      "## 2. Tus datos y responsabilidad",
      "Conservas los derechos sobre el contenido que introduces o importas y confirmas que puedes utilizarlo. Eres responsable de revisar toda fecha, título, coste, recordatorio, exportación y acción de calendario antes de confiar en ella, así como de proteger tu dispositivo, Apple ID y copias exportadas.",
      "## 3. Uso aceptable",
      "No utilices Renuvia para fines ilícitos, fraude, suplantación, acceso no autorizado, malware, vigilancia indebida, infracción de derechos o para introducir datos de terceros sin autorización. No intentes interferir con la aplicación ni eludir sus controles, salvo cuando la ley aplicable lo permita expresamente.",
      "## 4. OCR y automatización",
      "El OCR, la detección de códigos de barras y las sugerencias automáticas pueden omitir datos, equivocarse o interpretar de forma incompleta una fuente. La revisión de la persona usuaria es obligatoria antes de guardar un resultado o crear recordatorios, eventos, acciones o renovaciones.",
      "## 5. Compras y servicios de Apple",
      "Las funciones Pro se ofrecen mediante Apple In-App Purchase y están sujetas a las condiciones de suscripción publicadas para Renuvia y a la información que Apple muestra antes de comprar. Apple proporciona el App Store, pagos, iCloud y otras plataformas de terceros de forma independiente.",
      "## 6. Propiedad intelectual",
      "Renuvia, su código, marca, diseño, textos y materiales propios pertenecen a Lester Romero Bernardo (RomeroDev) o a sus licenciantes. Se concede una licencia personal, limitada, no exclusiva, no transferible y revocable para utilizar la app en dispositivos Apple compatibles conforme a estos términos.",
      "## 7. Disponibilidad y responsabilidad",
      "Podemos actualizar, modificar o retirar funciones. La disponibilidad puede depender de iOS, iCloud, permisos, redes o proveedores de terceros. En la medida permitida por la ley, Renuvia se ofrece tal como está y no respondemos por decisiones tomadas sin revisar los datos, interrupciones de terceros o daños indirectos. Esta limitación no se aplica a responsabilidades que no puedan excluirse legalmente.",
      "## 8. Apple como tercero beneficiario",
      "Cuando obtienes Renuvia desde el App Store, Apple es un tercero beneficiario de estos términos y puede hacerlos cumplir frente a ti según las reglas aplicables del App Store. Apple no está obligada a prestar mantenimiento o soporte de Renuvia.",
      "## 9. Ley y contacto",
      "Se aplica la legislación de España, sin perjuicio de las normas imperativas y derechos de consumo del lugar donde resides. Contacto: Lester Romero Bernardo (RomeroDev), Valencia, España; romerodev.app+renuvia@gmail.com."
    ],
    "body_en": [
      "These terms govern the international use of Renuvia. By downloading or using the app, you accept these terms, the Privacy Policy, and the applicable App Store rules. Non-waivable consumer rights are not limited.",
      "## 1. Service",
      "Renuvia is a tool for organizing dates, documents, and renewals. It does not provide legal, financial, medical, tax, or contractual advice, does not guarantee that a date is correct, and does not replace document review or professional advice.",
      "## 2. Your data and responsibility",
      "You keep your rights in content you enter or import and confirm that you are allowed to use it. You are responsible for reviewing every date, title, cost, reminder, export, and calendar action before relying on it, and for protecting your device, Apple Account, and exported copies.",
      "## 3. Acceptable use",
      "Do not use Renuvia for unlawful purposes, fraud, impersonation, unauthorized access, malware, improper surveillance, infringement, or entering third-party data without permission. Do not interfere with the app or bypass its controls except where applicable law expressly permits it.",
      "## 4. OCR and automation",
      "OCR, barcode detection, and automated suggestions may omit data, make mistakes, or interpret a source incompletely. User review is required before saving a result or creating reminders, events, actions, or renewals.",
      "## 5. Purchases and Apple services",
      "Pro features are offered through Apple In-App Purchase and are subject to Renuvia's published subscription terms and the information Apple displays before purchase. Apple independently provides the App Store, payments, iCloud, and other third-party platforms.",
      "## 6. Intellectual property",
      "Renuvia, its code, brand, design, text, and own materials belong to Lester Romero Bernardo (RomeroDev) or its licensors. You receive a personal, limited, non-exclusive, non-transferable, revocable license to use the app on compatible Apple devices under these terms.",
      "## 7. Availability and liability",
      "We may update, change, or remove features. Availability may depend on iOS, iCloud, permissions, networks, or third-party providers. To the extent permitted by law, Renuvia is provided as is and we are not responsible for decisions made without reviewing data, third-party interruptions, or indirect damages. This limitation does not apply to liability that cannot legally be excluded.",
      "## 8. Apple as third-party beneficiary",
      "When you obtain Renuvia from the App Store, Apple is a third-party beneficiary of these terms and may enforce them against you under the applicable App Store rules. Apple is not required to provide maintenance or support for Renuvia.",
      "## 9. Law and contact",
      "Spanish law applies, without prejudice to mandatory rules and consumer rights in your place of residence. Contact: Lester Romero Bernardo (RomeroDev), Valencia, Spain; romerodev.app+renuvia@gmail.com."
    ]
  },
  "subscriptions": {
    "title": "Condiciones de suscripción de Renuvia Pro",
    "title_en": "Renuvia Pro Subscription Terms",
    "updatedAt": "2026-10-13",
    "body": [
      "Estas condiciones complementan los Términos de uso y la Política de privacidad de Renuvia. La disponibilidad, el precio, los impuestos y la moneda pueden variar por país o región; la información contractual final es la que Apple muestra antes de confirmar.",
      "## 1. Planes y valor continuo",
      "Renuvia Pro ofrece suscripciones auto-renovables mensual y anual para expedientes activos y capturas sin límite, categorías personalizadas, recordatorios con intervalos configurables, adjuntos sin límite, exportación/restauración CSV/JSON y sincronización iCloud opcional. Las funciones Pro vigentes se describen en la guía de producto.",
      "## 2. Precio y compra",
      "Apple procesa el pago mediante In-App Purchase y carga el importe a tu Apple Account. Antes de confirmar, Apple muestra el precio local, duración, impuestos aplicables, moneda y condiciones de la oferta. Los importes mostrados en esta web son orientativos y nunca sustituyen el precio del App Store de tu territorio.",
      "## 3. Prueba gratuita y renovación",
      "Cuando Apple ofrece una prueba gratuita de 7 días y la cuenta es elegible, no se realiza el cargo durante la prueba. Si no cancelas al menos 24 horas antes de que termine, comenzará la suscripción de pago mostrada y se renovará automáticamente por el mismo periodo salvo cancelación. Apple puede realizar el cargo dentro de las 24 horas anteriores a la renovación.",
      "## 4. Gestionar o cancelar",
      "Puedes gestionar o cancelar la suscripción desde Ajustes > tu nombre > Suscripciones en el iPhone o iPad, o desde la página de suscripciones de Apple. Eliminar Renuvia no cancela la suscripción. La cancelación evita renovaciones futuras y normalmente mantiene el acceso hasta el final del periodo pagado.",
      "## 5. Restaurar compras y estados pendientes",
      "Renuvia incluye Restaurar compras para recuperar un acceso adquirido con el mismo Apple Account. Las compras pendientes, rechazadas, reembolsadas, revocadas o no verificables pueden mantener bloqueadas las funciones Pro hasta que Apple confirme el estado.",
      "## 6. Cambios, reembolsos y derechos locales",
      "Apple puede cambiar precios y comunicará o solicitará consentimiento según sus reglas y la legislación aplicable. Apple gestiona reembolsos, disputas de facturación y pagos mediante reportaproblem.apple.com. Nada de estas condiciones limita derechos de desistimiento, reembolso o protección del consumidor que sean obligatorios en tu territorio.",
      "## 7. Fin del acceso Pro",
      "Cuando finalice el periodo pagado, las funciones Pro se desactivarán y podrás seguir usando las funciones gratuitas disponibles. La cancelación o expiración no borra automáticamente tus datos locales ni tus exportaciones.",
      "## 8. Contacto",
      "Soporte de compras y suscripciones: romerodev.app+renuvia@gmail.com. Responsable: Lester Romero Bernardo (RomeroDev), Valencia, España."
    ],
    "body_en": [
      "These terms complement Renuvia's Terms of Use and Privacy Policy. Availability, price, taxes, and currency may vary by country or region; the final contractual information is what Apple displays before confirmation.",
      "## 1. Plans and ongoing value",
      "Renuvia Pro offers monthly and annual auto-renewable subscriptions for unlimited active dossiers and captures, custom categories, configurable reminder intervals, unlimited attachments, CSV/JSON export and restore, and optional iCloud sync. Current Pro features are described in the product guide.",
      "## 2. Price and purchase",
      "Apple processes payment through In-App Purchase and charges your Apple Account. Before confirmation, Apple displays the local price, duration, applicable taxes, currency, and offer terms. Prices shown on this website are indicative and never replace the App Store price for your territory.",
      "## 3. Free trial and renewal",
      "When Apple offers a 7-day free trial and the account is eligible, no charge is made during the trial. Unless you cancel at least 24 hours before it ends, the displayed paid subscription begins and renews automatically for the same period unless canceled. Apple may charge within the 24 hours before renewal.",
      "## 4. Manage or cancel",
      "You can manage or cancel in Settings > your name > Subscriptions on iPhone or iPad, or through Apple's subscription page. Deleting Renuvia does not cancel the subscription. Cancellation prevents future renewals and normally keeps access until the paid period ends.",
      "## 5. Restore purchases and pending states",
      "Renuvia includes Restore Purchases to recover access bought with the same Apple Account. Pending, declined, refunded, revoked, or unverifiable transactions may keep Pro features locked until Apple confirms the state.",
      "## 6. Changes, refunds, and local rights",
      "Apple may change prices and will notify or request consent under its rules and applicable law. Apple handles refunds, billing disputes, and payment issues through reportaproblem.apple.com. Nothing in these terms limits mandatory withdrawal, refund, or consumer-protection rights in your territory.",
      "## 7. End of Pro access",
      "When the paid period ends, Pro features are disabled and you can continue using the free features then available. Cancellation or expiration does not automatically delete local data or exports.",
      "## 8. Contact",
      "Purchase and subscription support: romerodev.app+renuvia@gmail.com. Controller: Lester Romero Bernardo (RomeroDev), Valencia, Spain."
    ]
  }
};
