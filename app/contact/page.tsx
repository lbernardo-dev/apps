import type { Metadata } from "next";
import { ContactPageClient } from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact LB Apps for app development, consulting or collaborations."
};

export default function ContactPage() {
  return <ContactPageClient />;
}
