/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: true,
  },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
      ],
    },
  }
