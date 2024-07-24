'use client'
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

type Props = {
  data: Type[]
}

const Tabs = ({ data }: Props) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams()
  const search = searchParams.get('type')

  const onTab = (name: string) => {
    replace(`?type=${name}`, { scroll: false });
  }
  return (
    <div className="flex gap-1">
      <button
        className={cn(
          `flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary text-muted-foreground`,
          { 'bg-muted font-medium text-primary': search === '' || search === null }
        )}
        onClick={() => onTab('')}
      >
        All
      </button>
      {data.map(({ id, name }, index) => (
        <button
          key={index}
          className={cn(
            `flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary text-muted-foreground`,
            { 'bg-muted font-medium text-primary': search ? id === search : id === 'All' }
          )}
          onClick={() => onTab(id)}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default Tabs
