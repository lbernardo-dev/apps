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
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/92 backdrop-blur">
      <div className="container flex min-h-16 items-center justify-between gap-5">
        <Link className="flex items-center gap-3 font-semibold tracking-tight text-ink" href="/">
          <span className="grid size-9 place-items-center rounded-md bg-ink text-sm text-white">LB</span>
          <span>LB Apps</span>
        </Link>
        <nav aria-label="Navegacion principal" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              className="text-sm font-medium text-graphite transition hover:text-ink"
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
