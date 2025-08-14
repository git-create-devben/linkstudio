// ARCHIVED - Dual Gateway Payment Plan Implementation
// This file contains the original dual gateway (Stripe + Paystack) implementation
// Kept for future reference and potential re-implementation

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

  // DUAL GATEWAY STRIPE IMPLEMENTATION - ARCHIVED
  const initiateStripePayment = async (plan) => {
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

  // Rest of the dual gateway implementation would be here...
};

export default PaymentPlansWithDualGateway;
