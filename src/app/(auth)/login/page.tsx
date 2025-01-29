'use client'
import React from 'react';
import { signIn } from 'next-auth/react'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  GraduationCap, 
  BookOpen, 
  Globe, 
  Chrome, 
  Facebook 
} from 'lucide-react';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" })
});

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: any) => {
    console.log('Login Data:', data);
    try {
      const res = await signIn('credentials', {
        email: data?.email,
        password: data.password,
        redirect: false,
      })
      console.log("Response ", res)

      // if (res?.error) {
      //   setError('Invalid credentials')
      //   return
      // }

      // router.push('/dashboard')
    } catch (error: any) {
      console.log("error ", error)
      // setError(error.message)
    } finally {
      // setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 bg-white/50 rounded-full w-32 h-32 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 bg-purple-200/50 rounded-full w-48 h-48 blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl flex overflow-hidden">
        {/* Left Side - Educational Illustration */}
        <div className="w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-12 flex flex-col justify-center text-white relative">
          <div className="absolute top-8 left-8">
            <BookOpen className="w-16 h-16 text-white/20" />
          </div>
          <div className="z-10">
            <GraduationCap className="w-24 h-24 mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>
            <p className="text-center text-white/80">
              Continue your learning journey. Log in to access your personalized educational experience.
            </p>
            <div className="absolute bottom-8 right-8">
              <Globe className="w-16 h-16 text-white/20" />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
                <p className="text-gray-500 mb-6">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        type="email" 
                        {...field} 
                        className="border-gray-300 h-12 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your password" 
                        type="password" 
                        {...field} 
                        className="border-gray-300 h-12 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r h-12 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Log In
              </Button>

              {/* Social Login */}
              <div className="text-center">
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-500">Or log in with</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="w-1/2">
                    <Chrome className="mr-2 h-5 w-5" /> Google
                  </Button>
                  <Button variant="outline" className="w-1/2">
                    <Facebook className="mr-2 h-5 w-5" /> Facebook
                  </Button>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Do not have an account? {' '}
                  <Link href="/register" className="text-blue-600 hover:underline">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;