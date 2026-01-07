import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Home from "@/components/modules/Home";
import { getProduct, getType } from "@/hook";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: generateMetadataProps) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: `${t('Kyhan Motor')} | ${t('Premium Motorcycles and Accessories')}`,
    description: t("home_description"),
    keywords: t("home_keywords"),
    alternates: {
      canonical: `https://www.kyhanmotorshop.store/${locale}`,
    },
    openGraph: {
      title: `${t('Kyhan Motor')} | ${t('Premium Motorcycles and Accessories')}`,
      description: t("home_description"),
      url: `https://www.kyhanmotorshop.store/${locale}`,
      type: 'website',
    },
  };
}
type HomePageProps = {
  searchParams: { type: string }
  params: { locale: 'en' | 'kh' }
}
const params = { recommend: true }
export default async function HomePage({ searchParams, params: { locale } }: HomePageProps) {
  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ['productType'], queryFn: getType }),
    queryClient.prefetchQuery({
      queryKey: ['products', { ...searchParams, ...params }],
      queryFn: () => getProduct({ ...searchParams, ...params })
    }),
  ]);

  return (
    <main className="flex flex-col gap-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Home searchParams={{ ...searchParams, ...params }} />
      </HydrationBoundary>
    </main>
  );
}
