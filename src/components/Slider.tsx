// components/Slider.tsx
'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

export default function Slider({ images }: { images: string[] }) {
  return (
    <div className='h-[400px]'>
      <Swiper
        loop={true}
        scrollbar={{
          hide: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Scrollbar, Autoplay]}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
