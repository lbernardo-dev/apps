import type { AppGuideSection, FaqItem, LegalPage } from "@/lib/types";

export const vitalspathGuideSections: AppGuideSection[] = [
  {
    sectionKey: "start",
    title: "Empieza con un perfil de salud",
    titleEn: "Start with a health profile",
    sortOrder: 10,
    body: "Crea un perfil para la persona cuya información vas a organizar. Añade solo los datos que necesites y comprueba que fechas, unidades y nombres estén bien escritos. Si gestionas la salud de otra persona, asegúrate de tener permiso para hacerlo.",
    bodyEn: "Create a profile for the person whose information you are organizing. Add only the details you need and check names, dates, and units. If you manage another person's health information, make sure you are authorized to do so."
  },
  {
    sectionKey: "medication",
    title: "Añade medicación y revisa la pauta",
    titleEn: "Add medication and review its schedule",
    sortOrder: 20,
    body: "Registra el nombre, la dosis, la frecuencia y las fechas indicadas por el profesional sanitario. Puedes usar el escáner como ayuda para rellenar algunos campos, pero compara cada dato con el envase o la receta antes de guardar. VitalsPath no valida ni prescribe tratamientos.",
    bodyEn: "Enter the name, dose, frequency, and dates provided by your healthcare professional. The scanner can help fill in some fields, but compare every detail with the package or prescription before saving. VitalsPath does not validate or prescribe treatment."
  },
  {
    sectionKey: "dose-history",
    title: "Registra y revisa las tomas",
    titleEn: "Log and review doses",
    sortOrder: 30,
    body: "Consulta la pauta en la sección de medicación y marca las tomas según lo ocurrido. Una notificación no confirma que el medicamento se haya tomado, y el registro no sustituye las instrucciones del profesional. En Ajustes puedes elegir cuánto tiempo conservar el historial de tomas.",
    bodyEn: "Review the schedule in the medication section and log doses based on what actually happened. A notification does not confirm that a medicine was taken, and the log does not replace professional instructions. Settings lets you choose how long to keep dose history."
  },
  {
    sectionKey: "health-journal",
    title: "Anota síntomas y constantes",
    titleEn: "Record symptoms and vital signs",
    sortOrder: 40,
    body: "Añade síntomas, estado de ánimo o constantes con fecha y unidad. Las gráficas ayudan a ordenar observaciones para una conversación médica; no interpretan resultados ni detectan enfermedades. Si conectas Apple Health, revisa los permisos de lectura y escritura en Salud.",
    bodyEn: "Add symptoms, mood, or vital signs with a date and unit. Charts organize observations for a healthcare conversation; they do not interpret results or detect conditions. If you connect Apple Health, review read and write permissions in the Health app."
  },
  {
    sectionKey: "appointments-reports",
    title: "Prepara citas e informes",
    titleEn: "Prepare appointments and reports",
    sortOrder: 50,
    body: "Guarda fecha, centro, profesional y notas que te ayuden a preparar la consulta. Cuando necesites compartir un resumen, revisa el contenido exportado antes de enviarlo: puede incluir información de salud personal.",
    bodyEn: "Save the date, clinic, professional, and notes that help you prepare for a visit. Before sharing an exported summary, review its contents: it may include personal health information."
  },
  {
    sectionKey: "apple-ecosystem",
    title: "Notificaciones, widgets, iCloud y Apple Watch",
    titleEn: "Notifications, widgets, iCloud, and Apple Watch",
    sortOrder: 60,
    body: "Activa solo los permisos que quieras usar. Las notificaciones dependen de los ajustes de iOS, Concentración, batería y permisos; no son un sistema de emergencia ni se garantizan. Widgets, Live Activities y Apple Watch pueden actualizarse con retraso por las reglas de Apple. La sincronización o el uso compartido de iCloud requieren la cuenta, conexión y permisos correspondientes y pueden tardar en reflejar cambios.",
    bodyEn: "Enable only the permissions you want to use. Notifications depend on iOS settings, Focus, battery, and permissions; they are not an emergency system and are not guaranteed. Widgets, Live Activities, and Apple Watch may update later because of Apple's system limits. iCloud sync or sharing requires the relevant account, connection, and permissions and may take time to reflect changes."
  },
  {
    sectionKey: "privacy",
    title: "Privacidad y eliminación de datos",
    titleEn: "Privacy and deleting data",
    sortOrder: 70,
    body: "Los perfiles y datos de salud permanecen hasta que los elimines. Puedes borrar elementos o perfiles desde la app; la sincronización de iCloud y los perfiles compartidos pueden afectar cuándo desaparece una copia en cada dispositivo. Los registros de tomas y actividad tienen una retención independiente: 30 días por defecto, con opciones de 90, 180 o 365 días y conservación permanente.",
    bodyEn: "Profiles and health records remain until you delete them. You can remove items or profiles in the app; iCloud sync and shared profiles may affect when a copy disappears from each device. Dose and activity logs have separate retention controls: 30 days by default, with 90, 180, or 365 days and permanent retention available."
  },
  {
    sectionKey: "limits",
    title: "Planes y límites actuales",
    titleEn: "Current plans and limits",
    sortOrder: 80,
    body: "La configuración gratuita de referencia incluye 1 perfil, hasta 2 medicamentos activos, 1 cita al mes y 1 inventario. Premium amplía los límites y desbloquea funciones indicadas en la app. Las cuotas y precios pueden cambiar por versión, país u oferta; confirma siempre el detalle que muestra App Store antes de comprar.",
    bodyEn: "The current free-tier baseline includes 1 profile, up to 2 active medications, 1 appointment per month, and 1 inventory. Premium raises limits and unlocks features shown in the app. Limits and prices may vary by version, country, or offer; always confirm the details shown by the App Store before purchasing."
  },
  {
    sectionKey: "limitations",
    title: "Límites importantes",
    titleEn: "Important limitations",
    sortOrder: 90,
    body: "VitalsPath es una herramienta organizativa, no un dispositivo médico ni un servicio de atención. No diagnostica, recomienda cambios de dosis ni llama a emergencias automáticamente. Comprueba los datos de OCR, las pautas y los informes. El tiempo, festivos y otros datos de terceros pueden no estar disponibles o contener errores.",
    bodyEn: "VitalsPath is an organizational tool, not a medical device or care service. It does not diagnose, recommend dose changes, or call emergency services automatically. Check OCR results, schedules, and reports. Weather, holidays, and other third-party data may be unavailable or inaccurate."
  }
];

