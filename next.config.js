/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  experimental: {
    runtime: "experimental-edge",
  },
  images: {
    unoptimized: true,
    domains: [
      "venturebeat.com",
      "non-required-image.cl",
      "www.latercera.com",
      "phantom-marca.unidadeditorial.es",
      "media.biobiochile.cl",
      "cooperativa.cl",
      "cloudfront-us-east-1.images.arcpublishing.com",
    ],
  },
};

module.exports = nextConfig;
