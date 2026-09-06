# What's New dinámico

## Flujo automático

1. `npm run sync:appstore` consulta la API pública de Apple y detecta la versión publicada más reciente.
2. Guarda versión, build cuando Apple lo expone (o lo detecta en las release notes), texto fuente, Markdown, fecha, URL de App Store y estado de traducción.
3. Traduce con MyMemory por defecto, sin coste ni clave. También admite un servidor LibreTranslate propio y OpenAI solo cuando se selecciona explícitamente.
4. Persiste el historial en `app_changelog` y cada idioma en `app_changelog_localizations` usando exclusivamente `SUPABASE_SERVICE_ROLE_KEY`.
5. La landing utiliza la base de datos en runtime y conserva el snapshot generado como fallback para exportaciones estáticas.
6. El workflow `.github/workflows/sync-appstore.yml` lo ejecuta cada lunes y permite ejecución manual.

Si Apple todavía no expone una app públicamente, el sincronizador no inventa datos: conserva su estado de desarrollo/testing y lo vuelve a comprobar en el siguiente ciclo.

## Instancias nativas

El paquete local `/Volumes/SSD Externo/DESARROLLO/iOS/Shared/WhatsNewKit` ofrece `WhatsNewClient`, `WhatsNewStore` y `WhatsNewView`. Lee Supabase con la anon key, selecciona el locale del sistema, renderiza Markdown y muestra automáticamente la hoja cuando cambia la versión/build guardada en `UserDefaults`.

## Contrato mínimo

`app_changelog` mantiene una fila por `app_slug + version`. `app_changelog_localizations` mantiene una fila por `app_slug + version + locale`. Esto permite añadir idiomas o corregir una traducción sin tocar la versión original.

Variables relevantes:

```text
TRANSLATION_PROVIDER=mymemory
TRANSLATION_TARGET_LOCALES=es,en
SUPABASE_SERVICE_ROLE_KEY=...
```

Para añadir idiomas, cambia `TRANSLATION_TARGET_LOCALES` a, por ejemplo, `es,en,fr,de,it,pt` y vuelve a ejecutar el sync. Las apps que no están publicadas en Apple se omiten de forma segura.
