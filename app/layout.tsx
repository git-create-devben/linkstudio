import type React from "react"
import type { Metadata } from "next"
import { Inter, Lora, Roboto, Open_Sans, Montserrat, Playfair_Display, Source_Sans_3, Poppins, Oswald, Raleway } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "500", "600", "700"] })
const fontLora = Lora({ subsets: ["latin"], variable: "--font-lora", weight: ["400", "500", "600", "700"] })
const fontRoboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["300", "400", "500", "700"] })
const fontOpenSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", weight: ["300", "400", "500", "600", "700"] })
const fontMontserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["300", "400", "500", "600", "700"] })
const fontPlayfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display", weight: ["400", "500", "600", "700"] })
const fontSourceSans3 = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans-3", weight: ["300", "400", "500", "600", "700"] })
const fontPoppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["300", "400", "500", "600", "700"] })
const fontOswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["300", "400", "500", "600", "700"] })
const fontRaleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", weight: ["300", "400", "500", "600", "700"] })

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
    <html lang="en" className="light">
      <body className={cn("min-h-screen bg-background font-sans antialiased text-gray-800", fontSans.variable, fontLora.variable, fontRoboto.variable, fontOpenSans.variable, fontMontserrat.variable, fontPlayfairDisplay.variable, fontSourceSans3.variable, fontPoppins.variable, fontOswald.variable, fontRaleway.variable)}>
        {children}
        <Toaster position="top-left"/>
      </body>
    </html>
  )
}