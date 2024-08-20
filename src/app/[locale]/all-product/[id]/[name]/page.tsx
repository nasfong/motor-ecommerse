import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProductDetail from "@/components/modules/ProductDetail";
import { getProductById } from "@/hook";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale, name } }: { params: { locale: string; name: string } }) {
  const t = await getTranslations('metadata');

  return {
    title: `${decodeURIComponent(name)} | ${t('Kyhan Motor')}`,
    description: t('productDetail_description'),
    keywords: t('productDetail_keywords'),
    alternates: {
      canonical: `https://www.kyhanmotorshop.store/${locale}/product/${encodeURIComponent(name)}`,
    },
    openGraph: {
      title: `${decodeURIComponent(name)} | ${t('Kyhan Motor')}`,
      description: t('productDetail_description'),
      url: `https://www.kyhanmotorshop.store/${locale}/product/${encodeURIComponent(name)}`,
      type: 'website',
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['product', params.id],
    queryFn: () => getProductById(params.id),
  })

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetail id={params.id} />
      </HydrationBoundary>
    </main>
  )
}
