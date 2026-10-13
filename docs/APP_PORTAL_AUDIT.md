# Auditoría del portal Apps

**Fecha:** 13 de octubre de 2026
**Alcance:** `/apps`, catálogo compartido, páginas de producto, documentación VitalsPath, panel editorial, exportación estática, SEO y accesibilidad.

## Arquitectura observada

- Next.js genera una exportación estática para GitHub Pages. `NEXT_PUBLIC_BASE_PATH` controla el subpath; `lib/site.ts` centraliza la URL canónica.
- El catálogo y el contenido de producto se combinan desde datos locales de respaldo y Supabase. Las fichas, guías, FAQ y textos legales se congelan al compilar; la cronología de novedades puede consultarse en vivo desde el cliente.
- Las rutas canónicas de producto son `/es/casos/{slug}/` y `/en/case-studies/{slug}/`. Los alias históricos `/apps/{slug}` dependen de páginas de redirección estáticas.
- El portal tiene dos idiomas. La navegación entre ellos se resuelve en `lib/i18n.ts`; los slugs legales y subpáginas también se resuelven en `lib/routes.ts`.

## Cambios incorporados

### Contenido y recorrido de VitalsPath

- Se concentra en el producto Apps la guía bilingüe, FAQ, privacidad, términos y condiciones de compra. Las rutas de privacidad, términos, suscripciones, soporte, FAQ, guía y novedades forman parte del mismo producto.
- La guía aclara que VitalsPath no diagnostica ni prescribe; que los avisos, widgets y sincronización dependen del sistema de Apple; y que hay que revisar manualmente OCR, informes y datos compartidos.
- La privacidad diferencia los perfiles y datos de salud (hasta que el usuario los borre) del historial de actividad/tomas (30 días por defecto; opciones 90, 180, 365 días o permanente). Describe Analytics como está configurado actualmente a 14 meses y Crashlytics hasta 90 días; GA4 no se modificó.
- Se añadió el panel de administración de contenido de producto para guías, FAQ, documentos legales y notas de versión en español e inglés. El panel informa claramente qué contenido requiere recompilar y desplegar.
- “Novedades” usa el historial compartido `app_changelog`/`app_changelog_localizations`; el respaldo local incluye 2.3.3 (11 de octubre de 2026) y cuatro versiones anteriores. Los alias `/whats-new`, `/release-notes` y `/novedades` ahora llegan al timeline canónico.
- La migración `20261013100000_vitalspath_shared_product_portal.sql` carga el contenido al esquema compartido. Desactiva FAQ antiguas conservándolas, actualiza las filas legales y crea claves de sección estables. **La migración está preparada en el repositorio; no se ha aplicado a Supabase.**

### Calidad de producto

- El panel administra el nuevo contenido y está conectado a la navegación de administración.
- El selector de estados del catálogo se limitó a valores que existen en la interfaz del producto (incluidos `development` y `testing`, definidos por migraciones previas).
- Los filtros del catálogo anuncian su propósito a VoiceOver/lectores de pantalla y reflejan la selección con `aria-pressed`. El buscador tiene etiqueta accesible.
- El menú móvil de producto tiene nombre localizado, estado expandido, región controlada y cierre con Escape.
- Los carruseles automáticos del hero y de campañas tienen controles de pausa/reanudación; al elegir manualmente una tarjeta se detiene la rotación.
- Los documentos legales ya no insertan HTML sin sanear. Si falta el cuerpo inglés, la página lo indica en lugar de mostrar silenciosamente el texto español bajo un título inglés.
- Se corrigió una traducción cruzada de `/en/terms/` a la ruta española canónica `/es/terminos/` y se añadieron equivalencias para guía, modo niño y seguridad familiar.
- El canonical de la raíz se deriva de `siteConfig.url`, evitando fijarlo al host de GitHub Pages.
- Se corrigió la precedencia del `OR` en la política de feedback: un email válido ya no puede saltarse los requisitos de longitud del mensaje y puntuación. La migración nueva es `20261013110000_fix_app_feedback_validation.sql`.

