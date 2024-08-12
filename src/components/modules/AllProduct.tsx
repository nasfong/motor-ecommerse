'use client'
import { getProduct, useDeleteProduct } from "@/hook";
import { useQuery } from "@tanstack/react-query";
import AllProductCard from "../AllProductCard";
import { useGlobalContext } from "@/lib/context";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import ProductModal from "../ProductModal";
import { useTranslations } from "next-intl";

const groupList = (list: Product[]) => {
  return list.reduce<{ [key: string]: typeof list }>((acc, item) => {
    if (!acc[item.type?.name]) {
      acc[item.type?.name] = [];
    }
    acc[item.type?.name].push(item);
    return acc;
  }, {})
}

export default function AllProduct() {
  const t = useTranslations('all-product')
  const { data: productData } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProduct(),
  })
  const { mutateAsync: mutateAsyncDelete, isPending: isPendingDelete } = useDeleteProduct()

  const { state: { token: isAuth } } = useGlobalContext()

  const [open, setOpen] = useState(false)
  const [formValue, setFormValue] = useState<Product | null>(null)

  const handleEdit = (item: Product) => {
    setFormValue(item)
    setOpen(true)
  }
  const handleDelete = (id: string): Promise<boolean> => {
    return mutateAsyncDelete(id)
      .then(() => true)
      .catch(() => false);
  }

  return (
    <section>
      {isAuth && (
        <section>
          <Button size="sm" className="h-8 gap-1 float-end" onClick={() => setOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {t('Add Product')}
            </span>
          </Button>
          <ProductModal
            open={open}
            setOpen={setOpen}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        </section>
      )}
      <section className='flex flex-col gap-5 w-full'>
        {productData && Object.entries(groupList(productData))
          .map(([key, value]) =>
            <AllProductCard
              key={key}
              parent={key}
              child={value}
              handleEdit={isAuth ? handleEdit : undefined}
              handleDelete={isAuth ? handleDelete : undefined}
              isPendingDelete={isPendingDelete}
            />
          )}
      </section>
    </section>
  )
}
