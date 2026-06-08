import type { Metadata } from "next";
import { AboutProfileView } from "@/components/AboutProfileView";

import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre Lester Romero Bernardo",
  description:
    "Perfil profesional de Lester Romero Bernardo: Salesforce Certified Professional, ScrumMaster y profesional en PageGroup basado en Valencia.",
  openGraph: {
    title: "Sobre Lester Romero Bernardo",
    description:
      "Perfil profesional de Lester Romero Bernardo: Salesforce Certified Professional, ScrumMaster y profesional en PageGroup basado en Valencia.",
    url: absoluteUrl("/about/"),
    type: "profile"
  }
};

export default function AboutPage() {
  return <AboutProfileView />;
}
