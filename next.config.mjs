import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-tweet', '@emoji-mart'],
  images: {
    remotePatterns: [
      {hostname: "tailwindui.com"},
       {hostname: "images.unsplash.com"},
       {hostname: "*.digitaloceanspaces.com"}
      ],
      dangerouslyAllowSVG: true
  }
};

export default withNextVideo(nextConfig, {});