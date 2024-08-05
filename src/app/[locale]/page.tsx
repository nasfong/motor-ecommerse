import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Home from "@/components/modules/Home";
import { getProduct, getType } from "@/hook";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "home page list product.",
};

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
