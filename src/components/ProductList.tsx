'use client'

import useSWR from "swr"
import ProductCard from "./ProductCard"
import { Skeleton } from "./ui/skeleton"
import { useSearchParams } from "next/navigation"

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

const ProductList = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('type') || ''
  const { data, error } = useSWR<Products>(`http://localhost:5000/api/product?limit=8&type=${search}`, fetcher)

  if (error) return <div>Failed to load</div>

  return (
    <div className='grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {data?.data ?
        data.data.map((item, index) => (
          <ProductCard item={item} key={index} delay={index / 4} />
        )) : (
          Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className='w-[200px] h-[200px] rounded-lg' />)
        )}

    </div>
  )
}

export default ProductList
