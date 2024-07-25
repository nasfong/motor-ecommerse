import ProductImageGallery from "@/components/ProductImageGallery"
import { Ratings } from "@/components/Rating"
import RelationProduct from "@/components/RelationProduct"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/Container"
import Image from "next/image"

async function getData(id: string): Promise<Product> {
  const res = await fetch(`http://localhost:5000/api/product/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id)
  return (
    <Container className="">
      <div className='flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black'>
        <div className="relative  h-full w-full overflow-hidden">
          <ProductImageGallery images={data.image} />
        </div>
        <div className="basis-full lg:basis-2/6">
          <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
            <h1 className="mb-2 text-5xl font-medium text-nowrap">{data.name}</h1>
            <Ratings rating={4} variant="yellow" />
            <p>$20.00<span className="ml-1 inline">USD</span></p>
          </div>
          <div className='flex flex-col gap-2 mb-5'>
            {data.isSold === 1 ? (
              <Badge variant="outline">New</Badge>
            ) : (
              <Badge variant="outline">Secondary</Badge>
            )}
            {data.isSold === 1 ? (
              <Badge variant="outline" className='bg-green-50'>In Stock</Badge>
            ) : (
              <Badge variant="outline" className='bg-red-50'>Sold Out</Badge>
            )}
          </div>
          <Button className="w-full">Add to cart</Button>
        </div>
      </div>
      <div className="py-8">
        <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
        <RelationProduct typeId={data.type.id} />
      </div>
    </Container>
  )
}