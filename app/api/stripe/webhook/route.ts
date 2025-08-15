import prisma from '@/lib/prismaClient';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';
// import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const rawBody = await req.arrayBuffer();
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(Buffer.from(rawBody), sig, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerEmail = session.customer_email!;
      const subscriptionId = session.subscription as string;

      // 🔥 Your DB logic: update user to mark them active
      await prisma.user.update({
        where: { email: customerEmail },
        data: {
          subscriptionId,
          isActive: true,
          plan: session?.metadata?.planId,
          billingCycle: session?.metadata?.billingCycle,
          payment_gateway: 'stripe',
        },
      });

      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      // 🔥 Mark subscription as inactive, send alert etc.
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response('Received', { status: 200 });
}