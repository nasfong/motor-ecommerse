import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartItem from "./CardItem"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { formatMoney } from "@/lib/utils"

type SheetCardProps = {
  open: boolean
  onChangeModal: (open: boolean) => void
  data: ProductCard[]
}

export function SheetCard({ open, onChangeModal, data }: SheetCardProps) {
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
            <SheetTitle>My Cart</SheetTitle>
            <SheetDescription>
              {/* Make changes to your profile here. Click save when you're done. */}
            </SheetDescription>
          </SheetHeader>
          <ul className="px-8 py-4 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-accent-2">
            {data.concat(data).concat(data).concat(data).map((item: any, index: any) => (
              <div key={index}>
                {index > 0 && <Separator />}
                <CartItem item={item} />
              </div>
            ))}
          </ul>
        </ScrollArea>
        <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
          <div className="flex justify-between py-3 font-bold mb-2">
            <span>Total</span>
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
