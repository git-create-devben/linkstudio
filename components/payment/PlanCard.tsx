import { Check, Star, Users, Crown } from 'lucide-react';
import { type Plan } from '@/lib/pricing';
import { getColorClasses } from '@/lib/ui-utils';

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  currentPrice: number;
  formattedPrice: string;
  savings: { amount: number; percentage: number } | null;
  billingCycle: 'monthly' | 'yearly';
  isLoading: boolean;
  customerEmail: string;
  pathname: string;
  onSelect: (planId: string) => void;
  onSubscribe: (plan: Plan) => void;
}

export const PlanCard = ({
  plan,
  isSelected,
  currentPrice,
  formattedPrice,
  savings,
  billingCycle,
  isLoading,
  customerEmail,
  pathname,
  onSelect,
  onSubscribe
}: PlanCardProps) => {
  const colorClasses = getColorClasses(plan.color, isSelected);
  const IconComponent = plan.icon;

  return (
    <div
      className={`relative bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-lg cursor-pointer focus-within:ring-2 focus-within:ring-blue-300 ${colorClasses.border}`}
      onClick={() => onSelect(plan.id)}
      role="button"
      tabIndex={0}
      aria-label={plan.ariaLabel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(plan.id);
        }
      }}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6 sm:p-8">
        {/* Icon and Name */}
        <div className="flex items-center mb-4">
          {/* <IconComponent className={`w-6 sm:w-8 h-6 sm:h-8 ${colorClasses.icon}`} aria-hidden="true" /> */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">{plan.name}</h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 text-sm sm:text-base">{plan.description}</p>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className={`text-3xl sm:text-4xl font-bold ${colorClasses.accent}`}>
              {formattedPrice}
            </span>
            {currentPrice > 0 && (
              <span className="text-gray-600 ml-2 text-sm sm:text-base">
                /{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            )}
          </div>
          {billingCycle === 'yearly' && savings && (
            <p className="text-sm text-green-600 mt-1">
              Save {savings.amount.toLocaleString()} ({savings.percentage}% off)
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8" role="list">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSubscribe(plan);
          }}
          disabled={pathname === "/" ? false : isLoading || !customerEmail}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${colorClasses.button}`}
          aria-label={`${plan.buttonText} for ${plan.name} plan`}
        >
          {isLoading ? 'Processing...' : plan.buttonText}
        </button>
      </div>
    </div>
  );
};