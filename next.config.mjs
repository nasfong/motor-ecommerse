/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',           // Use 'http' for localhost
        hostname: 'localhost',      // Localhost as the hostname
        port: '5000',               // Specify port if needed
        pathname: '/**',            // Allow all paths
      },
    ],
  },
};

export default nextConfig;
