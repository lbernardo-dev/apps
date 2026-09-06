-- Complete product catalog model.
-- This migration keeps the existing `apps` table as the product identity and
-- adds first-class dynamic records for links, media, store facts, reviews,
-- follow-up subscriptions, and evidence-based completeness.

alter table public.apps drop constraint if exists apps_status_check;
alter table public.apps
  add constraint apps_status_check
  check (status in ('draft', 'published', 'testing', 'development', 'archived', 'coming_soon'));

alter table public.apps
  add column if not exists bundle_identifier text,
  add column if not exists version text,
  add column if not exists build_number text,
  add column if not exists follow_enabled boolean not null default true;

update public.apps
set status = 'development'
where status = 'coming_soon';

update public.apps set status = 'testing' where slug = 'kinsera';
update public.apps set status = 'testing' where slug = 'schoolsnap';

create table if not exists public.app_links (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  kind text not null check (kind in ('appstore', 'testflight', 'download', 'support', 'privacy', 'terms', 'subscriptions', 'website', 'repository', 'feedback', 'release_notes')),
  label text not null,
  label_en text,
  url text not null,
  is_primary boolean not null default false,
  is_external boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (app_id, kind, url)
);

create table if not exists public.app_media (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  kind text not null check (kind in ('icon', 'cover', 'screenshot', 'video', 'gallery', 'press')),
  path text not null,
  alt text not null default '',
  alt_en text,
  locale text check (locale in ('es', 'en') or locale is null),
  source text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (app_id, kind, path, locale)
);

create table if not exists public.app_store_snapshots (
  id uuid primary key default gen_random_uuid(),
  app_id uuid references public.apps(id) on delete cascade,
  app_slug text not null references public.apps(slug) on delete cascade,
  app_store_id text,
  track_name text not null,
  track_view_url text not null,
  version text not null,
  release_notes text,
  current_version_release_date timestamptz,
  minimum_os_version text,
  formatted_price text,
  developer text,
  languages text[] not null default '{}',
  file_size_bytes text,
  average_rating numeric(3, 2),
  user_rating_count integer not null default 0,
  synced_at timestamptz not null default now(),
  unique (app_slug)
);

create table if not exists public.app_reviews (
  id uuid primary key default gen_random_uuid(),
  app_slug text not null references public.apps(slug) on delete cascade,
  source text not null default 'app_store',
  author text not null,
  rating integer not null check (rating between 1 and 5),
  title text not null default '',
  content text not null,
  locale text check (locale in ('es', 'en') or locale is null),
  review_date date,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  unique (app_slug, source, author, review_date, content)
);

create table if not exists public.app_followers (
  id uuid primary key default gen_random_uuid(),
  app_slug text not null references public.apps(slug) on delete cascade,
  email text not null,
  locale text not null default 'es' check (locale in ('es', 'en')),
  created_at timestamptz not null default now(),
  last_notified_at timestamptz,
  unique (app_slug, email)
);

create table if not exists public.app_catalog_audits (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  source_path text not null,
  score integer not null default 0 check (score between 0 and 100),
  missing_fields text[] not null default '{}',
  verified_at timestamptz not null default now(),
  unique (app_id)
);

alter table public.app_links enable row level security;
alter table public.app_media enable row level security;
alter table public.app_store_snapshots enable row level security;
alter table public.app_reviews enable row level security;
alter table public.app_followers enable row level security;
alter table public.app_catalog_audits enable row level security;

drop policy if exists "public read app links" on public.app_links;
create policy "public read app links" on public.app_links
  for select using (exists (select 1 from public.apps where apps.id = app_links.app_id and apps.status in ('published', 'testing', 'development', 'coming_soon')));
drop policy if exists "editors manage app links" on public.app_links;
create policy "editors manage app links" on public.app_links
  for all using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "public read app media" on public.app_media;
create policy "public read app media" on public.app_media
  for select using (exists (select 1 from public.apps where apps.id = app_media.app_id and apps.status in ('published', 'testing', 'development', 'coming_soon')));
drop policy if exists "editors manage app media" on public.app_media;
create policy "editors manage app media" on public.app_media
  for all using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "public read store snapshots" on public.app_store_snapshots;
create policy "public read store snapshots" on public.app_store_snapshots
  for select using (exists (select 1 from public.apps where apps.slug = app_store_snapshots.app_slug and apps.status in ('published', 'testing', 'development', 'coming_soon')));
