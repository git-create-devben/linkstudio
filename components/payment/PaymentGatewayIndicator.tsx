import { Globe } from 'lucide-react';
import { getCurrencyForCountry } from '@/lib/pricing';

interface PaymentGatewayIndicatorProps {
  country: string | null;
}

export const PaymentGatewayIndicator = ({ country }: PaymentGatewayIndicatorProps) => {
  const displayCurrency = getCurrencyForCountry(country);
  
  return (
    <div className="flex items-center justify-center mb-6 text-sm text-gray-600">
      <Globe className="w-4 h-4 mr-2" />
      <span>
        {country ? `${country} users` : 'Global users'} • 
        Prices shown in {displayCurrency.code} • Payments processed in NGN • Powered by Paystack
      </span>
    </div>
  );
};