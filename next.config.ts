/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com"],
    unoptimized: false,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["framer-motion"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
