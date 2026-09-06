"use client";

import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Edit3, Eye, EyeOff, Megaphone, Plus, Save, Sparkles, Trash2, X } from "lucide-react";
import type { LandingAnnouncement, LandingSurveyOption } from "@/lib/types";

type AnnouncementForm = Omit<LandingAnnouncement, "id" | "is_enabled" | "sort_order"> & {
  is_enabled: boolean;
  sort_order: number;
};
type SurveyRow = { id: string; slug: string; question: string; question_en?: string; description?: string; description_en?: string; options: LandingSurveyOption[]; is_enabled: boolean; sort_order: number };
type SurveyForm = Omit<SurveyRow, "id" | "options" | "is_enabled" | "sort_order"> & { optionsText: string; is_enabled: boolean; sort_order: number };

const emptyAnnouncement: AnnouncementForm = {
  slug: "",
  kind: "announcement",
  placement: "rail",
  accent: "blue",
  eyebrow: "",
  eyebrow_en: "",
  title: "",
  title_en: "",
  body: "",
  body_en: "",
  cta_label: "",
  cta_label_en: "",
  cta_url: "",
  image_url: "",
  is_enabled: true,
  starts_at: null,
  ends_at: null,
  sort_order: 0,
};

const emptySurvey: SurveyForm = {
  slug: "",
  question: "",
  question_en: "",
  description: "",
  description_en: "",
  optionsText: "",
  is_enabled: true,
  sort_order: 0,
};

function localDateValue(value?: string | null) {
  return value ? value.slice(0, 16) : "";
}

function isoDateValue(value: string) {
  return value ? new Date(value).toISOString() : null;
}

function optionId(label: string, index: number) {
  const normalized = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return normalized || `option-${index + 1}`;
}

function inputClass() {
  return "rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30";
}

function textareaClass() {
  return `${inputClass()} min-h-20 resize-y`;
}

