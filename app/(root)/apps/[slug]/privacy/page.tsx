import { RedirectPage } from "@/components/RedirectPage";
import { getAppRouteSlugs, getPublishedApps } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allApps = await getPublishedApps();
  return allApps.flatMap((app) => getAppRouteSlugs(app).map((slug) => ({ slug })));
}

export default async function LegacyAppPrivacyPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <RedirectPage
      slugEs={`${slug}/privacidad`}
      slugEn={`${slug}/privacy`}
      parentSectionEs="casos"
      parentSectionEn="case-studies"
    />
  );
}
