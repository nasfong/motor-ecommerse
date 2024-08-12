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
    <article className="flex flex-wrap py-6">
      <button
        className={cn(
          `flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-destructive text-muted-foreground`,
          { 'font-medium text-destructive': search === '' || search === null }
        )}
        onClick={() => onTab('')}
      >
        All
      </button>
      {data.map(({ _id, name }, index) => (
        <button
          key={index}
          className={cn(
            `flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-destructive text-muted-foreground`,
            { 'font-medium text-destructive': search ? _id === search : _id === 'All' }
          )}
          onClick={() => onTab(_id)}
          title={`${name} Motor Products`}
        >
          {name}
        </button>
      ))}
    </article>
  )
}

export default Tabs
