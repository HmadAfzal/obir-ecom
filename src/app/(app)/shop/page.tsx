'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from '@/components/product-card';
import { Product } from '@/types/product';
import { useProducts } from '@/hooks/use-products';
import NewsletterSection from '@/components/news-letter';
import SneakerCategory from '@/components/sneaker-category';
import CardSkeleton from '@/components/card-skeleton';

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const { data, isLoading, error } = useProducts();

  if (error) return `Error! ${error.message}`;

  const products: Product[] = data?.products || [];
  const filteredProducts = products.filter(
    product =>
      (categoryFilter === "ALL" || product.category === categoryFilter) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <SneakerCategory />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shop Our Collection</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select onValueChange={setCategoryFilter} defaultValue="ALL">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              <SelectItem value="RUNNING">Running</SelectItem>
              <SelectItem value="CASUAL">Casual</SelectItem>
              <SelectItem value="SNEAKERS">Sneakers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
              [1,2,3,4,5,6].map(()=>(
                <CardSkeleton/>
              ))  
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{ name: product.name, price: product.price, image: product.image, id: product.id }}
                />
              ))
            )}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No products found matching your criteria.
          </p>
        )}
      </main>
      <NewsletterSection />
    </div>
  );
}
