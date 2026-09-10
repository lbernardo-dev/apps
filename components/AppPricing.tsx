"use client";

import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import type { AppItem } from "@/lib/types";
import { useLocale } from "@/lib/i18n";
import { getAppSubpagePath } from "@/lib/routes";

function localizedPrice(price: string, priceEn: string | undefined, isEs: boolean): string {
  if (isEs) return price;
  if (priceEn) return priceEn;
  const euroPrice = price.match(/^(\d+),(\d+)\s*€$/);
  return euroPrice ? `€${euroPrice[1]}.${euroPrice[2]}` : price;
}

export function AppPricing({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  if (!app.pricing?.length) return null;
  const isEs = locale === "es";
  const productName = app.name.split(":")[0].trim();
  const featuredPlan = app.pricing.find((plan) => plan.featured) ?? app.pricing[1];
  const premiumLabel = featuredPlan && /plus|pro/i.test(featuredPlan.name_en || featuredPlan.name)
    ? (isEs ? featuredPlan.name : featuredPlan.name_en || featuredPlan.name)
    : `${productName} Plus`;

  return (
    <section id="pricing" className="section relative overflow-hidden border-b border-line bg-themed-mist">
      <div className="glow-orb left-1/2 top-0 size-[360px] -translate-x-1/2 bg-brand-blue/10" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-blue">{premiumLabel}</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-5xl">
            {isEs ? "Empieza gratis. Mejora cuando lo necesites." : "Start free. Upgrade when you need more."}
          </h2>
          <p className="mt-5 text-base leading-7 text-graphite">
            {isEs ? "La compra y la renovación se gestionan de forma segura mediante Apple. Los precios finales siempre son los mostrados en App Store para tu territorio." : "Purchases and renewals are securely managed by Apple. Final prices are always those shown by the App Store in your territory."}
          </p>
        </div>

        <div className={`mx-auto mt-12 grid max-w-6xl gap-5 ${app.pricing.length >= 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"}`}>
          {app.pricing.map((plan) => (
            <article className={`relative flex flex-col items-center text-center rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 ${plan.featured ? "border-brand-blue bg-brand-blue text-white shadow-[0_24px_70px_rgba(59,130,246,.25)]" : "border-line bg-themed-card shadow-card"}`} key={plan.name}>
              {plan.badge ? <span className={`mb-5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${plan.featured ? "bg-white/15 text-white" : "bg-brand-blue/10 text-brand-blue"}`}>{!isEs && plan.badge_en ? plan.badge_en : plan.badge}</span> : null}
              <h3 className={`text-lg font-black ${plan.featured ? "text-white" : "text-ink"}`}>{!isEs && plan.name_en ? plan.name_en : plan.name}</h3>
              <div className="mt-4 flex items-end justify-center gap-1">
                <span className={`text-4xl font-black tracking-tight ${plan.featured ? "text-white" : "text-ink"}`}>{/precio en app store|en desarrollo/i.test(plan.price) ? (isEs ? "Por anunciar" : "To be announced") : localizedPrice(plan.price, plan.price_en, isEs)}</span>
                <span className={plan.featured ? "text-blue-100" : "text-graphite"}>{" "}{!isEs && plan.cadence_en ? plan.cadence_en : plan.cadence}</span>
              </div>
              <p className={`mt-4 text-sm leading-6 ${plan.featured ? "text-blue-50" : "text-graphite"}`}>{!isEs && plan.description_en ? plan.description_en : plan.description}</p>
              {plan.isIndicative ? <p className={`mt-4 text-[11px] font-semibold ${plan.featured ? "text-blue-100" : "text-graphite"}`}>{/precio en app store|en desarrollo/i.test(plan.price) ? (isEs ? "Importe pendiente de publicación." : "Amount pending publication.") : app.status === "published" ? (isEs ? "Apple muestra el importe final por territorio." : "Apple shows the final price for your territory.") : (isEs ? "Precio configurado para pruebas." : "Price configured for testing.")}</p> : null}
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 rounded-3xl border border-line bg-themed-card p-6 shadow-card md:grid-cols-2 md:p-8">
          <div>
            <h3 className="flex items-center gap-2 font-black text-ink"><Check className="text-brand-green" size={18} /> {productName} Free</h3>
            <ul className="mt-4 space-y-3 text-sm text-graphite">{(!isEs && app.freeFeatures_en ? app.freeFeatures_en : app.freeFeatures)?.map(feature => <li className="flex gap-2" key={feature}><Check className="mt-0.5 shrink-0 text-brand-green" size={15} />{feature}</li>)}</ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-black text-ink"><Sparkles className="text-brand-blue" size={18} /> {premiumLabel}</h3>
            <ul className="mt-4 space-y-3 text-sm text-graphite">{(!isEs && app.proFeatures_en ? app.proFeatures_en : app.proFeatures)?.map(feature => <li className="flex gap-2" key={feature}><Check className="mt-0.5 shrink-0 text-brand-blue" size={15} />{feature}</li>)}</ul>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-graphite">
          <Link className="font-bold text-brand-blue hover:underline" href={getAppSubpagePath(app.slug, "subscriptions", locale)}>{isEs ? "Condiciones de suscripción" : "Subscription terms"}</Link>
          {" · "}<a className="hover:text-ink" href="https://support.apple.com/es-es/118428" target="_blank" rel="noopener noreferrer">{isEs ? "Gestionar suscripciones en Apple" : "Manage Apple subscriptions"}</a>
        </p>
      </div>
    </section>
  );
}
