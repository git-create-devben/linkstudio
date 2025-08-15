// Modular landing page components
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import OverviewSection from "@/components/landing/OverviewSection";
import TemplatesSection from "@/components/landing/TemplatesSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ShowcaseSection from "@/components/landing/ShowcaseSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default async function LinkStudioPage() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <HeroSection />
        <OverviewSection />
        {/* <TemplatesSection /> */}
        <FeaturesSection />
        <ShowcaseSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}