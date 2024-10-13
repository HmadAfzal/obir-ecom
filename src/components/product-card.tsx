'use client'

import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_TO_CART } from '@/graphql/mutations/cart.mutations'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Link from 'next/link'
import { GET_CART } from '@/graphql/queries/cart.query'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ProductCard = ({ product }: { product: { name: string, price: string, image: string, id: string } }) => {
  const { data: session } = useSession();
  const router = useRouter()
  const { data: cartData, loading: cartLoading } = useQuery(GET_CART, {
    variables: { userId: session?.user?.id || '' },
    skip: !session?.user?.id,
  });

  const [addToCart, { loading: addToCartLoading }] = useMutation(ADD_TO_CART)

  const isInCart = cartData?.getCart?.items.some((item: any) => item.product.id === product.id);

  const handleCart = async () => {
    if (!session?.user?.id) {
      router.push('/login')
      return;
    }

    try {
      const response = await addToCart({
        variables: {
          input: {
            productId: product.id,
            userId: session.user.id
          }
        },
        refetchQueries: [{ query: GET_CART, variables: { userId: session.user.id } }]
      })
      toast.success(response?.data.addToCart.message)
    } catch (error: any) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="w-full h-[240px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="mb-4">${product.price}</p>
        {isInCart ? (
          <Link href="/cart" passHref>
            <Button className="px-4 py-2 w-full">
              <Check className='size-4 mr-2' />  View in Cart
            </Button>
          </Link>
        ) : (
          <Button
            onClick={handleCart}
            className="px-4 py-2 w-full"
            disabled={addToCartLoading || cartLoading}
          >
            {addToCartLoading ? 'Adding...' : 'Add to Cart'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProductCard