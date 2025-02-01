"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Plus,
  Layers,
  BookOpen,
  Bookmark,
} from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

interface AdminDashboardLayoutProps {
  children: ReactNode
}

interface MenuItem {
  name: string
  icon: React.ElementType
  href: string
  subItems?: MenuItem[]
}

const menuItems: MenuItem[] = [
  { name: "Overview", icon: BarChart, href: "/admin" },
  { name: "Users", icon: Users, href: "/admin/users" },
  {
    name: "Add Options",
    icon: Plus,
    href: "#",
    subItems: [
      { name: "Add Board", icon: Layers, href: "/admin/boards" },
      { name: "Add Class", icon: BookOpen, href: "/admin/classes" },
      { name: "Add Subject", icon: Bookmark, href: "/admin/subjects" },
      { name: "Add Chapter", icon: FileText, href: "/admin/chapters" },
    ],
  },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
]

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const pathname = usePathname()
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

  const toggleSubMenu = (name: string) => {
    setOpenSubMenu(openSubMenu === name ? null : name)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white h-screen overflow-y-auto">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          </div>
          <nav className="mt-8">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-white hover:bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white"
                      onClick={() => toggleSubMenu(item.name)}
                    >
                      <span className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </span>
                      {openSubMenu === item.name ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    <AnimatePresence>
                      {openSubMenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.subItems.map((subItem) => (
                            <Link key={subItem.name} href={subItem.href}>
                              <Button
                                variant="ghost"
                                className="w-full justify-start pl-8 text-white hover:bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white"
                                data-state={pathname === subItem.href ? "active" : "inactive"}
                              >
                                <subItem.icon className="mr-2 h-4 w-4" />
                                {subItem.name}
                              </Button>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white"
                      data-state={pathname === item.href ? "active" : "inactive"}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start mt-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
          <Toaster />
        </main>
      </div>
    </div>
  )
}

