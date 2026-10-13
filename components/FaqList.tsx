import type { FaqItem } from "@/lib/types";
import { useLocale } from "@/lib/i18n";

export function FaqList({ items }: { items: FaqItem[] }) {
  const { locale } = useLocale();
  const isEn = locale === "en";

  return (
    <div className="divide-y divide-[var(--color-line)] rounded-lg border border-[var(--color-line)] bg-[var(--color-card)]">
      {items.map((item, index) => (
        <details className="group p-6" key={`${isEn && item.question_en ? item.question_en : item.question}-${index}`}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
            {isEn && item.question_en ? item.question_en : item.question}
            <span className="text-xl text-[var(--color-brand-blue)] transition-transform duration-200 group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-[var(--color-graphite)]">{isEn && item.answer_en ? item.answer_en : item.answer}</p>
        </details>
      ))}
    </div>
  );
}
