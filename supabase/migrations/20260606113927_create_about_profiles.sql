create table if not exists public.about_profiles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  full_name text not null,
  headline text not null,
  location text not null,
  current_company text not null,
  education text not null,
  linkedin_url text not null,
  image_url text,
  summary text not null,
  source_note text not null,
  metrics jsonb not null default '[]'::jsonb,
  specialties text[] not null default '{}',
  experience jsonb not null default '[]'::jsonb,
  certifications jsonb not null default '[]'::jsonb,
  courses jsonb not null default '[]'::jsonb,
  languages jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.about_profiles enable row level security;

create policy "public read about profiles" on public.about_profiles
  for select using (true);
create policy "editors insert about profiles" on public.about_profiles
  for insert to authenticated with check (public.can_edit_content());
create policy "editors update about profiles" on public.about_profiles
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete about profiles" on public.about_profiles
  for delete to authenticated using (public.can_edit_content());
create policy "editors read about profiles" on public.about_profiles
  for select to authenticated using (public.can_edit_content());;
