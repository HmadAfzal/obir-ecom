import Link from "next/link";
import SignupForm from "./components/signup-form";
import Header from "@/components/globals/header";


export default function SignupPage() {

  return (

    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold mb-8">Create an account</h1>
        <p className="mb-8">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in now
          </Link>
        </p>
        <SignupForm />
      </div>
    </div>

  );
}




