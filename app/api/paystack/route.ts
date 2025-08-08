import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, amount, planId, billingCycle } = await req.json();

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      throw new Error('PAYSTACK_SECRET_KEY is not defined');
    }

    // Generate unique reference
    const reference = `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack expects amount in kobo
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
        metadata: {
          planId,
          billingCycle,
        },
      }),
    });

    const data = await response.json();

    if (data.status) {
      return NextResponse.json({ 
        authorization_url: data.data.authorization_url,
        reference: data.data.reference 
      });
    } else {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Paystack initialization error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

