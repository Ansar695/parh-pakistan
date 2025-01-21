import Logo from "@/components/shared/Logo";
import UserLayout from "@/layouts/UserLayout";
import { ReactNode } from "react";

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[15%] min-w-64 fixed bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 h-screen shadow-md">
          <div className="p-4">
            <Logo title="Ambitious Academy Lahore" />
          </div>
          <div className="w-64"></div>
          <UserLayout />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 w-[85%] ml-[17%]">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
