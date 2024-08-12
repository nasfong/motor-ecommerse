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
    <div className='inline-block h-full w-full rounded-lg border overflow-hidden dark:bg-black relative border-neutral-200 dark:border-neutral-800 hover:border-blue-600'>
      <Link ref={pageRef} href={`/all-product/${item._id}`}>
        <div className={cn("group flex h-full w-full items-center justify-center", className)}>
          <CustomImage src={item.image[0]} alt={item.name} />
        </div>

        <div className='px-4 pb-4'>
          <h2 className="text-xl xs:text-sm sm:text-sm md:text-lg lg:text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h2>
          <div className='flex justify-between items-end'>
            <div>
              <Ratings rating={item.star} size={15} variant="yellow" readOnly />
              <span className="text-4xl xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">${item.price}</span>
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
                <Badge variant="secondary" className='text-nowrap'>{t('Out Stock')}</Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
    // </FramerWrapper>
  )
}

export default ProductCard
