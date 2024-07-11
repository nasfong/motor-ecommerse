'use client'
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/scrollbar';

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
      className="mySwiper"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <SwiperSlide className="flex justify-center items-center" key={index}>
          <Image
            src="/images/placeholder.svg"
            width={1000}
            height={1000}
            className='h-[200px] w-full'
            alt=""
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
