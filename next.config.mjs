/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'tra-bucket01.s3.ap-southeast-2.amazonaws.com',
      'fsgw.sabay.test'
    ],
  },
};

export default nextConfig;