drop policy if exists "editors manage store snapshots" on public.app_store_snapshots;
create policy "editors manage store snapshots" on public.app_store_snapshots
  for all using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "public read published app reviews" on public.app_reviews;
create policy "public read published app reviews" on public.app_reviews
  for select using (is_published = true and exists (select 1 from public.apps where apps.slug = app_reviews.app_slug and apps.status in ('published', 'testing', 'development', 'coming_soon')));
drop policy if exists "editors manage app reviews" on public.app_reviews;
create policy "editors manage app reviews" on public.app_reviews
  for all using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "anyone can follow app" on public.app_followers;
create policy "anyone can follow app" on public.app_followers
  for insert to anon, authenticated
  with check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$');
drop policy if exists "editors manage app followers" on public.app_followers;
create policy "editors manage app followers" on public.app_followers
  for all using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "public read app catalog audits" on public.app_catalog_audits;
create policy "public read app catalog audits" on public.app_catalog_audits
  for select using (exists (select 1 from public.apps where apps.id = app_catalog_audits.app_id and apps.status in ('published', 'testing', 'development', 'coming_soon')));
drop policy if exists "editors manage app catalog audits" on public.app_catalog_audits;
create policy "editors manage app catalog audits" on public.app_catalog_audits
  for all using (public.can_edit_content()) with check (public.can_edit_content());

create index if not exists app_links_app_idx on public.app_links (app_id, sort_order);
create index if not exists app_media_app_idx on public.app_media (app_id, sort_order);
create unique index if not exists app_media_identity_idx on public.app_media (app_id, kind, path, coalesce(locale, ''));
create index if not exists app_reviews_slug_idx on public.app_reviews (app_slug, review_date desc);
create index if not exists app_followers_slug_idx on public.app_followers (app_slug, created_at desc);

-- Register the two source directories which were not present in the previous
-- catalog seed. The copy is intentionally explicit and factual: both are
-- development products, not public App Store releases.
insert into public.apps (
  slug, name, tagline, tagline_en, short_description, short_description_en,
  long_description, long_description_en, problem, problem_en, benefits,
  benefits_en, features, features_en, audience, audience_en, status, featured,
  category, platform, support_email, bundle_identifier, version, build_number,
  icon_url, cover_image_url, screenshots, primary_cta_label,
  primary_cta_label_en, primary_cta_url, secondary_cta_label,
  secondary_cta_label_en, secondary_cta_url, color_primary, color_secondary,
  seo_title, seo_description, pricing, free_features, free_features_en,
  pro_features, pro_features_en, follow_enabled, updated_at
) values
(
  'culmina', 'Culmina', 'Convierte proyectos complejos en resultados completados.', 'Turn complex projects into completed outcomes.',
  'Planifica iniciativas, acciones, personas, recursos, costes y evidencias en un espacio local-first.', 'Plan initiatives, actions, people, resources, costs, and evidence in a local-first workspace.',
  'Culmina es un espacio de ejecución para proyectos, eventos y objetivos complejos. Conecta fases, acciones, responsables, presupuesto, documentos, imágenes, enlaces y actividad hasta que el resultado queda completado y documentado.', 'Culmina is an execution workspace for complex projects, events, and goals. Connect stages, actions, owners, budgets, documents, images, links, and activity until the outcome is complete and documented.',
  'Los proyectos con muchas piezas se dispersan entre listas, chats, documentos y hojas de cálculo, haciendo difícil saber qué falta y qué ocurre después.', 'Projects with many moving parts become scattered across lists, chats, documents, and spreadsheets, making it hard to know what is missing and what happens next.',
  ARRAY['Centro de control: prioriza próximos pasos, bloqueos y fechas.', 'Contexto conectado: relaciona acciones, personas, recursos, costes y evidencias.', 'Registro completo: conserva decisiones, documentos y actividad hasta el cierre.'],
  ARRAY['Command center: prioritize next steps, blockers, and deadlines.', 'Connected context: relate actions, people, resources, costs, and evidence.', 'Complete record: preserve decisions, documents, and activity through completion.'],
  ARRAY['Iniciativas y fases', 'Acciones y dependencias', 'Finanzas y evidencias', 'Persistencia SwiftData y exportación JSON'],
  ARRAY['Initiatives and stages', 'Actions and dependencies', 'Finance and evidence', 'SwiftData persistence and JSON export'],
  'Profesionales independientes, familias, organizadores, creadores, equipos pequeños y personas que gestionan proyectos con contexto.', 'Independent professionals, families, organizers, creators, small teams, and people managing high-context projects.',
  'development', true, 'Productividad', ARRAY['iOS', 'iPadOS'], 'romerodev.app@gmail.com', 'com.romerodev.culmina', '1.0.0', '100202609063',
  'assets/images/culmina/culmina-icon.png', 'assets/images/culmina/culmina-hero.png', ARRAY[]::text[], 'Seguir el desarrollo', 'Follow development', '/es/casos/culmina/soporte/', 'Ver soporte', 'View support', '/es/casos/culmina/soporte/', '#0f5bff', '#ffc857',
  'Culmina: workspace para proyectos complejos | RomeroDev', 'Convierte proyectos, eventos y objetivos complejos en planes ejecutables con Culmina.',
  '[{"name":"Anual","name_en":"Annual","price":"Precio en App Store","cadence":"/año","cadence_en":"/year","description":"Precio pendiente de publicación.","description_en":"Pricing is pending publication.","isIndicative":true},{"name":"Vitalicio","name_en":"Lifetime","price":"Precio en App Store","cadence":"pago único","cadence_en":"one-time","description":"Compra única prevista.","description_en":"Planned one-time purchase.","isIndicative":true}]'::jsonb,
  ARRAY['Iniciativas y fases', 'Acciones y dependencias', 'Persistencia local', 'Exportación e importación'], ARRAY['Initiatives and stages', 'Actions and dependencies', 'Local persistence', 'Export and import'],
  ARRAY['Finanzas avanzadas', 'Colaboración futura', 'Automatizaciones'], ARRAY['Advanced finance', 'Future collaboration', 'Automations'], true, now()
)
on conflict (slug) do update set
  status = excluded.status, bundle_identifier = excluded.bundle_identifier,
  version = excluded.version, build_number = excluded.build_number,
  icon_url = excluded.icon_url, cover_image_url = excluded.cover_image_url,
  updated_at = now();

