import type { NextConfig } from "next";

// Next.js configuration for CMDR
const nextConfig: NextConfig = {
  // Relax build constraints to prevent deployment failures
  eslint: {
    // Warning: This allows production builds to successfully complete
    // even if your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete
    // even if your project has type errors.
    ignoreBuildErrors: true,
  },
  // Force unique build IDs to bust cache on every deploy
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  // Rewrite rules for static HTML proposal
  async rewrites() {
    return [
      {
        source: '/aryn-thomez-business-launch-proposal',
        destination: '/aryn-thomez-business-launch-proposal.html',
      },
    ];
  },
};

export default nextConfig;
