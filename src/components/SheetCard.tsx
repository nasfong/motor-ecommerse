import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartItem from "./CardItem"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { formatMoney } from "@/lib/utils"
import { useTranslations } from "next-intl"

type SheetCardProps = {
  open: boolean
  onChangeModal: (open: boolean) => void
  data: ProductCard[]
}

export function SheetCard({ open, onChangeModal, data }: SheetCardProps) {
  const t = useTranslations('cart')
  const total = data.reduce((accumulator, product) => {
    return accumulator + (product.price * product.quantity);
  }, 0);
  return (
    <Sheet open={open} onOpenChange={onChangeModal}>
      <SheetTrigger asChild>
      </SheetTrigger>
      <SheetContent>
        <ScrollArea className="h-5/6">
          <SheetHeader className="p-6">
            <SheetTitle>{t('My Cart')}</SheetTitle>
            <SheetDescription>
              {/* Make changes to your profile here. Click save when you're done. */}
            </SheetDescription>
          </SheetHeader>
          <ul className="px-8 py-4 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-accent-2">
            {data.map((item, index) => (
              <div key={index}>
                {index > 0 && <Separator />}
                <CartItem item={item} />
              </div>
            ))}
          </ul>
        </ScrollArea>
        <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
          <div className="flex justify-between py-3 font-bold mb-2">
            <span>{t('Total')}</span>
            <span>{formatMoney(total)}</span>
          </div>
          <div>
            {/* <Link href="/checkout" className="w-full">
            Proceed to Checkout
          </Link> */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
