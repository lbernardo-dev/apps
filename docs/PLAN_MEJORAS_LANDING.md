# Plan de mejoras integrales — Landing RomeroDev

> Análisis y plan accionable (estructura, diseño, contenido y dinamismo) de la landing en
> `app/[locale]/` (LandingPageClient) y su catálogo de productos.
> Generado el 2026-08-09.

---

## 1. Diagnóstico actual

### 1.1 Stack y arquitectura

- Next.js `output: "export"` + TypeScript + Tailwind, desplegado en GitHub Pages bajo `/apps`.
- **Dos jerarquías de rutas en paralelo**:
  - `app/(root)/` → rutas legado (`/`, `/apps/[slug]`, etc.) que solo redirigen (páginas `RedirectPage` / meta refresh).
  - `app/[locale]/` → rutas reales (`/es`, `/en`): `(studio)` para landing/servicios/páginas estáticas y `(app)` + `case-studies`/`casos` para el detalle de producto y sus subpáginas.
- Los datos de producto viven en `lib/content.ts` (seed estático), se fusionan con **Supabase** (`apps`, `app_faqs`, `app_legal_pages`, `home_sections`, `testimonials`, `about_profiles`) y se enriquecen con **snapshot de App Store** (`lib/generated/appstore-data.json` + `scripts/sync-appstore.mjs`).
- La landing (home) se construye en `components/LandingPageClient.tsx`.

### 1.2 Hallazgos clave

1. **La sección de productos de la landing no es dinámica.** Muestra exactamente 3 tarjetas
   (`ProductFeature` hardcodea `vitalspath`, `reps`, `shield`) y el `ProductOrbit` del hero
   hardcodea los mismos 3 slugs, sus imágenes y sus traducciones. **UpLedger (4º producto, `featured: true`)
   NO aparece** en la home, aunque sí en el catálogo `/es/productos/`.
2. **Métrica y textos obsoletos.** La cinta de métricas del hero tiene valores hardcodeados:
   `"3 productos propios"` (ahora hay 4), `"34 idiomas"`, `"9x certificaciones"`, `"10+ años"`. No se
   calculan de los datos reales.
3. **El CMS de la home no se usa.** `LandingPageClient` recibe `initialSections` y `initialTestimonials`,
   pero **los ignora**: hero, bio, servicios, proceso, principios, FAQ y CTA están hardcodeados en el
   componente y en `lib/i18n.ts`. Existen `fallbackHomeSections` (`.ts`) y tablas en Supabase listas.
4. **Duplicación de diccionarios.** El texto está duplicado en 3 sitios: el objeto `copy` en
   `LandingPageClient`, el diccionario `lib/i18n.ts` (cientos de claves, todas `as const`) y los
   `fallbackHomeSections`. Mantenerlo es costoso e inconsistente.
5. **Resolución de screenshots hardcodeada por slug.** `AppDetailClient.getScreenshotPath`,
   `AppCard` cover, `AppIcon`, `ProductOrbit` y `ProductFeature` resuelven rutas con `if (slug === ...)` /
   `switch (slug)`. Un producto nuevo nunca aparece bien si no se edita el código.
6. **Assets pesados sin optimizar.** Capturas en `vitalspath/` son PNG de 1–6 MB; la carpeta supera 36 MB.
7. **Labels/i18n de capturas con "ruido".** Quedan claves de screenshots viejas de StreakReps
   (`screenshot.reps.01-train-smarter`, etc.) que las unidades actuales no referencian.
8. **Calidad de datos de App Store.** El review sincronizado contiene un doble espacio/tipográfico
   (`"App práctica y y fácil"`) tras el respaldado de review.

### 1.3 Cambios de producto detectados (para actualizar)

| Producto | Estado actual | Cambios detectados |
|---|---|---|
| VitalsPath | publicado | Nombre comercial pasa a **"Control Medicación"** (antes "Salud Familiar"), versión **2.1.5**, mínimo iOS **18.0**, peso **200 MB** (antes 412 MB), nuevas release notes (Control Center, tarjeta de emergencia, copias cifradas, accesibilidad). Ya sincronizado en snapshot. |
| StreakReps | coming_soon | Nuevo set de pantallas `01-today-readiness…09-workout-detail-muscles`; labels nuevos + community/sociales en políticas. |
| Shield | coming_soon | Reposicionado a "protección de identidad" (ya en contenido). |
| **UpLedger** | coming_soon | **Nuevo producto**, pricing/free-pro/legal completos. No aparece en la home. |

