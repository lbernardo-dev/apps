type LegalDocumentProps = {
  title: string;
  updatedAt: string;
  body: string[];
};

export function LegalDocument({ title, updatedAt, body }: LegalDocumentProps) {
  return (
    <section className="section bg-white">
      <div className="container max-w-3xl">
        <h1 className="text-5xl font-semibold tracking-tight text-ink">{title}</h1>
        <p className="mt-4 text-sm font-medium text-graphite">Ultima actualizacion: {updatedAt}</p>
        <div className="mt-10 grid gap-5 text-base leading-8 text-graphite">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
