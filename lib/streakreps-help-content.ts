import type { AppDisclosure, AppGuide, AppLimitation, FaqItem } from "@/lib/types";

export const streakrepsGuides: AppGuide[] = [
  {
    title: "Planifica y registra una sesión de fuerza",
    title_en: "Plan and log a strength workout",
    summary: "Usa un plan o rutina como punto de partida y registra el trabajo que realizas.",
    summary_en: "Use a plan or routine as your starting point and log the work you complete.",
    steps: [
      { title: "Elige el entrenamiento", title_en: "Choose a workout", detail: "Abre el plan o la rutina que quieras seguir y comienza la sesión. También puedes registrar una sesión libre si no tienes una rutina preparada.", detail_en: "Open the plan or routine you want to follow and start the session. You can also log a free workout when you do not have a routine ready." },
      { title: "Registra cada serie", title_en: "Log each set", detail: "Anota el peso y las repeticiones. Marca los calentamientos cuando corresponda y añade RPE o notas para conservar el contexto.", detail_en: "Enter the weight and reps. Mark warm-up sets when appropriate and add RPE or notes to keep the context." },
      { title: "Usa los descansos", title_en: "Use rest periods", detail: "Consulta el temporizador de descanso y vuelve a la siguiente serie cuando estés listo.", detail_en: "Use the rest timer and move to the next set when you are ready." },
      { title: "Finaliza y revisa", title_en: "Finish and review", detail: "Guarda la sesión y revisa el resumen antes de consultar tendencias, récords y volumen.", detail_en: "Save the session and review its summary before checking trends, records, and volume." }
    ]
  },
  {
    title: "Crea una rutina a tu medida",
    title_en: "Build a routine that fits you",
    summary: "Combina ejercicios, series y objetivos para organizar tus próximas sesiones.",
    summary_en: "Combine exercises, sets, and goals to organize upcoming workouts.",
    steps: [
      { title: "Abre tus planes", title_en: "Open your plans", detail: "Entra en la biblioteca de planes y crea un plan o rutina nueva.", detail_en: "Open the plan library and create a new plan or routine." },
      { title: "Añade ejercicios", title_en: "Add exercises", detail: "Busca ejercicios en la biblioteca y ordénalos según la secuencia que quieras seguir.", detail_en: "Find exercises in the library and arrange them in the order you want to follow." },
      { title: "Configura el trabajo", title_en: "Set up the work", detail: "Define las series y objetivos de repeticiones, peso o duración según el tipo de ejercicio.", detail_en: "Set the number of sets and targets for reps, weight, or duration according to the exercise type." },
      { title: "Guarda y ajusta", title_en: "Save and adjust", detail: "Guarda la rutina y modifica el plan cuando cambien tus objetivos o disponibilidad.", detail_en: "Save the routine and adjust the plan when your goals or schedule change." }
    ]
  },
  {
    title: "Registra una sesión desde Apple Watch",
    title_en: "Log a workout from Apple Watch",
    summary: "Consulta tu entrenamiento y registra la sesión desde la muñeca cuando tengas el reloj configurado.",
    summary_en: "View your workout and log a session from your wrist once your watch is set up.",
    steps: [
      { title: "Comprueba la conexión", title_en: "Check the connection", detail: "Mantén el Apple Watch enlazado con el iPhone y abre StreakReps en ambos dispositivos.", detail_en: "Keep Apple Watch paired with iPhone and open StreakReps on both devices." },
      { title: "Elige una sesión", title_en: "Choose a session", detail: "En el reloj, selecciona el entrenamiento disponible y empieza cuando estés preparado.", detail_en: "On the watch, select an available workout and start when you are ready." },
      { title: "Registra el progreso", title_en: "Log your progress", detail: "Usa los controles del reloj para seguir la sesión y registrar las series compatibles.", detail_en: "Use the watch controls to follow the session and log supported sets." },
      { title: "Confirma el guardado", title_en: "Confirm it was saved", detail: "Al terminar, comprueba en el iPhone que la sesión y sus datos se hayan sincronizado.", detail_en: "When you finish, check on iPhone that the session and its data have synced." }
    ]
  },
  {
    title: "Registra una actividad al aire libre",
    title_en: "Track an outdoor activity",
    summary: "Activa la ruta solo cuando quieras registrar ubicación durante un entrenamiento exterior.",
    summary_en: "Enable route tracking only when you want to record location during an outdoor workout.",
    steps: [
      { title: "Elige una actividad exterior", title_en: "Choose an outdoor activity", detail: "Selecciona un entrenamiento al aire libre; las sesiones de interior no necesitan una ruta GPS.", detail_en: "Choose an outdoor workout; indoor sessions do not need a GPS route." },
      { title: "Revisa el permiso", title_en: "Review permission", detail: "Permite el acceso a la ubicación si quieres guardar una ruta y comprueba que el sistema tenga señal.", detail_en: "Allow location access if you want to save a route, and check that the system has a signal." },
      { title: "Inicia y registra", title_en: "Start and track", detail: "Inicia la sesión y mantén el dispositivo contigo para recoger los datos disponibles.", detail_en: "Start the session and keep the device with you to collect available data." },
      { title: "Guarda la actividad", title_en: "Save the activity", detail: "Finaliza el entrenamiento y revisa distancia, ritmo y ruta; la precisión depende de la señal y los permisos.", detail_en: "Finish the workout and review distance, pace, and route; accuracy depends on signal and permissions." }
    ]
  },
  {
    title: "Controla permisos y exporta tus datos",
    title_en: "Review permissions and export your data",
    summary: "Decide qué categorías de Apple Health puede leer o escribir StreakReps y conserva una copia manual cuando la necesites.",
    summary_en: "Choose which Apple Health categories StreakReps can read or write, and create a manual copy when needed.",
    steps: [
      { title: "Revisa Apple Health", title_en: "Review Apple Health", detail: "En Salud, abre el acceso de datos de StreakReps y activa solo las categorías que quieras compartir. Puedes revocar permisos allí.", detail_en: "In Health, open StreakReps data access and enable only the categories you want to share. You can revoke access there." },
      { title: "Abre los controles de datos", title_en: "Open data controls", detail: "En StreakReps, busca las opciones de copia o exportación en los ajustes de la app.", detail_en: "In StreakReps, find backup or export options in the app settings." },
      { title: "Elige el formato", title_en: "Choose a format", detail: "Usa JSON para una copia estructurada de la app o CSV para los registros que ofrece la exportación tabular.", detail_en: "Use JSON for a structured app backup or CSV for the records provided by the tabular export." },
      { title: "Guarda el archivo con cuidado", title_en: "Store the file carefully", detail: "Revisa el contenido y el destino antes de compartirlo: un archivo exportado puede incluir datos personales o de entrenamiento.", detail_en: "Review the contents and destination before sharing: an export may contain personal or workout data." }
    ]
  }
];

