import Contact from '@/components/Contact'
import Map from '@/components/Map'
import React from 'react'

const ContactPage = () => {
  return (
    <div className="flex space-x-0">
      <div className="flex-1">
        <Contact />
      </div>
      <div className="flex-1">
        <Map />
      </div>
    </div>
  )
}

export default ContactPage
