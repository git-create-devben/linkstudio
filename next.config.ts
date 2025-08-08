import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chgctcbxfxhezwxfwhxv.supabase.co",
        pathname: "/storage/v1/object/public/profilepicture/**", // Match your folder structure
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