export const streakrepsProductNotes: AppDisclosure[] = [
  {
    title: "Apple Health no siempre incluye series y repeticiones",
    title_en: "Apple Health may not include sets and reps",
    body: "La información de un entrenamiento importado depende de la app o dispositivo que lo registró. Puede incluir tipo y duración, pero no los ejercicios, el peso o las series; no completes esos datos de memoria si no estás seguro.",
    body_en: "Imported workout detail depends on the app or device that recorded it. It may include type and duration but omit exercises, weight, or sets; do not fill in details from memory unless you are sure."
  },
  {
    title: "Tú eliges los permisos de HealthKit",
    title_en: "You control HealthKit permissions",
    body: "StreakReps accede a las categorías de Apple Health que autorizas. Puedes revisar o revocar el acceso desde Ajustes de Salud; las funciones que dependen de una categoría pueden mostrar menos información si no está disponible.",
    body_en: "StreakReps accesses the Apple Health categories you authorize. Review or revoke access in Health settings; features that depend on a category may show less information when it is unavailable."
  },
  {
    title: "Copia automática de iCloud y exportación manual son distintas",
    title_en: "Automatic iCloud backup and manual export are different",
    body: "La copia automática conserva una selección operativa, como planes, rutinas, ejercicios, preferencias y registros de entrenamiento. Excluye métricas de salud, rutas, fotos y datos derivados de HealthKit. La exportación manual JSON/CSV puede contener más información.",
    body_en: "Automatic backup keeps a selected operational subset such as plans, routines, exercises, preferences, and workout logs. It excludes health metrics, routes, photos, and HealthKit-derived data. A manual JSON/CSV export may contain more information."
  },
  {
    title: "Las métricas ayudan a interpretar tendencias",
    title_en: "Metrics help you interpret trends",
    body: "El 1RM estimado, la recuperación y otras métricas se calculan a partir de los datos disponibles y pueden variar si faltan registros o permisos. Son referencias de entrenamiento, no una evaluación médica ni una recomendación clínica.",
    body_en: "Estimated 1RM, recovery, and other metrics use the data available and may vary when logs or permissions are missing. They are training references, not medical assessments or clinical recommendations."
  },
  {
    title: "Precios y ofertas dependen de Apple",
    title_en: "Apple controls prices and offers",
    body: "StreakReps Pro puede ofrecer planes semanales, mensuales, anuales y una compra vitalicia. El precio localizado, las promociones, la disponibilidad y la elegibilidad de prueba varían por país, producto y cuenta; confirma los datos que Apple muestra antes de comprar.",
    body_en: "StreakReps Pro may offer weekly, monthly, annual, and lifetime plans. Localized prices, promotions, availability, and trial eligibility vary by country, product, and account; confirm the details Apple shows before purchasing."
  }
];

