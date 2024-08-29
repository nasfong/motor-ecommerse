import React from 'react'
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { CustomImage } from './custom/CustomImage';
// import { Ratings } from './Rating';
{/* <Ratings rating={item.star} size={8} variant="yellow" readOnly /> */ }

type Props = {
  item: Product,
  pageRef?: any
  delay?: number
}

const ProductCard = ({ item, pageRef, delay }: Props) => {
  const t = useTranslations('product')
  return (
    <div className='h-full rounded-lg border overflow-hidden dark:bg-black relative border-black dark:border-white transform hover:-translate-y-1 transition-transform duration-100 shadow'>
      <Link ref={pageRef} href={`/all-product/${item._id}/${item.name}`} prefetch>
        <CustomImage src={item.image[0]} alt={item.name} width={500} height={500} />
        <div className='w-[80%] border-t border-gray-300 dark:border-gray-600 mx-auto'></div>
        <div className='flex flex-col justify-between h-[80px] px-2 pb-2'>
          <h2 className="text-lg text-ellipsis overflow-hidden">{item.name}</h2>
          <div className='flex justify-between gap-3 text-sm'>
            <span className="font-bold truncate">{item.type.name}</span>
            <span className="">{item.price}<span className='text-gray-400'>$</span></span>
          </div>
        </div>
      </Link>
    </div>

  )
}

export default ProductCard
