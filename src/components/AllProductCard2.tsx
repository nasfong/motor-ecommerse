'use client'
import { memo, MutableRefObject, useCallback, useRef, useState } from 'react'
import ProductCard from './ProductCard';
import ScrollProduct from './ScrollProduct';
import { mutate } from 'swr';
import { Skeleton } from './ui/skeleton';

type Props = {
  parent: string
  child: Product[]
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

const AllProductCard = memo(({ parent, child }: Props) => {

  const observer = useRef(null) as MutableRefObject<IntersectionObserver | null>
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(2)
  const [stopPage, setStopPage] = useState(false)
  const [slides, setSlides] = useState(child)

  const pageRef = useCallback((node: HTMLElement) => {
    if (loading || stopPage) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        setLoading(true)
        mutate('select-data', fetcher(`http://localhost:5000/api/product?limit=5&type=6694eaa97b8fec1d8a2883f3&page=${page}`)).then(res => {
          setLoading(false)
          setPage(prev => prev + 1)
          setStopPage(res.data?.length < 5)
          setSlides(prev => [...prev, ...res.data])
        })
      }
    })
    if (node) observer.current?.observe(node)
  }, [loading, stopPage])

  return (
    <div className='flex flex-col gap-5'>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors border-b">
        {parent}
      </h2>
      <ScrollProduct>
        {slides.map((item, index) => (
          <ProductCard
            item={item}
            className='h-[200px] w-[300px]'
            key={index}
            pageRef={slides.length >= 5 && slides.length === index + 1 ? pageRef : null}
            delay={slides.length <= 5 ? index / 4 : 0}
          />
        ))}
        {loading && (
          <div className='flex items-center'>
            <Skeleton className='h-[200px] w-[300px] rounded-lg' />
          </div>
        )}
      </ScrollProduct>
    </div>
  )
})

export default AllProductCard

