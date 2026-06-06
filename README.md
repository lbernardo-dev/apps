# LB Apps

Web estatica tipo landing + portfolio para exponer apps, convertir visitas en clientes y mantener paginas publicas de soporte, privacidad y terminos por app.

## Stack

- Next.js con `output: "export"` para GitHub Pages.
- TypeScript y Tailwind CSS.
- Supabase para Auth, Postgres, Storage y Row Level Security.
- GitHub Actions con `actions/upload-pages-artifact` y `actions/deploy-pages`.

## Instalacion local

```bash
npm install
npm run dev
```

Build estatico:

```bash
npm run typecheck
npm run build
```

El resultado exportado queda en `out/`.

## Variables de entorno

Copia `.env.example` a `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://lbernardo-dev.github.io/apps
NEXT_PUBLIC_BASE_PATH=/apps
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPPORT_EMAIL=hola@example.com
```

Usa `NEXT_PUBLIC_BASE_PATH=/apps` si publicas como GitHub Pages de proyecto en `https://lbernardo-dev.github.io/apps`. Si usas dominio custom en la raiz, deja `NEXT_PUBLIC_BASE_PATH` vacio.

## Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta `supabase/schema.sql` en el SQL editor.
3. Crea usuarios en Supabase Auth.
4. El primer usuario Auth genera automaticamente un perfil `admin`; los siguientes usuarios se crean como `editor`.
5. Un admin puede cambiar roles en `profiles` si necesita promover o degradar usuarios.
6. Configura las variables publicas `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

No uses la service role key en el frontend. La escritura administrativa se protege con Auth + RLS.

## GitHub Pages

En GitHub:

1. Ve a `Settings > Pages`.
2. En `Build and deployment`, selecciona `GitHub Actions`.
3. Define variables del repositorio si hacen falta:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_BASE_PATH`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SUPPORT_EMAIL`
4. Haz push a `main` o lanza manualmente el workflow `Deploy GitHub Pages`.

El workflow esta en `.github/workflows/deploy-pages.yml`.

## Contenido

El contenido seed esta en `lib/content.ts`. Sirve para generar rutas estaticas iniciales:

- `/apps/[slug]`
- `/apps/[slug]/privacy`
- `/apps/[slug]/terms`
- `/apps/[slug]/support`
- `/apps/[slug]/faq`

El panel `/admin` permite guardar apps en Supabase. En hosting estatico, las rutas nuevas necesitan un nuevo build/deploy para existir como paginas HTML permanentes.

## Paginas incluidas

- `/`
- `/apps`
- `/apps/[slug]`
- `/apps/[slug]/privacy`
- `/apps/[slug]/terms`
- `/apps/[slug]/support`
- `/apps/[slug]/faq`
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/cookies`
- `/admin`
- `404.html`

## SEO

La base incluye metadatos por pagina, Open Graph, Twitter Cards, `sitemap.xml`, `robots.txt` y JSON-LD para Organization, WebSite, SoftwareApplication y FAQ.

## Dominio custom

Si usas dominio custom:

1. Configura el dominio en `Settings > Pages`.
2. Cambia `NEXT_PUBLIC_SITE_URL` al dominio.
3. Deja `NEXT_PUBLIC_BASE_PATH` vacio.
4. Añade un archivo `public/CNAME` con el dominio si quieres que quede versionado.
