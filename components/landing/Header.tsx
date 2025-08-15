import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedWrapper from "@/components/animated-wrapper";
import LogoApple from "@/components/logo-apple";
import { ROUTES, ANIMATION_DELAYS } from "@/lib/constants";

const navLinks = [
  { name: "Overview", href: "#overview" },
  { name: "About", href: "/about" },
  { name: "Features", href: "#features" },
];

export default function Header() {
  return (
    <AnimatedWrapper
      elementType="header"
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200"
      initial="hidden"
      animate="visible"
      transitionDelay={ANIMATION_DELAYS.HEADER}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <LogoApple />
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <Button
            asChild
            className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <Link href={ROUTES.AUTH}>Get Started Free</Link>
          </Button>
        </div>
      </div>
    </AnimatedWrapper>
  );
}