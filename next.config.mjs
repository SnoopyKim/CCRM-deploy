/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/service-center",
        destination: "/service-center/notice",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
