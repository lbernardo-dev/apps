import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AppItem } from "@/lib/types";
import { PhoneMockup } from "@/components/PhoneMockup";

export function AppCard({ app }: { app: AppItem }) {
  return (
    <article className="group grid gap-6 rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft md:grid-cols-[0.8fr_1fr]">
      <PhoneMockup app={app} compact />
      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">{app.name}</h2>
            <p className="mt-2 text-sm font-medium text-brand-blue">{app.category}</p>
          </div>
          <span className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-graphite">
            {app.status === "published" ? "Publicada" : app.status === "coming_soon" ? "Proximamente" : "Borrador"}
          </span>
        </div>
        <p className="mt-4 text-base leading-7 text-graphite">{app.shortDescription}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {app.platform.map((platform) => (
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700" key={platform}>
              {platform}
            </span>
          ))}
        </div>
        <Link
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand-blue"
          href={`/apps/${app.slug}`}
        >
          Ver detalle
          <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
}
