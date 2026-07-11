import { RedirectPage } from "@/components/RedirectPage";
import { getPublishedApps } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allApps = await getPublishedApps();
  return allApps.map((app) => ({ slug: app.slug }));
}

export default async function LegacyAppFaqPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <RedirectPage
      slugEs={`${slug}/preguntas-frecuentes`}
      slugEn={`${slug}/faq`}
      parentSectionEs="casos"
      parentSectionEn="case-studies"
    />
  );
}
