import AuthSwitcher from "@/components/auth/auth-switcher"
import AnimatedWrapper from "@/components/animated-wrapper"
import LogoApple from "@/components/logo-apple"
import Link from "next/link"
// import { useProtected } from "@/lib/useProtected"
import { toast } from "sonner"


export default async function AuthenticationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <AnimatedWrapper
        initial={`{ opacity: 0, y: -20 }`}
        animate={`{ opacity: 1, y: 0 }`}
        transitionDelay={0.1}
        className="absolute top-8 left-8 z-10"
      >
        <LogoApple />
      </AnimatedWrapper>

      {/* Optional: Subtle background elements for visual appeal */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-100/30 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-100/30 rounded-full filter blur-3xl opacity-50 animate-pulse-slow animation-delay-2000"></div>

      <AnimatedWrapper
        initial={`{ opacity: 0, scale: 0.95, y: 20 }`}
        animate={`{ opacity: 1, scale: 1, y: 0 }`}
        transitionDelay={0.2}
        className="w-full max-w-md z-0" // z-0 to be above blurred elements if they overlap
      >
        <AuthSwitcher />
      </AnimatedWrapper>

      <AnimatedWrapper
        initial={`{ opacity: 0 }`}
        animate={`{ opacity: 1 }`}
        transitionDelay={0.5}
        className="mt-8 text-center"
      >
        <p className="text-xs text-gray-500">
          By continuing, you agree to LinkStudio&apos;s{" "}
          <Link href="/terms" className="underline hover:text-blue-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-blue-600">
            Privacy Policy
          </Link>
          .
        </p>
      </AnimatedWrapper>
    </div>
  )
}

// Add animation-delay utility if not present in tailwind.config.js
// You might need to add this to your globals.css or tailwind.config.js if you want to use it:
// .animation-delay-2000 { animation-delay: 2s; }
// .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
// @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.2; } }
