-- Seed testimonials for the landing page (CMS-driven).
-- NOTE: Deprecated by 20260817090000_unpublish_testimonial_placeholders.sql.
-- The home now sources real App Store reviews automatically (lib/content.ts),
-- so placeholder client quotes must not be published. This migration keeps
-- the table schema but inserts nothing until real testimonials exist.
insert into public.testimonials (quote, quote_en, name, role, role_en, is_published, sort_order)
values
  (
    'Lester tomó una idea difusa y la convirtió en un producto iOS con arquitectura, métricas y un plan de evolución claro. La comunicación fue directa y sin humo.',
    'Lester took a vague idea and turned it into an iOS product with clear architecture, metrics and an evolution plan. Communication was direct and no-nonsense.',
    'María G.',
    'Directora de producto',
    'Product director',
    false,
    10
  ),
  (
    'Automatizamos un flujo Salesforce que nos costaba un día de trabajo a la semana. Ahora es un proceso medible y documentado por el equipo.',
    'We automated a Salesforce flow that used to cost us a full day of work each week. It is now a measurable, team-documented process.',
    'Carlos R.',
    'Responsable de operaciones',
    'Operations lead',
    false,
    20
  ),
  (
    'Lo que más valoro es que no vendió una entrega, sino un sistema que el equipo entiende y puede seguir usando sin depender de nadie.',
    'What I value most is that he did not sell a delivery but a system the team understands and can keep using without depending on anyone.',
    'Ana P.',
    'Growth manager',
    'Growth manager',
    false,
    30
  )
on conflict (id) do update
set quote = excluded.quote,
    quote_en = excluded.quote_en,
    role = excluded.role,
    role_en = excluded.role_en,
    is_published = excluded.is_published,
    sort_order = excluded.sort_order;