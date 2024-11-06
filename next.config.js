/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  basePath: '/academy',
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wpengine.com',
      },
      {
        protocol: 'https',
        hostname: '**.antigravity.dev',
      },
      {
        protocol: 'http',
        hostname: '**.emurgornd.com'
        },
    ],
  },
  reactStrictMode: false,
};
