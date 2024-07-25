import { cn, formatMoney } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'
import { Badge } from './ui/badge';
import FramerWrapper from './FramerWrapper';
import Link from 'next/link';
import { Button } from './ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { DeleteButton } from './DeleteButton';

type Props = {
  item: Product,
  className?: string
  pageRef?: any
  delay?: number
  handleEdit?: any
  handleDelete?: any
}

const ProductCard = ({ item, className, pageRef, delay, handleEdit, handleDelete }: Props) => {
  return (
    <FramerWrapper y={0} scale={0.8} delay={delay} duration={0.15}>
      <div className='relative inline-block h-full w-full'>
        <Link ref={pageRef} href={`/all-product/${item.id}`} onClick={() => console.log('click')}>
          <div className={cn("group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800", className)}>
            <Image
              src={item.image[0]}
              width={1000}
              height={1000}
              className='relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105'
              alt={item.image[0]}
              priority
            />
          </div>
          <div className='absolute top-2 right-2'>
            {item.isNews ? (
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
                {formatMoney(item.price)}
                <span className="ml-1 inline @[275px]/label:inline">USD</span>
              </p>
            </div>
          </div>
        </Link>
        <div className='absolute top-2 left-2 flex gap-1'>
          {handleEdit && (
            <Button size='sm' variant='outline' onClick={() => handleEdit(item)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {handleDelete && (
            <DeleteButton handleConfirm={() => handleDelete(item.id)} />
          )}
        </div>
      </div>
    </FramerWrapper>
  )
}

export default ProductCard
