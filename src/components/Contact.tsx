import React from 'react'
import { TelegramIcon, Facebook02Icon } from "hugeicons-react"
import { Phone } from 'lucide-react'
const contacts = [
  {
    icon: Phone,
    name: 'Phone Number',
    value: '+855 456-7890',
    color: '#90bb21',
  },
  {
    icon: Facebook02Icon,
    name: 'Facebook',
    value: 'Motor Shop',
    color: '#227bf3',
  },
  {
    icon: TelegramIcon,
    name: 'Telegram',
    value: 'Motor Shop',
    color: '#31aae9',
  }
]

const Contact = () => {
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
