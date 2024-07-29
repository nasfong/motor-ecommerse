import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { useGlobalContext } from '@/lib/context'
import { useState } from 'react'

const placeholderImg = '/product-img-placeholder.svg'

const CartItem = ({
  item,
}: {
  item: Product
}) => {
  const { dispatch } = useGlobalContext()
  const [quantity, setQuantity] = useState<number>(1)

  const onRemoveCart = (id: string) => {
    dispatch({ type: 'REMOVE_CART', payload: id })
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
              src={item.image[0] || placeholderImg}
              alt={item.image[0] || 'Product Image'}
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
              className="font-medium cursor-pointer pb-1"
              onClick={onCloseSidebar}
            >
              {item.name}
            </span>
          </Link>
        </div>
        <div className="flex flex-col justify-between space-y-2 text-sm">
          <span>100$</span>
        </div>
      </div>
    </li>
  )
}

export default CartItem
