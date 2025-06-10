const SkipButton = ({ currentStep, onClick }: { currentStep: number; onClick: () => void }) =>
    currentStep > 0 && currentStep < 5 ? (
      <button onClick={onClick} className="absolute top-6 right-6 text-sm text-gray-500">
        Skip
      </button>
    ) : null;
  
  export default SkipButton;
  