export const streakrepsLimitations: AppLimitation[] = [
  {
    title: "Detalle limitado en entrenamientos importados",
    title_en: "Imported workouts have limited detail",
    body: "Apple Health y otras apps pueden compartir solo un resumen del entrenamiento, sin ejercicios ni datos de fuerza por serie. El historial y los análisis reflejan únicamente la información que se haya registrado o importado.",
    body_en: "Apple Health and other apps may share only a workout summary, without exercises or set-by-set strength data. History and analytics reflect only information that was logged or imported."
  },
  {
    title: "Recuperación y fuerza son estimaciones",
    title_en: "Recovery and strength metrics are estimates",
    body: "El cálculo depende de la calidad, continuidad y actualidad de tus entrenamientos y datos de salud. Una estimación incompleta puede no representar cómo te sientes ni tu capacidad real ese día.",
    body_en: "Calculations depend on the quality, consistency, and recency of your workouts and health data. An incomplete estimate may not reflect how you feel or your actual capacity that day."
  },
  {
    title: "Las rutas dependen del dispositivo y la señal",
    title_en: "Routes depend on device and signal",
    body: "El registro GPS requiere permiso de ubicación y puede perder precisión en interiores, túneles, zonas cubiertas o con mala señal. StreakReps no es un servicio de emergencia ni garantiza seguimiento de seguridad.",
    body_en: "GPS tracking requires location permission and may lose accuracy indoors, in tunnels, under cover, or with a weak signal. StreakReps is not an emergency service and does not guarantee safety tracking."
  },
  {
    title: "La copia automática no es una copia completa",
    title_en: "Automatic backup is not a full copy",
    body: "La copia de iCloud no incluye métricas de salud, rutas GPS, fotos de progreso ni datos derivados de HealthKit. Para conservar más información, genera y guarda una exportación manual; protégela como cualquier archivo personal.",
    body_en: "The iCloud backup does not include health metrics, GPS routes, progress photos, or HealthKit-derived data. Create and store a manual export to retain more information, and protect it like any personal file."
  },
  {
    title: "Funciones sujetas a compatibilidad y permisos",
    title_en: "Features depend on compatibility and permissions",
    body: "Apple Watch, HealthKit, ubicación, widgets y actividades en vivo dependen de dispositivos compatibles, versión del sistema, conexión y permisos. Si falta alguno de esos requisitos, el registro principal de entrenamientos puede seguir disponible en iPhone.",
    body_en: "Apple Watch, HealthKit, location, widgets, and Live Activities depend on compatible devices, system versions, connectivity, and permissions. If a requirement is unavailable, core workout logging may still be available on iPhone."
  }
];

