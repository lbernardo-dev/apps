-- Keep the optional email rule grouped with all required feedback checks.
-- Without parentheses, PostgreSQL's AND/OR precedence lets a valid email
-- bypass the message length and rating checks.
drop policy if exists "anyone can create valid feedback" on public.app_feedback;
create policy "anyone can create valid feedback" on public.app_feedback
  for insert to anon, authenticated
  with check (
    app_slug is not null
    and length(trim(message)) between 10 and 1200
    and rating between 1 and 5
    and (coalesce(email, '') = '' or email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
  );
