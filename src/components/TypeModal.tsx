import { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Pencil, PlusCircle } from 'lucide-react'
import { Form } from './ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputForm } from './form/InputForm'
import { useDeleteType, useQueryType, useSubmitType } from '@/hook'
import { DeleteButton } from './DeleteButton'
import { useTranslations } from 'next-intl'

const formSchema = z.object({
  name: z.string().nonempty("required!"),
})

const TypeModal = () => {
  const t = useTranslations('all-product')
  const [open, setOpen] = useState(false)
  const [formValue, setFormValue] = useState<any>(null)

  const { data: typeData, isLoading: typeLoading } = useQueryType()
  const { mutate, isPending } = useSubmitType(formValue?._id)
  const { mutateAsync: mutateAsyncDelete, isPending: isPendingDelete } = useDeleteType()

  const defaultValues = {
    name: "",
  }
  // hook form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  const onChangeModal = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setOpen(false)
      form.reset(defaultValues)
      setFormValue(defaultValues)
    }
  }

  const handleEdit = (item: Type) => {
    setFormValue(item)
    form.reset({
      name: item.name,
    })
    setOpen(true)
  }

  const handleDelete = (id: string): Promise<boolean> => {
    return mutateAsyncDelete(id)
      .then(() => true)
      .catch(() => false);
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: () => {
        setFormValue(null)
        form.reset(defaultValues)
      }
    })
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={onChangeModal}>
        <DialogTrigger asChild>
          <Button size="sm" type='button' className="h-6" variant="outline" onClick={() => setOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[300px] sm:w-[400px] md:w-[500px]">
          <DialogHeader>
            <DialogTitle>{!formValue?._id ? t('Create Model') : t('Edit Model')}</DialogTitle>
            <DialogDescription>
              {t('model information form')}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={(e) => {
              e.stopPropagation(); // duplicate button type=submit
              form.handleSubmit(onSubmit)(e);
            }} className="flex flex-col gap-3">
              <InputForm
                form={form}
                name="name"
                placeholder={t('Name')}
              />
              <div>{typeData?.map((item, index) => (
                <div key={index} className='flex justify-between'>
                  {item.name}
                  <span>
                    <Button type='button' size='sm' variant='outline' onClick={() => handleEdit(item)} disabled={formValue?._id === item._id}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <DeleteButton handleConfirm={() => handleDelete(item._id)} loading={isPendingDelete} />
                  </span>
                </div>
              ))}</div>
              <DialogFooter className="mt-3">
                <Button type="submit" loading={isPending}>{formValue?._id ? t('Update') : t('Create')}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TypeModal
