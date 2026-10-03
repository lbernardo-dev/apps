import type { Metadata } from "next";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";
import { constructMetadata } from "@/lib/metadata";
import { HALLOWEEN_CAMPAIGN } from "@/lib/seasonal-campaign";
import "../globals.css";

export const metadata: Metadata = constructMetadata({
  title: "Product Engineering",
  description: siteConfig.description,
  canonicalPath: "/",
  locale: "es",
  isLayout: true,
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Inline script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var r=document.documentElement;try{var t=localStorage.getItem('lb-theme');if(t==='light'||t==='dark'){r.setAttribute('data-theme',t)}else{r.setAttribute('data-theme',window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}}catch(e){r.setAttribute('data-theme','light')}try{var d=new Intl.DateTimeFormat('en-CA',{timeZone:'${HALLOWEEN_CAMPAIGN.timeZone}',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());if(d>='${HALLOWEEN_CAMPAIGN.startDate}'&&d<'${HALLOWEEN_CAMPAIGN.endDateExclusive}')r.setAttribute('data-campaign','halloween')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <FirebaseAnalytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
