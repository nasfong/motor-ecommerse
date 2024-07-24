import React, { memo } from 'react'
import { Skeleton } from './ui/skeleton'

const AllProductLoading = memo(() => {
  return (
    <div className='flex flex-col gap-5'>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors border-b">
        <Skeleton className='h-6 w-20 rounded-lg' />
      </h2>
      {/* <div className="overflow-hidden"> */}
        <div className='grid grid-cols-7 gap-4'>
          {Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className='h-[200px] w-[300px] rounded-lg' />)}
        </div>
      {/* </div> */}
    </div>
  )
})

export default AllProductLoading
