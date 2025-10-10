import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        // This makes it so that caching is opt-in
        // Only available in canary as of now
        dynamicIO: true
    }
};

export default nextConfig;
