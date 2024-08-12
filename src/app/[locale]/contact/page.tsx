import Contact from '@/components/Contact'
import Map from '@/components/Map'
import { getTranslations } from 'next-intl/server';
import React from 'react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('Contact Page'),
    description: t('Contact Map address'),
  };
}

const ContactPage = () => {
  return (
    <main className="flex flex-col sm:flex-row gap-4">
      <section className="w-full sm:w-1/3">
        <Contact />
      </section>
      <section className="h-[600px] w-full sm:w-2/3">
        <Map />
      </section>
    </main>
  )
}

export default ContactPage
