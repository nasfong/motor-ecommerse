import { getProduct } from '@/hook';
import { QueryClient } from '@tanstack/react-query';
import type { MetadataRoute } from 'next';

const domain = 'https://www.kyhanmotorshop.store';
const locales = ['en', 'kh'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProduct(),
  });

  const products = await queryClient.getQueryData(['products']) as Product[];

  const routes = locales.flatMap(locale => [
    "/all-product",
    "/contact"
  ].map(route => ({
    url: `${domain}/${locale}${route}`,
    lastModified: new Date().toISOString(),
  })));

  const posts = locales.flatMap(locale =>
    products.map(({ id, name }) => ({
      url: `${domain}/${locale}/all-product/${id}/${encodeURIComponent(name)}`,
      lastModified: new Date().toISOString(),
    }))
  );

  const main = locales.map(locale => ({
    url: domain,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts, ...main];
}
