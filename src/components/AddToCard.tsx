'use client'
import { useGlobalContext } from "@/lib/context"
import { Button } from "./ui/button"

const AddToCard = ({ item }: { item: Product }) => {
  const { state, dispatch } = useGlobalContext()
  console.log(state.carts)
  const onAddCard = (data: Product) => {
    dispatch({ type: 'ADD_CART', payload: data })
  }
  return (
    <Button className="w-full" onClick={() => onAddCard(item)}>Add to cart</Button>
  )
}

export default AddToCard