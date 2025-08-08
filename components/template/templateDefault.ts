// lib/templateDefaults.ts
import defaultImage from "@/public/Devben Portfolio.webp";
import { DesignType, ContentType, ActionItemType } from "@/stores/useContentStore";
import { SocialLink } from "@/types/editorTypes";

export type TemplateDefaults = {
  design: DesignType;
  content: ContentType;
  actionItems: ActionItemType[];
  socialLinks: SocialLink[];
};

// Default data for Minimal Template
const minimalTemplateDefaults: TemplateDefaults = {
  design: {
    layout: "minimal",
    background: "#FFFFFF",
    buttonColor: "#374151",
    color: "#1F2937",
    font: "Inter",
  },
  content: {
    id: "",
    profileId: "",
    profileName: "Ben",
    profileBio: "Content Creator",
    profilePicture: defaultImage.src,
    coverImage: null,
    profileVerified: false,
  },
  actionItems: [
    {
      id: "default",
      order: 0,
      type: "LINK_LIST",
      config: {
        links: [
          { title: "Link 1", url: "" },
          { title: "Link 2", url: "" },
          { title: "Link 3", url: "" },
          { title: "Link 4", url: "" },
        ],
      },
    },
  ],
  socialLinks: [],
};

// You can add more template defaults here
const modernTemplateDefaults: TemplateDefaults = {
  design: {
    layout: "modern",
    background: "#000000",
    buttonColor: "#FFFFFF",
    color: "#FFFFFF",
    font: "Poppins",
  },
  content: {
    id: "",
    profileId: "",
    profileName: "Alex",
    profileBio: "Digital Creator",
    profilePicture: defaultImage.src,
    coverImage: null,
    profileVerified: false,
  },
  actionItems: [
    {
      id: "default",
      order: 0,
      type: "LINK_LIST",
      config: {
        links: [
          { title: "Portfolio", url: "" },
          { title: "Contact", url: "" },
          { title: "Blog", url: "" },
        ],
      },
    },
  ],
  socialLinks: [],
};

// Template defaults registry
export const templateDefaults: Record<string, TemplateDefaults> = {
  minimal: minimalTemplateDefaults,
  modern: modernTemplateDefaults,
  // Add more templates as needed
};

// Function to get defaults for a specific template
export const getTemplateDefaults = (templateId: string): TemplateDefaults => {
  return templateDefaults[templateId] || templateDefaults.minimal;
};

// Function to merge user data with template defaults
export const mergeUserDataWithDefaults = (
  templateId: string,
  userData: {
    design?: Partial<DesignType>;
    content?: Partial<ContentType>;
    actionItems?: ActionItemType[];
    socialLinks?: SocialLink[];
  }
): TemplateDefaults => {
  const defaults = getTemplateDefaults(templateId);
  
  return {
    design: { ...defaults.design, ...userData.design },
    content: { ...defaults.content, ...userData.content },
    actionItems: userData.actionItems && userData.actionItems.length > 0 
      ? userData.actionItems 
      : defaults.actionItems,
    socialLinks: userData.socialLinks && userData.socialLinks.length > 0 
      ? userData.socialLinks 
      : defaults.socialLinks,
  };
};