insert into public.apps (
  slug, name, tagline, tagline_en, short_description, short_description_en,
  long_description, long_description_en, problem, problem_en, benefits,
  benefits_en, features, features_en, audience, audience_en, status, featured,
  category, platform, support_email, bundle_identifier, version, build_number,
  screenshots, primary_cta_label, primary_cta_label_en, primary_cta_url,
  secondary_cta_label, secondary_cta_label_en, secondary_cta_url,
  color_primary, color_secondary, seo_title, seo_description, pricing,
  free_features, free_features_en, pro_features, pro_features_en,
  follow_enabled, updated_at
) values
(
  'vitalsbud', 'VitalsBud', 'Salud, rutinas y documentos veterinarios para tu hogar.', 'Pet health, routines, and veterinary records for your home.',
  'Una app pet-first para centralizar prevención, medicación, rutinas, historial veterinario y colaboración entre cuidadores.', 'A pet-first app for prevention, medication, routines, veterinary records, and caregiver coordination.',
  'VitalsBud está evolucionando desde una base SwiftUI hacia una experiencia completa de cuidado para mascotas: perfiles, prevención, citas, medicación, peso, síntomas, rutinas, documentos y exportes para veterinaria.', 'VitalsBud is evolving from a SwiftUI foundation into a complete pet-care experience: profiles, prevention, appointments, medication, weight, symptoms, routines, records, and veterinary exports.',
  'La información de una mascota vive repartida entre memoria, notas, fotos, PDFs, chats y calendarios, lo que dificulta cuidar y compartir contexto.', 'A pet''s information is scattered across memory, notes, photos, PDFs, chats, and calendars, making care and context sharing difficult.',
  ARRAY['Pet-first: salud preventiva, rutinas y documentos.', 'Contexto útil: prepara citas y decisiones con historial relacionado.', 'Privacidad local: base SwiftData y permisos contextuales.'],
  ARRAY['Pet-first: preventive health, routines, and records.', 'Useful context: prepare appointments and decisions with related history.', 'Local privacy: SwiftData foundation and contextual permissions.'],
  ARRAY['Perfiles de mascotas y hogares', 'Vacunas, preventivos, medicación, síntomas, peso y citas', 'Rutinas diarias, documentos y exporte veterinario', 'Localización ES/EN y StoreKit'],
  ARRAY['Pet and household profiles', 'Vaccines, preventives, medication, symptoms, weight, and appointments', 'Daily routines, records, and veterinary export', 'EN/ES localization and StoreKit'],
  'Personas y hogares que quieren cuidar mejor de sus mascotas y llegar a la consulta veterinaria con el contexto preparado.', 'People and households who want to care better for their pets and arrive at veterinary visits with context prepared.',
  'development', true, 'Salud y mascotas', ARRAY['iOS', 'iPadOS'], 'romerodev.app@gmail.com', 'com.romerodev.vitalsbud', '1.0.0', '3',
  ARRAY[]::text[], 'Seguir el desarrollo', 'Follow development', '/es/casos/vitalsbud/soporte/', 'Ver soporte', 'View support', '/es/casos/vitalsbud/soporte/', '#d97706', '#14b8a6',
  'VitalsBud: cuidado de mascotas y salud preventiva | RomeroDev', 'VitalsBud centraliza salud, rutinas, documentos y prevención veterinaria para hogares con mascotas.',
  '[{"name":"Gratis","name_en":"Free","price":"En desarrollo","cadence":"","cadence_en":"","description":"El producto y sus límites comerciales siguen en definición.","description_en":"The product and commercial limits are still being defined.","isIndicative":true},{"name":"VitalsBud Plus","name_en":"VitalsBud Plus","price":"En desarrollo","cadence":"","cadence_en":"","description":"Suscripción prevista; aún no disponible.","description_en":"Planned subscription; not available yet.","isIndicative":true}]'::jsonb,
  ARRAY['Perfil de mascota', 'Registros de salud', 'Rutinas y calendario'], ARRAY['Pet profile', 'Health records', 'Routines and calendar'],
  ARRAY['Analítica avanzada', 'Exportes veterinarios', 'Funciones Plus previstas'], ARRAY['Advanced analytics', 'Veterinary exports', 'Planned Plus features'], true, now()
)
on conflict (slug) do update set
  status = excluded.status, bundle_identifier = excluded.bundle_identifier,
  version = excluded.version, build_number = excluded.build_number,
  updated_at = now();

