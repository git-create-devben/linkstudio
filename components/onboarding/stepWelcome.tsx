import { Sparkles } from "lucide-react";

const StepWelcome = ({ nextStep }: { nextStep: () => void }) => (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MyLinks!</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Create your personalized bio page to showcase your content, music, and connect with your audience in one beautiful place.
        </p>
      </div>
      <button onClick={nextStep} className="w-full bg-gray-900 text-white py-4 px-8 rounded-2xl">
        Get Started
      </button>
    </div>
  );
  export default StepWelcome;
  