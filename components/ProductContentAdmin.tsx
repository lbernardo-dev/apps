"use client";

import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { FileText, HelpCircle, Plus, Save, Trash2 } from "lucide-react";

type ProductRow = { id: string; slug: string; name: string };
type GuideRow = {
  id?: string;
  app_id: string;
  section_key: string;
  title: string;
  title_en: string;
  body: string;
  body_en: string;
  sort_order: number;
};
type FaqRow = {
  id?: string;
  app_id: string;
  question: string;
  question_en: string;
  answer: string;
  answer_en: string;
  sort_order: number;
  is_enabled: boolean;
};
type LegalKind = "privacy" | "terms" | "subscriptions";
type LegalRow = {
  id?: string;
  app_id: string;
  kind: LegalKind;
  title: string;
  title_en: string;
  body: string;
  body_en: string;
  updated_at?: string;
};
type ChangelogRow = {
  id?: string;
  app_slug: string;
  version: string;
  build_number: string;
  release_date: string;
  release_notes: string;
  release_notes_en: string;
  is_current: boolean;
};

type Tab = "guide" | "faq" | "legal" | "changelog";

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "guide", label: "Guía y tutoriales" },
  { id: "faq", label: "Preguntas frecuentes" },
  { id: "legal", label: "Legal y privacidad" },
  { id: "changelog", label: "Novedades" },
];

const emptyGuide = (appId: string): GuideRow => ({
  app_id: appId, section_key: "", title: "", title_en: "", body: "", body_en: "", sort_order: 10
});
const emptyFaq = (appId: string): FaqRow => ({
  app_id: appId, question: "", question_en: "", answer: "", answer_en: "", sort_order: 10, is_enabled: true
});
const emptyChangelog = (slug: string): ChangelogRow => ({
  app_slug: slug, version: "", build_number: "", release_date: new Date().toISOString().slice(0, 10),
  release_notes: "", release_notes_en: "", is_current: false
});
const legalKinds: Array<{ id: LegalKind; label: string }> = [
  { id: "privacy", label: "Privacidad" },
  { id: "terms", label: "Términos" },
  { id: "subscriptions", label: "Suscripciones" },
];

