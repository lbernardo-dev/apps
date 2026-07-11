# Static Export & Deployment Guide: RomeroDev

This document describes the compilation and deployment pipeline for the RomeroDev website to GitHub Pages using Next.js Static HTML Exports (`output: "export"`).

---

## 1. Local Development Compilation

To compile and verify the build locally:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the static pages:
   ```bash
   npm run build
   ```
   This command executes Next.js compilation, optimization of styles, and extracts static HTML assets into the `/out/` directory.

---

## 2. GitHub Pages Deployment Configuration

Since GitHub Pages does not support dynamic node server executions, the Next.js config [next.config.ts](file:///Users/romerosoft/Work/DESARROLLO/WEB/apps/next.config.ts) is configured for static exports:
* `output: "export"`
* `trailingSlash: true` (ensures routes compile as folder paths with an `index.html` file, matching GitHub Pages' directory structure).

---

## 3. GitHub Actions Continuous Deployment (CD)

The project includes an automated deployment workflow defined in `.github/workflows/deploy.yml`.

### Workflow File Structure
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install Dependencies
        run: npm ci

      - name: Build and Export Site
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: "https://lbernardo-dev.github.io/apps"
          # Add Supabase env variables if necessary for dynamic content fetching
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}

      - name: Upload Static Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 4. Verification Checklists after Deployment

Once the Actions run completes successfully:
1. Verify the root address redirects to `/es/` automatically.
2. Open DevTools and check that `<html lang="es">` is injected on `/es/` pages and `<html lang="en">` on `/en/` pages.
3. Validate that sitemap.xml is accessible under `/sitemap.xml` and contains all alternate hreflang URL maps.
4. Test the contact form to ensure submissions load in the database or open the direct email client.
