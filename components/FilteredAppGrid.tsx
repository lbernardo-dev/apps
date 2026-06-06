"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { AppItem } from "@/lib/types";
import { AppCard } from "@/components/AppCard";

export function FilteredAppGrid({ apps }: { apps: AppItem[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [platform, setPlatform] = useState("all");

  // Get unique categories and platforms
  const categories = useMemo(() => {
    const list = new Set(apps.map((app) => app.category));
    return ["all", ...Array.from(list)];
  }, [apps]);

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch = 
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.shortDescription.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = category === "all" || app.category === category;
      const matchesPlatform = platform === "all" || (app.platform as string[]).includes(platform);

      return matchesSearch && matchesCategory && matchesPlatform;
    });
  }, [apps, search, category, platform]);

  return (
    <div>
      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row gap-5 items-stretch md:items-center justify-between mt-8 p-4 rounded-xl border border-line bg-card/40 backdrop-blur shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite" size={18} />
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-line bg-slate-900/40 text-sm text-ink placeholder-graphite focus:outline-none focus:border-brand-blue"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o descripción..."
            type="text"
            value={search}
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                category === cat
                  ? "bg-brand-blue text-white border-brand-blue shadow-sm"
                  : "bg-slate-800/35 text-graphite border-line hover:bg-slate-800 hover:text-ink"
              }`}
              key={cat}
              onClick={() => setCategory(cat)}
              type="button"
            >
              {cat === "all" ? "Todas las Categorías" : cat}
            </button>
          ))}
        </div>

        {/* Platform Selector */}
        <div className="flex gap-2">
          {["all", "iOS", "iPadOS"].map((plat) => (
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                platform === plat
                  ? "bg-brand-blue text-white border-brand-blue shadow-sm"
                  : "bg-slate-800/35 text-graphite border-line hover:bg-slate-800 hover:text-ink"
              }`}
              key={plat}
              onClick={() => setPlatform(plat)}
              type="button"
            >
              {plat === "all" ? "Todas las Plataformas" : plat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="mt-10 grid gap-6">
        {filteredApps.length === 0 ? (
          <div className="text-center py-16 rounded-xl border border-dashed border-line bg-card/20">
            <p className="text-sm text-graphite">No se encontraron aplicaciones que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          filteredApps.map((app) => (
            <AppCard app={app} key={app.slug} />
          ))
        )}
      </div>
    </div>
  );
}
