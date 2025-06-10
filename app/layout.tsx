import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "LinkStudio: Your Signature Space Online.",
  description:
    "Design a single, stunning destination that brings together all your passions, projects, and platforms. Effortlessly. Elegantly.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // REMOVED the extra {" "} from here
    <html lang="en" className="light">
      <body className={cn("min-h-screen bg-background font-sans antialiased text-gray-800", fontSans.variable)}>
        {children}
        <Toaster position="top-left"/>
      </body>
    </html>
  )
}
