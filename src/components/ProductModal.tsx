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
import { memo, useState } from "react"

const formSchema = z.object({
  name: z.string().nonempty({ message: 'Model is required!' }),
  price: z.string().nonempty({ message: 'Price is required!' }),
  type: z.string().nonempty({ message: 'Type is required!' }),
  status: z.number().optional(),
})

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  formValue: any
  setFormValue: any
}

const ProductModal = memo(({ open, setOpen, formValue, setFormValue }: Props) => {
  const [imagePreview, setImagePreview] = useState<any>(null)
  const defaultValues = {
    name: "",
    price: "",
    type: "",
    color: "",
    motorNumber: "",
    machineNumber: "",
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  const onOpenChange = (isOpen: boolean) => {
    setOpen(Boolean(isOpen))
    // close with clear value
    if (!isOpen) {
      form.reset()
      setFormValue(defaultValues)
    }
  }

  const handleChangeImage = (e: any) => {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return

    const file = files[0]

    const reader = new FileReader()
    reader.onloadend = function (e) {
      setImagePreview(e.target?.result)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    toast("Event has been created", {
      description: JSON.stringify(data, null, 2),
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })

  }
  return (
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
          <DialogTitle>{!formValue?.id ? 'Create' : 'Edit'} Product</DialogTitle>
          <DialogDescription>
            product information form.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer">
              <input
                accept="*"
                type="file"
                multiple={false}
                className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                onChange={handleChangeImage}
              />
              {!imagePreview ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <svg
                    className="w-6 h-6 mr-1 text-current-50"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="m-0">Drag your files here or click in this area.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-36 text-center">
                  <img className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview" src={imagePreview} alt="Preview" />
                  <div className="absolute -top-4 -right-4">
                    <Button size='icon' variant='outline' className="rounded-full" onChange={() => setImagePreview(null)} type="button">
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <InputForm
              form={form}
              name="name"
              placeholder="name"
              label="Model"
            />
            <div className="grid grid-cols-2 gap-3">
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
  )
})

export default ProductModal
