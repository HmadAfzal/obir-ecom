import Image from 'next/image'
import Link from 'next/link'

export default function SneakerCategory() {
  return (
    <div className=" my-12">
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm mb-8">
          <Link href="/" className=" text-muted-foreground">HOME</Link>
          <span className="mx-2">•</span>
          <span className="">SHOP</span>
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="md:text-6xl text-4xl font-bold mb-4">SNEAKERS</h1>
            <p className=" max-w-md text-muted-foreground">
              Discover our sneakers designed from a <span className="font-semibold">rigorous selection 
              of natural and recycled materials</span>: recycled wool, hemp, 
              linen and recycled cotton.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/shop1.jpeg"
              alt="Various colorful sneakers"
              width={600}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}