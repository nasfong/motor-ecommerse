'use client'
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Form } from "./ui/form"
import { InputForm } from "./form/InputForm"
import { SelectForm } from "./form/SelectForm"
import { useEffect } from "react"
import Upload from "./form/Upload"
import { CheckboxForm } from "./form/CheckboxForm"
import { useQueryType, useSubmitProduct } from "@/hook"
import { Constant } from "@/lib/constant"
import TypeModal from "./TypeModal"
import { Ratings } from "./Rating"
import { TextAreaForm } from "./form/TextAreaForm"
import { useTranslations } from "next-intl"

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  formValue: Product | null
  setFormValue: React.Dispatch<React.SetStateAction<Product | null>>
}

const ProductModal = ({ open, setOpen, formValue, setFormValue }: Props) => {
  const t = useTranslations('all-product')
  const { data: typeData, isLoading: typeLoading } = useQueryType()
  const { mutateAsync, isPending } = useSubmitProduct(formValue?.id)

  const formSchema = z.object({
    file: z.any().optional(),
    image: z.any().optional(),
    name: z.string().nonempty(t('required')),
    price: z.string().nonempty(t('required')),
    description: z.string().optional(),
    type: z.string().nonempty(t('required')),
    isNews: z.boolean().default(false),
    isSold: z.number().default(1),
    recommend: z.boolean().default(false),
    star: z.number(),
  })

  // default value
  const defaultValues = {
    file: [],
    image: [],
    name: "",
    price: "",
    description: "",
    type: "",
    isNews: true,
    isSold: 1,
    recommend: false,
    star: 5,
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
      setFormValue(null)
    }
  }
  // handle submit
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (data.file && data.file.length > 0) {
      for (let i = 0; i < data.file.length; i++) {
        formData.append(`file`, data.file[i]);
      }
    }
    formData.append('image', JSON.stringify(data.image));
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description || '');
    formData.append('type', data.type);
    formData.append('isNews', data.isNews.toString());
    formData.append('isSold', data.isSold.toString());
    formData.append('recommend', data.recommend.toString());
    formData.append('star', data.star.toString());

    mutateAsync(formData)
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
        star: formValue.star,
        recommend: formValue.recommend,
      })
    }
  }, [formValue])


  return (
    <Dialog open={open} onOpenChange={onChangeModal}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="min-w-[60%]">
        <DialogHeader>
          <DialogTitle>{!formValue?.id ? t('Create Product') : t('Edit Product')}</DialogTitle>
          <DialogDescription>
            {t('product information form')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <Upload
              form={form}
              name="file"
            />
            <div className="grid grid-cols-2 gap-3">
              <InputForm
                form={form}
                name="name"
                label={t('Name')}
                placeholder={t('Name')}
              />
              <InputForm
                form={form}
                name="price"
                label={t('Price')}
                placeholder={t('Price')}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SelectForm
                form={form}
                name="type"
                label={t('Model')}
                placeholder={t('Select a Model')}
                addMoreComponent={
                  <TypeModal />
                }
                options={typeData}
                loading={typeLoading}
              />
              <SelectForm
                form={form}
                name="isSold"
                options={Constant.stocks(t)}
                label={t('Stock')}
                placeholder={t('Select a Stock')}
              />
            </div>
            <TextAreaForm
              form={form}
              name="description"
              label={t('Description')}
              placeholder={t('Description')}
            />
            <Ratings rating={form.getValues('star')} variant="yellow" onRatingChange={(value) => form.setValue('star', value)} />
            <CheckboxForm
              form={form}
              name="isNews"
              label={t('New')}
            />
            <CheckboxForm
              form={form}
              name="recommend"
              label={t('Recommend')}
            />
            <DialogFooter className="mt-3">
              <Button type="submit" loading={isPending}>{formValue?.id ? t('Update') : t('Create')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}

export default ProductModal
