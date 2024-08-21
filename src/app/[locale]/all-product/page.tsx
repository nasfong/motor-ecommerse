import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AllProduct from "@/components/modules/AllProduct";
import { getProduct } from "@/hook";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: `${t('All Motorcycles and Accessories')} | ${t('Kyhan Motor')}`,
    description: t('allProduct_description'),
    keywords: t('allProduct_keywords'),
    alternates: {
      canonical: `https://www.kyhanmotorshop.store/${locale}/all-product`,
      types: {
        'application/opensearchdescription+xml': `${t('All Motorcycles and Accessories')} | ${t('Kyhan Motor')}`,
      },
    },
    openGraph: {
      title: `${t('All Motorcycles and Accessories')} | ${t('Kyhan Motor')}`,
      description: t('allProduct_description'),
      url: `https://www.kyhanmotorshop.store/${locale}/all-product`,
      type: 'website',
    },
  };
}

export default async function Page() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProduct(),
  })
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllProduct />
      </HydrationBoundary>
    </main>
  )
}

