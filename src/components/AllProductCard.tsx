'use client'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType, EmblaOptionsType, EngineType } from 'embla-carousel';
import ProductCard from './ProductCard';

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

const mockApiCall = (
  minWait: number,
  maxWait: number,
  callback: () => void
): void => {
  const min = Math.ceil(minWait)
  const max = Math.floor(maxWait)
  const wait = Math.floor(Math.random() * (max - min + 1)) + min
  setTimeout(callback, wait)
}

const AllProductCard = memo(({ parent, child }: Props) => {
  const scrollListenerRef = useRef<() => void>(() => undefined)
  const listenForScrollRef = useRef(true)
  const hasMoreToLoadRef = useRef(true)
  const [slides, setSlides] = useState(child)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

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

        setLoadingMore(false)
        listenForScrollRef.current = true
      }

      const reloadAfterPointerUp = (): void => {
        emblaApi.off('pointerUp', reloadAfterPointerUp)
        reloadEmbla()
      }

      const engine = emblaApi.internalEngine()

      if (hasMoreToLoadRef.current && engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get())
        engine.scrollBounds.toggleActive(boundsActive)
        emblaApi.on('pointerUp', reloadAfterPointerUp)
      } else {
        reloadEmbla()
      }
    }
  })

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    if (!listenForScrollRef.current) return
    const lastSlide = emblaApi.slideNodes().length - 1
    const lastSlideInView = emblaApi.slidesInView().includes(lastSlide)

    const loadMore = !loadingMore && lastSlideInView
    // console.log(loadMore)
    if (loadMore) {
      listenForScrollRef.current = false

      mockApiCall(1000, 2000, () => {
        setSlides((currentSlides) => {
          if (currentSlides.length === 20) {
            setHasMoreToLoad(false)
            emblaApi.off('scroll', scrollListenerRef.current)
            return currentSlides
          }
          return [...currentSlides, ...moreData]
        })
      })
    }

    setLoadingMore((loadingMore) => {

      return !loadingMore && lastSlideInView
    })
  }, [])
  // console.log(slides)

  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollListenerRef.current = () => {
        if (!loadingMore) onScroll(emblaApi)
      }
      emblaApi.on('scroll', scrollListenerRef.current)
    },
    [onScroll, loadingMore]
  )

  useEffect(() => {
    if (!emblaApi) return
    addScrollListener(emblaApi)

    // const onResize = () => emblaApi.reInit()
    // window.addEventListener('resize', onResize)
    // emblaApi.on('destroy', () => window.removeEventListener('resize', onResize))
  }, [emblaApi, addScrollListener])

  useEffect(() => {
    hasMoreToLoadRef.current = hasMoreToLoad
  }, [hasMoreToLoad])

  return (
    <div className='flex flex-col gap-2'>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors border-b">
        {parent}
      </h2>
      <div ref={emblaRef} className="overflow-hidden">
        <div className='flex gap-3'>
          {slides.map((item, index) => (
            <ProductCard
              item={item}
              className='h-[300px] w-[300px]'
              key={index}
            />
          ))}
          {hasMoreToLoad && loadingMore && (
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span>
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-start'>
        {child.length > 10 && (
          <div className='text-sm text-destructive cursor-pointer underline hover:text-muted-foreground'>
            View All
          </div>
        )}
      </div>
    </div>
  )
})

export default AllProductCard

