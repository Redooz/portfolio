import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'builtin.com',
        },{
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
        }]
    }
};

export default nextConfig;
