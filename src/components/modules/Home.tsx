'use client'
import { getProduct, getType } from "@/hook"
import { useQuery } from "@tanstack/react-query"
import Tabs from "../Tabs"
import ProductList from "../ProductList"
import { Link } from "@/navigation"
import { Button } from "../ui/button"
import { useTranslations } from "next-intl"

export default function Home() {
  const t = useTranslations()
  const { data: typeData} = useQuery({
    queryKey: ['productType'],
    queryFn: getType,
  })
  const { data: productData } = useQuery({
    queryKey: ['products'],
    queryFn: getProduct,
  })

  return (
    <div className='flex flex-col gap-5'>
      {typeData && <Tabs data={typeData} />}
      {productData && <ProductList data={productData} />}
      <div className='text-center'>
        <Link href='/all-product'>
          <Button variant="destructive">
            {t('View All Products')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
