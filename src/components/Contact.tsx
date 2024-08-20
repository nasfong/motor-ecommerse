import React from 'react'
import { useTranslations } from 'next-intl'
import { Constant } from '@/lib/constant'


const Contact = () => {
  const t = useTranslations('contact')
  const contacts = [Constant.phone, Constant.facebook, Constant.telegram]

  return (
    <article className='flex flex-col gap-3'>
      {contacts.map(({ name, value, icon: Icon, color, url }, index) => (
        <a
          href={url}
          target="_blank"
          key={index}
          style={{ backgroundColor: color }}  // Use inline style for dynamic background color
          className={
            `flex justify-between items-center rounded-lg border 
            hover:opacity-95
            p-3 text-white cursor-pointer`
          }
        >
          <span>
            <h4>{t(name)}</h4>
            <h3 className='font-bold'>{value}</h3>
          </span>
          <Icon fill="#ffffff" strokeWidth={0} />
        </a>
      ))}
    </article >
  )
}

export default Contact
