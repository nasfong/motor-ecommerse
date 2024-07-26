'use client'
import { useGlobalContext } from '@/lib/context'

const CartCount = () => {
  const { state } = useGlobalContext()
  return (
    <span className="absolute -top-2 -right-2 px-1 py-0 text-[11px] text-white bg-blue-600 rounded">{state.carts.length}</span>
  )
}

export default CartCount
