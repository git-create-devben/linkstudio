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
      // Common image hosting services
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com", // Google Images
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn1.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn2.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn3.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google User Content
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub avatars
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh", // Vercel avatars
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // Lorem Picsum
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Placeholder images
      },
      {
        protocol: "https",
        hostname: "i.imgur.com", // Imgur
      },
      {
        protocol: "https",
        hostname: "imgur.com",
      },
      // Social media platforms
      {
        protocol: "https",
        hostname: "pbs.twimg.com", // Twitter images
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com", // Instagram
      },
      {
        protocol: "https",
        hostname: "media.licdn.com", // LinkedIn
      },
      // CDN services
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "unpkg.com",
      },
      // For development - localhost and common dev domains
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000', 'tkp37h51-3000.uks1.devtunnels.ms'],

    },
  },
};

export default nextConfig;