---

## 2. Objetivo

Convertir la home en una landing **100% gobernada por datos** (productos + CMS) con buena
estructura SEO, diseño consistente y contenido actualizado. Sin reescribir el stack:
reusar la infraestructura que ya existe (Supabase, snapshot App Store, i18n, rutas).

---

## 3. Plan por fases

### Fase 0 — Productos al día (bloqueante, bajo riesgo)

**Objetivo:** que la home refleje exactamente el catálogo real.

- [ ] **3.1 Mostrar 4 productos en la home.**
  - Reemplazar `ProductFeature`/`ProductOrbit` (hardcode 3) por un `FeaturedProductsGrid` que itere
    `initialFeaturedApps` (ya llega de `getFeaturedApps()`) ordenados por `featured` + `updatedAt`.
    - Mantener el "cascade" visual (3 iPhones) pero generar dinámicamente con los 3 primeros
      `featuredApps`, usando los primeros `screen1`+ de `app.screenshots`.
    - Tarjetas: generar todas (`lg:grid-cols-3`) con el nuevo UpLedger incluido; si > 3, mostrar un
      `Card " +26"` en la home que enlace a `/productos`.
  - **Métrica** del hero: cambiar a conteo dinámico `publishedApps.length` (es 4), con fallback.
- [ ] **3.2 Métricas dinámicas.**
  - Cálculo: nº productos (`publishedApps.length`), nº idiomas de VitalsPath (`appStore.languages.length`),
    nº de años (de `aboutProfile` o configuración), certificaciones (config).
  - Lee los valores de las `home_sections` de Supabase cuando existan (claves tipo `metric.*`), con los
    cálculos usados de fallback.
- [ ] **3.3 Resolver rutas de imagen por datos, no por slug.**
  - Centralizar resolución en `lib/product-media.ts`: `getScreenshots(app, locale)` y `getCover(app, locale)`
    usando `app.screenshots` + convención de path + localidad (sufijo `_es`/`_en`, carpetas `es-ES`/`en-US`).
    `AppDetailClient`, `AppCard`, `LandingPageClient`, `AppIcon` y `Orbit/cascade` lo usan.
  - Para el futuro: permitir que `content.ts`/Supabase opcionalmente definan `assetPattern` y la resolución
    queda completamente fanless.
- [ ] **3.4 Limpieza de datos.**
  - Eliminar keys de i18n de screenshots obsoletas (`screenshot.reps.*` que ya no se usan).
  - Asegurar `filter` del review del App Store (doble espacio) al renderizar reviews.
  - Verificar `screenshots` de cada app referencien assets existentes (script de check rápida).

### Fase 1 — Contenido 100% dinámico (CMS real)

- [ ] **3.5. Usar `initialSections` y `initialTestimonials` en la home.**
  - `LandingPageClient` consume `home_sections` desde Supabase (ya existe `getHomeSections`) para:
    hero (HTML, eyebrow, title, subtitle, CTAs label/url, proof), bio, servicios, proceso, principios,
    testimonios, FAQ, CTA. Quitar el objeto `copy` hardcodeado.
  - Los `fallbackSections` de `lib/home-content.ts` pasan a ser el único fallback offline.
- [ ] **3.2. Probar `lib/i18n.ts` desde JSON.**
  - Extraer los diccionarios `es`/`en` a `lib/i18n/messages/{es,en}.json` y usar `getTranslator`
    igual que hoy. Reduce el duplicado y permite editar copy sin tocar TypeScript.
- [ ] **3.3. Testimonials.**
  - Dejar la sección `testimonials` dinámica (CMS + App Store reviews de VitalsPath como social proof).
