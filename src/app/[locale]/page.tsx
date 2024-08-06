import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Home from "@/components/modules/Home";
import { getProduct, getType } from "@/hook";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: '' });
  return {
    title: t('Home Page'),
    description: t("home page list product"),
  };
}

type HomePageProps = {
  searchParams: { type: string }
}
const params = { recommend: true }
export default async function HomePage({ searchParams }: HomePageProps) {
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
