create table if not exists public.landing_announcements (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  kind text not null default 'announcement' check (kind in ('announcement', 'ad')),
  placement text not null default 'rail' check (placement in ('hero', 'rail', 'footer')),
  accent text not null default 'blue' check (accent in ('blue', 'cyan', 'green', 'amber')),
  eyebrow text,
  eyebrow_en text,
  title text not null,
  title_en text,
  body text not null,
  body_en text,
  cta_label text,
  cta_label_en text,
  cta_url text,
  image_url text,
  is_enabled boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists landing_announcements_live_idx
  on public.landing_announcements (is_enabled, placement, sort_order, starts_at, ends_at);

alter table public.landing_announcements enable row level security;

drop policy if exists "public read live landing announcements" on public.landing_announcements;
create policy "public read live landing announcements"
  on public.landing_announcements for select
  using (
    is_enabled = true
    and (starts_at is null or starts_at <= now())
    and (ends_at is null or ends_at >= now())
  );

drop policy if exists "editors manage landing announcements" on public.landing_announcements;
create policy "editors manage landing announcements"
  on public.landing_announcements for all to authenticated
  using (public.can_edit_content())
  with check (public.can_edit_content());

create table if not exists public.landing_surveys (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  question text not null,
  question_en text,
  description text,
  description_en text,
  options jsonb not null default '[]'::jsonb,
  is_enabled boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint landing_surveys_options_check check (
    jsonb_typeof(options) = 'array'
    and jsonb_array_length(options) between 2 and 6
  )
);

create index if not exists landing_surveys_live_idx
  on public.landing_surveys (is_enabled, sort_order, starts_at, ends_at);

alter table public.landing_surveys enable row level security;

drop policy if exists "public read live landing surveys" on public.landing_surveys;
create policy "public read live landing surveys"
  on public.landing_surveys for select
  using (
    is_enabled = true
    and (starts_at is null or starts_at <= now())
    and (ends_at is null or ends_at >= now())
  );

drop policy if exists "editors manage landing surveys" on public.landing_surveys;
create policy "editors manage landing surveys"
  on public.landing_surveys for all to authenticated
  using (public.can_edit_content())
  with check (public.can_edit_content());

create table if not exists public.landing_survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.landing_surveys(id) on delete cascade,
  option_id text not null check (option_id ~ '^[a-z0-9][a-z0-9_-]{0,63}$'),
  session_id text not null check (char_length(session_id) between 16 and 128),
  locale text not null default 'es' check (locale ~ '^[a-z]{2}(-[A-Z]{2})?$'),
  created_at timestamptz not null default now(),
  unique (survey_id, session_id)
);

create index if not exists landing_survey_responses_survey_idx
  on public.landing_survey_responses (survey_id, option_id, created_at);

alter table public.landing_survey_responses enable row level security;

drop policy if exists "public submit landing survey response" on public.landing_survey_responses;
create policy "public submit landing survey response"
  on public.landing_survey_responses for insert to anon, authenticated
  with check (
    exists (
      select 1
      from public.landing_surveys s
      where s.id = survey_id
        and s.is_enabled = true
        and (s.starts_at is null or s.starts_at <= now())
        and (s.ends_at is null or s.ends_at >= now())
        and s.options @> jsonb_build_array(jsonb_build_object('id', option_id))
    )
  );

drop policy if exists "editors read landing survey responses" on public.landing_survey_responses;
create policy "editors read landing survey responses"
  on public.landing_survey_responses for select to authenticated
  using (public.can_edit_content());

create or replace function public.get_landing_survey_results(p_slug text)
returns table(option_id text, votes bigint)
language sql
stable
security definer
set search_path = public
as $$
  select r.option_id, count(*)::bigint as votes
  from public.landing_survey_responses r
  join public.landing_surveys s on s.id = r.survey_id
  where s.slug = p_slug
    and s.is_enabled = true
    and (s.starts_at is null or s.starts_at <= now())
    and (s.ends_at is null or s.ends_at >= now())
  group by r.option_id;
$$;

revoke all on function public.get_landing_survey_results(text) from public;
grant execute on function public.get_landing_survey_results(text) to anon, authenticated;
