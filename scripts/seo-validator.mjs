import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "out");
let hasErrors = false;

function getAllHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, files);
    } else if (filePath.endsWith(".html")) {
      files.push(filePath);
    }
  }
  return files;
}

function checkHtmlFile(filePath) {
  const relPath = path.relative(outDir, filePath);
  const content = fs.readFileSync(filePath, "utf-8");
  const errors = [];

  // Skip redirect files that only contain meta-refresh redirects, and 404/not-found pages
  if (
    (content.includes('http-equiv="refresh"') && relPath !== "index.html") ||
    relPath.startsWith("404") ||
    relPath.startsWith("_not-found")
  ) {
    return;
  }

  // 1. Check Lang Attribute
  const langMatch = content.match(/<html[^>]*lang=["']([^"']+)["']/i);
  if (!langMatch) {
    errors.push("Missing lang attribute in <html> tag");
  } else {
    const lang = langMatch[1];
    const expectedLang = relPath.startsWith(`en${path.sep}`) || relPath.startsWith("en/") ? "en" : "es";
    // Check if it matches expected folder language
    if (lang !== expectedLang && relPath !== "index.html" && !relPath.startsWith("404")) {
      errors.push(`Invalid lang attribute: found "${lang}", expected "${expectedLang}"`);
    }
  }

  // 2. Check Title
  const titleMatch = content.match(/<title[^>]*>([^<]*)<\/title>/i);
  if (!titleMatch) {
    errors.push("Missing <title> tag");
  } else if (!titleMatch[1].trim()) {
    errors.push("Empty <title> tag");
  }

  // 3. Check Description
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    content.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  if (!descMatch) {
    errors.push("Missing description meta tag");
  } else if (!descMatch[1].trim()) {
    errors.push("Empty description meta tag");
  }

  // 4. Check Canonical
  const canonicalMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                         content.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  if (!canonicalMatch) {
    errors.push("Missing canonical link tag");
  } else if (!canonicalMatch[1].trim()) {
    errors.push("Empty canonical link tag");
  }

  // 5. Check Heading Structure (H1 counts)
  const h1Matches = content.match(/<h1[^>]*>/gi) || [];
  if (h1Matches.length === 0 && !relPath.startsWith("404") && relPath !== "index.html") {
    errors.push("Missing <h1> tag");
  } else if (h1Matches.length > 1) {
    errors.push(`Multiple <h1> tags found (${h1Matches.length})`);
  }

  // 6. Check Images Alt attributes
  const imgMatches = content.match(/<img[^>]*>/gi) || [];
  for (const img of imgMatches) {
    if (!img.includes("alt=")) {
      errors.push(`Image missing alt attribute: ${img}`);
    }
  }

  // 7. Check JSON-LD Validity
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let jsonLdMatch;
  while ((jsonLdMatch = jsonLdRegex.exec(content)) !== null) {
    try {
      JSON.parse(jsonLdMatch[1]);
    } catch (e) {
      errors.push(`Invalid JSON-LD syntax: ${e.message}`);
    }
  }

  if (errors.length > 0) {
    hasErrors = true;
    console.error(`\x1b[31mFAIL: ${relPath}\x1b[0m`);
    errors.forEach((err) => console.error(`  - ${err}`));
  } else {
    console.log(`\x1b[32mPASS: ${relPath}\x1b[0m`);
  }
}

function run() {
  console.log("Analyzing built HTML files for SEO and HTML structure compliance...");
  const htmlFiles = getAllHtmlFiles(outDir);
  
  if (htmlFiles.length === 0) {
    console.error("\x1b[31mError: No HTML files found in out/ directory. Run 'npm run build' first.\x1b[0m");
    process.exit(1);
  }

  htmlFiles.forEach(checkHtmlFile);

  if (hasErrors) {
    console.error("\n\x1b[31mSEO validation failed with errors.\x1b[0m");
    process.exit(1);
  } else {
    console.log("\n\x1b[32mAll static SEO checks passed successfully!\x1b[0m");
  }
}

run();
