import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "LB Apps privacy policy and data handling practices."
};

export default function SitePrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy — LB Apps"
      updatedAt="2025-06-01"
      body={`<h2>1. Data Collection</h2>
<p>LB Apps ("we," "our") values your privacy. This policy explains how we handle information across our published applications and this website.</p>

<h2>2. Information We Collect</h2>
<p><strong>Website:</strong> When you use the contact form, we collect your name, email address, topic, and message. This data is stored securely in our database (Supabase) solely to respond to your inquiry.</p>
<p><strong>Apps:</strong> Each app has its own privacy policy accessible from its detail page. Generally, our apps store data locally on your device using Apple's frameworks (HealthKit, Core Data). We do not collect, share, or sell personal data from our apps.</p>

<h2>3. Cookies & Analytics</h2>
<p>This website uses localStorage to remember your theme (light/dark) and language preferences. We do not use third-party analytics or tracking cookies.</p>

<h2>4. Data Sharing</h2>
<p>We do not sell, rent, or share your personal information with third parties. Contact form data is used exclusively for responding to your message.</p>

<h2>5. Your Rights</h2>
<p>You can request deletion of any personal data we hold by emailing lbernardo.pro@gmail.com. We will respond within 30 days.</p>

<h2>6. Contact</h2>
<p>For privacy questions, contact us at lbernardo.pro@gmail.com.</p>`}
    />
  );
}
