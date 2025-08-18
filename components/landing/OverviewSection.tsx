import AnimatedWrapper from "@/components/animated-wrapper";
import { Palette, LinkIcon, Layers } from "lucide-react";

const FeatureItem = ({
  icon: Icon,
  title,
  description,
  iconBgClass = "bg-blue-500",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBgClass?: string;
}) => (
  <AnimatedWrapper variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <div className={`flex items-center justify-center w-12 h-12 rounded-lg text-white mb-5 ${iconBgClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </AnimatedWrapper>
);

export default function OverviewSection() {
  return (
    <section id="overview" className="bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedWrapper>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Beyond the Bio. Beyond Compare.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              MyLinks isn't just a link tool. It's your personal stage, meticulously engineered for beauty,
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
            description="MyLinks grows with you, offering the sophisticated tools you need to shine, today and tomorrow."
            iconBgClass="bg-purple-500"
          />
        </div>
      </div>
    </section>
  );
}