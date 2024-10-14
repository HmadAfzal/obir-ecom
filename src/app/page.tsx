'use client'

import Image from "next/image";
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";
import CoreFeatures from "@/components/core-features";
import ProductCard from "@/components/product-card";
import { Product } from "@/types/product";
import { useProducts } from "@/hooks/use-products";
import FeaturedCollections from "@/components/featured-collections";
import NewsletterSection from "@/components/news-letter";
import CardSkeleton from "@/components/card-skeleton";
import Footer from "@/components/globals/footer";
import Header from "@/components/globals/header";

export default function Home() {
  const { data, isLoading, error } = useProducts();

  if (error) return <div className="text-center text-red-500 p-4">Error! {error.message}</div>;

  const products: Product[] = data?.products || [];

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <main className="container mx-auto px-4">
          <section className="py-12 md:py-24">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                INSPIRED BY NATURE, DESIGNED FOR FUTURE.
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                We create sneakers that connect natural materials to a bold design by prioritizing local manufacturing of components to assembly, promising a minimal impact on the environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={'/shop'} className={buttonVariants({ variant: "default", size: "lg" })}>
                  Shop Now
                </Link>
                <Link href={'/about'} className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Learn More
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-12 md:mb-24">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <Image
                src="/hero1.jpeg"
                alt="Stylish shoes on display"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
            </div>
          </section>

          <CoreFeatures />

          <section className="mb-12 md:mb-24 relative">
            <div className="relative aspect-video">
              <Image
                src="/hero2.jpeg"
                alt="Person trying on shoes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white text-center">OBIR VISION</h2>
              </div>
            </div>
          </section>

          <section className="mb-12 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Products</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <CardSkeleton key={index} />
                  ))
                : products.slice(0, 6).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
            </div>
          </section>

          <FeaturedCollections />

          <NewsletterSection />
        </main>
      </div>
      <Footer />
    </>
  );
}