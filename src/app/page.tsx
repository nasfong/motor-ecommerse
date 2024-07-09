"use client"
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/scrollbar';


export default function Home() {
  return (
    <main className="">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        <SwiperSlide className="flex justify-center items-center">
          <Image
            src="/images/Legend-BLACK.png"
            width={1000}
            height={1000}
            className='h-[400px] w-[400px]'
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/Legend-BLACK.png"
            width={1000}
            height={1000}
            className='h-[400px] w-[400px]'
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