export function ProductContentAdmin({ supabase, canEdit }: { supabase: SupabaseClient; canEdit: boolean }) {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [appId, setAppId] = useState("");
  const [tab, setTab] = useState<Tab>("guide");
  const [sections, setSections] = useState<GuideRow[]>([]);
  const [faqs, setFaqs] = useState<FaqRow[]>([]);
  const [legal, setLegal] = useState<LegalRow[]>([]);
  const [changelog, setChangelog] = useState<ChangelogRow[]>([]);
  const [legalKind, setLegalKind] = useState<LegalKind>("privacy");
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);

  const report = (message: string, failed = false) => {
    setStatus(message);
    setIsError(failed);
  };

  const loadProducts = useCallback(async () => {
    const { data, error } = await supabase.from("apps").select("id, slug, name").order("name");
    if (error) {
      report(`No se pudieron cargar las apps: ${error.message}`, true);
      return;
    }
    const next = (data ?? []) as ProductRow[];
    setProducts(next);
    setAppId((current) => current || next[0]?.id || "");
  }, [supabase]);

  const loadContent = useCallback(async () => {
    const product = products.find((item) => item.id === appId);
    if (!product) return;
    const [sectionsResult, faqResult, legalResult, changelogResult] = await Promise.all([
      supabase.from("app_sections").select("*").eq("app_id", appId).order("sort_order"),
      supabase.from("app_faqs").select("*").eq("app_id", appId).order("sort_order"),
      supabase.from("app_legal_pages").select("*").eq("app_id", appId),
      supabase.from("app_changelog").select("*").eq("app_slug", product.slug).order("release_date", { ascending: false })
    ]);
    const failure = sectionsResult.error || faqResult.error || legalResult.error || changelogResult.error;
    if (failure) {
      report(`No se pudo cargar el contenido: ${failure.message}`, true);
      return;
    }
    const guideRows = (sectionsResult.data ?? []).map((row) => ({
      id: row.id, app_id: appId, section_key: row.section_key ?? "", title: row.title, title_en: row.title_en ?? "",
      body: row.body, body_en: row.body_en ?? "", sort_order: row.sort_order ?? 0
    }));
    const keyedGuideRows = guideRows.filter((row) => row.section_key);
    setSections(product.slug === "vitalspath" && keyedGuideRows.length ? keyedGuideRows : guideRows);
    setFaqs((faqResult.data ?? []).map((row) => ({
      id: row.id, app_id: appId, question: row.question, question_en: row.question_en ?? "",
      answer: row.answer, answer_en: row.answer_en ?? "", sort_order: row.sort_order ?? 0,
      is_enabled: row.is_enabled !== false
    })));
    setLegal((legalResult.data ?? []).filter((row) => legalKinds.some((kind) => kind.id === row.kind)).map((row) => ({
      id: row.id, app_id: appId, kind: row.kind, title: row.title, title_en: row.title_en ?? "",
      body: row.body, body_en: row.body_en ?? "", updated_at: row.updated_at
    })));
    setChangelog((changelogResult.data ?? []).map((row) => ({
      id: row.id, app_slug: product.slug, version: row.version, build_number: row.build_number ?? "",
      release_date: row.release_date ?? "", release_notes: row.release_notes ?? "",
      release_notes_en: row.release_notes_en ?? "", is_current: Boolean(row.is_current)
    })));
    report("");
  }, [appId, products, supabase]);

  // The loaders update state only after their asynchronous Supabase requests resolve.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadProducts(); }, [loadProducts]);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadContent(); }, [loadContent]);

  const saveGuide = async (row: GuideRow) => {
    if (!canEdit || !appId) return;
    if (!row.section_key.trim()) return report("La clave de sección es obligatoria para crear un ancla estable.", true);
    setSaving(row.id ?? `guide-${row.section_key}`);
    const payload = { ...row, section_key: row.section_key.trim(), updated_at: new Date().toISOString() };
    const result = row.id
      ? await supabase.from("app_sections").update(payload).eq("id", row.id)
      : await supabase.from("app_sections").insert(payload);
    setSaving(null);
    if (result.error) return report(`Error al guardar la guía: ${result.error.message}`, true);
    report("Sección de guía guardada. El HTML público necesita una nueva compilación y despliegue.");
    await loadContent();
  };

  const deleteGuide = async (row: GuideRow) => {
    if (!canEdit || !row.id) return;
    const { error } = await supabase.from("app_sections").delete().eq("id", row.id);
    if (error) return report(`Error al borrar la sección: ${error.message}`, true);
    setSections((current) => current.filter((item) => item.id !== row.id));
    report("Sección eliminada. El HTML público necesita una nueva compilación y despliegue.");
  };

  const saveFaq = async (row: FaqRow) => {
    if (!canEdit || !appId) return;
    setSaving(row.id ?? "faq-new");
    const result = row.id
      ? await supabase.from("app_faqs").update({ ...row, updated_at: new Date().toISOString() }).eq("id", row.id)
      : await supabase.from("app_faqs").insert({ ...row, updated_at: new Date().toISOString() });
    setSaving(null);
    if (result.error) return report(`Error al guardar la FAQ: ${result.error.message}`, true);
    report("Pregunta guardada. El HTML público necesita una nueva compilación y despliegue.");
    await loadContent();
  };

  const deleteFaq = async (row: FaqRow) => {
    if (!canEdit || !row.id) return;
    const { error } = await supabase.from("app_faqs").delete().eq("id", row.id);
    if (error) return report(`Error al borrar la FAQ: ${error.message}`, true);
    setFaqs((current) => current.filter((item) => item.id !== row.id));
    report("Pregunta eliminada. El HTML público necesita una nueva compilación y despliegue.");
  };

  const selectedLegal = legal.find((row) => row.kind === legalKind) ?? {
    app_id: appId, kind: legalKind, title: "", title_en: "", body: "", body_en: ""
  };

  const saveLegal = async () => {
    if (!canEdit || !appId) return;
    setSaving("legal");
    const payload = { ...selectedLegal, app_id: appId, kind: legalKind, updated_at: new Date().toISOString() };
    const { error } = await supabase.from("app_legal_pages").upsert(payload, { onConflict: "app_id,kind" });
    setSaving(null);
    if (error) return report(`Error al guardar el documento: ${error.message}`, true);
    report("Documento guardado. El HTML público necesita una nueva compilación y despliegue.");
    await loadContent();
  };

  const saveChangelog = async (row: ChangelogRow) => {
    if (!canEdit || !row.app_slug || !row.version.trim()) return;
    setSaving(row.id ?? `changelog-${row.version}`);
    const payload = {
      ...row, version: row.version.trim(), build_number: row.build_number || null,
      release_date: row.release_date || null, updated_at: new Date().toISOString()
    };
    const result = row.id
      ? await supabase.from("app_changelog").update(payload).eq("id", row.id)
      : await supabase.from("app_changelog").upsert(payload, { onConflict: "app_slug,version" });
    if (result.error) {
      setSaving(null);
      return report(`Error al guardar las novedades: ${result.error.message}`, true);
    }
    if (row.is_current) {
      const clearCurrent = await supabase.from("app_changelog").update({ is_current: false }).eq("app_slug", row.app_slug).neq("version", row.version);
      if (clearCurrent.error) {
        setSaving(null);
        return report(`Error al cambiar la versión actual: ${clearCurrent.error.message}`, true);
      }
      const setCurrent = await supabase.from("app_changelog").update({ is_current: true }).eq("app_slug", row.app_slug).eq("version", row.version);
      if (setCurrent.error) {
        setSaving(null);
        return report(`Error al marcar la versión actual: ${setCurrent.error.message}`, true);
      }
    }
    setSaving(null);
    report("Novedades guardadas. La cronología puede actualizarse en vivo; las páginas estáticas reflejan el resto al desplegar.");
    await loadContent();
  };

  const deleteChangelog = async (row: ChangelogRow) => {
    if (!canEdit || !row.id) return;
    const { error } = await supabase.from("app_changelog").delete().eq("id", row.id);
    if (error) return report(`Error al borrar la versión: ${error.message}`, true);
    setChangelog((current) => current.filter((item) => item.id !== row.id));
    report("Versión eliminada.");
  };

  const updateSection = (index: number, field: keyof GuideRow, value: string | number) => {
    setSections((current) => current.map((row, i) => i === index ? { ...row, [field]: value } : row));
  };
  const updateFaq = (index: number, field: keyof FaqRow, value: string | number | boolean) => {
    setFaqs((current) => current.map((row, i) => i === index ? { ...row, [field]: value } : row));
  };
  const updateChangelog = (index: number, field: keyof ChangelogRow, value: string | boolean) => {
    setChangelog((current) => current.map((row, i) => i === index ? { ...row, [field]: value } : row));
  };

  const inputClass = "w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 disabled:opacity-60";
  const textClass = `${inputClass} min-h-28 resize-y`;
  const field = (label: string, value: string, onChange: (value: string) => void, multiline = false) => (
    <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
      {label}
      {multiline
        ? <textarea className={textClass} value={value} onChange={(event) => onChange(event.target.value)} disabled={!canEdit} />
        : <input className={inputClass} value={value} onChange={(event) => onChange(event.target.value)} disabled={!canEdit} />}
    </label>
  );

  return (
    <section className="grid gap-5" aria-labelledby="product-content-title">
      <header className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <h2 id="product-content-title" className="text-xl font-bold text-[var(--color-ink)]">Contenido y ayuda de cada app</h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-[var(--color-graphite)]">
          Administra guías, FAQ, documentos legales y notas de versión en español e inglés. Guías, FAQ y textos legales forman parte de la exportación estática y requieren un nuevo build y despliegue; el timeline de novedades puede leer cambios en vivo.
        </p>
        <label className="mt-4 grid max-w-lg gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
          Producto
          <select className={inputClass} value={appId} onChange={(event) => setAppId(event.target.value)} aria-label="Seleccionar producto">
            {products.map((product) => <option key={product.id} value={product.id}>{product.name} · /{product.slug}</option>)}
          </select>
        </label>
      </header>

      {status && <p role={isError ? "alert" : "status"} className={`rounded-lg border px-4 py-3 text-sm ${isError ? "border-red-500/20 bg-red-500/10 text-red-600" : "border-green-500/20 bg-green-500/10 text-green-700"}`}>{status}</p>}

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tipos de contenido del producto">
        {tabs.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} onClick={() => setTab(item.id)}
            className={`min-h-11 rounded-lg border px-4 py-2 text-sm font-bold ${tab === item.id ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] text-white" : "border-[var(--color-line)] bg-[var(--color-card)] text-[var(--color-graphite)]"}`}>
            {item.label}
          </button>
        ))}
      </div>

      {tab === "guide" && (
        <div className="grid gap-4">
          {sections.map((row, index) => (
            <article key={row.id ?? `new-${index}`} className="grid gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft">
              <div className="grid gap-3 sm:grid-cols-3">
                {field("Clave de sección (ancla)", row.section_key, (value) => updateSection(index, "section_key", value))}
                {field("Título · Español", row.title, (value) => updateSection(index, "title", value))}
                {field("Title · English", row.title_en, (value) => updateSection(index, "title_en", value))}
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                {field("Contenido · Español", row.body, (value) => updateSection(index, "body", value), true)}
                {field("Content · English", row.body_en, (value) => updateSection(index, "body_en", value), true)}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {field("Orden", String(row.sort_order), (value) => updateSection(index, "sort_order", Number(value) || 0))}
                <button type="button" onClick={() => void saveGuide(row)} disabled={!canEdit || saving === (row.id ?? `guide-${row.section_key}`)} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 text-sm font-bold text-white disabled:opacity-50"><Save size={14} /> Guardar</button>
                {row.id && <button type="button" onClick={() => void deleteGuide(row)} disabled={!canEdit} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-red-500/30 px-4 text-sm font-bold text-red-600 disabled:opacity-50"><Trash2 size={14} /> Borrar</button>}
              </div>
            </article>
          ))}
          <button type="button" disabled={!canEdit || !appId} onClick={() => setSections((current) => [...current, emptyGuide(appId)])} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--color-line)] text-sm font-bold text-[var(--color-brand-blue)] disabled:opacity-50"><Plus size={15} /> Añadir sección de guía</button>
        </div>
      )}

      {tab === "faq" && (
        <div className="grid gap-4">
          {faqs.map((row, index) => (
            <article key={row.id ?? `new-${index}`} className="grid gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft">
              <div className="grid gap-3 lg:grid-cols-2">
                {field("Pregunta · Español", row.question, (value) => updateFaq(index, "question", value))}
                {field("Question · English", row.question_en, (value) => updateFaq(index, "question_en", value))}
                {field("Respuesta · Español", row.answer, (value) => updateFaq(index, "answer", value), true)}
                {field("Answer · English", row.answer_en, (value) => updateFaq(index, "answer_en", value), true)}
              </div>
              <div className="flex flex-wrap gap-3">
                {field("Orden", String(row.sort_order), (value) => updateFaq(index, "sort_order", Number(value) || 0))}
                <label className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-ink)]"><input type="checkbox" checked={row.is_enabled} onChange={(event) => updateFaq(index, "is_enabled", event.target.checked)} disabled={!canEdit} /> Publicada</label>
                <button type="button" onClick={() => void saveFaq(row)} disabled={!canEdit || saving === (row.id ?? "faq-new")} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 text-sm font-bold text-white disabled:opacity-50"><Save size={14} /> Guardar FAQ</button>
                {row.id && <button type="button" onClick={() => void deleteFaq(row)} disabled={!canEdit} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-red-500/30 px-4 text-sm font-bold text-red-600 disabled:opacity-50"><Trash2 size={14} /> Borrar</button>}
              </div>
            </article>
          ))}
          <button type="button" disabled={!canEdit || !appId} onClick={() => setFaqs((current) => [...current, emptyFaq(appId)])} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--color-line)] text-sm font-bold text-[var(--color-brand-blue)] disabled:opacity-50"><Plus size={15} /> Añadir pregunta</button>
        </div>
      )}

      {tab === "legal" && (
        <article className="grid gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <label className="grid min-w-56 gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Documento
              <select className={inputClass} value={legalKind} onChange={(event) => setLegalKind(event.target.value as LegalKind)}>
                {legalKinds.map((kind) => <option key={kind.id} value={kind.id}>{kind.label}</option>)}
              </select>
            </label>
            <p className="text-xs text-[var(--color-graphite)]"><FileText size={14} className="mr-1 inline" /> Actualización: {selectedLegal.updated_at?.slice(0, 10) ?? "nuevo documento"}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {field("Título · Español", selectedLegal.title, (value) => setLegal((current) => [...current.filter((row) => row.kind !== legalKind), { ...selectedLegal, title: value }]))}
            {field("Title · English", selectedLegal.title_en, (value) => setLegal((current) => [...current.filter((row) => row.kind !== legalKind), { ...selectedLegal, title_en: value }]))}
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {field("Documento · Español (una línea por párrafo; ## crea un encabezado)", selectedLegal.body, (value) => setLegal((current) => [...current.filter((row) => row.kind !== legalKind), { ...selectedLegal, body: value }]), true)}
            {field("Document · English", selectedLegal.body_en, (value) => setLegal((current) => [...current.filter((row) => row.kind !== legalKind), { ...selectedLegal, body_en: value }]), true)}
          </div>
          <button type="button" onClick={() => void saveLegal()} disabled={!canEdit || saving === "legal"} className="inline-flex min-h-10 w-fit items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 text-sm font-bold text-white disabled:opacity-50"><Save size={14} /> Guardar documento</button>
        </article>
      )}

      {tab === "changelog" && (
        <div className="grid gap-4">
          {changelog.map((row, index) => (
            <article key={row.id ?? `new-${index}`} className="grid gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft">
              <div className="grid gap-3 sm:grid-cols-4">
                {field("Versión", row.version, (value) => updateChangelog(index, "version", value))}
                {field("Build", row.build_number, (value) => updateChangelog(index, "build_number", value))}
                {field("Fecha", row.release_date, (value) => updateChangelog(index, "release_date", value))}
                <label className="flex items-center gap-2 text-xs font-bold text-[var(--color-ink)]"><input type="checkbox" checked={row.is_current} onChange={(event) => updateChangelog(index, "is_current", event.target.checked)} disabled={!canEdit} /> Versión actual</label>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                {field("Notas · Español", row.release_notes, (value) => updateChangelog(index, "release_notes", value), true)}
                {field("Release notes · English", row.release_notes_en, (value) => updateChangelog(index, "release_notes_en", value), true)}
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => void saveChangelog(row)} disabled={!canEdit || saving === (row.id ?? `changelog-${row.version}`)} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 text-sm font-bold text-white disabled:opacity-50"><Save size={14} /> Guardar versión</button>
                {row.id && <button type="button" onClick={() => void deleteChangelog(row)} disabled={!canEdit} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-red-500/30 px-4 text-sm font-bold text-red-600 disabled:opacity-50"><Trash2 size={14} /> Borrar</button>}
              </div>
            </article>
          ))}
          <button type="button" disabled={!canEdit || !appId} onClick={() => {
            const product = products.find((item) => item.id === appId);
            if (product) setChangelog((current) => [emptyChangelog(product.slug), ...current]);
          }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--color-line)] text-sm font-bold text-[var(--color-brand-blue)] disabled:opacity-50"><Plus size={15} /> Añadir versión</button>
        </div>
      )}

      {!canEdit && <p className="rounded-lg bg-amber-500/10 p-4 text-sm text-amber-700"><HelpCircle size={15} className="mr-1 inline" /> Tu cuenta puede consultar el contenido, pero no tiene permiso para guardarlo.</p>}
    </section>
  );
}
