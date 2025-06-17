const ProgressBar = ({ steps, currentStep }: { steps: any[]; currentStep: number }) => (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-1 rounded-full transition-all ${
              index <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
  export default ProgressBar;
  