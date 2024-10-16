'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useQuery } from '@apollo/client'
import { GET_CART } from '@/graphql/queries/cart.query'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

const Header = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const { data: cartData } = useQuery(GET_CART, {
    variables: { userId: session?.user?.id || '' },
    skip: !session?.user?.id,
  })
  const router = useRouter()

  const handleSignout = async () => {
    await signOut();
    router.push('/login')

  }

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
                <DropdownMenuItem onClick={handleSignout}>
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