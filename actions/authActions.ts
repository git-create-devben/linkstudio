'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import  prisma  from '@/lib/prismaClient'


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
        profile:true,
        createdAt: true,
      }
    })

    return dbUser
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}

