// Helper functions for managing action items with temporary IDs

import { updateActionItem } from "@/actions/editorActions";
import { useUserContentStore } from "@/stores/useContentStore";

export const updateActionItemSafely = async (
  id: string, 
  config: object, 
  actionType?: string, 
  order?: number
) => {
  try {
    const result = await updateActionItem(id, config, actionType, order);
    
    // If a new item was created (temporary ID converted), update the store
    if ((result as any).isNewItem) {
      const { updateActionItemWithNewId } = useUserContentStore.getState();
      updateActionItemWithNewId((result as any).oldId, (result as any).newId, config);
      
      console.log(`Converted temporary ID ${(result as any).oldId} to real ID ${(result as any).newId}`);
      
      return {
        ...result,
        id: (result as any).newId // Return the new ID for further use
      };
    }
    
    return result;
  } catch (error) {
    console.error('Error updating action item:', error);
    throw error;
  }
};

export const isTemporaryActionId = (id: string): boolean => {
  return id === "default" || 
         id === "music-player" || 
         id === "music-links" || 
         id === "travel-gallery" || 
         id === "travel-links" || 
         id === "creative-portfolio" ||
         id.startsWith("temp_") || 
         id.length < 10;
};

export const getActionTypeFromId = (id: string, config: any): string => {
  if (id.includes("music-player") || config?.spotifyUrl) {
    return "MUSIC_PLAYER";
  } else if (id.includes("gallery") || config?.images) {
    return "IMAGE_GALLERY";
  } else if (id.includes("calendar") || config?.calendarUrl) {
    return "CALENDAR_BOOKING";
  } else if (id.includes("contact") || config?.email) {
    return "CONTACT_FORM";
  } else if (id.includes("text") || config?.content) {
    return "TEXT_BLOCK";
  } else if (id.includes("video") || config?.youtubeUrl || config?.vimeoUrl) {
    return "VIDEO_SHOWCASE";
  } else if (id.includes("product") || config?.products) {
    return "PRODUCT_SHOWCASE";
  } else if (id.includes("location") || config?.address) {
    return "LOCATION_MAP";
  } else if (id.includes("phone") || config?.phoneNumber) {
    return "PHONE_CALL";
  } else {
    return "LINK_LIST";
  }
};