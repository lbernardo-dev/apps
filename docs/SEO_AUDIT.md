# Technical & Multilingual SEO Audit: RomeroDev

This document presents the detailed findings of the technical, structural, and semantic SEO audit performed on RomeroDev (formerly LB Apps Portfolio) hosted at `https://lbernardo-dev.github.io/apps/`.

---

## 1. Executive Summary

The audit identified several critical gaps in the legacy website's search engine optimization, crawling configuration, and international layout:
* **Single-URL Multi-Language Delivery:** The website used dynamic client-side state swapping without unique indexable URLs for Spanish and English. Search engines (Googlebot) were unable to crawl or index the English version of the content.
* **Canonical URL Mismatches:** Pages lacked configured canonical tags, creating duplicate content risk due to the subpath deployment under GitHub Pages.
* **Missing Alternate `hreflang` Annotations:** There were no reciprocating link attributes mapping the relationship between Spanish and English equivalent content.
* **Semantic & Heading Structure Inconsistencies:** Content hierarchies skipped heading ranks, using headings for visual formatting rather than semantic outline structure.
* **Metadata Gaps:** Individual product detail pages lacked specialized search titles and descriptions.

---

## 2. Technical Crawling & Indexing Analysis

### 2.1 The Client-Side Translation Problem
Because GitHub Pages serves static exports and Next.js was configured for single-page dynamic locale switching, Googlebot only saw the default Spanish fallback version of the home page. 
* **Observation:** Swapping languages did not trigger a URL change. The router remained on `/` or `/apps/vitalspath/`.
* **Impact:** High-intent English search keywords (e.g., "workout tracker SwiftUI", "Salesforce consulting Valencia") could never drive traffic because the English copies of pages were invisible to crawler engines.

### 2.2 Canonical URL Governance
* **Observation:** Prior deployment lacked standard `<link rel="canonical">` elements.
* **Impact:** Search engines could index the site under both `lbernardo-dev.github.io/apps` and custom domains if registered later, dividing domain authority.

---

## 3. On-Page & Semantic HTML Audit

### 3.1 Heading Hierarchy (H1-H6)
* **Status:** Failed.
* **Details:** Several pages skipped levels (e.g., `<h1>` immediately followed by `<h3>`), or had multiple `<h1>` elements inside the header component, diluting main content focus.
* **Requirement:** Ensure exactly one `<h1>` per page reflecting the primary topic (e.g., "Desarrollo iOS Nativo | RomeroDev").

### 3.2 Dynamic Images & Alt Attributes
* **Status:** Needs Improvement.
* **Details:** Alt texts in the case study image sliders were set to raw file names like `01-train-smarter.jpg`.
* **Impact:** Loss of accessibility and image search traffic. Alt descriptions must be descriptive and localized.

---

## 4. Core Web Vitals (CWV) & Performance Metrics

* **Largest Contentful Paint (LCP):** Good (~1.2s). The site uses Next.js static generation which is fast, but hero image preloading must be optimized with `priority` flags.
* **Interaction to Next Paint (INP):** Good (<50ms). Event handlers are lightweight, but the contact form lacked submission feedback which could cause multiple clicks.
* **Cumulative Layout Shift (CLS):** Perfect (0.0). The layouts use flexbox and grid, preventing shift.

---

## 5. Summary of Recommended Auditing Actions

1. **Structural Localization:** Implement dynamic routing to output distinct static files under `/es/` and `/en/` paths.
2. **Metadata Refactoring:** Configure Next.js's metadata engine to output accurate localized meta tags for all dynamic pages.
3. **Hreflang Configuration:** Generate dynamic `sitemap.xml` with reciprocating alternate language tags for every single page.
4. **Form Spam Protection:** Add a honeypot field, email pattern validator, and client-side submission throttling (rate limiting) to protect database endpoints.
