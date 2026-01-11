import { imageUrl } from '@/lib/constant';
import getBase64 from '@/lib/get-base64';
import Image from 'next/image'

type CustomImageProps = {
  src: string
  alt: string
  className?: string
  height?: number
  width?: number
  fill?: boolean
  loading?: 'eager' | 'lazy'
}

export const CustomImage = ({ src, className, alt, height, width, fill, loading }: CustomImageProps) => {
  // const { base64, img } = await getBase64(imageUrl + src)
  return (
    // <div className='relative'>
    <img
      src={src ? imageUrl + src : "/images/placeholder.svg"}
      height={height}
      width={width}
      alt={`${alt} - Kyhan Motor`}
      className={fill ? `absolute inset-0 w-full h-full object-cover ${className}` : className}
      decoding="sync"
      loading={loading}
    />
    // </div>
  )
}