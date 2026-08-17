-- User feedback (opinion / suggestion / issue / rating) per app.
-- Anonymous insert is allowed; rows are read and triaged by admins/editors.
-- Run in Supabase SQL editor.

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

alter table public.app_feedback enable row level security;

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

-- Indexes for triage queries.
create index if not exists app_feedback_app_slug_created_idx
  on public.app_feedback (app_slug, created_at desc);
create index if not exists app_feedback_kind_idx
  on public.app_feedback (kind, created_at desc);