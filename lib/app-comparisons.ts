import type { AppFeatureComparison, FeatureAccessStatus } from "@/lib/types";

type ComparisonSeed = Omit<AppFeatureComparison, "id" | "appId" | "isEnabled">;

const row = (
  featureKey: string,
  title: string,
  title_en: string,
  freeStatus: FeatureAccessStatus,
  freeDetail: string,
  freeDetail_en: string,
  proStatus: FeatureAccessStatus,
  proDetail: string,
  proDetail_en: string,
  sortOrder: number,
): ComparisonSeed => ({
  featureKey,
  title,
  title_en,
  freeStatus,
  freeDetail,
  freeDetail_en,
  proStatus,
  proDetail,
  proDetail_en,
  sortOrder,
});

/**
 * Curated fallback content for static builds and for Supabase projects before
 * the comparison migration is applied. The same rows are seeded in Supabase
 * so editors can refine them from /admin without changing the UI code.
 */
export const fallbackFeatureComparisonsBySlug: Record<string, AppFeatureComparison[]> = {
  vitalspath: [
    row("medication", "Medicaciones", "Medication tracking", "included", "Registra medicamentos, dosis, frecuencia y horarios con recordatorios claros.", "Track medications, doses, frequency, and schedules with clear reminders.", "included", "Añade contexto de tratamiento y una visión más completa de la adherencia y el historial.", "Add treatment context plus a fuller view of adherence and history.", 10),
    row("symptoms-vitals", "Síntomas y constantes", "Symptoms and vitals", "included", "Guarda síntomas y constantes para consultar la evolución desde un único lugar privado.", "Log symptoms and vitals to review progress from one private place.", "included", "Relaciona registros y periodos para preparar conversaciones médicas con más contexto.", "Connect entries and periods to prepare better-informed medical conversations.", 20),
    row("appointments", "Citas y recordatorios", "Appointments and reminders", "included", "Organiza citas y avisos asociados a cada cuidado sin depender de varias aplicaciones.", "Organize appointments and care reminders without relying on several apps.", "included", "Coordina recordatorios y seguimiento cuando participan varias personas en el cuidado.", "Coordinate reminders and follow-up when several people share care.", 30),
    row("family-care", "Perfiles familiares y cuidados compartidos", "Family profiles and shared care", "not_included", "El plan gratuito está centrado en un perfil personal.", "The free plan focuses on one personal profile.", "included", "Crea perfiles familiares y comparte cuidados con las personas que necesitan colaborar.", "Create family profiles and share care with the people who need to collaborate.", 40),
    row("apple-ecosystem", "Apple Watch, widgets y Live Activities", "Apple Watch, widgets, and Live Activities", "not_included", "No incluye las superficies avanzadas del ecosistema Apple.", "Advanced Apple ecosystem surfaces are not included.", "included", "Consulta y actualiza información desde Apple Watch, widgets y Live Activities cuando está disponible.", "Access and update information from Apple Watch, widgets, and Live Activities when available.", 50),
  ],
  reps: [
    row("workout-log", "Registro de entrenamientos", "Workout logging", "included", "Registra series, repeticiones y cargas sin límite para mantener una rutina consistente.", "Log sets, reps, and loads without limits to build consistent training.", "included", "Conserva un historial más completo para analizar bloques largos de entrenamiento.", "Keep a richer history for analysing longer training blocks.", 10),
    row("exercise-library", "Biblioteca de ejercicios", "Exercise library", "included", "Parte de una biblioteca de ejercicios y adapta cada movimiento a tu sesión.", "Start from an exercise library and adapt every movement to your session.", "included", "Organiza variantes y referencias para que la biblioteca acompañe tu progresión.", "Organise variants and references so the library supports your progression.", 20),
    row("custom-routines", "Rutinas personalizadas", "Custom routines", "included", "Diseña rutinas propias y repítelas con una estructura fácil de seguir.", "Build custom routines and repeat them with a clear structure.", "included", "Configura progresiones y reglas más precisas para distintos objetivos.", "Configure more precise progressions and rules for different goals.", 30),
    row("advanced-analytics", "Analítica de progreso", "Progress analytics", "limited", "Incluye analítica básica para ver la evolución esencial de tus entrenamientos.", "Includes basic analytics for the essential view of training progress.", "included", "Desbloquea analítica avanzada de volumen, consistencia, recuperación y progresión.", "Unlock advanced volume, consistency, recovery, and progression analytics.", 40),
    row("watch-backups", "Apple Watch y copias", "Apple Watch and backups", "limited", "La experiencia gratuita mantiene el registro principal en el dispositivo.", "The free experience keeps the core log on the device.", "included", "Añade integración avanzada con Apple Watch, backups automáticos y tarjetas para compartir.", "Add advanced Apple Watch integration, automatic backups, and share cards.", 50),
  ],
  shield: [
    row("capture", "Importación, cámara y escáner", "Import, camera, and scanner", "included", "Importa documentos o captura una imagen para empezar a proteger datos personales.", "Import documents or capture an image to start protecting personal data.", "included", "Procesa más documentos dentro de proyectos activos ilimitados.", "Process more documents inside unlimited active projects.", 10),
    row("masking-ocr", "Máscaras manuales y sugerencias OCR", "Manual masks and OCR suggestions", "included", "Oculta datos manualmente y revisa las sugerencias OCR antes de aplicarlas.", "Mask data manually and review OCR suggestions before applying them.", "included", "Reutiliza plantillas semánticas y acelera trabajos repetitivos de anonimización.", "Reuse semantic templates and speed up repetitive redaction work.", 20),
    row("verified-export", "Exportación verificada", "Verified export", "included", "Exporta una versión rasterizada y revisada para compartir solo lo necesario.", "Export a rasterised, reviewed version that shares only what is needed.", "included", "Aplica estilos, controles de imagen y marcas de agua avanzadas antes de exportar.", "Apply advanced styles, image controls, and watermarks before exporting.", 30),
    row("vault", "Cifrado local y Bóveda", "Local encryption and Vault", "included", "Mantén los documentos en el dispositivo con cifrado local y una bóveda protegida.", "Keep documents on-device with local encryption and a protected Vault.", "included", "Gestiona proyectos activos ilimitados manteniendo el mismo modelo de privacidad local.", "Manage unlimited active projects while keeping the same local privacy model.", 40),
    row("batch-automation", "Lotes y automatizaciones", "Batch work and automation", "limited", "Hasta 10 documentos activos para revisar el flujo con control manual.", "Up to 10 active documents so the workflow stays manually controlled.", "included", "Procesa lotes, guarda plantillas y aplica automatizaciones con marcas de agua.", "Process batches, save templates, and apply automations with watermarks.", 50),
  ],
  upledger: [
    row("accounts-movements", "Cuentas y movimientos", "Accounts and movements", "included", "Registra cuentas y movimientos para conocer con claridad por dónde pasa tu dinero.", "Track accounts and movements to understand where your money goes.", "included", "Conserva más histórico para descubrir patrones y preparar escenarios.", "Keep more history to discover patterns and prepare scenarios.", 10),
    row("budgets", "Categorías y presupuestos", "Categories and budgets", "included", "Clasifica movimientos y define presupuestos para las decisiones diarias.", "Categorise movements and set budgets for everyday decisions.", "included", "Convierte categorías y presupuestos en reglas que reduzcan trabajo repetitivo.", "Turn categories and budgets into rules that reduce repetitive work.", 20),
    row("net-worth", "Patrimonio básico", "Basic net worth", "included", "Consulta una visión local y sencilla de ingresos, gastos y patrimonio.", "Review a simple local view of income, spending, and net worth.", "included", "Compara la evolución y los supuestos con análisis más profundos.", "Compare progress and assumptions with deeper analysis.", 30),
    row("forecasts", "Previsiones y escenarios", "Forecasts and scenarios", "not_included", "El plan gratuito se centra en el control actual, sin escenarios avanzados.", "The free plan focuses on current control, without advanced scenarios.", "included", "Modela previsiones y escenarios para anticipar decisiones financieras.", "Model forecasts and scenarios to anticipate financial decisions.", 40),
    row("automation-export", "Automatizaciones y exportación", "Automation and export", "limited", "Incluye datos locales y exportación básica para mantener el control.", "Includes local data and basic export to keep control of your information.", "planned", "Las reglas, automatizaciones y funciones Pro avanzadas se activarán progresivamente.", "Rules, automations, and advanced Pro features will roll out progressively.", 50),
  ],
  renuvia: [
    row("manual-entry", "Entrada manual ilimitada", "Unlimited manual entry", "included", "Añade renovaciones manualmente sin depender de integraciones externas.", "Add renewals manually without relying on external integrations.", "included", "Relaciona cada entrada con un expediente y un historial de renovaciones.", "Connect every entry to a dossier and renewal history.", 10),
    row("readiness-radar", "Radar de preparación", "Readiness Radar", "included", "Identifica qué renovación necesita atención antes de que se convierta en un problema.", "Identify which renewal needs attention before it becomes a problem.", "included", "Personaliza señales y playbooks para procesos de renovación más complejos.", "Customise signals and playbooks for more complex renewal processes.", 20),
    row("playbooks", "Playbooks y checklists", "Playbooks and checklists", "included", "Usa playbooks esenciales y una revisión OCR local para preparar cada caso.", "Use essential playbooks and local OCR review to prepare each case.", "included", "Crea playbooks personalizados, checklists y documentos avanzados.", "Create custom playbooks, checklists, and advanced documents.", 30),
    row("dossiers", "Expedientes e historial", "Dossiers and history", "limited", "El flujo gratuito permite preparar entradas, con foco en una revisión sencilla.", "The free workflow supports entries with a focus on simple review.", "included", "Gestiona expedientes ilimitados y consulta el historial de renovación completo.", "Manage unlimited dossiers and review the full renewal history.", 40),
    row("exports-sync", "Exportación y sincronización", "Export and sync", "limited", "Los datos permanecen locales y se revisan antes de cualquier salida.", "Data stays local and is reviewed before any export.", "included", "Exporta a CSV/JSON y habilita la sincronización iCloud opcional cuando esté disponible.", "Export CSV/JSON and enable optional iCloud sync when available.", 50),
  ],
  kinsera: [
    row("local-protection", "Protección local", "Local protection", "included", "La protección y las reglas principales se gestionan en el dispositivo.", "Core protection and rules are managed on-device.", "included", "Amplía las reglas y rutinas manteniendo el mismo enfoque privado y local.", "Expand rules and routines while keeping the same private, local approach.", 10),
    row("scope-picker", "Selector de apps, categorías y webs", "App, category, and website picker", "included", "Elige qué apps, categorías o webs forman parte de cada regla familiar.", "Choose which apps, categories, or websites belong to each family rule.", "included", "Combina selecciones en rutinas ampliadas para distintos momentos del día.", "Combine selections into extended routines for different parts of the day.", 20),
    row("timers-pauses", "Temporizadores y pausas", "Timers and pauses", "included", "Configura límites y pausas comprensibles para que la familia sepa qué ocurre.", "Set understandable limits and pauses so the family knows what is happening.", "included", "Añade solicitudes de tiempo y rutinas más flexibles para casos excepcionales.", "Add time requests and more flexible routines for exceptions.", 30),
    row("routines", "Rutinas ampliadas", "Extended routines", "limited", "Incluye el control diario esencial para comenzar a establecer hábitos digitales.", "Includes essential daily control to start building digital habits.", "included", "Amplía las rutinas según contexto, horario o necesidad familiar.", "Extend routines by context, schedule, or family need.", 40),
    row("reports", "Informes y solicitudes", "Reports and requests", "not_included", "El plan gratuito muestra el estado transparente sin informes agregados.", "The free plan shows transparent status without aggregate reports.", "included", "Ofrece informes agregados y solicitudes de tiempo para una coordinación familiar más clara.", "Adds aggregate reports and time requests for clearer family coordination.", 50),
  ],
  snapinbox: [
    row("inbox-archive", "Inbox y archivo local", "Local inbox and archive", "included", "Convierte capturas en una bandeja local que puedes revisar y archivar.", "Turn screenshots into a local inbox you can review and archive.", "included", "Mantén más capturas y un historial de acciones más amplio.", "Keep more captures and a larger action history.", 10),
    row("on-device-ocr", "OCR y extracción en el dispositivo", "On-device OCR and extraction", "included", "Extrae información en el dispositivo para mantener el contenido bajo tu control.", "Extract information on-device so content stays under your control.", "included", "Procesa flujos de trabajo Premium más amplios sin cambiar el modelo de privacidad.", "Process broader Premium workflows without changing the privacy model.", 20),
    row("action-review", "Revisión y confirmación de acciones", "Action review and confirmation", "included", "Revisa y confirma cada acción antes de convertir una captura en un siguiente paso.", "Review and confirm every action before turning a capture into a next step.", "included", "Organiza más acciones con herramientas de flujo de trabajo Premium.", "Organise more actions with Premium workflow tools.", 30),
    row("shortcuts", "Widget, Share y Atajos", "Widget, Share, and Shortcuts", "included", "Captura desde Widget, Share y Atajos para reducir fricción en el momento real.", "Capture from Widget, Share, and Shortcuts to reduce friction in the moment.", "included", "Conecta estos accesos con más automatizaciones y capacidad de trabajo.", "Connect these entry points with more automation and workflow capacity.", 40),
    row("capacity", "Capacidad y suscripción", "Capacity and subscription", "limited", "El espacio gratuito está pensado para validar el flujo personal de capturas.", "Free capacity is designed to validate a personal capture workflow.", "included", "Aumenta el espacio para capturas y restaura la suscripción entre dispositivos con el mismo Apple Account.", "Increase capture capacity and restore the subscription across devices with the same Apple Account.", 50),
  ],
  schoolsnap: [
    row("capture-review", "Captura y revisión de avisos", "Notice capture and review", "included", "Captura avisos escolares y revisa el contenido antes de convertirlo en una tarea.", "Capture school notices and review content before turning it into a task.", "included", "Gestiona más avisos y conserva un historial familiar más completo.", "Manage more notices and keep a fuller family history.", 10),
    row("local-extraction", "OCR y extracción local", "Local OCR and extraction", "included", "Extrae fechas, lugares y acciones en el dispositivo para proteger la información familiar.", "Extract dates, places, and actions on-device to protect family information.", "included", "Aplica flujos avanzados sobre más avisos sin sacar el contenido del dispositivo.", "Apply advanced workflows to more notices without taking content off-device.", 20),
    row("timeline-checklist", "Timeline y checklist", "Timeline and checklist", "included", "Convierte cada aviso confirmado en fechas, checklist y acciones que se pueden completar.", "Turn each confirmed notice into dates, checklists, and actionable steps.", "included", "Agrupa y prioriza acciones de distintos perfiles familiares.", "Group and prioritise actions across family profiles.", 30),
    row("widgets-shortcuts", "Tomorrow, widgets y Atajos", "Tomorrow, widgets, and Shortcuts", "included", "Consulta lo próximo y captura desde widgets y Atajos sin abrir toda la aplicación.", "See what is next and capture from widgets and Shortcuts without opening the whole app.", "included", "Automatiza vistas y acciones frecuentes para la rutina familiar.", "Automate frequent views and actions for the family routine.", 40),
    row("family-capacity", "Capacidad y workflows familiares", "Capacity and family workflows", "limited", "La versión gratuita cubre el flujo esencial de un hogar.", "The free version covers the essential workflow for one household.", "included", "Aumenta la capacidad de uso y desbloquea perfiles y flujos familiares avanzados cuando estén disponibles.", "Increase usage capacity and unlock advanced profiles and family workflows when available.", 50),
  ],
  culmina: [
    row("initiatives-stages", "Iniciativas y fases", "Initiatives and stages", "included", "Divide proyectos complejos en iniciativas y fases con una visión local y clara.", "Break complex projects into initiatives and stages with a clear local view.", "included", "Añade contexto financiero y reglas de seguimiento a cada fase.", "Add financial context and tracking rules to every stage.", 10),
    row("actions-dependencies", "Acciones y dependencias", "Actions and dependencies", "included", "Ordena acciones y dependencias para saber qué desbloquea el siguiente paso.", "Organise actions and dependencies to see what unlocks the next step.", "included", "Automatiza estados y recordatorios en proyectos con más complejidad.", "Automate statuses and reminders in more complex projects.", 20),
    row("local-data", "Persistencia local", "Local persistence", "included", "Trabaja con datos locales para mantener el control y seguir avanzando sin una cuenta.", "Work with local data to keep control and move forward without an account.", "included", "Prepara la colaboración y sincronización futura sin cambiar la base del proyecto.", "Prepare for future collaboration and sync without changing the project foundation.", 30),
    row("export-import", "Exportación e importación", "Export and import", "included", "Mueve tu proyecto mediante exportación e importación para conservar la propiedad de los datos.", "Move projects through export and import while keeping data ownership.", "included", "Amplía el intercambio con automatizaciones y capacidades Premium previstas.", "Extend exchange with planned automations and Premium capabilities.", 40),
    row("finance-collaboration", "Finanzas y colaboración", "Finance and collaboration", "not_included", "La versión gratuita cubre la planificación esencial sin módulos avanzados.", "The free version covers essential planning without advanced modules.", "planned", "Finanzas avanzadas, colaboración y sincronización están previstas para la evolución Premium.", "Advanced finance, collaboration, and sync are planned for the Premium evolution.", 50),
  ],
  vitalsbud: [
    row("pet-profile", "Perfil de mascota", "Pet profile", "included", "Crea un perfil para centralizar la información importante de cada mascota.", "Create a profile to centralise important information for every pet.", "included", "Extiende la ficha con contexto histórico y datos preparados para compartir.", "Extend the profile with history and data prepared for sharing.", 10),
    row("health-records", "Registros de salud", "Health records", "included", "Guarda registros de salud y notas para tener una memoria fiable de sus cuidados.", "Keep health records and notes as a reliable care memory.", "included", "Organiza más historial y prepara exportes para profesionales veterinarios.", "Organise more history and prepare exports for veterinary professionals.", 20),
    row("routines-calendar", "Rutinas y calendario", "Routines and calendar", "included", "Planifica rutinas y fechas para que los cuidados formen parte del día a día.", "Plan routines and dates so care becomes part of everyday life.", "included", "Añade una lectura avanzada de patrones y próximos cuidados.", "Add an advanced view of patterns and upcoming care.", 30),
    row("analytics", "Analítica avanzada", "Advanced analytics", "not_included", "El plan gratuito prioriza el registro y la rutina, sin analítica avanzada.", "The free plan prioritises logging and routines without advanced analytics.", "planned", "La analítica avanzada se incorporará como capacidad Plus durante la evolución del producto.", "Advanced analytics will be introduced as a Plus capability as the product evolves.", 40),
    row("vet-exports", "Exportes veterinarios", "Veterinary exports", "not_included", "No incluye exportes especializados en la versión gratuita.", "Specialised exports are not included in the free version.", "planned", "Los exportes veterinarios y las funciones Plus están previstos para una fase posterior.", "Veterinary exports and Plus features are planned for a later phase.", 50),
  ],
};

export function getFallbackAppFeatureComparisons(slug: string): AppFeatureComparison[] {
  return fallbackFeatureComparisonsBySlug[slug] ?? [];
}
