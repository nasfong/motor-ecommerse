'use client';

import { useState, CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Scrollbar, Thumbs } from 'swiper/modules';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { CustomImage } from './custom/CustomImage';
import { PhotoProvider, PhotoView } from 'react-photo-view';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
// Import react-photo-view styles after Swiper styles
import 'react-photo-view/dist/react-photo-view.css';
import Image from 'next/image';
import { imageUrl } from '@/lib/constant';

const ProductImageGallery = ({ images, alt }: { images: string[]; alt: string }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const swiperStyle: CSSProperties & { [key: string]: string } = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff',
  };

  return (
    <div className='w-full'>
      <PhotoProvider>
        <Swiper
          style={swiperStyle}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiperGallery2"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className='cursor-pointer'>
              <AspectRatio ratio={1 / 1}>
                <PhotoView src={imageUrl + image}>
                  <Image fill src={imageUrl + image} alt={`${alt} - ${index}`} />
                </PhotoView>
              </AspectRatio>
            </SwiperSlide>
          ))}
        </Swiper>
      </PhotoProvider>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        scrollbar={{
          hide: false,
        }}
        modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
        className="mySwiperGallery"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <AspectRatio ratio={1 / 1}>
              <CustomImage src={image} alt={`${alt} - ${index}`} />
            </AspectRatio>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageGallery;
