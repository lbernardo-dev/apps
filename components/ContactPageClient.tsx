"use client";

import { useLocale } from "@/lib/i18n";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export function ContactPageClient() {
  const { t } = useLocale();

  return (
    <section className="section bg-themed-white">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-[var(--color-ink)]">
            {t("contact.title")}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-graphite)]">
            {t("contact.subtitle")}
          </p>
          <p className="mt-6 text-sm text-[var(--color-graphite)]">
            {t("contact.email.label")}{" "}
            <a className="font-semibold text-[var(--color-ink)] hover:text-[var(--color-brand-blue)]" href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
