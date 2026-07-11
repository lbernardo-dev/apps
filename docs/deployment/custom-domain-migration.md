# Custom Domain Migration & Deployment Roadmap: RomeroDev

This document maps out the optional migration path from the default GitHub Pages URL (`https://lbernardo-dev.github.io/apps/`) to a custom brand domain (e.g. `https://romerodev.com/`).

---

## 1. Domain Registration and DNS Setup

1. **Register the Domain:** Purchase `romerodev.com` (or equivalent) through a ICANN-accredited registrar (Cloudflare DNS, Namecheap, etc.).
2. **DNS Server Management:** We recommend pointing the DNS servers to **Cloudflare** for fast propagation, free SSL certificates, and CSP security header management.
3. **Configure DNS Records:**
   * Create an `A` record pointing to GitHub Pages IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   * Create a `CNAME` record for `www` pointing to: `lbernardo-dev.github.io`.

---

## 2. GitHub Pages Settings Configuration

1. In the repository settings on GitHub, navigate to **Pages**.
2. Under **Custom Domain**, enter `romerodev.com`.
3. Click **Save**.
4. Check **Enforce HTTPS** (this might take a few minutes while the SSL certificate is provisioned by Let's Encrypt).
5. Add a `CNAME` file at the root of the repository containing:
   ```
   romerodev.com
   ```

---

## 3. Code Modifications (Next.js Configurations)

Once the domain resolves, update the configuration files in the workspace:

### 3.1 next.config.ts
Change `basePath` and `assetPrefix` to blank (`""` or `undefined`) since the custom domain serves the website directly from the domain root instead of the `/apps/` subpath:
```typescript
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: undefined, // Remove subpath prefix
  assetPrefix: undefined,
  // ...
};
```

### 3.2 env variables
Update `.env.production` (or production environment variables):
```env
NEXT_PUBLIC_SITE_URL=https://romerodev.com
NEXT_PUBLIC_BASE_PATH=
```

---

## 4. Search Engine Indexing Transition

1. **Verify New Domain:** Register `https://romerodev.com/` on Google Search Console.
2. **Setup Redirection:** If keeping the old repository, configure the old URL to return HTTP 301 redirects to the new domain.
3. **Change of Address:** Submit a **Change of Address** request in Google Search Console settings to migrate search signals from `lbernardo-dev.github.io/apps/` to `romerodev.com`.
4. **Re-submit Sitemap:** Submit `https://romerodev.com/sitemap.xml` on the new property.
5. **Update Analytics:** Change the domain property in Plausible/Umami to track the new hostname.
