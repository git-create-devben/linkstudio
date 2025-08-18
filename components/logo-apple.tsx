import Link from "next/link"
import { Share2 } from "lucide-react" // Using a simple icon for now

const LogoApple = () => {
  return (
    <Link href="/" className="flex items-center space-x-2.5 group" aria-label="MyLinks Home">
      {/* Simple, abstract logo mark - can be replaced with a custom SVG */}
      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-200 via-white to-purple-200 group-hover:bg-blue-600 transition-colors duration-300">
        <Share2 className="w-4 h-4 text-black" />
      </div>
      <span className="text-xl font-semibold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
        <span className="hidden md:block text-blue-500">MyLinks</span>
        <span className="font-extrabold md:hidden block text-blue-500">M.L</span>
      </span>
    </Link>
  )
}

export default LogoApple
