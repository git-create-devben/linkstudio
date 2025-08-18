"use server"
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "./authActions";
import { redirect } from "next/navigation";
export async function getUserId(supabaseId: string) {
  const user = await prisma.user.findUnique({ where: { supabaseId } });
  if (!user) throw new Error("No user found for supabaseId");
  return user.id;
}

export async function getUserProfile() {
  const supabase = await createClient()

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    // Get user details from Prisma
    const dbUser = await prisma.profile.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        profileImageUrl: true,
        bio: true,
        displayName: true,
        templateId: true,
        template: {
          select: {
            id: true,
            name: true,
            description: true,

          },
        },
        createdAt: true,
      }
    })
    // console.log("dbuser", dbUser)
    return dbUser
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}


export async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username }, select: {
      id: true,
      username: true,
      profile: {
        select: {
          id: true,
          profileImageUrl: true,
          bio: true,
          displayName: true,
          templateId: true,
          template: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      },
    }
  });
  if (!user){
    redirect("/")
  };
  // console.log("user", user)
  return user;
}

export async function getFullUserProfileByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      profile: {
        include: {
          actionItems: true,
          content: true,
          design: true,
          template: true,
        }
      }
    }
  });

  if (!user || !user.profile) {
    throw new Error("No profile found for username: " + username);
  }

  return user.profile;
}

export async function getSocialLinksByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true }
  });

  if (!user) {
    return [];
  }

  const links = await prisma.socialLinks.findMany({
    where: { userId: user.id },
    orderBy: { id: "desc" },
  });

  return links;
}

export async function getFullUserProfile() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()


  if (error || !user) {
    throw new Error("No authenticated Supabase user found");
  }

  const profile = await prisma.profile.findFirst({
    where: {
      user: {
        supabaseId: user.id,
      },
    },
    include: {
      user: true,
      actionItems: true,
      content: true,
      design: true,
      template: true,
    }
  })

  // console.log("🎯 Prisma profile:", profile)

  if (!profile) throw new Error("No profile found for Supabase user")

  return profile
}


export async function getUserSubscription() {
  const user = await getUser();

  if (!user) return { error: 'No user found', data: null };

  const subscription = await prisma.user.findFirst({
    where: { email: user.email },
    select: {
      isActive: true,
      billingCycle: true,
      subscriptionId: true,
      plan: true,
    },
  });

  if (!subscription) return { error: 'No subscription found', data: null };

  return { error: null, data: subscription };
}