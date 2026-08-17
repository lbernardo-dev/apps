"use client";

import { useEffect, useState } from "react";
import { Sparkles, GitCommitHorizontal } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { fetchChangelogLive } from "@/lib/changelog";
import type { AppChangelogEntry, AppItem } from "@/lib/types";

function cleanNotes(text: string): string {
  return text.replace(/\s{2,}/g, " ").trim();
}

export function ChangelogTimeline({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const isEs = locale === "es";
  const initial = app.changelog ?? [];
  const [entries, setEntries] = useState<AppChangelogEntry[]>(initial);

  useEffect(() => {
    let active = true;
    fetchChangelogLive(app.slug).then((live) => {
      if (active && live.length > 0) setEntries(live);
    });
    return () => {
      active = false;
    };
  }, [app.slug]);

  const sorted = entries
    .slice()
    .sort((a, b) => (a.version < b.version ? 1 : -1))
    .filter((e) => (isEs ? e.releaseNotes : e.releaseNotesEn ?? e.releaseNotes));

  if (sorted.length === 0) return null;

  return (
    <section className="border-b border-line bg-themed-white">
      <div className="container py-20">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
            <Sparkles size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
              {isEs ? `Qué hay de nuevo en ${app.name}` : `What's new in ${app.name}`}
            </h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-[.25em] text-graphite">
              {isEs ? "Historial de versiones" : "Version history"}
            </p>
          </div>
        </div>

        <ol className="relative mt-12 space-y-8 border-l border-line pl-8">
          {sorted.map((entry) => {
            const notes = cleanNotes(isEs ? entry.releaseNotes : (entry.releaseNotesEn ?? entry.releaseNotes));
            const isLatest = sorted[0]?.version === entry.version;
            return (
              <li key={entry.version} className="relative">
                <span
                  className={`absolute -left-[41px] top-1.5 flex size-4 items-center justify-center rounded-full border-2 ${
                    isLatest ? "border-brand-blue bg-brand-blue" : "border-brand-blue/40 bg-themed-white"
                  }`}
                  aria-hidden="true"
                >
                  {isLatest ? <span className="size-1 rounded-full bg-white" /> : null}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="flex items-center gap-2 text-sm font-black text-ink">
                    <GitCommitHorizontal size={15} className="text-brand-blue" aria-hidden="true" />
                    v{entry.version}
                  </h3>
                  <span className="rounded-full border border-line bg-themed-mist px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-graphite">
                    {entry.releaseDate ?? (isLatest ? (isEs ? "Actual" : "Current") : "")}
                  </span>
                  {isLatest ? (
                    <span className="rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-brand-blue">
                      {isEs ? "Última versión" : "Latest"}
                    </span>
                  ) : null}
                  {entry.translated === false && isEs ? (
                    <span className="rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                      {isEs ? "Nota original en español" : "Original note in Spanish"}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 whitespace-pre-line text-graphite">{notes}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}