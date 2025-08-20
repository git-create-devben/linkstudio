import { create } from "zustand";
import { persist } from "zustand/middleware";
import { deepmerge } from "deepmerge-ts";
import { saveAll } from "@/actions/editorActions";
import { SocialLink } from "@/types/editorTypes";
import { ThemeMode, BannerConfig, defaultBannerConfig } from "@/lib/themeSystem";
import defaultImage from "@/public/Devben Portfolio.webp";

// Helper function for type-safe object merging
const safeMerge = <T>(target: T, source: Partial<T>): T => {
  return Object.assign({}, target, source) as T;
};

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
  // Enhanced styling options
  profileImageStyle?: 'circle' | 'rounded' | 'square';
  profileImageBorder?: boolean;
  profileImageShadow?: boolean;
  socialLinksStyle?: 'pills' | 'circles' | 'squares' | 'minimal';
  socialLinksAnimation?: 'hover' | 'pulse' | 'bounce' | 'none';
  spacing?: 'compact' | 'normal' | 'spacious';
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
  shadowIntensity?: 'none' | 'subtle' | 'medium' | 'strong';
  // New template system properties
  profileStyle?: 'minimal' | 'featured' | 'artistic';
  actionStyle?: 'buttons' | 'cards' | 'list';
  effects?: string[];
  removeBranding?: boolean;
  customFooter?: string;
  customFooterUrl?: string;
};

export type ContentType = {
  coverImage: string | null;
  id: string;
  profileId: string;
  profilePicture: string;
  profileName: string;
  profileBio: string;
  profileVerified: boolean;
  verifiedBadgeStyle?: 'simple' | 'premium' | 'music';
};

export type ActionItemType = {
  id: string;
  type: "LINK_LIST" | "CONTACT_FORM" | "TEXT_BLOCK" | "IMAGE_GALLERY" | "CALENDAR_BOOKING" | "MUSIC_PLAYER" | "VIDEO_SHOWCASE" | "PRODUCT_SHOWCASE" | "LOCATION_MAP" | "PHONE_CALL" | "SERVICE_BOOKING" | "TIP_JAR" | "NEWSLETTER_SIGNUP" | "COUNTDOWN_BANNER" | "WHATSAPP_CHAT" | "COMMUNITY_POST" | "EVENT_CARD";
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
    // Service booking specific fields
    serviceName?: string;
    serviceImage?: string;
    bookingUrl?: string;
    schedule?: string;
    location?: string;
    coupon?: string;
    price?: string;
    duration?: string;
    showAdditionalDetails?: boolean;
    isCollapsible?: boolean;
    additionalDetailsExpanded?: boolean;
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
  updateActionItemWithNewId: (oldId: string, newId: string, updates?: Partial<ActionItemType["config"]>) => void;
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (id: string, newUrl: string) => void;
  removeSocialLink: (id: string) => void;
  initializeStore: (data: StoreUpdateData) => void;
  resetStoreWithTemplate: (data: StoreUpdateData) => void;
  clearLocalStorage: () => void;
  forceResetToTemplate: (templateId: string) => void;
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
      setDesign: (data: Partial<DesignType>) =>
        set((state) => ({
          design: safeMerge(state.design, data),
          isDirty: true
        })),
      content: {
        id: "",
        profileId: "",
        profileName: "Ben",
        profileBio: "Content Creator",
        profilePicture: defaultImage.src,
        coverImage: null,
        profileVerified: false,
      },
      setContent: (data: Partial<ContentType>) =>
        set((state) => ({
          content: safeMerge(state.content, data),
          isDirty: true
        })),
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
      isTemporaryId: (id) => id === "default" || id === "music-player" || id === "music-links" ||
        id === "travel-gallery" || id === "travel-links" || id === "creative-portfolio" ||
        id.startsWith("temp_") || id.length < 10,
      updateActionItemWithNewId: (oldId, newId, updates) =>
        set((state) => ({
          actionItems: state.actionItems.map((item) =>
            item.id === oldId
              ? { ...item, id: newId, config: updates ? { ...item.config, ...updates } : item.config }
              : item
          ),
          isDirty: true
        })),
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
          design: data.design ? safeMerge(state.design, data.design) : state.design,
          content: data.content ? safeMerge(state.content, data.content) : state.content,
          actionItems: data.actionItems ?? state.actionItems,
          socialLinks: data.socialLinks ?? state.socialLinks,
        }));
      },
      resetStoreWithTemplate: (data: StoreUpdateData) => {
        
        // Create complete default objects
        const defaultDesign: DesignType = {
          layout: "minimal",
          theme: 'dark' as ThemeMode,
          customBackground: undefined,
          banner: defaultBannerConfig,
          buttonColor: "rgba(255, 255, 255, 0.2)",
          color: "#FFFFFF",
          font: "Inter",
        };

        const defaultContent: ContentType = {
          id: "",
          profileId: "",
          profileName: "Ben",
          profileBio: "Content Creator",
          profilePicture: defaultImage.src,
          coverImage: null,
          profileVerified: false,
        };

        // Completely replace store data with new template data
        const newTemplateId = data.templateId || "minimal";
        
        set({
          loading: false,
          isDirty: false,
          lastSaved: new Date(),
          isSaving: false,
          saveError: null,
          templateId: newTemplateId,
          design: data.design ? safeMerge(defaultDesign, data.design) : defaultDesign,
          content: data.content ? safeMerge(defaultContent, data.content) : defaultContent,
          actionItems: data.actionItems || [
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
          socialLinks: data.socialLinks || [],
        });
        
      },
      clearLocalStorage: () => {
        // Clear the persisted localStorage data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user-content-storage');
        }
      },
      forceResetToTemplate: (templateId: string) => {

        // Clear localStorage and reset to template defaults
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user-content-storage');
        }

        // Import and apply template defaults
        import('@/components/template/templateDefault').then(({ getTemplateDefaults }) => {
          const templateDefaults = getTemplateDefaults(templateId);

          set({
            loading: false,
            isDirty: true,
            lastSaved: null,
            isSaving: false,
            saveError: null,
            templateId: templateId,
            design: templateDefaults.design,
            content: templateDefaults.content,
            actionItems: templateDefaults.actionItems,
            socialLinks: templateDefaults.socialLinks,
          });

        });
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