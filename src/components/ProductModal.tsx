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

const formSchema = z.object({
  model: z.string().nonempty({ message: 'Model is required!' }),
  price: z.string().nonempty({ message: 'Price is required!' }),
  type: z.string().nonempty({ message: 'Type is required!' }),
  color: z.string().nonempty({ message: 'Color is required!' }),
  motorNumber: z.string().optional(),
  machineNumber: z.string().optional(),
})

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  formValue: any
  setFormValue: any
}

const ProductModal = memo(({ open, setOpen, formValue, setFormValue }: Props) => {
  const defaultValues = {
    model: "",
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
            <DialogTitle>{!formValue?.id ? 'Create' : 'Edit'} Product</DialogTitle>
            <DialogDescription>
              product information form.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div
                className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer"
              >
                <input
                  accept="*"
                  type="file"
                  multiple
                  className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                  // onChange={addFiles}
                />
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
              </div>
              <InputForm
                form={form}
                name="model"
                placeholder="model"
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
