"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, LoaderCircle, Vote } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { LandingSurvey } from "@/lib/types";

function getSessionId() {
  const key = "lb-landing-survey-session";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(key, next);
  return next;
}

export function LandingSurveyCard({ survey, es }: { survey: LandingSurvey; es: boolean }) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [sessionId, setSessionId] = useState("");
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, number>>(survey.results ?? {});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const id = getSessionId();
    // The browser-only vote/session marker is intentionally hydrated after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(id);
    const previousVote = window.localStorage.getItem(`lb-survey-vote:${survey.slug}`);
    if (previousVote) {
      setVotedOption(previousVote);
    }
  }, [survey.slug]);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase.rpc("get_landing_survey_results", { p_slug: survey.slug }).then(({ data }) => {
      if (!active || !data) return;
      const nextResults = Object.fromEntries(
        (data as Array<{ option_id: string; votes: number | string }>).map((row) => [row.option_id, Number(row.votes) || 0])
      );
      setResults(nextResults);
    });
    return () => { active = false; };
  }, [supabase, survey.slug]);

  const question = es ? survey.question : survey.question_en || survey.question;
  const description = es ? survey.description : survey.description_en || survey.description;
  const totalVotes = Object.values(results).reduce((total, count) => total + count, 0);

  async function vote(optionId: string) {
    if (!supabase || !sessionId || saving || votedOption) return;
    setSaving(true);
    const { error } = await supabase.from("landing_survey_responses").insert({
      survey_id: survey.id,
      option_id: optionId,
      session_id: sessionId,
      locale: es ? "es" : "en",
    });

    if (error && error.code !== "23505") {
      setMessage(es ? "No hemos podido guardar tu voto. Inténtalo de nuevo." : "We could not save your vote. Please try again.");
      setSaving(false);
      return;
    }

    const { data } = await supabase.rpc("get_landing_survey_results", { p_slug: survey.slug });
    const nextResults = Object.fromEntries(
      (data ?? []).map((row: { option_id: string; votes: number | string }) => [row.option_id, Number(row.votes) || 0])
    );
    setResults(nextResults);
    setVotedOption(optionId);
    window.localStorage.setItem(`lb-survey-vote:${survey.slug}`, optionId);
    setMessage(es ? "Gracias por participar." : "Thanks for taking part.");
    setSaving(false);
  }

  return (
    <article className="gradient-border-card overflow-hidden rounded-3xl p-6 shadow-card sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue"><Vote size={20} /></span>
        <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-graphite">{es ? "Encuesta" : "Poll"}</span>
      </div>
      <h3 className="mt-6 text-xl font-black tracking-tight text-ink">{question}</h3>
      {description ? <p className="mt-2 text-sm leading-6 text-graphite">{description}</p> : null}

      <div className="mt-6 grid gap-2.5">
        {survey.options.map((option) => {
          const label = es ? option.label : option.label_en || option.label;
          const count = results[option.id] ?? 0;
          const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          return (
            <button
              key={option.id}
              type="button"
              disabled={Boolean(votedOption) || saving}
              onClick={() => vote(option.id)}
              className="group relative overflow-hidden rounded-2xl border border-line bg-themed-mist px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-brand-blue/40 disabled:cursor-default disabled:hover:translate-y-0"
            >
              {votedOption ? <span className="absolute inset-y-0 left-0 bg-brand-blue/10 transition-all" style={{ width: `${percentage}%` }} aria-hidden="true" /> : null}
              <span className="relative flex items-center justify-between gap-3 text-sm font-bold text-ink">
                <span className="flex items-center gap-2">{votedOption === option.id ? <Check size={15} className="text-brand-green" /> : null}{label}</span>
                {votedOption ? <span className="text-xs font-black text-brand-blue">{percentage}%</span> : <span className="text-brand-blue transition-transform group-hover:translate-x-1">→</span>}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 min-h-5 text-xs font-semibold text-graphite" aria-live="polite">
        {saving ? <span className="inline-flex items-center gap-2"><LoaderCircle size={13} className="animate-spin" />{es ? "Guardando..." : "Saving..."}</span> : message || (votedOption ? `${totalVotes} ${es ? "votos" : "votes"}` : (es ? "Tu respuesta ayuda a priorizar el producto." : "Your answer helps prioritise the product."))}
      </p>
    </article>
  );
}

export function LandingSurveySection({ surveys, es }: { surveys: LandingSurvey[]; es: boolean }) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [liveSurveys, setLiveSurveys] = useState(surveys);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase
      .from("landing_surveys")
      .select("*")
      .eq("is_enabled", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (!active || !data) return;
        setLiveSurveys(data as LandingSurvey[]);
      });
    return () => { active = false; };
  }, [supabase]);

  if (liveSurveys.length === 0) return null;
  return (
    <section className="section border-y border-line bg-themed-mist">
      <div className="container">
        <div className="max-w-2xl">
          <span className="text-xs font-black uppercase tracking-[.28em] text-brand-blue">{es ? "Participa" : "Take part"}</span>
          <h2 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-[-.045em] text-ink sm:text-6xl">{es ? "Ayuda a decidir qué construimos después." : "Help decide what we build next."}</h2>
          <p className="mt-5 text-base leading-8 text-graphite">{es ? "Una señal rápida de la comunidad nos ayuda a priorizar mejoras útiles, no ruido." : "A quick signal from the community helps us prioritise useful improvements, not noise."}</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {liveSurveys.map((survey) => <LandingSurveyCard key={survey.id} survey={survey} es={es} />)}
        </div>
      </div>
    </section>
  );
}
