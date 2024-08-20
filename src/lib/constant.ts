import { Facebook02Icon, TelegramIcon } from "hugeicons-react";
import { Phone } from "lucide-react";

// Create a function to get the translated data based on the locale
export const stocks = (t: (s: string) => void) => {
  return [
    { _id: 1, name: t('In Stock') },
    { _id: 2, name: t('Out Stock') }
  ];
};

export const location = {
  lat: 13.3782812,
  lng: 103.8599097
};

export const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/image/`
export const default_image = '/images/default-image.jpg'

const phone = {
  icon: Phone,
  name: 'Phone Number',
  value: '093 580 030',
  color: '#90bb21',
  url: 'tel:+85593580030'
}
const facebook = {
  icon: Facebook02Icon,
  name: 'Facebook',
  value: 'Jinro Shop',
  color: '#227bf3',
  url: 'https://www.facebook.com/share/cZs4DfB9yPjGH9Tr/?mibextid=qi2Omg'
}
const telegram = {
  icon: TelegramIcon,
  name: 'Telegram',
  value: 'Reak The King',
  color: '#31aae9',
  url: 'https://t.me/maomkhmercuisine'
}

export const Constant = {
  stocks,
  location,
  default_image,
  phone,
  facebook,
  telegram,
}