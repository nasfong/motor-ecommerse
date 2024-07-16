'use client'
import { memo } from 'react'
import { EmblaOptionsType, EngineType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

const options: EmblaOptionsType = {
  dragFree: true,
  containScroll: 'keepSnaps',
  watchSlides: false,
  watchResize: false,
  loop: false
}

const ScrollProduct = memo(({ children }: { children: React.ReactNode }) => {
  const [emblaRef, _] = useEmblaCarousel({
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
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className='flex gap-3'>
        {children}
      </div>
    </div>
  )
})

export default ScrollProduct
