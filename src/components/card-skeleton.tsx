import React from 'react'
import { Skeleton } from './ui/skeleton'

const CardSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-[350px]" />
            <div className="space-y-2">
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[40px]" />
            </div>
            <Skeleton className="h-12 w-[350px]" />
        </div>
    )
}

export default CardSkeleton
