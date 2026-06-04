import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/projects",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
