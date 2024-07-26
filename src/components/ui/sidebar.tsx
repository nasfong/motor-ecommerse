import cn from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

interface SidebarProps {
  children: React.ReactNode
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ children, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const onKeyDownSidebar = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.focus()
    }

    const contentElement = contentRef.current

    if (contentElement) {
      disableBodyScroll(contentElement, { reserveScrollBarGap: true })
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [])

  return (
    <div
      className={cn('fixed inset-0 h-full z-50 box-border outline-none')}
      ref={sidebarRef}
      onKeyDown={onKeyDownSidebar}
      tabIndex={1}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-black bg-opacity-40 duration-100 ease-linear backdrop-blur-sm"
          onClick={onClose}
        />
        <section className="absolute inset-y-0 right-0 w-full md:w-auto max-w-full flex outline-none md:pl-10">
          <div className="h-full w-full md:w-screen md:max-w-md">
            <div
              className={cn(
                'h-full flex flex-col text-base bg-white shadow-xl overflow-y-auto overflow-x-hidden transition-transform duration-300',
              )}
              ref={contentRef}
            >
              {children}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Sidebar
