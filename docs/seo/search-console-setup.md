# Search Console Setup & Webmaster Guidelines: RomeroDev

This guide details the exact process for registering, verifying, and optimizing RomeroDev on Google Search Console and Bing Webmaster Tools.

---

## 1. Domain Registration and Verification

### 1.1 Property Type Choice
To obtain full coverage across all subdomains and protocol variants (HTTPS, HTTP, www, non-www), we strongly recommend registering a **Domain Property** rather than a URL-prefix property.
* **Target Domain:** `romerodev.com` (or `lbernardo-dev.github.io/apps/` if deploying temporarily under GitHub Pages subdomain).

### 1.2 DNS Text Record Verification (Recommended)
1. Go to Google Search Console and select "Add Property".
2. Under "Domain", enter `romerodev.com`.
3. Copy the generated `TXT` record (e.g. `google-site-verification=xxxx`).
4. Log into your DNS provider (e.g. Cloudflare, Namecheap) and create a new `TXT` record:
   * **Host:** `@` (or leave blank)
   * **Value:** [paste the verification code]
   * **TTL:** Auto / 3600
5. Return to Search Console and click "Verify".

### 1.3 Subdomain URL-Prefix verification (Fallback for GitHub Pages)
If deploying under `lbernardo-dev.github.io/apps/`:
1. Add a **URL Prefix Property** for `https://lbernardo-dev.github.io/apps/`.
2. Select **HTML file upload** verification method.
3. Download the verification HTML file (e.g. `google12345.html`).
4. Place this file inside the `public/` directory of your Next.js project.
5. Deploy the build. The file will be available at the root path, permitting instant verification.

---

## 2. Sitemap Submission

Once verification is completed, submit the dynamic sitemap:
1. In Search Console, select **Sitemaps** from the left navigation menu.
2. Under "Add a new sitemap", type: `sitemap.xml`.
3. Click **Submit**.
4. Check the status. It should display "Success" with the count of discovered URLs.

---

## 3. Coverage, Canonicalization & Crawl Budget

Monitor the following views in Search Console to maintain indexing health:

### 3.1 Page Indexing Report (Coverage)
* Validate that all 98+ dynamic pre-rendered routes return 200 and are indexed.
* Ensure no redirect pages (e.g. `/about/`, `/cookies/` at root) are flagged as "Alternate page with proper canonical tag" unless intended.
* Verify `/admin/` is correctly excluded by the robots.txt file and displays "Excluded by 'robots.txt'".

### 3.2 Canonical URL Auditing
Ensure Google agrees with the declared canonical URLs:
* Use the **URL Inspection Tool** on a page like `https://lbernardo-dev.github.io/apps/en/ios-development/`.
* Confirm that "User-declared canonical" matches "Google-selected canonical".
* Check that "Alternate layout" lists the reciprocal `hreflang` translation (`/es/desarrollo-ios/`).

### 3.3 Fetch & Render Testing (Mobile Usability)
* Verify that the mobile rendering screenshots in Search Console are complete and do not block CSS or JS files.
* Confirm that there are no "Text too small to read" or "Clickable elements too close together" errors, indicating correct viewport and touch targets.
