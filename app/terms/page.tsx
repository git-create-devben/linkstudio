import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LogoApple from "@/components/logo-apple"
import AnimatedWrapper from "@/components/animated-wrapper"
import {
  ArrowRight,
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle,
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

export default function TermsPage() {
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
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </AnimatedWrapper>

          {/* Terms Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing and using LinkStudio ("Service"), operated by LinkStudio Inc. ("we," "us," or "our"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If you do not agree to abide by the above, please do not use this service. We reserve the right to change these terms at any time. Your continued use of the Service following the posting of changes will mean you accept those changes.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                LinkStudio provides a platform that allows users to create personalized landing pages that consolidate multiple links, content, and social media profiles in one location. Our service includes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li>Customizable page templates and design tools</li>
                <li>Analytics and performance tracking</li>
                <li>Social media integration</li>
                <li>Custom domain support (for paid plans)</li>
                <li>Content management and organization tools</li>
              </ul>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Account and Registration</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To access certain features of the Service, you must register for an account. When creating an account, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security and confidentiality of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized account use</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                You must be at least 13 years old to create an account. If you are under 18, you represent that you have your parent or guardian's permission to use the Service.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li>Upload, post, or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or invasive of another's privacy</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                <li>Upload, post, or transmit any content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights of any party</li>
                <li>Upload, post, or transmit any unsolicited or unauthorized advertising, promotional materials, spam, or any other form of solicitation</li>
                <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                <li>Use the Service for any commercial purpose without our express written consent</li>
              </ul>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Content Ownership and Rights</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Content</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You retain ownership of all content you upload, post, or display on the Service ("Your Content"). By submitting Your Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, and distribute Your Content solely for the purpose of providing the Service.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Content</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are owned by LinkStudio Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment Terms and Billing</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Subscription Plans</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We offer both free and paid subscription plans. Paid plans are billed in advance on a monthly or annual basis. All fees are non-refundable except as expressly stated in our refund policy.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Processing</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Payments are processed by third-party payment processors. By providing payment information, you authorize us to charge the applicable fees to your chosen payment method.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Plan Changes and Cancellation</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You may upgrade, downgrade, or cancel your subscription at any time through your account settings. Changes take effect at the next billing cycle. Upon cancellation, you will retain access to paid features until the end of your current billing period.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using the Service, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
              <p className="text-gray-600 leading-relaxed">
                You can view our complete Privacy Policy at{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                  /privacy
                </Link>
                .
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Availability and Modifications</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We strive to maintain the Service available 24/7, but we do not guarantee uninterrupted access. We may:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                <li>Temporarily suspend the Service for maintenance or updates</li>
                <li>Modify or discontinue features at any time</li>
                <li>Impose limits on certain features or restrict access to parts of the Service</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                We will provide reasonable notice of significant changes that may affect your use of the Service.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, if you breach these Terms. You may also terminate your account at any time by contacting us or using the account deletion feature.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Upon termination, your right to use the Service will cease immediately, and we may delete your account and all associated data.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimers and Limitations of Liability</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service "As Is"</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To the maximum extent permitted by law, LinkStudio Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
              <p className="text-gray-600 leading-relaxed">
                You agree to indemnify, defend, and hold harmless LinkStudio Inc. and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of or related to your use of the Service, violation of these Terms, or infringement of any intellectual property or other rights.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, conducted in San Francisco, California.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the Service. Your continued use of the Service after changes become effective constitutes acceptance of the modified Terms.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If you do not agree to the modified Terms, you must stop using the Service and may terminate your account.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Severability</h2>
              <p className="text-gray-600 leading-relaxed">
                If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect. The invalid or unenforceable provision will be replaced with a valid and enforceable provision that most closely matches the intent of the original provision.
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 text-gray-600">
                <p className="mb-2"><strong>Email:</strong> legal@linkstudio.com</p>
                <p className="mb-2"><strong>Address:</strong> LinkStudio Inc., 123 Terms St, San Francisco, CA 94102</p>
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
                By creating an account, you agree to these terms and can start building your professional online presence.
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
