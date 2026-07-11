import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";
import { PlausibleAnalytics } from "@/components/PlausibleAnalytics";
import { siteConfig } from "@/lib/site";
import { Locale } from "@/lib/i18n";
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
  );
}
