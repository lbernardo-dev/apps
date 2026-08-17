-- App changelog: per-version "What's new" notes, readable anonymously so both
-- the website and the iOS apps can consume the same timeline via Supabase REST.
-- Run in Supabase SQL editor.

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

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

alter table public.app_changelog enable row level security;

-- Anyone (website + native apps) can read the timeline.
create policy "public read app changelog" on public.app_changelog
  for select to anon, authenticated using (true);

-- Editors manage the timeline (the sync script uses the service role directly).
create policy "editors insert app changelog" on public.app_changelog
  for insert to authenticated with check (public.can_edit_content());

create policy "editors update app changelog" on public.app_changelog
  for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

create policy "editors delete app changelog" on public.app_changelog
  for delete to authenticated using (public.can_edit_content());

-- Keep updated_at fresh.
drop trigger if exists update_app_changelog_updated_at on public.app_changelog;
create trigger update_app_changelog_updated_at
  before update on public.app_changelog
  for each row execute function public.set_updated_at();

-- Convenient index for REST queries ordered by version.
create index if not exists app_changelog_app_slug_version_idx
  on public.app_changelog (app_slug, version desc);
