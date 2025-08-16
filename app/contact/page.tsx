import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import LogoApple from "@/components/logo-apple"
import AnimatedWrapper from "@/components/animated-wrapper"
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  Phone,
  Send,
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
  <AnimatedWrapper
    elementType="section"
    id={id}
    className={`py-16 sm:py-24 lg:py-32 ${className}`}
    staggerChildren={0.1}
  >
    <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
  </AnimatedWrapper>
)

const ContactCard = ({
  icon: Icon,
  title,
  description,
  action,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-100",
}: {
  icon: React.ElementType
  title: string
  description: string
  action: string
  iconColor?: string
  iconBg?: string
}) => (
  <AnimatedWrapper
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
  >
    <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-6 ${iconBg} rounded-lg`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      <p className="text-sm font-medium text-gray-900">{action}</p>
    </div>
  </AnimatedWrapper>
)

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <main>
        {/* Hero Section */}
        <Section className="pt-24 sm:pt-32 lg:pt-40 text-center">
          <AnimatedWrapper transitionDelay={0.2}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight">
              Get in{" "}
              <span className="text-blue-600">Touch</span>
            </h1>
          </AnimatedWrapper>

          <AnimatedWrapper transitionDelay={0.3}>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              Have questions? We're here to help. Reach out to our team and we'll
              get back to you as soon as possible.
            </p>
          </AnimatedWrapper>
        </Section>

        {/* Contact Options */}
        <Section className="bg-gray-50">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <ContactCard
              icon={MessageSquare}
              title="Chat Support"
              description="Get instant help from our support team. Available 24/7 to answer your questions."
              action="Start a conversation"
              iconColor="text-green-600"
              iconBg="bg-green-100"
            />

            <ContactCard
              icon={Mail}
              title="Email Support"
              description="Send us a detailed message and we'll respond within 24 hours during business days."
              action="support@linkstudio.com"
              iconColor="text-blue-600"
              iconBg="bg-blue-100"
            />

            <ContactCard
              icon={Phone}
              title="Sales Inquiry"
              description="Interested in our enterprise solutions? Our sales team is ready to help you scale."
              action="Schedule a call"
              iconColor="text-purple-600"
              iconBg="bg-purple-100"
            />
          </div>
        </Section>

        {/* Contact Form */}
        <Section>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedWrapper>
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Send us a message
                </div>
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                  Let's Start a Conversation
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you have questions about features, pricing, or need technical
                  support, our team is here to help you succeed with LinkStudio.
                </p>

                <div className="space-y-4 pt-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">Response within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">Based in San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper transitionDelay={0.2}>
              <form className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    placeholder="Enter your company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about how we can help you..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </AnimatedWrapper>
          </div>
        </Section>

        {/* FAQ Quick Links */}
        <Section className="bg-gray-50">
          <div className="text-center mb-12">
            <AnimatedWrapper>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                Quick Help
              </h2>
              <p className="text-lg text-gray-600">
                Looking for answers? Check out these common questions.
              </p>
            </AnimatedWrapper>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Getting Started", description: "How to create your first LinkStudio page" },
              { title: "Customization", description: "Learn about templates and design options" },
              { title: "Analytics", description: "Understanding your page performance" },
              { title: "Billing", description: "Subscription plans and payment questions" }
            ].map((item, index) => (
              <AnimatedWrapper
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transitionDelay={index * 0.1}
              >
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </AnimatedWrapper>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="text-center">
          <AnimatedWrapper>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Ready to Get Started?
            </h2>
            <p className="max-w-xl mx-auto text-lg text-gray-600 leading-relaxed mb-10">
              Don't wait for answers—start building your professional online presence
              today with LinkStudio's free plan.
            </p>
            <Button
              asChild
              size="lg"
              className=" cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-10 py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/auth">
                Create Your Page <ArrowRight className="ml-2.5 w-5 h-5" />
              </Link>
            </Button>
          </AnimatedWrapper>
        </Section>
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