-- Register local media declared by each product row. Screenshot keys remain in
-- `apps.screenshots` because the resolver maps them to localized source files.
insert into public.app_media (app_id, kind, path, alt, alt_en, source, sort_order)
select id, 'icon', icon_url, 'Icono de ' || name, name || ' app icon', 'apps.icon_url', 0
from public.apps where icon_url is not null
on conflict do nothing;

insert into public.app_media (app_id, kind, path, alt, alt_en, source, sort_order)
select id, 'cover', cover_image_url, 'Vista de ' || name, name || ' product view', 'apps.cover_image_url', 1
from public.apps where cover_image_url is not null
on conflict do nothing;

insert into public.app_media (app_id, kind, path, alt, alt_en, source, sort_order)
select id, 'video', video_url, 'Vídeo de ' || name, name || ' preview video', 'apps.video_url', 2
from public.apps where video_url is not null
on conflict do nothing;

insert into public.app_links (app_id, kind, label, label_en, url, is_primary, is_external)
select id, 'appstore', 'Abrir en el App Store', 'Open in the App Store', app_store_url, true, true
from public.apps where app_store_url is not null
on conflict do nothing;

-- Evidence-based inventory audit for every iOS source directory.
insert into public.app_catalog_audits (app_id, source_path, score, missing_fields)
select apps.id, inventory.source_path, inventory.score, inventory.missing_fields
from (values
  ('vitalspath', '/Volumes/SSD Externo/DESARROLLO/iOS/VitalsPath', 100, ARRAY[]::text[]),
  ('reps', '/Volumes/SSD Externo/DESARROLLO/iOS/StreakReps', 100, ARRAY[]::text[]),
  ('shield', '/Volumes/SSD Externo/DESARROLLO/iOS/MaskID', 100, ARRAY[]::text[]),
  ('upledger', '/Volumes/SSD Externo/DESARROLLO/iOS/UpLedger', 82, ARRAY['public_download', 'video']::text[]),
  ('renuvia', '/Volumes/SSD Externo/DESARROLLO/iOS/Renuvia', 84, ARRAY['public_download', 'video']::text[]),
  ('kinsera', '/Volumes/SSD Externo/DESARROLLO/iOS/Kinsera', 88, ARRAY['public_download', 'physical_device_qa']::text[]),
  ('schoolsnap', '/Volumes/SSD Externo/DESARROLLO/iOS/SchoolSnap', 96, ARRAY['video']::text[]),
  ('snapinbox', '/Volumes/SSD Externo/DESARROLLO/iOS/SnapInbox', 62, ARRAY['screenshots', 'video', 'final_brand', 'physical_device_qa']::text[]),
  ('culmina', '/Volumes/SSD Externo/DESARROLLO/iOS/FollowUpPro', 72, ARRAY['screenshots', 'public_download', 'final_store_metadata', 'physical_device_qa']::text[]),
  ('vitalsbud', '/Volumes/SSD Externo/DESARROLLO/iOS/VitalsBud', 48, ARRAY['original_icon', 'screenshots', 'video', 'public_download', 'final_store_metadata', 'physical_device_qa']::text[])
) as inventory(slug, source_path, score, missing_fields)
join public.apps on apps.slug = inventory.slug
on conflict (app_id) do update set
  source_path = excluded.source_path,
  score = excluded.score,
  missing_fields = excluded.missing_fields,
  verified_at = now();

