import type { AppItem, LegalPage } from "@/lib/types";

const subscriptionTerms = (appName: string, email: string, updatedAt: string): LegalPage => ({
  title: `Condiciones de suscripción de ${appName}`,
  updatedAt,
  body: [
    "## 1. Alcance",
    `Estas condiciones complementan los Términos de uso y la Política de privacidad de ${appName}. La versión gratuita puede utilizarse sin contratar una suscripción.`,
    "## 2. Compra y facturación",
    "Las suscripciones y compras se procesan mediante Apple In-App Purchase. Apple muestra el precio final, impuestos, moneda, duración y cualquier oferta disponible antes de confirmar. El desarrollador no recibe los datos completos de tu tarjeta.",
    "## 3. Renovación automática",
    "Las suscripciones se renuevan automáticamente salvo cancelación, normalmente con cargo durante las 24 horas anteriores al final del periodo. Puedes gestionarlas en Ajustes del dispositivo > tu nombre > Suscripciones. Eliminar la app no cancela la suscripción.",
    "## 4. Pruebas y ofertas",
    "La elegibilidad, duración y precio posterior de una prueba u oferta introductoria son los que Apple muestra en el momento de compra. Si no cancelas antes de finalizar, se inicia el periodo de pago indicado.",
    "## 5. Cambios de precio",
    "Los precios pueden variar por territorio. Apple comunicará los cambios y solicitará consentimiento cuando la normativa o sus reglas lo exijan.",
    "## 6. Restauración, cancelación y acceso",
    `Puedes restaurar compras realizadas con el mismo Apple ID desde ${appName}. Al terminar el periodo pagado pierdes las funciones Pro, pero tus datos no se eliminan automáticamente.`,
    "## 7. Reembolsos",
    "Apple gestiona los reembolsos. Puedes solicitarlos en reportaproblem.apple.com; el desarrollador no puede emitir directamente reembolsos de pagos procesados por Apple.",
    "## 8. Contacto",
    `Responsable: Lester Romero Bernardo (RomeroDev), Valencia, España. Soporte: ${email}.`
  ]
});

const repsPrivacy: LegalPage = {
  title: "Política de privacidad de Reps",
  updatedAt: "2026-07-11",
  body: [
    "## 1. Responsable y alcance",
    "Responsable: Lester Romero Bernardo (RomeroDev), Valencia, España. Contacto: support@romerodev.com. Esta política cubre Reps, sus widgets, Apple Watch y las funciones sociales.",
    "## 2. Datos tratados",
    "Reps puede tratar perfil y preferencias; planes, ejercicios, series, cargas e historial; datos de Apple Health autorizados; rutas durante actividades; fotos o notas de voz solicitadas; contenido social; estado de compras; y diagnósticos técnicos.",
    "- HealthKit, ubicación, cámara, micrófono, fotos y comunidad son opcionales. Las funciones básicas de registro no requieren activarlos.",
    "## 3. Finalidad y base jurídica",
    "Los datos se usan para prestar el registro y análisis de entrenamientos, sincronizar dispositivos, realizar backups solicitados, operar la comunidad, validar Pro, responder soporte y mejorar estabilidad. La base es la ejecución del servicio, tu consentimiento para permisos sensibles y el interés legítimo en seguridad y diagnóstico.",
    "## 4. Salud y datos sensibles",
    "Reps solo accede a las categorías de HealthKit autorizadas. No vende datos de salud, no los usa para publicidad ni los comparte con anunciantes. Puedes revocar permisos desde Ajustes > Salud.",
    "## 5. Proveedores y almacenamiento",
    "Apple/iCloud/CloudKit proporciona sincronización; HealthKit gestiona salud; StoreKit procesa compras; RevenueCat puede validar derechos Pro; Firebase Analytics y Crashlytics pueden procesar uso agregado y errores. Cada proveedor aplica sus propias garantías y términos.",
    "## 6. Comunidad y menores",
    "El contenido publicado puede ser visible para otros usuarios. No publiques información médica o datos de terceros. La comunidad es para mayores de 13 años e incluye reporte y bloqueo.",
    "## 7. Conservación, exportación y eliminación",
    "Los datos se conservan mientras sean necesarios para el servicio o una obligación legal. Puedes eliminar datos locales desde la app y solicitar la eliminación remota por email. Los archivos exportados quedan bajo tu control.",
    "## 8. Derechos y seguridad",
    "Puedes solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad y retirar consentimientos. Puedes reclamar ante la AEPD. Aplicamos minimización y controles razonables, aunque ningún sistema conectado es completamente infalible.",
    "## 9. Cambios y contacto",
    "Los cambios se publicarán en esta página indicando la nueva fecha. Solicitudes de privacidad: support@romerodev.com."
  ]
};

