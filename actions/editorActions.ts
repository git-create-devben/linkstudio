// Updated contentActions.ts
"use server";

import prisma from "@/lib/prismaClient";
import { getUser } from "./authActions";
import { revalidatePath } from "next/cache";
import { ActionItemType } from "@/stores/useContentStore";
import { createClient } from "@/lib/supabase/server";

export async function useContent() {
  const profile = await getUser();
  console.log("profile", profile?.profile);

  if (!profile?.profile?.id) {
    console.log("No profile found");
    throw new Error("No profile found");
  }

  const content = await prisma.content.findUnique({
    where: {
      profileId: profile.profile.id,
    },
    include: {
      profile: {
        include: {
          content: true,
          design: true,
          actionItems: true,
          Actions: true,
        },
      },
    },
  });

  console.log("content", content);
  return content;
}

export async function updateUserContent(updates: {
  profileName?: string;
  profileBio?: string;
  profileVerified?: boolean;
  profilePicture?: string;
  coverImage?: string;
}) {
  const profile = await getUser();

  if (!profile?.profile?.id) {
    throw new Error("No profile found");
  }

  const updated = await prisma.content.update({
    where: {
      profileId: profile.profile.id,
    },
    data: {
      ...updates,
    },
  });

  return updated;
}

async function getProfile() {
  const user = await getUser();
  if (!user?.profile?.id) {
    throw new Error("Profile not found. User may not be logged in.");
  }
  return user.profile;
}

export async function updateContent(updates: {
  profileName?: string;
  profileBio?: string;
  profilePicture?: string;
  coverImage?: string;
}) {
  const profile = await getProfile();
  const updatedContent = await prisma.content.update({
    where: { profileId: profile.id },
    data: updates,
  });
  return updatedContent;
}

export async function createActionItem(actionData: {
  type: string;
  config: object;
  order: number;
}) {
  const profile = await getProfile();
  const newAction = await prisma.actionItem.create({
    data: {
      profileId: profile.id,
      type: actionData.type,
      config: actionData.config,
      order: actionData.order,
    },
  });
  return newAction;
}

export async function deleteActionItem(id: string) {
  const profile = await getProfile();
  
  // Check if this is a temporary/default ID
  if (id === "default" || id.startsWith("temp_")) {
    // For temporary IDs, just return success since they don't exist in DB
    return { success: true, isTemporary: true };
  }
  
  const actionToDelete = await prisma.actionItem.findUnique({ where: { id } });
  if (actionToDelete?.profileId !== profile.id) {
    throw new Error("Unauthorized");
  }

  await prisma.actionItem.delete({
    where: { id: id },
  });
  return { success: true };
}

// Updated updateActionItem to handle temporary IDs
export async function updateActionItem(id: string, config: object) {
  const profile = await getProfile();

  // Check if this is a temporary/default ID
  if (id === "default" || id.startsWith("temp_")) {
    // For temporary IDs, create a new action item instead of updating
    const newAction = await createActionItem({
      type: "LINK_LIST", // or determine type from config
      config,
      order: 0, // or determine order from existing items
    });
    
    return {
      ...newAction,
      wasTemporary: true,
      originalId: id
    };
  }

  // For existing items, proceed with normal update
  const itemToUpdate = await prisma.actionItem.findFirst({
    where: { id, profileId: profile.id }
  });
  
  if (!itemToUpdate) {
    throw new Error("Action not found or unauthorized.");
  }

  const updatedAction = await prisma.actionItem.update({
    where: { id: id },
    data: { config },
  });

  revalidatePath(`/${profile.displayName}`);
  return updatedAction;
}

// New function to convert temporary action items to real ones
export async function convertTemporaryActionItems(actionItems: ActionItemType[]) {
  const profile = await getProfile();
  const conversions: { oldId: string; newId: string }[] = [];

  for (const item of actionItems) {
    if (item.id === "default" || item.id.startsWith("temp_")) {
      const newAction = await createActionItem({
        type: item.type,
        config: item.config,
        order: item.order,
      });
      
      conversions.push({
        oldId: item.id,
        newId: newAction.id
      });
    }
  }

  return conversions;
}

export async function createSocialLink(data: { name: string; url: string }) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  const newLink = await prisma.socialLinks.create({
    data: {
      userId: user.id,
      name: data.name,
      url: data.url,
    },
  });
  revalidatePath(`/${user?.username}`);
  return newLink;
}

export async function updateSocialLink(id: string, newUrl: string) {
  const user = await getUser();
  const updatedLink = await prisma.socialLinks.update({
    where: { id: id },
    data: { url: newUrl },
  });
  revalidatePath(`/${user?.username}`);
  return updatedLink;
}

export async function deleteSocialLink(id: string) {
  const user = await getUser();
  await prisma.socialLinks.delete({
    where: { id: id },
  });
  revalidatePath(`/${user?.username}`);
  return { success: true };
}

export async function getSocialLinks() {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  const links = await prisma.socialLinks.findMany({
    where: { userId: user.id },
    orderBy: { id: "desc" },
  });

  return links;
}

export async function updateDesign(updates: {
  layout?: string;
  background?: string;
  buttonColor?: string;
  textColor?: string;
  font?: string;
}) {
  const user = await getUser();
  if (!user?.profile) throw new Error("Profile not found.");

  const updatedDesign = await prisma.design.upsert({
    where: { profileId: user.profile.id },
    update: {
      ...updates,
    },
    create: {
      profileId: user.profile.id,
      layout: updates.layout ?? "default",
      background: updates.background ?? "#ffffff",
      color: updates.textColor ?? "#000000",
      font: updates.font ?? "sans-serif",
    }
  });

  revalidatePath(`/${user.username}`);
  return updatedDesign;
}

export async function uploadCoverImage(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) throw new Error("No file provided.");

  const supabase = await createClient();
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  const filePath = `covers/${user.id}/${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage.from('covers').upload(filePath, file);
  if (uploadError) throw new Error(uploadError.message);

  const { data: { publicUrl } } = supabase.storage.from('covers').getPublicUrl(filePath);
  console.log("public url", publicUrl);

  await prisma.content.update({
    where: { profileId: user.profile?.id },
    data: { coverImage: publicUrl }
  });

  revalidatePath(`/${user.username}`);
  return publicUrl;
}

export async function uploadProfilePicture(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) throw new Error("No file provided.");

  const supabase = await createClient();
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  const filePath = `profilepicture/${user.id}/${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage.from('profilepicture').upload(filePath, file);
  if (uploadError) throw new Error(uploadError.message);

  const { data: { publicUrl } } = supabase.storage.from('profilepicture').getPublicUrl(filePath);
  console.log("public url", publicUrl);

  await prisma.content.update({
    where: { profileId: user.profile?.id },
    data: { profilePicture: publicUrl }
  });

  revalidatePath(`/${user.username}`);
  return publicUrl;
}