export function LandingEngagementAdmin({ supabase, canEdit }: { supabase: SupabaseClient; canEdit: boolean }) {
  const [announcements, setAnnouncements] = useState<LandingAnnouncement[]>([]);
  const [surveys, setSurveys] = useState<SurveyRow[]>([]);
  const [announcementForm, setAnnouncementForm] = useState<AnnouncementForm>(emptyAnnouncement);
  const [surveyForm, setSurveyForm] = useState<SurveyForm>(emptySurvey);
  const [editingAnnouncement, setEditingAnnouncement] = useState<string | null>(null);
  const [editingSurvey, setEditingSurvey] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const load = useCallback(async () => {
    const [announcementResult, surveyResult] = await Promise.all([
      supabase.from("landing_announcements").select("*").order("sort_order", { ascending: true }),
      supabase.from("landing_surveys").select("*").order("sort_order", { ascending: true }),
    ]);
    setAnnouncements((announcementResult.data ?? []) as LandingAnnouncement[]);
    setSurveys((surveyResult.data ?? []) as SurveyRow[]);
  }, [supabase]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  async function saveAnnouncement() {
    if (!canEdit || !announcementForm.slug || !announcementForm.title || !announcementForm.body) return;
    const payload = {
      ...announcementForm,
      starts_at: isoDateValue(announcementForm.starts_at || ""),
      ends_at: isoDateValue(announcementForm.ends_at || ""),
      updated_at: new Date().toISOString(),
    };
    const result = editingAnnouncement
      ? await supabase.from("landing_announcements").update(payload).eq("id", editingAnnouncement)
      : await supabase.from("landing_announcements").insert(payload);
    setStatus(result.error ? `Error: ${result.error.message}` : "✓ Anuncio guardado");
    if (!result.error) {
      setAnnouncementForm(emptyAnnouncement);
      setEditingAnnouncement(null);
      load();
    }
  }

  async function saveSurvey() {
    if (!canEdit || !surveyForm.slug || !surveyForm.question) return;
    const options = surveyForm.optionsText.split("\n").map((line, index) => {
      const [label, label_en] = line.split("|").map((part) => part.trim());
      return { id: optionId(label, index), label, label_en: label_en || undefined };
    }).filter((option) => option.label);
    if (options.length < 2 || options.length > 6) {
      setStatus("La encuesta necesita entre 2 y 6 opciones, una por línea. Puedes usar ES | EN.");
      return;
    }
    const payload = { ...surveyForm, options, updated_at: new Date().toISOString() };
    delete (payload as Partial<typeof payload>).optionsText;
    const result = editingSurvey
      ? await supabase.from("landing_surveys").update(payload).eq("id", editingSurvey)
      : await supabase.from("landing_surveys").insert(payload);
    setStatus(result.error ? `Error: ${result.error.message}` : "✓ Encuesta guardada");
    if (!result.error) {
      setSurveyForm(emptySurvey);
      setEditingSurvey(null);
      load();
    }
  }

  async function remove(table: "landing_announcements" | "landing_surveys", id: string) {
    if (!canEdit || !window.confirm("¿Eliminar este elemento?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    setStatus(error ? `Error: ${error.message}` : "✓ Elemento eliminado");
    if (!error) load();
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]"><Megaphone size={21} /></div>
          <div>
            <h2 className="text-xl font-bold text-[var(--color-ink)]">Anuncios y encuestas</h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-graphite)]">Campañas, novedades y preguntas de comunidad con fecha, idioma, CTA y publicación instantánea.</p>
          </div>
        </div>
      </div>

      {status ? <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">{status}</div> : null}

      {canEdit ? (
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between gap-3"><h3 className="text-sm font-bold text-[var(--color-ink)]">{editingAnnouncement ? "Editar anuncio" : "Nuevo anuncio"}</h3><Sparkles size={16} className="text-[var(--color-brand-blue)]" /></div>
            <div className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Slug<input className={inputClass()} value={announcementForm.slug} onChange={(e) => setAnnouncementForm((f) => ({ ...f, slug: e.target.value }))} placeholder="lanzamiento-vitalspath" /></label>
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Tipo<select className={inputClass()} value={announcementForm.kind} onChange={(e) => setAnnouncementForm((f) => ({ ...f, kind: e.target.value as AnnouncementForm["kind"] }))}><option value="announcement">Novedad</option><option value="ad">Promoción / anuncio</option></select></label>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Título ES<input className={inputClass()} value={announcementForm.title} onChange={(e) => setAnnouncementForm((f) => ({ ...f, title: e.target.value }))} /></label>
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Título EN<input className={inputClass()} value={announcementForm.title_en ?? ""} onChange={(e) => setAnnouncementForm((f) => ({ ...f, title_en: e.target.value }))} /></label>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Texto ES<textarea className={textareaClass()} value={announcementForm.body} onChange={(e) => setAnnouncementForm((f) => ({ ...f, body: e.target.value }))} /></label>
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Texto EN<textarea className={textareaClass()} value={announcementForm.body_en ?? ""} onChange={(e) => setAnnouncementForm((f) => ({ ...f, body_en: e.target.value }))} /></label>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">CTA<input className={inputClass()} value={announcementForm.cta_label ?? ""} onChange={(e) => setAnnouncementForm((f) => ({ ...f, cta_label: e.target.value }))} /></label>
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">URL CTA<input className={inputClass()} value={announcementForm.cta_url ?? ""} onChange={(e) => setAnnouncementForm((f) => ({ ...f, cta_url: e.target.value }))} placeholder="/es/productos o https://..." /></label>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Ubicación<select className={inputClass()} value={announcementForm.placement} onChange={(e) => setAnnouncementForm((f) => ({ ...f, placement: e.target.value as AnnouncementForm["placement"] }))}><option value="rail">Rail de novedades</option></select></label>
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Color<select className={inputClass()} value={announcementForm.accent} onChange={(e) => setAnnouncementForm((f) => ({ ...f, accent: e.target.value as AnnouncementForm["accent"] }))}><option value="blue">Azul</option><option value="cyan">Cian</option><option value="green">Verde</option><option value="amber">Ámbar</option></select></label>
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Orden<input type="number" className={inputClass()} value={announcementForm.sort_order} onChange={(e) => setAnnouncementForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} /></label>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Desde<input type="datetime-local" className={inputClass()} value={localDateValue(announcementForm.starts_at)} onChange={(e) => setAnnouncementForm((f) => ({ ...f, starts_at: e.target.value }))} /></label>
                <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Hasta<input type="datetime-local" className={inputClass()} value={localDateValue(announcementForm.ends_at)} onChange={(e) => setAnnouncementForm((f) => ({ ...f, ends_at: e.target.value }))} /></label>
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)]"><input type="checkbox" checked={announcementForm.is_enabled} onChange={(e) => setAnnouncementForm((f) => ({ ...f, is_enabled: e.target.checked }))} /> Publicado ahora</label>
              <div className="flex gap-3"><button onClick={saveAnnouncement} type="button" className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"><Save size={14} />{editingAnnouncement ? "Actualizar" : "Publicar"}</button>{editingAnnouncement ? <button onClick={() => { setAnnouncementForm(emptyAnnouncement); setEditingAnnouncement(null); }} type="button" className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)]"><X size={14} />Cancelar</button> : null}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between gap-3"><h3 className="text-sm font-bold text-[var(--color-ink)]">{editingSurvey ? "Editar encuesta" : "Nueva encuesta"}</h3><span className="text-xs font-bold text-[var(--color-graphite)]">2–6 opciones</span></div>
            <div className="grid gap-3">
              <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Slug<input className={inputClass()} value={surveyForm.slug} onChange={(e) => setSurveyForm((f) => ({ ...f, slug: e.target.value }))} placeholder="siguiente-funcion" /></label>
              <div className="grid gap-3 sm:grid-cols-2"><label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Pregunta ES<textarea className={textareaClass()} value={surveyForm.question} onChange={(e) => setSurveyForm((f) => ({ ...f, question: e.target.value }))} /></label><label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Pregunta EN<textarea className={textareaClass()} value={surveyForm.question_en ?? ""} onChange={(e) => setSurveyForm((f) => ({ ...f, question_en: e.target.value }))} /></label></div>
              <div className="grid gap-3 sm:grid-cols-2"><label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Descripción ES<textarea className={textareaClass()} value={surveyForm.description ?? ""} onChange={(e) => setSurveyForm((f) => ({ ...f, description: e.target.value }))} /></label><label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Descripción EN<textarea className={textareaClass()} value={surveyForm.description_en ?? ""} onChange={(e) => setSurveyForm((f) => ({ ...f, description_en: e.target.value }))} /></label></div>
              <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Opciones<textarea className={`${textareaClass()} min-h-32`} value={surveyForm.optionsText} onChange={(e) => setSurveyForm((f) => ({ ...f, optionsText: e.target.value }))} placeholder={"Una opción por línea\nOtra opción | Another option"} /></label>
              <div className="grid gap-3 sm:grid-cols-2"><label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Orden<input type="number" className={inputClass()} value={surveyForm.sort_order} onChange={(e) => setSurveyForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} /></label><label className="flex items-center gap-2 self-end pb-3 text-xs font-semibold text-[var(--color-ink)]"><input type="checkbox" checked={surveyForm.is_enabled} onChange={(e) => setSurveyForm((f) => ({ ...f, is_enabled: e.target.checked }))} /> Publicada ahora</label></div>
              <div className="flex gap-3"><button onClick={saveSurvey} type="button" className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"><Save size={14} />{editingSurvey ? "Actualizar" : "Publicar"}</button>{editingSurvey ? <button onClick={() => { setSurveyForm(emptySurvey); setEditingSurvey(null); }} type="button" className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)]"><X size={14} />Cancelar</button> : null}</div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="grid gap-3">
          <h3 className="text-sm font-bold text-[var(--color-ink)]">Anuncios guardados ({announcements.length})</h3>
          {announcements.map((item) => <div key={item.id} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft"><div className="flex items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.is_enabled ? "bg-green-500/10 text-green-600" : "bg-[var(--color-line)] text-[var(--color-graphite)]"}`}>{item.is_enabled ? <Eye size={10} /> : <EyeOff size={10} />}{item.is_enabled ? "Activo" : "Oculto"}</span><span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-graphite)]">{item.kind}</span></div><h4 className="mt-2 font-bold text-[var(--color-ink)]">{item.title}</h4><p className="mt-1 text-xs leading-5 text-[var(--color-graphite)]">{item.body}</p></div>{canEdit ? <div className="flex gap-1"><button type="button" className="rounded-lg p-1.5 text-[var(--color-graphite)] hover:bg-[var(--color-bg)]" onClick={() => { setAnnouncementForm({ ...item }); setEditingAnnouncement(item.id); }}><Edit3 size={14} /></button><button type="button" className="rounded-lg p-1.5 text-[var(--color-graphite)] hover:bg-red-500/10 hover:text-red-500" onClick={() => remove("landing_announcements", item.id)}><Trash2 size={14} /></button></div> : null}</div></div>)}
        </div>
        <div className="grid gap-3">
          <h3 className="text-sm font-bold text-[var(--color-ink)]">Encuestas guardadas ({surveys.length})</h3>
          {surveys.map((item) => <div key={item.id} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft"><div className="flex items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.is_enabled ? "bg-green-500/10 text-green-600" : "bg-[var(--color-line)] text-[var(--color-graphite)]"}`}>{item.is_enabled ? <Eye size={10} /> : <EyeOff size={10} />}{item.is_enabled ? "Activa" : "Oculta"}</span><span className="text-xs text-[var(--color-graphite)]">{item.options.length} opciones</span></div><h4 className="mt-2 font-bold text-[var(--color-ink)]">{item.question}</h4></div>{canEdit ? <div className="flex gap-1"><button type="button" className="rounded-lg p-1.5 text-[var(--color-graphite)] hover:bg-[var(--color-bg)]" onClick={() => { setSurveyForm({ slug: item.slug, question: item.question, question_en: item.question_en ?? "", description: item.description ?? "", description_en: item.description_en ?? "", optionsText: item.options.map((option) => `${option.label}${option.label_en ? ` | ${option.label_en}` : ""}`).join("\n"), is_enabled: item.is_enabled, sort_order: item.sort_order }); setEditingSurvey(item.id); }}><Edit3 size={14} /></button><button type="button" className="rounded-lg p-1.5 text-[var(--color-graphite)] hover:bg-red-500/10 hover:text-red-500" onClick={() => remove("landing_surveys", item.id)}><Trash2 size={14} /></button></div> : null}</div></div>)}
        </div>
      </div>
    </div>
  );
}
