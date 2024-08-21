import { getProduct } from '@/hook';
import { QueryClient } from '@tanstack/react-query';
import type { MetadataRoute } from 'next'

const domain = 'https://www.kyhanmotorshop.store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const queryClient = new QueryClient();

  // Prefetch products to cache them before rendering the sitemap
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProduct(),
  });

  // Assuming getProduct() returns a list of products, but your original code referenced 'blog'
  const products = await queryClient.getQueryData(['products']) as Product[];

  // Ensure you have blog data or replace this with product data or similar
  const posts = products.map(({ _id, name }) => ({
    url: `${domain}/all-product/${_id}/${name}`, // Adjust the URL structure based on your app
    lastModified: new Date().toISOString(), // Fallback to current date if _updatedAt is not provided
  }));

  const routes = ["", "/all-product", "/contact"].map((route) => ({
    url: `${domain}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}
