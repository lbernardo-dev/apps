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
    row("icloud-sync", "Sincronización opcional con iCloud", "Optional iCloud sync", "not_included", "Free mantiene los documentos en este dispositivo; la Bóveda siempre es local.", "Free keeps documents on this device; the Vault always stays local.", "included", "Sincroniza paquetes restaurables en tu base privada de CloudKit; la Bóveda no se sincroniza.", "Sync restorable packages to your private CloudKit database; the Vault is not synced.", 45),
    row("batch-automation", "Lotes y automatizaciones", "Batch work and automation", "limited", "La versión gratuita permite procesar hasta 10 documentos en total, de forma acumulativa.", "The free plan allows up to 10 documents in total, cumulatively.", "included", "Procesa lotes, guarda plantillas y aplica automatizaciones con marcas de agua.", "Process batches, save templates, and apply automations with watermarks.", 50),
  ],
  upledger: [
    row("accounts", "Cuentas", "Accounts", "limited", "El plan gratuito incluye 1 cuenta.", "The free plan includes 1 account.", "included", "Amplía el número de cuentas según el plan Pro disponible en la app.", "Raises the account limit according to the Pro plan shown in the app.", 10),
    row("classification-rules", "Reglas de clasificación", "Classification rules", "limited", "Puedes crear hasta 2 reglas de clasificación.", "Create up to 2 classification rules.", "included", "Amplía el límite de reglas para reducir el trabajo repetitivo.", "Raises the rule limit to reduce repetitive work.", 20),
    row("recurring-transactions", "Movimientos recurrentes", "Recurring transactions", "limited", "Puedes guardar hasta 2 movimientos recurrentes.", "Save up to 2 recurring transactions.", "included", "Amplía el límite de movimientos recurrentes.", "Raises the recurring transaction limit.", 30),
    row("household", "Miembros del hogar", "Household members", "limited", "El plan gratuito incluye 1 miembro del hogar.", "The free plan includes 1 household member.", "included", "Permite ampliar el hogar compartido según el plan Pro disponible en la app.", "Allows a larger shared household according to the Pro plan shown in the app.", 40),
    row("forecasts-analysis", "Previsiones y análisis", "Forecasts and analysis", "limited", "Incluye una visión básica para revisar tu situación actual.", "Includes a basic view for reviewing your current position.", "included", "Añade previsiones ampliadas, escenarios y análisis avanzado.", "Adds extended forecasts, scenarios, and advanced analysis.", 50),
    row("icloud-export", "iCloud y exportación", "iCloud and export", "not_included", "Los datos se guardan localmente; la sincronización y la exportación avanzada no están incluidas.", "Data stays local; sync and advanced export are not included.", "included", "Sincronización opcional con iCloud y exportación CSV, JSON y PDF.", "Optional iCloud sync and CSV, JSON, and PDF export.", 60),
  ],

  renuvia: [
    row("manual-entry", "Alta manual y expedientes activos", "Manual entry and active dossiers", "limited", "Añade datos manualmente sin conexión; Free permite hasta 7 expedientes activos.", "Add details manually offline; Free allows up to 7 active dossiers.", "included", "Alta manual sin conexión y seguimiento sin límite de expedientes activos.", "Manual entry offline and unlimited active dossier tracking.", 10),
    row("scans", "Capturas OCR y códigos de barras", "OCR and barcode scans", "limited", "Hasta 3 capturas al mes; revisa y confirma cada campo antes de guardar.", "Up to 3 captures per month; review and confirm every field before saving.", "included", "Capturas OCR y de códigos de barras sin límite.", "Unlimited OCR and barcode captures.", 20),
    row("categories", "Categorías", "Categories", "included", "Incluye las categorías integradas para organizar tus expedientes.", "Includes built-in categories to organize your dossiers.", "included", "Crea categorías personalizadas con nombres, colores e iconos propios.", "Create custom categories with your own names, colors, and icons.", 30),
    row("reminders", "Recordatorios", "Reminders", "limited", "Avisos locales con opciones básicas; iOS controla su entrega.", "Local alerts with basic options; iOS controls delivery.", "included", "Configura varios intervalos de aviso para cada expediente.", "Configure multiple reminder intervals for each dossier.", 40),
    row("playbooks", "Playbooks y checklists", "Playbooks and checklists", "included", "Elige una lista inicial y marca los pasos que hayas completado.", "Choose a starter checklist and mark the steps you complete.", "included", "Los playbooks iniciales y el seguimiento de checklist también están incluidos.", "Starter playbooks and checklist tracking are included too.", 50),
    row("attachments", "Archivos adjuntos", "Attachments", "limited", "Se permite 1 archivo por expediente.", "Allows 1 file per dossier.", "included", "Guarda varios archivos por expediente.", "Store multiple files per dossier.", 60),
    row("exports-sync", "Exportación y sincronización", "Export and sync", "not_included", "Los datos se guardan localmente; la exportación y iCloud requieren Pro.", "Data is stored locally; export and iCloud require Pro.", "included", "Exporta y restaura CSV/JSON y activa iCloud privado para los datos del expediente. Los archivos adjuntos siguen en cada dispositivo.", "Export and restore CSV/JSON, and enable private iCloud sync for dossier data. Attachment files stay on each device.", 70),
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
    row("initiatives-stages", "Iniciativas y fases", "Initiatives and stages", "limited", "El plan gratuito incluye hasta 3 iniciativas, cada una organizada por fases.", "The free plan includes up to 3 initiatives, each organised into stages.", "included", "Crea iniciativas sin límite y organiza cada proyecto por fases.", "Create unlimited initiatives and organise each project into stages.", 10),
    row("lead-status-filters", "Filtros por estado", "Status filters", "not_included", "La versión gratuita no incluye filtros por estado.", "The free plan does not include status filters.", "included", "Filtra los registros por estado para centrarte en los que necesitan atención.", "Filter records by status to focus on the ones that need attention.", 20),
    row("seasonal-themes", "Temas de temporada", "Seasonal themes", "limited", "El tema vigente se aplica automáticamente.", "The active seasonal theme is applied automatically.", "included", "Elige manualmente el tema de temporada mientras el evento está activo.", "Choose the seasonal theme manually while its event is active.", 30),
    row("actions-dependencies", "Acciones y dependencias", "Actions and dependencies", "included", "Asigna fechas, responsables, prioridades y dependencias.", "Set dates, owners, priorities, and dependencies.", "included", "Mantén las acciones y su seguimiento enlazados a cada iniciativa.", "Keep actions and their follow-up linked to each initiative.", 40),
    row("local-data", "Datos locales y exportación", "Local data and export", "included", "Los datos se guardan en el dispositivo y se pueden exportar o importar.", "Data is stored on-device and can be exported or imported.", "included", "Las mismas opciones de datos locales están incluidas en Pro.", "The same local data options are included in Pro.", 50),
  ],
  vitalsbud: [
    row("pet-profile", "Perfiles de mascotas", "Pet profiles", "limited", "Una mascota incluida en Gratis.", "One pet is included in Free.", "included", "Añade perfiles ilimitados.", "Add unlimited pet profiles.", 10),
    row("health-records", "Historial de salud", "Health history", "included", "Registra vacunas, medicación, peso, síntomas, visitas y notas.", "Log vaccines, medication, weight, symptoms, visits, and notes.", "included", "Incluido para todas tus mascotas; Plus no es necesario para consultar o compartir el historial básico.", "Included for all your pets; Plus is not required to view or share the basic history.", 20),
    row("routines-calendar", "Rutinas y recordatorios", "Routines and reminders", "included", "Organiza cuidados preventivos, fechas y recordatorios.", "Organize preventive care, dates, and reminders.", "included", "Las mismas rutinas y recordatorios para tus perfiles ilimitados.", "The same routines and reminders across unlimited pet profiles.", 30),
    row("food-inventory", "Inventario de comida", "Food inventory", "included", "Registra productos y cantidades manualmente.", "Record products and quantities manually.", "included", "Registra productos y cantidades manualmente.", "Record products and quantities manually.", 40),
    row("analytics", "Analítica avanzada de salud", "Advanced health analytics", "not_included", "El plan Gratis no incluye analítica avanzada.", "The Free plan does not include advanced analytics.", "included", "Consulta analítica avanzada de salud con VitalsBud Plus.", "View advanced health analytics with VitalsBud Plus.", 50),
    row("vet-exports", "Resumen PDF para compartir", "Shareable PDF summary", "included", "Elige secciones del historial y comparte un resumen factual.", "Choose history sections and share a factual summary.", "included", "Incluido; no hace falta Plus para exportar el resumen PDF básico.", "Included; Plus is not required to export the basic PDF summary.", 60),
    row("memories-gallery", "Galería de recuerdos", "Memories Gallery", "included", "Guarda fotos y vídeos con notas, categorías y favoritos en el dispositivo.", "Save photos and videos with notes, categories, and favorites on this device.", "included", "Usa la misma galería con todos tus perfiles Plus.", "Use the same gallery across all your Plus pet profiles.", 70),
    row("seasonal-themes", "Temas de temporada", "Seasonal themes", "limited", "Free aplica los temas programados automáticamente; no permite elegirlos manualmente.", "Free applies scheduled themes automatically; manual selection is not available.", "included", "Elige manualmente temas compatibles mientras estén activos.", "Choose compatible themes manually while they are active.", 80),
  ],
};

export function getFallbackAppFeatureComparisons(slug: string): AppFeatureComparison[] {
  return fallbackFeatureComparisonsBySlug[slug] ?? [];
}
