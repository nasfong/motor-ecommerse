/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tra-bucket01.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
