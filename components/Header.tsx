import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/apps", label: "Apps" },
  { href: "/about", label: "Sobre mi" },
  { href: "/contact", label: "Contacto" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="container flex min-h-16 items-center justify-between gap-5 py-2">
        <Link className="group flex items-center gap-2 text-2xl font-semibold tracking-tight text-ink" href="/">
          <span className="relative flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan text-white text-base font-bold shadow-[0_2px_10px_rgba(29,78,216,0.3)] group-hover:scale-105 transition-transform duration-300">
            LB
          </span>
          <span className="font-semibold tracking-tight hover:text-brand-blue transition-colors">Apps</span>
        </Link>
        <nav aria-label="Navegacion principal" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              className="relative py-1 text-sm font-medium text-graphite transition hover:text-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-blue hover:after:w-full after:transition-all after:duration-300"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:block">
          <ButtonLink href="/contact" showArrow={false}>
            Hablemos
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

