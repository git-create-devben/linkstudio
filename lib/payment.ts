import { toast } from 'sonner';

export interface PaymentData {
  email: string;
  amount: number; // Amount in NGN for Paystack
  planId: string;
  billingCycle: 'monthly' | 'yearly';
  currency: string; // Always 'NGN' for Paystack
  originalAmount?: number; // Original amount in user's currency
  originalCurrency?: string; // User's display currency
}

export const initiatePaystackPayment = async (paymentData: PaymentData): Promise<void> => {
  const response = await fetch('/api/paystack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  const data = await response.json();

  if (data.authorization_url) {
    window.location.href = data.authorization_url;
  } else {
    throw new Error(data.error || 'Failed to create Paystack payment');
  }
};

export const handlePaymentError = (error: unknown): void => {
  console.error('Payment initiation failed:', error);
  toast.error('Payment initiation failed. Please try again.');
};