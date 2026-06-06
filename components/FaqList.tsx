import type { FaqItem } from "@/lib/types";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-white">
      {items.map((item) => (
        <details className="group p-6" key={item.question}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-semibold text-ink">
            {item.question}
            <span className="text-xl text-brand-blue group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-graphite">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
