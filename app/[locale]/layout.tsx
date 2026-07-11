import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";
import { PlausibleAnalytics } from "@/components/PlausibleAnalytics";
import { siteConfig } from "@/lib/site";
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
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: isEn 
        ? "RomeroDev - Premium iOS Apps & Salesforce Consulting" 
        : "RomeroDev - Apps iOS nativas y consultoría Salesforce",
      template: "%s | RomeroDev"
    },
    description: isEn 
      ? "Product Engineering by Lester Romero Bernardo. Native iOS app development, Salesforce CRM optimization, enterprise integrations, and technical audits." 
      : siteConfig.description,
    icons: {
      icon: [
        { url: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon-32.png`, type: "image/png", sizes: "32x32" },
        { url: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon-192.png`, type: "image/png", sizes: "192x192" }
      ],
      apple: [
        { url: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/apple-touch-icon.png`, type: "image/png", sizes: "180x180" }
      ]
    },
    openGraph: {
      title: "RomeroDev",
      description: isEn 
        ? "Product Engineering by Lester Romero Bernardo. Native iOS app development, Salesforce CRM optimization, enterprise integrations, and technical audits." 
        : siteConfig.description,
      url: siteConfig.url,
      siteName: "RomeroDev",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "RomeroDev",
      description: isEn 
        ? "Product Engineering by Lester Romero Bernardo. Native iOS app development, Salesforce CRM optimization, enterprise integrations, and technical audits." 
        : siteConfig.description
    }
  };
}

export default async function LocalizedLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  return (
    <html className={jakarta.variable} lang={locale} suppressHydrationWarning>
      <head>
        {/* Inline script to prevent FOUC by reading theme from localStorage before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('lb-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme',window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LocaleProvider>
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
            <Header />
            <main>{children}</main>
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
