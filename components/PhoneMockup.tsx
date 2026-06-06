import type { AppItem } from "@/lib/types";

export function PhoneMockup({ app, compact = false }: { app: AppItem; compact?: boolean }) {
  const first = app.screenshots[0] ?? "Vista principal";
  const second = app.screenshots[1] ?? "Detalle";

  return (
    <div className={compact ? "mx-auto w-full max-w-[230px]" : "mx-auto w-full max-w-[330px]"}>
      <div className="rounded-[2rem] border border-slate-900 bg-slate-950 p-2 shadow-soft">
        <div className="overflow-hidden rounded-[1.5rem] bg-white">
          <div className="flex items-center justify-between bg-slate-950 px-5 py-3 text-white">
            <span className="text-xs font-semibold">{app.name}</span>
            <span className="size-2 rounded-full bg-brand-green" />
          </div>
          <div className="bg-gradient-to-br from-sky-50 via-white to-teal-50 p-5">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">{app.category}</p>
              <p className="mt-2 text-lg font-semibold leading-tight text-ink">{app.tagline}</p>
              <div className="mt-4 h-2 rounded-full bg-slate-100">
                <div className="h-2 w-2/3 rounded-full bg-brand-green" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-ink p-3 text-white">
                <p className="text-[11px] text-slate-300">{first}</p>
                <p className="mt-4 text-2xl font-semibold">24</p>
              </div>
              <div className="rounded-lg border border-line bg-white p-3">
                <p className="text-[11px] text-graphite">{second}</p>
                <div className="mt-5 space-y-2">
                  <span className="block h-2 rounded-full bg-slate-200" />
                  <span className="block h-2 w-3/4 rounded-full bg-slate-200" />
                  <span className="block h-2 w-1/2 rounded-full bg-brand-cyan" />
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-line bg-white p-3">
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-md bg-brand-blue" />
                <div className="flex-1 space-y-2">
                  <span className="block h-2 rounded-full bg-slate-200" />
                  <span className="block h-2 w-2/3 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
