import { cn } from "@/lib/utils"
import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import LogoApple from "@/components/logo-apple"
import AnimatedWrapper from "@/components/animated-wrapper"
import {
  ArrowRight,
  ChevronRight,
  Layers,
  Zap,
  Palette,
  BarChart3,
  LinkIcon,
  LayoutGrid,
  SparklesIcon,
} from "lucide-react"
import { toast } from "sonner"

// Section Component for consistent padding
const Section = ({
  children,
  className,
  id,
  fullWidth = false,
}: {
  children: React.ReactNode
  className?: string
  id?: string
  fullWidth?: boolean
}) => (
  <AnimatedWrapper
    elementType="section"
    id={id}
    className={cn("py-16 sm:py-24 lg:py-32", className)}
    staggerChildren={0.1}
  >
    <div className={cn("mx-auto", fullWidth ? "px-0" : "max-w-7xl px-6 lg:px-8")}>{children}</div>
  </AnimatedWrapper>
)

const FeatureItem = ({
  icon: Icon,
  title,
  description,
  iconBgClass = "bg-blue-500",
}: {
  icon: React.ElementType
  title: string
  description: string
  iconBgClass?: string
}) => (
  <AnimatedWrapper variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <div className={cn("flex items-center justify-center w-12 h-12 rounded-lg text-white mb-5", iconBgClass)}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </AnimatedWrapper>
)

const TemplateCard = ({ title, imageUrl, category }: { title: string; imageUrl: string; category: string }) => (
  <AnimatedWrapper
    className="snap-center shrink-0 w-[70vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw]"
    variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
  >
    <div className="group">
      <div className="aspect-[3/4] bg-gray-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
        <Image
          src={imageUrl || "/placeholder.svg"}
          width={450}
          height={600}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="mt-4 text-md font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-sm text-gray-500">{category}</p>
    </div>
  </AnimatedWrapper>
)

