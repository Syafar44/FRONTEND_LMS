/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "drive.google.com",
        protocol: "https",
      },
      {
        hostname: "ui-avatars.com",
        protocol: "https",
      },
      {
        hostname: "jmp.sh",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
