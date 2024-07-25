'use client'
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { toast } from "sonner"
import { Form } from "./ui/form"
import { InputForm } from "./form/InputForm"
import { SelectForm } from "./form/SelectForm"
import { useEffect } from "react"
import Upload from "./form/Upload"
import { useQueryClient } from "@tanstack/react-query"
import axios from 'axios'
import { CheckboxForm } from "./form/CheckboxForm"
import { useSubmitProduct } from "@/hook"

const formSchema = z.object({
  image: z.any().optional(),
  name: z.string({ message: "required!" }),
  price: z.number({ message: "required!" }),
  description: z.string().optional(),
  type: z.string().nonempty("required!"),
  isNews: z.boolean().default(false),
  isSold: z.number().default(1),
  recommend: z.boolean().default(false),
  removeImages: z.array(z.string()).optional(),
  star: z.number().optional(),
})

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  formValue: Product | null
  setFormValue: any
}

const ProductModal = ({ open, setOpen, formValue, setFormValue }: Props) => {
  const onChangeModal = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setOpen(false)
      form.reset()
      setFormValue(defaultValues)
    }
  }

  const productMutation = useSubmitProduct(formValue?.id)

  // default value
  const defaultValues = {
    image: [],
    name: "",
    price: 0,
    description: "",
    type: "6694ea40c237f7d96d391824",
    isNews: true,
    isSold: 1,
    recommend: false,
    removeImages: [],
    star: 0,
  }
  // hook form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  // handle submit
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (data.image && data.image.length > 0) {
      for (let i = 0; i < data.image.length; i++) {
        formData.append(`image`, data.image[i]);
      }
    }
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('description', data.description || '');
    formData.append('type', data.type);
    formData.append('isNews', data.isNews.toString());
    formData.append('isSold', data.isSold.toString());
    formData.append('recommend', data.recommend.toString());
    formData.append('removeImages', JSON.stringify(data.removeImages));

    productMutation.mutateAsync(formData)
      .finally(() => {
        onChangeModal(false)
      })
  }

  // get edit
  useEffect(() => {
    if (formValue) {
      form.reset({
        image: formValue.image,
        name: formValue.name,
        description: formValue.description,
        price: formValue.price,
        type: formValue.type.id,
        isSold: formValue.isSold,
        isNews: formValue.isNews,
        recommend: formValue.recommend,
        removeImages: []
      })
    }
  }, [formValue])

  return (
    <Dialog open={open} onOpenChange={onChangeModal}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1" onClick={() => onChangeModal(true)}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[60%]">
        <DialogHeader>
          <DialogTitle>{!formValue?.id ? 'Create' : 'Edit'} Product</DialogTitle>
          <DialogDescription>
            product information form.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <Upload
              form={form}
              name="image"
            />
            <div className="grid grid-cols-2 gap-3">
              <InputForm
                form={form}
                name="name"
                placeholder="name"
                label="Name"
              />
              <InputForm
                form={form}
                name="price"
                placeholder="price"
                label="Price"
                type="number"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <InputForm
                form={form}
                name="description"
                placeholder="description"
                label="Description"
              />
              <SelectForm
                form={form}
                name="type"
                placeholder="Select a type"
                label="Model"
                options={[
                  { id: "6694ea40c237f7d96d391824", name: "Dream" },
                  { id: "2", name: "Scoopy" },
                  { id: "3", name: "Suzuki" },
                ]}
                loading={true}
              />
              <SelectForm
                form={form}
                name="isSold"
                placeholder="Select a Stock"
                label="Stock"
                options={[
                  { id: 1, name: "In Stock" },
                  { id: 2, name: "Out Stock" },
                ]}
                loading={true}
              />
            </div>
            <CheckboxForm
              form={form}
              name="isNews"
              label="New"
            />
            <CheckboxForm
              form={form}
              name="recommend"
              label="Recommend"
            />
            <DialogFooter className="mt-3">
              <Button type="submit">{formValue?.id ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal
