'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prismaClient'

// Replace your googleSignIn function with this debug version temporarily

export async function googleSignIn() {
  const supabase = await createClient()  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('❌ Error during Google sign-in:', error)
    return { error: error.message }
  }



  if (data.url) {
    redirect(data.url) 
  }

  return { success: true }
}

// Add this new function to handle user creation after OAuth
// In 'actions/authActions.ts'

export async function handleOAuthCallback(supabaseUser: any) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: supabaseUser.email! },
      include: { profile: true }
    });

    if (existingUser) {
      console.log('✅ Existing user found:', existingUser.email);
      
      // Optional: Update supabaseId if it's missing
      if (!existingUser.supabaseId) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { supabaseId: supabaseUser.id }
        });
      }
      
      return { user: existingUser, isNew: false };
    }

    // If user does not exist, create them
    console.log('✨ Creating new user from OAuth:', supabaseUser.email);
    const newUser = await prisma.user.create({
      data: {
        email: supabaseUser.email!,
        supabaseId: supabaseUser.id,
        // Use the name from Google's metadata
        username: supabaseUser.user_metadata?.full_name,
        // Create the profile in the same transaction
        profile: {
          create: {},
        },
      },
      include: {
        profile: true,
      }
    });

    return { user: newUser, isNew: true };

  } catch (error: any) {
    console.error('❌ Error handling OAuth callback:', error);
    // If it's a unique constraint violation, it means the user was created
    // in a race condition. Try to find them again.
    if (error.code === 'P2002') {
      console.warn('Race condition averted: User already exists.');
      const user = await prisma.user.findUnique({
        where: { email: supabaseUser.email! },
        include: { profile: true }
      });
      // We assume if this error happens, the user exists but we'll treat them as existing (not new)
      if (user) return { user, isNew: false };
    }
    
    // Re-throw other errors to be caught by the route handler
    throw error;
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    fullName: formData.get('fullName') as string,
  }

  // Validate input
  if (!data.email || !data.password || !data.fullName) {
    return { error: 'All fields are required' }
  }
  
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  })

  if(existingUser) {
    return { error: 'User already exists, either by google or email' }
  }

  try {
    // Sign up with Supabase Auth
    const { error, data: { user } } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName.trim(),
        }
      }
    })

    if (user) {
      const createdUser = await prisma.user.create({
        data: {
          email: data.email,
          supabaseId: user.id,
        }
      });

      // create profile immediately
      await prisma.profile.create({
        data: {
         userId: createdUser.id,
        },
      });
    }
    console.log("user data", user)
    if (error) {
      console.error('Supabase signup error:', JSON.stringify(error))
      return { error: error.message }
    }
    return { success: true }
  } catch (error) {
    console.error('Signup error:', error)
    return { error: 'An error occurred during signup' }
  }
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Validate input
  if (!data.email || !data.password) {
    return { error: 'Email and password are required' }
  }

  try {
    // Sign in with Supabase
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      return { error: error.message }
    }
    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'An error occurred during login' }
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function getUser() {
  const supabase = await createClient()

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    // Get user details from Prisma
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
    })

    return dbUser
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}