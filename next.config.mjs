/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/service-center",
        destination: "/service-center/notice",
        permanent: true,
      },
      {
        source: "/my-page",
        destination: "/my-page/member",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
