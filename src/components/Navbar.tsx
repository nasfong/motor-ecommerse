"use client"
import { Menu, Package2 } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useGlobalContext } from '@/lib/context';
import { RightClickLogin } from './RightClickLogin';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { LanguageSelector } from './Language';
import { ThemeToggle } from './ThemeToggle';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
// import dynamic from 'next/dynamic';
// const CartCount = dynamic(() => import('./CartCount'), { ssr: false })


const Navbar = ({ locale }: { locale: string }) => {
  const t = useTranslations('navbar');
  const pathname = usePathname()
  const { dispatch, state: { token: isAuth } } = useGlobalContext()
  // const onOpenSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })

  const onLogout = () => {
    dispatch({ type: 'LOGOUT' })
    toast.success('Logout!')
  }

  const navbar = [
    {
      name: t('Home'),
      path: '/',
    },
    {
      name: t('All Products'),
      path: '/all-product',
    },
    {
      name: t('Contact'),
      path: '/contact',
    },
  ];

  return (
    <>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <RightClickLogin isAuth={!!isAuth} onLogout={onLogout} />
        {navbar.map((item, index) => {
          const active = item.path === pathname
          return (
            <Link
              key={index}
              href={item.path}
              className={cn(
                `text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap`,
                { 'text-foreground': active }
              )}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className='fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm pr-0'>
          <SheetTitle>
            <VisuallyHidden.Root>
              Menu
            </VisuallyHidden.Root>
          </SheetTitle>
          <nav className="grid gap-6 text-lg font-medium">
            <SheetClose asChild>
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
            </SheetClose>
            {navbar.map((item, index) => {
              const active = item.path === pathname
              return (
                <SheetClose key={index} asChild>
                  <Link
                    href={item.path}
                    className={cn(
                      `text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap`,
                      { 'text-foreground': active }
                    )}
                  >
                    {item.name}
                  </Link>
                </SheetClose>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex gap-3 ml-auto'>
        <ThemeToggle />
        <LanguageSelector locale={locale} />
        {/* <Button size="icon" variant="outline" className='relative' onClick={onOpenSidebar}>
          <ShoppingCart />
          <CartCount />
        </Button> */}
      </div>
    </>
  )
}

export default Navbar
