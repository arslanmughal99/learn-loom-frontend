import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {hostname: "tailwindui.com"},
       {hostname: "images.unsplash.com"},
       {hostname: "usc1.contabostorage.com"}
      ],
      dangerouslyAllowSVG: true
  }
};

export default withNextVideo(nextConfig);