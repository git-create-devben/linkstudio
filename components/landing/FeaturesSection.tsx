import AnimatedWrapper from "@/components/animated-wrapper";
import { SparklesIcon, Layers, BarChart3, Zap } from "lucide-react";

const FeatureItem = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <AnimatedWrapper variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg text-white mb-5 bg-blue-500">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </AnimatedWrapper>
);

const features = [
  {
    icon: SparklesIcon,
    title: "Intuitive Creation",
    description: "An effortless drag-and-drop canvas. Zero clutter, pure creative flow.",
  },
  {
    icon: Layers,
    title: "Rich Content Blocks",
    description: "Embed music, video, shops, podcasts, and more. Beautifully presented, seamlessly integrated.",
  },
  {
    icon: BarChart3,
    title: "Insightful Analytics",
    description: "Understand your audience with clear, actionable data. Amplify your reach, intelligently.",
  },
  {
    icon: Zap,
    title: "Lightning-Fast Load",
    description: "Deliver an exceptional experience with pages optimized for speed, on any device.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}