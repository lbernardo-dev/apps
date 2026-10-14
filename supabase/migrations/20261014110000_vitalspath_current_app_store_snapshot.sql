-- Reconcile the VitalsPath storefront snapshot with App Store Connect.
-- 2.3.4 is marked READY_FOR_SALE in ASC. The public Store page may lag while caches refresh.
-- ASC did not provide a release timestamp in the version response, so do not reuse createdDate as a release date.
update public.app_store_snapshots
set version = '2.3.4',
    release_notes = 'Los recordatorios de medicación son más fiables y los resúmenes de dosis omitidas te llevan directamente a las dosis correspondientes. También es más fiable el historial de notificaciones. Ahora puedes registrar la tristeza y elegir cuándo termina una pausa del tratamiento, incluida la reanudación automática. La fecha elegida coincide con la que guarda VitalsPath. Hemos mejorado la accesibilidad de controles importantes y la estabilidad de los cuidados, perfiles compartidos e informes.',
    current_version_release_date = null,
    synced_at = now()
where app_slug = 'vitalspath';
