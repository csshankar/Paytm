import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

/** @type {import('next').NextConfig} */
export default {
  webpack: (config) => {
    config.plugins.push(new PrismaPlugin());
    return config;
  },
  transpilePackages: ['@repo/ui'],  // Example: Add any packages you want to transpile
  output: 'standalone',  // Optional: for standalone output in production
};