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

export function SheetCard({ open, onChangeModal, data }: any) {
console.log(data)
  return (
    <Sheet open={open} onOpenChange={onChangeModal}>
      <SheetTrigger asChild>
      </SheetTrigger>
      <SheetContent>
        <ScrollArea className="h-3/4">
          <SheetHeader className="p-6">
            <SheetTitle>My Cart</SheetTitle>
            <SheetDescription>
              {/* Make changes to your profile here. Click save when you're done. */}
            </SheetDescription>
          </SheetHeader>
          <ul className="p-4 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-accent-2">
            {data!.map((item: any, index: any) => (
              <CartItem
                key={index}
                item={item}
              />
            ))}
          </ul>
        </ScrollArea>
        <div className="flex-shrink-0 bg-white px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
          <ul className="pb-2">
            <li className="flex justify-between py-1">
              <span>Subtotal</span>
              {/* <span>{subTotal}</span> */}
            </li>
            <li className="flex justify-between py-1">
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </li>
            <li className="flex justify-between py-1">
              <span>Shipping</span>
              <span className="font-bold tracking-wide">FREE</span>
            </li>
          </ul>
          <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
            <span>Total</span>
            {/* <span>{total}</span> */}
          </div>
          <div>
            {/* <Link href="/checkout" className="w-full">
            Proceed to Checkout
          </Link> */}
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
