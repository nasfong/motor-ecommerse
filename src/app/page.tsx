import { Button } from "@/components/ui/button";
import Tabs from "@/components/Tabs";
// import Slider from "@/components/Slider";
import Link from "next/link";
// import ProductList from "@/components/ProductList";

export default async function HomePage() {
  async function getData(): Promise<Type[]> {
    const res = await fetch('/type', { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }
  const data = await getData()

  return (
    <main className="flex flex-col gap-5">
      {/* <Slider /> */}
      {/* <Tabs data={data} /> */}
      {/* <ProductList /> */}
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
