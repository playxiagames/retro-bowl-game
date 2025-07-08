/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['1games.io', 'scratch.mit.edu'],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    CUSTOM_KEY: 'geometry-dash-lite-site',
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  compress: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['@/components', '@/utils'],
    // optimizeCss 暂时禁用，因为需要额外的 critters 依赖
    // optimizeCss: true,
  },
  // 注意：静态导出模式不支持 headers 配置
  // 资源预加载和缓存优化已移至 layout.js 中通过 <link> 标签实现
};

module.exports = nextConfig 