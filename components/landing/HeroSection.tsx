import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedWrapper from "@/components/animated-wrapper";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ROUTES, ANIMATION_DELAYS } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section id="hero" className="pt-24 sm:pt-32 lg:pt-40 text-center overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedWrapper
          className="mb-8"
          variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
          transitionDelay={ANIMATION_DELAYS.HERO_BADGE}
        >
          <Link
            href="#templates"
            className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            <span>Explore Professionally Designed Templates</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </AnimatedWrapper>

        <AnimatedWrapper transitionDelay={ANIMATION_DELAYS.HERO_TITLE}>
          <h1 className="text-4xl sm:text-4xl text-4xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight">
            More Than a Link. <br />
            <span className="text-blue-600">It's Your Brand.</span>
          </h1>
        </AnimatedWrapper>

        <AnimatedWrapper transitionDelay={ANIMATION_DELAYS.HERO_DESCRIPTION}>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Design a single, stunning destination that brings together all your passions, projects, and platforms.
            Effortlessly. Elegantly. Uniquely you.
          </p>
        </AnimatedWrapper>

        <AnimatedWrapper transitionDelay={ANIMATION_DELAYS.HERO_CTA}>
          <div className="mt-10 flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <Link href={ROUTES.AUTH}>
                Create Your Space <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}