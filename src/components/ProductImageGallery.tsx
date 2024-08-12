'use client'
import Image from 'next/image';
import { useState, CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import { FreeMode, Navigation, Scrollbar, Thumbs } from 'swiper/modules';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { imageUrl } from '@/lib/constant';
import { CustomImage } from './custom/CustomImage';

const ProductImageGallery = ({ images, alt }: { images: string[]; alt: string }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const swiperStyle: CSSProperties & { [key: string]: string } = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff',
  };

  return (
    <div className=''>
      <Swiper
        style={swiperStyle}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <AspectRatio ratio={1 / 1}>
              <CustomImage src={image} alt={`${alt} - ${index}`} />
            </AspectRatio>
          </SwiperSlide>
        ))}
      </Swiper>
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
        className="mySwiper"
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
