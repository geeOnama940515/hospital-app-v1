/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { 
    unoptimized: true 
  },
  trailingSlash: true,
  distDir: 'out',
  // Disable problematic optimizations
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
  // Simple webpack config
  webpack: (config, { dev, isServer }) => {
    // Disable caching to prevent corruption
    config.cache = false;
    
    // Ensure proper module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
  // Disable experimental features
  experimental: {},
  // Ensure proper page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;