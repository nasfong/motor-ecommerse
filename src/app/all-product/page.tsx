'use client'
import AllProductCard2 from "@/components/AllProductCard2";
import AllProductLoading from "@/components/AllProductLoading";
import { useProducts } from "@/hook";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useSWR from 'swr'

const groupList = (list: any[]) => {
  return list.reduce<{ [key: string]: typeof list }>((acc, item) => {
    if (!acc[item.type?.name]) {
      acc[item.type?.name] = [];
    }
    acc[item.type?.name].push(item);
    return acc;
  }, {})
}



const AllProductPage = () => {

  const { data, isLoading, isFetching, error } = useProducts()
  if (error) return <div>Failed to load</div>
  return (
    <div className='flex flex-col gap-5 w-full'>
      {isLoading || isFetching ?
        // loading
        Array.from({ length: 2 }).map((_, index) => <AllProductLoading key={index} />)
        :
        // list
        data?.data && Object.entries(groupList(data.data)).map(([key, value]) => <AllProductCard2 parent={key} child={value} key={key} />)
      }
    </div>
  )
}

export default AllProductPage
