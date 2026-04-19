import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-bb1561168dcd45c991b3b95d38e591d4.r2.dev",
      },
    ],
  },
};

export default nextConfig;
