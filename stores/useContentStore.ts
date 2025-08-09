import { create } from "zustand";
import { persist } from "zustand/middleware";
import defaultImage from "@/public/Devben Portfolio.webp";
import { SocialLink } from "@/types/editorTypes";
import { deepmerge } from "deepmerge-ts";
import { ThemeMode, BannerConfig, defaultBannerConfig } from "@/lib/themeSystem";

// === Types ===
export type DesignType = {
  layout?: string;
  theme: ThemeMode;
  customBackground?: string;
  banner: BannerConfig;
  buttonColor?: string;
  color?: string;
  font?: string;
  bottomStyles?: string;
};

export type ContentType = {
  coverImage: string | null;
  id: string;
  profileId: string;
  profilePicture: string;
  profileName: string;
  profileBio: string;
  profileVerified: boolean;
};

export type ActionItemType = {
  id: string;
  type: "LINK_LIST" | "OTHER_ACTION";
  config: {
    title?: string;
    links?: { title: string; url: string }[];
  };
  order: number;
};

type UserContentStore = {
  loading: boolean;
  setLoading: (value: boolean) => void;

  templateId: string;
  setTemplateId: (templateId: string) => void;

  design: DesignType;
  setDesign: (data: Partial<DesignType>) => void;

  content: ContentType;
  setContent: (data: Partial<ContentType>) => void;

  actionItems: ActionItemType[];
  setActionItems: (items: ActionItemType[]) => void;
  addActionItem: (item: ActionItemType) => void;
  updateActionItem: (id: string, updates: Partial<ActionItemType["config"]>) => void;
  removeActionItem: (id: string) => void;
  
  // New method to handle temporary ID conversion
  convertTemporaryId: (oldId: string, newId: string) => void;
  
  // Method to check if an ID is temporary
  isTemporaryId: (id: string) => boolean;

  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (id: string, newUrl: string) => void;
  removeSocialLink: (id: string) => void;

  initializeStore: (data: StoreUpdateData) => void;
};

type StoreUpdateData = {
  templateId?: string;
  design?: Partial<DesignType>;
  content?: Partial<ContentType>;
  actionItems?: ActionItemType[];
  socialLinks?: SocialLink[];
};

// Helper function to generate temporary IDs
const generateTempId = () => `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// === Store ===
export const useUserContentStore = create<UserContentStore>()(
  persist(
    (set, get) => ({
      loading: true,
      setLoading: (value) => set({ loading: value }),

      templateId: "minimal",
      setTemplateId: (templateId) => set({ templateId }),

      design: {
        layout: "minimal",
        theme: 'dark' as ThemeMode,
        customBackground: undefined,
        banner: defaultBannerConfig,
        buttonColor: "rgba(255, 255, 255, 0.2)",
        color: "#FFFFFF",
        font: "Inter",
      },
      setDesign: (data) =>
        set((state) => ({ design: deepmerge(state.design, data) })),

      content: {
        id: "",
        profileId: "",
        profileName: "Ben",
        profileBio: "Content Creator",
        profilePicture: defaultImage.src,
        coverImage: null,
        profileVerified: false,
      },
      setContent: (data) =>
        set((state) => ({ content: deepmerge(state.content, data) })),

      actionItems: [
        {
          id: "default", // Use deterministic ID for SSR/CSR
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
      setActionItems: (items) => set({ actionItems: items }),
      addActionItem: (item) =>
        set((state) => ({ actionItems: [...state.actionItems, item] })),
      updateActionItem: (id, updates) =>
        set((state) => ({
          actionItems: state.actionItems.map((item) =>
            item.id === id
              ? { ...item, config: deepmerge(item.config, updates) }
              : item
          ),
        })),
      removeActionItem: (id) =>
        set((state) => ({
          actionItems: state.actionItems.filter((item) => item.id !== id),
        })),

      // New method to convert temporary IDs to real database IDs
      convertTemporaryId: (oldId, newId) =>
        set((state) => ({
          actionItems: state.actionItems.map((item) =>
            item.id === oldId ? { ...item, id: newId } : item
          ),
        })),

      // Method to check if an ID is temporary
      isTemporaryId: (id) => id === "default" || id.startsWith("temp_"),

      socialLinks: [],
      setSocialLinks: (links) => set({ socialLinks: links }),
      addSocialLink: (link) =>
        set((state) => ({ socialLinks: [...state.socialLinks, link] })),
      updateSocialLink: (id, newUrl) =>
        set((state) => ({
          socialLinks: state.socialLinks.map((link) =>
            link.id === id ? { ...link, url: newUrl } : link
          ),
        })),
      removeSocialLink: (id) =>
        set((state) => ({
          socialLinks: state.socialLinks.filter((link) => link.id !== id),
        })),

      initializeStore: (data: StoreUpdateData) =>
        set((state) => ({
          ...state,
          loading: false,
          templateId: data.templateId ?? state.templateId,
          design: data.design ? deepmerge(state.design, data.design) : state.design,
          content: data.content ? deepmerge(state.content, data.content) : state.content,
          actionItems: data.actionItems ?? state.actionItems,
          socialLinks: data.socialLinks ?? state.socialLinks,
        })),
    }),
    {
      name: "user-content-storage",
      partialize: (state) => ({
        templateId: state.templateId,
        design: state.design,
        content: state.content,
        actionItems: state.actionItems,
        socialLinks: state.socialLinks,
      }),
    }
  )
);