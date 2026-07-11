# Custom Domain Setup Guide: RomeroDev

This guide explains how to transition your RomeroDev portfolio from the default GitHub Pages URL (`https://lbernardo-dev.github.io/apps/`) to a custom domain (e.g. `https://romerodev.dev/` or `https://romerodev.es/`).

---

## 1. DNS Provider Configuration

Log in to your domain registrar (Namecheap, Cloudflare, GoDaddy, etc.) and add the following records to configure your root domain or subdomain.

### Root Domain (`romerodev.dev`)
Add 4 `A` records pointing to GitHub Pages IP addresses:
* `185.199.108.153`
* `185.199.109.153`
* `185.199.110.153`
* `185.199.111.153`

Add a `CNAME` record for `www`:
* Type: `CNAME`
* Host: `www`
* Target: `lbernardo-dev.github.io` (no subfolder `/apps` here)

### Subdomain (e.g. `portfolio.romerodev.dev`)
If deploying under a subdomain, add a single `CNAME` record:
* Type: `CNAME`
* Host: `portfolio`
* Target: `lbernardo-dev.github.io`

---

## 2. GitHub Repository Configuration

To let GitHub Pages know which domain to expect:
1. Go to your repository settings on GitHub.
2. Select the **Pages** menu on the left sidebar.
3. Under **Custom domain**, enter your domain name (e.g. `romerodev.dev`) and click **Save**.
4. This action automatically creates a file named `CNAME` in the root of your deployment branch.

### Hardcoding CNAME in the Codebase
To prevent the CNAME file from being deleted upon exporting and deploying:
* Place a file named `CNAME` inside the `public/` directory of the Next.js project.
* **Content:**
  ```text
  romerodev.dev
  ```
Next.js copies all files from the `public/` folder directly to the build root output (`/out/`) during static export, ensuring it is preserved.

---

## 3. SSL Configuration (Enforce HTTPS)

1. After DNS records propagate, go back to **Repository Settings > Pages**.
2. Check the box to **Enforce HTTPS** (this might take a few minutes to become available while GitHub issues the Let's Encrypt certificate).
3. Once active, your site is fully protected under SSL.

---

## 4. Code Base URL Update

After configuring the custom domain, update the base URL variables in the configuration file so that sitemaps and absolute links output the correct custom domain rather than the github.io subfolder.
* **Modify [lib/site.ts](file:///Users/romerosoft/Work/DESARROLLO/WEB/apps/lib/site.ts):**
  ```typescript
  export const siteConfig = {
    // ...
    url: "https://romerodev.dev" // Update from https://lbernardo-dev.github.io/apps
  };
  ```
* Set `NEXT_PUBLIC_BASE_PATH=""` in your production environment variables to remove the `/apps` prefix from all routing assets.