export const streakrepsFaq: FaqItem[] = [
  {
    question: "¿StreakReps sustituye a un entrenador o profesional sanitario?",
    question_en: "Does StreakReps replace a coach or healthcare professional?",
    answer: "No. StreakReps organiza y analiza entrenamientos; sus métricas y sugerencias son orientativas y no constituyen consejo médico.",
    answer_en: "No. StreakReps organizes and analyzes workouts; its metrics and suggestions are informational and do not constitute medical advice."
  },
  {
    question: "¿Puedo usar StreakReps sin Apple Watch?",
    question_en: "Can I use StreakReps without Apple Watch?",
    answer: "Sí. La planificación, el registro de entrenamientos y el seguimiento del progreso funcionan en iPhone. Apple Watch añade opciones para consultar y registrar sesiones desde la muñeca.",
    answer_en: "Yes. Workout planning, logging, and progress tracking work on iPhone. Apple Watch adds options to view and log sessions from your wrist."
  },
  {
    question: "¿Qué datos lee o escribe en Apple Health?",
    question_en: "What data does it read or write in Apple Health?",
    answer: "StreakReps solicita acceso a categorías compatibles de salud y actividad solo con tu autorización. Puedes revisar o revocar permisos en Ajustes de Salud; también puedes elegir si quieres guardar en Salud los entrenamientos que registras en la app.",
    answer_en: "StreakReps requests access to compatible health and activity categories only with your authorization. Review or revoke permissions in Health settings; you can also choose whether workouts logged in the app are saved to Health."
  },
  {
    question: "¿Por qué un entrenamiento de Apple Health puede aparecer sin ejercicios?",
    question_en: "Why might an Apple Health workout appear without exercises?",
    answer: "La fuente puede compartir solo el tipo, la hora o la duración de la actividad. Apple Health no siempre contiene ejercicios, series, peso o repeticiones, así que esos detalles no se pueden deducir automáticamente.",
    answer_en: "The source may share only the activity type, time, or duration. Apple Health does not always contain exercises, sets, weight, or reps, so those details cannot be inferred automatically."
  },
  {
    question: "¿La copia automática de iCloud incluye todo?",
    question_en: "Does automatic iCloud backup include everything?",
    answer: "No. Conserva una selección operativa, pero excluye métricas de salud, rutas, fotos y datos derivados de HealthKit. Una exportación manual JSON/CSV puede contener más información y debes protegerla.",
    answer_en: "No. It keeps a selected operational subset but excludes health metrics, routes, photos, and HealthKit-derived data. A manual JSON/CSV export may contain more information and should be protected."
  },
  {
    question: "¿El backup de iCloud sincroniza todo en tiempo real?",
    question_en: "Does iCloud backup sync everything in real time?",
    answer: "No. Es una copia automática limitada que puede ayudar a restaurar datos operativos; no es una sincronización en tiempo real de todo el estado de la app. Los datos excluidos requieren sus permisos o una exportación manual.",
    answer_en: "No. It is a limited automatic backup that can help restore operational data; it is not real-time synchronization of the entire app. Excluded data requires its permissions or a manual export."
  },
  {
    question: "¿Qué significan el 1RM estimado y las métricas de recuperación?",
    question_en: "What do estimated 1RM and recovery metrics mean?",
    answer: "Son indicadores calculados con los registros y datos disponibles para ayudarte a observar tendencias. Pueden ser incompletos y no diagnostican, predicen ni reemplazan una valoración profesional.",
    answer_en: "They are indicators calculated from available logs and data to help you observe trends. They may be incomplete and do not diagnose, predict, or replace professional assessment."
  },
  {
    question: "¿StreakReps registra mi ubicación?",
    question_en: "Does StreakReps track my location?",
    answer: "Solo para una actividad que utilice ruta exterior y si concedes el permiso de ubicación. Puedes denegarlo; la señal y el dispositivo afectan a la precisión. No es una función de emergencia.",
    answer_en: "Only for an activity that uses an outdoor route, and only if you grant location permission. You can deny it; signal and device affect accuracy. It is not an emergency feature."
  },
  {
    question: "¿Qué formatos de exportación están disponibles?",
    question_en: "Which export formats are available?",
    answer: "Puedes crear una copia JSON de los datos compatibles de la app y exportar registros CSV. El contenido de cada formato difiere; revisa el archivo y evita compartir información sensible sin necesidad.",
    answer_en: "You can create a JSON backup of compatible app data and export CSV records. The contents differ by format; review the file and avoid sharing sensitive information unnecessarily."
  },
  {
    question: "¿Qué precio pagaré por StreakReps Pro? ¿Hay prueba gratuita?",
    question_en: "What will I pay for StreakReps Pro? Is there a free trial?",
    answer: "Apple muestra el precio localizado, la renovación y cualquier oferta aplicable antes de confirmar. La disponibilidad de una prueba depende del producto, territorio y elegibilidad de tu cuenta; no todos los planes u ofertas la incluyen.",
    answer_en: "Apple shows the localized price, renewal, and any applicable offer before confirmation. Trial availability depends on the product, territory, and account eligibility; not every plan or offer includes one."
  },
  {
    question: "¿Cómo cancelo StreakReps Pro?",
    question_en: "How do I cancel StreakReps Pro?",
    answer: "En iPhone o iPad, abre Ajustes, pulsa tu nombre y entra en Suscripciones. Eliminar la app no cancela una suscripción activa.",
    answer_en: "On iPhone or iPad, open Settings, tap your name, and choose Subscriptions. Deleting the app does not cancel an active subscription."
  }
];
