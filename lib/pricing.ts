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
  icon: any
}

// Country to currency mapping for display purposes
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

// Convert any currency amount to NGN for Paystack payment
export const convertToNGN = (amount: number, fromCurrency: string): number => {
  // Special pricing for Nigeria
  if (fromCurrency === 'NGN') {
    return amount; // Already in NGN
  }

  const exchangeRatesToNGN: Record<string, number> = {
    'NGN': 1,       // Already NGN
    'GHS': 133.33,  // 1 GHS = ~133 NGN
    'ZAR': 88.89,   // 1 ZAR = ~89 NGN
    'KES': 10.67,   // 1 KES = ~11 NGN
    'EGP': 51.61,   // 1 EGP = ~52 NGN
    'UGX': 0.43,    // 1 UGX = ~0.43 NGN
    'TZS': 0.70,    // 1 TZS = ~0.70 NGN
    'RWF': 1.60,    // 1 RWF = ~1.60 NGN
    'XOF': 2.67,    // 1 XOF = ~2.67 NGN
    'USD': 1600     // 1 USD = ~1600 NGN
  };

  const rate = exchangeRatesToNGN[fromCurrency] || exchangeRatesToNGN['USD'];
  return Math.round(amount * rate);
};

// Convert USD prices to local currencies with updated rates
export const getLocalizedPrice = (usdPrice: number, currency: string): number => {
  // Special pricing for Nigeria
  if (currency === 'NGN') {
    const ngnPricing: Record<number, number> = {
      5.00: 3000,   // Pro monthly: $5 = ₦3000
      50.00: 30000, // Pro yearly: $50 = ₦30000
      15.00: 6000,  // Premium monthly: $15 = ₦6000
      150.00: 60000 // Premium yearly: $150 = ₦60000
    };
    return ngnPricing[usdPrice] || Math.round(usdPrice * 600); // Fallback rate
  }

  const exchangeRates: Record<string, number> = {
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
    pro: { monthly: 5.00, yearly: 50.00 },
    premium: { monthly: 15.00, yearly: 150.00 }
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
      icon: "",
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
      icon: "",
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
      icon: "",
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