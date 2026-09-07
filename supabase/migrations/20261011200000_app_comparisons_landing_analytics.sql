-- Detailed Free/Premium comparisons, public landing settings, and first-party
-- aggregate events used by the admin dashboard.

create table if not exists public.app_feature_comparisons (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  feature_key text not null,
  title text not null,
  title_en text,
  free_status text not null default 'included' check (free_status in ('included', 'limited', 'not_included', 'planned')),
  free_detail text not null,
  free_detail_en text,
  pro_status text not null default 'included' check (pro_status in ('included', 'limited', 'not_included', 'planned')),
  pro_detail text not null,
  pro_detail_en text,
  sort_order integer not null default 0,
  is_enabled boolean not null default true,
  source_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (app_id, feature_key)
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null default '',
  value_type text not null default 'text' check (value_type in ('text', 'number', 'boolean')),
  label text not null,
  label_en text,
  description text not null default '',
  description_en text,
  is_public boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.landing_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null check (event_name ~ '^[a-z0-9_.-]{1,80}$'),
  app_slug text,
  locale text,
  path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.app_feature_comparisons enable row level security;
alter table public.site_settings enable row level security;
alter table public.landing_events enable row level security;

drop policy if exists "public read app comparisons" on public.app_feature_comparisons;
drop policy if exists "editors read app comparisons" on public.app_feature_comparisons;
drop policy if exists "editors insert app comparisons" on public.app_feature_comparisons;
drop policy if exists "editors update app comparisons" on public.app_feature_comparisons;
drop policy if exists "editors delete app comparisons" on public.app_feature_comparisons;
create policy "public read app comparisons" on public.app_feature_comparisons
  for select using (is_enabled = true and exists (
    select 1 from public.apps where apps.id = app_feature_comparisons.app_id and apps.status in ('published', 'coming_soon')
  ));
create policy "editors read app comparisons" on public.app_feature_comparisons
  for select to authenticated using (public.can_edit_content());
create policy "editors insert app comparisons" on public.app_feature_comparisons
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update app comparisons" on public.app_feature_comparisons
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete app comparisons" on public.app_feature_comparisons
  for delete to authenticated using (public.can_edit_content());

drop policy if exists "public read public site settings" on public.site_settings;
drop policy if exists "editors read site settings" on public.site_settings;
drop policy if exists "editors insert site settings" on public.site_settings;
drop policy if exists "editors update site settings" on public.site_settings;
drop policy if exists "editors delete site settings" on public.site_settings;
create policy "public read public site settings" on public.site_settings
  for select using (is_public = true);
create policy "editors read site settings" on public.site_settings
  for select to authenticated using (public.can_edit_content());
create policy "editors insert site settings" on public.site_settings
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update site settings" on public.site_settings
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete site settings" on public.site_settings
  for delete to authenticated using (public.can_edit_content());

drop policy if exists "public create landing events" on public.landing_events;
drop policy if exists "editors read landing events" on public.landing_events;
create policy "public create landing events" on public.landing_events
  for insert to anon, authenticated with check (
    length(trim(event_name)) between 1 and 80
    and (locale is null or locale in ('es', 'en'))
    and (path is null or length(path) <= 240)
  );
create policy "editors read landing events" on public.landing_events
  for select to authenticated using (public.can_edit_content());

create index if not exists app_feature_comparisons_app_id_order_idx on public.app_feature_comparisons(app_id, sort_order);
create index if not exists landing_events_created_at_idx on public.landing_events(created_at desc);
create index if not exists landing_events_name_created_at_idx on public.landing_events(event_name, created_at desc);

insert into public.site_settings (key, value, value_type, label, label_en, description, description_en, is_public)
values
  ('hero_show_badges', 'true', 'boolean', 'Mostrar badges del hero', 'Show hero badges', 'Activa o desactiva los badges flotantes del showcase de vídeo.', 'Toggle the floating badges on the hero video showcase.', true),
  ('hero_video_rotation_ms', '6500', 'number', 'Intervalo de rotación del hero (ms)', 'Hero rotation interval (ms)', 'Tiempo entre previews de producto; mínimo recomendado: 3000 ms.', 'Time between product previews; recommended minimum: 3000 ms.', true),
  ('landing_show_metrics', 'true', 'boolean', 'Mostrar métricas de landing', 'Show landing metrics', 'Controla la franja de métricas situada bajo el hero.', 'Controls the metrics strip under the hero.', true),
  ('landing_show_campaigns', 'true', 'boolean', 'Mostrar anuncios y encuestas', 'Show campaigns and surveys', 'Controla los módulos de engagement configurables de la landing.', 'Controls configurable engagement modules on the landing.', true),
  ('landing_default_audience', 'product', 'text', 'Audiencia inicial', 'Default audience', 'Audiencia que aparece seleccionada al cargar la landing: product o service.', 'Audience selected when the landing loads: product or service.', true)
on conflict (key) do nothing;

insert into public.app_feature_comparisons (
  app_id, feature_key, title, title_en, free_status, free_detail, free_detail_en,
  pro_status, pro_detail, pro_detail_en, sort_order, source_note
)
select a.id, x.feature_key, x.title, x.title_en, x.free_status, x.free_detail, x.free_detail_en,
  x.pro_status, x.pro_detail, x.pro_detail_en, x.sort_order, 'Catálogo de producto RomeroDev'
from jsonb_to_recordset($comparisons$
[
  {"slug":"vitalspath","feature_key":"medication","title":"Medicaciones","title_en":"Medication tracking","free_status":"included","free_detail":"Registra medicamentos, dosis, frecuencia y horarios con recordatorios claros.","free_detail_en":"Track medications, doses, frequency, and schedules with clear reminders.","pro_status":"included","pro_detail":"Añade contexto de tratamiento y una visión más completa de la adherencia y el historial.","pro_detail_en":"Add treatment context plus a fuller view of adherence and history.","sort_order":10},
  {"slug":"vitalspath","feature_key":"symptoms-vitals","title":"Síntomas y constantes","title_en":"Symptoms and vitals","free_status":"included","free_detail":"Guarda síntomas y constantes para consultar la evolución desde un único lugar privado.","free_detail_en":"Log symptoms and vitals to review progress from one private place.","pro_status":"included","pro_detail":"Relaciona registros y periodos para preparar conversaciones médicas con más contexto.","pro_detail_en":"Connect entries and periods to prepare better-informed medical conversations.","sort_order":20},
  {"slug":"vitalspath","feature_key":"appointments","title":"Citas y recordatorios","title_en":"Appointments and reminders","free_status":"included","free_detail":"Organiza citas y avisos asociados a cada cuidado sin depender de varias aplicaciones.","free_detail_en":"Organize appointments and care reminders without relying on several apps.","pro_status":"included","pro_detail":"Coordina recordatorios y seguimiento cuando participan varias personas en el cuidado.","pro_detail_en":"Coordinate reminders and follow-up when several people share care.","sort_order":30},
  {"slug":"vitalspath","feature_key":"family-care","title":"Perfiles familiares y cuidados compartidos","title_en":"Family profiles and shared care","free_status":"not_included","free_detail":"El plan gratuito está centrado en un perfil personal.","free_detail_en":"The free plan focuses on one personal profile.","pro_status":"included","pro_detail":"Crea perfiles familiares y comparte cuidados con las personas que necesitan colaborar.","pro_detail_en":"Create family profiles and share care with the people who need to collaborate.","sort_order":40},
  {"slug":"vitalspath","feature_key":"apple-ecosystem","title":"Apple Watch, widgets y Live Activities","title_en":"Apple Watch, widgets, and Live Activities","free_status":"not_included","free_detail":"No incluye las superficies avanzadas del ecosistema Apple.","free_detail_en":"Advanced Apple ecosystem surfaces are not included.","pro_status":"included","pro_detail":"Consulta y actualiza información desde Apple Watch, widgets y Live Activities cuando está disponible.","pro_detail_en":"Access and update information from Apple Watch, widgets, and Live Activities when available.","sort_order":50},

  {"slug":"reps","feature_key":"workout-log","title":"Registro de entrenamientos","title_en":"Workout logging","free_status":"included","free_detail":"Registra series, repeticiones y cargas sin límite para mantener una rutina consistente.","free_detail_en":"Log sets, reps, and loads without limits to build consistent training.","pro_status":"included","pro_detail":"Conserva un historial más completo para analizar bloques largos de entrenamiento.","pro_detail_en":"Keep a richer history for analysing longer training blocks.","sort_order":10},
  {"slug":"reps","feature_key":"exercise-library","title":"Biblioteca de ejercicios","title_en":"Exercise library","free_status":"included","free_detail":"Parte de una biblioteca de ejercicios y adapta cada movimiento a tu sesión.","free_detail_en":"Start from an exercise library and adapt every movement to your session.","pro_status":"included","pro_detail":"Organiza variantes y referencias para que la biblioteca acompañe tu progresión.","pro_detail_en":"Organise variants and references so the library supports your progression.","sort_order":20},
  {"slug":"reps","feature_key":"custom-routines","title":"Rutinas personalizadas","title_en":"Custom routines","free_status":"included","free_detail":"Diseña rutinas propias y repítelas con una estructura fácil de seguir.","free_detail_en":"Build custom routines and repeat them with a clear structure.","pro_status":"included","pro_detail":"Configura progresiones y reglas más precisas para distintos objetivos.","pro_detail_en":"Configure more precise progressions and rules for different goals.","sort_order":30},
  {"slug":"reps","feature_key":"advanced-analytics","title":"Analítica de progreso","title_en":"Progress analytics","free_status":"limited","free_detail":"Incluye analítica básica para ver la evolución esencial de tus entrenamientos.","free_detail_en":"Includes basic analytics for the essential view of training progress.","pro_status":"included","pro_detail":"Desbloquea analítica avanzada de volumen, consistencia, recuperación y progresión.","pro_detail_en":"Unlock advanced volume, consistency, recovery, and progression analytics.","sort_order":40},
  {"slug":"reps","feature_key":"watch-backups","title":"Apple Watch y copias","title_en":"Apple Watch and backups","free_status":"limited","free_detail":"La experiencia gratuita mantiene el registro principal en el dispositivo.","free_detail_en":"The free experience keeps the core log on-device.","pro_status":"included","pro_detail":"Añade integración avanzada con Apple Watch, backups automáticos y tarjetas para compartir.","pro_detail_en":"Add advanced Apple Watch integration, automatic backups, and share cards.","sort_order":50},

  {"slug":"shield","feature_key":"capture","title":"Importación, cámara y escáner","title_en":"Import, camera, and scanner","free_status":"included","free_detail":"Importa documentos o captura una imagen para empezar a proteger datos personales.","free_detail_en":"Import documents or capture an image to start protecting personal data.","pro_status":"included","pro_detail":"Procesa más documentos dentro de proyectos activos ilimitados.","pro_detail_en":"Process more documents inside unlimited active projects.","sort_order":10},
  {"slug":"shield","feature_key":"masking-ocr","title":"Máscaras manuales y sugerencias OCR","title_en":"Manual masks and OCR suggestions","free_status":"included","free_detail":"Oculta datos manualmente y revisa las sugerencias OCR antes de aplicarlas.","free_detail_en":"Mask data manually and review OCR suggestions before applying them.","pro_status":"included","pro_detail":"Reutiliza plantillas semánticas y acelera trabajos repetitivos de anonimización.","pro_detail_en":"Reuse semantic templates and speed up repetitive redaction work.","sort_order":20},
  {"slug":"shield","feature_key":"verified-export","title":"Exportación verificada","title_en":"Verified export","free_status":"included","free_detail":"Exporta una versión rasterizada y revisada para compartir solo lo necesario.","free_detail_en":"Export a rasterised, reviewed version that shares only what is needed.","pro_status":"included","pro_detail":"Aplica estilos, controles de imagen y marcas de agua avanzadas antes de exportar.","pro_detail_en":"Apply advanced styles, image controls, and watermarks before exporting.","sort_order":30},
  {"slug":"shield","feature_key":"vault","title":"Cifrado local y Bóveda","title_en":"Local encryption and Vault","free_status":"included","free_detail":"Mantén los documentos en el dispositivo con cifrado local y una bóveda protegida.","free_detail_en":"Keep documents on-device with local encryption and a protected Vault.","pro_status":"included","pro_detail":"Gestiona proyectos activos ilimitados manteniendo el mismo modelo de privacidad local.","pro_detail_en":"Manage unlimited active projects while keeping the same local privacy model.","sort_order":40},
  {"slug":"shield","feature_key":"batch-automation","title":"Lotes y automatizaciones","title_en":"Batch work and automation","free_status":"limited","free_detail":"Hasta 10 documentos activos para revisar el flujo con control manual.","free_detail_en":"Up to 10 active documents so the workflow stays manually controlled.","pro_status":"included","pro_detail":"Procesa lotes, guarda plantillas y aplica automatizaciones con marcas de agua.","pro_detail_en":"Process batches, save templates, and apply automations with watermarks.","sort_order":50},

  {"slug":"upledger","feature_key":"accounts-movements","title":"Cuentas y movimientos","title_en":"Accounts and movements","free_status":"included","free_detail":"Registra cuentas y movimientos para conocer con claridad por dónde pasa tu dinero.","free_detail_en":"Track accounts and movements to understand where your money goes.","pro_status":"included","pro_detail":"Conserva más histórico para descubrir patrones y preparar escenarios.","pro_detail_en":"Keep more history to discover patterns and prepare scenarios.","sort_order":10},
  {"slug":"upledger","feature_key":"budgets","title":"Categorías y presupuestos","title_en":"Categories and budgets","free_status":"included","free_detail":"Clasifica movimientos y define presupuestos para las decisiones diarias.","free_detail_en":"Categorise movements and set budgets for everyday decisions.","pro_status":"included","pro_detail":"Convierte categorías y presupuestos en reglas que reduzcan trabajo repetitivo.","pro_detail_en":"Turn categories and budgets into rules that reduce repetitive work.","sort_order":20},
  {"slug":"upledger","feature_key":"net-worth","title":"Patrimonio básico","title_en":"Basic net worth","free_status":"included","free_detail":"Consulta una visión local y sencilla de ingresos, gastos y patrimonio.","free_detail_en":"Review a simple local view of income, spending, and net worth.","pro_status":"included","pro_detail":"Compara la evolución y los supuestos con análisis más profundos.","pro_detail_en":"Compare progress and assumptions with deeper analysis.","sort_order":30},
  {"slug":"upledger","feature_key":"forecasts","title":"Previsiones y escenarios","title_en":"Forecasts and scenarios","free_status":"not_included","free_detail":"El plan gratuito se centra en el control actual, sin escenarios avanzados.","free_detail_en":"The free plan focuses on current control, without advanced scenarios.","pro_status":"included","pro_detail":"Modela previsiones y escenarios para anticipar decisiones financieras.","pro_detail_en":"Model forecasts and scenarios to anticipate financial decisions.","sort_order":40},
  {"slug":"upledger","feature_key":"automation-export","title":"Automatizaciones y exportación","title_en":"Automation and export","free_status":"limited","free_detail":"Incluye datos locales y exportación básica para mantener el control.","free_detail_en":"Includes local data and basic export to keep control of your information.","pro_status":"planned","pro_detail":"Las reglas, automatizaciones y funciones Pro avanzadas se activarán progresivamente.","pro_detail_en":"Rules, automations, and advanced Pro features will roll out progressively.","sort_order":50},

  {"slug":"renuvia","feature_key":"manual-entry","title":"Entrada manual ilimitada","title_en":"Unlimited manual entry","free_status":"included","free_detail":"Añade renovaciones manualmente sin depender de integraciones externas.","free_detail_en":"Add renewals manually without relying on external integrations.","pro_status":"included","pro_detail":"Relaciona cada entrada con un expediente y un historial de renovaciones.","pro_detail_en":"Connect every entry to a dossier and renewal history.","sort_order":10},
  {"slug":"renuvia","feature_key":"readiness-radar","title":"Radar de preparación","title_en":"Readiness Radar","free_status":"included","free_detail":"Identifica qué renovación necesita atención antes de que se convierta en un problema.","free_detail_en":"Identify which renewal needs attention before it becomes a problem.","pro_status":"included","pro_detail":"Personaliza señales y playbooks para procesos de renovación más complejos.","pro_detail_en":"Customise signals and playbooks for more complex renewal processes.","sort_order":20},
  {"slug":"renuvia","feature_key":"playbooks","title":"Playbooks y checklists","title_en":"Playbooks and checklists","free_status":"included","free_detail":"Usa playbooks esenciales y una revisión OCR local para preparar cada caso.","free_detail_en":"Use essential playbooks and local OCR review to prepare each case.","pro_status":"included","pro_detail":"Crea playbooks personalizados, checklists y documentos avanzados.","pro_detail_en":"Create custom playbooks, checklists, and advanced documents.","sort_order":30},
  {"slug":"renuvia","feature_key":"dossiers","title":"Expedientes e historial","title_en":"Dossiers and history","free_status":"limited","free_detail":"El flujo gratuito permite preparar entradas, con foco en una revisión sencilla.","free_detail_en":"The free workflow supports entries with a focus on simple review.","pro_status":"included","pro_detail":"Gestiona expedientes ilimitados y consulta el historial de renovación completo.","pro_detail_en":"Manage unlimited dossiers and review the full renewal history.","sort_order":40},
  {"slug":"renuvia","feature_key":"exports-sync","title":"Exportación y sincronización","title_en":"Export and sync","free_status":"limited","free_detail":"Los datos permanecen locales y se revisan antes de cualquier salida.","free_detail_en":"Data stays local and is reviewed before any export.","pro_status":"included","pro_detail":"Exporta a CSV/JSON y habilita la sincronización iCloud opcional cuando esté disponible.","pro_detail_en":"Export CSV/JSON and enable optional iCloud sync when available.","sort_order":50},

  {"slug":"kinsera","feature_key":"local-protection","title":"Protección local","title_en":"Local protection","free_status":"included","free_detail":"La protección y las reglas principales se gestionan en el dispositivo.","free_detail_en":"Core protection and rules are managed on-device.","pro_status":"included","pro_detail":"Amplía las reglas y rutinas manteniendo el mismo enfoque privado y local.","pro_detail_en":"Expand rules and routines while keeping the same private, local approach.","sort_order":10},
  {"slug":"kinsera","feature_key":"scope-picker","title":"Selector de apps, categorías y webs","title_en":"App, category, and website picker","free_status":"included","free_detail":"Elige qué apps, categorías o webs forman parte de cada regla familiar.","free_detail_en":"Choose which apps, categories, or websites belong to each family rule.","pro_status":"included","pro_detail":"Combina selecciones en rutinas ampliadas para distintos momentos del día.","pro_detail_en":"Combine selections into extended routines for different parts of the day.","sort_order":20},
  {"slug":"kinsera","feature_key":"timers-pauses","title":"Temporizadores y pausas","title_en":"Timers and pauses","free_status":"included","free_detail":"Configura límites y pausas comprensibles para que la familia sepa qué ocurre.","free_detail_en":"Set understandable limits and pauses so the family knows what is happening.","pro_status":"included","pro_detail":"Añade solicitudes de tiempo y rutinas más flexibles para casos excepcionales.","pro_detail_en":"Add time requests and more flexible routines for exceptions.","sort_order":30},
  {"slug":"kinsera","feature_key":"routines","title":"Rutinas ampliadas","title_en":"Extended routines","free_status":"limited","free_detail":"Incluye el control diario esencial para comenzar a establecer hábitos digitales.","free_detail_en":"Includes essential daily control to start building digital habits.","pro_status":"included","pro_detail":"Amplía las rutinas según contexto, horario o necesidad familiar.","pro_detail_en":"Extend routines by context, schedule, or family need.","sort_order":40},
  {"slug":"kinsera","feature_key":"reports","title":"Informes y solicitudes","title_en":"Reports and requests","free_status":"not_included","free_detail":"El plan gratuito muestra el estado transparente sin informes agregados.","free_detail_en":"The free plan shows transparent status without aggregate reports.","pro_status":"included","pro_detail":"Ofrece informes agregados y solicitudes de tiempo para una coordinación familiar más clara.","pro_detail_en":"Adds aggregate reports and time requests for clearer family coordination.","sort_order":50},

  {"slug":"snapinbox","feature_key":"inbox-archive","title":"Inbox y archivo local","title_en":"Local inbox and archive","free_status":"included","free_detail":"Convierte capturas en una bandeja local que puedes revisar y archivar.","free_detail_en":"Turn screenshots into a local inbox you can review and archive.","pro_status":"included","pro_detail":"Mantén más capturas y un historial de acciones más amplio.","pro_detail_en":"Keep more captures and a larger action history.","sort_order":10},
  {"slug":"snapinbox","feature_key":"on-device-ocr","title":"OCR y extracción en el dispositivo","title_en":"On-device OCR and extraction","free_status":"included","free_detail":"Extrae información en el dispositivo para mantener el contenido bajo tu control.","free_detail_en":"Extract information on-device so content stays under your control.","pro_status":"included","pro_detail":"Procesa flujos de trabajo Premium más amplios sin cambiar el modelo de privacidad.","pro_detail_en":"Process broader Premium workflows without changing the privacy model.","sort_order":20},
  {"slug":"snapinbox","feature_key":"action-review","title":"Revisión y confirmación de acciones","title_en":"Action review and confirmation","free_status":"included","free_detail":"Revisa y confirma cada acción antes de convertir una captura en un siguiente paso.","free_detail_en":"Review and confirm every action before turning a capture into a next step.","pro_status":"included","pro_detail":"Organiza más acciones con herramientas de flujo de trabajo Premium.","pro_detail_en":"Organise more actions with Premium workflow tools.","sort_order":30},
  {"slug":"snapinbox","feature_key":"shortcuts","title":"Widget, Share y Atajos","title_en":"Widget, Share, and Shortcuts","free_status":"included","free_detail":"Captura desde Widget, Share y Atajos para reducir fricción en el momento real.","free_detail_en":"Capture from Widget, Share, and Shortcuts to reduce friction in the moment.","pro_status":"included","pro_detail":"Conecta estos accesos con más automatizaciones y capacidad de trabajo.","pro_detail_en":"Connect these entry points with more automation and workflow capacity.","sort_order":40},
  {"slug":"snapinbox","feature_key":"capacity","title":"Capacidad y suscripción","title_en":"Capacity and subscription","free_status":"limited","free_detail":"El espacio gratuito está pensado para validar el flujo personal de capturas.","free_detail_en":"Free capacity is designed to validate a personal capture workflow.","pro_status":"included","pro_detail":"Aumenta el espacio para capturas y restaura la suscripción entre dispositivos con el mismo Apple Account.","pro_detail_en":"Increase capture capacity and restore the subscription across devices with the same Apple Account.","sort_order":50},

  {"slug":"schoolsnap","feature_key":"capture-review","title":"Captura y revisión de avisos","title_en":"Notice capture and review","free_status":"included","free_detail":"Captura avisos escolares y revisa el contenido antes de convertirlo en una tarea.","free_detail_en":"Capture school notices and review content before turning it into a task.","pro_status":"included","pro_detail":"Gestiona más avisos y conserva un historial familiar más completo.","pro_detail_en":"Manage more notices and keep a fuller family history.","sort_order":10},
  {"slug":"schoolsnap","feature_key":"local-extraction","title":"OCR y extracción local","title_en":"Local OCR and extraction","free_status":"included","free_detail":"Extrae fechas, lugares y acciones en el dispositivo para proteger la información familiar.","free_detail_en":"Extract dates, places, and actions on-device to protect family information.","pro_status":"included","pro_detail":"Aplica flujos avanzados sobre más avisos sin sacar el contenido del dispositivo.","pro_detail_en":"Apply advanced workflows to more notices without taking content off-device.","sort_order":20},
  {"slug":"schoolsnap","feature_key":"timeline-checklist","title":"Timeline y checklist","title_en":"Timeline and checklist","free_status":"included","free_detail":"Convierte cada aviso confirmado en fechas, checklist y acciones que se pueden completar.","free_detail_en":"Turn each confirmed notice into dates, checklists, and actionable steps.","pro_status":"included","pro_detail":"Agrupa y prioriza acciones de distintos perfiles familiares.","pro_detail_en":"Group and prioritise actions across family profiles.","sort_order":30},
  {"slug":"schoolsnap","feature_key":"widgets-shortcuts","title":"Tomorrow, widgets y Atajos","title_en":"Tomorrow, widgets, and Shortcuts","free_status":"included","free_detail":"Consulta lo próximo y captura desde widgets y Atajos sin abrir toda la aplicación.","free_detail_en":"See what is next and capture from widgets and Shortcuts without opening the whole app.","pro_status":"included","pro_detail":"Automatiza vistas y acciones frecuentes para la rutina familiar.","pro_detail_en":"Automate frequent views and actions for the family routine.","sort_order":40},
  {"slug":"schoolsnap","feature_key":"family-capacity","title":"Capacidad y workflows familiares","title_en":"Capacity and family workflows","free_status":"limited","free_detail":"La versión gratuita cubre el flujo esencial de un hogar.","free_detail_en":"The free version covers the essential workflow for one household.","pro_status":"included","pro_detail":"Aumenta la capacidad de uso y desbloquea perfiles y flujos familiares avanzados cuando estén disponibles.","pro_detail_en":"Increase usage capacity and unlock advanced profiles and family workflows when available.","sort_order":50},

  {"slug":"culmina","feature_key":"initiatives-stages","title":"Iniciativas y fases","title_en":"Initiatives and stages","free_status":"included","free_detail":"Divide proyectos complejos en iniciativas y fases con una visión local y clara.","free_detail_en":"Break complex projects into initiatives and stages with a clear local view.","pro_status":"included","pro_detail":"Añade contexto financiero y reglas de seguimiento a cada fase.","pro_detail_en":"Add financial context and tracking rules to every stage.","sort_order":10},
  {"slug":"culmina","feature_key":"actions-dependencies","title":"Acciones y dependencias","title_en":"Actions and dependencies","free_status":"included","free_detail":"Ordena acciones y dependencias para saber qué desbloquea el siguiente paso.","free_detail_en":"Organise actions and dependencies to see what unlocks the next step.","pro_status":"included","pro_detail":"Automatiza estados y recordatorios en proyectos con más complejidad.","pro_detail_en":"Automate statuses and reminders in more complex projects.","sort_order":20},
  {"slug":"culmina","feature_key":"local-data","title":"Persistencia local","title_en":"Local persistence","free_status":"included","free_detail":"Trabaja con datos locales para mantener el control y seguir avanzando sin una cuenta.","free_detail_en":"Work with local data to keep control and move forward without an account.","pro_status":"included","pro_detail":"Prepara la colaboración y sincronización futura sin cambiar la base del proyecto.","pro_detail_en":"Prepare for future collaboration and sync without changing the project foundation.","sort_order":30},
  {"slug":"culmina","feature_key":"export-import","title":"Exportación e importación","title_en":"Export and import","free_status":"included","free_detail":"Mueve tu proyecto mediante exportación e importación para conservar la propiedad de los datos.","free_detail_en":"Move projects through export and import while keeping data ownership.","pro_status":"included","pro_detail":"Amplía el intercambio con automatizaciones y capacidades Premium previstas.","pro_detail_en":"Extend exchange with planned automations and Premium capabilities.","sort_order":40},
  {"slug":"culmina","feature_key":"finance-collaboration","title":"Finanzas y colaboración","title_en":"Finance and collaboration","free_status":"not_included","free_detail":"La versión gratuita cubre la planificación esencial sin módulos avanzados.","free_detail_en":"The free version covers essential planning without advanced modules.","pro_status":"planned","pro_detail":"Finanzas avanzadas, colaboración y sincronización están previstas para la evolución Premium.","pro_detail_en":"Advanced finance, collaboration, and sync are planned for the Premium evolution.","sort_order":50},

  {"slug":"vitalsbud","feature_key":"pet-profile","title":"Perfil de mascota","title_en":"Pet profile","free_status":"included","free_detail":"Crea un perfil para centralizar la información importante de cada mascota.","free_detail_en":"Create a profile to centralise important information for every pet.","pro_status":"included","pro_detail":"Extiende la ficha con contexto histórico y datos preparados para compartir.","pro_detail_en":"Extend the profile with history and data prepared for sharing.","sort_order":10},
  {"slug":"vitalsbud","feature_key":"health-records","title":"Registros de salud","title_en":"Health records","free_status":"included","free_detail":"Guarda registros de salud y notas para tener una memoria fiable de sus cuidados.","free_detail_en":"Keep health records and notes as a reliable care memory.","pro_status":"included","pro_detail":"Organiza más historial y prepara exportes para profesionales veterinarios.","pro_detail_en":"Organise more history and prepare exports for veterinary professionals.","sort_order":20},
  {"slug":"vitalsbud","feature_key":"routines-calendar","title":"Rutinas y calendario","title_en":"Routines and calendar","free_status":"included","free_detail":"Planifica rutinas y fechas para que los cuidados formen parte del día a día.","free_detail_en":"Plan routines and dates so care becomes part of everyday life.","pro_status":"included","pro_detail":"Añade una lectura avanzada de patrones y próximos cuidados.","pro_detail_en":"Add an advanced view of patterns and upcoming care.","sort_order":30},
  {"slug":"vitalsbud","feature_key":"analytics","title":"Analítica avanzada","title_en":"Advanced analytics","free_status":"not_included","free_detail":"El plan gratuito prioriza el registro y la rutina, sin analítica avanzada.","free_detail_en":"The free plan prioritises logging and routines without advanced analytics.","pro_status":"planned","pro_detail":"La analítica avanzada se incorporará como capacidad Plus durante la evolución del producto.","pro_detail_en":"Advanced analytics will be introduced as a Plus capability as the product evolves.","sort_order":40},
  {"slug":"vitalsbud","feature_key":"vet-exports","title":"Exportes veterinarios","title_en":"Veterinary exports","free_status":"not_included","free_detail":"No incluye exportes especializados en la versión gratuita.","free_detail_en":"Specialised exports are not included in the free version.","pro_status":"planned","pro_detail":"Los exportes veterinarios y las funciones Plus están previstos para una fase posterior.","pro_detail_en":"Veterinary exports and Plus features are planned for a later phase.","sort_order":50}
]$comparisons$::jsonb) as x(
  slug text, feature_key text, title text, title_en text, free_status text, free_detail text,
  free_detail_en text, pro_status text, pro_detail text, pro_detail_en text, sort_order integer
)
join public.apps a on a.slug = x.slug
on conflict (app_id, feature_key) do update set
  title = excluded.title,
  title_en = excluded.title_en,
  free_status = excluded.free_status,
  free_detail = excluded.free_detail,
  free_detail_en = excluded.free_detail_en,
  pro_status = excluded.pro_status,
  pro_detail = excluded.pro_detail,
  pro_detail_en = excluded.pro_detail_en,
  sort_order = excluded.sort_order,
  updated_at = now();
