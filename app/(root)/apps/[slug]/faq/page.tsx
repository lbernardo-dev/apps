import { RedirectPage } from "@/components/RedirectPage";
import { getAppRouteSlugs, getPublishedApps } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allApps = await getPublishedApps();
  return allApps.flatMap((app) => getAppRouteSlugs(app).map((slug) => ({ slug })));
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
