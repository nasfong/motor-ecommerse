import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AllProduct from "@/components/modules/AllProduct";
import { getProduct } from "@/hook";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import getBase64 from "@/lib/get-base64";

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
  // const images = ["http://localhost:5000/api/image/1723329995963.jpg"]
  return (
    <main>
      {/* {images.map(async (src) => {
        const { base64, img } = await getBase64(src)

        return (
          <Image
            key={src}
            {...img}
            src={src}
            height={100}
            width={100}
            // fill={fill}
            alt={src}
            placeholder='blur'
            blurDataURL={base64}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 3840px'
          />
        )
      })} */}
      {/* <Images /> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllProduct />
      </HydrationBoundary>
    </main>
  )
}

function Images() {
  const images = ["http://localhost:5000/api/image/1723329995963.jpg"]
  return images.map(async (src) => {
    const { base64, img } = await getBase64(src)

    return (
      <Image
        key={src}
        {...img}
        src={src}
        height={100}
        width={100}
        // fill={fill}
        alt={src}
        placeholder='blur'
        blurDataURL={base64}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 3840px'
      />
    )
  })
}
