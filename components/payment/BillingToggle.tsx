interface BillingToggleProps {
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export const BillingToggle = ({ billingCycle, setBillingCycle }: BillingToggleProps) => {
  return (
    <div
      className="inline-flex items-center bg-gray-100 rounded-full p-1"
      role="tablist"
      aria-label="Billing cycle selection"
    >
      <button
        onClick={() => setBillingCycle('monthly')}
        role="tab"
        aria-selected={billingCycle === 'monthly'}
        className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
          billingCycle === 'monthly'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => setBillingCycle('yearly')}
        role="tab"
        aria-selected={billingCycle === 'yearly'}
        className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
          billingCycle === 'yearly'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Yearly
        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          Save up to 17%
        </span>
      </button>
    </div>
  );
};