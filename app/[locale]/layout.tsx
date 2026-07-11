import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";
import { PlausibleAnalytics } from "@/components/PlausibleAnalytics";
import { siteConfig } from "@/lib/site";
import { Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return constructMetadata({
    title: isEn 
      ? "RomeroDev - Premium iOS Apps & Salesforce Consulting" 
      : "RomeroDev - Apps iOS nativas y consultoría Salesforce",
    description: isEn 
      ? "Product Engineering by Lester Romero Bernardo. Native iOS app development, Salesforce CRM optimization, enterprise integrations, and technical audits." 
      : siteConfig.description,
    canonicalPath: `/${locale}/`,
    locale: locale as Locale,
    alternateLocales: {
      es: "/es/",
      en: "/en/"
    }
  });
}

export default async function LocalizedLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  return (
    <html className={jakarta.variable} lang={locale} suppressHydrationWarning>
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
          <LocaleProvider forcedLocale={locale as Locale}>
            <ScrollRevealProvider />
            <PlausibleAnalytics />
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.url,
                email: siteConfig.supportEmail
              }}
            />
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
