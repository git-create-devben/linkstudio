// Authentication service layer
import { createClient } from '@/lib/supabase/server';
import prisma from '@/lib/prismaClient';

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  static async signupWithEmail(data: SignupData) {
    const supabase = await createClient();
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Sign up with Supabase Auth
    const { error, data: { user } } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName.trim(),
        }
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    if (user) {
      // Create user in database
      const createdUser = await prisma.user.create({
        data: {
          email: data.email,
          supabaseId: user.id,
        }
      });

      // Create profile
      await prisma.profile.create({
        data: {
          userId: createdUser.id,
        },
      });
    }

    return { success: true };
  }

  static async loginWithEmail(data: LoginData) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  }

  static async signInWithGoogle() {
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async getCurrentUser() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Get user details from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      select: {
        id: true,
        email: true,
        username: true,
        plan: true,
        isActive: true,
        billingCycle: true,
        subscriptionId: true,
        profile: true,
        createdAt: true,
      }
    });

    return dbUser;
  }

  static async logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
}