import { Button } from "@/components/ui/button";
import Tabs from "@/components/Tabs";
import Slider from "@/components/Slider";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import ProductList from "@/components/ProductList";

async function getData(): Promise<Type[]> {
  const res = await fetch('http://localhost:5000/api/type')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
export default async function HomePage() {
  const data = await getData()

  return (
    <main className="flex flex-col gap-5">
      <Slider />
      <Tabs data={data} />
      <ProductList />
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
