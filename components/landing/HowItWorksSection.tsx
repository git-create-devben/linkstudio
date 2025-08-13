import AnimatedWrapper from "@/components/animated-wrapper";

const steps = [
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
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedWrapper>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Simplicity. Perfected.
            </h2>
          </AnimatedWrapper>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 items-start">
          {steps.map((step, index) => (
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
      </div>
    </section>
  );
}