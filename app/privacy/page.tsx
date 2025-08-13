import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LogoApple from "@/components/logo-apple"
import AnimatedWrapper from "@/components/animated-wrapper"
import {
  ArrowRight,
  Shield,
  Eye,
  Lock,
  UserCheck,
} from "lucide-react"

const Section = ({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) => (
  <section id={id} className={`py-8 ${className}`}>
    <div className="mx-auto max-w-4xl px-6 lg:px-8">{children}</div>
  </section>
)

export default function PrivacyPage() {
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
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Hero Section */}
          <AnimatedWrapper className="text-center mb-16">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-blue-100 rounded-full">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </AnimatedWrapper>

          {/* Privacy Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At LinkStudio ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using LinkStudio, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you create an account, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li>Name and email address</li>
                <li>Username and profile information</li>
                <li>Payment information (processed securely by our payment partners)</li>
                <li>Content you create and publish on your LinkStudio page</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We automatically collect information about how you use our service:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li>Device information (browser type, operating system)</li>
                <li>IP address and location data</li>
                <li>Pages visited and time spent on our platform</li>
                <li>Analytics data about your LinkStudio page performance</li>
              </ul>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li>Provide and maintain our service</li>
                <li>Process payments and manage your subscription</li>
                <li>Send you important updates about your account</li>
                <li>Provide customer support</li>
                <li>Improve our platform and develop new features</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li><strong>Service Providers:</strong> Trusted third parties who help us operate our platform (hosting, payment processing, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                <li><strong>Your Consent:</strong> When you explicitly agree to share information</li>
              </ul>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li>SSL encryption for data transmission</li>
                <li>Secure data centers with restricted access</li>
                <li>Regular security audits and updates</li>
                <li>Employee training on data protection</li>
                <li>Multi-factor authentication options</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but are committed to protecting your information using industry-standard practices.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                To exercise these rights, please contact us at privacy@linkstudio.com or through your account settings.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li>Remember your preferences and login status</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and features</li>
                <li>Improve our platform performance</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                You can control cookie preferences through your browser settings. Note that disabling cookies may affect the functionality of our platform.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We retain your personal information only as long as necessary to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our platform and services</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                When you delete your account, we will delete your personal information within 30 days, except where we are required to retain it for legal purposes.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                LinkStudio is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-600 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are made in accordance with applicable data protection laws and include appropriate safeguards to protect your information.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by email or through our platform. Your continued use of LinkStudio after changes become effective constitutes acceptance of the updated policy.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 text-gray-600">
                <p className="mb-2"><strong>Email:</strong> privacy@linkstudio.com</p>
                <p className="mb-2"><strong>Address:</strong> LinkStudio Inc., 123 Privacy St, San Francisco, CA 94102</p>
                <p><strong>Support:</strong> Available 24/7 through our contact form</p>
              </div>
            </Section>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 pt-16 border-t border-gray-200">
            <AnimatedWrapper>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
                Ready to Get Started?
              </h2>
              <p className="max-w-xl mx-auto text-lg text-gray-600 leading-relaxed mb-10">
                Build your professional online presence with confidence, knowing your data is protected.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-10 py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/auth">
                  Create Your Account <ArrowRight className="ml-2.5 w-5 h-5" />
                </Link>
              </Button>
            </AnimatedWrapper>
          </div>
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
