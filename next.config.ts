import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'nachokai.github.io'
        }]
    }
};

export default nextConfig;
