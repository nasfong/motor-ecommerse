"use client"
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/scrollbar';
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";


export default function Home() {
  const motorType = ['All', 'Suzuki', 'Honda', 'Toyota', 'Dream']
  const list = [
    {
      image: '/images/placeholder.svg',
      name: 'Dream 2024',
      type: 'Honda',
    },
    {
      image: '/images/placeholder.svg',
      name: 'Scoopy 2024',
      type: 'Honda',
    },
    {
      image: '/images/placeholder.svg',
      name: 'MSX 2020',
      type: 'Honda',
    },
    {
      image: '/images/placeholder.svg',
      name: 'Wave 2015',
      type: 'Honda',
    },
    {
      image: '/images/placeholder.svg',
      name: 'Dream 2024',
      type: 'Honda',
    },
    {
      image: '/images/placeholder.svg',
      name: 'Scoopy 2024',
      type: 'Honda',
    },
    {
      image: '/images/placeholder.svg',
      name: 'MSX 2020',
      type: 'Honda',
    },
    {
      image: '/images/placeholder.svg',
      name: 'Wave 2015',
      type: 'Honda',
    },
  ]
  const sports = [
    {
      image: '/images/placeholder.svg',
      name: 'Scoopy 2024',
      type: 'Honda',
    },
    {
      image: '/images/placeholder.svg',
      name: 'MSX 2020',
      type: 'Honda',
    },
    {
      image: '/images/placeholder.svg',
      name: 'Wave 2015',
      type: 'Honda',
    },
  ]
  const [type, setType] = useState("All")
  return (
    <main className="flex flex-col gap-5">
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
      <div className="flex gap-1">
        {motorType.map((item, index) => (
          <button
            key={index}
            className={cn(
              `flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary text-muted-foreground`,
              { 'bg-muted font-medium text-primary': item === type }
            )}
            onClick={() => setType(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className='grid grid-cols-5 gap-3'>
        {list.map((item, index) => (
          <div key={index}>
            <div className="overflow-hidden rounded-md">
              <Image
                src={item.image}
                width={1000}
                height={1000}
                className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-square'
                // fill
                alt=''
              />
            </div>
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
      <div className='text-center'>
        <Button variant="destructive">View All Product</Button>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
            PowerSpots
          </h1>
          <p className="leading-7 border-b">
            Once upon a time, in a far-off land, there was a very lazy king who.
          </p>
        </div>
        <div className="px-96">
          <ul className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-full">
            <li>
              <a href="#page1" className="flex justify-center m-1">Off Road</a>
            </li>
            <li>
              <a href="#page2" className="flex justify-center bg-white rounded-full shadow text-indigo-900 m-1">Street</a>
            </li>
            <li>
              <a href="#page3" className="flex justify-center m-1">PowerSport</a>
            </li>
          </ul>
        </div>
        <div className='grid grid-cols-3 gap-3 px-20'>
          {sports.map((item, index) => (
            <div key={index}>
              <div className="overflow-hidden rounded-md">
                <Image
                  src={item.image}
                  width={1000}
                  height={1000}
                  className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-square'
                  // fill
                  alt=''
                />
              </div>
              <h2>{item.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
