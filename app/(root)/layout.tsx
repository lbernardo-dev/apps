import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";
import { constructMetadata } from "@/lib/metadata";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = constructMetadata({
  title: "Product Engineering",
  description: siteConfig.description,
  canonicalPath: "/",
  locale: "es",
  isLayout: true,
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={jakarta.variable} lang="es" suppressHydrationWarning>
      <head>
        {/* Inline script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('lb-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme',window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <FirebaseAnalytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
