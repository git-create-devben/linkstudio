import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getUser } from '@/actions/authActions';

export async function GET(req: NextRequest) {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get payment history from database
    const payments = await prisma.payment.findMany({
      where: {
        user: {
          email: user.email
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // Limit to last 50 payments
    });

    // Transform payments to match frontend interface
    const paymentHistory = payments.map(payment => ({
      id: payment.id,
      date: payment.createdAt.toISOString(),
      amount: payment.amount / 100, // Convert from cents
      status: payment.status,
      description: `Payment - ${payment.reference}`,
      reference: payment.reference
    }));

    return NextResponse.json({ payments: paymentHistory });
  } catch (error: any) {
    console.error('Payment history fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}