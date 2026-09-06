"use client";

import { useEffect, useState } from "react";
import { ExternalLink, GitCommitHorizontal, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { changelogTextForLocale, fetchChangelogLive } from "@/lib/changelog";
import type { AppChangelogEntry, AppItem } from "@/lib/types";

function InlineMarkdown({ text }: { text: string }) {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g);
  return (
    <>
      {tokens.map((token, index) => {
        if (token.startsWith("**") && token.endsWith("**")) {
          return <strong key={`${token}-${index}`}>{token.slice(2, -2)}</strong>;
        }
        if (token.startsWith("`") && token.endsWith("`")) {
          return <code key={`${token}-${index}`} className="rounded bg-themed-mist px-1.5 py-0.5 text-[0.9em]">{token.slice(1, -1)}</code>;
        }
        const link = token.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
        if (link) {
          return (
            <a key={`${token}-${index}`} href={link[2]} target="_blank" rel="noreferrer" className="font-semibold text-brand-blue underline underline-offset-2">
              {link[1]}
            </a>
          );
        }
        return <span key={`${token}-${index}`}>{token}</span>;
      })}
    </>
  );
}

function RichNotes({ text }: { text: string }) {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  return (
    <div className="mt-3 max-w-2xl space-y-2 text-sm leading-6 text-graphite">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={`space-${index}`} className="h-1" aria-hidden="true" />;
        if (/^#{2,3}\s+/.test(trimmed)) {
          return <h4 key={`heading-${index}`} className="pt-1 text-sm font-black text-ink"><InlineMarkdown text={trimmed.replace(/^#{2,3}\s+/, "")} /></h4>;
        }
        if (/^(?:[-*•])\s+/.test(trimmed)) {
          return (
            <div key={`bullet-${index}`} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
              <p><InlineMarkdown text={trimmed.replace(/^(?:[-*•])\s+/, "")} /></p>
            </div>
          );
        }
        return <p key={`paragraph-${index}`}><InlineMarkdown text={trimmed} /></p>;
      })}
    </div>
  );
}

export function ChangelogTimeline({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const isEs = locale === "es";
  const [entries, setEntries] = useState<AppChangelogEntry[]>(app.changelog ?? []);

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
    .sort((a, b) => {
      if (a.releaseDate && b.releaseDate && a.releaseDate !== b.releaseDate) return a.releaseDate < b.releaseDate ? 1 : -1;
      return a.version < b.version ? 1 : -1;
    });

  if (sorted.length === 0) return null;

  return (
    <section className="border-b border-line bg-themed-white" data-app-slug={app.slug}>
      <div className="container py-20">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
            <Sparkles size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
              {isEs ? `Qué hay de nuevo en ${app.name}` : `What's new in ${app.name}`}
            </h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-[.25em] text-graphite">
              {isEs ? "Historial de versiones y progreso" : "Version history and progress"}
            </p>
          </div>
        </div>

        <ol className="relative mt-12 space-y-8 border-l border-line pl-8" aria-label={isEs ? "Historial de versiones" : "Version history"}>
          {sorted.map((entry, index) => {
            const localized = changelogTextForLocale(entry, locale);
            const isLatest = index === 0;
            return (
              <li key={`${entry.version}-${entry.buildNumber ?? ""}`} className="relative">
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
                  {entry.buildNumber ? (
                    <span className="rounded-full border border-line bg-themed-mist px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-graphite">
                      {isEs ? `Build ${entry.buildNumber}` : `Build ${entry.buildNumber}`}
                    </span>
                  ) : null}
                  <span className="rounded-full border border-line bg-themed-mist px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-graphite">
                    {entry.releaseDate ?? (isLatest ? (isEs ? "Actual" : "Current") : "")}
                  </span>
                  {isLatest ? (
                    <span className="rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-brand-blue">
                      {isEs ? "Última versión" : "Latest"}
                    </span>
                  ) : null}
                  {localized.fallback ? (
                    <span className="rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                      {isEs ? `Disponible en ${localized.locale}` : `Available in ${localized.locale}`}
                    </span>
                  ) : null}
                </div>
                <RichNotes text={localized.text} />
                {entry.sourceUrl ? (
                  <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:underline">
                    {isEs ? "Ver ficha de App Store" : "View App Store listing"}
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
