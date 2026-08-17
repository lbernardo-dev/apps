-- Supabase schema for LB Apps.
-- Run in Supabase SQL editor, then create Auth users and assign roles in profiles.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.apps (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  tagline text not null,
  tagline_en text,
  short_description text not null,
  short_description_en text,
  long_description text not null,
  long_description_en text,
  problem text,
  problem_en text,
  benefits text[] not null default '{}',
  benefits_en text[] not null default '{}',
  features text[] not null default '{}',
  features_en text[] not null default '{}',
  audience text,
  audience_en text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived', 'coming_soon')),
  featured boolean not null default false,
  category text not null,
  platform text[] not null default '{"iOS"}',
  app_store_url text,
  website_url text,
  support_email text not null,
  privacy_page_slug text,
  terms_page_slug text,
  icon_url text,
  cover_image_url text,
  screenshots text[] not null default '{}',
  video_url text,
  primary_cta_label text not null default 'Ver detalle',
  primary_cta_label_en text,
  primary_cta_url text not null,
  secondary_cta_label text,
  secondary_cta_label_en text,
  secondary_cta_url text,
  color_primary text,
  color_secondary text,
  seo_title text,
  seo_description text,
  seo_image text,
  pricing jsonb not null default '[]'::jsonb,
  free_features text[] not null default '{}',
  free_features_en text[] not null default '{}',
  pro_features text[] not null default '{}',
  pro_features_en text[] not null default '{}',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_sections (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  title text not null,
  title_en text,
  body text not null,
  body_en text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_faqs (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  question text not null,
  question_en text,
  answer text not null,
  answer_en text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_legal_pages (
  id uuid primary key default gen_random_uuid(),
  app_id uuid not null references public.apps(id) on delete cascade,
  kind text not null check (kind in ('privacy', 'terms', 'subscriptions', 'support')),
  title text not null,
  title_en text,
  body text not null,
  body_en text,
  updated_at timestamptz not null default now(),
  unique (app_id, kind)
);

create table if not exists public.home_sections (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  title_en text,
  body text not null,
  body_en text,
  is_enabled boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text not null,
  kind text not null default 'general',
  updated_at timestamptz not null default now()
);

create table if not exists public.about_profiles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  full_name text not null,
  headline text not null,
  headline_en text,
  location text not null,
  current_company text not null,
  education text not null,
  education_en text,
  linkedin_url text not null,
  image_url text,
  summary text not null,
  summary_en text,
  source_note text not null,
  metrics jsonb not null default '[]'::jsonb,
  specialties text[] not null default '{}',
  experience jsonb not null default '[]'::jsonb,
  certifications jsonb not null default '[]'::jsonb,
  courses jsonb not null default '[]'::jsonb,
  languages jsonb not null default '[]'::jsonb,
  trailhead_url text,
  trailhead_stats jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  quote_en text,
  name text not null,
  role text,
  role_en text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.seo_metadata (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  title text not null,
  description text not null,
  og_image_url text,
  canonical_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  alt text,
  kind text,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.app_changelog (
  id uuid primary key default gen_random_uuid(),
  app_slug text not null references public.apps(slug) on delete cascade,
  version text not null,
  release_notes text not null default '',
  release_notes_en text not null default '',
  release_date date,
  is_current boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (app_slug, version)
);

create table if not exists public.app_feedback (
  id uuid primary key default gen_random_uuid(),
  app_slug text not null references public.apps(slug) on delete cascade,
  app_name text not null,
  kind text not null default 'opinion' check (kind in ('opinion', 'suggestion', 'bug', 'other')),
  rating integer check (rating between 1 and 5),
  email text,
  message text not null default '',
  locale text not null default 'es',
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.can_edit_content()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_role text;
begin
  select case
    when not exists (select 1 from public.profiles) then 'admin'
    else 'editor'
  end into selected_role;

  insert into public.profiles (id, email, role)
  values (new.id, new.email, selected_role)
  on conflict (id) do update
    set email = excluded.email,
        updated_at = now();

  return new;
end;
$$;

alter table public.profiles enable row level security;
alter table public.apps enable row level security;
alter table public.app_sections enable row level security;
alter table public.app_faqs enable row level security;
alter table public.app_legal_pages enable row level security;
alter table public.home_sections enable row level security;
alter table public.site_pages enable row level security;
alter table public.about_profiles enable row level security;
alter table public.testimonials enable row level security;
alter table public.seo_metadata enable row level security;
alter table public.assets enable row level security;
alter table public.contact_messages enable row level security;
alter table public.app_changelog enable row level security;
alter table public.app_feedback enable row level security;

revoke execute on function public.is_admin() from public, anon, authenticated;
revoke execute on function public.can_edit_content() from public, anon, authenticated;
revoke execute on function public.handle_new_auth_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_create_profile on auth.users;
create trigger on_auth_user_created_create_profile
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create policy "profiles read own or admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or public.is_admin());
create policy "profiles insert admin" on public.profiles
  for insert to authenticated
  with check (public.is_admin());
create policy "profiles update admin" on public.profiles
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());
create policy "profiles delete admin" on public.profiles
  for delete to authenticated
  using (public.is_admin());

create policy "published apps are public" on public.apps
  for select using (status in ('published', 'coming_soon'));
create policy "editors insert apps" on public.apps
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update apps" on public.apps
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete apps" on public.apps
  for delete to authenticated using (public.can_edit_content());
create policy "editors read apps" on public.apps
  for select to authenticated using (public.can_edit_content());

create policy "public read app sections" on public.app_sections
  for select using (exists (select 1 from public.apps where apps.id = app_sections.app_id and apps.status in ('published', 'coming_soon')));
create policy "editors insert app sections" on public.app_sections
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update app sections" on public.app_sections
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete app sections" on public.app_sections
  for delete to authenticated using (public.can_edit_content());
create policy "editors read app sections" on public.app_sections
  for select to authenticated using (public.can_edit_content());

create policy "public read app faqs" on public.app_faqs
  for select using (exists (select 1 from public.apps where apps.id = app_faqs.app_id and apps.status in ('published', 'coming_soon')));
create policy "editors insert app faqs" on public.app_faqs
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update app faqs" on public.app_faqs
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete app faqs" on public.app_faqs
  for delete to authenticated using (public.can_edit_content());
create policy "editors read app faqs" on public.app_faqs
  for select to authenticated using (public.can_edit_content());

create policy "public read app legal" on public.app_legal_pages
  for select using (exists (select 1 from public.apps where apps.id = app_legal_pages.app_id and apps.status in ('published', 'coming_soon')));
create policy "editors insert app legal" on public.app_legal_pages
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update app legal" on public.app_legal_pages
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete app legal" on public.app_legal_pages
  for delete to authenticated using (public.can_edit_content());
create policy "editors read app legal" on public.app_legal_pages
  for select to authenticated using (public.can_edit_content());

create policy "public read enabled home sections" on public.home_sections
  for select using (is_enabled = true);
create policy "editors insert home sections" on public.home_sections
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update home sections" on public.home_sections
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete home sections" on public.home_sections
  for delete to authenticated using (public.can_edit_content());
create policy "editors read home sections" on public.home_sections
  for select to authenticated using (public.can_edit_content());

create policy "public read site pages" on public.site_pages
  for select using (true);
create policy "editors insert site pages" on public.site_pages
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update site pages" on public.site_pages
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete site pages" on public.site_pages
  for delete to authenticated using (public.can_edit_content());
create policy "editors read site pages" on public.site_pages
  for select to authenticated using (public.can_edit_content());

create policy "public read about profiles" on public.about_profiles
  for select using (true);
create policy "editors insert about profiles" on public.about_profiles
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update about profiles" on public.about_profiles
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete about profiles" on public.about_profiles
  for delete to authenticated using (public.can_edit_content());

create policy "public read published testimonials" on public.testimonials
  for select using (is_published = true);
create policy "editors insert testimonials" on public.testimonials
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update testimonials" on public.testimonials
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete testimonials" on public.testimonials
  for delete to authenticated using (public.can_edit_content());
create policy "editors read testimonials" on public.testimonials
  for select to authenticated using (public.can_edit_content());

create policy "public read app changelog" on public.app_changelog
  for select to anon, authenticated using (true);
create policy "editors insert app changelog" on public.app_changelog
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update app changelog" on public.app_changelog
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete app changelog" on public.app_changelog
  for delete to authenticated using (public.can_edit_content());
drop trigger if exists update_app_changelog_updated_at on public.app_changelog;
create trigger update_app_changelog_updated_at
  before update on public.app_changelog
  for each row execute function public.set_updated_at();
create index if not exists app_changelog_app_slug_version_idx
  on public.app_changelog (app_slug, version desc);

create policy "anyone can create valid feedback" on public.app_feedback
  for insert to anon, authenticated
  with check (
    app_slug is not null
    and length(trim(message)) between 10 and 1200
    and rating between 1 and 5
    and coalesce(email, '') = '' or email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  );
create policy "staff read feedback" on public.app_feedback
  for select to authenticated using (public.can_edit_content());
create policy "staff delete feedback" on public.app_feedback
  for delete to authenticated using (public.can_edit_content());
create index if not exists app_feedback_app_slug_created_idx
  on public.app_feedback (app_slug, created_at desc);
create index if not exists app_feedback_kind_idx
  on public.app_feedback (kind, created_at desc);

create policy "public read seo metadata" on public.seo_metadata
  for select using (true);
create policy "editors insert seo metadata" on public.seo_metadata
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update seo metadata" on public.seo_metadata
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete seo metadata" on public.seo_metadata
  for delete to authenticated using (public.can_edit_content());
create policy "editors read seo metadata" on public.seo_metadata
  for select to authenticated using (public.can_edit_content());

create policy "public read assets metadata" on public.assets
  for select using (true);
create policy "editors insert assets metadata" on public.assets
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update assets metadata" on public.assets
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete assets metadata" on public.assets
  for delete to authenticated using (public.can_edit_content());
create policy "editors read assets metadata" on public.assets
  for select to authenticated using (public.can_edit_content());

create policy "anyone can create valid contact messages" on public.contact_messages
  for insert to anon, authenticated
  with check (
    length(trim(name)) between 2 and 160
    and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    and length(trim(message)) between 10 and 5000
    and coalesce(status, 'new') = 'new'
  );
create policy "admins read contact messages" on public.contact_messages
  for select using (public.is_admin());
create policy "admins update contact messages" on public.contact_messages
  for update using (public.is_admin()) with check (public.is_admin());

create index if not exists app_sections_app_id_idx on public.app_sections(app_id);
create index if not exists app_faqs_app_id_idx on public.app_faqs(app_id);
create index if not exists app_legal_pages_app_id_idx on public.app_legal_pages(app_id);

-- ─── Marketplace AliExpress (afiliados) ──────────────────────────

create table if not exists public.marketplace_settings (
  id uuid primary key default gen_random_uuid(),
  app_key text not null default '',
  app_secret text not null default '',
  tracking_id text not null default '',
  currency text not null default 'EUR',
  language text not null default 'ES',
  ship_to_country text not null default 'ES',
  max_products integer not null default 200,
  is_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.marketplace_settings (id)
values ('00000000-0000-0000-0000-000000000001')
on conflict (id) do nothing;

create table if not exists public.marketplace_products (
  id uuid primary key default gen_random_uuid(),
  product_id text unique,
  source text not null default 'manual' check (source in ('manual', 'api', 'extension')),
  title text not null,
  title_en text,
  category text not null default 'Otros',
  description text,
  description_en text,
  original_price numeric,
  sale_price numeric,
  currency text not null default 'EUR',
  discount integer not null default 0,
  commission_rate numeric,
  evaluate_rate numeric,
  volume integer,
  image_url text,
  product_url text not null,
  promotion_link text,
  status text not null default 'active' check (status in ('active', 'hidden')),
  featured boolean not null default false,
  sort_order integer not null default 0,
  synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists marketplace_products_status_idx on public.marketplace_products(status);
create index if not exists marketplace_products_category_idx on public.marketplace_products(category);
create index if not exists marketplace_products_featured_idx on public.marketplace_products(featured);

alter table public.marketplace_settings enable row level security;
alter table public.marketplace_products enable row level security;

-- Settings solo visibles/escritura para admins (contienen secretos)
create policy "admins read marketplace settings" on public.marketplace_settings
  for select using (public.is_admin());
create policy "admins insert marketplace settings" on public.marketplace_settings
  for insert to authenticated with check (public.is_admin());
create policy "admins update marketplace settings" on public.marketplace_settings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Productos: lectura pública solo para activos; editores gestionan todo
create policy "public read active marketplace products" on public.marketplace_products
  for select using (status = 'active');
create policy "editors read marketplace products" on public.marketplace_products
  for select to authenticated using (public.can_edit_content());
create policy "editors insert marketplace products" on public.marketplace_products
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update marketplace products" on public.marketplace_products
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete marketplace products" on public.marketplace_products
  for delete to authenticated using (public.can_edit_content());
