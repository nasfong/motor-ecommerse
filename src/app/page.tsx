import Image from "next/image";
import { Button } from "@/components/ui/button";
import Tabs from "@/components/Tabs";
import Slider from "@/components/Slider";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

async function getData(): Promise<{ products: Products; types: Type[] }> {
  const [productRes, typeRes] = await Promise.all([
    fetch('http://localhost:5000/api/product'),
    fetch('http://localhost:5000/api/type'),
  ]);

  if (!productRes.ok || !typeRes.ok) {
    throw new Error('Failed to fetch data');
  }

  const products = await productRes.json();
  const types = await typeRes.json();

  return { products, types };
}
export default async function HomePage() {
  const { products, types } = await getData()

  return (
    <main className="flex flex-col gap-5">
      <Slider />
      <Tabs data={types} />
      <div className='grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {products?.data.map((item, index) => (
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
