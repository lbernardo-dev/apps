import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "LB Apps - Apps iOS cuidadas, listas para crecer",
    template: "%s | LB Apps"
  },
  description: siteConfig.description,
  openGraph: {
    title: "LB Apps",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "LB Apps",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "LB Apps",
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={jakarta.variable} lang="es">
      <body className="antialiased">
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
      </body>
    </html>
  );
}

