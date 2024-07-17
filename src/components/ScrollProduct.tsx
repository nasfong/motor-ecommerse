'use client'
import { memo, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType, EngineType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const options: EmblaOptionsType = {
  dragFree: true,
  containScroll: 'keepSnaps',
  watchSlides: false,
  watchResize: false,
  loop: false
}

const ScrollProduct = memo(({ children }: { children: React.ReactNode }) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    // watchSlides: (emblaApi) => {
    //   const reloadEmbla = (): void => {
    //     const oldEngine = emblaApi.internalEngine()

    //     emblaApi.reInit()
    //     const newEngine = emblaApi.internalEngine()
    //     const copyEngineModules: (keyof EngineType)[] = [
    //       'location',
    //       'target',
    //       'scrollBody'
    //     ]
    //     copyEngineModules.forEach((engineModule) => {
    //       Object.assign(newEngine[engineModule], oldEngine[engineModule])
    //     })

    //     newEngine.translate.to(oldEngine.location.get())
    //     const { index } = newEngine.scrollTarget.byDistance(0, false)
    //     newEngine.index.set(index)
    //     newEngine.animation.start()
    //   }

    //   const reloadAfterPointerUp = (): void => {
    //     emblaApi.off('pointerUp', reloadAfterPointerUp)
    //     reloadEmbla()
    //   }

    //   const engine = emblaApi.internalEngine()

    //   if (engine.dragHandler.pointerDown()) {
    //     const boundsActive = engine.limit.reachedMax(engine.target.get())
    //     engine.scrollBounds.toggleActive(boundsActive)
    //     emblaApi.on('pointerUp', reloadAfterPointerUp)
    //   } else {
    //     reloadEmbla()
    //   }
    // }
  })
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) {
      return
    }
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])
  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])
  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className='flex gap-3'>
          {children}
        </div>
      </div>
      <div className="embla__buttons">
        <Button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={prevBtnDisabled}
          variant="outline"
          size="icon"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          onClick={() => emblaApi?.scrollNext()}
          disabled={nextBtnDisabled}
          variant="outline"
          size="icon"
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </div>
  )
})

export default ScrollProduct
