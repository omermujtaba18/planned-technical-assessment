import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
