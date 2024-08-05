import { dehydrate, FetchQueryOptions, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AllProduct from "@/components/modules/AllProduct";
import { getProduct } from "@/hook";


export default async function Page() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getProduct,
  })
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllProduct />
      </HydrationBoundary>
    </main>
  )
}
