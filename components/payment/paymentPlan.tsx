"use client"
import React from 'react';
import { Shield } from 'lucide-react';
import { usePaymentPlans } from '@/hooks/usePaymentPlans';
import { PaymentGatewayIndicator } from './PaymentGatewayIndicator';
import { BillingToggle } from './BillingToggle';
import { PlanCard } from './PlanCard';
import { FAQ } from './FAQ';

const PaymentPlansPaystackOnly = () => {
  const {
    selectedPlan,
    billingCycle,
    loadingPlan,
    isLoading,
    customerEmail,
    plans,
    country,
    pathname,
    setSelectedPlan,
    setBillingCycle,
    handleSubscribe,
    getCurrentPrice,
    getFormattedPrice,
    getSavings,
  } = usePaymentPlans();

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

        <PaymentGatewayIndicator country={country} />

        <div className="max-w-md mx-auto mb-8"></div>

        <BillingToggle
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
        />
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const currentPrice = getCurrentPrice(plan);
          const formattedPrice = getFormattedPrice(currentPrice);
          const savings = getSavings(plan);

          return (
            <PlanCard
              key={plan.id}
              plan={plan}
              isSelected={isSelected}
              currentPrice={currentPrice}
              formattedPrice={formattedPrice}
              savings={savings}
              billingCycle={billingCycle}
              isLoading={loadingPlan === plan.id}
              customerEmail={customerEmail}
              pathname={pathname}
              onSelect={setSelectedPlan}
              onSubscribe={handleSubscribe}
            />
          );
        })}
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center mt-8 sm:mt-12 text-gray-600">
        <Shield className="w-5 h-5 mr-2" aria-hidden="true" />
        <span className="text-sm text-center">
          Secure payments powered by Paystack. Cancel anytime.
        </span>
      </div>

      <FAQ />
    </div>
  );
};

export default PaymentPlansPaystackOnly;


