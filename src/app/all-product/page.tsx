'use client'
import AllProductCard2 from "@/components/AllProductCard2";
import AllProductLoading from "@/components/AllProductLoading";
import useSWR from 'swr'

const groupList = (list: any[]) => {
  return list.reduce<{ [key: string]: typeof list }>((acc, item) => {
    if (!acc[item.type.name]) {
      acc[item.type.name] = [];
    }
    acc[item.type.name].push(item);
    return acc;
  }, {})
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

const AllProductPage = () => {
  const { data, error } = useSWR('http://localhost:5000/api/allProduct?limit=5', fetcher)

  if (error) return <div>Failed to load</div>

  return (
    <div className='flex flex-col gap-5 w-full'>
      {data ?
        // list
        Object.entries(groupList(data)).map(([key, value]) => <AllProductCard2 parent={key} child={value} key={key} />)
        :
        // loading
        Array.from({ length: 2 }).map((_, index) => <AllProductLoading key={index} />)
      }
    </div>
  )
}

export default AllProductPage
