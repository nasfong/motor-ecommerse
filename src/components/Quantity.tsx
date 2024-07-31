import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function Quantity({
  quantity,
  onMinusCard,
  onPlusCard
}: any) {

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
