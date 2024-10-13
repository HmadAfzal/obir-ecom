'use client'
import { useParams } from 'next/navigation'
import { Product } from '@/types/product'
import { useSingleProduct } from '@/hooks/use-single-product'
import ProductCard from '@/components/product-card'
import { useProducts } from '@/hooks/use-products'
import CardSkeleton from '@/components/card-skeleton'
import Singleproduct from '@/components/single-product/single-product'
import ProductSkeleton from '@/components/single-product/single-product-skeleton'
import NewsletterSection from '@/components/news-letter'

export default function SingleProductPage() {
  const params = useParams()
  const productId = Array.isArray(params.id) ? params.id[0] : params.id
  const { data: productData, isLoading: productLoading, error: productError } = useSingleProduct(productId)
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts()

  if (productError) {
    return <div className="flex justify-center items-center min-h-screen">Error: {productError.message}</div>
  }

  const product: Product | undefined = productData?.product



  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {
          productLoading||!product ?
          <ProductSkeleton/> :
          <Singleproduct product={product} />
        }
      
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          {productsError ? (
            <div>Error loading related products: {productsError.message}</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {productsLoading
                ? Array(3).fill(0).map((_, index) => <CardSkeleton key={index} />)
                : productsData?.products
                    .filter(relatedProduct => relatedProduct.id !== product?.id)
                    .slice(0, 3)
                    .map((relatedProduct) => (
                      <ProductCard
                        key={relatedProduct.id}
                        product={{
                          name: relatedProduct.name,
                          price: relatedProduct.price,
                          image: relatedProduct.image,
                          id: relatedProduct.id
                        }}
                      />
                    ))
              }
            </div>
          )}
        </div>
      </main>
      <NewsletterSection/>
    </div>
  )
}