'use client'
import ScrollProduct from "./ScrollProduct"
import ProductCard from "./ProductCard"
import { Skeleton } from "./ui/skeleton"
import { useProducts } from '../hook/index';

const RelationProduct = ({ typeId, excludeProductId }: { typeId: string; excludeProductId: string }) => {
  const { data: relateData, error, isLoading } = useProducts({ type: typeId, excludeId: excludeProductId })

  if (error) return 'Failed to load'

  return (
    <article className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2'>
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className='h-[200px] rounded-lg' />)
      ) : relateData?.map((item, index) => (
        <ProductCard item={item} delay={index / 4} key={index} />
      ))}
    </article>
  )
}

export default RelationProduct