export default async function LinkStudioApplePage() {
  const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Templates", href: "#templates" },
    { name: "Features", href: "#features" },
  ]

  return (
    <div className="bg-white">
      {/* Header */}
      <AnimatedWrapper
        elementType="header"
        className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200"
        initial="hidden"
        animate="visible"
        transitionDelay={0.1}
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
              <Link href="/auth">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </AnimatedWrapper>

      <main>
        {/* Hero Section */}
        <Section id="hero" className="pt-24 sm:pt-32 lg:pt-40 text-center overflow-hidden">
          <AnimatedWrapper
            className="mb-8"
            variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
            transitionDelay={0.2}
          >
            <Link
              href="#templates" // Link to new templates section
              className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              <span>Explore Professionally Designed Templates</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </AnimatedWrapper>

          <AnimatedWrapper transitionDelay={0.3}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight">
              More Than a Link. <br />
              <span className="text-blue-600">It’s Your Brand.</span>
            </h1>
          </AnimatedWrapper>

          <AnimatedWrapper transitionDelay={0.4}>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              Design a single, stunning destination that brings together all your passions, projects, and platforms.
              Effortlessly. Elegantly. Uniquely you.
            </p>
          </AnimatedWrapper>

          <AnimatedWrapper transitionDelay={0.5}>
            <div className="mt-10 flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="#cta">
                  Create Your Space <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </AnimatedWrapper>
        </Section>

        {/* "Why LinkStudio?" Section / Overview */}
        <Section id="overview" className="bg-gray-50">
          <div className="text-center mb-16">
            <AnimatedWrapper>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Beyond the Bio. Beyond Compare.
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                LinkStudio isn't just a link tool. It's your personal stage, meticulously engineered for beauty,
                simplicity, and profound connection.
              </p>
            </AnimatedWrapper>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            <FeatureItem
              icon={Palette}
              title="Design That Resonates"
              description="Craft an online presence that's a true extension of your brand, with an unmatched design experience."
              iconBgClass="bg-pink-500"
            />
            <FeatureItem
              icon={LinkIcon}
              title="Connections That Matter"
              description="Embed rich content, foster genuine engagement, and turn casual visitors into devoted followers."
              iconBgClass="bg-green-500"
            />
            <FeatureItem
              icon={Layers}
              title="Evolve Without Limits"
              description="LinkStudio grows with you, offering the sophisticated tools you need to shine, today and tomorrow."
              iconBgClass="bg-purple-500"
            />
          </div>
        </Section>

        {/* Templates Section - NEW */}
        <Section id="templates">
          <div className="text-center mb-16">
            <AnimatedWrapper>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Launch with Style. Zero to Stunning.
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                Kickstart your vision with our curated collection of professionally designed templates. Your
                masterpiece, made easy.
              </p>
            </AnimatedWrapper>
          </div>
          <div className="relative mt-12">
            <div className="flex overflow-x-auto space-x-6 lg:space-x-8 px-6 lg:px-0 snap-x snap-mandatory scrollbar-hide pb-8 -mx-6 lg:-mx-8">
              {[
                {
                  title: "Minimalist Creator",
                  imageUrl: "/placeholder.svg?width=450&height=600&text=Minimalist+Template+Mockup",
                  category: "Artists & Designers",
                },
                {
                  title: "Modern Musician Hub",
                  imageUrl: "/placeholder.svg?width=450&height=600&text=Music+Artist+Template",
                  category: "Musicians & Bands",
                },
                {
                  title: "Elegant Writer's Portfolio",
                  imageUrl: "/placeholder.svg?width=450&height=600&text=Writer+Portfolio+Template",
                  category: "Writers & Bloggers",
                },
                {
                  title: "Vibrant Brand Showcase",
                  imageUrl: "/placeholder.svg?width=450&height=600&text=Brand+Showcase+Template",
                  category: "Brands & Businesses",
                },
                {
                  title: "Chic Influencer Page",
                  imageUrl: "/placeholder.svg?width=450&height=600&text=Influencer+Template",
                  category: "Influencers & Content Creators",
                },
              ].map((template, i) => (
                <TemplateCard key={i} {...template} />
              ))}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 focus:bg-blue-500 transition-colors"
                ></button>
              ))}
            </div>
          </div>
          <AnimatedWrapper className="mt-16 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900 text-base px-8 py-3 rounded-lg"
            >
              <Link href="/templates">
                Explore All Templates <LayoutGrid className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </AnimatedWrapper>
        </Section>

        {/* Features Showcase */}
        <Section id="features" className="bg-gray-50">
          <div className="text-center mb-16">
            <AnimatedWrapper>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Engineered for Brilliance.
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600">
                Every detail, every interaction, designed to elevate your presence and empower your creativity.
              </p>
            </AnimatedWrapper>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            <FeatureItem
              icon={SparklesIcon}
              title="Intuitive Creation"
              description="An effortless drag-and-drop canvas. Zero clutter, pure creative flow."
            />
            <FeatureItem
              icon={Layers}
              title="Rich Content Blocks"
              description="Embed music, video, shops, podcasts, and more. Beautifully presented, seamlessly integrated."
            />
            <FeatureItem
              icon={BarChart3}
              title="Insightful Analytics"
              description="Understand your audience with clear, actionable data. Amplify your reach, intelligently."
            />
            <FeatureItem
              icon={Zap}
              title="Lightning-Fast Load"
              description="Deliver an exceptional experience with pages optimized for speed, on any device."
            />
          </div>
        </Section>

        {/* Visual Showcase / "Inspiration" Section */}
        <Section id="showcase" className="bg-gray-900 text-white" fullWidth>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <AnimatedWrapper>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Imagine the Impact.</h2>
                <p className="mt-4 max-w-xl mx-auto text-lg text-gray-300">
                  See how creators, artists, and innovators are shaping their digital narratives with LinkStudio.
                </p>
              </AnimatedWrapper>
            </div>
          </div>
          <div className="relative mt-12 pb-12">
            <div className="flex overflow-x-auto space-x-6 lg:space-x-8 px-6 lg:px-8 snap-x snap-mandatory scrollbar-hide">
              {[
                {
                  title: "Artist Portfolio Showcase",
                  img: "/placeholder.svg?width=600&height=800&text=Stunning+Artist+Portfolio",
                },
                {
                  title: "Musician's Digital Hub",
                  img: "/placeholder.svg?width=600&height=800&text=Musician+LinkStudio+Page",
                },
                {
                  title: "Writer's Central Space",
                  img: "/placeholder.svg?width=600&height=800&text=Elegant+Writer+Profile",
                },
                {
                  title: "Brand's Content Universe",
                  img: "/placeholder.svg?width=600&height=800&text=Modern+Brand+Showcase",
                },
              ].map((item, i) => (
                <AnimatedWrapper
                  key={i}
                  className="snap-center shrink-0 w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw]"
                  variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}
                >
                  <div className="aspect-[9/16] sm:aspect-video lg:aspect-[4/3] bg-gray-800 rounded-xl shadow-2xl overflow-hidden group">
                    <Image
                      src={item.img || "/placeholder.svg"}
                      width={600}
                      height={800}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-center text-sm text-gray-400">{item.title}</p>
                </AnimatedWrapper>
              ))}
            </div>
          </div>
        </Section>

        {/* How It Works Section */}
        <Section id="how-it-works" className="bg-gray-50">
          <div className="text-center mb-16">
            <AnimatedWrapper>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Simplicity. Perfected.</h2>
            </AnimatedWrapper>
          </div>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16 items-start">
            {[
              {
                num: "01",
                title: "Select & Style",
                desc: "Choose a stunning template or start fresh. Customize with intuitive tools that feel like magic.",
              },
              {
                num: "02",
                title: "Curate & Connect",
                desc: "Add your essential links, embed rich content, and design a page that truly represents you.",
              },
              {
                num: "03",
                title: "Launch & Inspire",
                desc: "Share your unified presence with the world. One link, infinite possibilities.",
              },
            ].map((step, index) => (
              <AnimatedWrapper key={step.title} transitionDelay={index * 0.1}>
                <div className="relative pl-4">
                  <span
                    className="absolute left-0 top-0 text-6xl font-bold text-gray-100 -z-10"
                    style={{ lineHeight: "0.7" }}
                  >
                    {step.num}
                  </span>
                  <div className="ml-8 mt-2">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimatedWrapper>
            ))}
          </div>
        </Section>

        {/* Call to Action Section */}
        <Section id="cta" className="text-center">
          <AnimatedWrapper>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Define Your Digital Narrative.
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-lg text-gray-600 leading-relaxed">
              Join a new era of creators shaping their online presence with beauty, intent, and unparalleled ease.
              LinkStudio is free to start.
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-10 py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="#">
                  Claim Your LinkStudio <ArrowRight className="ml-2.5 w-5 h-5" />
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
              <LogoApple />
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end space-x-6 mb-4 md:mb-0">
              {["About", "Templates", "Pricing", "Contact", "Privacy", "Terms"].map((item) => (
                <Link key={item} href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {item}
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
