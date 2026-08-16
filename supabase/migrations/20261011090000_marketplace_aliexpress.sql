-- Marketplace AliExpress: tabla de settings y productos (fuente de verdad en Supabase).
-- Los productos se añaden manualmente desde el panel de administración o se sincronizan
-- desde la API de AliExpress mediante scripts que leen credenciales de variables de entorno.

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

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'marketplace_settings' and policyname = 'admins read marketplace settings'
  ) then
    create policy "admins read marketplace settings" on public.marketplace_settings
      for select using (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'marketplace_settings' and policyname = 'admins insert marketplace settings'
  ) then
    create policy "admins insert marketplace settings" on public.marketplace_settings
      for insert to authenticated with check (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'marketplace_settings' and policyname = 'admins update marketplace settings'
  ) then
    create policy "admins update marketplace settings" on public.marketplace_settings
      for update to authenticated using (public.is_admin()) with check (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'marketplace_products' and policyname = 'public read active marketplace products'
  ) then
    create policy "public read active marketplace products" on public.marketplace_products
      for select using (status = 'active');
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'marketplace_products' and policyname = 'editors read marketplace products'
  ) then
    create policy "editors read marketplace products" on public.marketplace_products
      for select to authenticated using (public.can_edit_content());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'marketplace_products' and policyname = 'editors insert marketplace products'
  ) then
    create policy "editors insert marketplace products" on public.marketplace_products
      for insert to authenticated with check (public.can_edit_content());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'marketplace_products' and policyname = 'editors update marketplace products'
  ) then
    create policy "editors update marketplace products" on public.marketplace_products
      for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'marketplace_products' and policyname = 'editors delete marketplace products'
  ) then
    create policy "editors delete marketplace products" on public.marketplace_products
      for delete to authenticated using (public.can_edit_content());
  end if;
end $$;