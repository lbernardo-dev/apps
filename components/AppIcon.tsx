"use client";

import Image from "next/image";
import { getAssetPath } from "@/lib/site";
import type { AppItem } from "@/lib/types";

const fallbackIconBySlug: Record<string, string> = {
  reps: "assets/images/reps/icons/reps-icon.png",
  vitalspath: "assets/images/vitalspath/AppIcon_v2.png"
};

type AppIconProps = {
  app: Pick<AppItem, "name" | "slug" | "iconUrl">;
  size?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  decorative?: boolean;
};

export function resolveAppIconPath(app: Pick<AppItem, "slug" | "iconUrl">) {
  return app.iconUrl || fallbackIconBySlug[app.slug];
}

export function AppIcon({
  app,
  size = 64,
  className = "",
  imageClassName = "",
  priority = false,
  decorative = false
}: AppIconProps) {
  const iconPath = resolveAppIconPath(app);

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden apple-squircle bg-white text-slate-900 shadow-sm ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={decorative ? "true" : undefined}
    >
      {iconPath ? (
        <Image
          src={getAssetPath(iconPath)}
          alt={decorative ? "" : `Icono de ${app.name}`}
          fill
          priority={priority}
          sizes={`${size}px`}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <span className="text-sm font-black">{app.name.slice(0, 1).toUpperCase()}</span>
      )}
    </span>
  );
}