export const vitalspathFaq: FaqItem[] = [
  {
    question: "¿VitalsPath ofrece diagnóstico o consejo médico?",
    question_en: "Does VitalsPath provide diagnosis or medical advice?",
    answer: "No. Organiza información que introduces y ayuda a preparar conversaciones con profesionales. No diagnostica, prescribe ni sustituye atención médica.",
    answer_en: "No. It organizes information you enter and helps prepare for conversations with professionals. It does not diagnose, prescribe, or replace medical care."
  },
  {
    question: "¿Las alertas garantizan que recordaré o tomaré una dosis?",
    question_en: "Do alerts guarantee I will remember or take a dose?",
    answer: "No. iOS puede silenciar o retrasar avisos según permisos, Concentración, conectividad o batería. Revisa los ajustes y sigue siempre tu pauta clínica.",
    answer_en: "No. iOS may silence or delay alerts based on permissions, Focus, connectivity, or battery. Check your settings and always follow your clinical instructions."
  },
  {
    question: "¿La tarjeta de emergencia llama a emergencias?",
    question_en: "Does the emergency card call emergency services?",
    answer: "No. La tarjeta muestra información que puedes consultar o compartir; no realiza una llamada automática.",
    answer_en: "No. The card displays information you can view or share; it does not place an automatic call."
  },
  {
    question: "¿Puedo confiar en el escáner de medicamentos?",
    question_en: "Can I rely on the medication scanner?",
    answer: "El reconocimiento de texto puede equivocarse. Verifica nombre, concentración y dosis en el envase o receta antes de guardar.",
    answer_en: "Text recognition can make mistakes. Verify the name, strength, and dose against the package or prescription before saving."
  },
  {
    question: "¿La sincronización de iCloud es instantánea?",
    question_en: "Is iCloud sync instant?",
    answer: "No necesariamente. Requiere iCloud configurado, permisos y conexión; Apple puede tardar en sincronizar. Comprueba que el dispositivo muestre la información más reciente antes de depender de ella.",
    answer_en: "Not always. It requires iCloud setup, permissions, and connectivity; Apple may take time to sync. Check that a device shows the latest information before relying on it."
  },
  {
    question: "¿Cuánto tiempo se conservan mis datos?",
    question_en: "How long is my data retained?",
    answer: "Los perfiles y registros permanecen hasta que los elimines. El historial de tomas y actividad se depura según el ajuste de retención: 30 días por defecto, o 90, 180, 365 días o permanente.",
    answer_en: "Profiles and records remain until you delete them. Dose and activity history is cleaned according to its retention setting: 30 days by default, or 90, 180, 365 days, or permanently."
  },
  {
    question: "¿Qué incluye el plan gratuito?",
    question_en: "What does the free plan include?",
    answer: "La configuración de referencia incluye 1 perfil, hasta 2 medicamentos activos, 1 cita mensual y 1 inventario. La app muestra los límites vigentes y las opciones Premium.",
    answer_en: "The current baseline includes 1 profile, up to 2 active medications, 1 monthly appointment, and 1 inventory. The app shows current limits and Premium options."
  },
  {
    question: "¿Cómo restauro o cancelo Premium?",
    question_en: "How do I restore or cancel Premium?",
    answer: "Restaura compras desde la app con el mismo Apple ID. Las suscripciones se gestionan en Ajustes de Apple > tu nombre > Suscripciones; las condiciones completas están en la página de suscripciones.",
    answer_en: "Restore purchases in the app with the same Apple ID. Manage subscriptions in Apple Settings > your name > Subscriptions; full terms are on the subscription terms page."
  },
  {
    question: "¿Cómo solicito ayuda?",
    question_en: "How do I get help?",
    answer: "Escribe a romerodev.apps+vitalspath@gmail.com con el modelo del dispositivo, versión de iOS y pasos para reproducir el problema. No envíes datos de salud, recetas ni capturas sin ocultar la información privada.",
    answer_en: "Email romerodev.apps+vitalspath@gmail.com with the device model, iOS version, and steps to reproduce the issue. Do not send health data, prescriptions, or unredacted screenshots."
  }
];

