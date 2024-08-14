'use client'
import { getProduct, getType } from "@/hook"
import { useQuery } from "@tanstack/react-query"
import Tabs from "../Tabs"
import ProductList from "../ProductList"
import { Link } from "@/navigation"
import { Button } from "../ui/button"
import { useTranslations } from "next-intl"
import Slider from "../Slider"
import slides1 from '../../../public/images/slides/1.jpg'
import slides2 from '../../../public/images/slides/2.jpg'
import slides3 from '../../../public/images/slides/3.jpg'

const images = [
  slides1,
  slides2,
  slides3,
];

type HomeProps = {
  searchParams: { type: string, recommend: boolean }
}

export default function Home({ searchParams }: HomeProps) {
  const t = useTranslations()
  const { data: typeData } = useQuery({
    queryKey: ['productType'],
    queryFn: getType,
  })
  const { data: productData } = useQuery({
    queryKey: ['products', searchParams],
    queryFn: () => getProduct(searchParams),
  })

  return (
    <section>
      <Slider images={images} />
      {typeData && <Tabs data={typeData} />}
      {productData && <ProductList data={productData} />}
      <article className='text-center mt-3'>
        <Link href='/all-product'>
          <Button variant="destructive">
            {t('View All Products')}
          </Button>
        </Link>
      </article>
    </section>
  )
}
