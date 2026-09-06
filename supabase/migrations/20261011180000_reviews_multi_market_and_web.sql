-- Review system: exhaustive App Store imports plus moderated web reviews.

alter table public.app_reviews
  add column if not exists external_id text,
  add column if not exists market text not null default 'es',
  add column if not exists source_url text;

alter table public.app_reviews
  drop constraint if exists app_reviews_locale_check;
alter table public.app_reviews
  add constraint app_reviews_locale_check
  check (locale is null or locale ~ '^[a-z]{2}(-[A-Z]{2})?$');

alter table public.app_reviews
  drop constraint if exists app_reviews_source_check;
alter table public.app_reviews
  add constraint app_reviews_source_check
  check (source in ('app_store', 'web', 'manual'));

alter table public.app_reviews
  add constraint app_reviews_external_identity_key unique (app_slug, source, external_id);

create index if not exists app_reviews_market_idx
  on public.app_reviews (app_slug, market, review_date desc);

create table if not exists public.app_review_submissions (
  id uuid primary key default gen_random_uuid(),
  app_slug text not null references public.apps(slug) on delete cascade,
  display_name text not null,
  email text,
  rating integer not null check (rating between 1 and 5),
  title text not null default '',
  content text not null,
  locale text not null default 'es' check (locale ~ '^[a-z]{2}(-[A-Z]{2})?$'),
  consent boolean not null default false,
  source text not null default 'web' check (source = 'web'),
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  moderation_note text,
  moderated_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.app_review_submissions enable row level security;

drop policy if exists "anyone can submit app review" on public.app_review_submissions;
create policy "anyone can submit app review"
  on public.app_review_submissions
  for insert to anon, authenticated
  with check (
    status = 'pending'
    and source = 'web'
    and consent = true
    and length(trim(display_name)) between 1 and 80
    and length(trim(title)) between 0 and 120
    and length(trim(content)) between 10 and 2000
    and (coalesce(email, '') = '' or email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
  );

drop policy if exists "staff read app review submissions" on public.app_review_submissions;
create policy "staff read app review submissions"
  on public.app_review_submissions
  for select to authenticated
  using (public.can_edit_content());

drop policy if exists "staff update app review submissions" on public.app_review_submissions;
create policy "staff update app review submissions"
  on public.app_review_submissions
  for update to authenticated
  using (public.can_edit_content())
  with check (public.can_edit_content());

drop policy if exists "staff delete app review submissions" on public.app_review_submissions;
create policy "staff delete app review submissions"
  on public.app_review_submissions
  for delete to authenticated
  using (public.can_edit_content());

create index if not exists app_review_submissions_status_idx
  on public.app_review_submissions (status, created_at desc);
create index if not exists app_review_submissions_app_idx
  on public.app_review_submissions (app_slug, created_at desc);
