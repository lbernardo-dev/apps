"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Award, BriefcaseBusiness, GraduationCap, Languages, MapPin, RefreshCw, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { fallbackAboutProfile, type AboutProfile } from "@/lib/about-profile";
import { getSupabaseBrowserClient } from "@/lib/supabase";

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

export function AboutProfileView() {
  const [profile, setProfile] = useState<AboutProfile>(fallbackAboutProfile);
  const [source, setSource] = useState<"database" | "fallback">("fallback");

  useEffect(() => {
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
  }, []);

  const updatedAt = formatDate(profile.updated_at);

  return (
    <>
      <section className="overflow-hidden border-b border-line bg-white">
        <div className="container grid min-h-[calc(100vh-64px)] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">Sobre mi</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
              {profile.full_name}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-graphite">{profile.headline}</p>
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
                {profile.education}
              </span>
            </div>
            <p className="mt-7 max-w-3xl text-base leading-8 text-graphite">{profile.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Hablemos</ButtonLink>
              <ButtonLink href={profile.linkedin_url} variant="secondary">
                Ver LinkedIn
              </ButtonLink>
            </div>
          </div>

          <aside className="relative">
            <div className="absolute inset-x-10 bottom-0 h-36 rounded-full bg-brand-green/20 blur-3xl" />
            <div className="relative rounded-lg border border-line bg-mist p-6 shadow-sm">
              <div className="flex items-center gap-5">
                {profile.image_url ? (
                  <Image
                    alt={profile.full_name}
                    className="size-28 rounded-full border-4 border-white object-cover shadow-sm"
                    height={112}
                    src={profile.image_url}
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
                  <div className="rounded-lg border border-line bg-white p-4" key={metric.label}>
                    <p className="text-3xl font-semibold tracking-tight text-ink">{metric.value}</p>
                    <p className="mt-1 text-sm leading-5 text-graphite">{metric.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-line bg-white p-4 text-sm leading-6 text-graphite">
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

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <ShieldCheck aria-hidden="true" className="text-brand-green" size={34} />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Perfil profesional</h2>
            <p className="mt-4 text-base leading-7 text-graphite">
              Una combinacion de certificaciones Salesforce, experiencia en entorno corporativo, base universitaria en
              informatica y trabajo con metodologias agiles.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {profile.specialties.map((item) => (
              <span className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container grid gap-8 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness aria-hidden="true" className="text-brand-blue" />
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Experiencia</h2>
            </div>
            <div className="mt-6 grid gap-5">
              {profile.experience.map((item) => (
                <div className="border-l-2 border-brand-blue pl-4" key={`${item.title}-${item.subtitle}`}>
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  {item.subtitle ? <p className="mt-1 text-sm text-graphite">{item.subtitle}</p> : null}
                  {item.meta ? <p className="mt-1 text-sm text-graphite">{item.meta}</p> : null}
                  {item.description ? <p className="mt-3 text-sm leading-6 text-graphite">{item.description}</p> : null}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-line bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <GraduationCap aria-hidden="true" className="text-brand-blue" />
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Formacion</h2>
            </div>
            <div className="mt-6 border-l-2 border-brand-blue pl-4">
              <h3 className="text-lg font-semibold text-ink">{profile.education}</h3>
              <p className="mt-1 text-sm text-graphite">2004 - 2009</p>
              <p className="mt-3 text-sm leading-6 text-graphite">
                Formacion universitaria en ciencias informaticas, base tecnica para desarrollo, analisis y arquitectura
                de soluciones digitales.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Award aria-hidden="true" className="text-brand-green" size={34} />
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Certificaciones</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-graphite">
              Credenciales visibles en la ficha publica de LinkedIn, principalmente Salesforce, Scrum y nivel de ingles.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {profile.certifications.map((item) => (
              <article className="rounded-lg border border-line bg-white p-5 shadow-sm" key={item.title}>
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                {item.subtitle ? <p className="mt-2 text-sm text-brand-blue">{item.subtitle}</p> : null}
                {item.meta ? <p className="mt-3 text-sm leading-6 text-graphite">{item.meta}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight border-y border-line bg-white">
        <div className="container grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <Languages aria-hidden="true" className="text-brand-blue" />
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Idiomas</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {profile.languages.map((item) => (
                <p className="rounded-lg border border-line p-4 text-sm text-graphite" key={item.title}>
                  <strong className="text-ink">{item.title}</strong>
                  {item.subtitle ? ` · ${item.subtitle}` : ""}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Cursos visibles</h2>
            <div className="mt-5 grid gap-3">
              {profile.courses.map((item) => (
                <p className="rounded-lg border border-line p-4 text-sm text-graphite" key={item.title}>
                  <strong className="text-ink">{item.title}</strong>
                  {item.subtitle ? ` · ${item.subtitle}` : ""}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
