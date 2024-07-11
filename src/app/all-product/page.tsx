'use client'

import ProductCard from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';

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
    type: 'Suzuki',
  },
  {
    image: '/images/placeholder.svg',
    name: 'Scoopy 2024',
    type: 'Suzuki',
  },
  {
    image: '/images/placeholder.svg',
    name: 'MSX 2020',
    type: 'Suzuki',
  },
  {
    image: '/images/placeholder.svg',
    name: 'Wave 2015',
    type: 'Suzuki',
  },
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

const AllProductPage = () => {

  return (
    <div className='flex flex-col gap-5'>
      {Object.entries(groupeList).map(([key, value]) => {
        const [carouselRef, api] = useEmblaCarousel({ loop: false })
        return (
          <div key={key} className='flex flex-col gap-2'>
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors border-b">
              {key}
            </h2>
            <div ref={carouselRef} className="overflow-hidden">
              <div className='flex gap-3'>
                {value.map((item, index) => index < 10 ? (
                  <ProductCard item={item} key={index} />
                ) : null)}
              </div>
            </div>
            <div className='flex justify-start'>
              {value.length > 10 && (
                <div className='text-sm text-destructive cursor-pointer underline hover:text-muted-foreground'>
                  View All
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AllProductPage
