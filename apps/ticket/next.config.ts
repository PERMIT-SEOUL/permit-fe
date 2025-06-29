import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // 요청 경로를 다른 경로에 매핑
    return [
      {
        source: "/sample",
        destination: "/404",
      },
    ];
  },
};

export default nextConfig;
