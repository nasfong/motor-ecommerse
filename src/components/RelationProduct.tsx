'use client'
import useSWR from "swr"
import ScrollProduct from "./ScrollProduct"
import ProductCard from "./ProductCard"
import { Skeleton } from "./ui/skeleton"

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

const RelationProduct = ({ typeId }: { typeId: string }) => {
  const { data: relateData, error } = useSWR<Products>(`/product?limit=5&type=${typeId}`, fetcher)

  return (
    <ScrollProduct>
      {relateData?.data ? relateData.data.map((item, index) => (
        <ProductCard
          item={item}
          className='h-[200px] w-[300px]'
          key={index}
          // pageRef={slides.length > 5 && slides.length === index + 1 ? pageRef : null}
          delay={index / 4}
        />
      )) : (
        <div className="overflow-hidden">
          <div className='flex gap-3'>
            {Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className='h-[200px] w-[300px] rounded-lg' />)}
          </div>
        </div>
      )}
    </ScrollProduct>
  )
}

export default RelationProduct
