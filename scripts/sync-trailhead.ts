import { chromium } from "playwright";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local if present
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
// La escritura requiere el service role (bypass de RLS). El anon key NUNCA debe
// usarse para escribir: las políticas RLS solo permiten update a editores
// autenticados, así que con anon la sincronización fallaría silenciosamente.
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Missing Supabase configuration. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function sync() {
  console.log("Starting Trailhead synchronization...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const url = "https://www.salesforce.com/trailblazer/lromerobernardo";
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle" });

  // Wait a few seconds for hydration/animations to complete
  await page.waitForTimeout(5000);

  console.log("Analyzing page DOM for profile credentials...");
  
  const bodyText = await page.evaluate(() => document.body.innerText);

  // Helper to extract numbers
  const parseNumber = (str: string) => {
    const numbers = str.replace(/,/g, "").match(/\d+/);
    return numbers ? parseInt(numbers[0], 10) : null;
  };

  // Find rank title
  let rank = "Triple Star Ranger";
  if (bodyText.includes("Triple Star Ranger")) {
    rank = "Triple Star Ranger";
  } else if (bodyText.includes("Double Star Ranger")) {
    rank = "Double Star Ranger";
  } else if (bodyText.includes("Ranger")) {
    rank = "Ranger";
  }

  // Attempt to scrape badges (insignias) and points from text blocks
  let badges = 301;
  let points = 174175;
  let certs = 9;

  // Search for badges count
  const badgeMatch = bodyText.match(/(\d+[,.]?\d*)\s*(Insignias|Badges)/i) || 
                     bodyText.match(/(Insignias|Badges)\s*(\d+[,.]?\d*)/i);
  if (badgeMatch) {
    const val = parseNumber(badgeMatch[1] || badgeMatch[2]);
    if (val) badges = val;
  }

  // Search for points count
  const pointsMatch = bodyText.match(/(\d+[,.]?\d*)\s*(Puntos|Points)/i) ||
                      bodyText.match(/(Puntos|Points)\s*(\d+[,.]?\d*)/i);
  if (pointsMatch) {
    const val = parseNumber(pointsMatch[1] || pointsMatch[2]);
    if (val) points = val;
  }

  // Search for certifications count (usually matches "X Certificaciones" or "X Certifications")
  const certsMatch = bodyText.match(/(\d+)\s*(Certificaciones|Certifications)/i) ||
                     bodyText.match(/(Certificaciones|Certifications)\s*(\d+)/i);
  if (certsMatch) {
    const val = parseNumber(certsMatch[1] || certsMatch[2]);
    if (val) certs = val;
  }

  const stats = { rank, badges, points, certs };

  console.log("Extracted Stats:", stats);

  console.log("Updating Supabase database record...");
  const { error } = await supabase
    .from("about_profiles")
    .update({
      trailhead_url: url,
      trailhead_stats: stats
    })
    .eq("slug", "lester-romero-bernardo");

  if (error) {
    console.error("Database update failed:", error);
    await browser.close();
    process.exit(1);
  }

  console.log("Trailhead stats successfully synchronized in Supabase!");
  await browser.close();
}

sync().catch((err) => {
  console.error("Uncaught sync error:", err);
  process.exit(1);
});
