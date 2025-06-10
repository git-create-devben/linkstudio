// app/api/check-username/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, userId } = body;
    console.log("user Id from api:", userId);

    if (!username) {
      return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return NextResponse.json({ available: false }, { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: {
        supabaseId: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await prisma.user.update({
      where: {
        supabaseId: userId,
      },
      data: {
        username,
        onboardingStep: 1,
      },
    });

    return NextResponse.json({ available: true }, { status: 200 });

  } catch (error) {
    console.error('Error checking username:', JSON.stringify(error));
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}