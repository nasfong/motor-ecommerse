'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

type SliderProps = {
  images?: StaticImageData[];
};

export default function Slider({ images  }: SliderProps) {
  return (
    <div className="h-[400px] w-full">
      <Swiper
        loop
        scrollbar={{ hide: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Scrollbar, Autoplay]}
        className="h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img.src}   // ✅ IMPORTANT
              alt="Promotion - Kyhan Motor"
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
