"use client"
import Header from "@/components/dashboard/Header"
import "../globals.css"
import Sidebar from "@/components/dashboard/Sidebar"
import { useState } from 'react'
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

  const toggleSidebar = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div >
      <div className="h-screen flex flex-col overflow-hidden">
        <Header isVisible={isVisible} onToggle={toggleSidebar}/>
        <main className="flex flex-1 overflow-hidden">
          <Sidebar isVisible={isVisible}/>
          <div className="flex-1 p-2 overflow-y-auto  bg-[center_55px_/var(--glass-background)] bg-no-repeat bg-gradient-to-br from-purple-50 via-white to-blue-50 backdrop-blur-xl border border-white/[0.06] shadow-2xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}