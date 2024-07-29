"use client"
import Link from 'next/link'
import { Menu, Package2, Search, ShoppingCart } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useGlobalContext } from '@/lib/context';
import { RightClickLogin } from './RightClickLogin';
const CartCount = dynamic(() => import('./CartCount'), { ssr: false })

const navbar = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'All Product',
    path: '/all-product',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
  {
    name: 'About',
    path: '/about',
  },
]

const Navbar = () => {
  const pathname = usePathname()
  const { dispatch, state: { token: isAuth } } = useGlobalContext()
  const onOpenSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })

  const onLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  
  return (
    <>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <RightClickLogin>
          {isAuth ? (
            <div onClick={onLogout}>Logout</div>
          ) : (
            <Link href="/login">
              Login
            </Link>
          )}
        </RightClickLogin>
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
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
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
        </SheetContent>
      </Sheet>
      {/* <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
      </div> */}
      <Button size="icon" variant="outline" className='relative ml-auto' onClick={onOpenSidebar}>
        <ShoppingCart />
        <CartCount />
      </Button>
    </>
  )
}

export default Navbar
