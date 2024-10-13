'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import { Button, buttonVariants } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { GET_CART } from '@/graphql/queries/cart.query'
import { REMOVE_FROM_CART, UPDATE_CART_ITEM } from '@/graphql/mutations/cart.mutations'
interface CartItem {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    image: string
  }
}

export default function CartPage() {
  const { data: session } = useSession();
  const userId = session?.user.id || '';
  const { loading, error, data } = useQuery(GET_CART, {
    variables: { userId },
  })

  const [updateCartItem] = useMutation(UPDATE_CART_ITEM)
  const [removeFromCart] = useMutation(REMOVE_FROM_CART)

  const updateQuantity = async (productId: string, action: 'INCREMENT' | 'DECREMENT') => {
    await updateCartItem({
      variables: {
        input: {
          userId,
          productId,
          action
        }
      },
      refetchQueries: [{ query: GET_CART, variables: { userId } }]
    })
  }

  const removeItem = async (productId: string) => {
    await removeFromCart({
      variables: {
        input: {
          userId,
          productId
        }
      },
      refetchQueries: [{ query: GET_CART, variables: { userId } }]
    })
  }

  if (loading) return <div className='min-h-screen flex items-center justify-center'><Loader2 className='animate-spin size-5'/></div>
  if (error) return <div>Error: {error.message}</div>

  const cartItems = data?.getCart?.items || []
  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0)

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="mb-4">Your cart is empty.</p>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item: CartItem) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.product.image || "/placeholder.svg?height=80&width=80"}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.product.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, 'DECREMENT')}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, 'INCREMENT')}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${item.product.price}</TableCell>
                    <TableCell className="text-right">${(item.product.price * item.quantity)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-8 flex flex-col items-end">
              <div className="text-2xl font-bold mb-4">
                Total: ${total}
              </div>
              <Link href="/checkout" className={`${buttonVariants({ variant: "default" })}`}>
                Proceed to Checkout
             </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}