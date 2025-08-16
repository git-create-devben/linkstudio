"use client"
import Header from "@/components/dashboard/Header"
import "../globals.css"
import Sidebar from "@/components/dashboard/Sidebar"
import { useState, useEffect } from 'react'
import { UserProvider } from "@/context/UserProvider"
import { getUser } from "@/actions/authActions"
import type { User } from "@/context/userContext"
import { cn } from "@/lib/utils"
// import { Metadata } from "next"

// export const metadata: Metadata = {
//     title: "LinkStudio | Dashboard",
//     description:
//       "Design a single, stunning destination that brings together all your passions, projects, and platforms. Effortlessly. Elegantly.",
//   }

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const toggleSidebar = () => {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser()
        setUser(userData as User)
      } catch (error) {
        console.error('Failed to load user:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <UserProvider user={user}>
      <div className="h-screen flex flex-col overflow-hidden">
        <Header isVisible={isVisible} onToggle={toggleSidebar} />
        <main className="flex-1 overflow-hidden relative">
          {/* Backdrop for both mobile and desktop */}
          <div
            // className={cn(
            //   "fixed inset-0 bg-black/20 z-40 transition-all duration-300 ease-in-out",
            //   isVisible
            //     ? "opacity-100 pointer-events-auto"
            //     : "opacity-0 pointer-events-none"
            // )}
            onClick={toggleSidebar}
          />

          <Sidebar isVisible={isVisible} onClose={toggleSidebar} />

          <div className="w-full h-full p-2 overflow-y-auto bg-[center_55px_/var(--glass-background)] bg-no-repeat bg-gradient-to-br from-purple-50 via-white to-blue-50 backdrop-blur-xl border border-white/[0.06] shadow-2xl">
            {children}
          </div>
        </main>
      </div>
    </UserProvider>
  )
}