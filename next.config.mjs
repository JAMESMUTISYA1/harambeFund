// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'syd.cloud.appwrite.io',
      },
    ],
  },
};

export default nextConfig;
