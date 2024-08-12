'use client'
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay } from 'swiper/modules'
import '../assets/styles/slide.css'
import 'swiper/css';
import 'swiper/css/scrollbar';

const images = [
  '/images/slides/1.jpg',
  '/images/slides/2.jpg',
  '/images/slides/3.jpg',
]

const Slider = () => {
  return (
    <Swiper
      loop={true}
      scrollbar={{
        hide: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Scrollbar, Autoplay]}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <Image
            src={src}
            alt={src}
            fill
            priority
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
