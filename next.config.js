/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/daleelak-platform',
  images: {
    unoptimized: true,
    domains: ['picsum.photos'],
  },
  trailingSlash: true,
}

module.exports = nextConfig
