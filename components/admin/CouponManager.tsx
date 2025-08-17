"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Plus, Calendar, Users } from 'lucide-react';
import { createCoupon } from '@/actions/couponActions';
import { toast } from 'sonner';

const CouponManager = () => {
  const [code, setCode] = useState('');
  const [type, setType] = useState<'pro' | 'premium'>('pro');
  const [maxUses, setMaxUses] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    setIsCreating(true);

    try {
      const result = await createCoupon(
        code.trim(),
        type,
        maxUses ? parseInt(maxUses) : undefined,
        expiresAt ? new Date(expiresAt) : undefined
      );

      if (result.success) {
        toast.success(result.message);
        setCode('');
        setMaxUses('');
        setExpiresAt('');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to create coupon');
    } finally {
      setIsCreating(false);
    }
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(result);
  };

  const createPresetCoupons = async () => {
    const presets = [
      { code: 'LAUNCH2024', type: 'pro' as const, maxUses: 100 },
      { code: 'WELCOME50', type: 'pro' as const, maxUses: 50 },
      { code: 'PREMIUM2024', type: 'premium' as const, maxUses: 25 },
    ];

    for (const preset of presets) {
      try {
        await createCoupon(preset.code, preset.type, preset.maxUses);
      } catch (error) {
        console.error(`Failed to create ${preset.code}`);
      }
    }
    
    toast.success('Preset coupons created!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={createPresetCoupons} className="w-full">
            Create Preset Launch Coupons
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            Creates: LAUNCH2024 (Pro, 100 uses), WELCOME50 (Pro, 50 uses), PREMIUM2024 (Premium, 25 uses)
          </p>
        </CardContent>
      </Card>

      {/* Create Custom Coupon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Custom Coupon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateCoupon} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Coupon Code</Label>
              <div className="flex gap-2">
                <Input
                  id="code"
                  type="text"
                  placeholder="MYCOUPON2024"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="flex-1 uppercase"
                  maxLength={20}
                />
                <Button type="button" onClick={generateRandomCode} variant="outline">
                  Generate
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Plan Type</Label>
              <Select value={type} onValueChange={(value: 'pro' | 'premium') => setType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pro">Pro Plan</SelectItem>
                  <SelectItem value="premium">Premium Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxUses" className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Max Uses (Optional)
                </Label>
                <Input
                  id="maxUses"
                  type="number"
                  placeholder="100"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiresAt" className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Expires At (Optional)
                </Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <Button type="submit" disabled={isCreating} className="w-full">
              {isCreating ? 'Creating...' : 'Create Coupon'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p>• Coupon codes are automatically converted to uppercase</p>
          <p>• Pro coupons give users 1 year of Pro access</p>
          <p>• Premium coupons give users 1 year of Premium access</p>
          <p>• Users with existing active subscriptions cannot redeem coupons</p>
          <p>• Coupons can be found on the payment page</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CouponManager;