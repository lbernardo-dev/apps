import { createServer } from "node:http";
import fs from "fs";
import path from "path";

const tempDir = path.join(process.cwd(), "out_serve");
const appsDir = path.join(tempDir, "apps");

// Clean and recreate
fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(appsDir, { recursive: true });

// Copy out/* to out_serve/apps/ for /apps/ basePath routing.
// Use Node's filesystem API so this also works when the workspace path contains spaces.
console.log("Staging build files into out_serve/apps/ for /apps/ basePath routing...");
const outputDir = path.join(process.cwd(), "out");
for (const entry of fs.readdirSync(outputDir, { withFileTypes: true })) {
  fs.cpSync(
    path.join(outputDir, entry.name),
    path.join(appsDir, entry.name),
    { recursive: true }
  );
}

// Run a small static server without an implicit npx install. This keeps local and
// CI browser tests deterministic and supports workspaces whose paths contain spaces.
console.log("Starting static server on out_serve...");
const rootDir = path.resolve(tempDir);
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".mp4": "video/mp4"
};

const server = createServer((request, response) => {
  if (!request.url || !["GET", "HEAD"].includes(request.method ?? "")) {
    response.writeHead(405);
    response.end("Method Not Allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad Request");
    return;
  }

  const relativePath = pathname.replace(/^\/+/, "");
  const requestedPath = path.resolve(rootDir, relativePath);
  if (requestedPath !== rootDir && !requestedPath.startsWith(`${rootDir}${path.sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  const candidates = [requestedPath];
  if (pathname.endsWith("/")) candidates.unshift(path.join(requestedPath, "index.html"));
  if (!path.extname(requestedPath)) candidates.push(path.join(requestedPath, "index.html"));

  const filePath = candidates.find((candidate) => {
    try {
      return fs.statSync(candidate).isFile();
    } catch {
      return false;
    }
  });

  if (!filePath) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not Found");
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  response.writeHead(200, {
    "Cache-Control": "no-cache",
    "Content-Type": mimeTypes[extension] ?? "application/octet-stream"
  });
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  fs.createReadStream(filePath).pipe(response);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Static server ready at http://127.0.0.1:3000");
});
