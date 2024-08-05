import cn from 'clsx'
import Image from 'next/image'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { useGlobalContext } from '@/lib/context'
import { useState } from 'react'
import { Quantity } from './Quantity'
import { formatMoney } from '@/lib/utils'
import { Link } from '@/navigation'

type CardItemProps = {
  item: Product & { quantity: number }
}

const CartItem = ({
  item,
}: CardItemProps) => {
  const { dispatch } = useGlobalContext()

  const onRemoveCart = (id: string) => {
    dispatch({ type: 'REMOVE_CART', payload: id })
  }
  const onInCreaseCard = (id: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  }
  const onDeCreaseCard = (id: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  }

  const onCloseSidebar = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' })
  }

  return (
    <li
      className={cn('flex flex-col py-4', {
        'opacity-50 pointer-events-none': false,
      })}
    >
      <div className="flex flex-row space-x-4 py-4">
        <div className="w-16 h-16 bg-violet relative cursor-pointer">
          <Link href={`/all-product/${item.id}`}>
            <Image
              onClick={onCloseSidebar}
              className="w-full h-full object-cover rounded-lg"
              width={64}
              height={64}
              src={item.image[0]}
              alt={item.image[0]}
            />
          </Link>
          <div className='absolute -top-2 -right-2'>
            <Button
              onClick={() => onRemoveCart(item.id)}
              size="icon"
              variant="outline"
              className='bg-neutral-500 rounded-full  w-4 h-4'
            >
              <X color='#fff' />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex flex-col text-base">
          <Link href={`/all-product/${item.id}`}>
            <span
              className="font-medium cursor-pointer pb-1 line-clamp-2 tracking-tight"
              onClick={onCloseSidebar}
            >
              {item.name}
            </span>
          </Link>
          <span className='font-light text-[12px] line-clamp-2 leading-none tracking-tight'>{item.description}</span>
        </div>
        <div className="flex flex-col items-end text-sm">
          <span>{formatMoney(item.price)}</span>
          <div className=''>
            <Quantity
              quantity={item.quantity}
              onMinusCard={() => onDeCreaseCard(item.id)}
              onPlusCard={() => onInCreaseCard(item.id)}
            />
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem
