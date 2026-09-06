-- Apple’s public lookup endpoint does not always expose the binary build.
-- These values are verified against the release records in the iOS sources.

update public.app_changelog
set build_number = '222202608291'
where app_slug = 'vitalspath' and version = '2.2.2';

update public.app_changelog
set build_number = '107202608261'
where app_slug = 'reps' and version = '1.0.7';

update public.app_store_snapshots
set build_number = '222202608291'
where app_slug = 'vitalspath' and version = '2.2.2';

update public.app_store_snapshots
set build_number = '107202608261'
where app_slug = 'reps' and version = '1.0.7';
