import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const githubPagesBasePath =
  process.env.GITHUB_ACTIONS === "true" && repoName ? `/${repoName}` : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || githubPagesBasePath;

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: process.cwd(),
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: false
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  }
};

export default nextConfig;
