// components/PaymentPlansWithDualGateway.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { Check, Star, Zap, Users, Shield, Crown, Globe } from 'lucide-react';
import { getUser } from '@/actions/authActions';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const PaymentPlansWithDualGateway = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const [userCountry, setUserCountry] = useState(null);
  const [paymentGateway, setPaymentGateway] = useState('stripe'); // default to stripe
  const [customerEmail, setCustomerEmail] = useState(''); // Added for email input
  const router = useRouter()
  const pathname = usePathname()

  // Detect user's country on component mount
  useEffect(() => {
    detectUserCountry();
  }, []);

  useEffect(() => {
    // No user check here; only set email if user is already present (optional)
    const fetchUser = async () => {
      const user = await getUser();
      setCustomerEmail(user?.email || '');
    };
    fetchUser();
  }, []);

  const detectUserCountry = async () => {
    try {
      // Method 1: Using ipapi.co (free tier available)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (data.country_code) {
        setUserCountry(data.country_code);
        // Set payment gateway based on country
        setPaymentGateway(data.country_code === 'NG' ? 'paystack' : 'stripe');
      }
    } catch (error) {
      console.error('Error detecting country:', error);
      // Fallback: try alternative method
      try {
        const fallbackResponse = await fetch('https://api.country.is/');
        const fallbackData = await fallbackResponse.json();
        if (fallbackData.country) {
          setUserCountry(fallbackData.country);
          setPaymentGateway(fallbackData.country === 'NG' ? 'paystack' : 'stripe');
        }
      } catch (fallbackError) {
        console.error('Fallback country detection failed:', fallbackError);
        // Default to Stripe if all methods fail
        setPaymentGateway('stripe');
      }
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: {
        monthly: { usd: 0, ngn: 0 },
        yearly: { usd: 0, ngn: 0 },
      },
      description: 'Perfect for getting started',
      icon: Star,
      features: [
        'Basic link-in-bio page',
        'Up to 2 actions',
        'No analytics',
        '1 template',
        'Subdomain hosting',
      ],
      buttonText: 'Get Started',
      popular: false,
      color: 'gray',
      ariaLabel: 'Free plan - Perfect for getting started',
    },
    {
      id: 'starter',
      name: 'Starter',
      price: {
        monthly: { usd: 8.33, ngn: 3750 },
        yearly: { usd: 99.99, ngn: 45000 },
      },
      description: 'Best for creators and influencers',
      icon: Zap,
      features: [
        'Up to 5 actions',
        'Standard analytics',
        'Custom domain support',
        'Standard templates',
        'Email capture',
        'Social media integration',
        'Priority support',
        'Verified badge',
      ],
      buttonText: 'Start Starter Plan',
      popular: true,
      color: 'blue',
      ariaLabel:
        'Starter plan - Best for creators and influencers, most popular option',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: {
        monthly: { usd: 16.67, ngn: 7500 },
        yearly: { usd: 199.99, ngn: 90000 },
      },
      description: 'For creators and brands getting serious',
      icon: Users,
      features: [
        'Everything in Starter',
        'Unlimited actions',
        'Advanced customization',
        'WhatsApp catalog integration',
        'White-label options',
        'Custom CSS & HTML',
        'Advanced integrations',
        'Remove LinkStudio branding',
      ],
      buttonText: 'Start Pro Plan',
      popular: false,
      color: 'purple',
      ariaLabel: 'Pro plan - For creators and growing brands',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: {
        monthly: { usd: 41.67, ngn: 18750 },
        yearly: { usd: 499.99, ngn: 225000 },
      },
      description: 'For business owners with high demands',
      icon: Crown,
      features: [
        'Everything in Pro',
        'Custom favicon',
        'Dedicated account manager',
        'Custom development',
        'SLA guarantee',
        'Advanced security features',
        'Custom integrations',
        'Mini-shop',
      ],
      buttonText: 'Contact Sales',
      popular: false,
      color: 'gold',
      ariaLabel: 'Premium plan - For business owners and enterprises',
    },
  ];
  const getColorClasses = (color:any, isSelected = false) => {
    const colors = {
      gray: {
        border: isSelected ? 'border-gray-400 ring-2 ring-gray-200' : 'border-gray-200',
        button: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300',
        icon: 'text-gray-600',
        accent: 'text-gray-900'
      },
      blue: {
        border: isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200',
        button: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300',
        icon: 'text-blue-600',
        accent: 'text-blue-600'
      },
      purple: {
        border: isSelected ? 'border-purple-500 ring-2 ring-purple-100' : 'border-gray-200',
        button: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-300',
        icon: 'text-purple-600',
        accent: 'text-purple-600'
      },
      gold: {
        border: isSelected ? 'border-yellow-500 ring-2 ring-yellow-100' : 'border-gray-200',
        button: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-300',
        icon: 'text-yellow-600',
        accent: 'text-yellow-600'
      }
    };
    return colors[color as keyof typeof colors];
  };

  const formatPrice = (price:any) => {
    if (price === 0) return 'Free';

    if (paymentGateway === 'paystack' && userCountry === 'NG') {
      return `₦${price.toLocaleString()}`;
    }
    return `$${price}`;
  };

  const getCurrentPrice = (plan:any) => {
    if (plan.price.monthly.usd === 0) return 0;

    if (paymentGateway === 'paystack' && userCountry === 'NG') {
      return plan.price[billingCycle].ngn;
    }
    return plan.price[billingCycle].usd;
  };

  const getSavings = (plan:any) => {
    if (plan.price.monthly.usd === 0) return null;

    const currency = (paymentGateway === 'paystack' && userCountry === 'NG') ? 'ngn' : 'usd';
    const monthlyCost = plan.price.monthly[currency] * 12;
    const savings = monthlyCost - plan.price.yearly[currency];
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { amount: savings, percentage };
  };

  const handlePlanSelect = (planId:any) => {
    setSelectedPlan(planId);
    // Announce to screen readers
    const plan = plans.find(p => p.id === planId);
    const announcement = `Selected ${plan?.name} plan`;
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;
    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 1000);
  };

  const handleSubscribe = async (plan:any) => {
    const user = await getUser();
    if (!user) {
      router.push('/auth');
      return;
    }
    if (plan.id === 'premium') { // Changed from 'enterprise' to 'premium'
      // For premium, redirect to contact form
      router.push('/contact');
      return;
    }

    if (plan.id === 'free') {
      // For free plan, redirect to signup
      router.push('/auth');
      return;
    }

    setIsLoading(true);

    try {
      if (paymentGateway === 'paystack') {
        await initiatePaystackPayment(plan);
      } else {
        await initiateStripePayment(plan);
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment initiation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const initiatePaystackPayment = async (plan:any) => {
    const response = await fetch('/api/paystack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customerEmail,
        amount: getCurrentPrice(plan),
        planId: plan.id,
        billingCycle: billingCycle,
      }),
    });

    const data = await response.json();

    if (data.authorization_url) {
      window.location.href = data.authorization_url;
    } else {
      throw new Error(data.error || 'Failed to create Paystack payment');
    }
  };

  const initiateStripePayment = async (plan:any) => {
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customerEmail,
        amount: getCurrentPrice(plan),
        planId: plan.id,
        billingCycle: billingCycle,
      }),
    });

    const session = await response.json();

    if (session.url) {
      window.location.href = session.url;
    } else {
      throw new Error(session.error || 'Failed to create Stripe checkout session');
    }
  };

  const PaymentGatewayIndicator = () => (
    <div className="flex items-center justify-center mb-6 text-sm text-gray-600">
      <Globe className="w-4 h-4 mr-2" />
      <span>
        {userCountry === 'NG' ? 'Nigerian users' : 'International users'} •
        Powered by {paymentGateway === 'paystack' ? 'Paystack' : 'Stripe'}
      </span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Grow your audience with the perfect plan for your needs
        </p>

        {/* Payment Gateway Indicator */}
        <PaymentGatewayIndicator />

        {/* Email Input */}
        <div className="max-w-md mx-auto mb-8">
        </div>

        {/* Billing Toggle */}
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
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const colorClasses = getColorClasses(plan.color, isSelected);
          const IconComponent = plan.icon;
          const savings = getSavings(plan);
          const currentPrice = getCurrentPrice(plan);

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-lg cursor-pointer focus-within:ring-2 focus-within:ring-blue-300 ${colorClasses.border}`}
              onClick={() => handlePlanSelect(plan.id)}
              role="button"
              tabIndex={0}
              aria-label={plan.ariaLabel}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePlanSelect(plan.id);
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
                  <IconComponent className={`w-6 sm:w-8 h-6 sm:h-8 ${colorClasses.icon}`} aria-hidden="true" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ml-3">{plan.name}</h2>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 text-sm sm:text-base">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className={`text-3xl sm:text-4xl font-bold ${colorClasses.accent}`}>
                      {formatPrice(currentPrice)}
                    </span>
                    {currentPrice > 0 && (
                      <span className="text-gray-600 ml-2 text-sm sm:text-base">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && savings && (
                    <p className="text-sm text-green-600 mt-1">
                      Save {formatPrice(savings.amount)} ({savings.percentage}% off)
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
                    handleSubscribe(plan);
                  }}
                  disabled={pathname === "/" ? false : isLoading || !customerEmail} // Disable if email is empty
                  className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${colorClasses.button}`}
                  aria-label={`${plan.buttonText} for ${plan.name} plan`}
                >
                  {isLoading ? 'Processing...' : plan.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center mt-8 sm:mt-12 text-gray-600">
        <Shield className="w-5 h-5 mr-2" aria-hidden="true" />
        <span className="text-sm text-center">
          Secure payments powered by {paymentGateway === 'paystack' ? 'Paystack' : 'Stripe'}. Cancel anytime.
        </span>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 sm:mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <details className="bg-gray-50 rounded-lg p-4 text-left">
            <summary className="font-medium text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 rounded">
              Can I change my plan anytime?
            </summary>
            <p className="mt-2 text-gray-600 text-sm">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </details>
          <details className="bg-gray-50 rounded-lg p-4 text-left">
            <summary className="font-medium text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 rounded">
              Is there a free trial?
            </summary>
            <p className="mt-2 text-gray-600 text-sm">
              Yes, all paid plans come with a 14-day free trial. No credit card required.
            </p>
          </details>
          <details className="bg-gray-50 rounded-lg p-4 text-left">
            <summary className="font-medium text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 rounded">
              What payment methods do you accept?
            </summary>
            <p className="mt-2 text-gray-600 text-sm">
              {paymentGateway === 'paystack'
                ? 'We accept all major Nigerian banks, cards, and mobile money for Nigerian users.'
                : 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
              }
            </p>
          </details>
          <details className="bg-gray-50 rounded-lg p-4 text-left">
            <summary className="font-medium text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 rounded">
              Why do I see different prices?
            </summary>
            <p className="mt-2 text-gray-600 text-sm">
              We offer localized pricing to make our service accessible to users worldwide. Nigerian users see prices in Naira via Paystack, while international users see USD prices via Stripe.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlansWithDualGateway;


