'use client'
import { useQuery } from "@tanstack/react-query";
import ProductImageGallery from "../ProductImageGallery";
import { Ratings } from "../Rating";
import Container from "../ui/container";
import { getProductById } from "@/hook";
import Text from "../ui/text";
import { Badge } from "../ui/badge";
import AddToCard from "../AddToCard";
import RelationProduct from "../RelationProduct";
import { useTranslations } from "next-intl";

export default function ProductDetail({ id }: { id: string }) {
  const t = useTranslations('product')
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  })
  return data ? (
    <Container>
      <section className='flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black'>
        <article className="relative  h-full w-full overflow-hidden">
          <ProductImageGallery images={data.image} alt={data.name} />
        </article>
        <article className="basis-full lg:basis-2/6">
          <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
            <h2 className="mb-2 text-5xl font-medium text-nowrap">{data.name}</h2>
            <Ratings rating={data.star} variant="yellow" readOnly />
            <span>${data.price}</span>
          </div>
          <Text>
            {data.description}
          </Text>
          <div className='flex  gap-2 my-5'>
            {data.isSold === 1 ? (
              <Badge variant="outline">{t('New')}</Badge>
            ) : (
              <Badge variant="outline">{t('Second hand')}</Badge>
            )}
            {data.isSold === 1 ? (
              <Badge variant="outline" className=''>{t('In Stock')}</Badge>
            ) : (
              <Badge variant="outline" className=''>{t('Out Stock')}</Badge>
            )}
          </div>
          <AddToCard item={data} />
        </article>
      </section>
      <section className="py-8">
        <h3 className="mb-4 text-2xl font-bold">{t('Related Products')}</h3>
        <RelationProduct typeId={data.type._id} excludeProductId={data._id} />
      </section>
    </Container>
  ) : null
}
