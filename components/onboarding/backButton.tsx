import { ChevronLeft } from "lucide-react";

const BackButton = ({ currentStep, onClick }: { currentStep: number; onClick: () => void }) =>
    currentStep > 0 ? (
      <button onClick={onClick} className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100">
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
    ) : null;
  
  export default BackButton;
  