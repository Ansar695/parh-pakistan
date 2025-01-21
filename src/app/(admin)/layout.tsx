import Logo from '@/components/shared/Logo'
import AdminLayout from '@/layouts/AdminLayout'
import { ReactNode } from 'react'

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 h-screen shadow-md">
          <div className="p-4">
            <Logo title="Admin" />
          </div>
          <AdminLayout />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

