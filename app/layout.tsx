import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { fontSans, allFontVariables } from "@/lib/fonts"
import { APP_CONFIG } from "@/lib/constants"

export const metadata: Metadata = {
  title: APP_CONFIG.name + ": " + APP_CONFIG.tagline,
  description: APP_CONFIG.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={cn("min-h-screen bg-background font-sans antialiased text-gray-800", allFontVariables)}>
        {children}
        <Toaster position="top-left"/>
      </body>
    </html>
  )
}