-- Complete the public legal and FAQ surfaces for the two newly registered
-- products. Existing products keep the legal documents from their own seeds.
do $legal$
declare
  culmina_id uuid;
  vitalsbud_id uuid;
begin
  select id into culmina_id from public.apps where slug = 'culmina';
  select id into vitalsbud_id from public.apps where slug = 'vitalsbud';

  insert into public.app_faqs (app_id, question, question_en, answer, answer_en, sort_order) values
    (culmina_id, '¿Culmina está publicada?', 'Is Culmina published?', 'Todavía no. El núcleo local está implementado y validado, pero la ficha, las URLs legales, las capturas y el QA físico siguen pendientes antes de una publicación pública.', 'Not yet. The local core is implemented and validated, but the listing, legal URLs, screenshots, and physical QA remain before public release.', 0),
    (culmina_id, '¿Dónde se guardan los datos?', 'Where is data stored?', 'La versión actual usa persistencia local. La colaboración y sincronización remota son trabajo posterior y no deben darse por disponibles.', 'The current version uses local persistence. Remote collaboration and sync are future work and should not be assumed available.', 1),
    (vitalsbud_id, '¿VitalsBud está lista para descargar?', 'Is VitalsBud ready to download?', 'No. El repositorio aún está en fase de desarrollo y reforma; no hay una descarga pública que debamos presentar como disponible.', 'No. The repository is still in development and reform; there is no public download to present as available.', 0),
    (vitalsbud_id, '¿Es una app médica?', 'Is it a medical app?', 'No. VitalsBud es una herramienta de organización del cuidado de mascotas y no sustituye el criterio veterinario.', 'No. VitalsBud is a pet-care organization tool and does not replace veterinary judgment.', 1);

  insert into public.app_legal_pages (app_id, kind, title, title_en, body, body_en, updated_at) values
    (culmina_id, 'privacy', 'Política de privacidad de Culmina', 'Culmina Privacy Policy',
      'Esta política explica qué información trata Culmina para organizar proyectos. La información permanece local salvo que una función explícita de Apple o un proveedor configurado necesite sincronización o diagnóstico.\n## 1. Responsable y contacto\nResponsable: Lester Romero Bernardo (RomeroDev), Valencia, España. Contacto: romerodev.app@gmail.com.\n## 2. Datos y permisos\nCulmina trata iniciativas, acciones, personas, recursos, finanzas, archivos y preferencias que introduces para prestar sus funciones. Los permisos se solicitan de forma contextual.\n## 3. Conservación y derechos\nPuedes eliminar o exportar tus datos desde la aplicación. Puedes solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad escribiendo al contacto anterior.\n## 4. Cambios\nLos cambios materiales se publicarán con una nueva fecha.',
      'This policy explains what Culmina processes to organize projects. Information stays local unless an explicit Apple feature or configured provider needs sync or diagnostics.\n## 1. Controller and contact\nController: Lester Romero Bernardo (RomeroDev), Valencia, Spain. Contact: romerodev.app@gmail.com.\n## 2. Data and permissions\nCulmina processes initiatives, actions, people, resources, finances, files, and preferences you enter to provide its features. Permissions are requested contextually.\n## 3. Retention and rights\nYou can delete or export your data from the app. You may request access, rectification, deletion, restriction, objection, or portability using the contact above.\n## 4. Changes\nMaterial changes will be published with a new update date.', now()),
    (culmina_id, 'terms', 'Términos de uso de Culmina', 'Culmina Terms of Use',
      'Culmina es una herramienta de organización y ejecución de proyectos. No sustituye el criterio profesional ni garantiza que una fecha, coste o decisión sea correcta. Debes revisar la información antes de confiar en ella. Apple gestiona las compras y servicios de plataforma. Se aplica la legislación española sin perjuicio de los derechos imperativos del consumidor. Contacto: romerodev.app@gmail.com.',
      'Culmina is a project organization and execution tool. It does not replace professional judgment or guarantee that a date, cost, or decision is correct. Review information before relying on it. Apple handles purchases and platform services. Spanish law applies without limiting mandatory consumer rights. Contact: romerodev.app@gmail.com.', now()),
    (culmina_id, 'subscriptions', 'Condiciones de suscripción de Culmina', 'Culmina Subscription Terms',
      'Las funciones Premium previstas se ofrecerán mediante Apple In-App Purchase. Apple mostrará precio, impuestos, duración y condiciones antes de confirmar. Las renovaciones se gestionan desde Ajustes > tu nombre > Suscripciones; eliminar la app no cancela una suscripción. Los reembolsos se solicitan a Apple en reportaproblem.apple.com. Contacto: romerodev.app@gmail.com.',
      'Planned Premium features will be offered through Apple In-App Purchase. Apple will show price, taxes, duration, and terms before confirmation. Manage renewals in Settings > your name > Subscriptions; deleting the app does not cancel a subscription. Request refunds from Apple at reportaproblem.apple.com. Contact: romerodev.app@gmail.com.', now()),
    (vitalsbud_id, 'privacy', 'Política de privacidad de VitalsBud', 'VitalsBud Privacy Policy',
      'VitalsBud explica qué información trata para organizar el cuidado de mascotas. La base local usa SwiftData y los permisos se solicitan cuando una función los necesita. Responsable: Lester Romero Bernardo (RomeroDev), Valencia, España. Contacto: romerodev.app@gmail.com. Puedes solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad por ese contacto. Los cambios materiales se publicarán aquí.',
      'VitalsBud explains what it processes to organize pet care. Its local foundation uses SwiftData and permissions are requested when a feature needs them. Controller: Lester Romero Bernardo (RomeroDev), Valencia, Spain. Contact: romerodev.app@gmail.com. You may request access, rectification, deletion, restriction, objection, or portability using that contact. Material changes will be published here.', now()),
    (vitalsbud_id, 'terms', 'Términos de uso de VitalsBud', 'VitalsBud Terms of Use',
      'VitalsBud es una herramienta de organización del cuidado de mascotas y no sustituye el criterio veterinario. Debes revisar las fechas, recordatorios, registros y exportes antes de confiar en ellos. Apple gestiona las compras y servicios de plataforma. Se aplica la legislación española sin perjuicio de los derechos imperativos del consumidor. Contacto: romerodev.app@gmail.com.',
      'VitalsBud is a pet-care organization tool and does not replace veterinary judgment. Review dates, reminders, records, and exports before relying on them. Apple handles purchases and platform services. Spanish law applies without limiting mandatory consumer rights. Contact: romerodev.app@gmail.com.', now()),
    (vitalsbud_id, 'subscriptions', 'Condiciones de suscripción de VitalsBud', 'VitalsBud Subscription Terms',
      'VitalsBud Plus está previsto como suscripción, pero todavía no está disponible para compra pública. Cuando se active, Apple mostrará el precio y las condiciones finales antes de confirmar y gestionará renovaciones y reembolsos conforme a sus reglas. Contacto: romerodev.app@gmail.com.',
      'VitalsBud Plus is planned as a subscription but is not available for public purchase yet. When enabled, Apple will show final pricing and terms before confirmation and handle renewals and refunds under its rules. Contact: romerodev.app@gmail.com.', now())
  on conflict (app_id, kind) do update set
    title = excluded.title,
    title_en = excluded.title_en,
    body = excluded.body,
    body_en = excluded.body_en,
    updated_at = now();
end
$legal$;
