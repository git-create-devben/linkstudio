import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnimatedWrapper from "@/components/animated-wrapper";
import { Sparkles } from "lucide-react";

const TemplateComingSoon = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-md">
      <AnimatedWrapper elementType="section" className="w-full max-w-2xl mx-auto text-center">
        <Card className="p-10 md:p-16 flex flex-col items-center shadow-sm border-0 bg-white/80 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 via-purple-100 to-white">
            <Sparkles className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Link-in-Bio Template</h1>
          <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
            Our first beautiful template is launching soon.<br />
            We're crafting something special for you—stay tuned!
          </p>
          <Button size="lg" variant="outline" className="text-gray-500 border-gray-300 cursor-not-allowed opacity-70" disabled>
            Coming Soon
          </Button>
        </Card>
      </AnimatedWrapper>
    </div>
  );
};

export default TemplateComingSoon;