import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, ShieldOff, Laugh, Coffee } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Our &quot;Privacy&quot; Policy</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6" />
              Welcome to our totally &quot;legit&quot; privacy policy!
            </CardTitle>
            <CardDescription>
              Where we pretend to care about your data (but actually don&apos;t have any)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Hey there, savvy shopper! You&apos;ve stumbled upon our privacy policy page. 
              But here&apos;s the thing: we&apos;re about as real as a unicorn riding a hoverboard. 🦄
            </p>
            <p className="mb-4">
              This is a dummy site, which means we collect about as much data as a rock. 
              That&apos;s right, zero, zilch, nada! 🙅‍♂️
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldOff className="h-6 w-6" />
              What we (don&apos;t) collect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your shoe size (we&apos;re not that nosy)</li>
              <li>Your favorite color (although we bet it&apos;s &quot;shoe&quot;)</li>
              <li>The number of times you&apos;ve window-shopped here (it&apos;s probably a lot)</li>
              <li>Your deepest, darkest secrets (we&apos;re a shoe store, not your therapist)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Laugh className="h-6 w-6" />
              Why this policy exists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Honestly? We just wanted to make you chuckle. 😄 And maybe practice our 
              web development skills a bit. But mostly the chuckling part.
            </p>
            <p>
              Remember, no actual data is being collected, stored, or used here. 
              We&apos;re about as threatening to your privacy as a rubber duck. 🦆
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-6 w-6" />
              Questions? Concerns? Shoe emergencies?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              If you have any questions about this &quot;privacy policy&quot;, you might want to 
              reconsider your life choices. But if you insist, here&apos;s what you can do:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Take a deep breath</li>
              <li>Remember this is a dummy site</li>
              <li>Maybe go shoe shopping for real?</li>
              <li>If all else fails, talk to your rubber duck. It&apos;s a great listener!</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}