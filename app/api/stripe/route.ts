import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { email, amount, planId, billingCycle } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${planId} Plan - ${billingCycle}`,
              description: `Subscription to ${planId} plan billed ${billingCycle}`,
            },
            unit_amount: amount * 100, // Stripe expects amount in cents
            recurring: {
              interval: billingCycle === 'monthly' ? 'month' : 'year',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancelled`,
      customer_email: email,
      metadata: {
        planId,
        billingCycle,
      },
    });

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    });
  } catch (error: any) {
    console.error('Stripe checkout session creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

