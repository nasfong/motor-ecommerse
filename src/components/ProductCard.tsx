import { cn } from '@/lib/utils';
import React from 'react'
import { Badge } from './ui/badge';
// import FramerWrapper from './FramerWrapper';
import { Link } from '@/navigation';
import { AspectRatio } from './ui/aspect-ratio';
import { useTranslations } from 'next-intl';
import { CustomImage } from './custom/CustomImage';
import { Ratings } from './Rating';

type Props = {
  item: Product,
  className?: string
  pageRef?: any
  delay?: number
}

const ProductCard = ({ item, className, pageRef, delay }: Props) => {
  const t = useTranslations('product')
  return (
    // <FramerWrapper y={0} scale={0.8} delay={delay} duration={0.15}>
    <div className='inline-block h-full w-full rounded-lg border  overflow-hidden dark:bg-black relative border-neutral-200 dark:border-neutral-800 hover:border-blue-600'>
      <Link ref={pageRef} href={`/all-product/${item._id}`}>
        <div className={cn("group flex h-full w-full items-center justify-center", className)}>
          {/* <AspectRatio ratio={1 / 1}> */}
          <CustomImage src={item.image[0]} />
          {/* </AspectRatio> */}
        </div>

        <div className='px-4 pb-4'>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
          <div className='flex justify-between items-end'>
            <div>
              <Ratings rating={item.star} size={15} variant="yellow" readOnly />
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${item.price}</span>
            </div>
            <div className='flex flex-col items-end gap-1'>
              {item.isNews ? (
                <Badge variant="secondary">{t('New')}</Badge>
              ) : (
                <Badge variant="secondary">{t('Second hand')}</Badge>
              )}
              {item.isSold === 1 ? (
                <Badge variant="secondary">{t('In Stock')}</Badge>
              ) : (
                <Badge variant="secondary">{t('Out Stock')}</Badge>
              )}
            </div>
          </div>
        </div>
        {/* <div className=' bottom-0 left-0 flex w-full px-4 pb-4 @container/label'>
          <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
            <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
              {item.name}
            </h3>
            <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
              ${item.price}
              <span className="ml-1 inline @[275px]/label:inline">USD</span>
            </p>
          </div>
        </div> */}
      </Link>

    </div>
    // </FramerWrapper>
  )
}

export default ProductCard
