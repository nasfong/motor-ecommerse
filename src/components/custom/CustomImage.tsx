'use client'
import { imageUrl } from '@/lib/constant';
import { cn } from '@/lib/utils';
import Image from 'next/image'
import { useState } from 'react';

type CustomImageProps = {
  src: string
  alt: string
  className?: string
}

export const CustomImage = ({ src, className, alt }: CustomImageProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const loader = ({ width, quality, src, thumbnail }: { width: number, quality?: number, src: string, thumbnail?: boolean }) => {
    const props = [`w${width}`]
    if (quality) props.push(`q=${quality}`)
    if (thumbnail) props.push(`thumbnail=${thumbnail}`)
    const queryStr = props.join('&')
    return `${imageUrl}${src}?${queryStr}`
  }

  return (
    <div className={cn('relative w-full h-full', className)}>
      <Image
        sizes='10px'
        fill
        priority
        alt={alt + '-Thumbnail'}
        src={src}
        loader={({ ...rest }) => loader({ ...rest, thumbnail: true })}
        className='object-cover h-full w-full'
      />
      <Image
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 3840px'
        priority
        fill
        alt={alt}
        src={src}
        loader={loader}
        className={`
          object-cover h-full w-full
          transition-opacity duration-150 ease-in-out
          ${isLoading ? 'opacity-100' : 'opacity-0'}
          `}
        onLoad={() => setIsLoading(true)}
      />
    </div>
  )
}