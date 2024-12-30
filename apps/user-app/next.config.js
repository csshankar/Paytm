import  { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.plugins.push(new PrismaPlugin());
    if (isServer) {
        config.output.libraryTarget = 'commonjs2';
    }
    return config;
  },
  transpilePackages: ['@repo/ui', '@repo/db'], // Include db package for transpilation
  output: 'standalone',
  // experimental: {
  //   outputFileTracingRoot: path.join(__dirname, '../../'), // Critical for monorepos! Adjust path if needed
  // },
};

export default nextConfig;