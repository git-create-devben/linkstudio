// Updated contentActions.ts
"use server";

import prisma from "@/lib/prismaClient";
import { getUser } from "./authActions";
import { revalidatePath } from "next/cache";
import { ActionItemType, DesignType, ContentType } from "@/stores/useContentStore";
import { createClient } from "@/lib/supabase/server";

async function getProfile() {
  const user = await getUser();
  if (!user?.profile?.id) {
    throw new Error("Profile not found. User may not be logged in.");
  }
  return user.profile;
}

export async function saveAll(data: {
  design: DesignType;
  content: ContentType;
  actionItems: ActionItemType[];
  templateId: string;
}) {
  const profile = await getProfile();

  const { id: designId, profileId: designProfileId, ...designData } = data.design as any;
  const { id: contentId, profileId: contentProfileId, ...contentData } = data.content as any;

  // 1. Save Design
  await prisma.design.update({
    where: { profileId: profile.id },
    data: designData,
  });

  // 2. Save Content
  await prisma.content.update({
    where: { profileId: profile.id },
    data: contentData,
  });

  // 3. Save Action Items
  for (const item of data.actionItems) {
    if (item.id === "default" || item.id.startsWith("temp_")) {
      // Create new item
      await prisma.actionItem.create({
        data: {
          profileId: profile.id,
          type: item.type,
          config: item.config,
          order: item.order,
        },
      });
    } else {
      // Update existing item
      await prisma.actionItem.update({
        where: { id: item.id },
        data: {
          config: item.config,
          order: item.order,
        },
      });
    }
  }

  // 4. Save Template
  await prisma.profile.update({
    where: { id: profile.id },
    data: { templateId: data.templateId },
  });

  revalidatePath(`/${profile.displayName}`);
  return { success: true };
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
  if (id === "default" || id.startsWith("temp_")) {
    return { success: true, isTemporary: true };
  }
  const actionToDelete = await prisma.actionItem.findUnique({ where: { id } });
  if (actionToDelete?.profileId !== profile.id) {
    throw new Error("Unauthorized");
  }
  await prisma.actionItem.delete({ where: { id: id } });
  return { success: true };
}

export async function updateActionItem(id: string, config: object, actionType?: string, order?: number) {
  const profile = await getProfile();

  // Check if this is a temporary/default ID that needs to be converted to a real database entry
  const isTemporaryId = id === "default" || id === "music-player" || id === "music-links" ||
    id === "travel-gallery" || id === "travel-links" || id === "creative-portfolio" ||
    id.startsWith("temp_") || id.length < 10;

  let itemToUpdate = await prisma.actionItem.findFirst({
    where: { id, profileId: profile.id },
  });

  if (!itemToUpdate) {
    if (isTemporaryId) {
      // This is a template default item that doesn't exist in DB yet - create it
      console.log(`Creating new action item for temporary ID: ${id}`);

      // Determine the action type based on the ID or config
      let type: string = actionType || "LINK_LIST";

      if (id.includes("music-player") || (config as any)?.spotifyUrl) {
        type = "MUSIC_PLAYER";
      } else if (id.includes("gallery") || (config as any)?.images) {
        type = "IMAGE_GALLERY";
      } else if (id.includes("calendar") || (config as any)?.calendarUrl) {
        type = "CALENDAR_BOOKING";
      } else if ((config as any)?.links) {
        type = "LINK_LIST";
      }

      // Get the current order from existing items if not provided
      const currentOrder = order ?? await prisma.actionItem.count({
        where: { profileId: profile.id }
      });

      const newAction = await prisma.actionItem.create({
        data: {
          profileId: profile.id,
          type: type as any,
          config: config,
          order: currentOrder,
        },
      });

      revalidatePath(`/${profile.displayName}`);
      return {
        ...newAction,
        isNewItem: true,
        oldId: id,
        newId: newAction.id
      };
    } else {
      throw new Error("Action not found or unauthorized.");
    }
  }

  // Update existing item
  const updatedAction = await prisma.actionItem.update({
    where: { id: id },
    data: { config },
  });

  revalidatePath(`/${profile.displayName}`);
  return updatedAction;
}
// Function to convert all temporary action items to real database entries
// export async function convertTemporaryActionItems() {
//   const profile = await getProfile();

//   // Get all existing action items from database
//   const existingItems = await prisma.actionItem.findMany({
//     where: { profileId: profile.id },
//     orderBy: { order: 'asc' }
//   });

//   return existingItems;
// }

// Function to create action item if it doesn't exist
export async function createActionItemIfNotExists(tempId: string, type: string, config: object, order: number) {
  const profile = await getProfile();

  // Check if item already exists
  const existing = await prisma.actionItem.findFirst({
    where: { id: tempId, profileId: profile.id }
  });

  if (existing) {
    return existing;
  }

  // Create new item
  const newAction = await prisma.actionItem.create({
    data: {
      profileId: profile.id,
      type: type as any,
      config: config,
      order: order,
    },
  });

  revalidatePath(`/${profile.displayName}`);
  return newAction;
}

// Function to sync template action items to database
export async function syncTemplateActionItemsToDatabase(actionItems: ActionItemType[]) {
  const profile = await getProfile();

  const syncedItems = [];

  for (const item of actionItems) {
    // Check if this is a temporary ID
    const isTemporary = item.id === "default" || item.id === "music-player" || item.id === "music-links" ||
      item.id === "travel-gallery" || item.id === "travel-links" || item.id === "creative-portfolio" ||
      item.id.startsWith("temp_") || item.id.length < 10;

    if (isTemporary) {
      // Check if item already exists in database
      const existing = await prisma.actionItem.findFirst({
        where: {
          profileId: profile.id,
          type: item.type,
          order: item.order
        }
      });

      if (!existing) {
        // Create new database entry
        const newAction = await prisma.actionItem.create({
          data: {
            profileId: profile.id,
            type: item.type,
            config: item.config,
            order: item.order,
          },
        });

        syncedItems.push({
          oldId: item.id,
          newId: newAction.id,
          action: newAction
        });
      } else {
        syncedItems.push({
          oldId: item.id,
          newId: existing.id,
          action: existing
        });
      }
    }
  }

  revalidatePath(`/${profile.displayName}`);
  return syncedItems;
}
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