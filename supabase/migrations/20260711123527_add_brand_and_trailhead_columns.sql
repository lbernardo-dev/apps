ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS color_primary text;
ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS color_secondary text;

ALTER TABLE public.about_profiles ADD COLUMN IF NOT EXISTS trailhead_url text;
ALTER TABLE public.about_profiles ADD COLUMN IF NOT EXISTS trailhead_stats jsonb;;
