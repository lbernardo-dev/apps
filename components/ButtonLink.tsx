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
          "bg-brand-blue text-white shadow-soft hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg active:scale-[0.98]",
        variant === "secondary" &&
          "border border-line text-ink hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-sm active:scale-[0.98]",
        variant === "ghost" && "px-0 text-brand-blue hover:text-ink",
        className
      )}
      href={href}
      style={variant === "secondary" ? { backgroundColor: "var(--color-card)" } : {}}
    >
      {children}
      {showArrow ? <ArrowRight aria-hidden="true" size={16} strokeWidth={2.25} /> : null}
    </Link>
  );
}
