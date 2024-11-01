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
	protocol: 'https',
	hostname: '**.emurgo.com'
	},

    ],
    domains: ['localhost'],
  },
  reactStrictMode: false,
};
