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
}

export const CustomImage = async ({ src, className, alt, height, width, fill }: CustomImageProps) => {
  // const { base64, img } = await getBase64(imageUrl + src)
  return (
    <div className='relative'>
      <Image
        // {...img}
        src={imageUrl + src}
        height={height}
        width={width}
        // fill={fill}
        alt={alt}
        // placeholder='blur'
        // blurDataURL={base64}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 3840px'
      />
    </div>
  )
}