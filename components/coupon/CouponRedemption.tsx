"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gift, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { validateCoupon, redeemCoupon } from '@/actions/couponActions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CouponRedemptionProps {
  onSuccess?: () => void;
  className?: string;
}

const CouponRedemption = ({ onSuccess, className = '' }: CouponRedemptionProps) => {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    coupon?: any;
  } | null>(null);
  const router = useRouter();

  const handleValidate = async () => {
    if (!code.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      const result = await validateCoupon(code.trim());
      setValidationResult(result);
      
      if (!result.valid) {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to validate coupon');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRedeem = async () => {
    if (!validationResult?.valid) return;

    setIsRedeeming(true);

    try {
      const result = await redeemCoupon(code.trim());
      
      if (result.success) {
        toast.success(result.message);
        setCode('');
        setValidationResult(null);
        
        if (onSuccess) {
          onSuccess();
        } else {
          // Redirect to dashboard after successful redemption
          router.push('/dashboard');
          router.refresh();
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to redeem coupon');
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className={`bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-green-100 p-2 rounded-lg">
          <Gift className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Have a Coupon?</h3>
          <p className="text-sm text-gray-600">Redeem your coupon code for instant access</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setValidationResult(null);
            }}
            className="flex-1 uppercase text-black border-non outline-none"
            maxLength={20}
          />
          <Button
            onClick={handleValidate}
            disabled={isValidating || !code.trim()}
            variant="outline"
            className="border-green-300 text-green-100 cursor-pointer  hover:bg-green-700"
          >
            {isValidating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Validate'
            )}
          </Button>
        </div>

        {validationResult && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            validationResult.valid 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {validationResult.valid ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{validationResult.message}</span>
          </div>
        )}

        {validationResult?.valid && (
          <Button
            onClick={handleRedeem}
            disabled={isRedeeming}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {isRedeeming ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Redeeming...
              </>
            ) : (
              <>
                <Gift className="w-4 h-4 mr-2" />
                Redeem Coupon
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CouponRedemption;