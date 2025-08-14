import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getUser } from '@/actions/authActions';
import { generatePlans, formatPrice, calculateSavings, type Plan } from '@/lib/pricing';
import { initiatePaystackPayment, handlePaymentError, type PaymentData } from '@/lib/payment';
import { announceToScreenReader } from '@/lib/ui-utils';
import { useGeolocation } from './useGeolocation';

export const usePaymentPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [plans, setPlans] = useState<Plan[]>([]);
  
  const router = useRouter();
  const pathname = usePathname();
  const { country, currency, isLoading: geoLoading } = useGeolocation();

  // Generate plans when currency is available
  useEffect(() => {
    if (currency) {
      setPlans(generatePlans(currency));
    }
  }, [currency]);

  // Fetch user email
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setCustomerEmail(user?.email || '');
    };
    fetchUser();
  }, []);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      announceToScreenReader(`Selected ${plan.name} plan`);
    }
  };

  const getCurrentPrice = (plan: Plan) => {
    return plan.price[billingCycle];
  };

  const getFormattedPrice = (price: number) => {
    return formatPrice(price, country);
  };

  const getSavings = (plan: Plan) => {
    return calculateSavings(plan);
  };

  const handleSubscribe = async (plan: Plan) => {
    const user = await getUser();
    if (!user) {
      router.push('/auth');
      return;
    }

    if (plan.id === 'free') {
      router.push('/auth');
      return;
    }

    setIsLoading(true);

    try {
      const paymentData: PaymentData = {
        email: customerEmail,
        amount: getCurrentPrice(plan),
        planId: plan.id,
        billingCycle: billingCycle,
      };

      await initiatePaystackPayment(paymentData);
    } catch (error) {
      handlePaymentError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    selectedPlan,
    billingCycle,
    isLoading: isLoading || geoLoading,
    customerEmail,
    plans,
    country,
    currency,
    pathname,
    
    // Actions
    setSelectedPlan: handlePlanSelect,
    setBillingCycle,
    handleSubscribe,
    
    // Computed values
    getCurrentPrice,
    getFormattedPrice,
    getSavings,
  };
};