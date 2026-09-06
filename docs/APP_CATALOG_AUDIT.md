# Auditoría del catálogo iOS

Fecha de auditoría: 2026-09-06  
Origen: `/Volumes/SSD Externo/DESARROLLO/iOS`

## Resultado

La landing reconoce las diez aplicaciones existentes como productos del catálogo. El catálogo runtime se sirve desde Supabase después de aplicar `supabase/migrations/20260906120000_complete_app_catalog.sql`; las definiciones en `lib/content.ts` permanecen como fallback para builds sin conexión a Supabase.

Cada producto soporta:

- estado localizado: publicada, testing o desarrollo;
- descripción, problema, beneficios, funcionalidades, público, SEO y precios;
- icono, portada, capturas, vídeo y otros medios cuando existen en el repositorio;
- enlaces dinámicos para App Store, TestFlight, descarga, soporte, privacidad, términos, suscripciones, web, feedback y notas de versión;
- preguntas frecuentes, páginas legales y condiciones de compra;
- valoraciones y comentarios sincronizados desde App Store cuando hay datos públicos;
- feedback de usuarios y seguimiento del lanzamiento;
- auditoría de completitud con origen, puntuación y campos ausentes.

No se inventan descargas, reseñas, precios, vídeos ni capturas. Cuando el repositorio o App Store Connect no proporciona un dato, el producto lo comunica como pendiente y ofrece seguimiento o soporte.

## Inventario

| Producto | Directorio de origen | Estado | Cobertura | Pendientes objetivos |
| --- | --- | --- | ---: | --- |
| VitalsPath | `iOS/VitalsPath` | Publicada | 100% | Ninguno detectado |
| StreakReps | `iOS/StreakReps` | Publicada | 100% | Ninguno detectado |
| MaskID | `iOS/MaskID` | Publicada | 100% | Ninguno detectado |
| SchoolSnap | `iOS/SchoolSnap` | Testing | 96% | Descarga pública, revisión final y vídeo promocional |
| Kinsera | `iOS/Kinsera` | Testing | 88% | Descarga pública y QA en dispositivo físico |
| UpLedger | `iOS/UpLedger` | Desarrollo | 82% | Descarga pública y vídeo |
| Renuvia | `iOS/Renuvia` | Desarrollo | 84% | Descarga pública y vídeo |
| SnapInbox | `iOS/SnapInbox` | Desarrollo | 62% | Capturas, vídeo, marca final y QA físico |
| Culmina | `iOS/FollowUpPro` | Desarrollo | 72% | Capturas, descarga pública, metadatos finales y QA físico |
| VitalsBud | `iOS/VitalsBud` | Desarrollo | 48% | Icono original, capturas, vídeo, descarga pública, metadatos finales y QA físico |

## Evidencia de distribución

- Publicadas: VitalsPath, StreakReps y MaskID.
- Testing: SchoolSnap y Kinsera tienen builds internos válidos en TestFlight; no se expone un enlace público que no esté disponible.
- Desarrollo: Culmina, VitalsBud, UpLedger, Renuvia y SnapInbox se presentan con seguimiento y soporte, no como descargas listas.
- App Store Connect: el sincronizador `scripts/sync-appstore.mjs` mantiene snapshots de versión, precio, valoración, número de reseñas y comentarios públicos cuando Apple los ofrece.

## Operación

1. Aplicar la migración de catálogo.
2. Ejecutar `npm run sync:appstore` con las credenciales de Supabase si se quieren persistir snapshots y reseñas en la base de datos.
3. Completar los campos pendientes en cada repositorio antes de cambiar un producto a publicada.
4. Revisar legal, capturas, vídeo y QA físico antes de anunciar cualquier descarga.

La migración es idempotente en los registros principales y mantiene la compatibilidad con el catálogo existente.
