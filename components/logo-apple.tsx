import Link from "next/link"
import { Share2 } from "lucide-react" // Using a simple icon for now

const LogoApple = () => {
  return (
    <Link href="/" className="flex items-center space-x-2.5 group" aria-label="LinkStudio Home">
      {/* Simple, abstract logo mark - can be replaced with a custom SVG */}
      <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-900 group-hover:bg-blue-600 transition-colors duration-300">
        <Share2 className="w-4 h-4 text-white" />
      </div>
      <span className="text-xl font-semibold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
        LinkStudio
      </span>
    </Link>
  )
}

export default LogoApple
