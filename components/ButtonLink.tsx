import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  showArrow = true,
  className
}: ButtonLinkProps) {
  return (
    <Link
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variant === "primary" &&
          "bg-brand-blue text-white shadow-soft hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg",
        variant === "secondary" &&
          "border border-line bg-card text-ink hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-sm hover:bg-slate-800/30",
        variant === "ghost" && "px-0 text-brand-blue hover:text-ink",
        className
      )}
      href={href}
    >
      {children}
      {showArrow ? <ArrowRight aria-hidden="true" size={16} strokeWidth={2.25} /> : null}
    </Link>
  );
}

