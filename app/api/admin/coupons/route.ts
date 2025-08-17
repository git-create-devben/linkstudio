import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prismaClient';
import { getUser } from '@/actions/authActions';

export async function GET() {
  try {
    const user = await getUser();
    
    // Simple admin check - replace with your email
    const adminEmails = ['your-admin-email@example.com'];
    
    if (!user || !adminEmails.includes(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    
    // Simple admin check - replace with your email
    const adminEmails = ['your-admin-email@example.com'];
    
    if (!user || !adminEmails.includes(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code, type, maxUses, expiresAt } = await req.json();

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        type,
        maxUses: maxUses || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive: true,
        currentUses: 0,
      }
    });

    return NextResponse.json(coupon);
  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}