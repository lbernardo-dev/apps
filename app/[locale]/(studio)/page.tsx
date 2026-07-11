import { getHomeSections, getTestimonials, getAboutProfile, getFeaturedApps } from "@/lib/content";
import { LandingPageClient } from "@/components/LandingPageClient";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;
  const [sections, testimonials, profile, featuredApps] = await Promise.all([
    getHomeSections(),
    getTestimonials(),
    getAboutProfile(),
    getFeaturedApps()
  ]);

  return (
    <LandingPageClient
      initialSections={sections}
      initialTestimonials={testimonials}
      initialProfile={profile}
      initialFeaturedApps={featuredApps}
    />
  );
}
