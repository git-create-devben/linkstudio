export interface PricingTier {
  monthly: number;
  yearly: number;
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: PricingTier;
  description: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  color: 'gray' | 'blue' | 'purple' | 'gold';
  ariaLabel: string;
  icon:any
}

// Country to currency mapping for Paystack-supported countries
export const getCurrencyForCountry = (countryCode: string | null) => {
  const currencyMap = {
    'NG': { code: 'NGN', symbol: '₦' }, // Nigeria
    'GH': { code: 'GHS', symbol: 'GH₵' }, // Ghana
    'ZA': { code: 'ZAR', symbol: 'R' }, // South Africa
    'KE': { code: 'KES', symbol: 'KSh' }, // Kenya
    'EG': { code: 'EGP', symbol: 'E£' }, // Egypt
    'UG': { code: 'UGX', symbol: 'USh' }, // Uganda
    'TZ': { code: 'TZS', symbol: 'TSh' }, // Tanzania
    'RW': { code: 'RWF', symbol: 'RWF' }, // Rwanda
    'CI': { code: 'XOF', symbol: 'CFA' }, // Ivory Coast
    'DEFAULT': { code: 'USD', symbol: '$' }
  };
  
  return currencyMap[countryCode as keyof typeof currencyMap] || currencyMap['DEFAULT'];
};

// Convert USD prices to local currencies
export const getLocalizedPrice = (usdPrice: number, currency: string): number => {
  const exchangeRates: Record<string, number> = {
    'NGN': 1500,    // Nigeria Naira
    'GHS': 12,      // Ghana Cedis  
    'ZAR': 18,      // South African Rand
    'KES': 150,     // Kenyan Shilling
    'EGP': 31,      // Egyptian Pound
    'UGX': 3700,    // Ugandan Shilling
    'TZS': 2300,    // Tanzanian Shilling
    'RWF': 1000,    // Rwandan Franc
    'XOF': 600,     // West African CFA Franc
    'USD': 1        // Default USD
  };
  
  const rate = exchangeRates[currency] || exchangeRates['USD'];
  return Math.round(usdPrice * rate);
};

// Base pricing structure
export const getBasePricing = (): Record<string, PricingTier> => {
  return {
    pro: { monthly: 9.99, yearly: 99.99 },
    premium: { monthly: 19.99, yearly: 199.99 }
  };
};

// Generate plans with localized pricing
export const generatePlans = (currency: string): Plan[] => {
  const basePricing = getBasePricing();
  
  return [
    {
      id: 'free',
      name: 'Free',
      price: {
        monthly: 0,
        yearly: 0,
      },
      description: 'Perfect for getting started',
      features: [
        'Basic link-in-bio page',
        'Up to 2 actions',
        'Basic social links (3 max)',
        '1 minimal template',
        'LinkStudio branding',
        'Basic support',
      ],
      buttonText: 'Get Started',
      popular: false,
      color: 'gray',
      icon:"",
      ariaLabel: 'Free plan - Perfect for getting started',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: {
        monthly: getLocalizedPrice(basePricing.pro.monthly, currency),
        yearly: getLocalizedPrice(basePricing.pro.yearly, currency),
      },
      description: 'Best for creators and growing brands',
      features: [
        'Unlimited actions',
        'Unlimited social links',
        '5 premium templates',
        'Basic analytics dashboard',
        'Verified badge',
        'Advanced design options',
        'Remove LinkStudio branding',
        'Email support',
      ],
      buttonText: 'Start Pro Plan',
      popular: true,
      color: 'purple',
      icon:"",
      ariaLabel: 'Pro plan - Best for creators and growing brands, most popular option',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: {
        monthly: getLocalizedPrice(basePricing.premium.monthly, currency),
        yearly: getLocalizedPrice(basePricing.premium.yearly, currency),
      },
      description: 'For business owners with high demands',
      features: [
        'Everything in Pro',
        'All 6 premium templates',
        'Enhanced analytics suite',
        'Advanced customization',
        'Custom branding options',
        'Priority email support',
        'Feature request priority',
        'Early access to new features',
      ],
      buttonText: 'Start Premium Plan',
      popular: false,
      color: 'gold',
      icon:"",
      ariaLabel: 'Premium plan - For business owners and enterprises',
    },
  ];
};

// Format price with currency symbol
export const formatPrice = (price: number, countryCode: string | null): string => {
  if (price === 0) return 'Free';
  
  const currency = getCurrencyForCountry(countryCode);
  return `${currency.symbol}${price.toLocaleString()}`;
};

// Calculate savings for yearly plans
export const calculateSavings = (plan: Plan) => {
  if (plan.price.monthly === 0) return null;

  const monthlyCost = plan.price.monthly * 12;
  const savings = monthlyCost - plan.price.yearly;
  const percentage = Math.round((savings / monthlyCost) * 100);
  return { amount: savings, percentage };
};