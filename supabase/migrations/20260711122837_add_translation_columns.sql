ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS tagline_en text;
ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS short_description_en text;
ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS long_description_en text;
ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS problem_en text;
ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS benefits_en text[];
ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS features_en text[];
ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS audience_en text;
ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS primary_cta_label_en text;
ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS secondary_cta_label_en text;

ALTER TABLE public.home_sections ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.home_sections ADD COLUMN IF NOT EXISTS body_en text;

ALTER TABLE public.app_sections ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.app_sections ADD COLUMN IF NOT EXISTS body_en text;

ALTER TABLE public.app_faqs ADD COLUMN IF NOT EXISTS question_en text;
ALTER TABLE public.app_faqs ADD COLUMN IF NOT EXISTS answer_en text;

ALTER TABLE public.app_legal_pages ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.app_legal_pages ADD COLUMN IF NOT EXISTS body_en text;

ALTER TABLE public.about_profiles ADD COLUMN IF NOT EXISTS headline_en text;
ALTER TABLE public.about_profiles ADD COLUMN IF NOT EXISTS summary_en text;
ALTER TABLE public.about_profiles ADD COLUMN IF NOT EXISTS education_en text;

ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS quote_en text;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS role_en text;;
