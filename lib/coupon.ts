export interface Coupon {
  id: string;
  code: string;
  type: 'pro' | 'premium';
  isActive: boolean;
  expiresAt?: Date;
  maxUses?: number;
  currentUses: number;
  createdAt: Date;
}

export interface CouponValidationResult {
  valid: boolean;
  message: string;
  coupon?: Coupon;
}

export const validateCouponCode = (code: string): boolean => {
  // Basic validation: 6-20 characters, alphanumeric
  const regex = /^[A-Z0-9]{6,20}$/;
  return regex.test(code.toUpperCase());
};

export const formatCouponCode = (code: string): string => {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, '');
};