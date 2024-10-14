'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useQuery } from '@apollo/client'
import { GET_CART } from '@/graphql/queries/cart.query'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import confetti from 'canvas-confetti'
import { Loader2, Github } from 'lucide-react'
import Link from 'next/link'

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

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const { loading, error, data } = useQuery(GET_CART, {
    variables: { userId: session?.user?.id },
    skip: !session?.user?.id,
  })

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const validateForm = () => {
    const errors = []
    if (!/^[A-Za-z\s]+$/.test(formData.firstName)) errors.push("Invalid first name")
    if (!/^[A-Za-z\s]+$/.test(formData.lastName)) errors.push("Invalid last name")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push("Invalid email")
    if (formData.address.length < 5) errors.push("Invalid address")
    if (formData.city.length < 2) errors.push("Invalid city")
    if (formData.country.length < 2) errors.push("Invalid country")
    if (!/^\d{5}(-\d{4})?$/.test(formData.postalCode)) errors.push("Invalid postal code")
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) errors.push("Invalid card number")
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) errors.push("Invalid card expiry")
    if (!/^\d{3,4}$/.test(formData.cardCVC)) errors.push("Invalid CVC")
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm()
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
    } else {
      setIsSubmitting(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitting(false)
      setShowPopup(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  if (!isClient) {
    return null // Prevent SSR issues
  }

  if (status === 'loading') {
    return <div className='min-h-screen flex items-center justify-center'><Loader2 className='animate-spin size-5'/></div>
  }

  if (status === 'unauthenticated') {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center space-y-4'>
        <div className='text-xl font-semibold'>You need to login first 😑</div>
        <div className='space-x-4'>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (loading) return <div className='min-h-screen flex items-center justify-center'><Loader2 className='animate-spin size-5'/></div>
  if (error) return <div className='min-h-screen flex items-center justify-center text-red-500'>Error: {error.message}</div>

  const cartItems: CartItem[] = data?.getCart?.items || []
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      name="country" 
                      value={formData.country} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input 
                    id="postalCode" 
                    name="postalCode" 
                    value={formData.postalCode} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    name="cardNumber" 
                    value={formData.cardNumber} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input 
                      id="cardExpiry" 
                      name="cardExpiry" 
                      value={formData.cardExpiry} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCVC">CVC</Label>
                    <Input 
                      id="cardCVC" 
                      name="cardCVC" 
                      value={formData.cardCVC} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                'Place Order'
              )}
            </Button>
          </form>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={50}
                        height={50}
                        className="rounded-md mr-4"
                      />
                      <div>
                        <p className="font-semibold">{item.product.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-between items-center">
                  <p className="text-lg font-bold">Total:</p>
                  <p className="text-lg font-bold">${total.toFixed(2)}</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className='text-center font-bold text-3xl mb-4'>Congratulations! 🎉</DialogTitle>
            <DialogDescription>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="mb-4 text-center">
                  You&apos;ve reached the Top! 🏔️
                  Very few make it this far.
                  Sadly, these shoes won&apos;t be reaching your doorstep because this is a dummy site 😀
                  Don&apos;t worry, I haven&apos;t saved your card details. I&apos;m not that sneaky! 🕵️‍♂️
                  Want to see more of my work? Check out my other projects:
                </p>
                <Button asChild className="w-full">
                  <a href="https://github.com/HmadAfzal" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Visit My GitHub
                  </a>
                </Button>
              </motion.div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}