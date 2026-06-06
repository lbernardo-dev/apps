import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerGroups = [
  {
    title: "Sitio",
    links: [
      { href: "/apps", label: "Apps" },
      { href: "/about", label: "Sobre mi" },
      { href: "/contact", label: "Contacto" },
      { href: "/admin", label: "Admin" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacidad" },
      { href: "/terms", label: "Terminos" },
      { href: "/cookies", label: "Cookies" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link className="flex items-center gap-2 text-2xl font-semibold text-ink" href="/">
            <span className="text-brand-blue">LB</span>
            <span>Apps</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-graphite">{siteConfig.description}</p>
          <p className="mt-4 text-sm text-graphite">
            <a className="font-medium text-ink hover:text-brand-blue" href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-ink">{group.title}</h2>
            <ul className="mt-4 space-y-3 text-sm text-graphite">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-brand-blue" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container border-t border-line py-5 text-xs text-graphite">
        © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
