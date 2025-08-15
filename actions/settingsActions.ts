"use server"

import prisma from "@/lib/prismaClient";
import { getUser } from "./authActions";
import { revalidatePath } from "next/cache";

export async function deactivateUserAccount() {
  try {
    const user = await getUser();
    if (!user) return { error: 'User not authenticated', data: null };
    await prisma.user.update({ where: { email: user.email }, data: { isActive: false } });
    return { error: null, data: { success: true } };
  } catch (error: any) {
    return { error: error.message, data: null };
  }
}

export async function updateUserProfile(data: {
  displayName?: string;
  bio?: string;
  username?: string;
}) {
  try {
    const user = await getUser();
    if (!user) {
      return { error: 'User not authenticated', data: null };
    }

    // Check if username is already taken (if username is being updated)
    if (data.username && data.username !== user.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username: data.username }
      });
      
      if (existingUser) {
        return { error: 'Username already taken', data: null };
      }
    }

    // Update user table if username is provided
    if (data.username) {
      await prisma.user.update({
        where: { email: user.email },
        data: { username: data.username }
      });
    }

    // Update or create profile
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        displayName: data.displayName,
        bio: data.bio,
      },
      create: {
        userId: user.id,
        displayName: data.displayName,
        bio: data.bio,
      }
    });

    revalidatePath('/dashboard/settings');
    return { error: null, data: profile };
  } catch (error: any) {
    console.error('Update profile error:', error);
    return { error: error.message, data: null };
  }
}

export async function updateNotificationPreferences(preferences: {
  email: {
    marketing: boolean;
    security: boolean;
    billing: boolean;
    updates: boolean;
  };
  push: {
    newFollowers: boolean;
    linkClicks: boolean;
    weeklyReport: boolean;
  };
  sms: {
    security: boolean;
    billing: boolean;
  };
}) {
  try {
    const user = await getUser();
    if (!user) {
      return { error: 'User not authenticated', data: null };
    }

    // For now, we'll store preferences in a JSON field
    // In a real app, you might want a separate notifications table
    const updatedUser = await prisma.user.update({
      where: { email: user.email },
      data: {
        // Add a notifications field to your schema if needed
        // notifications: preferences
      }
    });

    revalidatePath('/dashboard/settings');
    return { error: null, data: updatedUser };
  } catch (error: any) {
    console.error('Update notification preferences error:', error);
    return { error: error.message, data: null };
  }
}

export async function deleteUserAccount() {
  try {
    const user = await getUser();
    if (!user) {
      return { error: 'User not authenticated', data: null };
    }

    // Cancel any active subscriptions first
    // This would involve calling Stripe/Paystack APIs

    // Delete user and all related data (cascading deletes should handle this)
    await prisma.user.delete({
      where: { email: user.email }
    });

    return { error: null, data: { success: true } };
  } catch (error: any) {
    console.error('Delete account error:', error);
    return { error: error.message, data: null };
  }
}

export async function exportUserData() {
  try {
    const user = await getUser();
    if (!user) {
      return { error: 'User not authenticated', data: null };
    }

    // Fetch all user data
    const userData = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        profile: {
          include: {
            actionItems: true,
            content: true,
            design: true,
            template: true
          }
        },
        socialLinks: true,
        webLinks: true,
        payments: true
      }
    });

    if (!userData) {
      return { error: 'User data not found', data: null };
    }

    // Remove sensitive information
    const exportData = {
      user: {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        createdAt: userData.createdAt,
        plan: userData.plan,
        billingCycle: userData.billingCycle
      },
      profile: userData.profile,
      socialLinks: userData.socialLinks,
      webLinks: userData.webLinks,
      payments: userData.payments.map(p => ({
        id: p.id,
        amount: p.amount,
        status: p.status,
        createdAt: p.createdAt
      })),
      exportedAt: new Date().toISOString()
    };

    return { error: null, data: exportData };
  } catch (error: any) {
    console.error('Export data error:', error);
    return { error: error.message, data: null };
  }
}