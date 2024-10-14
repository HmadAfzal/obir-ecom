import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram } from 'lucide-react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribing email:', email)
    setEmail('')
  }

  return (
    <section className="py-32 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold">NEWSLETTER</h2>
          <div className="flex gap-4">
            <a href="https://instagram.com/llha.x" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
              <Instagram className="size-5" />
            </a>
            <a href="https://github.com/HmadAfzal" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Github">
              <GitHubLogoIcon className="size-5" />
            </a>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Discover in preview all our new products, our latest actions and
          get 10€ off your first order by subscribing to our newsletter!
        </p>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            type="email"
            placeholder="Type your email address here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow"
          />
          <Button type="submit">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}