import { LegacyChangelogRedirect } from "@/components/LegacyChangelogRedirect";
import { getAppRouteSlugs, getPublishedApps } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const apps = await getPublishedApps();
  return apps.flatMap((app) => getAppRouteSlugs(app).map((slug) => ({ slug })));
}

export default async function LegacyAppWhatsNewPage({ params }: PageProps) {
  const { slug } = await params;
  return <LegacyChangelogRedirect slug={slug} />;
}
