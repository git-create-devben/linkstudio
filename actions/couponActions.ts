'use server'
import prisma from "@/lib/prismaClient";
import { getUser } from './authActions';
import type { CouponValidationResult } from '@/lib/coupon';

export async function validateCoupon(code: string): Promise<CouponValidationResult> {
  try {
    if (!code || code.length < 6) {
      return {
        valid: false,
        message: 'Please enter a valid coupon code'
      };
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!coupon) {
      return {
        valid: false,
        message: 'Invalid coupon code'
      };
    }

    if (!coupon.isActive) {
      return {
        valid: false,
        message: 'This coupon is no longer active'
      };
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return {
        valid: false,
        message: 'This coupon has expired'
      };
    }

    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
      return {
        valid: false,
        message: 'This coupon has reached its usage limit'
      };
    }

    return {
      valid: true,
      message: `Valid coupon for ${coupon.type} plan!`,
      coupon: coupon as any
    };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return {
      valid: false,
      message: 'Error validating coupon. Please try again.'
    };
  }
}

export async function createCoupon(
  code: string,
  type: 'pro' | 'premium',
  maxUses?: number,
  expiresAt?: Date
): Promise<{ success: boolean; message: string }> {
  try {
    // Check if coupon already exists
    const existingCoupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (existingCoupon) {
      return { success: false, message: 'Coupon code already exists' };
    }

    await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        type,
        maxUses,
        expiresAt,
        isActive: true,
        currentUses: 0
      }
    });

    return {
      success: true,
      message: `Coupon ${code.toUpperCase()} created successfully for ${type} plan`
    };
  } catch (error) {
    console.error('Error creating coupon:', error);
    return {
      success: false,
      message: 'Failed to create coupon'
    };
  }
}

export async function redeemCoupon(code: string): Promise<{ success: boolean; message: string }> {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    // Validate coupon first
    const validation = await validateCoupon(code);
    if (!validation.valid || !validation.coupon) {
      return { success: false, message: validation.message };
    }

    // Check if user already has an active subscription
    if (user.isActive && ['pro', 'premium'].includes(user.plan?.toLowerCase() || '')) {
      return {
        success: false,
        message: 'You already have an active subscription. Cancel your current plan first.'
      };
    }

    // Start transaction
    const result = await prisma.$transaction(async (tx: {
      coupon: { update: (arg0: { where: { id: string; }; data: { currentUses: { increment: number; }; }; }) => any; }; user: {
        update: (arg0: {
          where: { id: any; }; data: {
            plan: string; isActive: boolean; subscriptionStartDate: Date;
            // Set expiry to 1 year from now for coupon redemptions
            subscriptionEndDate: Date;
          };
        }) => any;
      };
    }) => {
      // Update coupon usage
      await tx.coupon.update({
        where: { id: validation.coupon!.id },
        data: { currentUses: { increment: 1 } }
      });

      // Update user subscription
      await tx.user.update({
        where: { id: user.id },
        data: {
          plan: validation.coupon!.type,
          isActive: true,
          subscriptionStartDate: new Date(),
          // Set expiry to 1 year from now for coupon redemptions
          subscriptionEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        }
      });

      return { success: true };
    });

    return {
      success: true,
      message: `Congratulations! You now have access to ${validation.coupon.type} features.`
    };

  } catch (error) {
    console.error('Error redeeming coupon:', error);
    return {
      success: false,
      message: 'Failed to redeem coupon. Please try again.'
    };
  }
}