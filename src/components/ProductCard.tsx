import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'
import { Badge } from './ui/badge';

type Props = {
  item: Product,
  className?: string
  pageRef?: any
}

const ProductCard = ({ item, className, pageRef }: Props) => {
  return (
    <div className='relative inline-block h-full w-full' ref={pageRef}>
      <div className={cn("group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800", className)}>
        <Image
          src={item.image}
          width={1000}
          height={1000}
          className='relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105'
          alt={item.image}
        />
      </div>
      <div className='absolute top-2 right-2'>
        {item.status === 1 ? (
          <Badge variant="secondary">New</Badge>
        ) : (
          <Badge variant="secondary">Secondary</Badge>
        )}
      </div>
      <div className='absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label'>
        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
          <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
            {item.name}
          </h3>
          <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
            $150.00
            <span className="ml-1 inline @[275px]/label:inline">USD</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
