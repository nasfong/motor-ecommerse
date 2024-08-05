import { dehydrate, FetchQueryOptions, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProductDetail from "@/components/modules/ProductDetail";
import { getProductById } from "@/hook";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Detail Page",
  description: "product detail motor cycle list.",
};

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