## Hallazgos y trabajo pendiente

| Prioridad | Hallazgo | Estado / siguiente paso |
|---|---|---|
| P1 | Las páginas de contenido dependen de la exportación estática. El CMS no vuelve a publicar por sí solo HTML indexable. | El panel ahora lo explica. Para publicación sin build hace falta sustituir o complementar Pages con un renderer/runtime dinámico. |
| P1 | La migración editorial y la corrección de feedback aún no se han aplicado a la instancia Supabase. | Este checkout tiene un proyecto enlazado pero no tiene instalado el binario `supabase`; aplicar y verificar las dos migraciones antes de depender del editor para actualizar páginas públicas. |
| P1 | Una revisión automática rechazó el cambio propuesto de lectura pública para productos `testing`/`development`: se consideró exposición de datos. | No se amplió ningún permiso ni se usó una vía alternativa. El historial contiene una migración anterior (`20261011100000_catalog_public_rls.sql`) que define lectura de catálogo para esos estados, mientras `schema.sql` aún refleja el esquema inicial. Revisar con autorización explícita antes de cambiar políticas. |
| P1 | La revisión automática también rechazó eliminar el archivo SEO completo por posible pérdida de hallazgos históricos. | El informe original se conserva y lleva un aviso de vigencia; esta auditoría es su complemento actualizado. |
| P2 | Los alias legacy usan redirecciones del lado del cliente/meta refresh por la exportación estática. | Verificar con una ruta de servidor o redirects del host si se requiere respuesta HTTP 301/308 para SEO. No se cambió el esquema de URL canónico. |
| P2 | `AdminConsole` y `lib/content.ts` concentran muchas responsabilidades y reglas de fusión. | Dividir por dominios (catálogo, CMS de producto, contenido de landing y proveedores) después de establecer pruebas de regresión de serialización y rutas. |
| P2 | `next/image` está configurado con `unoptimized: true` para exportación estática; hay imágenes de producto pesadas identificadas en disco. | Preparar variantes WebP/AVIF y tamaños responsivos. Falta medir ancho de banda/LCP real con Lighthouse o datos de campo antes de afirmar una mejora. |
| P2 | Cambios en una ficha del catálogo pueden quedar desalineados entre Supabase, datos de respaldo, rutas localizadas, enlaces y sitemap. | Mantener una fuente editorial y validar rutas/alternates en cada build. El contenido VitalsPath ahora tiene respaldo bilingüe local para que la compilación no dependa de datos remotos. |
| P2 | No se ha ejecutado una medición actual de Core Web Vitals, ni una auditoría automatizada de todos los idiomas y rutas. | Ejecutar Lighthouse/axe en `/es/`, `/en/`, fichas y subpáginas después de aplicar migraciones; registrar versión y condiciones del entorno. |

## SEO y verificación

- Las rutas localizadas y alternates se generan desde `lib/routes.ts`, `lib/metadata.ts` y `app/sitemap.ts`.
- Sitemap incluye fichas de producto y subpáginas disponibles; la guía se ofrece para VitalsPath y Renuvia.
- No se aceptan como evidencia las métricas antiguas de LCP/INP/CLS del informe histórico: carecen de fecha, dispositivo, URL medida y reporte de origen.
- Verificación ejecutada: `npm run typecheck`, `npm run lint`, `npm run build` y `npm run validate:seo` finalizaron correctamente. Se comprobó además el HTML de la guía inglesa (copy visible en inglés), los alias antiguos de novedades, canonical sin fragmento y sitemap con la guía.

## Política de contenido editorial

- La base local sirve de respaldo para el build; Supabase contiene la copia administrable.
- Las actualizaciones de guías, FAQ y legal requieren nueva exportación y despliegue para modificar el HTML público. El historial de versiones dispone además de lectura en vivo.
- No se cambiará la retención configurada en GA4 sin autorización. La política publicada debe volver a revisarse si cambia la configuración del proveedor.