- [ ] **3.4. FAQ dinámica.**
  - Sección FAQ de la home gobernada por `home_sections` (`faq.q1..qN`), para que la admin pueda
    cambiar preguntas sin deploy.

### Fase 2 — Estructura y SEO

- [ ] **2.1 Consolidar navegación/estructura de home** (con opción de reordenar por CMS):
  Hero → Métricas → Productos (grid dinámico) → Résultados/Prueba → Services → proceso →
  principios → About → Testimonials → FAQ → CTA/Contacto.
  - Hero con distintas CTAs para (a) desarrollar app, (b) Salesforce, (c) audit — apoyar el CA.
- [ ] **2.2. Cartas de producto con "estado" claro.** Badges `Publicada` / `Beta` / `Próximamente`,
  CTA específico por status (App Store / Beta / Notify me con email). Desde `app.status` + `primaryCtaUrl`.
- [ ] **2.3. SEO técnico.**
  - Asegurar `hreflang` reciprocidad (ES/EN) — iniciar de nuevo en `lib/seo.ts` y `sitemap`.
  - JSON-LD `ItemList` para el grid de productos en home; `Person`/`Organization` para About.
  - Metadata por `seo.title/description` ya se genera; revisar las páginas de caso.
- [ ] **2.4 Content bundles para "futuro".** Colocar guías medios (versión, badge) en `docs/` o

### Fase 3 — Diseño y UX

- [ ] **3.1 Uso de `--app-*` color tokens en la home** para que cada card de producto use su
  `colorPrimary/colorSecondary` (igual que en `[slug]/layout.tsx`).
- [ ] **3.2 Accesibilidad**
  - `aria-label` de controles de carrusel de productos y del FAQ (algunos `aria` solo en EE, ej.
    "Anterior/Siguiente" están duros).
  - Asegurar `<h1>` único por página (la home ya: hero). Revisar el navbar no use `h1`.
  - Tamaños de fuente para Dynamic Type / tap targets de 44px.
- [ ] **3.3 Rendimiento de assets**
  - Servir WebP/AVIF de screenshots (convertir PNG 1–6 MB), usar `next/image` con `sizes` y
    `priority` para las capturas del hero; `lazy` para el resto.
  - Añadir LCP optimización del hero (preload de la imagen central).
- [ ] **3.4 Microinteracciones**
  - Scroll-reveal ya presente via `ScrollRevealProvider`; extender a tokens de producto con transition.

### Fase 4 — Calidad y despliegue

- [ ] **4.1 Build & checks**: regresión con `npm run typecheck`, `npm run lint`, `npm run build`,
  Playwright (`tests/`). Corregir advertencias CWV.
- [ ] **4.2 Redirections legadas**: verificar mapa de redirects (`/apps/… → /es/casos/…`).
- [ ] **4.3 Admin/cms**: documentar cómo editar `home_sections` y apps en Supabase para mantener
  la data sin deploy.

---

## 4. Priorización sugerida

| Prioridad | Fase | Justificación |
|---|---|---|
| **Alta** | F0 — Productos al día | Bloquea la landing vs catálogo (UpLedger ausente, métricas 3). Bajo riesgo. |
| Alta | F1 — CMS dinámico | Elimina la mayor deuda de mantenimiento (3 copias de texto). |
| Media | F2 — Estructura/SEO | Mejor conversión e indexación. |
| Media | F3 — Diseño/UX/rendimiento | Impacto visual y Core Web Vitals. |
| Baja (continua) | F4 — calidad/build/cms | Cementer, iterativo. |

## 5. Impacto esperado

- Home siempre alineada con el catálogo (añadir productos sin toc código).
- Texto editable desde Supabase/admin (hero, secciones, testimoniales, FAQ) + JSON para i18n.
- Imágenes correctas y optimizadas → mejor LCP/CLS y accesibilidad.
- Métricas reales (nº productos, idiomas, certificaciones) → mayor credibilidad.
- Escala a nuevos productos sin toque de ingeniería (solo datos).

---

*Plan provisional: F0 puede ejecutarse en una sola pasada de cambio (2–3 componentes + datos).
  F1 requiere unificar las [p] fuentes de texto. F3 requiere convertir/adjust assets.*