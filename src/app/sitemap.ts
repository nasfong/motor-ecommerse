import { getProduct } from '@/hook';
import { QueryClient } from '@tanstack/react-query';
import type { MetadataRoute } from 'next'

const domain = 'https://www.kyhanmotorshop.store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locale = 'kh'
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProduct(),
  });

  const products = await queryClient.getQueryData(['products']) as Product[];

  const posts = products.map(({ _id, name }) => ({
    url: `${domain}/${locale}/all-product/${_id}/${encodeURIComponent(name)}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["", "/all-product", "/contact"].map((route) => ({
    url: `${domain}/${locale}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}
