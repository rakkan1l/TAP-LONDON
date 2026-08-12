/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.cloudinary.com" },
    ],
    // Next.js Image caches optimized images at the CDN level by source URL.
    // If an admin edit re-uses the same Cloudinary URL for a replaced image,
    // Next.js would keep serving the old cached version for up to 60s (the
    // default) without this override. Set low so edited images show up fast.
    minimumCacheTTL: 10,
  },
};

export default nextConfig;
