import  { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.plugins.push(new PrismaPlugin());
    if (isServer) {
    }
    return config;
  },
  transpilePackages: ['@repo/ui', '@repo/db'],
  output: 'standalone',
};

export default nextConfig;