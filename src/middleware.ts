import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['kh', 'en'],

  // Used when no locale matches
  defaultLocale: 'kh',
  localeDetection: false,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|kh)/:path*']
};