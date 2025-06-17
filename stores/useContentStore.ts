import { create } from "zustand";
import { persist } from "zustand/middleware";
import defaultImage from "@/public/Devben Portfolio.webp";
import { SocialLink } from "@/types/editorTypes";

// === Types ===
export type DesignType = {
  layout?: string;
  background?: string;
  buttonColor?: string;
  color?: string;
  font?: string;
  bottomStyles?: string;
};

export type ContentType = {
  coverImage: string | null;
  id: string;
  profileId: string;
  profilePicture: string | null;
  profileName: string | null;
  profileBio: string | null;
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

  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (id: string, newUrl: string) => void;
  removeSocialLink: (id: string) => void;

  initializeStore: (data: {
    templateId: string;
    design: DesignType;
    content: ContentType;
    actionItems: ActionItemType[];
    socialLinks: SocialLink[];
  }) => void;
};

// === Store ===
export const useUserContentStore = create<UserContentStore>()(
  persist(
    (set) => ({
      loading: true,
      setLoading: (value) => set({ loading: value }),

      templateId: "minimal",
      setTemplateId: (templateId) => set({ templateId }),

      design: {
        layout: "minimal",
        background: "#FFFFFF",
        buttonColor: "#374151",
        color: "#1F2937",
        font: "Inter",
      },
      setDesign: (data) =>
        set((state) => ({ design: { ...state.design, ...data } })),

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
        set((state) => ({ content: { ...state.content, ...data } })),

      actionItems: [
        {
          id: "default",
          order: 0,
          type: "LINK_LIST",
          config: {
            links: [
              { title: "Link 1", url: "" },
              { title: "Link 1", url: "" },
              { title: "Link 1", url: "" },
              { title: "Link 1", url: "" },
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
              ? { ...item, config: { ...item.config, ...updates } }
              : item
          ),
        })),
      removeActionItem: (id) =>
        set((state) => ({
          actionItems: state.actionItems.filter((item) => item.id !== id),
        })),

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

      initializeStore: (data) =>
        set({
          templateId: data.templateId,
          design: data.design,
          content: data.content,
          actionItems: data.actionItems,
          socialLinks: data.socialLinks,
          loading: false,
        }),
    }),
    {
      name: "user-content-storage", // localStorage key
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