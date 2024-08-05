'use client'
import ScrollProduct from "./ScrollProduct"
import ProductCard from "./ProductCard"
import { Skeleton } from "./ui/skeleton"
import { useProducts } from '../hook/index';

const RelationProduct = ({ typeId, excludeProductId }: { typeId: string; excludeProductId: string }) => {
  const { data: relateData, error, isLoading } = useProducts({ type: typeId, excludeId: excludeProductId })

  if (error) return 'Failed to load'

  return (
    <ScrollProduct>
      {isLoading ? (
        <div className="overflow-hidden">
          <div className='flex gap-3'>
            {Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className='h-[200px] w-[300px] rounded-lg' />)}
          </div>
        </div>
      ) :
        relateData?.data.map((item, index) => (
          <div className='relative' key={index}>
            <ProductCard
              item={item}
              className='h-[200px] w-[300px]'
              // pageRef={slides.length > 5 && slides.length === index + 1 ? pageRef : null}
              delay={index / 4}
            />
          </div>
        ))}
    </ScrollProduct>
  )
}

export default RelationProduct
