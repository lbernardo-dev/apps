"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Award, BriefcaseBusiness, GraduationCap, Languages, MapPin, RefreshCw, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { fallbackAboutProfile, type AboutProfile } from "@/lib/about-profile";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/site";
import { getStaticPath } from "@/lib/routes";

function formatDate(value?: string) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("es", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}

export function AboutProfileView({ initialProfile }: { initialProfile?: AboutProfile }) {
  const { locale } = useLocale();
  const [profile, setProfile] = useState<AboutProfile>(initialProfile || fallbackAboutProfile);
  const [source, setSource] = useState<"database" | "fallback">(initialProfile ? "database" : "fallback");
  const [certFilter, setCertFilter] = useState<"all" | "salesforce" | "other">("all");

  useEffect(() => {
    if (initialProfile) return;

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      return;
    }

    supabase
      .from("about_profiles")
      .select("*")
      .eq("slug", "lester-romero-bernardo")
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile(data as AboutProfile);
          setSource("database");
        }
      });
  }, [initialProfile]);

  const updatedAt = formatDate(profile.updated_at);
  const isEn = locale === "en";

  const headline = (isEn && profile.headline_en) ? profile.headline_en : profile.headline;
  const education = (isEn && profile.education_en) ? profile.education_en : profile.education;
  const summary = (isEn && profile.summary_en) ? profile.summary_en : profile.summary;

  return (
    <>
      <section className="overflow-hidden border-b border-line bg-themed-white">
        <div className="container grid min-h-[calc(100vh-64px)] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">{isEn ? "About" : "Sobre mí"}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
              {profile.full_name}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-graphite">{headline}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-graphite">
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2">
                <MapPin aria-hidden="true" size={16} />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2">
                <BriefcaseBusiness aria-hidden="true" size={16} />
                {profile.current_company}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2">
                <GraduationCap aria-hidden="true" size={16} />
                {education}
              </span>
            </div>
            <p className="mt-7 max-w-3xl text-base leading-8 text-graphite">{summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={getStaticPath("contact", locale)}>{isEn ? "Discuss a project" : "Plantear un proyecto"}</ButtonLink>
              <ButtonLink href={profile.linkedin_url} variant="secondary">
                {isEn ? "View LinkedIn" : "Ver LinkedIn"}
              </ButtonLink>
            </div>
          </div>

          <aside className="relative">
            <div className="absolute inset-x-10 bottom-0 h-36 rounded-full bg-brand-green/20 blur-3xl" />
            <div className="relative rounded-lg border border-line bg-themed-mist p-6 shadow-sm">
              <div className="flex items-center gap-5">
                {profile.image_url ? (
                  <Image
                    alt={profile.full_name}
                    className="size-28 rounded-full border-4 border-white object-cover shadow-sm"
                    height={112}
                    src={getAssetPath(profile.image_url)}
                    unoptimized
                    width={112}
                  />
                ) : (
                  <div className="grid size-28 place-items-center rounded-full bg-brand-blue text-3xl font-semibold text-white">
                    {profile.full_name.slice(0, 1)}
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-semibold text-ink">{profile.full_name}</h2>
                  <p className="mt-2 text-sm leading-6 text-graphite">{profile.current_company}</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {profile.metrics.map((metric) => (
                  <div className="rounded-lg border border-line bg-themed-card p-4" key={metric.label}>
                    <p className="text-3xl font-semibold tracking-tight text-ink">{metric.value}</p>
                    <p className="mt-1 text-sm leading-5 text-graphite">{metric.label}</p>
                  </div>
                ))}
                {profile.trailhead_stats && (
                  <a
                    href={profile.trailhead_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 rounded-lg border border-line bg-themed-card/50 hover:bg-themed-card p-4 flex items-center justify-between transition-colors hover:border-brand-blue/30 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-sky-500 rounded-lg flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                        T
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ink group-hover:text-brand-blue transition-colors">Trailhead Salesforce</h4>
                        <p className="text-[11px] text-slate-400 font-semibold">{profile.trailhead_stats.rank}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-ink">{profile.trailhead_stats.badges} Insignias</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{profile.trailhead_stats.points.toLocaleString()} Puntos</p>
                    </div>
                  </a>
                )}
              </div>
              <div className="mt-6 rounded-lg border border-line bg-themed-card p-4 text-sm leading-6 text-graphite">
                <div className="flex gap-2">
                  <RefreshCw aria-hidden="true" className="mt-1 shrink-0 text-brand-blue" size={16} />
                  <p>
                    {profile.source_note}
                    {source === "database" && updatedAt ? ` Ultima actualizacion en base de datos: ${updatedAt}.` : ""}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-themed-white border-b border-line">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <ShieldCheck aria-hidden="true" size={22} />
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Perfil profesional</h2>
            <p className="mt-4 text-sm leading-7 text-graphite">
              Una combinación de certificaciones Salesforce, experiencia en entorno corporativo, base universitaria en
              informática y metodologías ágiles.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {profile.specialties.map((item) => (
              <span className="rounded-lg border border-line bg-card/30 px-3.5 py-2 text-xs font-semibold text-ink shadow-sm transition hover:border-brand-blue duration-300" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-themed-mist border-b border-line">
        <div className="container grid gap-10 lg:grid-cols-2">
          {/* Experience Timeline */}
          <article className="glass-card rounded-2xl p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex size-9 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                <BriefcaseBusiness aria-hidden="true" size={18} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">Experiencia</h2>
            </div>
            <div className="relative border-l border-brand-blue/30 ml-4 pl-6 space-y-8">
              {profile.experience.map((item) => (
                <div className="relative" key={`${item.title}-${item.subtitle}`}>
                  {/* Timeline bullet node */}
                  <span className="absolute -left-[31px] top-1.5 size-3.5 rounded-full border-2 border-brand-blue bg-themed-white shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                  {item.subtitle ? <p className="mt-1 text-xs font-semibold text-brand-cyan">{item.subtitle}</p> : null}
                  {item.meta ? <p className="mt-1 text-xs text-graphite">{item.meta}</p> : null}
                  {item.description ? <p className="mt-3 text-sm leading-6 text-graphite">{item.description}</p> : null}
                </div>
              ))}
            </div>
          </article>

          {/* Education Timeline */}
          <article className="glass-card rounded-2xl p-6 lg:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex size-9 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                <GraduationCap aria-hidden="true" size={18} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">Formación</h2>
            </div>
            <div className="relative border-l border-brand-cyan/30 ml-4 pl-6 space-y-8">
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 size-3.5 rounded-full border-2 border-brand-cyan bg-themed-white shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                <h3 className="text-lg font-bold text-ink">{education}</h3>
                <p className="mt-1 text-xs font-semibold text-brand-cyan">2004 - 2009</p>
                <p className="mt-3 text-sm leading-6 text-graphite">
                  {isEn
                    ? "University education in computer science, technical foundation for development, analysis, and architecture of digital solutions."
                    : "Formación universitaria en ciencias informáticas, base técnica para desarrollo, análisis y arquitectura de soluciones digitales."}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section bg-themed-white border-b border-line">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100/10">
            <div>
              <div className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                <Award aria-hidden="true" size={22} />
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">Certificaciones</h2>
              <p className="mt-2 text-sm text-graphite">
                Credenciales visibles en la ficha pública de LinkedIn.
              </p>
            </div>
            
            {/* Certifications filter tabs */}
            <div className="flex gap-2 bg-themed-mist p-1 rounded-lg border border-line">
              {([
                ["all", "Todas"],
                ["salesforce", "Salesforce (9x)"],
                ["other", "Otras"]
              ] as const).map(([type, label]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setCertFilter(type)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    certFilter === type
                      ? "bg-brand-blue text-white shadow-sm"
                      : "text-graphite hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {profile.certifications
              .filter((cert) => {
                if (certFilter === "salesforce") return cert.subtitle?.toLowerCase().includes("salesforce");
                if (certFilter === "other") return !cert.subtitle?.toLowerCase().includes("salesforce");
                return true;
              })
              .map((item) => (
                <article className="glass-card rounded-xl p-5 shadow-sm transition hover:scale-[1.02] duration-300" key={item.title}>
                  <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                  {item.subtitle ? <p className="mt-1.5 text-xs font-semibold text-brand-cyan">{item.subtitle}</p> : null}
                  {item.meta ? <p className="mt-3 text-xs leading-5 text-graphite">{item.meta}</p> : null}
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className="section-tight bg-themed-mist border-b border-line">
        <div className="container grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex size-8 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                <Languages aria-hidden="true" size={16} />
              </div>
              <h2 className="text-xl font-bold text-ink">Idiomas</h2>
            </div>
            <div className="grid gap-3">
              {profile.languages.map((item) => (
                <div className="glass-card rounded-xl p-4 text-xs text-graphite" key={item.title}>
                  <strong className="text-sm text-ink block mb-1">{item.title}</strong>
                  {item.subtitle}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex size-8 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                <Award aria-hidden="true" size={16} />
              </div>
              <h2 className="text-xl font-bold text-ink">Cursos adicionales</h2>
            </div>
            <div className="grid gap-3">
              {profile.courses.map((item) => (
                <div className="glass-card rounded-xl p-4 text-xs text-graphite" key={item.title}>
                  <strong className="text-sm text-ink block mb-1">{item.title}</strong>
                  {item.subtitle || "Ficha técnica pública"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
