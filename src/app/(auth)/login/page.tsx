import Link from 'next/link'
import LoginForm from './components/login-form';

export default function LoginPage() {

  
  return (
    <div className="min-h-screen flex items-center justify-center lg:px-4 px-6">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold mb-8">Log in</h1>
        <p className="mb-8">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>
        <LoginForm/>
      </div>
    </div>
  );
}
