/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  images: {
    remotePatterns: process.env.NODE_ENV === 'production' ? [
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_API_URL).hostname,
        port: '',
        pathname: '**',
      },
    ] : [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