export const vitalspathLegal: {
  privacy: LegalPage;
  terms: LegalPage;
  subscriptions: LegalPage;
} = {
  privacy: {
    title: "Política de privacidad de VitalsPath",
    title_en: "VitalsPath Privacy Policy",
    updatedAt: "2026-10-13",
    body: [
      "## 1. Responsable del tratamiento",
      "El responsable es Lester Romero Bernardo (RomeroDev), Valencia, España. Contacto para privacidad y derechos: romerodev.apps+vitalspath@gmail.com.",
      "## 2. Información que puede tratar la app",
      "La información que introduces puede incluir perfiles y nombres, medicación y tomas, síntomas, constantes, citas, notas, condiciones, inventarios y documentos médicos. También se usan preferencias de la app y datos técnicos necesarios para mantener sus funciones.",
      "## 3. Salud, cámara y Apple Health",
      "Los permisos de HealthKit, cámara, ubicación y notificaciones son opcionales y dependen de las funciones que actives. El escáner puede reconocer texto para completar un formulario; debes revisar el resultado. La app no vende datos de salud ni los utiliza para publicidad.",
      "## 4. Dónde se almacenan y con quién se comparten",
      "Los registros se guardan en el dispositivo y pueden sincronizarse o compartirse mediante iCloud/CloudKit si activas esas funciones. Apple procesa esos datos bajo sus propios términos. Apple procesa los pagos de App Store; RevenueCat puede recibir identificadores de compra y estado de suscripción para validar Premium. Firebase Analytics puede recibir eventos de uso no destinados a incluir datos de salud si habilitas Analytics; Firebase Crashlytics puede recibir diagnósticos del dispositivo si habilitas el informe de fallos. No operamos un servidor propio para alojar historiales de salud.",
      "## 5. Telemetría y conservación",
      "Los perfiles y registros de salud permanecen hasta que los elimines desde la app. El historial de tomas y los registros de actividad de medicación, citas y condiciones tienen un ajuste separado: 30 días por defecto, con opciones de 90, 180, 365 días o conservación permanente. Los informes de fallos de Crashlytics se conservan hasta 90 días. A fecha de 13 de octubre de 2026, la propiedad de Analytics está configurada por el responsable para conservar datos hasta 14 meses; esa configuración no se ha reducido en esta publicación. La desinstalación, los dispositivos compartidos y la sincronización de Apple pueden afectar a copias que ya estén en otros dispositivos o cuentas.",
      "## 6. Tus opciones y derechos",
      "Puedes corregir o eliminar información desde VitalsPath, revocar permisos de iOS y dejar de compartir perfiles. También puedes solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad escribiendo al contacto de privacidad. Puedes reclamar ante la Agencia Española de Protección de Datos.",
      "## 7. Seguridad y menores",
      "Protege el dispositivo, su código y tu Apple ID. No compartas información con personas que no deban verla. Los menores deben usar las funciones de salud bajo la supervisión y autorización correspondientes.",
      "## 8. Cambios y contacto",
      "Esta página describe la configuración conocida a 13 de octubre de 2026. Si cambia un proveedor o plazo, actualizaremos la política. Para preguntas o solicitudes: romerodev.apps+vitalspath@gmail.com."
    ],
    body_en: [
      "## 1. Data controller",
      "The controller is Lester Romero Bernardo (RomeroDev), Valencia, Spain. Contact for privacy questions and rights requests: romerodev.apps+vitalspath@gmail.com.",
      "## 2. Information the app may process",
      "Information you enter may include profiles and names, medication and doses, symptoms, vital signs, appointments, notes, conditions, inventories, and medical documents. App preferences and technical data needed to operate its features are also used.",
      "## 3. Health, camera, and Apple Health",
      "HealthKit, camera, location, and notification permissions are optional and depend on the features you enable. The scanner can recognize text to fill a form; you must review its result. The app does not sell health data or use it for advertising.",
      "## 4. Storage and sharing",
      "Records are stored on your device and may sync or be shared through iCloud/CloudKit if you enable those features. Apple processes this data under its own terms. Apple processes App Store payments; RevenueCat may receive purchase identifiers and subscription status to validate Premium. Firebase Analytics may receive usage events that are not intended to include health data if you enable Analytics; Firebase Crashlytics may receive device diagnostics if you enable crash reporting. We do not operate our own server to host health histories.",
      "## 5. Telemetry and retention",
      "Profiles and health records remain until you delete them in the app. Dose history and medication, appointment, and condition activity logs have a separate setting: 30 days by default, with 90, 180, 365 days, or permanent retention available. Crashlytics crash reports are retained for up to 90 days. As of October 13, 2026, the Analytics property is configured by the controller to retain data for up to 14 months; that setting has not been reduced in this publication. Uninstalling the app, shared devices, and Apple's sync may affect copies already present on other devices or accounts.",
      "## 6. Your choices and rights",
      "You can correct or delete information in VitalsPath, revoke iOS permissions, and stop sharing profiles. You may also request access, rectification, erasure, restriction, objection, or portability by contacting us. You may lodge a complaint with the Spanish Data Protection Agency (AEPD).",
      "## 7. Security and children",
      "Protect your device, passcode, and Apple ID. Do not share information with people who should not see it. Children should use health features with appropriate supervision and authorization.",
      "## 8. Changes and contact",
      "This page describes the configuration known on October 13, 2026. We will update the policy if providers or retention periods change. Questions or requests: romerodev.apps+vitalspath@gmail.com."
    ]
  },
  terms: {
    title: "Términos de uso de VitalsPath",
    title_en: "VitalsPath Terms of Use",
    updatedAt: "2026-10-13",
    body: [
      "## 1. Objeto y aceptación",
      "Estos términos regulan el uso de VitalsPath, una aplicación para organizar información personal de salud. Al utilizarla, aceptas estos términos y la política de privacidad.",
      "## 2. No es un producto sanitario",
      "VitalsPath no es un dispositivo médico ni presta asistencia sanitaria. No diagnostica, prescribe, recomienda cambios de dosis ni sustituye a un profesional. Ante una emergencia, contacta directamente con los servicios de emergencia de tu zona.",
      "## 3. Uso responsable",
      "Comprueba nombres, pautas, fechas, unidades, datos escaneados e informes. No dependas de la app como única copia de información crítica ni como único medio para recordar una toma. Eres responsable de introducir información correcta y de contar con autorización para gestionar datos de otras personas.",
      "## 4. Permisos y servicios de Apple",
      "HealthKit, iCloud, notificaciones, widgets, Live Activities, Apple Watch, cámara y ubicación dependen de tus permisos, del dispositivo, del sistema operativo y de la disponibilidad de Apple. La sincronización puede retrasarse; ninguna alerta o función de segundo plano está garantizada.",
      "## 5. Cuenta y cuidado compartido",
      "Debes proteger tu dispositivo y Apple ID. Si compartes un perfil, revisa qué personas pueden acceder y retira permisos cuando ya no sean necesarios. No uses la app para acceder sin autorización a datos de terceros.",
      "## 6. Compras y disponibilidad",
      "Las funciones gratuitas y Premium, precios y ofertas se muestran en la app y en App Store antes de comprar. Apple procesa las compras y las solicitudes de reembolso. Las funciones pueden cambiar por versión, país o requisitos del sistema.",
      "## 7. Propiedad intelectual y contacto",
      "VitalsPath, su software y sus materiales pertenecen a Lester Romero Bernardo / RomeroDev o sus licenciantes. Se concede una licencia personal, limitada y revocable para el uso previsto. Soporte: romerodev.apps+vitalspath@gmail.com."
    ],
    body_en: [
      "## 1. Scope and acceptance",
      "These terms govern VitalsPath, an app for organizing personal health information. By using it, you agree to these terms and the privacy policy.",
      "## 2. Not a medical product",
      "VitalsPath is not a medical device and does not provide healthcare. It does not diagnose, prescribe, recommend dose changes, or replace a professional. In an emergency, contact your local emergency services directly.",
      "## 3. Responsible use",
      "Check names, schedules, dates, units, scanned data, and reports. Do not rely on the app as the only copy of critical information or as the only way to remember a dose. You are responsible for entering accurate information and having authorization to manage another person's data.",
      "## 4. Apple permissions and services",
      "HealthKit, iCloud, notifications, widgets, Live Activities, Apple Watch, camera, and location depend on your permissions, device, operating system, and Apple's availability. Sync may be delayed; alerts and background functions are not guaranteed.",
      "## 5. Account and shared care",
      "Protect your device and Apple ID. When sharing a profile, review who can access it and revoke permissions when they are no longer needed. Do not use the app to access another person's data without authorization.",
      "## 6. Purchases and availability",
      "Free and Premium features, prices, and offers are shown in the app and App Store before purchase. Apple processes purchases and refund requests. Features may change by version, country, or system requirements.",
      "## 7. Intellectual property and contact",
      "VitalsPath, its software, and materials belong to Lester Romero Bernardo / RomeroDev or its licensors. A personal, limited, revocable license is granted for the intended use. Support: romerodev.apps+vitalspath@gmail.com."
    ]
  },
  subscriptions: {
    title: "Condiciones de suscripción y compras de VitalsPath",
    title_en: "VitalsPath Subscription and Purchase Terms",
    updatedAt: "2026-10-13",
    body: [
      "## 1. Opciones disponibles",
      "VitalsPath puede ofrecer planes mensuales, anuales y compras de por vida. Las opciones, duración, precio, impuestos y promociones vigentes se muestran en la hoja de compra de Apple antes de confirmar. La disponibilidad varía por país y cuenta.",
      "## 2. Pago y renovación",
      "Apple cobra las suscripciones mediante el Apple ID. Los planes renovables se renuevan automáticamente salvo que los canceles con antelación desde Ajustes de Apple > tu nombre > Suscripciones. Consulta la fecha y el precio de renovación mostrados por Apple.",
      "## 3. Cancelación, reembolsos y restauración",
      "La cancelación evita futuras renovaciones, pero normalmente mantiene el acceso hasta el final del periodo pagado. Apple gestiona reembolsos y facturación. Puedes restaurar compras elegibles desde VitalsPath usando el mismo Apple ID.",
      "## 4. Cambios y soporte",
      "Las funciones Premium pueden cambiar a medida que evoluciona la app. La compra no sustituye servicios profesionales de salud ni garantiza alertas o disponibilidad. Para ayuda con el acceso, escribe a romerodev.apps+vitalspath@gmail.com."
    ],
    body_en: [
      "## 1. Available options",
      "VitalsPath may offer monthly, annual, and lifetime purchase options. Current options, duration, price, taxes, and promotions are shown in Apple's purchase sheet before confirmation. Availability varies by country and account.",
      "## 2. Payment and renewal",
      "Apple bills subscriptions through your Apple ID. Renewable plans renew automatically unless cancelled in Apple Settings > your name > Subscriptions before renewal. Check the renewal date and price shown by Apple.",
      "## 3. Cancellation, refunds, and restore",
      "Cancellation stops future renewals but normally keeps access until the paid period ends. Apple handles refunds and billing. You can restore eligible purchases in VitalsPath with the same Apple ID.",
      "## 4. Changes and support",
      "Premium features may change as the app evolves. A purchase does not replace professional health services or guarantee alerts or availability. For access help, email romerodev.apps+vitalspath@gmail.com."
    ]
  }
};
