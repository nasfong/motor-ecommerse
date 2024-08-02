import Contact from '@/components/Contact'
import Map from '@/components/Map'
import React from 'react'

const ContactPage = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/3">
        <Contact />
      </div>
      <div className="h-[600px] w-full sm:w-2/3">
        <Map />
      </div>
    </div>
  )
}

export default ContactPage
