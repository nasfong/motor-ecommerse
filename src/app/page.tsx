import Image from "next/image";
import { Button } from "@/components/ui/button";
import Tabs from "@/components/Tabs";
import Slider from "@/components/Slider";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";


export default function Home() {
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
  return (
    <main className="flex flex-col gap-5">
      <Slider />
      <Tabs />
      <div className='grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {list.map((item, index) => (
          <ProductCard item={item} key={index} />
        ))}
      </div>
      <div className='text-center'>
        <Link href='/all-product'>
          <Button variant="destructive">
            View All Product
          </Button>
        </Link>
      </div>
    </main>
  );
}
