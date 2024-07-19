import RelationProduct from "@/components/RelationProduct"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
    <div>
      <div className='flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black'>
        <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
          <Image
            src={data.image[0]}
            width={1000}
            height={1000}
            className='h-full w-full object-contain'
            alt={data.image[0]}
            sizes="(min-width: 1024px) 66vw, 100vw"
            priority
          />
        </div>
        <div className="basis-full lg:basis-2/6">
          <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
            <h1 className="mb-2 text-5xl font-medium text-nowrap">{data.name}</h1>
            <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
              <p>$20.00<span className="ml-1 inline">USD</span></p>
            </div>
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
          <Button className="rounded-full w-full">Contact</Button>
        </div>
      </div>
      <div className="py-8">
        <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
        <RelationProduct typeId={data.type._id} />
      </div>
    </div>
  )
}