const repsTerms: LegalPage = {
  title: "Términos de uso de Reps",
  updatedAt: "2026-07-11",
  body: [
    "## 1. Aceptación y servicio",
    "Al usar Reps aceptas estos términos. Reps es una herramienta de planificación y seguimiento físico; no es un dispositivo médico, no diagnostica y no sustituye a profesionales sanitarios.",
    "## 2. Seguridad durante el ejercicio",
    "Consulta a un profesional antes de modificar tu entrenamiento si existen lesiones o condiciones médicas. Detén la actividad ante dolor intenso, mareo, falta de aire u otros síntomas preocupantes.",
    "## 3. Cuenta y uso permitido",
    "Protege tu dispositivo y Apple ID. No puedes usar Reps para fraude, acoso, suplantación, spam, extracción sistemática de contenido, acceso no autorizado ni publicación de datos de terceros.",
    "## 4. Comunidad",
    "Conservas la titularidad de lo que publicas y concedes una licencia limitada para alojarlo y mostrarlo dentro del servicio. Podemos retirar contenido que infrinja normas, derechos o seguridad y suspender cuentas por abuso.",
    "## 5. Permisos y precisión",
    "HealthKit, GPS, Apple Watch y sensores dependen del dispositivo y sus permisos. Las métricas y recomendaciones son orientativas y pueden contener interrupciones o imprecisiones.",
    "## 6. Propiedad intelectual",
    "Reps, su software, marca, diseño y materiales pertenecen a Lester Romero Bernardo / RomeroDev o a sus licenciantes. Recibes una licencia personal, limitada, revocable y no transferible.",
    "## 7. Disponibilidad, cambios y datos",
    "Podemos mejorar, modificar o retirar funciones. No garantizamos disponibilidad ininterrumpida. Debes conservar las exportaciones que necesites. Eliminar la app no cancela una suscripción.",
    "## 8. Responsabilidad",
    "En la medida permitida por ley, Reps se ofrece tal cual y no garantiza resultados deportivos. Nada limita los derechos irrenunciables del consumidor ni responsabilidades que legalmente no puedan excluirse.",
    "## 9. Apple y legislación",
    "Apple es tercero beneficiario cuando la app se obtiene en App Store. Se aplica la legislación española y europea de consumo, sin perjuicio del fuero imperativo del usuario.",
    "## 10. Contacto",
    "Responsable: Lester Romero Bernardo (RomeroDev), Valencia, España. Correo: support@romerodev.com."
  ]
};

