import React from 'react'
import { TelegramIcon, Facebook02Icon } from "hugeicons-react"
import { Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'


const Contact = () => {
  const t = useTranslations('contact')
  const contacts = [
    {
      icon: Phone,
      name: t('Phone Number'),
      value: '+855 456-7890',
      color: '#90bb21',
    },
    {
      icon: Facebook02Icon,
      name: t('Facebook'),
      value: 'Motor Shop',
      color: '#227bf3',
    },
    {
      icon: TelegramIcon,
      name: t('Telegram'),
      value: 'Motor Shop',
      color: '#31aae9',
    }
  ]
  return (
    <div className='flex flex-col gap-3'>
      {contacts.map(({ name, value, icon: Icon, color }, index) => (
        <div key={index} className='flex justify-between items-center rounded-lg border hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800 p-3'>
          <div>
            <div>{name}</div>
            <div className='font-bold'>{value}</div>
          </div>
          <Icon color={color} />
        </div>
      ))
      }
    </div >
  )
}

export default Contact
