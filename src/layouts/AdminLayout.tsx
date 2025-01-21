"use client";

import { BarChart, Users, FileText, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import SideMenuBtn from "@/components/shared/SideMenuBtn";

const AdminLayout = () => {
  return (
    <nav className="mt-8">
      <SideMenuBtn title="Overview" icon={<BarChart className="mr-2 h-4 w-4" />} link="/admin/dashboard" />
      <SideMenuBtn title="Users" icon={<Users className="mr-2 h-4 w-4" />} link="/admin/dashboard/users" />
      <SideMenuBtn title="Papers" icon={<FileText className="mr-2 h-4 w-4" />} link="/admin/dashboard/papers" />
      <SideMenuBtn title="Settings" icon={<Settings className="mr-2 h-4 w-4" />} link="/admin/dashboard/settings" />
      
      <Button
        variant="ghost"
        className="w-full justify-start mt-8 h-12 text-red-400 hover:text-red-300 hover:bg-red-500/20"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </nav>
  );
};

export default AdminLayout;
