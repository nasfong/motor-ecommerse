import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProductDetail from "@/components/modules/ProductDetail";
import { getProductById } from "@/hook";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale, name } }: { params: { locale: string; name: string } }) {
  const t = await getTranslations({ locale, namespace: '' });
  return {
    title: decodeURIComponent(name),
    description: "product detail",
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
