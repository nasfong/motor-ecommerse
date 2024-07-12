'use client'
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

const motorType = ['All', 'Suzuki', 'Honda', 'Toyota', 'Dream']

const Tabs = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams()
  const search = searchParams.get('type')

  const onTab = (name: string) => {
    replace(`?type=${name}`, { scroll: false });
  }
  return (
    <div className="flex gap-1">
      {motorType.map((name, index) => (
        <button
          key={index}
          className={cn(
            `flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary text-muted-foreground`,
            { 'bg-muted font-medium text-primary': search ? name === search : name === 'All' }
          )}
          onClick={() => onTab(name)}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default Tabs
