# Landing dinámica: anuncios y encuestas

La landing puede publicar campañas editoriales o promocionales y encuestas sin modificar el código ni volver a generar la aplicación.

## Anuncios

Se gestionan desde `/admin` en **Anuncios y encuestas**. Cada anuncio admite:

- Español e inglés.
- Tipo `Novedad` o `Promoción / anuncio`.
- CTA interno o externo.
- Imagen opcional, color de acento y orden.
- Ventana de publicación `Desde` / `Hasta`.
- Estado visible u oculto.

El rail se actualiza en cliente desde Supabase, rota automáticamente cuando hay varios elementos y respeta `prefers-reduced-motion` mediante las reglas globales existentes.

## Encuestas

Cada encuesta admite de 2 a 6 opciones, traducción ES/EN, descripción, orden y fechas. Las respuestas:

- Se almacenan en `landing_survey_responses`.
- No requieren cuenta.
- Limitan un voto por encuesta y sesión del navegador.
- Solo exponen resultados agregados mediante `get_landing_survey_results`.
- No exponen email, IP ni datos de identificación personal.

## Seguridad y SEO

Las tablas tienen RLS: el público solo puede leer campañas activas y enviar respuestas válidas; editores y administradores gestionan el contenido. La home mantiene metadatos localizados, `WebPage`, `FAQPage`, `ItemList` y `SoftwareApplication` con valoraciones agregadas cuando existen.
