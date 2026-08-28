import { RedirectPage } from "@/components/RedirectPage";
import { getAppRouteSlugs, getPublishedApps } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allApps = await getPublishedApps();
  return allApps.flatMap((app) => getAppRouteSlugs(app).map((slug) => ({ slug })));
}

export default async function LegacyAppSupportPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <RedirectPage
      slugEs={`${slug}/soporte`}
      slugEn={`${slug}/support`}
      parentSectionEs="casos"
      parentSectionEn="case-studies"
    />
  );
}
