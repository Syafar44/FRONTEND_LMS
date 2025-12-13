/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  turbopack: false,
  images: {
    remotePatterns: [
      {
        hostname: "img.youtube.com",
        protocol: "https",
      },
      {
        hostname: "ui-avatars.com",
        protocol: "https",
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https",
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  disable: "development",
  register: true,
  skipWaiting: true,
})(nextConfig);
