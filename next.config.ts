import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
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
