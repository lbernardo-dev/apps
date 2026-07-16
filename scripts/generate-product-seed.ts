import { writeFile } from "node:fs/promises";
import { apps } from "../lib/content";
import { enrichKnownProduct } from "../lib/product-enrichment";

const outputPath = process.argv[2];

if (!outputPath) {
  throw new Error("Usage: npx tsx scripts/generate-product-seed.ts <migration.sql>");
}

const catalog = apps.map(enrichKnownProduct);
const payload = JSON.stringify(catalog).replaceAll("$catalog$", "$catalog_safe$");

const sql = `-- Generated from the checked-in product fallbacks.
-- After this initial seed, Supabase is the runtime source of truth.
do $migration$
declare
  catalog jsonb := $catalog$${payload}$catalog$::jsonb;
  product jsonb;
  product_id uuid;
  faq_item jsonb;
  legal_item jsonb;
  faq_order integer;
begin
  for product in select value from jsonb_array_elements(catalog)
  loop
    insert into public.apps (
      slug, name, tagline, tagline_en, short_description, short_description_en,
      long_description, long_description_en, problem, problem_en, benefits,
      benefits_en, features, features_en, audience, audience_en, status,
      featured, category, platform, app_store_url, website_url, support_email,
      icon_url, cover_image_url, screenshots, video_url, primary_cta_label,
      primary_cta_label_en, primary_cta_url, secondary_cta_label,
      secondary_cta_label_en, secondary_cta_url, color_primary, color_secondary,
      seo_title, seo_description, seo_image, pricing, free_features,
      free_features_en, pro_features, pro_features_en, published_at, updated_at
    ) values (
      product->>'slug', product->>'name', product->>'tagline', product->>'tagline_en',
      product->>'shortDescription', product->>'shortDescription_en',
      product->>'longDescription', product->>'longDescription_en',
      product->>'problem', product->>'problem_en',
      array(select jsonb_array_elements_text(coalesce(product->'benefits', '[]'::jsonb))),
      array(select jsonb_array_elements_text(coalesce(product->'benefits_en', '[]'::jsonb))),
      array(select jsonb_array_elements_text(coalesce(product->'features', '[]'::jsonb))),
      array(select jsonb_array_elements_text(coalesce(product->'features_en', '[]'::jsonb))),
      product->>'audience', product->>'audience_en', product->>'status',
      coalesce((product->>'featured')::boolean, false), product->>'category',
      array(select jsonb_array_elements_text(coalesce(product->'platform', '[]'::jsonb))),
      nullif(product->>'appStoreUrl', ''), nullif(product->>'websiteUrl', ''),
      product->>'supportEmail', nullif(product->>'iconUrl', ''),
      nullif(product->>'coverImageUrl', ''),
      array(select jsonb_array_elements_text(coalesce(product->'screenshots', '[]'::jsonb))),
      nullif(product->>'videoUrl', ''), product->>'primaryCtaLabel',
      nullif(product->>'primaryCtaLabel_en', ''), product->>'primaryCtaUrl',
      nullif(product->>'secondaryCtaLabel', ''), nullif(product->>'secondaryCtaLabel_en', ''),
      nullif(product->>'secondaryCtaUrl', ''), nullif(product->>'colorPrimary', ''),
      nullif(product->>'colorSecondary', ''), product#>>'{seo,title}',
      product#>>'{seo,description}', nullif(product#>>'{seo,image}', ''),
      coalesce(product->'pricing', '[]'::jsonb),
      array(select jsonb_array_elements_text(coalesce(product->'freeFeatures', '[]'::jsonb))),
      array(select jsonb_array_elements_text(coalesce(product->'freeFeatures_en', '[]'::jsonb))),
      array(select jsonb_array_elements_text(coalesce(product->'proFeatures', '[]'::jsonb))),
      array(select jsonb_array_elements_text(coalesce(product->'proFeatures_en', '[]'::jsonb))),
      nullif(product->>'publishedAt', '')::timestamptz, now()
    )
    on conflict (slug) do update set
      name = excluded.name, tagline = excluded.tagline, tagline_en = excluded.tagline_en,
      short_description = excluded.short_description, short_description_en = excluded.short_description_en,
      long_description = excluded.long_description, long_description_en = excluded.long_description_en,
      problem = excluded.problem, problem_en = excluded.problem_en, benefits = excluded.benefits,
      benefits_en = excluded.benefits_en, features = excluded.features, features_en = excluded.features_en,
      audience = excluded.audience, audience_en = excluded.audience_en, status = excluded.status,
      featured = excluded.featured, category = excluded.category, platform = excluded.platform,
      app_store_url = excluded.app_store_url, website_url = excluded.website_url,
      support_email = excluded.support_email, icon_url = excluded.icon_url,
      cover_image_url = excluded.cover_image_url, screenshots = excluded.screenshots,
      video_url = excluded.video_url, primary_cta_label = excluded.primary_cta_label,
      primary_cta_label_en = excluded.primary_cta_label_en, primary_cta_url = excluded.primary_cta_url,
      secondary_cta_label = excluded.secondary_cta_label,
      secondary_cta_label_en = excluded.secondary_cta_label_en,
      secondary_cta_url = excluded.secondary_cta_url, color_primary = excluded.color_primary,
      color_secondary = excluded.color_secondary, seo_title = excluded.seo_title,
      seo_description = excluded.seo_description, seo_image = excluded.seo_image,
      pricing = excluded.pricing, free_features = excluded.free_features,
      free_features_en = excluded.free_features_en, pro_features = excluded.pro_features,
      pro_features_en = excluded.pro_features_en, published_at = excluded.published_at,
      updated_at = now()
    returning id into product_id;

    delete from public.app_faqs where app_id = product_id;
    faq_order := 0;
    for faq_item in select value from jsonb_array_elements(coalesce(product->'faq', '[]'::jsonb))
    loop
      insert into public.app_faqs (app_id, question, question_en, answer, answer_en, sort_order)
      values (
        product_id, faq_item->>'question', nullif(faq_item->>'question_en', ''),
        faq_item->>'answer', nullif(faq_item->>'answer_en', ''), faq_order
      );
      faq_order := faq_order + 1;
    end loop;

    delete from public.app_legal_pages where app_id = product_id;
    for legal_item in
      select value from jsonb_array_elements(jsonb_build_array(
        jsonb_build_object('kind', 'privacy', 'page', product#>'{legal,privacy}'),
        jsonb_build_object('kind', 'terms', 'page', product#>'{legal,terms}'),
        jsonb_build_object('kind', 'subscriptions', 'page', product#>'{legal,subscriptions}')
      ))
    loop
      if legal_item->'page' is not null and legal_item->'page' <> 'null'::jsonb then
        insert into public.app_legal_pages (app_id, kind, title, title_en, body, body_en, updated_at)
        values (
          product_id, legal_item->>'kind', legal_item#>>'{page,title}',
          nullif(legal_item#>>'{page,title_en}', ''),
          array_to_string(array(select jsonb_array_elements_text(coalesce(legal_item#>'{page,body}', '[]'::jsonb))), E'\\n'),
          array_to_string(array(select jsonb_array_elements_text(coalesce(legal_item#>'{page,body_en}', '[]'::jsonb))), E'\\n'),
          coalesce(nullif(legal_item#>>'{page,updatedAt}', '')::timestamptz, now())
        );
      end if;
    end loop;
  end loop;
end
$migration$;
`;

await writeFile(outputPath, sql, "utf8");
console.log(`Generated ${outputPath} with ${catalog.length} products.`);
