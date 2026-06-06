import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  showArrow = true
}: ButtonLinkProps) {
  return (
    <Link
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variant === "primary" &&
          "bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:bg-slate-800",
        variant === "secondary" &&
          "border border-line bg-white text-ink hover:-translate-y-0.5 hover:border-slate-400",
        variant === "ghost" && "px-0 text-brand-blue hover:text-ink"
      )}
      href={href}
    >
      {children}
      {showArrow ? <ArrowRight aria-hidden="true" size={16} strokeWidth={2.25} /> : null}
    </Link>
  );
}
