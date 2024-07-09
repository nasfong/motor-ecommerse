"use client"
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/scrollbar';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src="/images/Legend-BLACK.png"
            width={100}
            height={100}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/Legend-BLACK.png"
            width={100}
            height={100}
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
