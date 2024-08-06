import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AllProduct from "@/components/modules/AllProduct";
import { getProduct } from "@/hook";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: '' });
  return {
    title: t('All Product Page'),
    description: t("All product motor cycle list"),
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
