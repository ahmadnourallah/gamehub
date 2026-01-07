import type { NextConfig } from 'next';
import { ExperimentalConfig } from 'next/dist/server/config-shared';

const nextConfig: NextConfig & ExperimentalConfig = {
    images: {
        remotePatterns: JSON.parse(process.env.HOSTNAMES || '[]').map(
            (hostname: string) => ({
                hostname
            })
        )
    }
};

export default nextConfig;
