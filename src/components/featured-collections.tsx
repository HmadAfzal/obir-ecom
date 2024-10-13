import Image from 'next/image'

interface CollectionProps {
  title: string
  image: string
}

const Collection: React.FC<CollectionProps> = ({ title, image }) => (
  <div className="relative w-full h-screen">
    <Image

      src={image}
      alt={`${title} collection image`}
      height={400}
      width={400}
      objectFit="cover"
      className="z-0 h-full w-full"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      <h2 className='text-center font-bold text-5xl text-white mb-8'>{title}</h2>
    </div>
  </div>
)

export default function FeaturedCollections() {
  const collections = [
    {
      title: "NEWS",
      image: "/home1.jpeg",
      womenLink: "/collections/women-news",
      menLink: "/collections/men-news",
    },
    {
      title: "VELVET CAPSULE",
      image: "/home2.jpeg",
      womenLink: "/collections/women-velvet",
      menLink: "/collections/men-velvet",
    },
    {
      title: "VOLKAN LAINE",
      image: "/home3.jpeg",
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