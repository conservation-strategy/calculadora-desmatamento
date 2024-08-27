/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Don't bundle puppeteer for client-side and production builds
      config.externals.push('puppeteer');
    }
    return config;
  },
}

module.exports = nextConfig;