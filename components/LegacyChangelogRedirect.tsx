import { RedirectPage } from "@/components/RedirectPage";

export function LegacyChangelogRedirect({ slug }: { slug: string }) {
  return (
    <RedirectPage
      slugEs={slug}
      slugEn={slug}
      parentSectionEs="casos"
      parentSectionEn="case-studies"
      fragment="#changelog"
    />
  );
}
