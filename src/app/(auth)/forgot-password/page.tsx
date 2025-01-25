'use client'

import React from 'react';
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
  BookOpen, 
  Globe, 
  Lock 
} from 'lucide-react';
import Link from 'next/link';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" })
});

const ForgotPasswordPage = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Forgot Password Data:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 bg-white/50 rounded-full w-32 h-32 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 bg-purple-200/50 rounded-full w-48 h-48 blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-[500px] bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Left Side - Educational Illustration */}
        <div className="bg-gradient-to-br h-[280px] from-blue-500 to-purple-600 p-12 flex flex-col justify-center text-white relative">
          <div className="absolute top-8 left-8">
            <BookOpen className="w-16 h-16 text-white/20" />
          </div>
          <div className="z-10">
            <Lock className="w-24 h-24 mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-center mb-4">Forgot Password?</h2>
            <p className="text-center text-white/80">
              No worries! Enter your email and we will send you a reset link to regain access to your account.
            </p>
            <div className="absolute bottom-8 right-8">
              <Globe className="w-16 h-16 text-white/20" />
            </div>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="px-12 py-8 flex flex-col justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
                <p className="text-gray-500 mb-6">
                  Enter the email associated with your account
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

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r h-12 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Send Reset Link
              </Button>

              {/* Return to Login */}
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Remember your password? {' '}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Return to Login
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

export default ForgotPasswordPage;