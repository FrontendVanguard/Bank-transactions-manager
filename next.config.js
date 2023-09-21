/** @type {import('next').NextConfig} */
const nextConfig = {
  baseUrl: './',
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  include: ['**/*.ts'],
}

module.exports = nextConfig
