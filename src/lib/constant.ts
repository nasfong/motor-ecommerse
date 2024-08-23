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
  lat: 12.6309728,
  lng: 104.5400165
};

export const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/image/`
export const default_image = '/images/default-image.jpg'

const phone = {
  icon: Phone,
  name: 'Phone Number',
  value: '066 300 016/096 255 5577',
  color: '#90bb21',
  url: 'tel:+855962555577'
}
const facebook = {
  icon: Facebook02Icon,
  name: 'Facebook',
  value: 'ហាងម៉ូតូ គី ហាន',
  color: '#227bf3',
  url: 'https://www.facebook.com/KyhanMotorShop'
}
const telegram = {
  icon: TelegramIcon,
  name: 'Telegram',
  value: 'Sopheaktra Ky',
  color: '#31aae9',
  url: 'https://t.me/sopheaktraky'
}

export const Constant = {
  stocks,
  location,
  default_image,
  phone,
  facebook,
  telegram,
}