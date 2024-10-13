import Image from 'next/image'
import React from 'react'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Product } from '@/types/product'
const Singleproduct = ({ product }: { product: Product }) => {
  return (
    <div className="grid md:grid-cols-2 gap-20 items-center">
      <div className="relative aspect-square mb-4">
        <Image
          src={product.image}
          alt={product.name}
          height={400}
          width={400}
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div>
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">4.0 (24 reviews)</span>
        </div>
        <p className="text-3xl font-bold mb-4">${product.price}</p>
        <p className="mb-6 text-muted-foreground">{product.description}</p>
        <div className="flex space-x-4 mb-6">
          <Button size="lg" className="flex-1">
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card className='rounded-none border-none'>
              <CardContent className="pt-6">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Made with sustainable materials</li>
                  <li>Comfortable fit for all-day wear</li>
                  <li>Durable construction for long-lasting use</li>
                  <li>Available in multiple colors</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shipping">
            <Card className='rounded-none border-none'>
              <CardContent className="pt-6">
                <p>Free shipping on orders over $100. Standard shipping takes 3-5 business days.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Singleproduct