export function enrichKnownProduct(app: AppItem): AppItem {
  if (app.slug === "reps") return {
    ...app,
    name: "Reps",
    tagline: "Entrena con un plan. Progresa con datos.",
    shortDescription: "Planifica rutinas, registra cada serie desde iPhone o Apple Watch y entiende fuerza, recuperación, volumen y constancia.",
    longDescription: "Reps convierte tu entrenamiento en un sistema claro: planes estructurados, registro rápido, progresión, recuperación, rutas GPS y análisis de fuerza conectados con el ecosistema Apple.",
    iconUrl: "assets/images/reps/icons/reps-icon.png",
    coverImageUrl: "assets/images/reps/aso/01-train-smarter.jpg",
    screenshots: ["01-train-smarter", "02-follow-real-plan", "03-control-load", "04-see-weekly-progress", "05-connect-health", "06-map-every-muscle", "09-track-your-body"],
    benefits: [
      "Entrena sin perder el foco: Registra peso, repeticiones, RPE y descansos desde una sola vista.",
      "Decide con contexto: Combina carga, sueño, HRV, pulso y recuperación.",
      "Demuestra el progreso: Sigue récords, 1RM, volumen, rachas y equilibrio muscular.",
      "Todo el ecosistema Apple: HealthKit, Apple Watch, widgets, Live Activities, Siri y App Intents."
    ],
    features: [
      "Planes y programas: Fuerza, hipertrofia, full body y push-pull-legs con progresión configurable.",
      "Registro avanzado: Series, peso, repeticiones, RPE, calentamientos, notas y descanso.",
      "Analítica de fuerza: Récords, 1RM estimado, volumen semanal, tendencias y mapa muscular.",
      "Recuperación: Sueño, HRV, pulso en reposo, carga y recomendaciones orientativas.",
      "Entrenamiento exterior: Ruta GPS, ritmo, distancia, desnivel, frecuencia cardiaca y parciales.",
      "Apple Watch: Consulta el plan y registra series desde la muñeca.",
      "Privacidad y control: Exportación JSON/CSV y backup operativo en iCloud."
    ],
    pricing: [
      { name: "Semanal", name_en: "Weekly", price: "0,99 €", cadence: "/semana", cadence_en: "/week", description: "Acceso Pro flexible.", description_en: "Flexible Pro access.", isIndicative: true },
      { name: "Mensual", name_en: "Monthly", price: "1,99 €", cadence: "/mes", cadence_en: "/month", description: "Cancela cuando quieras.", description_en: "Cancel whenever you want.", badge: "Flexible", isIndicative: true },
      { name: "Anual", name_en: "Annual", price: "9,99 €", cadence: "/año", cadence_en: "/year", description: "La opción prevista con mejor relación de valor.", description_en: "The planned best-value option.", badge: "Mejor valor", badge_en: "Best value", featured: true, isIndicative: true },
      { name: "Vitalicio", name_en: "Lifetime", price: "19,99 €", cadence: "pago único", cadence_en: "one-time", description: "Acceso permanente a Reps Pro.", description_en: "Permanent Reps Pro access.", isIndicative: true }
    ],
    freeFeatures: ["Registro ilimitado", "Biblioteca de ejercicios", "Rutinas personalizadas", "Analítica básica"],
    freeFeatures_en: ["Unlimited logging", "Exercise library", "Custom routines", "Basic analytics"],
    proFeatures: ["Analítica avanzada", "Progresión configurable", "Backups automáticos", "Tarjetas para compartir", "Integración avanzada con Apple Watch"],
    proFeatures_en: ["Advanced analytics", "Configurable progression", "Automatic backups", "Share cards", "Advanced Apple Watch integration"],
    faq: [
      { question: "¿Reps sustituye a un entrenador o profesional sanitario?", answer: "No. Reps organiza y analiza entrenamientos; sus métricas y sugerencias son orientativas y no constituyen consejo médico." },
      { question: "¿Puedo usar Reps sin Apple Watch?", answer: "Sí. La experiencia completa de planificación, registro y progreso funciona en iPhone. Apple Watch añade registro desde la muñeca y continuidad durante la sesión." },
      { question: "¿Qué datos lee de Apple Health?", answer: "Solo las categorías que autorices, como entrenamientos, actividad, métricas corporales y señales de recuperación. Puedes revocar el permiso en cualquier momento." },
      { question: "¿Los precios ya son definitivos?", answer: "No mientras Reps no esté publicado. La tabla muestra la configuración prevista del proyecto; App Store mostrará siempre el precio contractual final para cada territorio." },
      { question: "¿Cómo cancelo Reps Pro?", answer: "Desde Ajustes del iPhone o iPad, pulsa tu nombre y entra en Suscripciones. Eliminar la app no cancela una suscripción activa." },
      { question: "¿Puedo exportar mis entrenamientos?", answer: "Sí. Reps contempla exportación JSON/CSV para que mantengas control sobre tu historial." }
    ],
    legal: { privacy: repsPrivacy, terms: repsTerms, subscriptions: subscriptionTerms("Reps", "support@romerodev.com", "2026-07-11") }
  };

  if (app.slug === "vitalspath") return {
    ...app,
    coverImageUrl: "assets/images/vitalspath/screen-01-dashboard.PNG",
    pricing: [
      { name: "Mensual", name_en: "Monthly", price: "4,99 €", cadence: "/mes", cadence_en: "/month", description: "Acceso Premium con renovación mensual.", description_en: "Premium access billed monthly." },
      { name: "Anual", name_en: "Annual", price: "39,99 €", cadence: "/año", cadence_en: "/year", description: "Premium para el cuidado continuado.", description_en: "Premium for ongoing family care.", badge: "Más popular", badge_en: "Most popular", featured: true },
      { name: "Vitalicio", name_en: "Lifetime", price: "149,99 €", cadence: "pago único", cadence_en: "one-time", description: "Premium permanente, sin renovación.", description_en: "Permanent Premium access without renewal." }
    ],
    freeFeatures: ["Registro de medicación", "Síntomas y constantes", "Citas y recordatorios", "Perfil personal"],
    freeFeatures_en: ["Medication logging", "Symptoms and vitals", "Appointments and reminders", "Personal profile"],
    proFeatures: ["Perfiles familiares", "Cuidados compartidos", "Informes avanzados", "Sincronización iCloud", "Apple Watch, widgets y Live Activities"],
    proFeatures_en: ["Family profiles", "Shared care", "Advanced reports", "iCloud sync", "Apple Watch, widgets and Live Activities"],
    faq: [
      ...app.faq,
      { question: "¿Cómo se gestionan las compras Premium?", answer: "Apple procesa el pago y la renovación. Puedes restaurar compras con el mismo Apple ID y gestionar o cancelar la suscripción desde Ajustes > tu nombre > Suscripciones." },
      { question: "¿Puedo exportar información para una consulta?", answer: "Sí. VitalsPath puede preparar informes para facilitar la conversación con profesionales sanitarios; la app no interpreta esos informes como diagnóstico." }
    ],
    legal: {
      privacy: {
        title: "Política de privacidad de VitalsPath",
        updatedAt: "2026-07-11",
        body: [
          "## 1. Responsable", `Responsable: Lester Romero Bernardo (RomeroDev), Valencia, España. Contacto de privacidad: ${app.supportEmail}.`,
          "## 2. Datos y finalidad", "VitalsPath puede tratar perfiles, medicación, síntomas, constantes, citas, notas de cuidado, estado de compras, ubicación aproximada y diagnósticos técnicos para organizar el cuidado, sincronizar dispositivos, validar Premium y mantener la estabilidad.",
          "## 3. Salud y permisos", "Los permisos de HealthKit, notificaciones, cámara y otros servicios son opcionales y se solicitan cuando una función los necesita. VitalsPath no vende datos de salud ni los utiliza para publicidad.",
          "## 4. Almacenamiento y proveedores", "Los datos pueden almacenarse localmente y sincronizarse mediante servicios de Apple/iCloud según las funciones activadas. Apple procesa compras; servicios de diagnóstico pueden recibir información técnica y de uso conforme a sus políticas.",
          "## 5. Cuidados compartidos", "Cuando compartes un perfil con familiares o cuidadores, las personas invitadas podrán acceder al contenido autorizado. Revisa siempre a quién concedes acceso y retíralo cuando deje de ser necesario.",
          "## 6. Conservación y derechos", "Puedes corregir o eliminar registros desde la app y solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad por email. También puedes reclamar ante la AEPD.",
          "## 7. Seguridad y menores", "Aplicamos minimización y controles razonables. Protege tu dispositivo y Apple ID. VitalsPath no está destinada a que menores gestionen datos de salud sin supervisión adecuada.",
          "## 8. Contacto", `Consultas y solicitudes: ${app.supportEmail}. Los cambios se publicarán aquí con su fecha de actualización.`
        ]
      },
      terms: {
        title: "Términos de uso de VitalsPath",
        updatedAt: "2026-07-11",
        body: [
          "## 1. Aceptación", "Al utilizar VitalsPath aceptas estos términos y su política de privacidad.",
          "## 2. Naturaleza del servicio", "VitalsPath es una herramienta organizativa. No es un dispositivo médico, no diagnostica, prescribe ni sustituye a profesionales. En una emergencia contacta con los servicios sanitarios.",
          "## 3. Uso responsable", "Debes revisar recordatorios, dosis y datos introducidos. No utilices la app para fines ilegales, acceso no autorizado, suplantación o gestión de datos de terceros sin permiso.",
          "## 4. Cuenta, permisos y sincronización", "Eres responsable de proteger tu dispositivo y Apple ID. HealthKit, iCloud, notificaciones y Apple Watch dependen de permisos y servicios de Apple y pueden sufrir interrupciones.",
          "## 5. Propiedad intelectual", "La app, marca, diseño y materiales pertenecen a Lester Romero Bernardo / RomeroDev o a sus licenciantes. Se concede una licencia personal, limitada y no transferible.",
          "## 6. Compras", "Las compras se procesan por Apple y se someten a las condiciones de suscripción publicadas en esta web y a la información mostrada antes de pagar.",
          "## 7. Disponibilidad y responsabilidad", "Podemos actualizar funciones. Las métricas y alertas son auxiliares y no garantizamos disponibilidad ininterrumpida. No se limitan derechos irrenunciables del consumidor.",
          "## 8. Legislación y contacto", `Se aplica la legislación española y europea de consumo. Soporte: ${app.supportEmail}.`
        ]
      },
      subscriptions: subscriptionTerms("VitalsPath", app.supportEmail, "2026-07-11")
    }
  };
  return app;
}
