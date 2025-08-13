import { create } from "zustand";
import { persist } from "zustand/middleware";
import { deepmerge } from "deepmerge-ts";
import { saveAll } from "@/actions/editorActions";
import { SocialLink } from "@/types/editorTypes";
import { ThemeMode, BannerConfig, defaultBannerConfig } from "@/lib/themeSystem";
import defaultImage from "@/public/Devben Portfolio.webp";

// === Types ===
export type DesignType = {
  theme: ThemeMode;
  layout?: string;
  font?: string;
  customBackground?: string;
  bannerType?: 'none' | 'image' | 'curve';
  bannerValue?: string;
  bannerHeight?: number;
  bannerOpacity?: number;
  bannerBlur?: boolean;
  curveShape?: string;
  curveColor?: string;
  curveAnimated?: boolean;
  textPrimaryColor?: string;
  textSecondaryColor?: string;
  textAlignment?: 'left' | 'center' | 'right';
  buttonStyle?: 'default' | 'rounded' | 'square' | 'pill';
  buttonColor?: string;
  buttonTextColor?: string;
  buttonBorderColor?: string;
  buttonHoverColor?: string;
  buttonShadow?: boolean;
  buttonAnimation?: 'scale' | 'slide' | 'glow' | 'none';
  cardStyle?: 'glass' | 'solid' | 'outline' | 'minimal';
  cardBorderRadius?: number;
  cardShadow?: boolean;
  cardBlur?: boolean;
  reducedMotion?: boolean;
  animationSpeed?: 'slow' | 'normal' | 'fast';
  banner?: BannerConfig;
  color?: string;
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
  type: "LINK_LIST" | "CONTACT_FORM" | "TEXT_BLOCK" | "IMAGE_GALLERY" | "CALENDAR_BOOKING" | "MUSIC_PLAYER" | "VIDEO_SHOWCASE" | "PRODUCT_SHOWCASE" | "LOCATION_MAP" | "PHONE_CALL";
  config: {
    title?: string;
    links?: { title: string; url: string; icon?: string }[];
    email?: string;
    content?: string;
    images?: { url: string; caption?: string }[];
    calendarUrl?: string;
    phoneNumber?: string;
    address?: string;
    products?: any[];
    spotifyUrl?: string;
    soundcloudUrl?: string;
    youtubeUrl?: string;
    vimeoUrl?: string;
    showMap?: boolean;
    description?: string;
    successMessage?: string;
    [key: string]: any;
  };
  order: number;
};

type UserContentStore = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  lastSaved: Date | null;
  setLastSaved: (date: Date) => void;
  isSaving: boolean;
  setIsSaving: (saving: boolean) => void;
  saveError: string | null;
  setSaveError: (error: string | null) => void;
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
  convertTemporaryId: (oldId: string, newId: string) => void;
  isTemporaryId: (id: string) => boolean;
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (id: string, newUrl: string) => void;
  removeSocialLink: (id: string) => void;
  initializeStore: (data: StoreUpdateData) => void;
  saveAllChanges: () => Promise<void>;
  discardChanges: () => void;
  resetToLastSaved: () => void;
};

type StoreUpdateData = {
  templateId?: string;
  design?: Partial<DesignType>;
  content?: Partial<ContentType>;
  actionItems?: ActionItemType[];
  socialLinks?: SocialLink[];
};

export const useUserContentStore = create<UserContentStore>()(
  persist(
    (set, get) => ({
      loading: true,
      setLoading: (value) => set({ loading: value }),
      isDirty: false,
      setIsDirty: (dirty) => set({ isDirty: dirty }),
      lastSaved: null,
      setLastSaved: (date) => set({ lastSaved: date }),
      isSaving: false,
      setIsSaving: (saving) => set({ isSaving: saving }),
      saveError: null,
      setSaveError: (error) => set({ saveError: error }),
      templateId: "minimal",
      setTemplateId: (templateId) => set({ templateId, isDirty: true }),
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
        set((state) => ({ design: deepmerge(state.design, data), isDirty: true })),
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
        set((state) => ({ content: deepmerge(state.content, data), isDirty: true })),
      actionItems: [
        {
          id: "default",
          order: 0,
          type: "LINK_LIST",
          config: {
            links: [
              { title: "Link 1", url: "" },
            ],
          },
        },
      ],
      setActionItems: (items) => set({ actionItems: items, isDirty: true }),
      addActionItem: (item) =>
        set((state) => ({ actionItems: [...state.actionItems, item], isDirty: true })),
      updateActionItem: (id, updates) =>
        set((state) => ({
          actionItems: state.actionItems.map((item) =>
            item.id === id
              ? { ...item, config: { ...item.config, ...updates } }
              : item
          ),
          isDirty: true
        })),
      removeActionItem: (id) =>
        set((state) => ({
          actionItems: state.actionItems.filter((item) => item.id !== id),
          isDirty: true
        })),
      convertTemporaryId: (oldId, newId) =>
        set((state) => ({
          actionItems: state.actionItems.map((item) =>
            item.id === oldId ? { ...item, id: newId } : item
          ),
        })),
      isTemporaryId: (id) => id === "default" || id.startsWith("temp_"),
      socialLinks: [],
      setSocialLinks: (links) => set({ socialLinks: links, isDirty: true }),
      addSocialLink: (link) =>
        set((state) => ({ socialLinks: [...state.socialLinks, link], isDirty: true })),
      updateSocialLink: (id, newUrl) =>
        set((state) => ({
          socialLinks: state.socialLinks.map((link) =>
            link.id === id ? { ...link, url: newUrl } : link
          ),
          isDirty: true
        })),
      removeSocialLink: (id) =>
        set((state) => ({
          socialLinks: state.socialLinks.filter((link) => link.id !== id),
          isDirty: true
        })),
      initializeStore: (data: StoreUpdateData) => {
        set((state) => ({
          ...state,
          loading: false,
          isDirty: false,
          lastSaved: new Date(),
          templateId: data.templateId ?? state.templateId,
          design: data.design ? deepmerge(state.design, data.design) : state.design,
          content: data.content ? deepmerge(state.content, data.content) : state.content,
          actionItems: data.actionItems ?? state.actionItems,
          socialLinks: data.socialLinks ?? state.socialLinks,
        }));
      },
      saveAllChanges: async () => {
        const { isSaving, design, content, actionItems, templateId } = get();
        if (isSaving) return;

        set({ isSaving: true, saveError: null });
        try {
          await saveAll({ design, content, actionItems, templateId });
          set({ isDirty: false, isSaving: false, lastSaved: new Date() });
        } catch (error) {
          console.error("Failed to save changes:", error);
          set({ isSaving: false, saveError: "Failed to save. Please try again." });
        }
      },
      resetToLastSaved: () => {
        set({ isDirty: false });
      },
      discardChanges: () => {
        get().resetToLastSaved();
      },
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