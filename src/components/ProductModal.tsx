import { PlusCircle } from "lucide-react"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { toast } from "sonner"
import { Form } from "./ui/form"
import { InputForm } from "./form/InputForm"
import { SelectForm } from "./form/SelectForm"
import { memo } from "react"
import Upload from "./form/Upload"
import { InputFileForm } from "./form/InputFileForm"

const formSchema = z.object({
  image: z.any().optional(),
  name: z.string().optional(),
  price: z.string().optional()
  // .positive("Price must be a positive number")
  ,
  description: z.string().optional(),
  type: z.string().optional(),
  isNew: z.boolean().default(false),
  isSold: z.number().default(1),
  recommend: z.boolean().default(false),
})

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  formValue: Product | null
  setFormValue: any
}

const ProductModal = memo(({ open, setOpen, formValue, setFormValue }: Props) => {

  const mutation = useMutation

  const defaultValues = {
    image: [],
    name: "",
    price: 0,
    description: "",
    type: "",
    isSold: 1,
    inStock: false,
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: defaultValues
  })

  const onOpenChange = (isOpen: boolean) => {
    setOpen(Boolean(isOpen))
    // close with clear value
    if (!isOpen) {
      form.reset()
      setFormValue(defaultValues)
    }
  }
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (data.image && data.image.length > 0) {
      for (let i = 0; i < data.image.length; i++) {
        formData.append(`image`, data.image[i]);
      }
    }
  
    // Append other fields to FormData
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description || '');
    formData.append('type', data.type);
    formData.append('isNew', data.isNew.toString());
    formData.append('isSold', data.isSold.toString());
    formData.append('recommend', data.recommend.toString());
    for (const value of formData.values()) {
      console.log(value);
    }
    toast("Event has been created", {
      description: JSON.stringify(data, null, 2),
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })

  }
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1" onClick={() => onOpenChange(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[60%]">
          <DialogHeader>
            <DialogTitle>{!formValue?._id ? 'Create' : 'Edit'} Product</DialogTitle>
            <DialogDescription>
              product information form.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <Upload />
              <InputFileForm
                form={form}
                name="image"
                label="File"
                multiple
              />
              <InputForm
                form={form}
                name="name"
                placeholder="name"
                label="Model"
              />
              <div className="grid grid-cols-3 gap-3">
                <InputForm
                  form={form}
                  name="price"
                  placeholder="price"
                  label="Price"
                />
                <SelectForm
                  form={form}
                  name="type"
                  placeholder="Select a type"
                  label="Type"
                  options={[
                    { id: "1", name: "Dream" },
                    { id: "2", name: "Scoopy" },
                    { id: "3", name: "Suzuki" },
                  ]}
                  loading={true}
                />
              </div>
              <DialogFooter className="mt-3">
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
})

export default ProductModal
