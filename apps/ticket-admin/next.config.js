/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["./src/styles"],
  },
  // Vercel 이미지 최적화 한도 초과(402) 방지
  images: { unoptimized: true },
};

export default nextConfig;
