'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'




const signinSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(1, "Password is required"),
});

type SigninFormData = z.infer<typeof signinSchema>;

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<SigninFormData>({
        resolver: zodResolver(signinSchema),
    });
    const onSubmit = async (data: SigninFormData) => {
        setIsSubmitting(true);

        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        setIsSubmitting(false);

        if (result?.error) {
            if (result.error === 'CredentialsSignin') {
                toast.error('Incorrect email or password');
            } else {
                toast.error('Something went wrong. Please try again later.');
            }
        } else {
            toast.success('Successfully signedin!');
            router.push('/')
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                    Email <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    required
                    className="bg-secondary border-zinc-500"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                    Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register('password')}
                        required
                        className="bg-secondary border-zinc-500 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showPassword ? (
                            <EyeOffIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div className="flex items-center justify-between">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-40 "
                >
                    {isSubmitting ? 'Logging in...' : 'Log in'}
                    <ArrowTopRightIcon className='ml-2' />
                </Button>
                <Link href="/contact" className="text-sm text-blue-500 hover:underline">
                    Forgot password?
                </Link>
            </div>
        </form>
    )
}

export default LoginForm
