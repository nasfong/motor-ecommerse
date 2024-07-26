'use client'
import { MutableRefObject, useCallback, useContext, useRef, useState } from 'react'
import ProductCard from './ProductCard';
// import ScrollProduct from './ScrollProduct';
// import { mutate } from 'swr';
// import { Skeleton } from './ui/skeleton';
// import { CirclePlus } from 'lucide-react';
// import { Button } from './ui/button';
import ProductModal from './ProductModal';
import { useDeleteProduct } from '@/hook';
import { PlusCircle } from 'lucide-react';
import { Button } from './ui/button';

type Props = {
  parent: string
  child: Product[]
}

const AllProductCard = ({ parent, child }: Props) => {
  const deleteProductMutation = useDeleteProduct()
  // const observer = useRef(null) as MutableRefObject<IntersectionObserver | null>
  // const [loading, setLoading] = useState(false)
  // const [page, setPage] = useState(2)
  // const [stopPage, setStopPage] = useState(false)
  // const [slides, setSlides] = useState(child)

  const [open, setOpen] = useState(false)
  const [formValue, setFormValue] = useState<Product | null>(null)

  // const pageRef = useCallback((node: HTMLElement) => {
  //   if (loading || stopPage) return
  //   if (observer.current) observer.current.disconnect()
  //   observer.current = new IntersectionObserver(async (entries) => {
  //     if (entries[0].isIntersecting) {
  //       setLoading(true)
  //       mutate('select-data', fetcher(`http://localhost:5000/api/product?limit=5&type=6694eaa97b8fec1d8a2883f3&page=${page}`)).then(res => {
  //         setLoading(false)
  //         setPage(prev => prev + 1)
  //         setStopPage(res.data?.length < 5)
  //         setSlides(prev => [...prev, ...res.data])
  //       })
  //     }
  //   })
  //   if (node) observer.current?.observe(node)
  // }, [loading, stopPage])

  const handleEdit = (item: Product) => {
    setFormValue(item)
    setOpen(true)
  }

  const handleDelete = (id: string): Promise<boolean> => {
    return deleteProductMutation.mutateAsync(id)
      .then(() => true)
      .catch(() => false);
  };

  return (
    <div className='flex flex-col gap-5' >
      <div className='flex justify-between border-b'>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
          {parent}
        </h2>
        <Button size="sm" className="h-8 gap-1" onClick={() => setOpen(true)}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
        {open && (
          <ProductModal
            open={open}
            setOpen={setOpen}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        )}
      </div>
      {/* <ScrollProduct> */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4" >
        {
          child.map((item, index) => (
            <ProductCard
              item={item}
              className='h-[200px]'
              key={index}
              // pageRef={slides.length >= 5 && slides.length === index + 1 ? pageRef : null}
              delay={child.length <= 5 ? index / 4 : 0}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        }
      </div >
      {/* {loading && (
        <div className='flex items-center'>
          <Skeleton className='h-[200px] w-[300px] rounded-lg' />
        </div>
      )} */}
      {/* </ScrollProduct> */}
    </div >
  )
}

export default AllProductCard

