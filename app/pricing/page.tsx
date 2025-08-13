import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LogoApple from "@/components/logo-apple"
import AnimatedWrapper from "@/components/animated-wrapper"
import PaymentPlans from "@/components/payment/paymentPlan"
import {
  ArrowRight,
  Check,
  Star,
  Zap,
  Shield,
  Clock,
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

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-100",
}: {
  icon: React.ElementType
  title: string
  description: string
  iconColor?: string
  iconBg?: string
}) => (
  <AnimatedWrapper
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
  >
    <div className="text-center">
      <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-6 ${iconBg} rounded-lg`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </AnimatedWrapper>
)

const FAQ_ITEMS = [
  {
    question: "Can I change my plan at any time?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing adjustments will be prorated."
  },
  {
    question: "Do you offer annual discounts?",
    answer: "Yes, we offer significant discounts for annual subscriptions. You can save up to 2 months by choosing annual billing."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and support secure payments through Stripe and Paystack depending on your region."
  },
  {
    question: "Is there a free trial for premium plans?",
    answer: "While we don't offer traditional free trials, our Free plan gives you access to core features forever. You can upgrade when you need more advanced functionality."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your current billing period."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact support for a full refund within 14 days of purchase."
  }
]

export default function PricingPage() {
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

      <main>
        {/* Hero Section */}
        <Section className="pt-24 sm:pt-32 lg:pt-40 text-center">
          <AnimatedWrapper transitionDelay={0.2}>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
              <Star className="w-4 h-4 mr-2" />
              Simple, Transparent Pricing
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight">
              Choose Your{" "}
              <span className="text-blue-600">Perfect Plan</span>
            </h1>
          </AnimatedWrapper>

          <AnimatedWrapper transitionDelay={0.3}>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              Start free and scale as you grow. All plans include access to our 
              beautiful templates, analytics, and customer support.
            </p>
          </AnimatedWrapper>
        </Section>

        {/* Pricing Plans */}
        <Section className="bg-gray-50">
          <PaymentPlans />
        </Section>

        {/* Why Choose LinkStudio */}
        <Section>
          <div className="text-center mb-16">
            <AnimatedWrapper>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                Why Choose LinkStudio?
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                More than just pricing—discover what makes LinkStudio the perfect 
                choice for your online presence.
              </p>
            </AnimatedWrapper>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <FeatureCard
              icon={Zap}
              title="Lightning Fast Setup"
              description="Get your professional page live in minutes, not hours. Our intuitive editor makes it effortless to create stunning pages."
              iconColor="text-yellow-600"
              iconBg="bg-yellow-100"
            />
            
            <FeatureCard
              icon={Shield}
              title="Enterprise Security"
              description="Your data is protected with bank-level security. SSL encryption, secure hosting, and regular backups included."
              iconColor="text-green-600"
              iconBg="bg-green-100"
            />
            
            <FeatureCard
              icon={Clock}
              title="24/7 Support"
              description="Our dedicated support team is here whenever you need help. Get quick responses and expert guidance anytime."
              iconColor="text-purple-600"
              iconBg="bg-purple-100"
            />
          </div>
        </Section>

        {/* FAQ Section */}
        <Section className="bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <AnimatedWrapper>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600">
                  Everything you need to know about LinkStudio pricing and plans.
                </p>
              </AnimatedWrapper>
            </div>

            <div className="space-y-8">
              {FAQ_ITEMS.map((faq, index) => (
                <AnimatedWrapper
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transitionDelay={index * 0.1}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </AnimatedWrapper>
              ))}
            </div>
          </div>
        </Section>

        {/* Money Back Guarantee */}
        <Section>
          <div className="text-center">
            <AnimatedWrapper>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12 lg:p-16 max-w-4xl mx-auto">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-blue-600 rounded-full">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                  14-Day Money-Back Guarantee
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Try LinkStudio risk-free. If you're not completely satisfied with your 
                  experience within the first 14 days, we'll give you a full refund—no 
                  questions asked.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-10 py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/auth">
                    Start Your Free Account <ArrowRight className="ml-2.5 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </AnimatedWrapper>
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="bg-gray-50 text-center">
          <AnimatedWrapper>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Ready to Elevate Your Brand?
            </h2>
            <p className="max-w-xl mx-auto text-lg text-gray-600 leading-relaxed mb-10">
              Join thousands of creators building beautiful, professional pages that 
              convert visitors into followers and customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-10 py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/auth">
                  Get Started Free <ArrowRight className="ml-2.5 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-base px-10 py-4 rounded-lg"
              >
                <Link href="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
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
