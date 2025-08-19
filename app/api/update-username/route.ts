import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getUser } from '@/actions/authActions';

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
        message: 'Username must be at least 3 characters and contain only lowercase letters, numbers, and hyphens' 
      }, { status: 400 });
    }

    // Get current user
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Check if username is already taken by another user
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser && existingUser.id !== user.id) {
      return NextResponse.json({ message: 'Username is already taken' }, { status: 400 });
    }

    // Update username
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username,
      },
    });

    return NextResponse.json({ 
      success: true,
      message: 'Username updated successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating username:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}