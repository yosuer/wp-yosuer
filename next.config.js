const path = require("path");
const imagesRemoteHosts = process.env.IMAGES_REMOTE_HOSTS;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: imagesRemoteHosts.split(",").map((remoteHost) => {
      const url = new URL(remoteHost);
      return {
        hostname: url.hostname,
        protocol: url.protocol.split(":")[0],
      };
    }),
  },
};

module.exports = nextConfig;
