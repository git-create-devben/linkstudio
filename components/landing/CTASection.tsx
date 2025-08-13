import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedWrapper from "@/components/animated-wrapper";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export default function CTASection() {
  return (
    <section id="cta" className="text-center py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
              <Link href={ROUTES.AUTH}>
                Claim Your LinkStudio <ArrowRight className="ml-2.5 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}