"use client";

import { useEffect, useState } from "react";
import { getFullUserProfileByUsername, getSocialLinksByUsername } from "@/actions/userActions";
import { mergeUserDataWithDefaults } from "./templateDefault";
import LoadingSpinner from "../loadingSpinner";
import TemplateRenderer from "./templateRender";
import { toast } from "sonner";
import { DesignType, ActionItemType } from "@/stores/useContentStore";

interface PublicTemplateInitializerProps {
  username: string;
}

const PublicTemplateInitializer = ({ username }: PublicTemplateInitializerProps) => {
  const [templateData, setTemplateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // Fetch profile data by username
        const profileData = await getFullUserProfileByUsername(username);
        
        // Determine which template to use
        const selectedTemplateId = profileData?.templateId || "minimal";

        // Prepare user data object
        const userData: any = {};

        // Add design data if available
        if (profileData?.design) {
          userData.design = profileData.design as DesignType;
        }

        // Add content data if available
        if (profileData?.content) {
          userData.content = {};
          
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
          
          if (profileData.content.verifiedBadgeStyle && profileData.content.verifiedBadgeStyle.trim() !== '') {
            userData.content.verifiedBadgeStyle = profileData.content.verifiedBadgeStyle;
          }
        }

        // Add action items if available
        if (profileData?.actionItems && profileData.actionItems.length > 0) {
          userData.actionItems = profileData.actionItems.map((item) => ({
            ...item,
            type: item.type as "LINK_LIST" | "MUSIC_PLAYER" | "CONTACT_FORM" | "TEXT_BLOCK" | "IMAGE_GALLERY" | "LOCATION_MAP" | "VIDEO_SHOWCASE" | "PRODUCT_SHOWCASE" | "CALENDAR_BOOKING" | "PHONE_CALL",
            config: item.config as ActionItemType["config"],
          }));
        }

        // Get social links for the public profile
        try {
          const socialLinksData = await getSocialLinksByUsername(username);
          if (socialLinksData && socialLinksData.length > 0) {
            userData.socialLinks = socialLinksData;
          } else {
            userData.socialLinks = [];
          }
        } catch (socialError) {
          userData.socialLinks = [];
        }


        // Merge user data with template defaults
        const mergedData = mergeUserDataWithDefaults(selectedTemplateId, userData);
        

        // Set the template data
        setTemplateData({
          templateId: selectedTemplateId,
          ...mergedData,
        });

      } catch (error) {
        console.error("Failed to load public profile:", error);
        setError("Failed to load profile");
        toast.error("Failed to load profile data");
        
        // Initialize with template defaults on error
        const defaultData = mergeUserDataWithDefaults("minimal", {});
        setTemplateData({
          templateId: "minimal",
          ...defaultData,
        });
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfileData();
    }
  }, [username]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">The profile you're looking for doesn't exist or is not available.</p>
        </div>
      </div>
    );
  }

  if (!templateData) {
    return <LoadingSpinner />;
  }

  // Create a mock template renderer that doesn't use the store
  return (
    <PublicTemplateRenderer 
      templateId={templateData.templateId}
      content={templateData.content}
      design={templateData.design}
      actionItems={templateData.actionItems}
      socialLinks={templateData.socialLinks}
    />
  );
};

// Public template renderer that doesn't rely on the store
const PublicTemplateRenderer = ({ templateId, content, design, actionItems, socialLinks }: any) => {
  const { templateRegistry } = require("./index");
  
  const templateProps = {
    name: templateId,
    content,
    design,
    actionItems,
    toggles: {
      profileImage: true,
      profileName: true,
      verifiedBadge: true,
      bio: true,
      heading: true,
    },
    socialLinks,
    actions: actionItems,
  };

  const TemplateComponent = templateRegistry[templateId];

  if (!TemplateComponent) {
    return <div>Template '{templateId}' not found.</div>;
  }

  return <TemplateComponent {...templateProps} />;
};

export default PublicTemplateInitializer;