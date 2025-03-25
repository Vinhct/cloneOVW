/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.valorant-api.com'],
  },
  trailingSlash: true,
}

module.exports = nextConfig
