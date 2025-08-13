import Link from "next/link";
import AnimatedWrapper from "@/components/animated-wrapper";
import LogoApple from "@/components/logo-apple";
import { ROUTES } from "@/lib/constants";

const footerLinks = [
  { name: "About", href: ROUTES.ABOUT },
  { name: "Templates", href: ROUTES.TEMPLATE },
  { name: "Pricing", href: ROUTES.PRICING },
  { name: "Contact", href: ROUTES.CONTACT },
  { name: "Privacy", href: ROUTES.PRIVACY },
  { name: "Terms", href: ROUTES.TERMS },
];

export default function Footer() {
  return (
    <AnimatedWrapper elementType="footer" className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <LogoApple />
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-6 mb-4 md:mb-0">
            {footerLinks.map((item) => (
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
  );
}