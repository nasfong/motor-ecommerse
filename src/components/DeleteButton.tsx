'use client'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, ButtonProps } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { forwardRef, useState } from "react"

type DeleteButtonProps = ButtonProps & {
  handleConfirm: () => void
  loading: boolean
}

export const DeleteButton = forwardRef<HTMLButtonElement, DeleteButtonProps>(({ handleConfirm, loading, ...props }, ref) => {
  const t = useTranslations('alert')
  const [open, setOpen] = useState(false)

  const onChangeModal = (isOpen: boolean) => setOpen(isOpen)

  return (
    <AlertDialog open={open} onOpenChange={onChangeModal}>
      <AlertDialogTrigger asChild>
        <Button type="button" size='sm' variant='outline' onClick={() => setOpen(true)} ref={ref} {...props}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Are you absolutely sure')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('This action cannot be undone This will permanently delete your account and remove your data from our servers')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>{t('Cancel')}</AlertDialogCancel>
          <Button onClick={handleConfirm} loading={loading}>
            {t('Delete')}
            <Trash2 className="ml-2 h-4 w-4" />
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
})