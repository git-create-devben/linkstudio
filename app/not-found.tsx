import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LogoApple from "@/components/logo-apple"
import AnimatedWrapper from "@/components/animated-wrapper"
import {
  ArrowRight,
  Home,
  Search,
  AlertCircle,
} from "lucide-react"

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <AnimatedWrapper
        elementType="header"
        className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200"
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/">
              <LogoApple />
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Button asChild size="sm">
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedWrapper>

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <AnimatedWrapper>
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 tracking-tight mb-4">
              404
            </h1>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-6">
              Page Not Found
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have been moved, 
              deleted, or the URL might be incorrect.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-10 py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-base px-10 py-4 rounded-lg"
              >
                <Link href="/contact">
                  <Search className="w-5 h-5 mr-2" />
                  Get Help
                </Link>
              </Button>
            </div>
          </AnimatedWrapper>

          {/* Helpful Links */}
          <AnimatedWrapper className="mt-16">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Popular Pages
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "About Us", href: "/about", description: "Learn about our mission" },
                  { name: "Pricing", href: "/payment", description: "View our subscription plans" },
                  { name: "Templates", href: "/dashboard/template", description: "Browse our templates" }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </main>

      {/* Footer */}
      <AnimatedWrapper elementType="footer" className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/">
                <LogoApple />
              </Link>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end space-x-6 mb-4 md:mb-0">
              {[
                { name: "About", href: "/about" },
                { name: "Templates", href: "/dashboard/template" },
                { name: "Pricing", href: "/pricing" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy", href: "/privacy" },
                { name: "Terms", href: "/terms" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center md:text-left">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} LinkStudio Inc. All rights reserved.
            </p>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  )
}
