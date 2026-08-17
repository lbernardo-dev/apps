"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { useTheme } from "@/components/ThemeProvider";

interface PhoneMockupProps {
  screenshotSrc?: string;
  alt?: string;
  compact?: boolean;
  className?: string;
  priority?: boolean;
  appPlaceholder?: {
    name: string;
    category: string;
    tagline: string;
    firstIconText?: string;
    secondIconText?: string;
  };
}

export function PhoneMockup({
  screenshotSrc,
  alt = "Screenshot",
  compact = false,
  className = "",
  priority = false,
  appPlaceholder,
}: PhoneMockupProps) {
  const { theme } = useTheme();

  // Width and curved corner values tuned to feel exactly like iPhone 17 Pro Max proportions
  const widthClass = compact ? "w-[170px]" : "w-[260px] sm:w-[290px] md:w-[310px]";
  const outerCurvature = compact ? "rounded-[20px] sm:rounded-[24px]" : "rounded-[32px] sm:rounded-[36px]";
  const innerCurvature = compact ? "rounded-[17px] sm:rounded-[20px]" : "rounded-[28px] sm:rounded-[32px]";
  const dynamicIslandWidth = compact ? "w-11 h-2.5 mt-1.5" : "w-24 h-6 mt-3.5";

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${widthClass} ${className}`}>
      {/* Outer Glow Backlight */}
      <div className="absolute -inset-4 rounded-full bg-brand-blue/10 blur-3xl opacity-60 pointer-events-none transform translate-y-4" />

      {/* iPhone 17 Pro Max Frame */}
      <div
        className={`relative w-full aspect-[9/19.5] overflow-hidden ${outerCurvature} border-[5px] border-slate-950 bg-slate-950 p-[3.5px] shadow-[0_25px_65px_rgba(0,0,0,0.5)] ring-[1.2px] ring-neutral-800/80 dark:ring-neutral-700/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(59,130,246,0.25)] group shine-effect`}
        style={{
          boxShadow: "0 25px 60px -10px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.15)",
        }}
      >
        {/* Dynamic Island */}
        <div 
          className={`absolute top-0 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black shadow-inner flex items-center justify-center ${dynamicIslandWidth}`}
        >
          {/* Subtle sensor dots */}
          <div className="size-1 rounded-full bg-slate-900/40 absolute left-3" />
          <div className="size-1.5 rounded-full bg-indigo-950/60 absolute right-4 border border-indigo-900/30" />
        </div>

        {/* Screen Bezel and Display Area */}
        <div className={`relative w-full h-full overflow-hidden bg-slate-900 ${innerCurvature}`}>
          {screenshotSrc ? (
            /* Screenshot Image Mode */
            <div className="relative w-full h-full">
              <Image
                src={screenshotSrc}
                alt={alt}
                fill
                unoptimized
                priority={priority}
                sizes="(max-width: 640px) 70vw, 320px"
                className="object-cover transition-transform duration-700 group-hover:scale-103"
              />
              {/* iOS Home Indicator Overlay */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-1/3 h-[4px] rounded-full bg-white/40 z-20 pointer-events-none" />
            </div>
          ) : appPlaceholder ? (
            /* Custom Simulated App UI Mode (when no screenshot image is provided) */
            <div className="flex flex-col justify-between h-full w-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-4 pt-14 text-left font-sans select-none relative">
              {/* iOS Top Status Bar */}
              <div className="absolute top-3.5 left-0 right-0 px-4 flex justify-between items-center text-[10px] font-bold text-white/95 z-20 pointer-events-none">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  {/* Cellular signal bars */}
                  <svg className="size-2.5 fill-current" viewBox="0 0 120 120">
                    <rect x="0" y="80" width="20" height="40" rx="4" />
                    <rect x="30" y="60" width="20" height="60" rx="4" />
                    <rect x="60" y="40" width="20" height="80" rx="4" />
                    <rect x="90" y="10" width="20" height="110" rx="4" />
                  </svg>
                  {/* Wi-Fi Icon */}
                  <svg className="size-3 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                    <path d="M12 20h.01M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 14 0M1.5 9.5a15 15 0 0 1 21 0" />
                  </svg>
                  {/* Battery Icon */}
                  <div className="w-5 h-2.5 border border-white/80 rounded-[4px] p-[1.5px] flex items-center relative">
                    <div className="bg-brand-green h-full w-[85%] rounded-[1.5px]" />
                    <div className="absolute right-[-2.5px] top-1/2 -translate-y-1/2 w-[1.5px] h-1 bg-white/80 rounded-r-sm" />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[9px] font-black tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-2 py-0.5 rounded">
                  {appPlaceholder.category}
                </span>
                <h4 className="text-xl font-bold tracking-tight text-white mt-4">
                  {appPlaceholder.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {appPlaceholder.tagline}
                </p>

                {/* Simulated Data Cards */}
                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-brand-green/10 rounded-full blur-lg pointer-events-none" />
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                      {appPlaceholder.firstIconText || "Active Status"}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-brand-green animate-pulse" />
                        <span className="text-sm font-semibold">Salud &amp; Bienestar</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">100% Privado</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-brand-blue/10 rounded-full blur-lg pointer-events-none" />
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                      {appPlaceholder.secondIconText || "Sync Status"}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-brand-blue" />
                        <span className="text-xs text-slate-200">iCloud CloudKit</span>
                      </div>
                      <span className="text-[10px] text-brand-blue font-bold">Cifrado</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Brand Ribbon */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan text-white text-xs font-black shadow-md">
                    {appPlaceholder.name.slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-white">{appPlaceholder.name}</p>
                    <p className="text-[8px] text-slate-500">LB Apps Portfolio</p>
                  </div>
                </div>
                <span className="size-2 rounded-full bg-brand-green" />
              </div>

              {/* iOS Home Indicator */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-1/3 h-[4px] rounded-full bg-white/20 z-20 pointer-events-none" />
            </div>
          ) : (
            /* Default Generic Placeholder */
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500 p-6 text-center pt-14">
              {/* iOS Top Status Bar for default mode */}
              <div className="absolute top-3.5 left-0 right-0 px-4 flex justify-between items-center text-[10px] font-bold text-slate-600 z-20 pointer-events-none">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="size-1 bg-slate-700 rounded-full" />
                  <span className="size-1 bg-slate-700 rounded-full" />
                  <span className="size-1 bg-slate-700 rounded-full" />
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600">iPhone Simulator</span>
              <span className="text-xs text-slate-700 mt-2">Próximamente disponible</span>
            </div>
          )}

          {/* Glass glare overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20" />
        </div>
      </div>
    </div>
  );
}
