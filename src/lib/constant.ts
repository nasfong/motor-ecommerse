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

const contacts = [
  {
    icon: Phone,
    name: 'Phone Number',
    value: '012 456 789',
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

export const Constant = {
  stocks,
  location,
  default_image,
  contacts
}