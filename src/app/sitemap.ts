import { getProduct } from '@/hook';
import { QueryClient } from '@tanstack/react-query';
import type { MetadataRoute } from 'next';

const domain = 'https://www.kyhanmotorshop.store';
const locales = ['en', 'kh'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const queryClient = new QueryClient();

  // Static routes that don't depend on API
  const routes = locales.flatMap(locale => [
    "/all-product",
    "/contact"
  ].map(route => ({
    url: `${domain}/${locale}${route}`,
    lastModified: new Date().toISOString(),
  })));

  const main = locales.map(locale => ({
    url: `${domain}/${locale}`,
    lastModified: new Date().toISOString(),
  }));

  // Try to fetch products, but handle failures gracefully
  let posts: MetadataRoute.Sitemap = [];
  
  try {
    await queryClient.prefetchQuery({
      queryKey: ['products'],
      queryFn: () => getProduct(),
    });

    const products = await queryClient.getQueryData(['products']) as Product[] | undefined;

    // Only create product URLs if we successfully fetched products
    if (products && Array.isArray(products) && products.length > 0) {
      posts = locales.flatMap(locale =>
        products.map(({ id, name }) => ({
          url: `${domain}/${locale}/all-product/${id}/${encodeURIComponent(name)}`,
          lastModified: new Date().toISOString(),
        }))
      );
    }
  } catch (error) {
    console.warn('Failed to fetch products for sitemap:', error);
    // Continue without product URLs - they can be added later or via ISR
  }

  return [...main, ...routes, ...posts];
}