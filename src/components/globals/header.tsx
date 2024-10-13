'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, Sun, Moon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useQuery } from '@apollo/client'
import { GET_CART } from '@/graphql/queries/cart.query'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const { data: cartData } = useQuery(GET_CART, {
    variables: { userId: session?.user?.id || '' },
    skip: !session?.user?.id,
  })

  const cartItemCount = cartData?.getCart?.totalQuantity || 0

  const NavItems = () => (
    <>
      <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
        Shop
      </Link>
      <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
        Contact
      </Link>
      <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-primary">
        Privacy
      </Link>
    </>
  )

  const ThemeToggle = ({ mobile = false }) => (
    <Button
      variant="ghost"
      size={mobile ? "sm" : "icon"}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={mobile ? "justify-start px-2" : ""}
      aria-label="Toggle theme"
    >
      {mounted && (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
          {mobile && <span className="ml-2">Toggle theme</span>}
        </>
      )}
    </Button>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold sm:text-3xl">Obir</span>
        </Link>
        
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="hidden md:flex items-center space-x-6">
            <NavItems />
          </div>

          <ThemeToggle />

          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Link>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User menu">
                  <User className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => signOut()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="mt-6 flex flex-col space-y-4">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header