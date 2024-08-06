import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

type QuantityProps = {
  quantity: number
  onMinusCard: () => void
  onPlusCard: () => void
}

export function Quantity({
  quantity,
  onMinusCard,
  onPlusCard
}: QuantityProps) {

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={onMinusCard}>
          -
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>
            {quantity}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem onClick={onPlusCard}>
          +
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
