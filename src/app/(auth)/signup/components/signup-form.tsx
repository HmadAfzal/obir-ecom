'use client';

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '@/graphql/mutations/user.mutations.';
import { toast } from 'sonner';

const signupSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignupFormData = z.infer<typeof signupSchema>;
const SignupForm = () => {


    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();
  
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
      resolver: zodResolver(signupSchema),
    });
  
    const [createUser, { loading }] = useMutation(CREATE_USER, )
  
    const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
      try {
        const res= await createUser({ variables: { Signupinput: data } })
        toast.success(res.data.createUser.message)
        router.replace(`/login`)
  
      } catch (error:any) {
        toast.error(error.message)
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
        className="bg-secondary border-zinc-200"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
    </div>
    <div className="space-y-2">
      <Label htmlFor="username" className="text-sm font-medium text-muted-foreground">
        Username <span className="text-red-500">*</span>
      </Label>
      <Input
        id="username"
        type="text"
        {...register('username')}
        required
        className="bg-secondary border-zinc-200"
      />
      {errors.username && <p className="text-red-500">{errors.username.message}</p>}
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
          className="bg-secondary border-zinc-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-mutrd-foreground hover:text-muted-foreground"
        >
          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
    </div>
    <Button type="submit" className="w-40" disabled={loading}>
      {loading ? 'Loading...' : 'Signup'}
      <ArrowTopRightIcon className='ml-2' />
    </Button>
  </form>
  )
}

export default SignupForm
