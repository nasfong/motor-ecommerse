'use client'
import { Link } from "@/navigation"
// import { useGlobalContext } from "@/lib/context"
import { Button } from "./ui/button"
import { useTranslations } from "next-intl"
import { Constant } from '@/lib/constant'
import Map from "./Map"

const AddToCard = ({ item }: { item: Product }) => {
  const t = useTranslations('product')
  // const { dispatch } = useGlobalContext()
  // const onAddCard = (data: Product) => {
  //   dispatch({ type: 'ADD_CART', payload: data })
  // }

  const { color, value, icon: Icon } = Constant.phone
  const social = [Constant.facebook, Constant.telegram]
  return (
    <div>
      {/* <Button className="w-full" onClick={() => onAddCard(item)}>{t('Add to cart')}</Button> */}
      {/* <Link href="/contact">
        <Button className="w-full">{t('Contact')}</Button>  
       </Link> */}
      <div className="flex gap-3 mb-3">
        <div
          style={{ backgroundColor: color }}
          className={
            `flex gap-3 rounded-lg border 
            hover:opacity-95
            p-3 text-white cursor-pointer w-fit h-fit`
          }
        >
          <a href={Constant.phone.url}>
            <h3 className='font-bold'>{value}</h3>
          </a>
          <Icon fill="#ffffff" strokeWidth={0} />
        </div>
        <div className="">
          {/* <h4 className="mt-4 text-lg text-gray-500">Social Media</h4> */}
          <div className='flex gap-1'>
            {social.map(({ icon: Icon, color, url }, index) => (
              <a
                href={url}
                target="_blank"
                key={index}
                style={{ backgroundColor: color }}  // Use inline style for dynamic background color
                className="rounded-full hover:opacity-95 p-3 text-white cursor-pointer"
              >
                <Icon fill="#ffffff" strokeWidth={0} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <section className="h-[200px] w-full">
        <Map options={{
          draggable: false, // Disable map dragging
          scrollwheel: false, // Disable zooming with scroll wheel
          disableDefaultUI: true, // Optional: Hide default UI controls
          zoomControl: false, // Disable zoom control
          disableDoubleClickZoom: true, // Disable double-click zoom
          clickableIcons: false, // Disable clickable POI icons
        }} />
      </section>
    </div>

  )
}

export default AddToCard