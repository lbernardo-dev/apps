import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";
import { PlausibleAnalytics } from "@/components/PlausibleAnalytics";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { Locale } from "@/lib/i18n";
import { constructMetadata } from "@/lib/metadata";
import { HALLOWEEN_CAMPAIGN } from "@/lib/seasonal-campaign";
import "../globals.css";

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
      ? "Premium iOS Apps & Salesforce Consulting" 
      : "Apps iOS nativas y consultoría Salesforce",
    description: isEn 
      ? "Product Engineering by Lester Romero Bernardo. Native iOS app development, Salesforce CRM optimization, enterprise integrations, and technical audits." 
      : siteConfig.description,
    canonicalPath: `/${locale}/`,
    locale: locale as Locale,
    alternateLocales: {
      es: "/es/",
      en: "/en/"
    },
    isLayout: true
  });
}

export default async function LocalizedLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Inline script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var r=document.documentElement;try{var t=localStorage.getItem('lb-theme');if(t==='light'||t==='dark'){r.setAttribute('data-theme',t)}else{r.setAttribute('data-theme',window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}}catch(e){r.setAttribute('data-theme','light')}try{var d=new Intl.DateTimeFormat('en-CA',{timeZone:'${HALLOWEEN_CAMPAIGN.timeZone}',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());if(d>='${HALLOWEEN_CAMPAIGN.startDate}'&&d<'${HALLOWEEN_CAMPAIGN.endDateExclusive}')r.setAttribute('data-campaign','halloween')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LocaleProvider forcedLocale={locale as Locale}>
            <ScrollRevealProvider />
            <PlausibleAnalytics />
            <FirebaseAnalytics />
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": `${siteConfig.url}/#organization`,
                    name: siteConfig.name,
                    url: `${siteConfig.url}/`,
                    logo: {
                      "@type": "ImageObject",
                      url: absoluteUrl("/assets/brand/romerodev-mark.png")
                    },
                    email: siteConfig.supportEmail,
                    founder: {
                      "@type": "Person",
                      name: siteConfig.author
                    }
                  },
                  {
                    "@type": "WebSite",
                    "@id": `${siteConfig.url}/#website`,
                    url: `${siteConfig.url}/`,
                    name: siteConfig.name,
                    description: siteConfig.description,
                    inLanguage: ["es", "en"],
                    publisher: { "@id": `${siteConfig.url}/#organization` }
                  }
                ]
              }}
            />
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
