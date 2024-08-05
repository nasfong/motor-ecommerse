import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Home from "@/components/modules/Home";
import { getProduct, getType } from "@/hook";


export default async function HomePage() {
  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ['products'], queryFn: getProduct }),
    queryClient.prefetchQuery({ queryKey: ['productType'], queryFn: getType }),
  ]);
  return (
    <main className="flex flex-col gap-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Home />
      </HydrationBoundary>
    </main>
  );
}
