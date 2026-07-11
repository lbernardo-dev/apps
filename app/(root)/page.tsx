import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RomeroDev - Product Engineering",
  description: "Diseño y desarrollo de productos de software premium. Redireccionando a la versión en español...",
  alternates: {
    canonical: "https://lbernardo-dev.github.io/apps/es/"
  }
};

export default function RootIndexPage() {
  return (
    <div className="bg-[#07101f] text-white flex min-h-screen items-center justify-center font-sans">
      <meta httpEquiv="refresh" content="0;url=./es/" />
      {/* Client-side language detection redirect */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var nav = navigator.language.slice(0, 2);
                var stored = localStorage.getItem("lb-locale");
                var locale = stored === "en" || stored === "es" ? stored : (nav === "en" ? "en" : "es");
                window.location.replace("./" + locale + "/");
              } catch(e) {
                window.location.replace("./es/");
              }
            })()
          `
        }}
      />
      <div className="text-center p-8">
        <p className="text-sm font-semibold text-slate-400">Redirecting to RomeroDev...</p>
        <p className="mt-3 text-xs text-slate-500">
          If you are not redirected, click <a className="text-brand-blue underline" href="./es/">here</a>.
        </p>
      </div>
    </div>
  );
}
