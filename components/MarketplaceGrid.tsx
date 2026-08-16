"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Search, Shield, Sparkles, Star, TrendingDown } from "lucide-react";
import type { MarketplaceProduct } from "@/lib/marketplace";
import { getMarketplaceProductsClient } from "@/lib/marketplace";
import { useLocale } from "@/lib/i18n";

type SortKey = "featured" | "price_asc" | "price_desc" | "rating" | "sold";

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£"
};

function formatPrice(value: number | null | undefined, currency: string): string {
  if (value == null) return "";
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  const rounded = Math.round(value * 100) / 100;
  return `${symbol}${Number.isInteger(rounded) ? rounded : rounded.toFixed(2)}`;
}

export function MarketplaceGrid({ initialProducts }: { initialProducts: MarketplaceProduct[] }) {
  const { t, locale } = useLocale();
  const [products, setProducts] = useState<MarketplaceProduct[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");

  useEffect(() => {
    let cancelled = false;
    getMarketplaceProductsClient().then((fresh) => {
      if (!cancelled && fresh.length > 0) setProducts(fresh);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ["all", ...list];
  }, [products]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filteredProducts = products.filter((p) => {
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        (p.description ?? "").toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });

    switch (sort) {
      case "price_asc":
        return filteredProducts.sort((a, b) => (a.sale_price ?? 0) - (b.sale_price ?? 0));
      case "price_desc":
        return filteredProducts.sort((a, b) => (b.sale_price ?? 0) - (a.sale_price ?? 0));
      case "rating":
        return filteredProducts.sort((a, b) => (b.evaluate_rate ?? 0) - (a.evaluate_rate ?? 0));
      case "sold":
        return filteredProducts.sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0));
      default:
        return filteredProducts.sort((a, b) => {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return (b.sort_order ?? 0) - (a.sort_order ?? 0);
        });
    }
  }, [products, search, category, sort]);

  const localizeTitle = (p: MarketplaceProduct): string =>
    locale === "en" && p.title_en ? p.title_en : p.title;

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden rounded-[2rem] border border-line bg-themed-card shadow-card">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 12% 0%, var(--color-brand-blue-soft, rgba(37,99,235,.14)), transparent 40%), radial-gradient(circle at 90% 100%, var(--color-brand-green-soft, rgba(16,185,129,.10)), transparent 45%)"
          }}
          aria-hidden="true"
        />
        <div className="relative px-6 py-12 sm:px-10 sm:py-16">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-themed-mist px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-brand-blue">
            <Sparkles size={12} /> {t("marketplace.eyebrow")}
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-black tracking-tight text-ink sm:text-5xl">{t("marketplace.title")}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-graphite sm:text-base">{t("marketplace.subtitle")}</p>
          <p className="mt-5 flex max-w-2xl items-start gap-2 text-xs leading-5 text-graphite">
            <Shield size={14} className="mt-0.5 shrink-0 text-brand-green" />
            <span>{t("marketplace.disclaimer")}</span>
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-themed-card p-4 shadow-card lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite" size={18} />
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-line bg-[var(--color-bg)] text-sm text-ink placeholder-graphite focus:outline-none focus:border-brand-blue"
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("marketplace.search.placeholder")}
            type="text"
            value={search}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Orden"
            className="rounded-lg border border-line bg-[var(--color-bg)] px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-brand-blue"
            onChange={(e) => setSort(e.target.value as SortKey)}
            value={sort}
          >
            <option value="featured">{locale === "es" ? "Destacados" : "Featured"}</option>
            <option value="price_asc">{locale === "es" ? "Precio: menor a mayor" : "Price: low to high"}</option>
            <option value="price_desc">{locale === "es" ? "Precio: mayor a menor" : "Price: high to low"}</option>
            <option value="rating">{locale === "es" ? "Mejor valorados" : "Top rated"}</option>
            <option value="sold">{locale === "es" ? "Más vendidos" : "Best sellers"}</option>
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              category === cat
                ? "bg-brand-blue text-white border-brand-blue shadow-sm"
                : "bg-themed-card text-graphite border-line hover:text-ink"
            }`}
            key={cat}
            onClick={() => setCategory(cat)}
            type="button"
          >
            {cat === "all" ? t("marketplace.filter.all") : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-line bg-themed-card/40 py-20 text-center">
            <p className="text-sm text-graphite">{t("marketplace.empty")}</p>
          </div>
        ) : (
          filtered.map((p) => {
            const sale = formatPrice(p.sale_price, p.currency);
            const original = formatPrice(p.original_price, p.currency);
            const hasDiscount = p.discount > 0 || (p.original_price != null && p.sale_price != null && p.original_price > p.sale_price);
            return (
              <article
                className="group relative flex min-h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-themed-card shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-soft"
                key={p.id}
              >
                <div className="relative aspect-square overflow-hidden bg-themed-mist">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={localizeTitle(p)}
                      fill
                      unoptimized
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TrendingDown className="text-graphite/40" size={40} />
                    </div>
                  )}

                  <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
                    {hasDiscount && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-black text-white shadow-lg">
                        -{(p.discount > 0
                          ? p.discount
                          : p.original_price != null && p.sale_price != null && p.original_price > 0
                          ? Math.round(((p.original_price - p.sale_price) / p.original_price) * 100)
                          : p.discount)}%
                      </span>
                    )}
                    {p.featured && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-400/95 px-2.5 py-1 text-[10px] font-black text-amber-950 shadow-lg">
                        <Sparkles size={11} /> {t("marketplace.featured")}
                      </span>
                    )}
                  </div>

                  {p.discount > 0 && (p.sale_price != null) && (
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                      <span className="inline-flex text-[10px] font-black uppercase tracking-wider text-white drop-shadow">
                        {p.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-black leading-snug text-ink">{localizeTitle(p)}</h3>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-graphite">
                    {p.evaluate_rate != null && (
                      <span className="inline-flex items-center gap-1">
                        <Star size={13} className="text-amber-400" fill="currentColor" />
                        <strong className="text-ink">{p.evaluate_rate.toFixed(1)}</strong>
                        {t("marketplace.rating").toLowerCase()}
                      </span>
                    )}
                    {p.volume != null && (
                      <span>
                        {p.volume.toLocaleString(locale === "es" ? "es-ES" : "en-US")} {t("marketplace.sold")}
                      </span>
                    )}
                  </div>

                  {p.description && (
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-graphite">
                      {locale === "en" && p.description_en ? p.description_en : p.description}
                    </p>
                  )}

                  <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                    <div className="leading-tight">
                      {hasDiscount && original && original !== sale ? (
                        <p className="text-xs text-graphite line-through">{original}</p>
                      ) : null}
                      <p className="text-xl font-black text-ink">{sale || original || "—"}</p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue px-4 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:opacity-90"
                      href={p.promotion_link || p.product_url}
                      rel="noopener noreferrer nofollow sponsored"
                      target="_blank"
                    >
                      {t("marketplace.buy")}
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}