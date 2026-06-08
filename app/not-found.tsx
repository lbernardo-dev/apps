import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <section className="section bg-themed-white">
      <div className="container max-w-2xl text-center">
        <p className="text-sm font-semibold text-[var(--color-brand-blue)]">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-[var(--color-ink)]">Page not found</h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-graphite)]">
          The route does not exist or has not been generated in the static export yet.
        </p>
        <div className="mt-8">
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
