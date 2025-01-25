/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react';
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
  CardDescription, 
  CardTitle 
} from "@/components/ui/card";
import Link from 'next/link';
import { 
    GraduationCap, 
    BookOpen, 
    Globe, 
    Chrome, 
    Facebook,
    Camera 
  } from 'lucide-react';
  
  const signupSchema = z.object({
    institutionLogo: z.instanceof(File).optional(),
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      { message: "Password must include uppercase, lowercase, number, and special character" }),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

const SignupPage = () => {
    const [logoPreview, setLogoPreview] = useState(null);

    const form = useForm({
      resolver: zodResolver(signupSchema),
      defaultValues: {
        institutionLogo: undefined,
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    });
  
    const handleLogoUpload = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result as any);
          form.setValue('institutionLogo', file);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const onSubmit = (data: any) => {
      console.log('Signup Data:', data);
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
            <h2 className="text-3xl font-bold text-center mb-4">Welcome to Learning Hub</h2>
            <p className="text-center text-white/80">
              Unlock your potential, transform your future. Join our educational community and start your learning journey today.
            </p>
            <div className="absolute bottom-8 right-8">
              <Globe className="w-16 h-16 text-white/20" />
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-1/2 p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="text-center">
                <CardTitle className="text-3xl font-bold text-gray-800 mb-2">Sign Up</CardTitle>
                <CardDescription className="text-gray-500">
                  Create your account and start learning
                </CardDescription>
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-36 h-36 rounded-full border-4 border-blue-500 overflow-hidden flex items-center justify-center">
                    {logoPreview ? (
                      <img 
                        src={logoPreview} 
                        alt="Institution Logo" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <GraduationCap className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600">
                    <Camera className="w-5 h-5" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleLogoUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                        placeholder="Create a strong password" 
                        type="password" 
                        {...field} 
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Confirm your password" 
                        type="password" 
                        {...field} 
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Create Account
              </Button>

              {/* Social Login */}
              <div className="text-center">
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-500">Or sign up with</span>
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
              </div>{/* Sign Up Link */}
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account? {' '}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Login
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

export default SignupPage;