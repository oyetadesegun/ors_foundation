import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://ors-foundation.vercel.app/**")],
  },
};

export default nextConfig;
