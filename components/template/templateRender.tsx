"use client";

import { useUserContentStore } from "@/stores/useContentStore";
import { templateRegistry } from "./index";
import { TemplateProps } from "@/types/editorTypes";
import { useMemo } from "react";

// ⛔ DO NOT create this inside the selector – keep it stable
const STATIC_TOGGLES = Object.freeze({
  profileImage: true,
  profileName: true,
  verifiedBadge: true,
  bio: true,
  heading: true,
});

type TemplateRendererProps = {
  templateId: string;
};

const TemplateRenderer = ({ templateId }: TemplateRendererProps) => {
  console.log("templateId", templateId)
  const {socialLinks,  actionItems, design, content} = useUserContentStore();
  console.log("socialLinks", socialLinks)

  const templateProps: TemplateProps = useMemo(
    () => ({
      content,
      design,
      actions: actionItems,
      toggles: STATIC_TOGGLES, 
      socialLinks,
    }),
    [content, design, actionItems] 
  );

  const TemplateComponent = templateRegistry[templateId];

  if (!TemplateComponent) {
    return <div>Template '{templateId}' not found.</div>;
  }

  return <TemplateComponent name={templateId} {...templateProps} />;
};

export default TemplateRenderer;
