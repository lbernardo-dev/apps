-- Remove setup connectivity check row, if present.
delete from public.contact_messages
where email = 'check@example.com'
  and topic = 'setup'
  and message = 'Supabase setup connectivity check';

-- Tighten profiles policies and avoid repeated auth.uid() initplan.
drop policy if exists "profiles self read" on public.profiles;
drop policy if exists "profiles admin write" on public.profiles;

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

-- Public contact form insert remains anonymous, but validates shape instead of WITH CHECK true.
drop policy if exists "anyone can create contact messages" on public.contact_messages;
create policy "anyone can create valid contact messages" on public.contact_messages
  for insert to anon, authenticated
  with check (
    length(trim(name)) between 2 and 160
    and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    and length(trim(message)) between 10 and 5000
    and coalesce(status, 'new') = 'new'
  );;
