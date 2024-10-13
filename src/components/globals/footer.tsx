import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t py-6">
    <div className="container mx-auto px-4 md:flex-row flex  flex-col justify-between items-center">
      <p>&copy; 2024 Obir. All rights reserved.</p>
      <nav className="flex gap-4">
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy Policy</Link>
      </nav>
    </div>
  </footer>
  )
}

export default Footer
