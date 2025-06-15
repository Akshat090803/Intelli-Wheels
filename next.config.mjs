/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false, // defaults to true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ljrywvcrddooqyqfkker.supabase.co",
      },
    ],
  },
};
export default nextConfig;
