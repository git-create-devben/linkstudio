// components/TemplateInitializer.tsx
"use client";

import { useEffect, useState } from "react";
import { useUserContentStore } from "@/stores/useContentStore";
import { getFullUserProfile } from "@/actions/userActions";
import { getSocialLinks, syncTemplateActionItemsToDatabase } from "@/actions/editorActions";
import { mergeUserDataWithDefaults } from "./templateDefault";
import LoadingSpinner from "../loadingSpinner";
import TemplateRenderer from "./templateRender";
import { toast } from "sonner";
import { DesignType, ActionItemType } from "@/stores/useContentStore";

const TemplateInitializer = () => {
  const { loading, initializeStore, resetStoreWithTemplate, templateId } = useUserContentStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized || !loading) {
      return;
    }

    const fetchDataAndInitStore = async () => {
      try {
        // Fetch both profile data and social links
        const [profileData, socialLinksData] = await Promise.all([
          getFullUserProfile(),
          getSocialLinks(),
        ]);

        // Determine which template to use
        const selectedTemplateId = profileData?.templateId || "minimal";

        // Prepare user data object (only include what exists)
        const userData: any = {};

        // Add design data if available
        if (profileData?.design) {
          userData.design = profileData.design as DesignType;
        }

        // Add content data if available (only non-empty values)
        if (profileData?.content) {
          userData.content = {};
          
          // Only include properties that have actual user values
          if (profileData.content.id) {
            userData.content.id = profileData.content.id;
          }
          
          if (profileData.content.profileId || profileData.id) {
            userData.content.profileId = profileData.content.profileId || profileData.id;
          }
          
          if (profileData.content.profileName && profileData.content.profileName.trim() !== '') {
            userData.content.profileName = profileData.content.profileName;
          }
          
          if (profileData.content.profileBio && profileData.content.profileBio.trim() !== '') {
            userData.content.profileBio = profileData.content.profileBio;
          }
          
          if (profileData.content.profilePicture && profileData.content.profilePicture.trim() !== '') {
            userData.content.profilePicture = profileData.content.profilePicture;
          }
          
          if (profileData.content.coverImage && profileData.content.coverImage.trim() !== '') {
            userData.content.coverImage = profileData.content.coverImage;
          }
          
          if (profileData.content.profileVerified !== undefined && profileData.content.profileVerified !== null) {
            userData.content.profileVerified = profileData.content.profileVerified;
          }
        }

        // Add action items if available
        if (profileData?.actionItems && profileData.actionItems.length > 0) {
          userData.actionItems = profileData.actionItems.map((item) => ({
            ...item,
            type: item.type as "LINK_LIST" | "OTHER_ACTION",
            config: item.config as ActionItemType["config"],
          }));
        }

        // Add social links if available
        if (socialLinksData && socialLinksData.length > 0) {
          userData.socialLinks = socialLinksData;
        }

        console.log("User data to merge:", userData);

        // Merge user data with template defaults
        const mergedData = mergeUserDataWithDefaults(selectedTemplateId, userData);
        
        console.log("Merged data with template defaults:", mergedData);

        // Initialize the store with the merged data
        const initData = {
          templateId: selectedTemplateId,
          ...mergedData,
        };

        console.log("Final initialization data:", initData);
        
        // Always prioritize database template ID over localStorage
        const currentTemplateId = useUserContentStore.getState().templateId;
        
        // If database has a different template than localStorage, always use database version
        if (currentTemplateId !== selectedTemplateId) {
          console.log("Database template ID:", selectedTemplateId, "differs from localStorage:", currentTemplateId);
          console.log("Resetting store to match database template");
          resetStoreWithTemplate(initData);
        } else {
          // Only merge if templates match
          initializeStore(initData);
        }

        // Sync any template action items to database to prevent update errors
        if (mergedData.actionItems && mergedData.actionItems.length > 0) {
          try {
            const syncedItems = await syncTemplateActionItemsToDatabase(mergedData.actionItems);
            
            // Update store with new IDs if any were converted
            if (syncedItems.length > 0) {
              const { updateActionItemWithNewId } = useUserContentStore.getState();
              syncedItems.forEach(({ oldId, newId }) => {
                if (oldId !== newId) {
                  console.log(`Synced action item: ${oldId} -> ${newId}`);
                  updateActionItemWithNewId(oldId, newId);
                }
              });
            }
          } catch (error) {
            console.error("Error syncing action items:", error);
            // Continue anyway - the updateActionItemSafely function will handle individual conversions
          }
        }
        setIsInitialized(true);

      } catch (error) {
        console.error("Failed to initialize user content:", error);
        toast.error("Failed to load profile data");
        
        // Initialize with template defaults on error
        const defaultData = mergeUserDataWithDefaults("minimal", {});
        initializeStore({
          templateId: "minimal",
          ...defaultData,
        });
        setIsInitialized(true);
      }
    };

    fetchDataAndInitStore();
  }, [loading, initializeStore, isInitialized]);

  // Show loading spinner during initialization
  // if (loading || !isInitialized) {
  //   return <LoadingSpinner />;
  // }

  // Render the template once initialized
  return <TemplateRenderer templateId={templateId} />;
};

export default TemplateInitializer;