import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }

    // Validate username format
    if (username.length < 3 || !/^[a-z0-9-]+$/.test(username)) {
      return NextResponse.json({ 
        available: false, 
        message: 'Username must be at least 3 characters and contain only lowercase letters, numbers, and hyphens' 
      }, { status: 400 });
    }

    // Check if username exists
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return NextResponse.json({ 
      available: !existingUser,
      message: existingUser ? 'Username is already taken' : 'Username is available'
    }, { status: 200 });

  } catch (error) {
    console.error('Error checking username availability:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}