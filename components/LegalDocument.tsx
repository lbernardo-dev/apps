type LegalDocumentProps = {
  title: string;
  updatedAt: string;
  body: string[] | string;
};

export function LegalDocument({ title, updatedAt, body }: LegalDocumentProps) {
  const isHtml = typeof body === "string";

  return (
    <section className="section bg-themed-white">
      <div className="container max-w-3xl">
        <h1 className="text-5xl font-semibold tracking-tight text-[var(--color-ink)]">{title}</h1>
        <p className="mt-4 text-sm font-medium text-[var(--color-graphite)]">Ultima actualizacion: {updatedAt}</p>
        {isHtml ? (
          <div
            className="mt-10 prose prose-slate max-w-none text-base leading-8 text-[var(--color-graphite)] [&_h2]:text-[var(--color-ink)] [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4 [&_strong]:text-[var(--color-ink)]"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <div className="mt-10 grid gap-5 text-base leading-8 text-[var(--color-graphite)]">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
