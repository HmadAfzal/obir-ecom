import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const SingleProductSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-20 items-center">
      <div className="relative aspect-square mb-4">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
      <div>
        <Skeleton className="h-6 w-20 mb-2" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-5 h-5 mr-1" />
            ))}
          </div>
          <Skeleton className="w-32 h-5 ml-2" />
        </div>
        <Skeleton className="h-8 w-24 mb-4" />
        <Skeleton className="h-20 w-full mb-6" />
        <div className="flex space-x-4 mb-6">
          <Skeleton className="h-12 flex-1" />
        </div>
        <Tabs defaultValue="details" className="w-full">
          <TabsContent value="details">
            <Card className='rounded-none border-none'>
              <CardContent className="pt-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shipping">
            <Card className='rounded-none border-none'>
              <CardContent className="pt-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SingleProductSkeleton