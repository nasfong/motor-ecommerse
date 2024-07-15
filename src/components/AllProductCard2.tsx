'use client'
import { memo, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType, EmblaOptionsType, EngineType } from 'embla-carousel';
import ProductCard from './ProductCard';
import { Skeleton } from './ui/skeleton';
import { Loader2 } from 'lucide-react';

const options: EmblaOptionsType = {
  dragFree: true,
  containScroll: 'keepSnaps',
  watchSlides: false,
  watchResize: false,
  loop: false
}

type Props = {
  parent: string
  child: {
    image: string;
    name: string;
    type: string;
  }[]
}

const moreData = [
  {
    image: '/images/placeholder.svg',
    name: 'Wave 2050',
    type: 'Honda',
  },
  {
    image: '/images/placeholder.svg',
    name: 'Dream 20241',
    type: 'Honda',
  },
  {
    image: '/images/placeholder.svg',
    name: 'Scoopy 20242',
    type: 'Honda',
  },
  {
    image: '/images/placeholder.svg',
    name: 'MSX 2025',
    type: 'Honda',
  },
  {
    image: '/images/placeholder.svg',
    name: 'Wave 2012',
    type: 'Honda',
  },
]

const AllProductCard = memo(({ parent, child }: Props) => {
  const observer = useRef(null) as MutableRefObject<IntersectionObserver | null>
  const [loading, setLoading] = useState(false)
  const [slides, setSlides] = useState(child)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    watchSlides: (emblaApi) => {
      const reloadEmbla = (): void => {
        const oldEngine = emblaApi.internalEngine()

        emblaApi.reInit()
        const newEngine = emblaApi.internalEngine()
        const copyEngineModules: (keyof EngineType)[] = [
          'location',
          'target',
          'scrollBody'
        ]
        copyEngineModules.forEach((engineModule) => {
          Object.assign(newEngine[engineModule], oldEngine[engineModule])
        })

        newEngine.translate.to(oldEngine.location.get())
        const { index } = newEngine.scrollTarget.byDistance(0, false)
        newEngine.index.set(index)
        newEngine.animation.start()
      }

      const reloadAfterPointerUp = (): void => {
        emblaApi.off('pointerUp', reloadAfterPointerUp)
        reloadEmbla()
      }

      const engine = emblaApi.internalEngine()

      if (engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get())
        engine.scrollBounds.toggleActive(boundsActive)
        emblaApi.on('pointerUp', reloadAfterPointerUp)
      } else {
        reloadEmbla()
      }
    }
  })

  const pageRef = useCallback((node: HTMLElement) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          // setSlides(prev => [...prev, ...moreData])
        }, 3000)
      }
    })
    if (node) observer.current?.observe(node)
  }, [loading])
  // console.log(slides)
  return (
    <div className='flex flex-col gap-2'>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors border-b">
        {parent}
      </h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className='flex gap-3'>
          {slides.map((item, index) => (
            <ProductCard
              item={item}
              className='h-[200px] w-[300px]'
              key={index}
              pageRef={slides.length > 5 && slides.length === index + 1 ? pageRef : null}
            />
          ))}
          {loading && (
            <div className='flex items-center'>
              <Loader2 className="h-10 w-10 animate-spin" color="#000" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default AllProductCard

