import type { Metadata } from "next";
import { ContactPageClient } from "@/components/ContactPageClient";

import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con LB Apps para el desarrollo de tu aplicación iOS, consultoría de Salesforce o colaboraciones profesionales.",
  openGraph: {
    title: "Contacto",
    description: "Contacta con LB Apps para el desarrollo de tu aplicación iOS, consultoría de Salesforce o colaboraciones profesionales.",
    url: absoluteUrl("/contact/"),
    type: "website"
  }
};

export default function ContactPage() {
  return <ContactPageClient />;
}
