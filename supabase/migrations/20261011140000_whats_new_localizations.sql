-- What's New v2: build-aware, rich-text release notes with per-locale copies.
-- The App Store sync is the writer; the landing and native clients are readers.

alter table public.apps
  add column if not exists supported_locales text[] not null default '{es,en}';

alter table public.app_store_snapshots
  add column if not exists build_number text;

alter table public.app_changelog
  add column if not exists build_number text,
  add column if not exists release_notes_format text not null default 'markdown',
  add column if not exists source text not null default 'app_store',
  add column if not exists source_url text,
  add column if not exists detected_at timestamptz,
  add column if not exists translated_locales text[] not null default '{}',
  add column if not exists translation_status text not null default 'pending';

alter table public.app_changelog
  drop constraint if exists app_changelog_release_notes_format_check;
alter table public.app_changelog
  add constraint app_changelog_release_notes_format_check
  check (release_notes_format in ('plain', 'markdown'));

alter table public.app_changelog
  drop constraint if exists app_changelog_translation_status_check;
alter table public.app_changelog
  add constraint app_changelog_translation_status_check
  check (translation_status in ('pending', 'partial', 'complete', 'failed'));

create table if not exists public.app_changelog_localizations (
  id uuid primary key default gen_random_uuid(),
  changelog_id uuid not null references public.app_changelog(id) on delete cascade,
  app_slug text not null references public.apps(slug) on delete cascade,
  version text not null,
  locale text not null check (locale ~ '^[a-z]{2}(-[A-Z]{2})?$'),
  release_notes text not null default '',
  release_notes_format text not null default 'markdown',
  translated boolean not null default false,
  provider text,
  translated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (changelog_id, locale),
  unique (app_slug, version, locale),
  constraint app_changelog_localizations_format_check
    check (release_notes_format in ('plain', 'markdown'))
);

alter table public.app_changelog_localizations enable row level security;

drop policy if exists "public read app changelog localizations" on public.app_changelog_localizations;
create policy "public read app changelog localizations"
  on public.app_changelog_localizations
  for select to anon, authenticated using (true);

drop policy if exists "editors insert app changelog localizations" on public.app_changelog_localizations;
create policy "editors insert app changelog localizations"
  on public.app_changelog_localizations
  for insert to authenticated
  with check (public.can_edit_content());

drop policy if exists "editors update app changelog localizations" on public.app_changelog_localizations;
create policy "editors update app changelog localizations"
  on public.app_changelog_localizations
  for update to authenticated
  using (public.can_edit_content())
  with check (public.can_edit_content());

drop policy if exists "editors delete app changelog localizations" on public.app_changelog_localizations;
create policy "editors delete app changelog localizations"
  on public.app_changelog_localizations
  for delete to authenticated
  using (public.can_edit_content());

drop trigger if exists update_app_changelog_localizations_updated_at on public.app_changelog_localizations;
create trigger update_app_changelog_localizations_updated_at
  before update on public.app_changelog_localizations
  for each row execute function public.set_updated_at();

create index if not exists app_changelog_localizations_lookup_idx
  on public.app_changelog_localizations (app_slug, version desc, locale);

-- Preserve the existing two-language history when the richer table is introduced.
insert into public.app_changelog_localizations (
  changelog_id, app_slug, version, locale, release_notes,
  release_notes_format, translated, provider, translated_at
)
select id, app_slug, version, 'es', release_notes,
  release_notes_format, false, source, detected_at
from public.app_changelog
on conflict (app_slug, version, locale) do nothing;

insert into public.app_changelog_localizations (
  changelog_id, app_slug, version, locale, release_notes,
  release_notes_format, translated, provider, translated_at
)
select id, app_slug, version, 'en', release_notes_en,
  release_notes_format, true, 'legacy', detected_at
from public.app_changelog
where nullif(trim(release_notes_en), '') is not null
on conflict (app_slug, version, locale) do nothing;

update public.app_changelog c
set translated_locales = coalesce(
  (select array_agg(l.locale order by l.locale)
   from public.app_changelog_localizations l
   where l.changelog_id = c.id),
  '{}'
);

