-- Remove the placeholder testimonials seeded in 20260816140000.
-- The home now sources testimonials automatically from real App Store
-- reviews (see lib/content.ts getTestimonials() fallback), so the fake
-- client quotes must not win over real user reviews.
delete from public.testimonials;