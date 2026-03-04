/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@musekit/design-system",
    "@musekit/shared",
    "@musekit/auth",
    "@musekit/database",
    "@musekit/billing",
    "@musekit/email",
    "@musekit/services",
    "@musekit/admin",
    "@musekit/cms",
    "@musekit/affiliate",
  ],
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
