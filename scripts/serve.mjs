import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const tempDir = path.join(process.cwd(), "out_serve");
const appsDir = path.join(tempDir, "apps");

// Clean and recreate
fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(appsDir, { recursive: true });

// Copy out/* to out_serve/apps/
console.log("Staging build files into out_serve/apps/ for /apps/ basePath routing...");
execSync(`cp -R out/* ${appsDir}`);

// Run http-server on out_serve
console.log("Starting static server on out_serve...");
execSync("npx http-server out_serve -p 3000 -g", { stdio: "inherit" });
