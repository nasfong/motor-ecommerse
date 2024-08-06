'use client'
import { useGlobalContext } from "@/lib/context"
import { Button } from "./ui/button"
import { useTranslations } from "next-intl"

const AddToCard = ({ item }: { item: Product }) => {
  const t = useTranslations('product')
  const { dispatch } = useGlobalContext()
  const onAddCard = (data: Product) => {
    dispatch({ type: 'ADD_CART', payload: data })
  }
  return (
    <Button className="w-full" onClick={() => onAddCard(item)}>{t('Add to cart')}</Button>
  )
}

export default AddToCard