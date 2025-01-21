"use client";

import {
  BarChart,
  FileText,
  Save,
  Clock,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserLayout = () => {
  const pathname = usePathname();
  return (
    <nav className="mt-8 pl-1">
      <Link href="/user/dashboard">
        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-white hover:bg-[#e5e7eb] data-[state=active]:bg-[#e5e7eb] rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl data-[state=active]:text-blue-500"
          data-state={pathname === "/user/dashboard" ? "active" : "inactive"}
        >
          <BarChart className="mr-2 h-4 w-4" />
          Overview
        </Button>
      </Link>
      <Link href="/user/dashboard/my-papers">
        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-white hover:bg-[#e5e7eb] data-[state=active]:bg-[#e5e7eb]  rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl data-[state=active]:text-blue-500"
          data-state={
            pathname === "/user/dashboard/my-papers" ? "active" : "inactive"
          }
        >
          <FileText className="mr-2 h-4 w-4" />
          My Papers
        </Button>
      </Link>
      <Link href="/user/dashboard/saved">
        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-white hover:bg-[#e5e7eb] data-[state=active]:bg-[#e5e7eb]  rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl data-[state=active]:text-blue-500"
          data-state={
            pathname === "/user/dashboard/saved" ? "active" : "inactive"
          }
        >
          <Save className="mr-2 h-4 w-4" />
          Saved Papers
        </Button>
      </Link>
      <Link href="/user/dashboard/history">
        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-white hover:bg-[#e5e7eb] data-[state=active]:bg-[#e5e7eb]  rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl data-[state=active]:text-blue-500"
          data-state={
            pathname === "/user/dashboard/history" ? "active" : "inactive"
          }
        >
          <Clock className="mr-2 h-4 w-4" />
          History
        </Button>
      </Link>
      <Link href="/user/dashboard/subscription">
        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-white hover:bg-[#e5e7eb] data-[state=active]:bg-[#e5e7eb] rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl data-[state=active]:text-blue-500"
          data-state={
            pathname === "/user/dashboard/subscription" ? "active" : "inactive"
          }
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Subscription
        </Button>
      </Link>
      <Link href="/user/dashboard/settings">
        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-white hover:bg-[#e5e7eb] data-[state=active]:bg-[#e5e7eb] rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl data-[state=active]:text-blue-500"
          data-state={
            pathname === "/user/dashboard/settings" ? "active" : "inactive"
          }
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </Link>
      <Button
        variant="ghost"
        className="w-full justify-start mt-8 h-12 text-red-200 hover:text-red-100 hover:bg-red-500/50"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </nav>
  );
};

export default UserLayout;
