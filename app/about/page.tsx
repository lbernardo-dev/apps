import type { Metadata } from "next";
import { AboutProfileView } from "@/components/AboutProfileView";

export const metadata: Metadata = {
  title: "Sobre Lester Romero Bernardo",
  description:
    "Perfil profesional de Lester Romero Bernardo: Salesforce Certified Professional, ScrumMaster y profesional en PageGroup basado en Valencia."
};

export default function AboutPage() {
  return <AboutProfileView />;
}
