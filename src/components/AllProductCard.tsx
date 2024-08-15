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
    <section className='flex flex-col gap-5' >
      <article className='flex justify-between border-b'>
        <h2 id={`section-${parent}`} className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
          {parent}
        </h2>
      </article>
      <article className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2" >
        {child.map((item, index) => (
          <div className='relative' key={index}>
            <ProductCard
              item={item}
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
                      {t('Edit')}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {handleDelete && (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DeleteButton handleConfirm={() => handleDelete(item._id)} loading={isPendingDelete} />
                    </TooltipTrigger>
                    <TooltipContent>
                      {t('Delete')}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        ))}
      </article >
    </section >
  )
}

export default AllProductCard

