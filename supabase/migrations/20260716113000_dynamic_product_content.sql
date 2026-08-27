alter table public.apps
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists seo_image text,
  add column if not exists pricing jsonb not null default '[]'::jsonb,
  add column if not exists free_features text[] not null default '{}',
  add column if not exists free_features_en text[] not null default '{}',
  add column if not exists pro_features text[] not null default '{}',
  add column if not exists pro_features_en text[] not null default '{}';

alter table public.app_legal_pages
  drop constraint if exists app_legal_pages_kind_check;

alter table public.app_legal_pages
  add constraint app_legal_pages_kind_check
  check (kind in ('privacy', 'terms', 'subscriptions', 'support', 'safety'));
