import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedWrapper from "@/components/animated-wrapper";
import { LayoutGrid } from "lucide-react";
import { ROUTES, TEMPLATES_IMAGES } from "@/lib/constants";

const TemplateCard = ({ 
  title, 
  imageUrl, 
  category 
}: { 
  title: string; 
  imageUrl: string; 
  category: string; 
}) => (
  <AnimatedWrapper
    className="snap-center shrink-0 w-[70vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw]"
    variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
  >
    <div className="group">
      <div className="aspect-[3/4] bg-white rounded-xl shadow-l overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
        <Image
          src={imageUrl || "/placeholder.svg"}
          width={290}
          height={300}
          alt={title}
          className="object-cove bg-center mx-auto"
        />
      </div>
      <h4 className="mt-4 text-md font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-sm text-gray-500">{category}</p>
    </div>
  </AnimatedWrapper>
);

const templates = [
  {
    title: "Minimalist Creator",
    imageUrl: TEMPLATES_IMAGES.minimalist,
    category: "Artists & Designers",
  },
  {
    title: "Professional Executive",
    imageUrl: TEMPLATES_IMAGES.minimalist,
    category: "Business & Corporate",
  },
  {
    title: "Creative Artist Hub",
    imageUrl: TEMPLATES_IMAGES.minimalist,
    category: "Artists & Creatives",
  },
  {
    title: "Modern Music Producer",
    imageUrl: TEMPLATES_IMAGES.minimalist,
    category: "Musicians & DJs",
  },
  {
    title: "Digital Nomad",
    imageUrl: TEMPLATES_IMAGES.minimalist,
    category: "Travel & Lifestyle",
  },
];

export default function TemplatesSection() {
  return (
    <section id="templates" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
            {templates.map((template, i) => (
              <TemplateCard key={i} {...template} />
            ))}
          </div>
          
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {templates.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 focus:bg-blue-500 transition-colors"
              />
            ))}
          </div>
        </div>
        
        <AnimatedWrapper className="mt-16 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gray-300 text-gray-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900 text-base px-8 py-3 rounded-lg"
          >
            <Link href={ROUTES.TEMPLATE}>
              Explore All Templates <LayoutGrid className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </AnimatedWrapper>
      </div>
    </section>
  );
}