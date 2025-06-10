"use client" // If using client-side hooks or event handlers in the future
import Link from "next/link"
import { LinkIcon as LinkIconLucide } from "lucide-react" // Renamed to avoid conflict

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-2xl font-extrabold tracking-tight"
      aria-label="LinkStudio Home"
    >
      <span className="relative flex items-center justify-center w-8 h-8">
        <span className="absolute w-6 h-6 bg-gradient-to-br from-teal-400 to-purple-500 rounded-md transform rotate-45 opacity-70"></span>
        <LinkIconLucide className="relative z-10 w-5 h-5 text-white" />
      </span>
      <span className="font-heading text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500">
        LinkStudio
      </span>
    </Link>
  )
}

export default Logo
