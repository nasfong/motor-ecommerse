'use client'

import AllProductCard from "@/components/AllProductCard";
import ProductCard from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef } from "react";

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
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Scoopy 2024',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'MSX 2020',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Wave 2015',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Dream 2024',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Scoopy 2024',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'MSX 2020',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Wave 2015',
  //   type: 'Honda',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Dream 2024',
  //   type: 'Suzuki',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Scoopy 2024',
  //   type: 'Suzuki',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'MSX 2020',
  //   type: 'Suzuki',
  // },
  // {
  //   image: '/images/placeholder.svg',
  //   name: 'Wave 2015',
  //   type: 'Suzuki',
  // },
]

type GroupedItems = {
  [key: string]: typeof list;
};


const groupeList = list.reduce<GroupedItems>((acc, item) => {
  if (!acc[item.type]) {
    acc[item.type] = [];
  }
  acc[item.type].push(item);
  return acc;
}, {});

const option: EmblaOptionsType = {
  dragFree: true,
  containScroll: 'keepSnaps',
  watchSlides: false,
  watchResize: false,
  loop: false
}

const AllProductPage = () => {

  return (
    <div className='flex flex-col gap-5'>
      {Object.entries(groupeList).map(([key, value]) => <AllProductCard parent={key} child={value} key={key} />)}
    </div>
  )
}

export default AllProductPage
