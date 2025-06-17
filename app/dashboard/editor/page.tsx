"use client";

import PhoneMockup from "@/components/phoneMockup";
import TemplateRenderer from "@/components/template/templateRender";
import { ContentType, DesignType, ActionItemType, useUserContentStore } from "@/stores/useContentStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getFullUserProfile } from "@/actions/userActions";
import defaultImage from "@/public/Devben Portfolio.webp"
import { getSocialLinks } from "@/actions/editorActions";

const Page = () => {
  const [links, setLinks] = useState([])
  const { initializeStore, templateId, setSocialLinks } = useUserContentStore();
  console.log("links", links)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, links] = await Promise.all([
          getFullUserProfile(),
          getSocialLinks(),
        ]);
  
        if (!profileData) {
          toast.error("Failed to load profile data.");
          return;
        }
  
        setLinks(links as any);
        // setSocialLinks(links as any); // update Zustand separately if you still want
  
        initializeStore({
          templateId: profileData.templateId || "good",
          content: profileData.content ?? {
            id: "",
            profileId: "",
            profileName: "Ben",
            profileBio: "Content Creator",
            profilePicture: defaultImage.src,
            coverImage: null,
            profileVerified: false,
          },
          design: profileData.design as DesignType ?? {
            layout: "default",
            background: "#ffffff",
            color: "#000000",
            font: "Inter",
          },
          actionItems: (profileData.actionItems || []).map((item) => ({
            ...item,
            type: item.type as "LINK_LIST" | "OTHER_ACTION",
            config: item.config as ActionItemType["config"],
          })),
          socialLinks: links || [],
        });
      } catch (error) {
        toast.error("Failed to load profile.");
        console.error("Error in fetching profile:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="w-full h-[90vh]">
      <PhoneMockup>
        {/* The renderer only needs the templateId. All other data comes from the store. */}
        <TemplateRenderer templateId={templateId} />
      </PhoneMockup>
    </div>
  );
};

export default Page;