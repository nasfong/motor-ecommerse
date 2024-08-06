'use client'
import ProductCard from './ProductCard';
import { Pencil } from 'lucide-react';
import { Button } from './ui/button';
import { DeleteButton } from './DeleteButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useTranslations } from 'next-intl';

type Props = {
  parent: string
  child: Product[]
  handleEdit?: (item: Product) => void
  handleDelete?: (id: string) => Promise<boolean>
  isPendingDelete: boolean
}

const AllProductCard = ({ parent, child, handleEdit, handleDelete, isPendingDelete }: Props) => {
  const t = useTranslations('all-product')
  return (
    <div className='flex flex-col gap-5' >
      <div className='flex justify-between border-b'>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
          {parent}
        </h2>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4" >
        {child.map((item, index) => (
          <div className='relative' key={index}>
            <ProductCard
              item={item}
              className='h-[200px]'
              // pageRef={slides.length >= 5 && slides.length === index + 1 ? pageRef : null}
              delay={child.length <= 5 ? index / 4 : 0}
            />
            <div className='absolute top-2 left-2 flex gap-1'>
              {handleEdit && (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size='sm' variant='outline' onClick={() => handleEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('Edit')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {handleDelete && (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DeleteButton handleConfirm={() => handleDelete(item.id)} loading={isPendingDelete} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('Delete')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        ))}
      </div >
    </div >
  )
}

export default AllProductCard
