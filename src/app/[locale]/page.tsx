import { Button } from "@/components/ui/button";
import Tabs from "@/components/Tabs";
// import Slider from "@/components/Slider";
import Link from "next/link";
import ProductList from "@/components/ProductList";
import { useTranslations } from 'next-intl';
import { getTranslations } from "next-intl/server";

async function getData(): Promise<Type[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/type`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });
  try {
    // const data = await getData();
    // if (!data) throw new Error('product_type_not_found');
    return (
      <main className="flex flex-col gap-5">
        {/* <Slider /> */}
        {/* <Tabs data={data} /> */}
        <ProductList />
        <div className='text-center'>
          <Link href='/all-product'>
            <Button variant="destructive">
              {t('View All Products')}
            </Button>
          </Link>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in HomePage component:', error);
    return (
      <div>Error loading the page</div>
    );
  }
}
