/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // 👈 DISABLING PWA IN DEVELOPMENT MODE
  register: true,
  skipWaiting: true,

  runtimeCaching,
});

const nextConfig = withPWA({
  reactStrictMode: false, // 👈 DISABLING THIS TO AVOID DOUBLE RENDER
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  modularizeImports: {
    '@phosphor-icons/react': {
      transform: '@phosphor-icons/react/{{member}}',
    },
  },
});

module.exports = nextConfig;
