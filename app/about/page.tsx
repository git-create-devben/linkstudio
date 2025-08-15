import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LogoApple from "@/components/logo-apple"
import AnimatedWrapper from "@/components/animated-wrapper"
import {
  ArrowRight,
  Users,
  Target,
  Heart,
  Globe,
  Lightbulb,
  Zap,
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

const ValueCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) => (
  <AnimatedWrapper
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
  >
    <div className="text-center">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-lg">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </AnimatedWrapper>
)

export default function AboutPage() {
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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight">
              About{" "}
              <span className="text-blue-600">LinkStudio</span>
            </h1>
          </AnimatedWrapper>

          <AnimatedWrapper transitionDelay={0.3}>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              We believe everyone deserves a beautiful, professional online presence. 
              LinkStudio makes it effortless to create stunning, branded pages that 
              showcase everything that matters to you.
            </p>
          </AnimatedWrapper>
        </Section>

        {/* Mission Section */}
        <Section className="bg-gray-50">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedWrapper>
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Our Mission
                </div>
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                  Democratizing Digital Presence
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  In a world where your online presence defines opportunities, we're 
                  leveling the playing field. LinkStudio empowers creators, entrepreneurs, 
                  and professionals to build compelling digital identities without the 
                  complexity of traditional web development.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  From artists showcasing their portfolio to businesses driving conversions, 
                  we provide the tools and templates that make professional web presence 
                  accessible to everyone.
                </p>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper transitionDelay={0.2}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 lg:p-12">
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Global Reach</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Serving creators in 150+ countries worldwide
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Growing Community</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Join thousands of creators building their brands
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Innovation First</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Constantly evolving with the latest design trends
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </Section>

        {/* Values Section */}
        <Section>
          <div className="text-center mb-16">
            <AnimatedWrapper>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                Our Values
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                These principles guide everything we do, from product development 
                to customer support.
              </p>
            </AnimatedWrapper>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <ValueCard
              icon={Heart}
              title="Empathy-Driven Design"
              description="We design with deep understanding of our users' needs, challenges, and aspirations. Every feature is crafted to solve real problems."
            />
            
            <ValueCard
              icon={Lightbulb}
              title="Innovative Simplicity"
              description="We believe the best solutions are simple ones. Complex problems deserve elegant, intuitive solutions that anyone can use."
            />
            
            <ValueCard
              icon={Target}
              title="Quality Without Compromise"
              description="From performance to aesthetics, we never cut corners. Every template, every feature, every interaction meets our high standards."
            />
          </div>
        </Section>

        {/* Story Section */}
        <Section className="bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedWrapper>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
                Our Story
              </div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
                Built by Creators, for Creators
              </h2>
              <div className="prose prose-lg prose-gray max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  LinkStudio was born from a simple frustration: existing link-in-bio tools 
                  were either too basic or too complex, with limited customization and poor 
                  design quality. As creators ourselves, we knew there had to be a better way.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  We spent months studying what makes great digital experiences, interviewing 
                  hundreds of creators, and refining our approach. The result is LinkStudio: 
                  a platform that combines professional-grade design with intuitive simplicity.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we're proud to help creators, entrepreneurs, and brands around the 
                  world build stunning online presences that convert visitors into followers, 
                  customers, and fans.
                </p>
              </div>
            </AnimatedWrapper>
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="text-center">
          <AnimatedWrapper>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Ready to Build Your Brand?
            </h2>
            <p className="max-w-xl mx-auto text-lg text-gray-600 leading-relaxed mb-10">
              Join thousands of creators who've already elevated their online presence 
              with LinkStudio. It's free to get started.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-10 py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/auth">
                Start Creating Today <ArrowRight className="ml-2.5 w-5 h-5" />
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
                { name: "Pricing", href: "/payment" },
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
