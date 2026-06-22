import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sacred-snuff.com",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
