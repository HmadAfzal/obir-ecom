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
import { useSession } from "next-auth/react";
import Footer from "@/components/globals/footer";
import Header from "@/components/globals/header";

export default function Home() {
  const { data, isLoading, error } = useProducts();

  if (error) return `Error! ${error.message}`;

  const products: Product[] = data?.products || [];
  return (
    <>
    <Header/>
    <div className="min-h-screen">
      <main className="container mx-auto px-4">
        <section className="py-12 text-center">
          <h1 className="text-6xl text-left font-extrabold mb-4">INSPIRED BY NATURE, DESIGNED FOR FUTURE.</h1>
          <p className="mb-6 text-muted-foreground text-left">
            We create sneakers that connect natural materials to a bold design by prioritizing local manufacturing of components to assembly, promising a minimal impact on the environment.
          </p>
          <div className="flex justify-start gap-4">
            <Link href={'/shop'} className={buttonVariants({ variant: "default" })}>
              Shop Now
            </Link>
            <Link href={'/about'} className={buttonVariants({ variant: "outline" })}>
              Learn More
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <Image
            src="/hero1.jpeg"
            alt="Stylish shoes on display"
            width={800}
            height={400}
            className="w-full h-[650px] object-cover rounded-lg"
          />
        </section>

        <CoreFeatures />

        <section className="mb-12 relative">
          <h1 className="absolute top-[50%] text-center font-bold text-4xl text-white w-full">OBIR VISION</h1>
          <Image
            src="/hero2.jpeg"
            alt="Person trying on shoes"
            width={800}
            height={400}
            className="w-full h-[400px] object-cover"
          />
        </section>

        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-6">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {isLoading ? (
              [1, 2, 3, 4, 5, 6].map((index) => (
                <CardSkeleton key={index} />
              ))
            ) : (
              products.slice(0, 6).map((product) => (
                <ProductCard
                  key={product.id}
                  product={{ name: product.name, price: product.price, image: product.image, id: product.id }}
                />
              ))
            )}
          </div>
        </section>

        <FeaturedCollections />

        <NewsletterSection />
      </main>
    </div>
    <Footer/>
    </>
  );
}
