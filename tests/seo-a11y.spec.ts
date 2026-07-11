import { test, expect } from "@playwright/test";

test.describe("SEO and Multilingual Validation", () => {
  test("Verify Spanish Homepage Lang, H1, and Meta tags", async ({ page }) => {
    await page.goto("/es/");
    
    // 1. Verify dynamic lang attribute
    const htmlLang = await page.locator("html").getAttribute("lang");
    expect(htmlLang).toBe("es");

    // 2. Verify H1 exists and is correct
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("digital");

    // 3. Verify Canonical and Hreflang links
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /es/);

    const hreflangEs = page.locator('link[rel="alternate"][hreflang="es"]');
    await expect(hreflangEs).toBeAttached();
    
    const hreflangEn = page.locator('link[rel="alternate"][hreflang="en"]');
    await expect(hreflangEn).toBeAttached();
  });

  test("Verify English Homepage Lang, H1, and Meta tags", async ({ page }) => {
    await page.goto("/en/");
    
    // 1. Verify dynamic lang attribute
    const htmlLang = await page.locator("html").getAttribute("lang");
    expect(htmlLang).toBe("en");

    // 2. Verify H1 exists and is correct
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("digital");

    // 3. Verify Canonical and Hreflang links
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /en/);
  });

  test("Verify Language Switcher Interaction", async ({ page }) => {
    await page.goto("/es/");
    
    // Open language switcher / click translation link
    const switcher = page.locator('a[href*="/en/"]');
    if (await switcher.count() > 0) {
      await switcher.first().click();
      await expect(page).toHaveURL(/\/en\//);
      const htmlLang = await page.locator("html").getAttribute("lang");
      expect(htmlLang).toBe("en");
    }
  });

  test("Verify Form Validation and Honeypot", async ({ page }) => {
    await page.goto("/es/contacto/");
    
    const form = page.locator("form");
    await expect(form).toBeVisible();

    // Fill honeypot field
    const honeypot = page.locator('input[name="website_verify"]');
    await honeypot.fill("spambot_detected");

    // Fill contact form
    await page.locator('input[name="name"]').fill("Spam Tester");
    await page.locator('input[name="email"]').fill("spam@test.com");
    await page.locator('textarea[name="message"]').fill("This is a testing message to evaluate form anti-spam filters.");

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Under honeypot trigger, it should simulate successful submission
    const successMsg = page.locator(".bg-green-500\\/10");
    await expect(successMsg).toBeVisible();
  });

  test("Verify 404 behavior for invalid dynamic routes cross-locales", async ({ page }) => {
    // '/en/casos/vitalspath/' should 404 since English uses 'case-studies'
    const res = await page.goto("/en/casos/vitalspath/");
    expect(res?.status()).toBe(404);
  });
});
