import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.multitradegroup.com",
      },
      {
        protocol: "https",
        hostname: "www.nationalpolymersfz.com",
      },
    ],
  },
};

export default nextConfig;
