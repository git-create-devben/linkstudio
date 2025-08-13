import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prismaClient';
import { getUser } from '@/actions/authActions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find user's subscription
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { subscriptionId: true, payment_gateway: true }
    });

    if (!dbUser || !dbUser.subscriptionId) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
    }

    // Cancel subscription based on payment gateway
    if (dbUser.payment_gateway === 'stripe') {
      // Cancel Stripe subscription
      await stripe.subscriptions.cancel(dbUser.subscriptionId);
    } else if (dbUser.payment_gateway === 'paystack') {
      // Cancel Paystack subscription
      // You would implement Paystack cancellation here
      console.log('Paystack cancellation not implemented yet');
    }

    // Update user in database
    await prisma.user.update({
      where: { email: user.email },
      data: {
        isActive: false,
        plan: 'free',
        subscriptionId: null,
        billingCycle: null,
        payment_gateway: null
      }
    });

    return NextResponse.json({ success: true, message: 'Subscription cancelled successfully' });
  } catch (error: any) {
    console.error('Subscription cancellation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}