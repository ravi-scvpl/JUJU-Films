/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Allows production builds to succeed even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // In case there are TypeScript files in the future.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // Safeguard for static/Vercel serverless deployments
  },
};

export default nextConfig;
