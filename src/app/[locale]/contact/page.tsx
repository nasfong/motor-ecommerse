import Contact from '@/components/Contact'
import Map from '@/components/Map'
import { getTranslations } from 'next-intl/server';
import React from 'react'

export async function generateMetadata({ params: { locale } }: generateMetadataProps) {
  const t = await getTranslations('metadata');
  return {
    title: `${t('Contact Kyhan Motor')} | ${t('Get in Touch with Us')}`,
    description: t("contact_description"),
    keywords: t("contact_keywords"),
    alternates: {
      canonical: `https://www.kyhanmotorshop.store/${locale}`,
    },
    openGraph: {
      title: `${t('Contact Kyhan Motor')} | ${t('Get in Touch with Us')}`,
      description: t("contact_description"),
      url: `https://www.kyhanmotorshop.store/${locale}`,
      type: 'website',
    },
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
