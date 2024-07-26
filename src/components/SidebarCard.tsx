import Link from "next/link";
import Text from "./ui/text";
import CartItem from "./CardItem";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const SidebarCard = ({ data, subTotal, total, onClose, goToCheckout }: any) => {
  return (
    <>
      <div className="px-4 sm:px-6 flex-1">
        <div className="flex justify-between items-center gap-3 pt-6">
          <Text variant="sectionHeading" className="text-xl font-bold">
            My Cart
          </Text>
          <Button onClick={onClose} size="icon" variant="outline">
            <X />
          </Button>
        </div>
        <ul className="py-4 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-accent-2">
          {data!.map((item: any, index: any) => (
            <CartItem
              key={index}
              item={item}
            />
          ))}
        </ul>
      </div>

      <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
        <ul className="pb-2">
          <li className="flex justify-between py-1">
            <span>Subtotal</span>
            <span>{subTotal}</span>
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
          <span>{total}</span>
        </div>
        <div>
          <Link href="/checkout" className="w-full">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default SidebarCard;
