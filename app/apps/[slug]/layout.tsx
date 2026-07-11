import { notFound } from "next/navigation";
import { getApps } from "@/lib/content";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { AppSpaceClientToggle } from "./AppSpaceClientToggle";

export async function generateStaticParams() {
  const apps = await getApps();
  return apps.map((app) => ({
    slug: app.slug,
  }));
}

export default async function AppSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const apps = await getApps();
  const app = apps.find((a) => a.slug === slug);

  if (!app) {
    notFound();
  }

  const primaryColor = app.colorPrimary || "#3b82f6";
  const secondaryColor = app.colorSecondary || "#22d3ee";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-brand-blue: ${primaryColor} !important;
              --color-brand-cyan: ${secondaryColor} !important;
              --color-brand-blue-rgb: ${hexToRgb(primaryColor)} !important;
              --color-brand-cyan-rgb: ${hexToRgb(secondaryColor)} !important;
            }
          `,
        }}
      />
      <AppSpaceClientToggle />
      <div className="flex min-h-screen flex-col bg-themed-white text-ink">
        <AppHeader app={app} />
        <main className="flex-grow pt-16 sm:pt-20">
          {children}
        </main>
        <AppFooter app={app} />
      </div>
    </>
  );
}

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "59, 130, 246";
}
