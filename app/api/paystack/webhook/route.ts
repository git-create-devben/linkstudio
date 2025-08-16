import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prismaClient';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-paystack-signature');

  const expectedSignature = crypto
    .createHmac('sha512', PAYSTACK_SECRET)
    .update(rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.error('❌ Invalid Paystack signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === 'charge.success') {
    const data = event.data;

    const customerEmail = data.customer.email;
    const amountPaid = data.amount / 100;
    const reference = data.reference;

    const plan = data.metadata?.planId || 'pro';
    const billingCycle = data.metadata?.billingCycle || 'monthly';
    console.log("Email from Paystack:", customerEmail);
    console.log("Paystack metadata:", data.metadata);
    // Optional: Store Paystack reference/transactionId if needed
    try {
      const updatedUser = await prisma.user.update({
        where: { email: customerEmail },
        data: {
          subscriptionId: reference,
          isActive: true,
          plan,
          billingCycle,
          payment_gateway: 'paystack', // add this to your model if you want to track source
        },
      });

      console.log(`✅ [Paystack] Payment success for ${updatedUser.email}, ₦${amountPaid}`);
    } catch (err) {
      console.error('🔥 Error updating user after payment:', err);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    return NextResponse.json({ received: true });
  }

  return NextResponse.json({ received: true });
}