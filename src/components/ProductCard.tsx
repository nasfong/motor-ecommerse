import Image from 'next/image'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react';

type Props = {
  item: { image: string; name: string }
}

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

const ProductCard = ({ item }: Props) => {
  const [carouselRef, api] = useEmblaCarousel()
  return (
    <div ref={carouselRef}>
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
  )
}

export default ProductCard
