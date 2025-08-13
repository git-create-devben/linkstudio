import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prismaClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
      select: { subscriptionId: true, email: true }
    });

    if (!user || !user.subscriptionId) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
    }

    // Get the subscription from Stripe
    const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
    
    if (!subscription.customer) {
      return NextResponse.json({ error: 'No customer found for subscription' }, { status: 404 });
    }

    // Create customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.customer as string,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings?tab=payment`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Customer portal creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}