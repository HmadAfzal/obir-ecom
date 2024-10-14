'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface CollectionProps {
  title: string
  image: string
  mobileImage: string
}

const Collection: React.FC<CollectionProps> = ({ title, image, mobileImage }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="relative w-full h-screen">
      <Image
        src={isMobile ? mobileImage : image}
        alt={`${title} collection image`}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black bg-opacity-30">
        <h2 className='text-center font-bold text-3xl md:text-5xl text-white mb-8'>{title}</h2>
      </div>
    </div>
  )
}

export default function FeaturedCollections() {
  const collections = [
    {
      title: "NEWS",
      image: "/home1.jpeg",
      mobileImage: "/small1.jpg",
      womenLink: "/collections/women-news",
      menLink: "/collections/men-news",
    },
    {
      title: "VELVET CAPSULE",
      image: "/home2.jpeg",
      mobileImage: "/small2.jpg",
      womenLink: "/collections/women-velvet",
      menLink: "/collections/men-velvet",
    },
    {
      title: "VOLKAN LAINE",
      image: "/home3.jpeg",
      mobileImage: "/small3.jpg",
      womenLink: "/collections/women-volkan",
      menLink: "/collections/men-volkan",
    },
  ]

  return (
    <section className="bg-white">
      <div className="w-full">
        {collections.map((collection, index) => (
          <Collection key={index} {...collection} />
        ))}
      </div>
    </section>
  )
}